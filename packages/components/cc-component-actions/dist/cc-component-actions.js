(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccComponentActions', factory) :
    (global.ccComponentActions = factory());
}(this, (function () { 'use strict';

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

return componentActions;

})));
//# sourceMappingURL=cc-component-actions.js.map
