(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mage/translate')) :
    typeof define === 'function' && define.amd ? define('ccComponentMagentoProductGridTeasersPreview', ['mage/translate'], factory) :
    (global.ccComponentMagentoProductGridTeasersPreview = factory(global.$t));
}(this, (function ($t) { 'use strict';

$t = 'default' in $t ? $t['default'] : $t;

/**
 * Magento products-grid teasers preview component.
 * This component displays preview of magento-product-grid-teasers component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentMagentoProductGridTeasersPreview = {
    template: "<div class=\"cc-component-magento-product-grid-teasers-preview\">\n        <ul class=\"cc-component-magento-product-grid-teasers-preview__list\">\n            <li class=\"cc-component-magento-product-grid-teasers-preview__list-item cc-component-magento-product-grid-teasers-preview__list-item--teaser\">\n                <svg class=\"cc-component-magento-product-grid-teasers-preview__image-placeholder\">\n                    <use xlink:href=\"#icon_image-placeholder\"></use>\n                </svg>\n            </li>\n\n            <template v-for=\"i in 7\">\n                <li class=\"cc-component-magento-product-grid-teasers-preview__list-item\">\n                    <div class=\"cc-component-magento-product-grid-teasers-preview__product-wrapper\">\n                        <svg class=\"cc-component-magento-product-grid-teasers-preview__product\">\n                            <use xlink:href=\"#icon_component-cc-product-teaser-item\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n\n            <li class=\"cc-component-magento-product-grid-teasers-preview__list-item cc-component-magento-product-grid-teasers-preview__list-item--text\">\n                <div>\n                    <div class=\"cc-component-magento-product-grid-teasers-preview__teasers-count\">\n                        {{ teasersLength }}\n                    </div>\n                    " + $t('teasers') + "\n                </div>\n            </li>\n        </ul>\n    </div>",
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
    computed: {
        teasersLength: function () {
            return this.configuration && this.configuration.teasers ? this.configuration.teasers.length : 0;
        },
    },
};

return ccComponentMagentoProductGridTeasersPreview;

})));
//# sourceMappingURL=cc-component-magento-product-grid-teasers-preview.js.map
