(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('m2cHeadlineConfigurator', factory) :
    (global.m2cHeadlineConfigurator = factory());
}(this, (function () { 'use strict';

/**
 * Base configurator component.
 * This component is responsible for providing base functionality for other configurators.
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentConfigurator = {
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
         * For default, we are providing a dummy function so we can skip the type check.
         */
        save: {
            type: Function,
            default: function () { return function () { return undefined; }; },
        },
        /**
         * Property containing callback triggered when configuration is changed.
         * For default, we are providing a dummy function so we can skip the type check.
         */
        change: {
            type: Function,
            default: function () { return function () { return undefined; }; },
        },
        /**
         *
         */
        configuration: {
            type: String,
            default: function () { },
        },
    },
    methods: {
        onChange: function (event) {
            // Serialize reactive data.
            var data = JSON.parse(JSON.stringify(this.configuration));
            // Trigger event and callback.
            this.$dispatch('cc-component-configurator__changed', data);
            this.change(data);
        },
        onSave: function (event) {
            // Serialize reactive data.
            var data = JSON.parse(JSON.stringify(this.configuration));
            // Trigger event and callback.
            this.$dispatch('cc-component-configurator__saved', data);
            this.save(data);
        },
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            if (this._events['cc-component-configurator__save'].length === 1) {
                this.onSave();
            }
        },
    },
};

/**
 * Headline configurator component.
 * This component is responsible for displaying headlines configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccHeadlineConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"cs-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"configuration.title\" id=\"cfg-headline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"cs-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"configuration.subtitle\" id=\"cfg-subheadline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: {
                title: '',
                subtitle: '',
            },
        },
    },
};

/* tslint:disable:no-console */
// TODO: Use m2-input component the Vue way.
var m2cHeadlineConfigurator = {
    mixins: [
        ccHeadlineConfigurator,
    ],
    template: "<form class=\"m2c-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"m2-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"configuration.title\" id=\"cfg-headline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"m2-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"configuration.subtitle\" id=\"cfg-subheadline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n    </form>",
};

return m2cHeadlineConfigurator;

})));
//# sourceMappingURL=m2c-headline-configurator.js.map
