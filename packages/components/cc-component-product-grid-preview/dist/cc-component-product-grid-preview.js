(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('ccComponentProductGridPreview', ['jquery'], factory) :
    (global.ccComponentProductGridPreview = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Product carousel preview component.
 * This component is responsible for displaying preview of product carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentProductGridPreview = {
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-product-grid-preview\" v-show=\"!isLoading\" v-el:scene>\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero.position == 'left'\">\n            <img v-if=\"configuration.hero.image.src\" :src=\"configuration.hero.image.src\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-placeholder-wrapper\" v-show=\"!configuration.hero.image.src\">\n                <svg class=\"cc-component-product-grid-preview__hero-placeholder\">\n                    <use xlink:href=\"#icon_image-placeholder\"></use>\n                </svg>\n            </div>\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero.headline\">{{ configuration.hero.headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero.subheadline\">{{ configuration.hero.subheadline }}</h3>\n                <p class=\"cc-component-product-grid-preview__paragraph\" v-if=\"configuration.hero.paragraph\">{{ configuration.hero.paragraph }}</p>\n                <template v-if=\"configuration.hero.href\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.hero.button.label\">{{ configuration.hero.button.label }}</button>\n                </template>\n            </div>\n        </div>\n\n        <ul v-bind:class=\"itemsGridClass\">\n            <template v-for=\"item in getItemsCount()\">\n                <li class=\"cc-component-product-grid-preview__list-item\">\n                    <div class=\"cc-component-product-grid-preview__product-wrapper\">\n                        <svg class=\"cc-component-product-grid-preview__product\">\n                            <use xlink:href=\"#icon_component-cc-product-teaser-item\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero.position == 'right'\">\n            <img v-if=\"configuration.hero.image.src\" :src=\"configuration.hero.image.src\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-placeholder-wrapper\" v-show=\"!configuration.hero.image.src\">\n                <svg class=\"cc-component-product-grid-preview__hero-placeholder\">\n                    <use xlink:href=\"#icon_image-placeholder\"></use>\n                </svg>\n            </div>\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero.headline\">{{ configuration.hero.headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero.subheadline\">{{ configuration.hero.subheadline }}</h3>\n                <p class=\"cc-component-product-grid-preview__paragraph\" v-if=\"configuration.hero.paragraph\">{{ configuration.hero.paragraph }}</p>\n                <template v-if=\"configuration.hero.href\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.hero.button.label\">{{ configuration.hero.button.label }}</button>\n                </template>\n            </div>\n        </div>\n    </div>",
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
    computed: {
        itemsGridClass: function () {
            if (this.configuration.hero.position) {
                return "cc-component-product-grid-preview__list cc-component-product-grid-preview__list--" + this.configuration.hero.position;
            }
            return 'cc-component-product-grid-preview__list';
        },
    },
    ready: function () {
        this.setImagesLoadListener();
        this.hideEmptySlideContents();
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
            if (imagesCount) {
                $images.load(function () {
                    imagesCount--;
                    if (!imagesCount) {
                        _this.isLoading = false;
                    }
                }).filter(function () { return this.complete; }).load();
            }
            else {
                _this.isLoading = false;
            }
        },
        getItemsCount: function () {
            return this.configuration.hero.position ? 6 : 10;
        },
        hideEmptySlideContents: function () {
            $(this.$els.scene).find('.cc-component-product-grid-preview__hero-content').each(function () {
                if (!$(this).children().length) {
                    $(this).hide();
                }
            });
        },
    },
};

return ccComponentProductGridPreview;

})));
//# sourceMappingURL=cc-component-product-grid-preview.js.map
