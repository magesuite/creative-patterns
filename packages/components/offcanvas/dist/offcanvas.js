(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('offcanvas', ['jquery'], factory) :
    (global.offcanvas = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Offcanvas component for mobile off-screen content.
 */
var Offcanvas = (function () {
    /**
     * Creates new offcanvas component with optional settings.
     * @param {JQuery} $element Optional, element to be initialized on.
     * @param {OffcanvasOptions} options  Optional settings object.
     */
    function Offcanvas($element, options) {
        this._eventListeners = {};
        this._options = $.extend({
            className: 'offcanvas',
            triggerClassName: 'offcanvas-trigger',
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
        this._$trigger = $("." + this._options.triggerClassName);
        this._addEventListeners();
    }
    /**
     * Toggles offcanvas visibility depending on its current state.
     * @return {Promise<Offcanvas>} Promise that resolves after offcanvas ends toggling.
     */
    Offcanvas.prototype.toggle = function () {
        if (this._$trigger.hasClass(this._options.triggerClassName + "--active")) {
            return this.hide();
        }
        return this.show();
    };
    /**
     * Shows offcanvas.
     * @return {Promise<Offcanvas>} Promise that resolves after offcanvas is shown.
     */
    Offcanvas.prototype.show = function () {
        var _this = this;
        $('body, html').addClass("no-scroll");
        this._$trigger.addClass(this._options.triggerClassName + "--active");
        return Promise.all([
            this._showOverlay(),
            this._showDrawer(),
        ]).then(function () {
            _this._$element.trigger('offcanvas-show', _this);
            return _this;
        });
    };
    /**
     * Hides offcanvas.
     * @return {Promise<Offcanvas>} Promise that resolves after offcanvas is hidden.
     */
    Offcanvas.prototype.hide = function () {
        var _this = this;
        $('body, html').removeClass("no-scroll");
        this._$trigger.removeClass(this._options.triggerClassName + "--active");
        return Promise.all([
            this._hideOverlay(),
            this._hideDrawer(),
        ]).then(function () {
            _this._$element.trigger('offcanvas-hide', _this);
            return _this;
        });
    };
    /**
     * Shows overlay.
     * @return {Promise<Offcanvas>} Promise that resolves after overlay is shown.
     */
    Offcanvas.prototype._showOverlay = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$overlay.addClass(_this._options.className + "__overlay--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.overlayTransitionDuration);
        });
    };
    /**
     * Hides overlay.
     * @return {Promise<Offcanvas>} Promise that resolves after offcanvas is hidden.
     */
    Offcanvas.prototype._hideOverlay = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$overlay.removeClass(_this._options.className + "__overlay--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.overlayTransitionDuration);
        });
    };
    /**
     * Shows offcanvas drawer.
     * @return {Promise<Offcanvas>} Promise that resolves after offcanvas drawer is shown.
     */
    Offcanvas.prototype._showDrawer = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$drawer.addClass(_this._options.className + "__drawer--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.drawerTransitionDuration);
        });
    };
    /**
     * Hides offcanvas drawer.
     * @return {Promise<Offcanvas>} Promise that resolves after offcanvas drawer is hidden.
     */
    Offcanvas.prototype._hideDrawer = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._$drawer.removeClass(_this._options.className + "__drawer--visible");
            setTimeout(function () { return resolve(_this); }, _this._options.drawerTransitionDuration);
        });
    };
    /**
     * Attaches event listeners.
     */
    Offcanvas.prototype._addEventListeners = function () {
        var _this = this;
        this._eventListeners.triggerClick = function () { return _this.toggle(); };
        this._$trigger.on('click', this._eventListeners.triggerClick);
        if (this._options.closeOnBlur) {
            this._eventListeners.overlayClick = function () { return _this.hide(); };
            this._$overlay.on('click', this._eventListeners.overlayClick);
        }
    };
    /**
     * Removes event listeners.
     */
    Offcanvas.prototype._removeEventListeners = function () {
        this._$trigger.off('click', this._eventListeners.triggerClick);
        this._$overlay.off('click', this._eventListeners.overlayClick);
    };
    return Offcanvas;
}());

return Offcanvas;

})));
//# sourceMappingURL=offcanvas.js.map
