(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('m2cCategoryLinksConfigurator', factory) :
    (global.m2cCategoryLinksConfigurator = factory());
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
 * Category links configurator component.
 * This component is responsible for displaying category links configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccCategoryLinksConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-category-links-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-main_category_id\" class=\"cs-input__label\">Main category ID:</label>\n            <input type=\"text\" v-model=\"configuration.main_category_id\" id=\"cfg-main_category_id\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-sub_categories_ids\" class=\"cs-input__label\">Subcategories ID's:</label>\n            <input type=\"text\" v-model=\"configuration.sub_categories_ids\" id=\"cfg-sub_categories_ids\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-shownumbers\" class=\"cs-input__label\">Show products count:</label>\n            <input type=\"checkbox\" v-model=\"configuration.shownumbers\" id=\"cfg-shownumbers\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: {
                main_category_id: '',
                sub_categories_ids: '',
                shownumbers: false,
            },
        },
    },
};

var m2cCategoryLinksConfigurator = {
    mixins: [
        ccCategoryLinksConfigurator,
    ],
    template: "<form class=\"m2c-category-links-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-main_category_id\" class=\"m2-input__label\">Main category ID:</label>\n            <input type=\"text\" v-model=\"configuration.main_category_id\" id=\"cfg-main_category_id\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-sub_categories_ids\" class=\"m2-input__label\">Subcategories ID's:</label>\n            <input type=\"text\" v-model=\"configuration.sub_categories_ids\" id=\"cfg-sub_categories_ids\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-shownumbers\" class=\"m2-input__label\">Show products count:</label>\n            <input type=\"checkbox\" v-model=\"configuration.shownumbers\" id=\"cfg-shownumbers\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n    </form>",
};

return m2cCategoryLinksConfigurator;

})));
//# sourceMappingURL=m2c-category-links-configurator.js.map
