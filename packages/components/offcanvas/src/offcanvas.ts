import $ from 'jquery';

/**
 * Component options interface.
 */
export interface OffcanvasOptions {
    className?: string;
    triggerSelector?: string;
    closeOnBlur?: boolean;
    drawerTransitionDuration?: number;
    overlayTransitionDuration?: number;
};

export default class Offcanvas {
    protected _$element: JQuery;
    protected _$overlay: JQuery;
    protected _$drawer: JQuery;
    protected _$trigger: JQuery;
    protected _options: OffcanvasOptions;
    protected _eventListeners: {
        triggerClick?: ( event: Event ) => void;
        overlayClick?: ( event: Event ) => void;
    } = {};

    /**
     * Creates new Hero component with optional settings.
     * @param {$element} Optional, element to be initialized as Hero component
     * @param {options}  Optional settings object.
     */
    public constructor( $element?: JQuery, options?: OffcanvasOptions ) {
        this._options = $.extend( {
            className: 'cs-offcanvas',
            triggerSelector: '.cs-offcanvas-trigger',
            closeOnBlur: true,
            drawerTransitionDuration: 300,
            overlayTransitionDuration: 300,
        }, options );

        this._$element = $element || $( `.${this._options.className}` );
        if ( this._$element.length === 0 ) {
            return;
        }

        this._$drawer = this._$element.find( `.${this._options.className}__drawer` );
        this._$overlay = this._$element.find( `.${this._options.className}__overlay` );
        this._$trigger = $( this._options.triggerSelector );

        this._addEventListeners();
    }

    public show(): Promise<Offcanvas> {
        return Promise.all( [
            this._showOverlay(),
            this._showDrawer(),
        ] ).then( () => this );
    }

    public hide(): Promise<Offcanvas> {
        return Promise.all( [
            this._hideOverlay(),
            this._hideDrawer(),
        ] ).then( () => this );
    }

    protected _showOverlay(): Promise<Offcanvas>  {
        return new Promise( resolve => {
            this._$overlay.addClass( `${this._options.className}__overlay--visible` );
            setTimeout(
                () => resolve( this ),
                this._options.overlayTransitionDuration,
            );
        });
    }

    protected _hideOverlay(): Promise<Offcanvas>  {
        return new Promise( resolve => {
            this._$overlay.removeClass( `${this._options.className}__overlay--visible` );
            setTimeout(
                () => resolve( this ),
                this._options.overlayTransitionDuration,
            );
        });
    }

    protected _showDrawer(): Promise<Offcanvas> {
        return new Promise( resolve => {
            this._$drawer.addClass( `${this._options.className}__drawer--visible` );
            setTimeout(
                () => resolve( this ),
                this._options.drawerTransitionDuration,
            );
        });
    }

    protected _hideDrawer(): Promise<Offcanvas> {
        return new Promise( resolve => {
            this._$drawer.removeClass( `${this._options.className}__drawer--visible` );
            setTimeout(
                () => resolve( this ),
                this._options.drawerTransitionDuration,
            );
        });
    }

    protected _addEventListeners(): void {
        this._eventListeners.triggerClick = () => this.show();
        this._$trigger.on( 'click', this._eventListeners.triggerClick );

        if ( this._options.closeOnBlur ) {
            this._eventListeners.overlayClick = () => this.hide();
            this._$overlay.on( 'click', this._eventListeners.overlayClick );
        }
    }

    protected _removeEventListeners(): void {
        this._$trigger.off( 'click', this._eventListeners.triggerClick );
        this._$overlay.off( 'click', this._eventListeners.overlayClick );
    }
}
