(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentProductCarouselPreview', factory) :
    (global.ccComponentProductCarouselPreview = factory());
}(this, (function () { 'use strict';

/**
 * Product carousel preview component.
 * This component is responsible for displaying preview of product carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentProductCarouselPreview = {
    template: "<div class=\"cc-component-product-carousel-preview\">\n        <svg class=\"cc-component-product-carousel-preview__arrow cc-component-product-carousel-preview__arrow--left\">\n            <use xlink:href=\"#icon_dashboard-arrow-left\"></use>\n        </svg>\n\n        <ul class=\"cc-component-product-carousel-preview__list\">\n            <template v-for=\"item in 4\">\n                <li class=\"cc-component-product-carousel-preview__list-item\">\n                    <div class=\"cc-component-product-carousel-preview__product-wrapper\">\n                        <svg class=\"cc-component-product-carousel-preview__product\">\n                            <use xlink:href=\"#icon_component-cc-product-teaser-item\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <svg class=\"cc-component-product-carousel-preview__arrow cc-component-product-carousel-preview__arrow--right\">\n            <use xlink:href=\"#icon_dashboard-arrow-right\"></use>\n        </svg>\n    </div>",
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
        /**
         * Assets (icons) source path.
         */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
};

return ccComponentProductCarouselPreview;

})));
//# sourceMappingURL=cc-component-product-carousel-preview.js.map
