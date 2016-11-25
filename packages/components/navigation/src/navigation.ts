import $ from 'jquery';

/**
 * Navigation component options interface.
 */
interface NavigationOptions {
    /**
     * Class name of navigation container. Flyout positions will be calculated
     * relative to this element.
     * @type {string}
     */
    containerClassName?: string;
    /**
     * Navigation list item element. It is used to enhance keyboard accessability.
     * @type {string}
     */
    itemClassName?: string;
    /**
     * Navigation flyout class name.
     * @type {string}
     */
    flyoutClassName?: string;
    /**
     * Navigation flyout columns container class name.
     * @type {string}
     */
    flyoutColumnsClassName?: string;
    /**
     * Desired max height of the flyout. Number of columns will be decreased until
     * flyout's height will be smaller then given max height.
     * @type {number}
     */
    flyoutMaxHeight?: number;
    /**
     * Default number of colums set for flyout by CSS.
     * @type {number}
     */
    flyoutDefaultColumnCount?: number;
    /**
     * Flyout class name that should be aplied to make it visible.
     * @type {[type]}
     */
    flyoutVisibleClassName?: string;
    /**
     * Number of miliseconds to wait for next resize event before recalculating flyout positions.
     * @type {number}
     */
    resizeDebounce?: number;
};

/**
 * Dropdown navigation that supports 3 category level links.
 */
export default class Navigation {
    protected _$element: JQuery;
    protected _$window: JQuery = $( window );
    protected _$flyouts: JQuery;
    protected _$container: JQuery;
    protected _containerClientRect: ClientRect;
    protected _eventListeners: {
        resizeListener?: ( event: Event ) => void;
        itemFocusInListener?: ( event: Event ) => void;
        flyoutFocusInListener?: ( event: Event ) => void;
        focusOutListener?: ( event: Event ) => void;
    } = {};
    protected _resizeTimeout: number;

    protected _options: NavigationOptions = {
        containerClassName: 'navigation__list',
        itemClassName: 'navigation__item',
        flyoutClassName: 'navigation__flyout',
        flyoutVisibleClassName: 'navigation__flyout--visible',
        flyoutColumnsClassName: 'navigation__categories',
        flyoutMaxHeight: 400,
        flyoutDefaultColumnCount: 4,
        resizeDebounce: 100,
    };

    /**
     * Creates new navigation component on given jQuery element with optional settings.
     * @param  {JQuery}            $element jQuery element to initialize navigation on.
     * @param  {NavigationOptions} options  Optional settings object.
     */
    public constructor($element: JQuery, options?: NavigationOptions) {
        this._$element = $element;
        this._options = $.extend( this._options, options );
        this._$flyouts = $element.find( `.${this._options.flyoutClassName}` );
        this._$container = $element.find( `.${this._options.containerClassName}` );
        this._containerClientRect = this._$container.get( 0 ).getBoundingClientRect();

        this._adjustFlyouts( this._$flyouts );
        this._attachEvents();
    }

    /**
     * Destroys navigation component.
     */
    public destroy(): void {
        this._detachEvents();
    }

    /**
     * Adjusts flyout number of columns and positioning.
     * @param {JQuery} $flyouts jQuery collection of flyouts.
     */
    protected _adjustFlyouts( $flyouts: JQuery ): void {
        this._showFlyout( $flyouts );
        this._setTransform( $flyouts, '' );
        this._triggerReflow( $flyouts );

        let $flyout: JQuery;
        $flyouts.each(( index: number, flyout: HTMLElement ) => {
            $flyout = $( flyout );
            this._adjustFlyoutColumns( $flyout );
            this._adjustFlyoutPosition( $flyout );
        });
        this._hideFlyout( $flyouts );
    }

    /**
     * Adjusts the number of flyout columns.
     * The goal is to have as few columns as possible when keeping flyout's height bellow given max height.
     * @param {JQuery} $flyout [description]
     */
    protected _adjustFlyoutColumns( $flyout: JQuery ): void {
        const $flyoutColumns: JQuery = $flyout.find( `.${this._options.flyoutColumnsClassName}` );
        const flyoutMaxHeight: number = this._options.flyoutMaxHeight;
        let flyoutColumnCount: number = this._options.flyoutDefaultColumnCount - 1;
        let flyoutHeight: number = $flyout.height();

        for (; flyoutColumnCount > 0; flyoutColumnCount -= 1) {
            this._setColumnCount( $flyoutColumns, flyoutColumnCount );
            flyoutHeight = $flyout.height();

            if ( flyoutHeight >= flyoutMaxHeight ) {
                if ( flyoutHeight >= flyoutMaxHeight + 100 ) {
                    this._setColumnCount( $flyoutColumns, flyoutColumnCount - 1 );
                }
                break;
            }
        }
    }

    /**
     * Adjusts the position of the flyout so that the center of flyout columns
     * section is aligned to the center of trigger element as close as possible.
     * @param {JQuery} $flyout jQuery flyout element collection.
     */
    protected _adjustFlyoutPosition( $flyout: JQuery ): void {
        const $flyoutColumns: JQuery = $flyout.find( `.${this._options.flyoutColumnsClassName}` );
        const flyoutClientRect: ClientRect = $flyout.get( 0 ).getBoundingClientRect();
        const containerClientRect: ClientRect = this._containerClientRect;
        const flyoutColumnsClientRect: ClientRect = $flyoutColumns.get( 0 ).getBoundingClientRect();
        const flyoutTriggerClientRect: ClientRect = $flyout.parent().get( 0 ).getBoundingClientRect();

        // Check if flyout takes all width, if it does we don't have to calculate anything.
        if ( flyoutClientRect.width === containerClientRect.width ) {
            return;
        }

        // Align center of columns with links to center of the flyout trigger.
        let flyoutTransformLeft: number = Math.max( 0, flyoutTriggerClientRect.left - containerClientRect.left + flyoutTriggerClientRect.width / 2 -
            flyoutColumnsClientRect.width / 2  );
        // Check if flyout would overflow container on the right.
        if ( flyoutTransformLeft + flyoutClientRect.right > containerClientRect.right ) {
            // If it would then stick it to the right side.
            flyoutTransformLeft = Math.floor( containerClientRect.width - flyoutClientRect.width );
        }

        this._setTransform( $flyout, `translateX(${flyoutTransformLeft}px)` );
    }

    /**
     * Sets the number of columns for the given element.
     * @param  {JQuery} $element    Element to set property to.
     * @param  {number} columnCount Number of columns to set.
     */
    protected _setColumnCount( $element: JQuery, columnCount: number ): void {
        $element.css( {
            'column-count': columnCount,
        } );
    }

    /**
     * Sets transform CSS property on a given element.
     * @param  {JQuery} $element  Element to set transform to.
     * @param  {string} transform Transform value string.
     */
    protected _setTransform( $element: JQuery, transform: string ): void {
        $element.css( {
            transform: transform,
        } );
    }

    /**
     * Makes given flyout visible by applying appropriate class.
     * @param {JQuery} $flyout Target flyout to set class to.
     */
    protected _showFlyout( $flyout: JQuery ): void {
        $flyout.addClass( this._options.flyoutVisibleClassName );
    }

    /**
     * Hides given flyout by applying appropriate class.
     * @param {JQuery} $flyout Target flyout to remove class from.
     */
    protected _hideFlyout( $flyout: JQuery ): void {
        $flyout.removeClass( this._options.flyoutVisibleClassName );
    }

    /**
     * Triggers browser layout reflow so we can get updated CSS values.
     * @param  {JQuery} $element Element to use to trigger reflow.
     */
    protected _triggerReflow( $element: JQuery ): void {
        $element.prop( 'offsetHeight' );
    }

    /**
     * Attaches events needed by navigation component.
     */
    protected _attachEvents(): void {
        this._eventListeners.resizeListener = (): void => {
            clearTimeout( this._resizeTimeout );
            setTimeout( () => {
                this._containerClientRect = this._$container.get( 0 ).getBoundingClientRect();
                this._adjustFlyouts( this._$flyouts );
            }, this._options.resizeDebounce );
        };
        this._$window.on( 'resize orientationchange', this._eventListeners.resizeListener );

        this._eventListeners.itemFocusInListener = ( event: Event ): void => {
            let $targetFlyout: JQuery = $( event.target ).parent().find( `.${ this._options.flyoutClassName }` );
            this._hideFlyout( this._$flyouts.not( $targetFlyout ) );
            this._showFlyout( $targetFlyout );
        };
        // Don't let focus events propagate from flyouts to items.
        this._eventListeners.flyoutFocusInListener = ( event: Event ): void => {
            event.stopPropagation();
        };

        this._eventListeners.focusOutListener = ( event: Event ): void => {
            this._hideFlyout(
                $( event.target )
                    .closest( `.${this._options.itemClassName}` )
                    .find( `.${ this._options.flyoutClassName }` ),
            );
        };

        const $items: JQuery = $( `.${this._options.itemClassName}` );
        $items.on( 'focusin', this._eventListeners.itemFocusInListener );
        this._$flyouts.on( 'focusin', this._eventListeners.flyoutFocusInListener );
        // When the last link from flyout loses focus.
        $items.find( 'a:last' ).on( 'focusout', this._eventListeners.focusOutListener );
    }

    /**
     * Detaches events set by navigation component.
     */
    protected _detachEvents(): void {
        this._$window.off( 'resize orientationchange', this._eventListeners.resizeListener );

        const $items: JQuery = $( `.${this._options.itemClassName}` );
        $items.off( 'focusin', this._eventListeners.itemFocusInListener );
        this._$flyouts.off( 'focusin', this._eventListeners.flyoutFocusInListener );
        // When the last link from flyout loses focus.
        $items.find( 'a:last' ).off( 'focusout', this._eventListeners.focusOutListener );
    }
}