var ccComponentPicker = (function () {
    'use strict';

    var template = "<section class=\"cc-component-picker | {{ class }}\">\n    <ul class=\"cc-component-picker__list\">\n        <template v-for=\"component in components\">\n            <li class=\"cc-component-picker__list-item\">\n                <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\">\n                    <figure class=\"cc-component-picker__component-figure\">\n                        <img v-bind:src=\"component.cover\" alt=\"{{ component.coverAlt }}\" class=\"cc-component-picker__component-cover\">\n                        <figcaption class=\"cc-component-picker__component-description\">{{ component.name }}</figcaption>\n                    </figure>\n                </a>\n            </li>\n        </template>\n    </ul>\n</section>\n";

    /**
     * Componen picker.
     * Lists all types of components available in m2c in the grid/list mode
     * @type {vuejs.ComponentOption} Vue component object.
     */
    var componentPicker = {
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
            }
        },
        data: function () {
            return {
                components: []
            };
        },
        /**
         * Get JSON file with components list and put into data
         */
        ready: function () {
            this.$http.get('./../cc-component-picker.data.json').then(function (response) {
                this.components = response.json().components;
            });
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
            }
        }
    };

    return componentPicker;

}());
//# sourceMappingURL=cc-component-picker.js.map