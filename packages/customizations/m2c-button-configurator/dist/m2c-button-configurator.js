(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate')) :
    typeof define === 'function' && define.amd ? define('m2cButtonConfigurator', ['jquery', 'mage/translate'], factory) :
    (global.m2cButtonConfigurator = factory(global.jQuery,global.$t));
}(this, (function ($,$t) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;

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
 * button configurator component.
 * This component is responsible for displaying buttons configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccButtonConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-button-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-label\" class=\"cs-input__label\">Label:</label>\n            <input type=\"text\" v-model=\"configuration.label\" id=\"cfg-label\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-target\" class=\"cs-input__label\">Target:</label>\n            <input type=\"text\" v-model=\"configuration.target\" id=\"cfg-target\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: {
                label: '',
                target: '',
            },
        },
    },
};

var m2cButtonConfigurator = {
    mixins: [
        ccButtonConfigurator,
    ],
    template: "<form class=\"m2c-button-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-label\" class=\"m2-input__label\">" + $t('Label') + ":</label>\n            <input type=\"text\" v-model=\"configuration.label\" id=\"cfg-label\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-addon m2-input--type-inline | m2c-button-configurator__item-form-element\">\n            <label for=\"cfg-target\" class=\"m2-input__label\">" + $t('Target') + ":</label>\n            <div class=\"m2-input__addon-wrapper\">\n                <input type=\"text\" class=\"m2-input__input m2-input--type-readonly | m2c-button-configurator__target\" readonly v-model=\"configuration.target\" id=\"cfg-target\">\n                <span class=\"m2-input__addon | m2c-button-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal()\">\n                    <svg class=\"m2-input__addon-icon\">\n                        <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_link' }\"></use>\n                    </svg>\n                </span>\n            </div>\n        </div>\n    </form>",
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: {
                label: '',
                target: '',
            },
        },
        /* Get assets for displaying component images */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            this.onSave();
        },
    },
    methods: {
        /* Opens modal with M2 built-in widget chooser
         */
        openCtaTargetModal: function () {
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/cfg-target");
            /* clean current value since widget chooser doesn't do that to allow multiple widgets
             * we don't want that since this should be url for CTA
             */
            this.configuration.target = '';
            this.wWidgetListener();
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of target input is changed
         */
        widgetSetListener: function () {
            var component = this;
            $('.m2c-button-configurator__cta-target-link').on('change', function () {
                component.onChange();
            });
        },
        /*
         * Check if widget chooser is loaded. If not, wait for it
         */
        wWidgetListener: function () {
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                this.disableNotLinksOptions();
            }
            else {
                setTimeout(this.wWidgetListener, 300);
            }
        },
        /*
         * Hide all options in widget chooser that are not links
         */
        disableNotLinksOptions: function () {
            if (wWidget.widgetEl && wWidget.widgetEl.options) {
                $(wWidget.widgetEl.options).each(function (i, el) {
                    if (el.value.split('\\').pop() !== 'Link' && i !== 0) {
                        $(el).hide();
                    }
                });
            }
        },
    },
    ready: function () {
        this.widgetSetListener();
    },
};

return m2cButtonConfigurator;

})));
//# sourceMappingURL=m2c-button-configurator.js.map
