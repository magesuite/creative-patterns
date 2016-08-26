// This is an UMD module to work with Magento 2 requirejs system.

import { layoutBuilder, IComponentInformation } from '../../cc-layout-builder/src/cc-layout-builder';

/**
 * M2C Content Constructor component.
 * This is the final layer that is responsible for collecting and tying up all
 * of the M2C admin panel logic.
 */
const m2cContentConstructor: vuejs.ComponentOption = {
    template: `<div class="m2c-content-constructor">
        <cc-layout-builder v-ref:layout-builder :add-component="addComponent" :edit-component="editComponent" :components-configuration="configuration">
        </cc-layout-builder>
    </div>`,
    components: {
        'cc-layout-builder': layoutBuilder
    },
    props: {
        configuration: {
            type: String,
            default: ''
        },
        /**
         * Selector for an input which will hold current components' configuration.
         */
        configurationDump: {
            type: String,
            required: true,
            validator: function ( selector: string ): boolean {
                // Check if input exists. No jQuery, IE9+.
                return document.querySelector( selector ) !== null;
            }
        }
    },
    ready: function(): void {
        // Let's save HTML element of provided input selector for further use. No jQuery, IE9+.
        this.configurationDumpElement = document.querySelector( this.configurationDump );
        this.dumpConfiguration();
    },
    events: {
        /**
         * We update provided input with new components information each time leyout
         * builder updates.
         */
        'cc-layout-builder__update': function(): void {
            this.dumpConfiguration();
        }
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
        },
        dumpConfiguration: function(): void {
            if ( this.configurationDumpElement ) {
                this.configurationDumpElement.value = JSON.stringify(
                    this.$refs.layoutBuilder.getComponentInformation()
                );
            }
        }
    }
};

export default m2cContentConstructor;
