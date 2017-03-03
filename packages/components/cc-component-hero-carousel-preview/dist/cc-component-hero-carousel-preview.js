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
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-hero-carousel-preview\">\n        <div class=\"cc-component-hero-carousel-preview__wrapper\">\n            <div class=\"cc-component-hero-carousel-preview__scene\" v-el:scene>\n                <template v-for=\"item in configuration.items\">\n                    <div class=\"cc-component-hero-carousel-preview__slide\">\n                        <img :src=\"configuration.items[$index].image\" class=\"cc-component-hero-carousel-preview__image\">\n                        <div class=\"cc-component-hero-carousel-preview__slide-content\">\n                            <h2 class=\"cc-component-hero-carousel-preview__headline\" v-if=\"configuration.items[$index].headline\">{{ configuration.items[$index].headline }}</h2>\n                            <h3 class=\"cc-component-hero-carousel-preview__subheadline\" v-if=\"configuration.items[$index].subheadline\">{{ configuration.items[$index].subheadline }}</h3>\n                            <p class=\"cc-component-hero-carousel-preview__paragraph\" v-if=\"configuration.items[$index].paragraph\">{{ configuration.items[$index].paragraph }}</p>\n                            <template v-if=\"configuration.items[$index].href\">\n                                <button type=\"button\" class=\"cc-component-hero-carousel-preview__button\" v-if=\"configuration.items[$index].ctaLabel\">{{ configuration.items[$index].ctaLabel }}</button>\n                            </template>\n                        </div>\n                    </div>\n                </template>\n            </div>\n            <div class=\"cc-component-hero-carousel-preview__thumbs\">\n                <template v-for=\"item in configuration.items\">\n                    <img :src=\"configuration.items[$index].image\" class=\"cc-component-hero-carousel-preview__thumb\" width=\"100px\">\n                </template>\n            </div>\n        </div>\n    </div>",
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
        var _this = this;
        var resizeTimer = undefined;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                _this.setSceneTranslate();
            }, 250);
        });
        this.setSceneTranslate();
        this.setImagesLoadListener();
    },
    methods: {
        /**
         * Sets negative transform: translateX() for scene to display images in center
         */
        setSceneTranslate: function () {
            $(this.$els.scene).css('transform', "translateX( " + -Math.abs(this._getCalculatedHalfSceneWidth()) + "px )");
        },
        /**
         * Calculates half of whole scene width
         * 74% (slide width) of container's width * number of images devides by 2
         * then this value has to be reduced by half of container width
         */
        _getCalculatedHalfSceneWidth: function () {
            var containerWidth = $(this.$els.scene).outerWidth(true);
            return Math.round(((((74 / 100) * containerWidth) * this.configuration.items.length) / 2) - (containerWidth / 2));
        },
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
