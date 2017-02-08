(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentHeroCarouselPreview', factory) :
    (global.ccComponentHeroCarouselPreview = factory());
}(this, (function () { 'use strict';

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentHeroCarouselPreview = {
    template: "<div class=\"cc-component-hero-carousel-preview\">\n        <div class=\"cc-component-hero-carousel-preview__wrapper\">\n            <div class=\"cc-component-hero-carousel-preview__background\">\n                <img :src=\"configuration.items[0].image\" class=\"cc-component-hero-carousel-preview__background-image\">\n            </div>\n            <div class=\"cc-component-hero-carousel-preview__slides\">\n                <template v-for=\"item in configuration.items\">\n                     <img :src=\"configuration.items[$index].image\" class=\"cc-component-hero-carousel-preview__slide\">\n                </template>\n            </div>\n        </div>\n    </div>",
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

return ccComponentHeroCarouselPreview;

})));
//# sourceMappingURL=cc-component-hero-carousel-preview.js.map
