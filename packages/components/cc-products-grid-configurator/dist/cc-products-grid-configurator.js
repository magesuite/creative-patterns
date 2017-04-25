(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccProductsGridConfigurator', factory) :
    (global.ccProductsGridConfigurator = factory());
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
 * Action button component version.
 * Small component that allows to set it's content.
 *
 * @type {vuejs.ComponentOption} Vue component object.
 */
var actionButton = {
    template: "<button class=\"action-button {{ class }}\" @click=\"_onClick\">\n        <slot></slot>\n    </button>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
    methods: {
        /**
         * Button click handler.
         * This handler triggers "action-button__click" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        _onClick: function (event) {
            this.$dispatch('action-button__click', event);
        },
    },
};

/**
 * Component actions component.
 * This component is responsible for displaying and handling user interactions of
 * side utility navigation for each component that supports:
 * - Moving component up,
 * - Moving component down,
 * - Opening component settings,
 * - Deleting component.
 *
 * @type {vuejs.ComponentOption} Vue component object.
 */
var componentActions = {
    template: "<aside class=\"cc-component-actions | {{ class }}\">\n        <div class=\"cc-component-actions__buttons\">\n            <slot name=\"cc-component-actions__buttons\"></slot>\n        </div>\n    </aside>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) { return value.replace('cc-component-actions', ''); },
        },
    },
};

/**
 * Product grid configurator component.
 * This component is responsible for displaying products grid  configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccProductsGridConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-products-grid-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cc-products-grid-configurator__columns\">\n        <div class=\"cc-products-grid-configurator__column-left\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-category\" class=\"cs-input__label\">Select Category:</label>\n                <input type=\"text\" name=\"cfg-pg-category-select\" class=\"cs-input__input\" id=\"cfg-pg-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-order-by\" class=\"cs-input__label\">Order by:</label>\n                <select name=\"cfg-pg-order-by\" class=\"cs-input__select\" id=\"cfg-pg-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                    <option value=\"creation_date\">Creation date:</option>\n                    <option value=\"price\">Price:</option>\n                </select>\n                <select name=\"cfg-pg-order-type\" class=\"cs-input__select\" v-model=\"configuration.order_type\" @change=\"onChange\">\n                    <option value=\"ASC\">ASC</option>\n                    <option value=\"DESC\">DESC</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_desktop\" class=\"cs-input__label\">Rows desktop:</label>\n                <select name=\"cfg-pg-rows_desktop\" class=\"cs-input__select\" id=\"cfg-pg-rows_desktop\" v-model=\"configuration.rows_desktop\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_tablet\" class=\"cs-input__label\">Rows tablet:</label>\n                <select name=\"cfg-pg-rows_tablet\" class=\"cs-input__select\" id=\"cfg-pg-rows_tablet\" v-model=\"configuration.rows_tablet\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_mobile\" class=\"cs-input__label\">Rows mobile:</label>\n                <select name=\"cfg-pg-rows_mobile\" class=\"cs-input__select\" id=\"cfg-pg-rows_mobile\" v-model=\"configuration.rows_mobile\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"cc-products-grid-configurator__column-right\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-hero\" class=\"cs-input__label\">Hero image:</label>\n                <select name=\"cfg-pg-hero\" class=\"cs-input__select\" id=\"cfg-pg-hero\" v-model=\"configuration.hero\" @change=\"onChange\">\n                    <option value=\"\" selected=\"selected\">No hero image</option>\n                    <option value=\"1\">Left</option>\n                    <option value=\"2\">Right</option>\n                </select>\n            </div>\n\n            <div class=\"cs-input\" v-if=\"configuration.hero\">\n\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_image\" class=\"cs-input__label\">Upload image:</label>\n                    <a href=\"#\" class=\"\" href=\"#\">Upload image</a>\n                    <input type=\"hidden\" name=\"cfg-pg-hero_image\" class=\"cs-input__input\" id=\"cfg-pg-hero_image\" v-model=\"configuration.hero_image\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_headline\" class=\"cs-input__label\">Headline:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_headline\" class=\"cs-input__input\" id=\"cfg-pg-hero_headline\" v-model=\"configuration.hero_headline\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_subheadline\" class=\"cs-input__label\">Subheadline:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_subheadline\" class=\"cs-input__input\" id=\"cfg-pg-hero_subheadline\" v-model=\"configuration.hero_subheadline\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_url\" class=\"cs-input__label\">Url:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_url\" class=\"cs-input__input\" id=\"cfg-pg-hero_url\" v-model=\"configuration.hero_url\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_button_label\" class=\"cs-input__label\">CTA button label:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_button_label\" class=\"cs-input__input\" id=\"cfg-pg-hero_button_label\" v-model=\"configuration.button_label\" @change=\"onChange\">\n                </div>\n\n            </div>\n        </div>\n        </div>\n\n        <button type=\"submit\">Save</button>\n    </form>",
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-actions': componentActions,
    },
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'ASC',
                    rows_desktop: 2,
                    rows_tablet: 2,
                    rows_mobile: 2,
                    hero_image: '',
                    hero_headline: '',
                    hero_subheadline: '',
                    hero_url: '',
                    hero_button_label: '',
                };
            },
        },
    }
};

return ccProductsGridConfigurator;

})));
//# sourceMappingURL=cc-products-grid-configurator.js.map
