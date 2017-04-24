(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentParagraphPreview', factory) :
    (global.ccComponentParagraphPreview = factory());
}(this, (function () { 'use strict';

/**
 * Paragraph preview component.
 * This component is responsible for displaying preview of Paragraph component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentParagraphPreview = {
    template: "<div class=\"cc-component-paragraph-preview\">\n        <div class=\"cc-component-paragraph-preview__content\">\n            <svg class=\"cc-component-paragraph-preview__bg\">\n                <use xlink:href=\"#icon_component-paragraph-preview\"></use>\n            </svg>\n            <h2 class=\"cc-component-paragraph-preview__title\">{{ configuration.title }}</h2>\n        </div>\n    </div>",
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
    }
};

return ccComponentParagraphPreview;

})));
//# sourceMappingURL=cc-component-paragraph-preview.js.map
