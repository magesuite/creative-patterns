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
            default: '',
        },
        iconId: {
            type: String,
        },
        iconClasses: {
            type: String,
        },
    },
    methods: {
        /**
         * Button click handler.
         * This handler triggers "action-button__click" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onClick: function (event) {
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
    components: {
        'action-button': actionButton,
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) { return value.replace('cc-component-actions', ''); },
        },
        /**
         * Property containing callback triggered when user clicks move up button.
         */
        moveUp: {
            type: Function,
        },
        /**
         * Property containing callback triggered when user clicks move down button.
         */
        moveDown: {
            type: Function,
        },
        /**
         * Property containing callback triggered when user clicks settings button.
         */
        openSettings: {
            type: Function,
        },
        /**
         * Property containing callback triggered when user clicks delete button.
         */
        deleteComponent: {
            type: Function,
        },
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

var template = "<section class=\"cc-layout-builder | {{ class }}\"> <cc-component-adder> <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( 0 )\"> <svg class=\"action-button__icon action-button__icon--size_300\"> <use xlink:href=\"/images/sprites.svg#icon_plus\"></use> </svg> </button> </cc-component-adder> <template v-for=\"component in components\"> <div class=\"cc-layout-builder__component\"> <div class=\"cc-layout-builder__component-actions\"> <cc-component-actions> <template slot=\"cc-component-actions__top\"> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\"> <svg class=\"action-button__icon action-button__icon--size_100\"> <use xlink:href=\"/images/sprites.svg#icon_arrow-up\"></use> </svg> </button> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\"> <svg class=\"action-button__icon action-button__icon--size_100\"> <use xlink:href=\"/images/sprites.svg#icon_arrow-down\"></use> </svg> </button> </template> <template slot=\"cc-component-actions__bottom\"> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" @click=\"editComponentSettings( $index )\"> <svg class=\"action-button__icon\"> <use xlink:href=\"/images/sprites.svg#icon_settings\"></use> </svg> </button> <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\"> <svg class=\"action-button__icon\"> <use xlink:href=\"/images/sprites.svg#icon_trash-can\"></use> </svg> </button> </template> </cc-component-actions> </div> <div class=\"cc-layout-builder__component-wrapper\"> <cc-component-placeholder>{{ component.id }}</cc-component-placeholder> </div> </div> <cc-component-adder v-if=\"components.length\"> <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( $index + 1 )\"> <svg class=\"action-button__icon action-button__icon--size_300\"> <use xlink:href=\"/images/sprites.svg#icon_plus\"></use> </svg> </button> </cc-component-adder> </template> </section> ";

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
var layoutBuilder = {
    template,
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
        },
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
