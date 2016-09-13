(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('Magento_Ui/js/modal/modal'), require('Vue'), require('VueResource'), require('jquery'), require('mage/translate'), require('uiRegistry')) :
    typeof define === 'function' && define.amd ? define('m2cContentConstructor', ['Magento_Ui/js/modal/modal', 'Vue', 'VueResource', 'jquery', 'mage/translate', 'uiRegistry'], factory) :
    (global.m2cContentConstructor = factory(global.modal,global.Vue,global.vr,global.$,global.$t,global.uiRegistry));
}(this, (function (modal,Vue,vr,$,$t,uiRegistry) { 'use strict';

modal = 'default' in modal ? modal['default'] : modal;
Vue = 'default' in Vue ? Vue['default'] : Vue;
vr = 'default' in vr ? vr['default'] : vr;
$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;
uiRegistry = 'default' in uiRegistry ? uiRegistry['default'] : uiRegistry;

/**
 * Headline configurator component.
 * This component is responsible for displaying headlines configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccHeadlineConfigurator = {
    template: "<form class=\"cc-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"cs-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"title\" id=\"cfg-headline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"cs-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"subtitle\" id=\"cfg-subheadline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
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
         */
        save: {
            type: Function,
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function,
        },
    },
    data: function () {
        return {
            title: '',
            subtitle: '',
        };
    },
    methods: {
        onChange: function (event) {
            var data = JSON.parse(JSON.stringify(this.$data));
            this.$dispatch('cc-headline-configurator__change', data);
            if (typeof this.change === 'function') {
                this.change(data);
            }
        },
        onSave: function (event) {
            var data = JSON.parse(JSON.stringify(this.$data));
            this.$dispatch('cc-headline-configurator__save', data);
            if (typeof this.save === 'function') {
                this.save(data);
            }
        },
    },
};

//import m2Iinput from '../../m2-input/src/m2-input';
var m2cHeadlineConfigurator = {
    template: "<form class=\"m2c-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"m2-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"title\" id=\"cfg-headline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"m2-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"subtitle\" id=\"cfg-subheadline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n    </form>",
    mixins: [
        ccHeadlineConfigurator,
    ],
};

var template = "<section class=\"cc-component-picker | {{ class }}\"> <ul class=\"cc-component-picker__list\" v-if=\"availableComponents.length\"> <li class=\"cc-component-picker__list-item cc-component-picker--{{component.type}}\" v-for=\"component in availableComponents\"> <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\"> <figure class=\"cc-component-picker__component-figure\"> <img v-bind:src=\"component.cover\" alt=\"{{ component.coverAlt }}\" class=\"cc-component-picker__component-cover\"> <figcaption class=\"cc-component-picker__component-description\">{{ component.name }}</figcaption> </figure> </a> </li> </ul> <p class=\"cc-component-picker__no-components\" v-if=\"!availableComponents.length\"> No components available. </p> </section> ";

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
        }
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
            console.log("Component " + componentType + " picked.");
            this.$dispatch('cc-component-picker__pick', componentType);
            if (typeof this.pickComponent === 'function') {
                this.pickComponent(componentType);
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
    template: "<aside class=\"cc-component-actions | {{ class }}\">\n        <div class=\"cc-component-actions__top\">\n            <slot name=\"cc-component-actions__top\"></slot>\n        </div>\n        <div class=\"cc-component-actions__bottom\">\n            <slot name=\"cc-component-actions__bottom\"></slot>\n        </div>\n    </aside>",
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
            },
        },
        /**
         * Property containing callback triggered when user clicks "add component" button.
         */
        createComponent: {
            type: Function,
        },
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
        },
    },
};

/**
 * Component placeholder component.
 */
var componentPlaceholder = {
    template: "<div class=\"cc-component-placeholder\">\n        <div class=\"cc-component-placeholder__content\">\n            <slot></slot>\n        </div>\n    </div>",
};

var template$1 = "<section class=\"cc-layout-builder | {{ class }}\"> <cc-component-adder> <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( 0 )\"> <svg class=\"action-button__icon action-button__icon--size_300\"> <use xlink:href=\"/images/sprites.svg#icon_plus\"></use> </svg> </button> </cc-component-adder> <template v-for=\"component in components\"> <div class=\"cc-layout-builder__component\"> <div class=\"cc-layout-builder__component-actions\"> <cc-component-actions> <template slot=\"cc-component-actions__top\"> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\"> <svg class=\"action-button__icon action-button__icon--size_100\"> <use xlink:href=\"/images/sprites.svg#icon_arrow-up\"></use> </svg> </button> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\"> <svg class=\"action-button__icon action-button__icon--size_100\"> <use xlink:href=\"/images/sprites.svg#icon_arrow-down\"></use> </svg> </button> </template> <template slot=\"cc-component-actions__bottom\"> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" @click=\"editComponentSettings( $index )\"> <svg class=\"action-button__icon\"> <use xlink:href=\"/images/sprites.svg#icon_settings\"></use> </svg> </button> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\"> <svg class=\"action-button__icon\"> <use xlink:href=\"/images/sprites.svg#icon_trash-can\"></use> </svg> </button> </template> </cc-component-actions> </div> <div class=\"cc-layout-builder__component-wrapper\"> <cc-component-placeholder>{{ component.id }}</cc-component-placeholder> </div> </div> <cc-component-adder v-if=\"components.length\"> <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( $index + 1 )\"> <svg class=\"action-button__icon action-button__icon--size_300\"> <use xlink:href=\"/images/sprites.svg#icon_plus\"></use> </svg> </button> </cc-component-adder> </template> </section> ";

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
var layoutBuilder = {
    template: template$1,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        /**
         * Initial component configuration encoded as JSON string.
         */
        componentsConfiguration: {
            type: String,
            default: '',
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should take IComponentInformation and return changed version of it.
         * If callback returns falsy value then component isn't changed.
         */
        editComponent: {
            type: Function,
            default: function (componentInfo) { return componentInfo; },
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should return IComponentInformation.
         * If callback returns falsy value then component isn't added.
         */
        addComponent: {
            type: Function,
            default: function () { return undefined; },
        },
    },
    data: function () {
        return {
            components: [],
        };
    },
    ready: function () {
        // Set initial components configuration if provided.
        this.components = this.componentsConfiguration ? JSON.parse(this.componentsConfiguration) : [];
        this.$dispatch('cc-layout-builder__update');
    },
    methods: {
        /**
         * Returns components information currently stored within layout builder.
         * @return {IComponentInformation[]} Components information array.
         */
        getComponentInformation: function () {
            return JSON.parse(JSON.stringify(this.components));
        },
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
        },
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
            },
        },
    ],
};
var $pickerModal;
var configuratorModalOptions = {
    type: 'slide',
    responsive: true,
    innerScroll: true,
    autoOpen: true,
    title: $t('Configure your component'),
    buttons: [
        {
            text: $.mage.__('Cancel'),
            class: '',
            click: function () {
                this.closeModal();
            },
        },
        {
            text: $.mage.__('Save'),
            class: 'action-primary',
        },
    ],
    closed: function () {
        this.innerHTML = '';
    },
};
var $configuratorModal;
/**
 * M2C Content Constructor component.
 * This is the final layer that is responsible for collecting and tying up all
 * of the M2C admin panel logic.
 */
var m2cContentConstructor = {
    template: "<div class=\"m2c-content-constructor\">\n        <cc-layout-builder\n            v-ref:layout-builder\n            :add-component=\"getComponentPicker\"\n            :edit-component=\"editComponent\"\n            :components-configuration=\"configuration\">\n        </cc-layout-builder>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--picker\" v-el:picker-modal>\n            <cc-component-picker\n                :pick-component=\"getComponentConfigurator\"\n                components='[{\"type\":\"static-block\",\"cover\":\"http://placehold.it/350x185\",\"coverAlt\":\"cover of static block\",\"name\":\"Static block\"},{\"type\":\"headline\",\"cover\":\"http://placehold.it/350x185\",\"coverAlt\":\"cover of headline\",\"name\":\"Headline\"}]'>\n            </cc-component-picker>\n        </div>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--configurator\" v-el:configurator-modal></div>\n    </div>",
    components: {
        'cc-layout-builder': layoutBuilder,
        'cc-component-picker': ccComponentPicker,
    },
    props: {
        configuration: {
            type: String,
            default: '',
        },
    },
    ready: function () {
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
        'cc-headline-configurator__change': function (data) {
            console.log(data);
            this._currentConfiguratorData = data;
        },
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        getComponentPicker: function (addComponentInformation) {
            console.log('Getting component picker.');
            // Save adding callback for async use.
            this._addComponentInformation = addComponentInformation;
            // Open picker modal.
            $pickerModal = modal(pickerModalOptions, $(this.$els.pickerModal));
        },
        getComponentConfigurator: function (componentType) {
            console.log("Getting configurator for " + componentType + " component.");
            var component = this;
            component._currentConfiguratorData = {};
            // Open configurator modal.
            configuratorModalOptions.buttons[1].click = function () {
                component._addComponentInformation({
                    type: 'headline',
                    id: 'component' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
                    data: component._currentConfiguratorData,
                });
                this.closeModal();
                $pickerModal.closeModal();
            };
            configuratorModalOptions.opened = function () {
                var modal = this;
                var headlineConfigurator = Vue.extend(m2cHeadlineConfigurator);
                new headlineConfigurator({
                    parent: component,
                }).$mount().$appendTo(modal);
            };
            $configuratorModal = modal(configuratorModalOptions, $(this.$els.configuratorModal));
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
                settings: 'Nowe Jakieś ustawienia',
            });
        },
        dumpConfiguration: function () {
            uiRegistry.get('cms_page_form.cms_page_form').source.set('data.components', JSON.stringify(this.$refs.layoutBuilder.getComponentInformation()));
        },
    },
};

return m2cContentConstructor;

})));
//# sourceMappingURL=m2c-content-constructor.js.map
