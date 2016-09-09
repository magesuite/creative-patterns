interface INavigation {
    close(): void;
    show( index: number ): void;
    init(): void;
}

interface INavigationSettings {
    toggles: Array< Object >;
    flyouts: Array< Object >;
}

export class Navigation implements INavigation {
    private _toggles: Array<Object>;
    private _flyouts: Array<Object>;

    constructor( settings: INavigationSettings ) {
        this._toggles = settings.toggles;
        this._flyouts = settings.flyouts;

        this.init();
    }

    /**
     * Conntects toggles with flyouts via data attribute in template
     * @private
     */
    _bindItems (): void {
        let toggles: Array<Object> = this._toggles;
        let flyouts: Array<Object> = this._flyouts;
        $.each( toggles, ( i: number, toggle: any ) => {
            let toggleGroup = toggle.getNavGroup();
            $.each( flyouts, function ( i, flyout ) {
                let flyoutGroup = flyout.getNavGroup();

                if ( toggleGroup === flyoutGroup ) {
                    toggle.bindFlyout( flyout );

                    return;
                }
            } );
        });
    }

    /**
     * Bind events between toggles and flyouts
     * @private
     */
    private _events(): void {
        $.each( this._toggles, ( index: number, elem: HTMLElement ) => {
            let toggle: HTMLElement = elem;
            let $element: JQuery = toggle.getElement();

            $element.on( 'click', ( event: Event ) => {
                this._onClick( event , toggle );
            } );
        } );
    }

    /**
     * Click action
     * @private
     */
    _onClick( event: Event, toggle: HTMLElement ): void {
        console.log( 'clicked' );

        toggle.getFlyout().show();

        this.close();

    }

    /**
     * Close any open flyout
     */
    public close() {

    }

    /**
     * Show flyout with provided index
     * @param index
     */
    public show( index: number ) {

    }

    public init () {
        this._bindItems();
        this._events();
    }
}
