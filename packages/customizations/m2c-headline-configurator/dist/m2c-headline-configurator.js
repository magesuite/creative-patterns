var m2CHeadlineConfigurator = (function () {
    'use strict';

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

    //import m2Iinput from '../../m2-input/src/m2-input';
    var m2cHeadlineConfigurator = {
        template: "<form class=\"m2c-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"m2-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"title\" id=\"cfg-headline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"m2-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"subtitle\" id=\"cfg-subheadline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n    </form>",
        mixins: [ccHeadlineConfigurator]
    };

    return m2cHeadlineConfigurator;

}());
//# sourceMappingURL=m2c-headline-configurator.js.map