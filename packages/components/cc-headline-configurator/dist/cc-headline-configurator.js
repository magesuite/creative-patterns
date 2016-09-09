(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccHeadlineConfigurator', factory) :
    (global.ccHeadlineConfigurator = factory());
}(this, (function () { 'use strict';

/**
 * Headline configurator component.
 * This component is responsible for displaying headlines configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccHeadlineConfigurator = {
    template: "<form class=\"cc-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"cs-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"title\" id=\"cfg-headline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"cs-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"subtitle\" id=\"cfg-subheadline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: ''
        },
        /**
         * Property containing callback triggered when user saves component.
         */
        save: {
            type: Function
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function
        }
    },
    data: function () {
        return {
            title: '',
            subtitle: ''
        };
    },
    methods: {
        onChange: function (event) {
            var data = JSON.parse(JSON.stringify(this.$data));
            this.$dispatch('cc-headline-configurator__change', data);
            if (typeof this.change === 'function') {
                this.change(data);
            }
        },
        onSave: function (event) {
            var data = JSON.parse(JSON.stringify(this.$data));
            this.$dispatch('cc-headline-configurator__save', data);
            if (typeof this.save === 'function') {
                this.save(data);
            }
        }
    }
};

return ccHeadlineConfigurator;

})));
//# sourceMappingURL=cc-headline-configurator.js.map
