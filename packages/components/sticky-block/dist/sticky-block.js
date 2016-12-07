(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('Stickyfill')) :
    typeof define === 'function' && define.amd ? define('stickyBlock', ['jquery', 'Stickyfill'], factory) :
    (global.stickyBlock = factory(global.jQuery,global.Stickyfill));
}(this, (function ($,Stickyfill) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
Stickyfill = 'default' in Stickyfill ? Stickyfill['default'] : Stickyfill;

var StickyBlock = (function () {
    /**
     * Creates new StickyBlock component with optional settings.
     * @param  {StickyBlockOptions} options  Optional settings object.
     */
    function StickyBlock($element) {
        this._$element = $element || $('.cs-sticky-block');
        this._initStickyBlock();
    }
    /**
     * Destroys stickyBlock component's functionality.
     * @param  {string} afterDestroyCssPosition  Optional CSS position after polyfill is destroyed.
     */
    StickyBlock.prototype.destroy = function (afterDestroyCssPosition) {
        Stickyfill.remove(this._$element[0]);
        this._$element.css('position', afterDestroyCssPosition);
    };
    /**
     * Rebuilds stickyBlock component.
     * Call it after layout changes.
     * Plugin launches it automatically after window resizes or device orientations changes.
     */
    StickyBlock.prototype.rebuild = function () {
        Stickyfill.rebuild();
    };
    /**
     * Initializes stickyBlock component's functionality.
     */
    StickyBlock.prototype._initStickyBlock = function () {
        if (Stickyfill && this._$element.length) {
            this._$element.Stickyfill();
        }
    };
    return StickyBlock;
}());

return StickyBlock;

})));
//# sourceMappingURL=sticky-block.js.map
