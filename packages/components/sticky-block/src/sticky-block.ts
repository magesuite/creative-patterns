import $ from 'jquery';

export default class StickyBlock {
    protected _$element: JQuery;

    /**
     * Creates new StickyBlock component with optional settings.
     * @param  {StickyBlockOptions} options  Optional settings object.
     */
    public constructor( $element: JQuery ) {
        this._$el = $element || $( '.cs-sticky-block' );

        if ( Stickyfill ) {
            this._initStickyBlock();
        }
    }

    /**
     * Destroys stickyBlock component's functionality.
     * @param  {string} afterDestroyCssPosition  Optional CSS position after polyfill is destroyed.
     */
    public destroy( afterDestroyCssPosition?: String ): void {
        Stickyfill.remove( this._$el[ 0 ] );
        this._$el.css( 'position', afterDestroyCssPosition );
    }

    /**
     * Rebuilds stickyBlock component.
     * Call it after layout changes. 
     * Plugin launches it automatically after window resizes or device orientations changes.
     */
    public rebuild(): void {
        Stickyfill.rebuild();
    }

    /**
     * Initializes stickyBlock component's functionality.
     */
    protected _initStickyBlock(): void {
        this._$el.Stickyfill();
    }
}
