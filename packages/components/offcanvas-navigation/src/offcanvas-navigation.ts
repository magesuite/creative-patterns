import $ from 'jquery';

/**
 * Component options interface.
 */
export interface OffcanvasNavigationOptions {
    className?: string;
    contentProvider?: ( $element: JQuery ) => void;
};

export default class OffcanvasNavigation {
    protected _$element: JQuery;
    protected _$parentLink: JQuery;
    protected _$returnLink: JQuery;

    protected _options: OffcanvasNavigationOptions;
    protected _eventListeners: {
        parentLinkClick?: ( event: Event ) => void;
        returnLinkClick?: ( event: Event ) => void;
    } = {};

    /**
     * Creates new Hero component with optional settings.
     * @param {$element} Optional, element to be initialized as Hero component
     * @param {options}  Optional settings object.
     */
    public constructor( $element?: JQuery, options?: OffcanvasNavigationOptions ) {
        this._options = $.extend( {
            className: 'cs-offcanvas-navigation',
            contentProvider: null,
        }, options );

        this._$element = $element || $( `.${this._options.className}` );
        if ( this._$element.length === 0 ) {
            return;
        }

        if ( typeof this._options.contentProvider === 'function' ) {
            this._options.contentProvider( this._$element );
        }

        this._$parentLink = this._$element.find( `.${this._options.className}__link--parent` );
        this._$returnLink = this._$element.find( `.${this._options.className}__link--return` );

        this._addEventListeners();
    }

    protected _showLevel( event: Event ): void  {
        event.preventDefault();
        const $levelToShow = $( event.target ).next();
        $levelToShow.addClass( `${this._options.className}__list--active` );
    }

    protected _hideLevel( event: Event ): void  {
        event.preventDefault();
        const $levelToHide = $( event.target ).closest( `.${this._options.className}__list` );
        $levelToHide.removeClass( `${this._options.className}__list--active` );
    }

    protected _addEventListeners(): void {
        this._eventListeners.parentLinkClick = this._showLevel.bind( this );
        this._$parentLink.on( 'click', this._eventListeners.parentLinkClick );

        this._eventListeners.returnLinkClick = this._hideLevel.bind( this );
        this._$returnLink.on( 'click', this._eventListeners.returnLinkClick );
    }

    protected _removeEventListeners(): void {
        this._$parentLink.off( 'click', this._eventListeners.parentLinkClick );
        this._$returnLink.off( 'click', this._eventListeners.returnLinkClick );
    }
}
