(function (exports) {
    'use strict';

    /**
     * Action button component version.
     * Small component that allows to set it's content.
     *
     * @type {vuejs.ComponentOption} Vue component object.
     */
    var actionButton = {
        template: "<button class=\"action-button {{ class }}\" @click=\"onClick\">\n        <slot></slot>\n    </button>",
        props: {
            /**
             * Class property support to enable BEM mixes.
             */
            class: {
                type: [String, Object, Array],
                default: ''
            },
            iconId: {
                type: String
            },
            iconClasses: {
                type: String
            }
        },
        methods: {
            /**
             * Button click handler.
             * This handler triggers "action-button__click" event up the DOM chain when called.
             * @param {Event} event Click event object.
             */
            onClick: function (event) {
                this.$dispatch('action-button__click', event);
            }
        }
    };

    /**
     * Component controller component.
     * This component is responsible for displaying annd handling component adding button
     * @type {vuejs.ComponentOption} Vue component object.
     */
    var componentAdder = {
        template: "<section class=\"cc-component-adder | {{ class }}\">\n        <div class=\"cc-component-adder__button-create\" @click=\"onCreateComponent\">\n            <slot></slot>\n        </div>\n    </section>",
        props: {
            /**
             * Class property support to enable BEM mixes.
             */
            class: {
                type: String,
                default: '',
                coerce: function (value) {
                    return value.replace('cc-component-adder', '');
                }
            },
            /**
             * Property containing callback triggered when user clicks "add component" button.
             */
            createComponent: {
                type: Function
            }
        },
        methods: {
            /**
             * "Add component" button click handler.
             * This handler triggers "cc-component-adder__create-component" event up the DOM chain when called.
             * @param {Event} event Click event object.
             */
            onCreateComponent: function (event) {
                this.$dispatch('cc-component-adder__create-component', event);
                if (typeof this.createComponent === 'function') {
                    this.createComponent(event);
                }
            }
        }
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
        template: "<aside class=\"cc-component-actions | {{ class }}\">\n        <div class=\"cc-component-actions__top\">\n            <slot name=\"cc-component-actions__top\"></slot>\n        </div>\n        <div class=\"cc-component-actions__bottom\">\n            <slot name=\"cc-component-actions__bottom\"></slot>\n        </div>\n    </aside>",
        components: {
            'action-button': actionButton
        },
        props: {
            /**
             * Class property support to enable BEM mixes.
             */
            class: {
                type: String,
                default: '',
                coerce: function (value) { return value.replace('cc-component-actions', ''); }
            },
            /**
             * Property containing callback triggered when user clicks move up button.
             */
            moveUp: {
                type: Function
            },
            /**
             * Property containing callback triggered when user clicks move down button.
             */
            moveDown: {
                type: Function
            },
            /**
             * Property containing callback triggered when user clicks settings button.
             */
            openSettings: {
                type: Function
            },
            /**
             * Property containing callback triggered when user clicks delete button.
             */
            deleteComponent: {
                type: Function
            }
        },
        methods: {
            /**
             * Move up button click handler.
             * This handler triggers "cc-component-actions__move-up" event up the DOM chain when called.
             * @param {Event} event Click event object.
             */
            onMoveUp: function (event) {
                this.$dispatch('cc-component-actions__move-up', event);
                if (typeof this.moveUp === 'function') {
                    this.moveUp(event);
                }
            },
            /**
             * Move down button click handler.
             * This handler triggers "cc-component-actions__move-down" event up the DOM chain when called.
             * @param {Event} event Click event object.
             */
            onMoveDown: function (event) {
                this.$dispatch('cc-component-actions__move-down', event);
                if (typeof this.moveDown === 'function') {
                    this.moveDown(event);
                }
            },
            /**
             * Settings button click handler.
             * This handler triggers "cc-component-actions__open-settings" event up the DOM chain when called.
             * @param {Event} event Click event object.
             */
            onOpenSettings: function (event) {
                this.$dispatch('cc-component-actions__open-settings', event);
                if (typeof this.openSettings === 'function') {
                    this.openSettings(event);
                }
            },
            /**
             * Delete button click handler.
             * This handler triggers "cc-component-actions__delete-component" event up the DOM chain when called.
             * @param {Event} event Click event object.
             */
            onDeleteComponent: function (event) {
                this.$dispatch('cc-component-actions__delete-component', event);
                if (typeof this.deleteComponent === 'function') {
                    this.deleteComponent(event);
                }
            }
        }
    };

    /**
     * Component placeholder component.
     */
    var componentPlaceholder = {
        template: "<div class=\"cc-component-placeholder\">\n        <div class=\"cc-component-placeholder__content\">\n            <slot></slot>\n        </div>\n    </div>"
    };

    var template = "<section class=\"cc-layout-builder | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use xlink:href=\"/images/sprites.svg#icon_plus\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"addedComponent in addedComponents\">\n        <div class=\"cc-layout-builder__component\">\n            <div class=\"cc-layout-builder__component-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__top\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"/images/sprites.svg#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"/images/sprites.svg#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                    <template slot=\"cc-component-actions__bottom\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" @click=\"editComponentSettings( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"/images/sprites.svg#icon_settings\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"/images/sprites.svg#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-layout-builder__component-wrapper\">\n                <cc-component-placeholder>{{ addedComponent.id }}</cc-component-placeholder>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"addedComponents.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use xlink:href=\"/images/sprites.svg#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</section>\n";

    /**
     * Layout builder component.
     * This component is responsible for displaying and handling user interactions of
     * entire Content Constructor
     * @type {vuejs.ComponentOption} Vue component object.
     */
    var layoutBuilder = {
        template: template,
        /**
         * Get dependencies
         */
        components: {
            'action-button': actionButton,
            'cc-component-adder': componentAdder,
            'cc-component-actions': componentActions,
            'cc-component-placeholder': componentPlaceholder
        },
        props: {
            /**
             * Class property support to enable BEM mixes.
             */
            class: {
                type: [String, Object, Array],
                default: ''
            },
            /**
             * Callback invoked when edit component button is clicked.
             * This function should take IComponentInformation and return changed version of it.
             * If callback returns falsy value then component isn't changed.
             */
            editComponent: {
                type: Function,
                default: function (componentInfo) { return componentInfo; }
            },
            /**
             * Callback invoked when edit component button is clicked.
             * This function should return IComponentInformation.
             * If callback returns falsy value then component isn't added.
             */
            addComponent: {
                type: Function,
                default: function () { return undefined; }
            }
        },
        data: function () {
            return {
                addedComponents: []
            };
        },
        methods: {
            /**
             * Creates new component and adds it to a specified index.
             * This function calls callback specified by "add-component" property that
             * should return IComponentInformation.
             * If callback returns falsy value then component isn't added.
             * @param {number} index New component's index in components array.
             */
            createNewComponent: function (index) {
                var componentInfo = this.addComponent();
                if (componentInfo) {
                    this.addedComponents.splice(index, 0, componentInfo);
                }
            },
            /**
             * Moves component under given index up by swaping it with previous element.
             * @param {number} index Component's index in array.
             */
            moveComponentUp: function (index) {
                if (index > 0) {
                    var previousComponent = this.addedComponents[index - 1];
                    this.addedComponents.$set(index - 1, this.addedComponents[index]);
                    this.addedComponents.$set(index, previousComponent);
                }
            },
            /**
             * Moves component under given index down by swaping it with next element.
             * @param {number} index Component's index in array.
             */
            moveComponentDown: function (index) {
                if (index < this.addedComponents.length - 1) {
                    var previousComponent = this.addedComponents[index + 1];
                    this.addedComponents.$set(index + 1, this.addedComponents[index]);
                    this.addedComponents.$set(index, previousComponent);
                }
            },
            /**
             * Initializes edit mode of component.
             * This function invokes callback given by "edit-component" callback that
             * should take current IComponentInformation as param and return changed version of it.
             * If callback returns falsy value then component isn't changed.
             * @param {string} index: Component's index in array.
             */
            editComponentSettings: function (index) {
                var componentInfo = this.addedComponents[index];
                console.log("Openning modal window with component settings (ID: " + componentInfo.name + ")");
                componentInfo = this.editComponent(componentInfo);
                if (componentInfo) {
                    this.addedComponents.$set(index, componentInfo);
                }
            },
            /**
             * Removes component and adder that is right after component from the DOM
             * @param {number} index Component's index in array.
             */
            deleteComponent: function (index) {
                if (confirm("Are you sure you want to remove this component?")) {
                    this.addedComponents.splice(index, 1);
                }
            },
            /**
             * Tells if component with given index is the first component.
             * @param  {number}  index Index of the component.
             * @return {boolean}       If component is first in array.
             */
            isFirstComponent: function (index) {
                return index === 0;
            },
            /**
             * Tells if component with given index is the last component.
             * @param  {number}  index Index of the component.
             * @return {boolean}       If component is last in array.
             */
            isLastComponent: function (index) {
                return index === this.addedComponents.length - 1;
            }
        },
    };

    describe('Component controller object.', function () {
        var methods = layoutBuilder.methods;
        var props = layoutBuilder.props;
        it('has a create new component method.', function () {
            expect(typeof methods.createNewComponent).toBe('function');
        });
        it('has a move component up method.', function () {
            expect(typeof methods.moveComponentUp).toBe('function');
        });
        it('has a move component down method.', function () {
            expect(typeof methods.moveComponentDown).toBe('function');
        });
        it('has a delete component method.', function () {
            expect(typeof methods.deleteComponent).toBe('function');
        });
        it('has a class property.', function () {
            expect(props.class).toEqual(jasmine.anything());
        });
        it('has an edit component property.', function () {
            expect(props.editComponent).toEqual(jasmine.anything());
        });
        it('has an add component property.', function () {
            expect(props.addComponent).toEqual(jasmine.anything());
        });
    });

}((this.ccLayoutBuilder = this.ccLayoutBuilder || {})));
//# sourceMappingURL=cc-layout-builder.js.map