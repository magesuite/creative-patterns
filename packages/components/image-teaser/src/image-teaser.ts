import $ from 'jquery';

import breakpoint from '../../../utilities/breakpoint/src/breakpoint';
import csTeaser from '../../teaser/src/teaser';

/**
 * component options interface.
 */
interface ImageTeaserOptions {
    /**
     * Classname of image teaser
     * Default: 'cs-image-teaser'
     * @type {string}
     */
    teaserName?: string;

    /**
     * Space between slides
     * Default: 8
     * @type {number}
     */
    spaceBetween?: number;

    /**
     * Slides visible at one time when carousel mode is enabled
     * Default: 1
     * @type {number}
     */
    slidesPerView?: number;

    /**
     * Defines for how many slides carousel should be moved after prev/next click
     * Default: same as slidesPerView
     * @type {number}
     */
    slidesPerGroup?: number;

    /**
     * Defines if teaser should be always a slider
     * Default: false
     * @type {boolean}
     */
    isSlider?: boolean;

    /**
     * Defines if slides should be centered
     * Default: false
     * @type {boolean}
     */
    centeredSlides?: boolean;

    /**
     * Defines if teaser should be a carousel until given breakpoint
     * Default: false
     * @type {boolean}
     */
    isSliderMobile?: boolean;

    /**
     * Defines breakpoint, where carousel should be destroyed and teaser shall display as standard image teaser 
     * Default: breakpoint.tablet
     * @type {number}
     */
    carouselBreakpoint?: number;

    /**
     * Defines carousel behaviour depending on given fallback 
     * Default: {
     *     breakpoint.tablet - 1
     * }
     * @type {Object}
     */
    breakpoints?: any;
}

export default class ImageTeaser {
    protected _options: ImageTeaserOptions;

    /**
     * Creates new ImageTeaser component with optional settings.
     * @param  {ImageTeaser} options  Optional settings object.
     */
    public constructor( $element: JQuery, options?: ImageTeaserOptions ) {
        this._options                   = $.extend( this._options, options );

        this._options.teaserName        = this._options.teaserName || 'cs-image-teaser';
        this._$container                = $element;

        const maxMobileWidth: number = breakpoint.tablet - 1;
        this._swiperDefaults = {
            spaceBetween: 8,
            slidesPerView: parseInt( this._$container.data( 'items-per-view' ), 10 ) || 1,
            slidesPerGroup: parseInt( this._$container.data( 'items-per-view' ), 10 ) || 1,
            isSlider: Boolean( this._$container.data( 'is-slider' ) ) || false,
            isSliderMobile: Boolean( this._$container.data( 'mobile-is-slider' ) ) || false,
            carouselBreakpoint: breakpoint.tablet,
            loop: true,
            centeredSlides: false,
            breakpoints: {
                [ maxMobileWidth ]: {
                    slidesPerView: parseInt( this._$container.data( 'mobile-items-per-view' ), 10 ) || parseInt( this._$container.data( 'items-per-view' ), 10 ) || 1,
                    slidesPerGroup: parseInt( this._$container.data( 'mobile-items-per-view' ), 10 ) || parseInt( this._$container.data( 'items-per-view' ), 10 ) || 1,
                },
            },
        };

        this._options = $.extend ( this._swiperDefaults, this._options );

        if ( this._options.isSlider ) {
            this._initTeaser( this._$container );
        }

        if ( this._options.isSliderMobile && !this._options.isSlider ) {
            const _this: any = this;

            this._toggleMobileTeaser();

            $( window ).on( 'resize', function(): void {
                _this._toggleMobileTeaser();
            } );
        }
    }

    public getInstance(): any {
        return this._instance;
    };

    /**
     * Initializes teaser
     */
    protected _initTeaser(): void {
        this._instance = new csTeaser( this._$container, this._options );
    }

    /**
     * Initializes teaser only for mobiles
     */
    protected _toggleMobileTeaser(): any {
        if ( $( window ).width() < this._options.carouselBreakpoint ) {
            if ( !this._instance ) {
                this._$container.addClass( `${this._options.teaserName}--slider` );
                this._initTeaser();
            }
        } else {
            if ( this._instance ) {
                this._instance.destroy();
                this._$container
                    .removeClass( `${this._options.teaserName}--slider` )
                    .find( `.${this._options.teaserName}__slides` ).removeAttr( 'style' )
                    .find( `.${this._options.teaserName}__slide` ).removeAttr( 'style' );
                this._instance = undefined;
            }
        }
    }
}
