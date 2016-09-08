(function (exports) {
    'use strict';

<<<<<<< a10bbeff52ebbb26a088f31f3fc914ec908f0e5a
    var template = "<section class=\"cc-component-picker | {{ class }}\">\n    <ul class=\"cc-component-picker__list\" v-if=\"availableComponents.length\">\n        <li class=\"cc-component-picker__list-item\" v-for=\"component in availableComponents\">\n            <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\">\n                <figure class=\"cc-component-picker__component-figure\">\n                    <img v-bind:src=\"component.cover\" alt=\"{{ component.coverAlt }}\" class=\"cc-component-picker__component-cover\">\n                    <figcaption class=\"cc-component-picker__component-description\">{{ component.name }}</figcaption>\n                </figure>\n            </a>\n        </li>\n    </ul>\n    <p class=\"cc-component-picker__no-components\" v-if=\"!availableComponents.length\">\n        No components available.\n    </p>\n</section>\n";
=======
    var template = "<section class=\"cc-component-picker | {{ class }}\"> <ul class=\"cc-component-picker__list\"> <template v-for=\"component in components\"> <li class=\"cc-component-picker__list-item\"> <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\"> <figure class=\"cc-component-picker__component-figure\"> <img v-bind:src=\"component.cover\" alt=\"{{ component.coverAlt }}\" class=\"cc-component-picker__component-cover\"> <figcaption class=\"cc-component-picker__component-description\">{{ component.name }}</figcaption> </figure> </a> </li> </template> </ul> </section> ";
>>>>>>> [pattern-library] Refactored more tasks, updated scripts building strategy.

    /**
     * Componen picker.
     * Lists all types of components available in m2c in the grid/list mode
     * @type {vuejs.ComponentOption} Vue component object.
     */
<<<<<<< 40d620f09551f64b4c6bda2401827be8ee5f2cee
<<<<<<< 3bf2a1fe022b06497a22f3df180cbfb07d547908
    var ccComponentPicker = {
=======
    const componentPicker = {
>>>>>>> [pattern-library] Starting point for tasks rework.
=======
    var componentPicker = {
>>>>>>> Added tests tasks.
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
<<<<<<< 3bf2a1fe022b06497a22f3df180cbfb07d547908
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
=======
>>>>>>> [pattern-library] Starting point for tasks rework.
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
                this.$dispatch('cc-component-picker__pick', componentType);
                if (typeof this.pickComponent === 'function') {
                    this.pickComponent(componentType);
                }
            }
        },
    };

<<<<<<< 3bf2a1fe022b06497a22f3df180cbfb07d547908
    return ccComponentPicker;
=======
    exports['default'] = componentPicker;
>>>>>>> [pattern-library] Starting point for tasks rework.

}((this.ccComponentPicker = this.ccComponentPicker || {})));
//# sourceMappingURL=cc-component-picker.js.map
