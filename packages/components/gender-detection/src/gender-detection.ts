import $ from 'jquery';

/**
 * This component uses Gender-api.com
 * When request is done it returns 3 possible values for gender: 'male', 'female', 'unknown'
 * Remember to set your inputs 

/**
 * component options interface.
 * Please refer to swiper documentation and our teaser component for more options and callbacks
 */
interface GenderDetectionOptions {
    /**
     * HTML Class of the input that will be listened for changes
     * @type {string}
     * @default 'cs-gender-detection__source'
     */
    sourceClass?: string;

    /**
     * HTML Class of the wrapper with gender inputs
     * This wrapper is hidden by default, It is shown after gender is detected
     * @type {string}
     * @default 'cs-gender-detection__content'
     */
    inputsWrapperClass?: string;

    /**
     * When gender is detected, script will add a modifier to the wrapper
     * @type {string}
     * @default 'cs-gender-detection__content--active'
     */
    inputsWrapperActiveClass?: number;

    /**
     * Input selection delay defines if selection of input should be delayed
     * It is useful if there's any transition for wrapper set in your case and you want to make
     * selection happen "on the eyes of customer", not when fields are hidden in the first miliseconds of animation
     * @default {0}
     * @type {number}
     */
    delay?: number;

    /**
     * Ajax loading class - added to the documents' body
     * Decided to attach it to body because in most cases ajax loader is global component
     * This was it's more elastic 
     * @type {string}
     */
    ajaxLoadingClass?: string;
}

export default class GenderDetection {
    protected _apiKey: string;
    protected _$element: JQuery;
    protected _$source: JQuery;
    protected _$optionsWrapper: JQuery;
    protected _$output: JQuery;
    protected _activeClass: string;
    public _isEdited: boolean;
    public options: any;

    /**
     * Creates new Gender Detection component with optional settings.
     * @param {options} Optional settings object.
     */
    public constructor( _$element: any, options?: GenderDetectionOptions ) {
        this.options = $.extend( true, {}, {
            sourceClass: 'cs-gender-detection__source',
            inputsWrapperClass: 'cs-gender-detection__content',
            inputsWrapperActiveClass: 'cs-gender-detection__content--active',
            delay: 0,
        }, options );

        this._$element = _$element;

        // Read API key from data-api-key attribute
        this._apiKey = this._$element.data( 'api-key' );
        this._$source = this._$element.find( `.${ this.options.sourceClass }` );
        this._$optionsWrapper = this._$element.find( `.${ this.options.inputsWrapperClass }` );

        // Select output fields by data-gender attribute
        this._$output = this._$optionsWrapper.find( '[data-gender]' );

        // this._$output was not edited (selected manually) yet
        this._isEdited = false;

        // If input, options or apiKey is missing then stop script execution
        if ( !this._$source.length && !this._$optionsWrapper.length && !this._apiKey && this._apiKey === '' ) {
            return;
        }

        if ( this._$output.length ) {
            this._setEvents();
        }
    }

    /**
     * Sets gender on frontend after delay if provided in options
     * @param $output {JQuery} jquery element to set as :checked or that value should be set for.
     * @param gender {String} Optional gender string ('male' / 'female')
     */
    protected _setGender( $output: any, gender?: string ): void {
        setTimeout( (): void => {
            if ( gender && gender !== '' ) {
                $output.val( gender );
            } else  {
                $output.attr( 'checked', true );
            }

            if ( $output.data( 'selectpicker' ) ) {
                $output.selectpicker( 'refresh' );
            }

        }, this.options.delay );

        this._isEdited = true;
    }

    /**
     * Prepares options wrapper: adds 'active' class and gets the actual target
     * @param data {Object} data object returned by gender-api.com
     */
    protected _prepareOutput( data: any ): void {
        let $output: any = this._$optionsWrapper.find( '[data-gender]' );

        if ( this.options.inputsWrapperActiveClass ) {
            this._$optionsWrapper.addClass( this.options.inputsWrapperActiveClass );
        }

        if ( $output.length && $output.is( 'select' ) && $output.find( `option[value="${ data.gender }"]` ).length ) {
            this._setGender( $output, data.gender );
        } else if ( $output.length && ( $output.attr( 'type' ) === 'radio' || $output.attr( 'type' ) === 'checkbox' ) ) {
            $output = $output.filter( function(): any { 
                return $( this ).data( 'gender' ) === data.gender;
            } );

            if ( $output.length ) {
                this._setGender( $output );
            }
        }
    }

    /**
     * Sends request to gender-api.com
     * @param name {String} Name provided by user ( inputs' value )
     */
    protected _getData( name ): any {
        return $.get( `https://gender-api.com/get?name=${ name }&key=${ this._apiKey }` );
    }

    /**
     * Sets 'onchange' events
     */
    protected _setEvents(): void {
        let _that: any = this;

        // If gender is selected manually before name if provided or if it's edited later then set flag so that script knows not to check gender again
        $( document ).on( 'change', `.${ this.options.inputsWrapperClass } input, .${ this.options.inputsWrapperClass } select`, (): void => {
            _that._isEdited = true;
        } );

        // listed to 'onchange' on name input
        $( document ).on( 'change', `.${ this.options.sourceClass }`, (): void => {
            const name: string = _that._$source.val();

            if ( name !== '' && !_that._isEdited ) {
                // If ajax class defined in options, adds it to 'body'
                if ( _that.options.ajaxLoadingClass ) {
                    $( 'body' ).addClass( _that.options.ajaxLoadingClass );
                }

                _that._getData( name ).then( ( data: any ): void => {
                    $( 'body' ).removeClass( _that.options.ajaxLoadingClass );
                    _that._prepareOutput( data );
                } );
            }
        } );
    }
}
