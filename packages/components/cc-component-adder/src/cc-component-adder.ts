/**
 * Component controller component.
 * This component is responsible for displaying annd handling component adding button
 * @type {vuejs.ComponentOption} Vue component object.
 */

const componentAdder: vuejs.ComponentOption = {
    template: `<section class="cc-component-adder | {{ class }}">
        <div class="cc-component-adder__button-create" @click="onCreateComponent">
            <slot></slot>
        </div>
    </section>`,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function ( value: string ): string {
                return value.replace( 'cc-component-adder', '' );
            }
        },
        /**
         * Property containing callback triggered when user clicks "add component" button.
         */
        createComponent: {
            type: Function
        }
    },
    methods: {
        /**
         * "Add component" button click handler.
         * This handler triggers "cc-component-adder__create-component" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onCreateComponent: function( event: Event ): void {
            this.$dispatch( 'cc-component-adder__create-component', event );
            if ( typeof this.createComponent === 'function' ) {
                this.createComponent( event );
            }
        }
    }
};

export default componentAdder;