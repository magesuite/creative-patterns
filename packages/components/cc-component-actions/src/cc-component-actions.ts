import actionButton from '../../action-button/src/action-button.ts';

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
    components: {
        'action-button': actionButton
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: ( value: String ): String => value.replace( 'cc-component-actions', '' )
        },
        /**
         * Property containing callback triggered when user clicks move up button.
         */
        moveUp: {
            type: Function
        },
        /**
         * Property containing callback triggered when user clicks move down button.
         */
        moveDown: {
            type: Function
        },
        /**
         * Property containing callback triggered when user clicks settings button.
         */
        openSettings: {
            type: Function
        },
        /**
         * Property containing callback triggered when user clicks delete button.
         */
        deleteComponent: {
            type: Function
        }
    },
    methods: {
        /**
         * Move up button click handler.
         * This handler triggers "cc-component-actions__move-up" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onMoveUp: function ( event: Event ): void {
            this.$dispatch( 'cc-component-actions__move-up', event );
            if ( typeof this.moveUp === 'function' ) {
                this.moveUp( event );
            }
        },
        /**
         * Move down button click handler.
         * This handler triggers "cc-component-actions__move-down" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onMoveDown: function ( event: Event ): void {
            this.$dispatch( 'cc-component-actions__move-down', event );
            if ( typeof this.moveDown === 'function' ) {
                this.moveDown( event );
            }
        },
        /**
         * Settings button click handler.
         * This handler triggers "cc-component-actions__open-settings" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onOpenSettings: function ( event: Event ): void {
            this.$dispatch( 'cc-component-actions__open-settings', event );
            if ( typeof this.openSettings === 'function' ) {
                this.openSettings( event );
            }
        },
        /**
         * Delete button click handler.
         * This handler triggers "cc-component-actions__delete-component" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onDeleteComponent: function ( event: Event ): void {
            this.$dispatch( 'cc-component-actions__delete-component', event );
            if ( typeof this.deleteComponent === 'function' ) {
                this.deleteComponent( event );
            }
        }
    }
};

export default componentActions;
