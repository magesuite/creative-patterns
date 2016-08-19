var ccLayoutBuilder = (function () {
    'use strict';

    /*import componentAdder from '../../cc-component-adder/src/cc-component-adder';
    import componentController from '../../cc-component-controller/src/cc-component-controller';
    import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';*/
    /**
     * Layout builder component.
     * This component is responsible for displaying and handling user interactions of
     * entire Content Constructor
     * @type {vuejs.ComponentOption} Vue component object.
     */
    var layoutBuilder = {
        template: "<section class=\"cc-layout-builder | {{ class }}\">\n        <div class=\"cc-layout-builder__adder\" @click=\"createNewComponent\">\n            <slot name=\"cc-layout-builder__adder\"></slot>\n        </div>\n        <div class=\"cc-layout-builder__component\">\n            <div class=\"cc-layout-builder__component-actions\">\n                <slot name=\"cc-layout-builder__component-actions\"></slot>\n            </div>\n            <div class=\"cc-layout-builder__component-wrapper\">\n                <slot name=\"cc-layout-builder__component-wrapper\"></slot>\n            </div>\n        </div>\n    </section>",
        props: {
            /**
             * Get dependencies
             */
            /*components: {
                'cc-component-adder': componentAdder,
                'cc-component-controller': componentController,
                'cc-component-placeholder': componentPlaceholder
            },*/
            /**
             * Class property support to enable BEM mixes.
             */
            class: {
                type: String,
                default: '',
                coerce: function (value) { return value.replace('cc-layout-builder', ''); }
            },
            /**
             * Property containing callback triggered when user clicks create-component button (the one with plus sign).
             */
            createNewComponent: {
                type: Function
            }
        },
        methods: {
            /**
             * Create-component button click handler.
             * This handler triggers "cc-layout-builder__create-new-component" event up the DOM chain when called.
             * @param {Event} event Click event object.
             */
            onCreateNewComponent: function (event) {
                this.$dispatch('cc-layout-builder__create-new-component', event);
                if (typeof this.createNewComponent === 'function') {
                    this.createNewComponent(event);
                }
            }
        }
    };

    return layoutBuilder;

}());
//# sourceMappingURL=cc-layout-builder.js.map