(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentPlaceholder', factory) :
    (global.ccComponentPlaceholder = factory());
}(this, (function () { 'use strict';

/**
 * Component placeholder component.
 */
var componentPlaceholder = {
    template: "<div class=\"cc-component-placeholder\">\n        <div class=\"cc-component-placeholder__content\">\n            <slot></slot>\n        </div>\n    </div>"
};

return componentPlaceholder;

})));
//# sourceMappingURL=cc-component-placeholder.js.map
