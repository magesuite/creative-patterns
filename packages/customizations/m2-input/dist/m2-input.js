(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('m2Input', ['exports'], factory) :
    (factory((global.m2Input = global.m2Input || {})));
}(this, (function (exports) { 'use strict';

function add(a, b) {
    return a + b;
}
;

exports.add = add;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=m2-input.js.map
