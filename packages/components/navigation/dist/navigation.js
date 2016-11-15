(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('navigation', ['jquery'], factory) :
    (global.navigation = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Dropdown navigation that supports 3 category level links.
 */
var Navigation = (function () {
    /**
     * Creates new navigation component on given jQuery element with optional settings.
     * @param  {JQuery}            $element jQuery element to initialize navigation on.
     * @param  {NavigationOptions} options  Optional settings object.
     */
    function Navigation($element, options) {
        this._$window = $(window);
        this._options = {
            containerClassName: 'navigation__list',
            itemClassName: 'navigation__item',
            flyoutClassName: 'navigation__flyout',
            flyoutVisibleClassName: 'navigation__flyout--visible',
            flyoutColumnsClassName: 'navigation__categories',
            flyoutMaxHeight: 400,
            flyoutDefaultColumnCount: 4,
            resizeDebounce: 100,
        };
        this._$element = $element;
        this._options = $.extend(this._options, options);
        this._$flyouts = $element.find("." + this._options.flyoutClassName);
        this._$container = $element.find("." + this._options.containerClassName);
        this._containerClientRect = this._$container.get(0).getBoundingClientRect();
        this._adjustFlyouts(this._$flyouts);
        this._attachEvents();
    }
    /**
     * Destroys navigation component.
     */
    Navigation.prototype.destroy = function () {
        this._detachEvents();
    };
    /**
     * Adjusts flyout number of columns and positioning.
     * @param {JQuery} $flyouts jQuery collection of flyouts.
     */
    Navigation.prototype._adjustFlyouts = function ($flyouts) {
        var _this = this;
        this._showFlyout($flyouts);
        this._setTransform($flyouts, '');
        this._triggerReflow($flyouts);
        var $flyout;
        $flyouts.each(function (index, flyout) {
            $flyout = $(flyout);
            _this._adjustFlyoutColumns($flyout);
            _this._adjustFlyoutPosition($flyout);
        });
        this._hideFlyout($flyouts);
    };
    /**
     * Adjusts the number of flyout columns.
     * The goal is to have as few columns as possible when keeping flyout's height bellow given max height.
     * @param {JQuery} $flyout [description]
     */
    Navigation.prototype._adjustFlyoutColumns = function ($flyout) {
        var $flyoutColumns = $flyout.find("." + this._options.flyoutColumnsClassName);
        var flyoutMaxHeight = this._options.flyoutMaxHeight;
        var flyoutColumnCount = this._options.flyoutDefaultColumnCount - 1;
        var flyoutHeight = $flyout.height();
        for (; flyoutColumnCount > 0; flyoutColumnCount -= 1) {
            this._setColumnCount($flyoutColumns, flyoutColumnCount);
            flyoutHeight = $flyout.height();
            if (flyoutHeight >= flyoutMaxHeight) {
                break;
            }
        }
    };
    /**
     * Adjusts the position of the flyout so that the center of flyout columns
     * section is aligned to the center of trigger element as close as possible.
     * @param {JQuery} $flyout jQuery flyout element collection.
     */
    Navigation.prototype._adjustFlyoutPosition = function ($flyout) {
        var $flyoutColumns = $flyout.find("." + this._options.flyoutColumnsClassName);
        var flyoutClientRect = $flyout.get(0).getBoundingClientRect();
        var containerClientRect = this._containerClientRect;
        var flyoutColumnsClientRect = $flyoutColumns.get(0).getBoundingClientRect();
        var flyoutTriggerClientRect = $flyout.parent().get(0).getBoundingClientRect();
        // Check if flyout takes all width, if it does we don't have to calculate anything.
        if (flyoutClientRect.width === containerClientRect.width) {
            return;
        }
        // Align center of columns with links to center of the flyout trigger.
        var flyoutTransformLeft = Math.max(0, flyoutTriggerClientRect.left - containerClientRect.left + flyoutTriggerClientRect.width / 2 -
            flyoutColumnsClientRect.width / 2);
        // Check if flyout would overflow container on the right.
        if (flyoutTransformLeft + flyoutClientRect.right > containerClientRect.right) {
            // If it would then stick it to the right side.
            flyoutTransformLeft = Math.floor(containerClientRect.width - flyoutClientRect.width);
        }
        this._setTransform($flyout, "translateX(" + flyoutTransformLeft + "px)");
    };
    /**
     * Sets the number of columns for the given element.
     * @param  {JQuery} $element    Element to set property to.
     * @param  {number} columnCount Number of columns to set.
     */
    Navigation.prototype._setColumnCount = function ($element, columnCount) {
        $element.css({
            'column-count': columnCount,
        });
    };
    /**
     * Sets transform CSS property on a given element.
     * @param  {JQuery} $element  Element to set transform to.
     * @param  {string} transform Transform value string.
     */
    Navigation.prototype._setTransform = function ($element, transform) {
        $element.css({
            transform: transform,
        });
    };
    /**
     * Makes given flyout visible by applying appropriate class.
     * @param {JQuery} $flyout Target flyout to set class to.
     */
    Navigation.prototype._showFlyout = function ($flyout) {
        $flyout.addClass(this._options.flyoutVisibleClassName);
    };
    /**
     * Hides given flyout by applying appropriate class.
     * @param {JQuery} $flyout Target flyout to remove class from.
     */
    Navigation.prototype._hideFlyout = function ($flyout) {
        $flyout.removeClass(this._options.flyoutVisibleClassName);
    };
    /**
     * Triggers browser layout reflow so we can get updated CSS values.
     * @param  {JQuery} $element Element to use to trigger reflow.
     */
    Navigation.prototype._triggerReflow = function ($element) {
        $element.prop('offsetHeight');
    };
    /**
     * Attaches events needed by navigation component.
     */
    Navigation.prototype._attachEvents = function () {
        var _this = this;
        this._resizeListener = function () {
            clearTimeout(_this._resizeTimeout);
            setTimeout(function () {
                _this._containerClientRect = _this._$container.get(0).getBoundingClientRect();
                _this._adjustFlyouts(_this._$flyouts);
            }, _this._options.resizeDebounce);
        };
        this._$window.on('resize orientationchange', this._resizeListener);
        this._focusInListener = function (event) {
            $(event.target)
                .parent()
                .find("." + _this._options.flyoutClassName)
                .addClass(_this._options.flyoutVisibleClassName);
        };
        this._focusOutListener = function (event) {
            $(event.target)
                .closest("." + _this._options.itemClassName)
                .find("." + _this._options.flyoutClassName)
                .removeClass(_this._options.flyoutVisibleClassName);
        };
        var $items = $("." + this._options.itemClassName);
        $items.on('focusin', this._focusInListener);
        $items.find('a:last').on('focusout', this._focusOutListener);
    };
    /**
     * Detaches events set by navigation component.
     */
    Navigation.prototype._detachEvents = function () {
        this._$window.off('resize orientationchange', this._resizeListener);
        var $items = $("." + this._options.itemClassName);
        $items.off('focusin', this._focusInListener);
        $items.find('a:last').off('focusout', this._focusOutListener);
    };
    return Navigation;
}());

return Navigation;

})));
//# sourceMappingURL=navigation.js.map
