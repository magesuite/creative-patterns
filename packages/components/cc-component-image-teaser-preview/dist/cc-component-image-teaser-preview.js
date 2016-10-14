(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentImageTeaserPreview', factory) :
    (global.ccComponentImageTeaserPreview = factory());
}(this, (function () { 'use strict';

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentImageTeaserPreview = {
    template: "<div class=\"cc-component-image-teaser-preview\">\n        <div class=\"cc-component-image-teaser-preview__items\">\n            <template v-for=\"item in configuration.items\">\n                <div class=\"cc-component-image-teaser-preview__item-wrapper-outer\" id=\"cc-image-teaser-item-{{ $index }}\" v-show=\"configuration.items[$index].image\">\n                    <div class=\"cc-component-image-teaser-preview__item-wrapper-inner\">\n                        <div class=\"cc-component-image-teaser-preview__item\">\n                            <img :src=\"configuration.items[$index].image\" class=\"cc-component-image-teaser-preview__item-image\">\n                            <h3 class=\"cc-component-image-teaser-preview__item-index\">Banner {{ $index+1 }}/{{ configuration.items.length }}</h3>\n                        </div>\n                    </div>\n                </div>\n            </template>\n        </div>\n    </div>",
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

return ccComponentImageTeaserPreview;

})));
//# sourceMappingURL=cc-component-image-teaser-preview.js.map
