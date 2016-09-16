(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('csStickyElement', ['jquery'], factory) :
    (factory(global.$));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var StickyElement = (function () {
    function StickyElement($element, settings) {
        this._settings = {};
        this._$element = null;
        this._stickyKitInstance = null;
        this._$element = $element;
        this._settings = settings;
    }
    StickyElement.prototype.recalc = function () {
        $(document.body).trigger('sticky_kit:recalc');
    };
    StickyElement.prototype.detach = function () {
        this._$element.trigger('sticky_kit:detach');
    };
    StickyElement.prototype.init = function () {
        this._initStickyKit();
    };
    StickyElement.prototype._initStickyKit = function () {
        this._stickyKitInstance = this._$element.stick_in_parent(this._settings);
    };
    return StickyElement;
}());

window.StickyElement = StickyElement;

})));
//# sourceMappingURL=cs-sticky-element.js.map