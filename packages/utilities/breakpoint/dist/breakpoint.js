(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('breakpoint', factory) :
    (global.breakpoint = factory());
}(this, (function () { 'use strict';

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
    .getPropertyValue('content').slice(1, -1).replace(/\\"/g, '"')); };
/**
 * Returs current breakpoint set by CSS.
 * @return {number} Current breakpoint in number of pixels.
 */
var getCurrentBreakpoint = function () { return +window.getComputedStyle(body, ':after')
    .getPropertyValue('content').replace(/['"]/g, ''); };
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

return breakpoint;

})));
//# sourceMappingURL=breakpoint.js.map
