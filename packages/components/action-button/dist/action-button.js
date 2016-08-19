var actionButton = (function () {
    'use strict';

    /**
     * Component controller component.
     * This component is responsible for displaying and handling user interactions of
     * side utility navigation for each component that supports:
     * - Moving component up,
     * - Moving component down,
     * - Opening component settings,
     * - Deleting component.
     *
     * @type {vuejs.ComponentOption} Vue component object.
     */
    const actionButton = {
        template: `<button class="action-button {{ class }}" @click="onClick">
        <slot></slot>
    </button>`,
        props: {
            /**
             * Class property support to enable BEM mixes.
             */
            class: {
                type: String,
                default: '',
                coerce: (value) => value.replace(/(\s|^)action-button(\s|$)/, '')
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

    return actionButton;

}());
//# sourceMappingURL=action-button.js.map