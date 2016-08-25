// This is an UMD module to work with Magento 2 requirejs system.

import { layoutBuilder, IComponentInformation } from '../../cc-layout-builder/src/cc-layout-builder';

/**
 * M2C Content Constructor component.
 * This is the final layer that is responsible for collecting and tying up all
 * of the M2C admin panel logic.
 */
const m2cContentConstructor: vuejs.ComponentOption = {
    template: `<div class="m2c-content-constructor">
        <cc-layout-builder :add-component="addComponent" :edit-component="editComponent">
        </cc-layout-builder>
    </div>`,
    components: {
        'cc-layout-builder': layoutBuilder
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        addComponent: function( addComponentInformation: ( componentInfo: IComponentInformation ) => void ): void {
            // Open magento modal and invoke given callback with component information like below.
            addComponentInformation( {
                name: 'Nazwa komponentu',
                id: 'ID komponentu',
                settings: 'Jakieś ustawienia'
            } );
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        editComponent: function( currentInfo: IComponentInformation, setComponentInformation: ( componentInfo: IComponentInformation ) => void ): void {
            // Open magento modal and invoke given callback with component information like below.
            setComponentInformation( {
                name: 'Nowa Nazwa komponentu',
                id: 'Nowe ID komponentu',
                settings: 'Nowe Jakieś ustawienia'
            } );
        }
    }
};

export default m2cContentConstructor;
