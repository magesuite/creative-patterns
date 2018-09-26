import $ from 'jquery';

/**
 * Scroll to element component options interface.
 */
interface ScrollToElementOptions {
    /**
     * Scroll speed in miliseconds
     * @type {number}
     */
    scrollSpeed?: number;
    /**
     * Selector of the element that is sticky/fixed
     */
    offsetElementSelector?: string;
    /**
     * Offset
     */
    offset?: number;
}

export default class ScrollToElement {
    protected _$scrollTriggerElement: JQuery;
    protected _$scrollToElement: JQuery;
    protected _$element: JQuery;
    protected _options: ScrollToElementOptions = {
        scrollSpeed: 500,
        offsetElementSelector: '',
        offset: 0,
    };
    protected _eventListeners: {
        triggerClickListener?: (event: Event) => void;
    } = {};

    public constructor(
        $scrollTriggerElement: JQuery,
        $scrollToElement: JQuery,
        options?: ScrollToElementOptions
    ) {
        // Don't throw errors if there is no target element on the website.
        if ($scrollTriggerElement.length === 0) {
            return;
        }

        this._$scrollTriggerElement = $scrollTriggerElement;
        this._options = $.extend(this._options, options);

        if ($scrollToElement && $scrollToElement.length) {
            this._$scrollToElement = $scrollToElement;
        } else if (
            $scrollToElement &&
            $scrollToElement.data('scroll-to-selector')
        ) {
            this._$scrollToElement = $scrollToElement.data(
                'scroll-to-selector'
            );
        } else {
            return;
        }

        // Attach all of the event listeners.
        this.attachEventListeners();
    }

    protected _getOffset(): number {
        return $(this._options.offsetElementSelector).length
            ? $(this._options.offsetElementSelector).height() +
        this._options.offset
            : this._options.offset;
    }

    protected _scrollAnimation(): void {
        $('html, body').animate(
            {
                scrollTop:
                this._$scrollToElement.offset().top - this._getOffset(),
            },
            this._options.animationSpeed
        );
    }

    /**
     * Attaches all needed event listeners for show / hide behaviour.
     */
    protected attachEventListeners(): void {
        this._eventListeners.triggerClickListener = this._scrollAnimation.bind(
            this
        );

        // Click on trigger to toggle component state
        this._$scrollTriggerElement.on('click', event => {
            event.preventDefault();
            this._eventListeners.triggerClickListener(event);
        });
    }
}
