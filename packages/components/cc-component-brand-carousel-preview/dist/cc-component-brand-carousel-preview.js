(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentBrandCarouselPreview', factory) :
    (global.ccComponentBrandCarouselPreview = factory());
}(this, (function () { 'use strict';

/**
 * Brand carousel preview component.
 * This component is responsible for displaying preview of brand carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentBrandCarouselPreview = {
    template: "<div class=\"cc-component-brand-carousel-preview\">\n        <svg class=\"cc-component-brand-carousel-preview__arrow cc-component-brand-carousel-preview__arrow--left\">\n            <use xlink:href=\"#icon_dashboard-arrow-left\"></use>\n        </svg>\n\n        <ul class=\"cc-component-brand-carousel-preview__list\">\n            <template v-for=\"item in 6\">\n                <li class=\"cc-component-brand-carousel-preview__list-item\">\n                    <div class=\"cc-component-brand-carousel-preview__brand-wrapper\">\n                        <svg class=\"cc-component-brand-carousel-preview__brand\">\n                            <use xlink:href=\"#icon_component-cc-brand-logo\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <svg class=\"cc-component-brand-carousel-preview__arrow cc-component-brand-carousel-preview__arrow--right\">\n            <use xlink:href=\"#icon_dashboard-arrow-right\"></use>\n        </svg>\n    </div>",
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

return ccComponentBrandCarouselPreview;

})));
//# sourceMappingURL=cc-component-brand-carousel-preview.js.map
