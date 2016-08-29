var csButton = (function () {
    'use strict';

    /**
     * Action button component version.
     * Small component that allows to set it's content.
     *
     * @type {vuejs.ComponentOption} Vue component object.
     * TODO: Write some simple unit tests for object below.
     */
    var csButton = {
        template: "<button class=\"cs-button {{ class }}\">\n        <slot></slot>\n    </button>",
        props: {
            /**
             * Class property support.
             */
            class: {
                type: [String, Object, Array],
                default: ''
            }
        }
    };

    return csButton;

}());
//# sourceMappingURL=cs-button.js.map