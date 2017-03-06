(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentSeparatorPreview', factory) :
    (global.ccComponentSeparatorPreview = factory());
}(this, (function () { 'use strict';

/**
 * Separator preview component.
 * This component is responsible for displaying preview of separator component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentSeparatorPreview = {
    template: "<div class=\"cc-component-separator-preview\">\n        <hr class=\"cc-component-separator-preview__separator\">\n    </div>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

return ccComponentSeparatorPreview;

})));
//# sourceMappingURL=cc-component-separator-preview.js.map
