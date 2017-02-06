(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('offcanvasNavigation', ['jquery'], factory) :
    (global.offcanvasNavigation = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Offcanvas navigation component responsible for multilevel offcanvas navigation menu.
 */
var OffcanvasNavigation = (function () {
    /**
     * Creates offcanvas navigation with optional given element and options.
     * @param  {JQuery}                     $element jQuery element to initialize navigation on.
     * @param  {OffcanvasNavigationOptions} options  Optional settings for a component.
     */
    function OffcanvasNavigation($element, options) {
        this._eventListeners = {};
        this._options = $.extend({
            className: 'offcanvas-navigation',
            contentSetter: null,
        }, options);
        this._$element = $element || $("." + this._options.className);
        if (this._$element.length === 0) {
            return;
        }
        if (typeof this._options.contentSetter === 'function') {
            this._options.contentSetter(this);
        }
        this._$parentLink = this._$element.find("." + this._options.className + "__link--parent");
        this._$returnLink = this._$element.find("." + this._options.className + "__link--return");
        this._addEventListeners();
    }
    /**
     * Returns component element.
     * @return {JQuery} Component element.
     */
    OffcanvasNavigation.prototype.getElement = function () {
        return this._$element;
    };
    /**
     * Shows next navigation level based on clicked parent link.
     * @param {Event} event [description]
     */
    OffcanvasNavigation.prototype._showLevel = function (event) {
        var _this = this;
        event.preventDefault();
        var $levelToShow = $(event.target).next();
        var $currentLevel = $("." + this._options.className + "__list--current");
        if ($currentLevel.length > 0) {
            $currentLevel.animate({ scrollTop: 0 }, 'medium', function () {
                $currentLevel.removeClass(_this._options.className + "__list--current");
                $levelToShow.addClass(_this._options.className + "__list--active " + _this._options.className + "__list--current");
            });
        }
        else {
            $levelToShow.addClass(this._options.className + "__list--active " + this._options.className + "__list--current");
        }
    };
    /**
     * Hides current navigation level based on clicked return link.
     * @param {Event} event [description]
     */
    OffcanvasNavigation.prototype._hideLevel = function (event) {
        event.preventDefault();
        var $levelToHide = $(event.target).closest("." + this._options.className + "__list");
        $levelToHide.removeClass(this._options.className + "__list--active " + this._options.className + "__list--current");
        $levelToHide.closest("." + this._options.className + "__list--active").addClass(this._options.className + "__list--current");
    };
    /**
     * Resets levels to root.
     */
    OffcanvasNavigation.prototype._resetLevels = function () {
        this._$element.find("." + this._options.className + "__list").removeClass(this._options.className + "__list--active " + this._options.className + "__list--current");
    };
    /**
     * Sets up event listeners for a component.
     */
    OffcanvasNavigation.prototype._addEventListeners = function () {
        this._eventListeners.offcanvasHide = this._resetLevels.bind(this);
        $(document).on('offcanvas-hide', this._eventListeners.offcanvasHide);
        this._eventListeners.parentLinkClick = this._showLevel.bind(this);
        this._$parentLink.on('click', this._eventListeners.parentLinkClick);
        this._eventListeners.returnLinkClick = this._hideLevel.bind(this);
        this._$returnLink.on('click', this._eventListeners.returnLinkClick);
    };
    /**
     * Removes event listeners for a component.
     */
    OffcanvasNavigation.prototype._removeEventListeners = function () {
        $(document).off('offcanvas-hide', this._eventListeners.offcanvasHide);
        this._$parentLink.off('click', this._eventListeners.parentLinkClick);
        this._$returnLink.off('click', this._eventListeners.returnLinkClick);
    };
    return OffcanvasNavigation;
}());

return OffcanvasNavigation;

})));
//# sourceMappingURL=offcanvas-navigation.js.map
