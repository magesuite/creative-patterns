import $ from 'jquery';
import Stickyfill from 'Stickyfill';

export default class StickyBlock {
    protected _$element: JQuery;

    /**
     * Creates new StickyBlock component with optional settings.
     * @param  {StickyBlockOptions} options  Optional settings object.
     */
    public constructor( $element: JQuery ) {
        this._$element = $element || $( '.cs-sticky-block' );

        this._initStickyBlock();
    }

    /**
     * Destroys stickyBlock component's functionality.
     * @param  {string} afterDestroyCssPosition  Optional CSS position after polyfill is destroyed.
     */
    public destroy( afterDestroyCssPosition?: string ): void {
        Stickyfill.remove( this._$element[ 0 ] );
        this._$element.css( 'position', afterDestroyCssPosition );
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
        if ( Stickyfill && this._$element.length ) {
            this._$element.Stickyfill();
        }
    }
}
