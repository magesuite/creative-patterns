var ccComponentAdder = (function () {
    'use strict';

    var componentAdder = {
        template: "<section class=\"cc-component-adder | {{ class }}\">\n        <div class=\"cc-component-adder__button-create\" @click=\"onCreateComponent\">\n            <slot name=\"cc-component-adder__button-create\"></slot>\n        </div>\n    </section>",
        props: {
            class: {
                type: String,
                default: '',
                coerce: function (value) {
                    return value.replace('cc-component-adder', '');
                }
            },
            createComponent: {
                type: Function
            }
        },
        methods: {
            onCreateComponent: function (event) {
                this.$dispatch('cc-component-adder__create-component', event);
                if (typeof this.createComponent === 'function') {
                    this.createComponent();
                }
            }
        }
    };

    return componentAdder;

}());
//# sourceMappingURL=cc-component-adder.js.map