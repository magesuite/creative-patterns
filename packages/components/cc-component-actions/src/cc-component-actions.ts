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
const componentActions: vuejs.ComponentOption = {
    template: `<aside class="cc-component-actions | {{ class }}">
        <div class="cc-component-actions__top">
            <slot name="cc-component-actions__top"></slot>
        </div>
        <div class="cc-component-actions__bottom">
            <slot name="cc-component-actions__bottom"></slot>
        </div>
    </aside>`,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: ( value: String ): String => value.replace( 'cc-component-actions', '' ),
        },
    },
};

export default componentActions;
