(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('csButton', factory) :
    (global.csButton = factory());
}(this, (function () { 'use strict';

/**
 * Button component version.
 * Small component that allows to set its content.
 *
 * @type {vuejs.ComponentOption} Vue component object.
 * TODO: Write some simple unit tests for object below.
 */
var csButton = {
    template: "<button class=\"cs-button {{ class }}\">\n        <slot></slot>\n    </button>",
    props: {
        /**
         * Class property support.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

return csButton;

})));
//# sourceMappingURL=cs-button.js.map
