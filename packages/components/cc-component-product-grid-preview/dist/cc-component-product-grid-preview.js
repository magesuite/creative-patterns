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
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-product-grid-preview\" v-show=\"!isLoading\" v-el:scene>\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero_position == 'left' && configuration.hero_image\">\n            <img :src=\"configuration.hero_image\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero_headline\">{{ configuration.hero_headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero_subheadline\">{{ configuration.hero_subheadline }}</h3>\n                <template v-if=\"configuration.hero_url\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.button_label\">{{ configuration.button_label }}</button>\n                </template>\n            </div>\n        </div>\n\n        <ul v-bind:class=\"itemsGridClass\">\n            <template v-for=\"item in getItemsCount()\">\n                <li class=\"cc-component-product-grid-preview__list-item\">\n                    <div class=\"cc-component-product-grid-preview__product-wrapper\">\n                        <svg class=\"cc-component-product-grid-preview__product\">\n                            <use xlink:href=\"#icon_component-cc-product-teaser-item\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero_position == 'right' && configuration.hero_image\">\n            <img :src=\"configuration.hero_image\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero_headline\">{{ configuration.hero_headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero_subheadline\">{{ configuration.hero_subheadline }}</h3>\n                <template v-if=\"configuration.hero_url\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.button_label\">{{ configuration.button_label }}</button>\n                </template>\n            </div>\n        </div>\n    </div>",
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
            if (this.configuration.hero_position) {
                return "cc-component-product-grid-preview__list cc-component-product-grid-preview__list--" + this.configuration.hero_position;
            }
            return 'cc-component-product-grid-preview__list';
        },
    },
    ready: function () {
        this.setImagesLoadListener();
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
            return this.configuration.hero_position ? 6 : 10;
        }
    },
};

return ccComponentProductGridPreview;

})));
//# sourceMappingURL=cc-component-product-grid-preview.js.map
