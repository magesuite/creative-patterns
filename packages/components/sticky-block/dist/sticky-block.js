(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('stickyBlock', ['jquery'], factory) :
    (global.stickyBlock = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var StickyBlock = (function () {
    /**
     * Creates new StickyBlock component with optional settings.
     * @param  {StickyBlockOptions} options  Optional settings object.
     */
    function StickyBlock($element) {
        this._$el = $element || $('.cs-sticky-block');
        if (Stickyfill) {
            this._initStickyBlock();
        }
    }
    /**
     * Destroys stickyBlock component's functionality.
     * @param  {string} afterDestroyCssPosition  Optional CSS position after polyfill is destroyed.
     */
    StickyBlock.prototype.destroy = function (afterDestroyCssPosition) {
        Stickyfill.remove(this._$el[0]);
        this._$el.css('position', afterDestroyCssPosition);
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
        this._$el.Stickyfill();
    };
    return StickyBlock;
}());

return StickyBlock;

})));
//# sourceMappingURL=sticky-block.js.map
