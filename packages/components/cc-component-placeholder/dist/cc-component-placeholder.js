(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.ccComponentPlaceholder = global.ccComponentPlaceholder || {})));
}(this, (function (exports) { 'use strict';

/**
 * Component placeholder component.
 */
var componentPlaceholder = {
    template: "<div class=\"cc-component-placeholder\">\n        <div class=\"cc-component-placeholder__content\">\n            <slot></slot>\n        </div>\n    </div>"
};

exports['default'] = componentPlaceholder;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cc-component-placeholder.js.map
