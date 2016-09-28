(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentPicker', factory) :
    (global.ccComponentPicker = factory());
}(this, (function () { 'use strict';

var template = "<section class=\"cc-component-picker | {{ class }}\">\n    <ul class=\"cc-component-picker__list\" v-if=\"availableComponents.length\">\n        <li class=\"cc-component-picker__list-item cc-component-picker--{{component.type}}\" v-for=\"component in availableComponents\">\n            <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\">\n                <figure class=\"cc-component-picker__component-figure\">\n                    <img v-bind:src=\"component.cover\" alt=\"{{ component.coverAlt }}\" class=\"cc-component-picker__component-cover\">\n                    <figcaption class=\"cc-component-picker__component-description\">{{ component.name }}</figcaption>\n                </figure>\n            </a>\n        </li>\n    </ul>\n    <p class=\"cc-component-picker__no-components\" v-if=\"!availableComponents.length\">\n        No components available.\n    </p>\n</section>\n";

/**
 * Componen picker.
 * Lists all types of components available in m2c in the grid/list mode
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentPicker = {
    template,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) { return value.replace('cc-component-picker', ''); },
        },
        /**
         * Property containing callback triggered when user picks component.
         */
        pickComponent: {
            type: Function,
        },
        /**
         * JSON stringified array containing available components.
         */
        components: {
            type: String,
            default: '',
        },
        /**
         * URL for API returning JSON stringified array containing available components.
         */
        componentsEndpoint: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            availableComponents: [],
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
            this.$dispatch('cc-component-picker__pick', componentType);
            if (typeof this.pickComponent === 'function') {
                this.pickComponent(componentType);
            }
        },
    },
};

return ccComponentPicker;

})));
//# sourceMappingURL=cc-component-picker.js.map
