/**
 * Button component version.
 * Small component that allows to set its content.
 *
 * @type {vuejs.ComponentOption} Vue component object.
 * TODO: Write some simple unit tests for object below.
 */
const csButton: vuejs.ComponentOption = {
    template: `<button class="cs-button {{ class }}">
        <slot></slot>
    </button>`,
    props: {
        /**
         * Class property support.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
    },
};

export default csButton;
