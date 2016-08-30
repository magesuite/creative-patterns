(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('Vue'), require('jquery'), require('Magento_Ui/js/modal/modal'), require('mage/translate'), require('VueResource')) :
    typeof define === 'function' && define.amd ? define('m2CContentConstructor', ['Vue', 'jquery', 'Magento_Ui/js/modal/modal', 'mage/translate', 'VueResource'], factory) :
    (global.m2CContentConstructor = factory(global.Vue,global.$,global.modal,global.$t,global.vr));
}(this, function (Vue,$,modal,$t,vr) { 'use strict';

    Vue = 'default' in Vue ? Vue['default'] : Vue;
    $ = 'default' in $ ? $['default'] : $;
    modal = 'default' in modal ? modal['default'] : modal;
    $t = 'default' in $t ? $t['default'] : $t;
    vr = 'default' in vr ? vr['default'] : vr;

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

    var template = "<section class=\"cc-layout-builder | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use xlink:href=\"/images/sprites.svg#icon_plus\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"component in components\">\n        <div class=\"cc-layout-builder__component\">\n            <div class=\"cc-layout-builder__component-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__top\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"/images/sprites.svg#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"/images/sprites.svg#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                    <template slot=\"cc-component-actions__bottom\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" @click=\"editComponentSettings( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"/images/sprites.svg#icon_settings\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"/images/sprites.svg#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-layout-builder__component-wrapper\">\n                <cc-component-placeholder>{{ component.id }}</cc-component-placeholder>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"components.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use xlink:href=\"/images/sprites.svg#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</section>\n";

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
            componentsConfiguration: {
                type: String,
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
                components: []
            };
        },
        ready: function () {
            // Set initial components configuration if provided.
            this.components = this.componentsConfiguration ? JSON.parse(this.componentsConfiguration) : [];
            this.$dispatch('cc-layout-builder__update');
        },
        methods: {
            /**
             * Sets provided component information on current index in components array.
             * If component exists on given index then this compoennt will be inserted before it.
             * @param {number}                index         Component index in components array.
             * @param {IComponentInformation} componentInfo Component information.
             */
            addComponentInformation: function (index, componentInfo) {
                if (componentInfo) {
                    this.components.splice(index, 0, componentInfo);
                    this.$dispatch('cc-layout-builder__update');
                }
            },
            /**
             * Sets provided component information on current index in components array.
             * If component exists on given index then it will be overwritten.
             * @param {number}                index         Component index in components array.
             * @param {IComponentInformation} componentInfo Component information.
             */
            setComponentInformation: function (index, componentInfo) {
                if (componentInfo) {
                    this.components.$set(index, componentInfo);
                    this.$dispatch('cc-layout-builder__update');
                }
            },
            /**
             * Returns components information currently stored within layout builder.
             * @return {IComponentInformation[]} Components information array.
             */
            getComponentInformation: function () {
                return JSON.parse(JSON.stringify(this.components));
            },
            /**
             * Creates new component and adds it to a specified index.
             * This function calls callback specified by "add-component" property that
             * should return IComponentInformation.
             * If callback returns falsy value then component isn't added.
             * @param {number} index New component's index in components array.
             */
            createNewComponent: function (index) {
                var _this = this;
                /**
                 * To allow both sync and async set of new component data we call
                 * provided handler with callback function.
                 * If handler doesn't return component information then it can still
                 * set it using given callback.
                 */
                var componentInfo = this.addComponent(function (asyncComponentInfo) {
                    _this.addComponentInformation(index, asyncComponentInfo);
                });
                this.addComponentInformation(index, componentInfo);
            },
            /**
             * Initializes edit mode of component.
             * This function invokes callback given by "edit-component" callback that
             * should take current IComponentInformation as param and return changed version of it.
             * If callback returns falsy value then component isn't changed.
             * @param {string} index: Component's index in array.
             */
            editComponentSettings: function (index) {
                var _this = this;
                // Create a static, non-reactive copy of component data.
                var componentInfo = JSON.parse(JSON.stringify(this.components[index]));
                /**
                 * To allow both sync and async set of new component data we call
                 * provided handler with current component data and callback function.
                 * If handler doesn't return component information then it can still
                 * set it using given callback.
                 */
                componentInfo = this.editComponent(componentInfo, function (asyncComponentInfo) {
                    _this.setComponentInformation(index, asyncComponentInfo);
                });
                this.setComponentInformation(index, componentInfo);
            },
            /**
             * Moves component under given index up by swaping it with previous element.
             * @param {number} index Component's index in array.
             */
            moveComponentUp: function (index) {
                if (index > 0) {
                    var previousComponent = this.components[index - 1];
                    this.components.$set(index - 1, this.components[index]);
                    this.components.$set(index, previousComponent);
                }
            },
            /**
             * Moves component under given index down by swaping it with next element.
             * @param {number} index Component's index in array.
             */
            moveComponentDown: function (index) {
                if (index < this.components.length - 1) {
                    var previousComponent = this.components[index + 1];
                    this.components.$set(index + 1, this.components[index]);
                    this.components.$set(index, previousComponent);
                }
            },
            /**
             * Removes component and adder that is right after component from the DOM
             * @param {number} index Component's index in array.
             */
            deleteComponent: function (index) {
                if (confirm("Are you sure you want to remove this component?")) {
                    this.components.splice(index, 1);
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
                return index === this.components.length - 1;
            }
        },
    };

    var template$1 = "<section class=\"cc-component-picker | {{ class }}\">\n    <ul class=\"cc-component-picker__list\" v-if=\"availableComponents.length\">\n        <li class=\"cc-component-picker__list-item cc-component-picker--{{component.type}}\" v-for=\"component in availableComponents\">\n            <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\">\n                <figure class=\"cc-component-picker__component-figure\">\n                    <img v-bind:src=\"component.cover\" alt=\"{{ component.coverAlt }}\" class=\"cc-component-picker__component-cover\">\n                    <figcaption class=\"cc-component-picker__component-description\">{{ component.name }}</figcaption>\n                </figure>\n            </a>\n        </li>\n    </ul>\n    <p class=\"cc-component-picker__no-components\" v-if=\"!availableComponents.length\">\n        No components available.\n    </p>\n</section>\n";

    /**
     * Componen picker.
     * Lists all types of components available in m2c in the grid/list mode
     * @type {vuejs.ComponentOption} Vue component object.
     */
    var ccComponentPicker = {
        template: template$1,
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
                this.$dispatch('cc-component-picker__pick', componentType);
                if (typeof this.pickComponent === 'function') {
                    this.pickComponent(componentType);
                }
            }
        },
    };

    // Use Vue resource
    Vue.use(vr);
    // Picker modal options
    var pickerModalOptions = {
        type: 'slide',
        responsive: true,
        innerScroll: true,
        autoOpen: true,
        title: $t('Please select type of component'),
        buttons: [
            {
                text: $.mage.__('Cancel'),
                class: '',
                click: function () {
                    this.closeModal();
                }
            }
        ]
    };
    // Picker modal options
    var configuratorModalOptions = {
        type: 'slide',
        responsive: true,
        innerScroll: true,
        autoOpen: true,
        title: $t('Configurate your component'),
        buttons: [
            {
                text: $.mage.__('Cancel'),
                class: '',
                click: function () {
                    this.closeModal();
                }
            }
        ]
    };
    /**
     * M2C Content Constructor component.
     * This is the final layer that is responsible for collecting and tying up all
     * of the M2C admin panel logic.
     */
    var m2cContentConstructor = {
        template: "<div class=\"m2c-content-constructor\">\n        <cc-layout-builder\n            v-ref:layout-builder\n            :add-component=\"getComponentPicker\"\n            :edit-component=\"editComponent\"\n            :components-configuration=\"configuration\">\n        </cc-layout-builder>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--picker\" v-ref:picker></div>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--configurator\" v-ref:configurator></div>\n    </div>",
        components: {
            'cc-layout-builder': layoutBuilder
        },
        props: {
            configuration: {
                type: String,
                default: ''
            },
            /**
             * Selector for an input which will hold current components' configuration.
             */
            configurationDump: {
                type: String,
                required: true,
                validator: function (selector) {
                    // Check if input exists. No jQuery, IE9+.
                    return document.querySelector(selector) !== null;
                }
            }
        },
        ready: function () {
            // Let's save HTML element of provided input selector for further use. No jQuery, IE9+.
            this.configurationDumpElement = document.querySelector(this.configurationDump);
            this.dumpConfiguration();
        },
        events: {
            /**
             * We update provided input with new components information each time leyout
             * builder updates.
             */
            'cc-layout-builder__update': function () {
                this.dumpConfiguration();
            },
            'cc-component-picker__pick': function (componentType) {
                console.log(componentType);
                this.getComponentConfigurator(componentType);
            },
        },
        methods: {
            /**
             * Callback that will be invoked when user clicks plus button.
             * This method should open magento modal with component picker.
             * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
             */
            getComponentPicker: function (addComponentInformation) {
                // Save adding callback for async use.
                this._addComponentInformation = addComponentInformation;
                var component = this;
                // Magento modal 'opened' callback
                pickerModalOptions.opened = function () {
                    var modal = this;
                    // Get available components and put into modal
                    component.$http.get('/admin/content-constructor/component/configurator/type/picker').then(function (response) {
                        if (response.text) {
                            modal.innerHTML = response.text();
                            new Vue({
                                el: modal,
                                components: {
                                    'cc-component-picker': ccComponentPicker
                                }
                            });
                        }
                    });
                };
                // Open picker modal.
                modal(pickerModalOptions, $(this.$refs.picker));
            },
            getComponentConfigurator: function (componentType) {
                var component = this;
                // Magento modal 'opened' callback
                configuratorModalOptions.opened = function () {
                    var modal = this;
                    // Get configurator and put into modal
                    component.$http.get("/admin/content-constructor/component/configurator/type/" + componentType).then(function (response) {
                        if (response.text) {
                            modal.innerHTML = response.text();
                        }
                    });
                };
                // Open configurator modal.
                modal(configuratorModalOptions, $(this.$refs.configurator));
            },
            /**
             * Callback that will be invoked when user clicks edit button.
             * This method should open magento modal with component editor.
             * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
             */
            editComponent: function (currentInfo, setComponentInformation) {
                // Open magento modal and invoke given callback with component information like below.
                setComponentInformation({
                    name: 'Nowa Nazwa komponentu',
                    id: 'Nowe ID komponentu',
                    settings: 'Nowe Jakieś ustawienia'
                });
            },
            dumpConfiguration: function () {
                if (this.configurationDumpElement) {
                    this.configurationDumpElement.value = JSON.stringify(this.$refs.layoutBuilder.getComponentInformation());
                }
            },
        }
    };

    return m2cContentConstructor;

}));
//# sourceMappingURL=m2c-content-constructor.js.map