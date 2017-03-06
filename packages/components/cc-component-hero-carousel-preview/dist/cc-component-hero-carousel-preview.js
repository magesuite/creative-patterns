(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('ccComponentHeroCarouselPreview', ['jquery'], factory) :
    (global.ccComponentHeroCarouselPreview = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentHeroCarouselPreview = {
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-hero-carousel-preview\">\n        <div v-bind:class=\"sceneClass\" v-el:scene>\n            <div class=\"cc-component-hero-carousel-preview__slide\" v-if=\"configuration.items.length > 1\">\n                <img :src=\"configuration.items[configuration.items.length - 1].image\" class=\"cc-component-hero-carousel-preview__image\">\n            </div>\n\n            <template v-for=\"(index, item) in configuration.items\">\n                <div class=\"cc-component-hero-carousel-preview__slide\" v-if=\"index < 2\">\n                    <img :src=\"configuration.items[$index].image\" class=\"cc-component-hero-carousel-preview__image\">\n                    <div class=\"cc-component-hero-carousel-preview__slide-content\" v-if=\"index == 0 || configuration.items.length == 1\">\n                        <div class=\"cc-component-hero-carousel-preview__thumbs\">\n                            <template v-for=\"(idx, slide) in configuration.items\">\n                                <img :src=\"configuration.items[idx].image\" class=\"cc-component-hero-carousel-preview__thumb\">\n                            </template>\n                        </div>\n                        <div class=\"cc-component-hero-carousel-preview__slide-content-info\">\n                            <h2 class=\"cc-component-hero-carousel-preview__headline\" v-if=\"configuration.items[$index].headline\">{{ configuration.items[$index].headline }}</h2>\n                            <h3 class=\"cc-component-hero-carousel-preview__subheadline\" v-if=\"configuration.items[$index].subheadline\">{{ configuration.items[$index].subheadline }}</h3>\n                            <p class=\"cc-component-hero-carousel-preview__paragraph\" v-if=\"configuration.items[$index].paragraph\">{{ configuration.items[$index].paragraph }}</p>\n                            <template v-if=\"configuration.items[$index].href\">\n                                <button type=\"button\" class=\"cc-component-hero-carousel-preview__button\" v-if=\"configuration.items[$index].ctaLabel\">{{ configuration.items[$index].ctaLabel }}</button>\n                            </template>\n                        </div>\n                    </div>\n                </div>\n            </template>\n        </div>\n    </div>",
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
        isLoading: {
            type: Boolean,
            default: true,
        }
    },
    ready: function () {
        this.setImagesLoadListener();
    },
    computed: {
        sceneClass: function () {
            if (this.configuration.items.length > 1) {
                return 'cc-component-hero-carousel-preview__scene';
            }
            return 'cc-component-hero-carousel-preview__scene cc-component-hero-carousel-preview__scene--single';
        },
    },
    methods: {
        /**
         * Checks for status of images if they're loaded.
         * After they're all loaded spinner is hidden and content displayed.
         */
        setImagesLoadListener: function () {
            var _this = this;
            var $images = $(this.$els.scene).find('img');
            var imagesCount = $images.length;
            $images.load(function () {
                imagesCount--;
                if (!imagesCount) {
                    _this.isLoading = false;
                    $images.each(function () {
                        $(this).addClass('cc-component-hero-carousel-preview__image--border');
                    });
                }
            }).filter(function () { return this.complete; }).load();
        },
    },
};

return ccComponentHeroCarouselPreview;

})));
//# sourceMappingURL=cc-component-hero-carousel-preview.js.map
