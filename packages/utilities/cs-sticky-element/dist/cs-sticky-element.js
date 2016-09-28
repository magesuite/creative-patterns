(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('csStickyElement', ['jquery'], factory) :
    (global.csStickyElement = factory(global.$));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var StickyElement$1 = (function () {
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

return StickyElement$1;

})));
//# sourceMappingURL=cs-sticky-element.js.map
