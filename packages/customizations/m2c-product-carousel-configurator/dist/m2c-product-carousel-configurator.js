(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('m2cProductCarouselConfigurator', factory) :
    (global.m2cProductCarouselConfigurator = factory());
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
 * Product carousel configurator component.
 * This component is responsible for displaying product carousel's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccProductCarouselConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-product-carousel-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-pc-category\" class=\"cs-input__label\">Select Category:</label>\n            <select name=\"cfg-pc-category-select\" class=\"cs-input__select\" id=\"cfg-pc-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n                <option value=\"\">-- Please select category --</option>\n            </select>\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-pc-order-by\" class=\"cs-input__label\">Order by:</label>\n            <select name=\"cfg-pc-order-by\" class=\"cs-input__select\" id=\"cfg-pc-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                <option value=\"creation_date-DESC\">Creation date: newest</option>\n                <option value=\"creation_date-ASC\">Creation date: oldest</option>\n                <option value=\"price-DESC\">Price: cheapest</option>\n                <option value=\"price-ASC\">Price: most expensive</option>\n            </select>\n            <select name=\"cfg-pc-order-type\" class=\"cs-input__select\" v-model=\"configuration.order_type\" @change=\"onChange\">\n                <option value=\"ASC\">ASC</option>\n                <option value=\"DESC\">DESC</option>\n            </select>\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-pc-order-by\" class=\"cs-input__label\">Show:</label>\n            <select name=\"cfg-pc-limit\" class=\"cs-input__select\" id=\"cfg-pc-limit\" v-model=\"configuration.limit\" @change=\"onChange\">\n                <option value=\"20\">20 products</option>\n                <option value=\"40\">40 products</option>\n                <option value=\"60\">60 products</option>\n                <option value=\"80\">80 products</option>\n                <option value=\"100\">100 products</option>\n            </select>\n        </div>\n\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'DESC',
                    limit: 20,
                };
            },
        },
    },
};

/**
 * M2C Product carousel component for admin panel.
 * This component is responsible for managing product carousel's configuration
 */
var m2cProductCarouselConfigurator = {
    mixins: [
        ccProductCarouselConfigurator,
    ],
    template: '#m2c-product-carousel-form',
};

return m2cProductCarouselConfigurator;

})));
//# sourceMappingURL=m2c-product-carousel-configurator.js.map
