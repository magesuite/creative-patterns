(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('m2cComponentPicker', factory) :
    (global.m2cComponentPicker = factory());
}(this, (function () { 'use strict';

var template = "<section class=\"cc-component-picker | {{ class }}\"> <ul class=\"cc-component-picker__list\" v-if=\"availableComponents.length\"> <li class=\"cc-component-picker__list-item cc-component-picker--{{component.type}}\" v-for=\"component in availableComponents\"> <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\"> <figure class=\"cc-component-picker__component-figure\"> <img v-bind:src=\"component.cover\" alt=\"{{ component.coverAlt }}\" class=\"cc-component-picker__component-cover\"> <figcaption class=\"cc-component-picker__component-description\">{{ component.name }}</figcaption> </figure> </a> </li> </ul> <p class=\"cc-component-picker__no-components\" v-if=\"!availableComponents.length\"> No components available. </p> </section> ";

/**
 * Componen picker.
 * Lists all types of components available in m2c in the grid/list mode
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentPicker = {
    template: template,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) { return value.replace('cc-component-picker', ''); }
        },
        /**
         * Property containing callback triggered when user picks component.
         */
        pickComponent: {
            type: Function
        },
        /**
         * JSON stringified array containing available components.
         */
        components: {
            type: String,
            default: ''
        },
        /**
         * URL for API returning JSON stringified array containing available components.
         */
        componentsEndpoint: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            availableComponents: []
        };
    },
    ready: function () {
        // If inline JSON is provided then parse it.
        if (this.components) {
            this.availableComponents = JSON.parse(this.components);
        }
        else if (this.componentsEndpoint) {
            // Otherwise load from endpoint if URL provided.
            this.$http.get(this.componentsEndpoint).then(function (response) {
                this.availableComponents = response.json();
            });
        }
    },
    methods: {
        /**
         * Component pick click handler.
         * This handler triggers "cc-component-picker__pick" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onPickComponent: function (componentType) {
            console.log("Component " + componentType + " picked.");
            this.$dispatch('cc-component-picker__pick', componentType);
            if (typeof this.pickComponent === 'function') {
                this.pickComponent(componentType);
            }
        }
    }
};

var template$1 = "<div class=\"m2c-component-picker | {{ class }}\"> <cc-component-picker :components=\"components\" :components-endpoint=\"componentsEndpoint\" :pick-component=\"onPickComponent\"></cc-component-picker> </div> ";

/**
 * M2C component picker.
 * This is just an additional layer over generic component picker
 * that can have custom, Magento 2 specific logic.
 * @type {vuejs.ComponentOption} Vue component object.
 */
var m2cComponentPicker = {
    template: template$1,
    components: {
        'cc-component-picker': ccComponentPicker
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) { return value.replace('m2c-component-picker', ''); }
        },
        /**
         * JSON stringified array containing available components.
         */
        components: {
            type: String,
            default: ''
        },
        /**
         * URL for API returning JSON stringified array containing available components.
         */
        componentsEndpoint: {
            type: String,
            default: ''
        }
    },
    methods: {
        /**
         * Component pick Magento 2 custom click handler.
         * @param {Event} event Click event obj ect.
         */
        onPickComponent: function (componentType) {
            console.log(componentType);
        }
    }
};

return m2cComponentPicker;

})));
//# sourceMappingURL=m2c-component-picker.js.map
