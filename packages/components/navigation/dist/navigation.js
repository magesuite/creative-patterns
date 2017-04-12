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
        this._eventListeners = {};
        this._options = {
            containerClassName: 'navigation__list',
            itemClassName: 'navigation__item',
            flyoutClassName: 'navigation__flyout',
            flyoutVisibleClassName: 'navigation__flyout--visible',
            flyoutColumnsClassName: 'navigation__categories',
            flyoutMaxHeight: 400,
            flyoutDefaultColumnCount: 4,
            resizeDebounce: 100,
            flyoutShowDelay: 200,
            flyoutAlignTo: 'center',
            flyoutAlignSwitch: 0,
        };
        // Don't throw errors if there is no navigation on the website.
        if ($element.length === 0) {
            return;
        }
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
        $flyouts.each(function (index, flyout) { return _this._adjustFlyoutColumns($(flyout)); });
        this._hideFlyout($flyouts);
        this._triggerReflow($flyouts);
        /**
         * So Chrome has a bug which causes it to provide invalid width of the element
         * when changing it's number of colums in JS, even when triggering reflows.
         */
        requestAnimationFrame(function () {
            _this._showFlyout($flyouts);
            _this._triggerReflow($flyouts);
            var alignTo = _this._options.flyoutAlignTo;
            var alignSwitch = _this._options.flyoutAlignSwitch;
            var switchAt = alignSwitch > 0 ? alignSwitch : alignSwitch + $flyouts.length;
            $flyouts.each(function (index, flyout) {
                if (index === switchAt && (alignTo === 'left' || alignTo === 'right')) {
                    alignTo = alignTo === 'left' ? 'right' : 'left';
                }
                _this._adjustFlyoutPosition($(flyout), alignTo);
            });
            _this._hideFlyout($flyouts);
        });
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
        var prevFlyoutHeight;
        for (; flyoutColumnCount > 0; flyoutColumnCount -= 1) {
            this._setColumnCount($flyoutColumns, flyoutColumnCount);
            prevFlyoutHeight = flyoutHeight;
            flyoutHeight = $flyout.height();
            if (flyoutHeight !== prevFlyoutHeight && flyoutHeight >= flyoutMaxHeight) {
                if (flyoutHeight >= flyoutMaxHeight + 100
                    && flyoutColumnCount < this._options.flyoutDefaultColumnCount) {
                    this._setColumnCount($flyoutColumns, flyoutColumnCount + 1);
                }
                break;
            }
        }
        this._removeEmptyColumns($flyout, flyoutColumnCount);
    };
    /**
     * Removes empty columns from flyout.
     * Because e.g. categories in flyout cannot break there may be a situation when
     * flyout will be higher then the limit but adding more columns won't do any good.
     * This method checks how many columns can be removed before flyout becomes higher.
     *
     * @param  {JQuery} $flyout           Flyout element.
     * @param  {number} flyoutColumnCount Current number of colums to speed up performance.
     */
    Navigation.prototype._removeEmptyColumns = function ($flyout, flyoutColumnCount) {
        var $flyoutColumns = $flyout.find("." + this._options.flyoutColumnsClassName);
        var flyoutHeight = $flyout.height();
        var prevFlyoutHeight;
        for (; flyoutColumnCount > 0; flyoutColumnCount -= 1) {
            this._setColumnCount($flyoutColumns, flyoutColumnCount);
            prevFlyoutHeight = flyoutHeight;
            flyoutHeight = $flyout.height();
            // Allow for small margin of error of 10px.
            if (Math.abs(flyoutHeight - prevFlyoutHeight) > 10) {
                this._setColumnCount($flyoutColumns, flyoutColumnCount + 1);
                break;
            }
        }
    };
    /**
     * Adjusts the position of the flyout so that the center of flyout columns
     * section is aligned to the center of trigger element as close as possible.
     * @param {JQuery} $flyout jQuery flyout element collection.
     */
    Navigation.prototype._adjustFlyoutPosition = function ($flyout, alignTo) {
        if (alignTo === void 0) { alignTo = 'center'; }
        var $flyoutColumns = $flyout.find("." + this._options.flyoutColumnsClassName);
        var flyoutClientRect = $flyout.get(0).getBoundingClientRect();
        var containerClientRect = this._containerClientRect;
        var flyoutTriggerClientRect = $flyout.parent().get(0).getBoundingClientRect();
        // Check if flyout takes all width, if it does we don't have to calculate anything.
        if (flyoutClientRect.width === containerClientRect.width) {
            return;
        }
        var flyoutTransformLeft = 0;
        if (alignTo === 'left') {
            // Align left edge of columns with links to left edge of the flyout trigger.
            flyoutTransformLeft = flyoutTriggerClientRect.left - containerClientRect.left;
        }
        else if (alignTo === 'right') {
            // Align left edge of columns with links to left edge of the flyout trigger.
            flyoutTransformLeft = flyoutTriggerClientRect.left + flyoutTriggerClientRect.width - containerClientRect.left - flyoutClientRect.width;
        }
        else {
            // Align center of columns with links to center of the flyout trigger.
            flyoutTransformLeft = flyoutTriggerClientRect.left - containerClientRect.left + flyoutTriggerClientRect.width / 2 - flyoutClientRect.width / 2;
        }
        // Make sure we don't pull flyout left out of container.
        flyoutTransformLeft = Math.max(0, flyoutTransformLeft);
        // Check if flyout would overflow container on the right.
        if (flyoutTransformLeft + flyoutClientRect.right > containerClientRect.right) {
            // If it would then stick it to the right side.
            flyoutTransformLeft = Math.floor(containerClientRect.width - flyoutClientRect.width);
        }
        this._setTransform($flyout, "translate3d(" + flyoutTransformLeft + "px, 0, 0)");
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
        $flyout.parent("." + this._options.itemClassName).addClass(this._options.itemClassName + "--active");
        $flyout.addClass(this._options.flyoutVisibleClassName);
    };
    /**
     * Makes given flyout visible by applying appropriate class with short delay.
     * @param {JQuery} $flyout Target flyout to set class to.
     */
    Navigation.prototype._showFlyoutDelay = function ($flyout) {
        var _this = this;
        this._showTimeout = setTimeout(function () {
            _this._showFlyout($flyout);
        }, this._options.flyoutShowDelay);
    };
    /**
     * Makes given flyout visible by applying appropriate class with short delay.
     * @param {JQuery} $flyout Target flyout to set class to.
     */
    Navigation.prototype._resetFlyoutDelay = function () {
        clearTimeout(this._showTimeout);
    };
    /**
     * Hides given flyout by applying appropriate class.
     * @param {JQuery} $flyout Target flyout to remove class from.
     */
    Navigation.prototype._hideFlyout = function ($flyout) {
        $flyout.parent("." + this._options.itemClassName).removeClass(this._options.itemClassName + "--active");
        $flyout.removeClass(this._options.flyoutVisibleClassName);
    };
    /**
     * Triggers browser layout reflow so we can get updated CSS values.
     * @param  {JQuery} $element Element to use to trigger reflow.
     */
    Navigation.prototype._triggerReflow = function ($element) {
        $element.prop('offsetWidth');
    };
    /**
     * Attaches events needed by navigation component.
     */
    Navigation.prototype._attachEvents = function () {
        var _this = this;
        this._eventListeners.resizeListener = function () {
            clearTimeout(_this._resizeTimeout);
            setTimeout(function () {
                _this._containerClientRect = _this._$container.get(0).getBoundingClientRect();
                _this._adjustFlyouts(_this._$flyouts);
            }, _this._options.resizeDebounce);
        };
        this._$window.on('resize orientationchange', this._eventListeners.resizeListener);
        this._eventListeners.itemFocusInListener = function (event) {
            var $targetFlyout = $(event.target).parent().find("." + _this._options.flyoutClassName);
            _this._hideFlyout(_this._$flyouts.not($targetFlyout));
            _this._showFlyout($targetFlyout);
        };
        // Don't let focus events propagate from flyouts to items.
        this._eventListeners.flyoutFocusInListener = function (event) {
            event.stopPropagation();
        };
        this._eventListeners.focusOutListener = function (event) {
            _this._hideFlyout($(event.target)
                .closest("." + _this._options.itemClassName)
                .find("." + _this._options.flyoutClassName));
        };
        this._eventListeners.itemMouseenterListener = function (event) {
            _this._showFlyoutDelay($(event.target)
                .closest("." + _this._options.itemClassName)
                .find("." + _this._options.flyoutClassName));
        };
        this._eventListeners.itemMouseleaveListener = function (event) {
            clearTimeout(_this._showTimeout);
            _this._hideFlyout($(event.target)
                .closest("." + _this._options.itemClassName)
                .find("." + _this._options.flyoutClassName));
        };
        var $items = $("." + this._options.itemClassName);
        $items.on('focusin', this._eventListeners.itemFocusInListener);
        $items.on('mouseenter', this._eventListeners.itemMouseenterListener);
        $items.on('mouseleave', this._eventListeners.itemMouseleaveListener);
        this._$flyouts.on('focusin', this._eventListeners.flyoutFocusInListener);
        // When the last link from flyout loses focus.
        $items.find('a:last').on('focusout', this._eventListeners.focusOutListener);
    };
    /**
     * Detaches events set by navigation component.
     */
    Navigation.prototype._detachEvents = function () {
        this._$window.off('resize orientationchange', this._eventListeners.resizeListener);
        var $items = $("." + this._options.itemClassName);
        $items.off('mouseenter', this._eventListeners.itemMouseenterListener);
        $items.off('mouseleave', this._eventListeners.itemMouseleaveListener);
        $items.off('focusin', this._eventListeners.itemFocusInListener);
        this._$flyouts.off('focusin', this._eventListeners.flyoutFocusInListener);
        // When the last link from flyout loses focus.
        $items.find('a:last').off('focusout', this._eventListeners.focusOutListener);
    };
    return Navigation;
}());

return Navigation;

})));
//# sourceMappingURL=navigation.js.map
