/*import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentController from '../../cc-component-controller/src/cc-component-controller';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';*/

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
const layoutBuilder: vuejs.ComponentOption = {
    template: `<section class="cc-layout-builder | {{ class }}">
        <div class="cc-layout-builder__adder" @click="createNewComponent">
            <slot name="cc-layout-builder__adder"></slot>
        </div>
        <div class="cc-layout-builder__component">
            <div class="cc-layout-builder__component-actions">
                <slot name="cc-layout-builder__component-actions"></slot>
            </div>
            <div class="cc-layout-builder__component-wrapper">
                <slot name="cc-layout-builder__component-wrapper"></slot>
            </div>
        </div>
    </section>`,
    props: {
        /**
         * Get dependencies
         */
        /*components: {
            'cc-component-adder': componentAdder,
            'cc-component-controller': componentController,
            'cc-component-placeholder': componentPlaceholder
        },*/
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: ( value: String ): String => value.replace( 'cc-layout-builder', '' )
        },
        /**
         * Property containing callback triggered when user clicks create-component button (the one with plus sign).
         */
        createNewComponent: {
            type: Function
        }
    },
    methods: {
        /**
         * Create-component button click handler.
         * This handler triggers "cc-layout-builder__create-new-component" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onCreateNewComponent: function ( event: Event ): void {
            this.$dispatch( 'cc-layout-builder__create-new-component', event );
            if ( typeof this.createNewComponent === 'function' ) {
                this.createNewComponent( event );
            }
        }
    }
};

export default layoutBuilder;
