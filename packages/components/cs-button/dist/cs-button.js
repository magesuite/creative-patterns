(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.csButton = global.csButton || {})));
}(this, (function (exports) { 'use strict';

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
            default: ''
        }
    }
};

exports['default'] = csButton;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-button.js.map
