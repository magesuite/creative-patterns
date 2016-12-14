(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('Stickyfill')) :
    typeof define === 'function' && define.amd ? define('stickyBlock', ['jquery', 'Stickyfill'], factory) :
    (global.stickyBlock = factory(global.jQuery,global.Stickyfill));
}(this, (function ($,Stickyfill) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
Stickyfill = 'default' in Stickyfill ? Stickyfill['default'] : Stickyfill;

/**
 * Breakpoint utility for sharing breakpoints between CSS and JS.
 */
/**
 * Converts dash-case to camelCase.
 * @type {Function}
 */
var camelCase = function (input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group) {
        return group.toUpperCase();
    });
};
/**
 * Returns object containign available breakpoints.
 * @return {Object} Object containing avaliable breakpoints in shape { breakpointName: pixelsNumber }
 */
var getAvaliableBreakpoints = function () { return JSON.parse(window.getComputedStyle(body, ':before')
    .getPropertyValue('content').replace(/"/g, '').replace(/\\/g, '"')); };
/**
 * Returs current breakpoint set by CSS.
 * @return {number} Current breakpoint in number of pixels.
 */
var getCurrentBreakpoint = function () { return +window.getComputedStyle(body, ':after')
    .getPropertyValue('content').replace(/"/g, ''); };
var body = document.querySelector('body');
/**
 * Module cache to export.
 * @type {Object}
 */
var breakpoint = {
    current: getCurrentBreakpoint(),
};
/**
 * Available breakpoints cache.
 */
var breakpoints = getAvaliableBreakpoints();
// Extend breakpoint module with available breakpoint keys converted to camelCase.
Object.keys(breakpoints).forEach(function (breakpointName) {
    breakpoint[camelCase(breakpointName)] = breakpoints[breakpointName];
});
// Let's check if we can register passive resize event for better performance.
var passiveOption = undefined;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            passiveOption = { passive: true };
        },
    });
    window.addEventListener('test', null, opts);
}
catch (e) { }
// Update current breakpoint on every resize.
window.addEventListener('resize', function () {
    breakpoint.current = getCurrentBreakpoint();
}, passiveOption);

var StickyBlock = (function () {
    /**
     * Creates new StickyBlock component with optional settings.
     * @param  {StickyBlockOptions} options  Optional settings object.
     */
    function StickyBlock($element, options) {
        this._$element = $element || $('.cs-sticky-block');
        this._options = $.extend(this._options, options);
        this._options.breakpoint = this._options.breakpoint || 1024;
        if (Stickyfill && this._$element.length) {
            this._initStickyBlock();
            this._setResizeEvent();
        }
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
        if (breakpoint.current >= this._options.breakpoint) {
            this._$element.Stickyfill();
        }
    };
    /**
     * Toggles init or destroy based on given breakpoint
     */
    StickyBlock.prototype._setResizeEvent = function () {
        var _this = this;
        $(window).on('resize', function () {
            if (breakpoint.current >= _this._options.breakpoint && !Stickyfill.stickies.length) {
                _this._$element.Stickyfill();
            }
            else if (breakpoint.current < _this._options.breakpoint && Stickyfill.stickies.length) {
                _this.destroy();
            }
        });
    };
    return StickyBlock;
}());

return StickyBlock;

})));
//# sourceMappingURL=sticky-block.js.map
