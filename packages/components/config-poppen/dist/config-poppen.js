(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('configPoppen', ['exports'], factory) :
    (factory((global.configPoppen = global.configPoppen || {})));
}(this, (function (exports) { 'use strict';

function add(a, b) {
    return a + b;
}
;

exports.add = add;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=config-poppen.js.map
