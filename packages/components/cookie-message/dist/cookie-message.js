(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('cookieMessage', ['jquery'], factory) :
    (global.cookieMessage = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * CookieMessage displays legal cookie note on the bottom of the page due to EU law.
 */
var CookieMessage = (function () {
    /**
     * Creates and initiates new CookieMessage component with given settings.
     * @param  {$wrapper} JQuery components' wrapper.
     * @param  {ICookieMessageSettings} settings Optional component settings.
     */
    function CookieMessage($wrapper, settings) {
        this.status = 'not-fired';
        if ($wrapper.length) {
            this._settings = $.extend(true, {}, {
                lifetime: 180,
                destroyDelay: 250,
                ajaxUrl: 'cookie-message/set-cookie',
            }, settings);
            this.$wrapper = $wrapper;
            this.showMessage();
            this._setEvents();
        }
    }
    /**
     * Adds class to $wrapper that shows cookie message
     */
    CookieMessage.prototype.showMessage = function () {
        this.$wrapper.addClass('cs-cookie-message--shown');
        this.status = 'active';
        if (this._settings.onShown && typeof (this._settings.onShown) === 'function') {
            this._settings.onShown();
        }
    };
    /**
     * Removes class to $wrapper that shows cookie message (hides it)
     */
    CookieMessage.prototype.hideMessage = function () {
        this.$wrapper.removeClass('cs-cookie-message--shown');
        this.status = 'inactive';
    };
    /**
     * Destroys component when it's no longer needed
     */
    CookieMessage.prototype.destroyMessage = function ($btn) {
        var _this = this;
        this.hideMessage();
        setTimeout(function () {
            _this.$wrapper.remove();
            _this.status = 'destroyed';
            if (_this._settings.onDestroyed && typeof (_this._settings.onDestroyed) === 'function') {
                _this._settings.onDestroyed();
            }
        }, this._settings.destroyDelay);
        if ($btn && $btn.length) {
            $btn.off('click');
        }
    };
    /**
     * Returns base url of current page
     * @return  {string} origin url.
     */
    CookieMessage.prototype._getLocationOrigin = function () {
        if (typeof window.location.origin === 'undefined') {
            return window.location.protocol + "//" + window.location.host;
        }
        return window.location.origin;
    };
    /**
     * Sends AJAX request to backend to inform that cookie should be set.
     * Additionally passes lifetime according to settings
     */
    CookieMessage.prototype._setCookie = function () {
        $.ajax({
            method: 'POST',
            url: this._getLocationOrigin() + "/" + this._settings.ajaxUrl,
            data: { cookieLifetime: this._settings.lifetime },
        });
    };
    /**
     * Sets click event for agreement button
     */
    CookieMessage.prototype._setEvents = function () {
        var _this = this;
        var $btn = this.$wrapper.find('button');
        if ($btn.length) {
            $btn.on('click', function () {
                _this._setCookie();
                _this.destroyMessage($btn);
            });
        }
    };
    return CookieMessage;
}());

return CookieMessage;

})));
//# sourceMappingURL=cookie-message.js.map
