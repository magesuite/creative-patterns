var ccHeadlineConfigurator = (function () {
    'use strict';

    /**
     * Headline configurator component.
     * This component is responsible for displaying headlines configuration form
     * @type {vuejs.ComponentOption} Vue component object.
     */
    var ccHeadlineConfigurator = {
        template: "<form class=\"cc-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"cs-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"title\" id=\"cfg-headline\" class=\"cs-input__input\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"cs-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"subtitle\" id=\"cfg-subheadline\" class=\"cs-input__input\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
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
            }
        },
        data: function () {
            return {
                headline: {
                    title: '',
                    subtitle: ''
                }
            };
        },
        methods: {
            onSave: function (event) {
                this.$dispatch('cc-headline-configurator__save', this._data);
                if (typeof this.save === 'function') {
                    this.save(this._data);
                }
            }
        }
    };

    return ccHeadlineConfigurator;

}());
//# sourceMappingURL=cc-headline-configurator.js.map