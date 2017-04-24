(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentStaticCmsBlockPreview', factory) :
    (global.ccComponentStaticCmsBlockPreview = factory());
}(this, (function () { 'use strict';

/**
 * CMS block preview component.
 * This component is responsible for displaying preview of CMS block component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentStaticCmsBlockPreview = {
    template: "<div class=\"cc-component-static-cms-block-preview\">\n        <div class=\"cc-component-static-cms-block-preview__content\">\n            <svg class=\"cc-component-static-cms-block-preview__bg\">\n                <use xlink:href=\"#icon_component-cms-block-preview\"></use>\n            </svg>\n            <h2 class=\"cc-component-static-cms-block-preview__title\">{{ configuration.title }}</h2>\n        </div>\n    </div>",
    props: {
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

return ccComponentStaticCmsBlockPreview;

})));
//# sourceMappingURL=cc-component-static-cms-block-preview.js.map
