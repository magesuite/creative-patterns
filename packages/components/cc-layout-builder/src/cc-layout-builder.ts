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
            type: [ String, Object, Array ],
            default: ''
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should take IComponentInformation and return changed version of it.
         * If callback returns falsy value then component isn't changed.
         */
        editComponent: {
            type: Function,
            default: ( componentInfo: IComponentInformation ): IComponentInformation => componentInfo
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should return IComponentInformation.
         * If callback returns falsy value then component isn't added.
         */
        addComponent: {
            type: Function,
            default: (): IComponentInformation => undefined
        }
    },
    data: function(): any {
        return {
            addedComponents: []
        };
    },
    methods: {
        /**
         * Creates new component and adds it to a specified index.
         * This function calls callback specified by "add-component" property that
         * should return IComponentInformation.
         * If callback returns falsy value then component isn't added.
         * @param {number} index New component's index in components array.
         */
        createNewComponent: function ( index: number ): void {
            const componentInfo: IComponentInformation = this.addComponent();
            if ( componentInfo ) {
                this.addedComponents.splice( index, 0, componentInfo );
            }
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
        },
        /**
         * Initializes edit mode of component.
         * This function invokes callback given by "edit-component" callback that
         * should take current IComponentInformation as param and return changed version of it.
         * If callback returns falsy value then component isn't changed.
         * @param {string} index: Component's index in array.
         */
        editComponentSettings: function( index: number ): void {
            let componentInfo: IComponentInformation = this.addedComponents[ index ];
            console.log( `Openning modal window with component settings (ID: ${componentInfo.name})` );

            componentInfo = this.editComponent( componentInfo );
            if ( componentInfo ) {
                this.addedComponents.$set( index, componentInfo );
            }
        },
        /**
         * Removes component and adder that is right after component from the DOM
         * @param {number} index Component's index in array.
         */
        deleteComponent: function( index: number ): void {
             if ( confirm( `Are you sure you want to remove this component?` ) ) {
                this.addedComponents.splice( index, 1 );
            }
        },
        /**
         * Tells if component with given index is the first component.
         * @param  {number}  index Index of the component.
         * @return {boolean}       If component is first in array.
         */
        isFirstComponent: function( index: number ): boolean {
            return index === 0;
        },
        /**
         * Tells if component with given index is the last component.
         * @param  {number}  index Index of the component.
         * @return {boolean}       If component is last in array.
         */
        isLastComponent: function( index: number ): boolean {
            return index === this.addedComponents.length - 1;
        }
    },
};

export default layoutBuilder;
