(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('ccStaticBlockConfigurator', factory) :
    (global.ccStaticBlockConfigurator = factory());
}(this, (function () { 'use strict';

/**
 * Static block configurator component.
 * This component is responsible for displaying static block's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccStaticBlockConfigurator = {
    template: "<form class=\"cc-static-block-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-static-block\" class=\"cs-input__label\">Static block:</label>\n            <select name=\"select\" class=\"cs-input__select\" id=\"cfg-static-block\" v-model=\"staticBlock\" @change=\"onChange\">\n                <option value=\"1\" selected>Foo</option>\n                <option value=\"2\">Bar</option>\n            </select>\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
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
            staticBlock: ''
        };
    },
    methods: {
        onChange: function (event) {
            var data = JSON.parse(JSON.stringify(this.$data));
            this.$dispatch('cc-static-block-configurator__change', data);
            if (typeof this.change === 'function') {
                this.change(data);
            }
        },
        onSave: function (event) {
            var data = JSON.parse(JSON.stringify(this.$data));
            this.$dispatch('cc-static-block-configurator__save', data);
            if (typeof this.save === 'function') {
                this.save(data);
            }
        },
    },
};

return ccStaticBlockConfigurator;

})));
//# sourceMappingURL=cc-static-block-configurator.js.map
