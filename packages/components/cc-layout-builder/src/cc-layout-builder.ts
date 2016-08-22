import actionButton from '../../action-button/src/action-button';
import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentActions from '../../cc-component-actions/src/cc-component-actions';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';

import template from './cc-layout-builder.tpl';

/**
 * Single component information interface.
 */
interface IComponentInformation {
    name: string;
    settings: any;
}

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
const layoutBuilder: vuejs.ComponentOption = {
    template: template,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: ( value: String ): String => value.replace( 'cc-layout-builder', '' )
        }
    },
    data: function(): any {
        return {
            addedComponents: []
        };
    },
    methods: {
        createNewComponent: function ( index: number ): void {
            this.addedComponents.splice( index, 0, {
                name: Date.now(),
                settings: {}
            } );
        },
        /**
         * Moves component under given index up by swaping it with previous element.
         * @param {number} index Component's index in array.
         */
        moveComponentUp: function( index: number ): void {
            if ( index > 0 ) {
                let previousComponent: IComponentInformation = this.addedComponents[ index - 1 ];
                this.addedComponents.$set( index - 1, this.addedComponents[ index ] );
                this.addedComponents.$set( index, previousComponent );
            }
        },
        /**
         * Moves component under given index down by swaping it with next element.
         * @param {number} index Component's index in array.
         */
        moveComponentDown: function( index: number ): void {
            if ( index < this.addedComponents.length - 1 ) {
                let previousComponent: IComponentInformation = this.addedComponents[ index + 1 ];
                this.addedComponents.$set( index + 1, this.addedComponents[ index ] );
                this.addedComponents.$set(  index, previousComponent );
            }
        }
    },
};

export default layoutBuilder;
