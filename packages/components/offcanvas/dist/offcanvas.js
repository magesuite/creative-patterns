(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('offcanvas', ['jquery'], factory) :
    (global.offcanvas = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var Offcanvas = (function () {
    /**
     * Creates new Hero component with optional settings.
     * @param {$element} Optional, element to be initialized as Hero component
     * @param {options}  Optional settings object.
     */
    function Offcanvas($element, options) {
        this._eventListeners = {};
        this._options = $.extend({
            className: 'cs-offcanvas',
            triggerSelector: '.cs-offcanvas-trigger',
            closeOnBlur: true,
            drawerTransitionDuration: 300,
            overlayTransitionDuration: 300,
        }, options);
        this._$element = $element || $("." + this._options.className);
        if (this._$element.length === 0) {
            return;
        }
        this._$drawer = this._$element.find("." + this._options.className + "__drawer");
        this._$overlay = this._$element.find("." + this._options.className + "__overlay");
        this._$trigger = $(this._options.triggerSelector);
        this._addEventListeners();
    }
    Offcanvas.prototype.show = function () {
        var _this = this;
        return Promise.all([
            this._showOverlay(),
            this._showDrawer(),
        ]).then(function () { return _this; });
    };
    Offcanvas.prototype.hide = function () {
        var _this = this;
        return Promise.all([
            this._hideOverlay(),
            this._hideDrawer(),
        ]).then(function () { return _this; });
    };
    Offcanvas.prototype._showOverlay = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$overlay.addClass(_this._options.className + "__overlay--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.overlayTransitionDuration);
        });
    };
    Offcanvas.prototype._hideOverlay = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$overlay.removeClass(_this._options.className + "__overlay--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.overlayTransitionDuration);
        });
    };
    Offcanvas.prototype._showDrawer = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$drawer.addClass(_this._options.className + "__drawer--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.drawerTransitionDuration);
        });
    };
    Offcanvas.prototype._hideDrawer = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$drawer.removeClass(_this._options.className + "__drawer--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.drawerTransitionDuration);
        });
    };
    Offcanvas.prototype._addEventListeners = function () {
        var _this = this;
        this._eventListeners.triggerClick = function () { return _this.show(); };
        this._$trigger.on('click', this._eventListeners.triggerClick);
        if (this._options.closeOnBlur) {
            this._eventListeners.overlayClick = function () { return _this.hide(); };
            this._$overlay.on('click', this._eventListeners.overlayClick);
        }
    };
    Offcanvas.prototype._removeEventListeners = function () {
        this._$trigger.off('click', this._eventListeners.triggerClick);
        this._$overlay.off('click', this._eventListeners.overlayClick);
    };
    return Offcanvas;
}());

return Offcanvas;

})));
//# sourceMappingURL=offcanvas.js.map
