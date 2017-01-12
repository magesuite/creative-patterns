(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('offcanvasNavigation', ['jquery'], factory) :
    (global.offcanvasNavigation = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var OffcanvasNavigation = (function () {
    /**
     * Creates new Hero component with optional settings.
     * @param {$element} Optional, element to be initialized as Hero component
     * @param {options}  Optional settings object.
     */
    function OffcanvasNavigation($element, options) {
        this._eventListeners = {};
        this._options = $.extend({
            className: 'cs-offcanvas-navigation',
            contentProvider: null,
        }, options);
        this._$element = $element || $("." + this._options.className);
        if (this._$element.length === 0) {
            return;
        }
        if (typeof this._options.contentProvider === 'function') {
            this._options.contentProvider(this._$element);
        }
        this._$parentLink = this._$element.find("." + this._options.className + "__link--parent");
        this._$returnLink = this._$element.find("." + this._options.className + "__link--return");
        this._addEventListeners();
    }
    OffcanvasNavigation.prototype._showLevel = function (event) {
        event.preventDefault();
        var $levelToShow = $(event.target).next();
        $levelToShow.addClass(this._options.className + "__list--active");
    };
    OffcanvasNavigation.prototype._hideLevel = function (event) {
        event.preventDefault();
        var $levelToHide = $(event.target).closest("." + this._options.className + "__list");
        $levelToHide.removeClass(this._options.className + "__list--active");
    };
    OffcanvasNavigation.prototype._addEventListeners = function () {
        this._eventListeners.parentLinkClick = this._showLevel.bind(this);
        this._$parentLink.on('click', this._eventListeners.parentLinkClick);
        this._eventListeners.returnLinkClick = this._hideLevel.bind(this);
        this._$returnLink.on('click', this._eventListeners.returnLinkClick);
    };
    OffcanvasNavigation.prototype._removeEventListeners = function () {
        this._$parentLink.off('click', this._eventListeners.parentLinkClick);
        this._$returnLink.off('click', this._eventListeners.returnLinkClick);
    };
    return OffcanvasNavigation;
}());

return OffcanvasNavigation;

})));
//# sourceMappingURL=offcanvas-navigation.js.map
