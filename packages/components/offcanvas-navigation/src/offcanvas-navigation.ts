import $ from 'jquery';
import Offcanvas from '../../offcanvas/src/offcanvas';

/**
 * Component options interface.
 */
export interface OffcanvasNavigationOptions {
    className?: string;
    contentSetter?: ( offcanvasNavigation: OffcanvasNavigation ) => void;
};
/**
 * Offcanvas navigation component responsible for multilevel offcanvas navigation menu.
 */
export default class OffcanvasNavigation {
    protected _$element: JQuery;
    protected _$parentLink: JQuery;
    protected _$returnLink: JQuery;

    protected _options: OffcanvasNavigationOptions;
    protected _eventListeners: {
        offcanvasHide?: ( event: Event, offcanvas: Offcanvas ) => void;
        parentLinkClick?: ( event: Event ) => void;
        returnLinkClick?: ( event: Event ) => void;
    } = {};

    /**
     * Creates offcanvas navigation with optional given element and options.
     * @param  {JQuery}                     $element jQuery element to initialize navigation on.
     * @param  {OffcanvasNavigationOptions} options  Optional settings for a component.
     */
    public constructor( $element?: JQuery, options?: OffcanvasNavigationOptions ) {
        this._options = $.extend( {
            className: 'offcanvas-navigation',
            contentSetter: null,
        }, options );

        this._$element = $element || $( `.${this._options.className}` );
        if ( this._$element.length === 0 ) {
            return;
        }

        if ( typeof this._options.contentSetter === 'function' ) {
            this._options.contentSetter( this );
        }

        this._$parentLink = this._$element.find( `.${this._options.className}__link--parent` );
        this._$returnLink = this._$element.find( `.${this._options.className}__link--return` );

        this._addEventListeners();
    }

    /**
     * Returns component element.
     * @return {JQuery} Component element.
     */
    public getElement(): JQuery {
        return this._$element;
    }

    /**
     * Shows next navigation level based on clicked parent link.
     * @param {Event} event [description]
     */
    protected _showLevel( event: Event ): void  {
        event.preventDefault();
        const $levelToShow = $( event.target ).next();
        $levelToShow.addClass( `${this._options.className}__list--active` );
    }

    /**
     * Hides current navigation level based on clicked return link.
     * @param {Event} event [description]
     */
    protected _hideLevel( event: Event ): void  {
        event.preventDefault();
        const $levelToHide = $( event.target ).closest( `.${this._options.className}__list` );
        $levelToHide.removeClass( `${this._options.className}__list--active` );
    }
    /**
     * Resets levels to root.
     */
    protected _resetLevels(): void {
        this._$element.find(`.${this._options.className}__list` ).removeClass( `${this._options.className}__list--active` );
    }
    /**
     * Sets up event listeners for a component.
     */
    protected _addEventListeners(): void {
        this._eventListeners.offcanvasHide = this._resetLevels.bind( this );
        $( document ).on( 'offcanvas-hide', this._eventListeners.offcanvasHide );

        this._eventListeners.parentLinkClick = this._showLevel.bind( this );
        this._$parentLink.on( 'click', this._eventListeners.parentLinkClick );

        this._eventListeners.returnLinkClick = this._hideLevel.bind( this );
        this._$returnLink.on( 'click', this._eventListeners.returnLinkClick );
    }
    /**
     * Removes event listeners for a component.
     */
    protected _removeEventListeners(): void {
        $( document ).off( 'offcanvas-hide', this._eventListeners.offcanvasHide );
        this._$parentLink.off( 'click', this._eventListeners.parentLinkClick );
        this._$returnLink.off( 'click', this._eventListeners.returnLinkClick );
    }
}
