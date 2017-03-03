(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('ccComponentImageTeaserPreview', ['jquery'], factory) :
    (global.ccComponentImageTeaserPreview = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentImageTeaserPreview = {
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-image-teaser-preview\" v-show=\"!isLoading\">\n        <div class=\"cc-component-image-teaser-preview__wrapper\">\n            <ul class=\"cc-component-image-teaser-preview__scene cc-component-image-teaser-preview__scene--{{ configuration.currentScenario.desktopLayout.id }}-in-row\" v-el:scene>\n                <template v-for=\"item in configuration.items\">\n                    <li class=\"cc-component-image-teaser-preview__item\" v-show=\"configuration.items[$index].image\">\n                        <img :src=\"configuration.items[$index].image\" class=\"cc-component-image-teaser-preview__item-image\">\n                        <div class=\"cc-component-image-teaser-preview__item-content\">\n                            <h2 class=\"cc-component-image-teaser-preview__headline\" v-if=\"configuration.items[$index].headline\">{{ configuration.items[$index].headline }}</h2>\n                            <h3 class=\"cc-component-image-teaser-preview__subheadline\" v-if=\"configuration.items[$index].subheadline\">{{ configuration.items[$index].subheadline }}</h3>\n                            <p class=\"cc-component-image-teaser-preview__paragraph\" v-if=\"configuration.items[$index].paragraph\">{{ configuration.items[$index].paragraph }}</p>\n                            <template v-if=\"configuration.items[$index].href\">\n                                <button type=\"button\" class=\"cc-component-image-teaser-preview__button\" v-if=\"configuration.items[$index].ctaLabel\">{{ configuration.items[$index].ctaLabel }}</button>\n                            </template>\n                        </div>\n                    </li>\n                </template>\n            </ul>\n        </div>\n    </div>",
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
                        $(this).addClass('cc-component-image-teaser-preview__item-image--border');
                    });
                }
            }).filter(function () { return this.complete; }).load();
        },
    }
};

return ccComponentImageTeaserPreview;

})));
//# sourceMappingURL=cc-component-image-teaser-preview.js.map
