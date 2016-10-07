(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccImageTeaserConfigurator', factory) :
    (global.ccImageTeaserConfigurator = factory());
}(this, (function () { 'use strict';

/**
 * Image teaser configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccImageTeaserConfigurator = {
    template: "<form class=\"cc-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-width\" class=\"cs-input__label\">Teaser width:</label>\n                <select name=\"cfg-it-width-select\" class=\"cs-input__select\" id=\"cfg-it-width\" v-model=\"configuration.teaserWidth\" @change=\"onChange\">\n                    <option value=\"full-width\" selected>Full browser width</option>\n                    <option value=\"limited-width\">Breaking point width (1280px)</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-images-per-slide\" class=\"cs-input__label\">Images per slide:</label>\n                <select name=\"cfg-it-images-per-slide\" class=\"cs-input__select\" id=\"cfg-it-images-per-slide\" v-model=\"configuration.itemsPerSlide\" @change=\"onChange\">\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                </select>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cc-image-teaser-configurator__teaser\">\n                <div v-for=\"item in configuration.items\" class=\"cc-image-teaser-configurator__teaser-unit\">\n                    <div class=\"cc-image-teaser-configurator__toolbar\">\n                        <span class=\"cc-image-teaser-configurator__teaser-unit-title\">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>\n                        <a href=\"#\" class=\"cc-image-teaser-configurator__upload-link href=\"#\">Upload image</a>\n                    </div>\n                    <div class=\"cc-image-teaser-configurator__image-holder-outer\">\n                        <div class=\"cc-image-teaser-configurator__image-holder-inner\">\n                            <input type=\"hidden\" value=\"\" class=\"cc-image-teaser-configurator__image-url\" v-model=\"configuration.items[$index].image\" @change=\"onChange\"> \n                        </div>\n                    </div>\n                    <div class=\"cs-input cs-input--type-required\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__label\">Headline:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__input\" @change=\"onChange\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-required\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                        <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__textarea cs-input__textarea--look-thin\" @change=\"onChange\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__input\" @change=\"onChange\">\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                        <input type=\"text\" v-model=\"item.ctaTarget\" id=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__input\" @change=\"onChange\">\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions\">\n            <button type=\"submit\">Save</button>\n        </section>\n    </form>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        /**
         * Property containing callback triggered when user saves component.
         */
        save: {
            type: Function,
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function,
        },
        configuration: {
            type: Object,
            default: function () {
                return {
                    teaserWidth: 'full-width',
                    itemsPerSlide: '5',
                    items: [
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                    ],
                };
            },
        },
    },
    methods: {
        onSave: function (event) {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-image-teaser-configurator__save', data);
            if (typeof this.save === 'function') {
                this.save(data);
            }
        },
        updateConfig: function () {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-image-teaser-configurator__change', data);
            if (typeof this.change === 'function') {
                this.change(data);
            }
        },
        onChange: function (event) {
            this.updateConfig();
        },
    },
};

return ccImageTeaserConfigurator;

})));
//# sourceMappingURL=cc-image-teaser-configurator.js.map
