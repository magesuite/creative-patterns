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

exports['default'] = actionButton;

}((this.actionButton = this.actionButton || {})));
//# sourceMappingURL=action-button.js.map
