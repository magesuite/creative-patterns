(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mage/translate')) :
    typeof define === 'function' && define.amd ? define('ccComponentCategoryLinksPreview', ['mage/translate'], factory) :
    (global.ccComponentCategoryLinksPreview = factory(global.$t));
}(this, (function ($t) { 'use strict';

$t = 'default' in $t ? $t['default'] : $t;

/**
 * Brand carousel preview component.
 * This component is responsible for displaying preview of brand carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentCategoryLinksPreview = {
    template: "<div class=\"cc-component-category-links-preview\">\n        <div class=\"cc-component-category-links-preview__wrapper\">\n            <h1 class=\"cc-component-category-links-preview__headline\">{{ configuration.main_category_labels[0] }}</h1>\n            <div class=\"cc-component-category-links-preview__content\">\n                <ul class=\"cc-component-category-links-preview__subcats\">\n                    <template v-for=\"(index, label) in configuration.sub_categories_labels\">\n                        <li class=\"cc-component-category-links-preview__subcat\" v-if=\"index < configuration.sub_categories_labels.length\">\n                            <span class=\"cc-component-category-links-preview__subcat-label\">{{ label }}</span>\n                        </li>\n                    </template>\n                </ul>\n\n                <div class=\"cc-component-category-links-preview__all-button\">\n                    <span class=\"cc-component-category-links-preview__all-button-text\">" + $t('All products') + "</span>\n                </div>\n            </div>\n        </div>\n    </div>",
    props: {
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

return ccComponentCategoryLinksPreview;

})));
//# sourceMappingURL=cc-component-category-links-preview.js.map
