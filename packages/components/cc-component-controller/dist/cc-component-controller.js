var ccComponentController = (function () {
    'use strict';

    var componentController = {
        template: "<aside class=\"cc-component-controller | {{ class }}\">\n        <div class=\"cc-component-controller__top\">\n            <div class=\"cc-component-controller__button\" @click=\"onMoveUp\">\n                <slot name=\"cc-component-controller__button--up\"></slot>\n            </div>\n            <div class=\"cc-component-controller__button\" @click=\"onMoveDown\">\n                <slot name=\"cc-component-controller__button--down\"></slot>\n            </div>\n        </div>\n        <div class=\"cc-component-controller__bottom\">\n            <div class=\"cc-component-controller__button\" @click=\"onOpenSettings\">\n                <slot name=\"cc-component-controller__button--settings\"></slot>\n            </div>\n            <div class=\"cc-component-controller__button\" @click=\"onDeleteComponent\">\n                <slot name=\"cc-component-controller__button--delete\"></slot>\n            </div>\n        </div>\n    </aside>",
        props: {
            class: {
                type: String,
                default: '',
                coerce: function (value) { return value.replace('cc-component-controller', ''); }
            },
            moveUp: {
                type: Function
            },
            moveDown: {
                type: Function
            },
            openSettings: {
                type: Function
            },
            deleteComponent: {
                type: Function
            },
        },
        methods: {
            onMoveUp: function (event) {
                this.$dispatch('cc-component-controller__move-up', event);
                if (typeof this.moveUp === 'function') {
                    this.moveUp();
                }
            },
            onMoveDown: function (event) {
                this.$dispatch('cc-component-controller__move-down', event);
                if (typeof this.moveDown === 'function') {
                    this.moveDown();
                }
            },
            onOpenSettings: function (event) {
                this.$dispatch('cc-component-controller__open-settings', event);
                if (typeof this.openSettings === 'function') {
                    this.props.openSettings();
                }
            },
            onDeleteComponent: function (event) {
                this.$dispatch('cc-component-controller__delete-component', event);
                if (typeof this.deleteComponent === 'function') {
                    this.deleteComponent();
                }
            }
        }
    };

    return componentController;

}());
//# sourceMappingURL=cc-component-controller.js.map