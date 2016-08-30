// This is an UMD module to work with Magento 2 requirejs system.

import Vue from 'Vue';
import { layoutBuilder, IComponentInformation } from '../../cc-layout-builder/src/cc-layout-builder';
import m2cComponentPicker from '../../m2c-component-picker/src/m2c-component-picker';
import $ from 'jquery';
import modal from 'Magento_Ui/js/modal/modal';
import $t from 'mage/translate';
import vr from 'VueResource';

// Use Vue resource
Vue.use( vr );

// Picker modal options
let pickerModalOptions: any = {
    type: 'slide',
    responsive: true,
    innerScroll: true,
    autoOpen: true,
    title: $t( 'Please select type of component' ),
    buttons: [
        {
            text: $.mage.__( 'Cancel' ),
            class: '',
            click: function (): void {
                this.closeModal();
            }
        }
    ]
};

// Picker modal options
let configuratorModalOptions: any = {
    type: 'slide',
    responsive: true,
    innerScroll: true,
    autoOpen: true,
    title: $t( 'Configurate your component' ),
    buttons: [
        {
            text: $.mage.__( 'Cancel' ),
            class: '',
            click: function (): void {
                this.closeModal();
            }
        }
    ]
};

/**
 * M2C Content Constructor component.
 * This is the final layer that is responsible for collecting and tying up all
 * of the M2C admin panel logic.
 */
const m2cContentConstructor: vuejs.ComponentOption = {
    template: `<div class="m2c-content-constructor">
        <cc-layout-builder
            v-ref:layout-builder
            :add-component="getCompnentPicker"
            :edit-component="editComponent"
            :components-configuration="configuration">
        </cc-layout-builder>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--picker" v-ref:picker></div>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--configurator" v-ref:configurator></div>
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
        },
        'cc-component-picker__pick': function( componentType: string ): void {
            console.log( componentType );
            this.getComponentConfigurator( componentType );
        },
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        getComponentPicker: function( addComponentInformation: ( componentInfo: IComponentInformation ) => void ): void {
            // Save adding callback for async use.
            this._addComponentInformation = addComponentInformation;
            const component: any = this;
            // Magento modal 'opened' callback
            pickerModalOptions.opened = function(): void {
                const modal: HTMLElement = this;
                // Get available components and put into modal
                component.$http.get( '/admin/content-constructor/component/configurator/type/picker' ).then( ( response: vuejs.HttpResponse ): void => {
                    if ( response.text ) {
                        modal.innerHTML = response.text();

                        new Vue( {
                            el: modal,
                            components: {
                                'm2c-component-picker': m2cComponentPicker
                            }
                        } );
                    }
                } );
            };

            // Open picker modal.
            modal( pickerModalOptions, $( this.$refs.picker ) );
        },
        getComponentConfigurator: function( componentType: string ): void {
            const component: any = this;
            // Magento modal 'opened' callback
            configuratorModalOptions.opened = function(): void {
                const modal: HTMLElement = this;
                // Get configurator and put into modal
                component.$http.get( `/admin/content-constructor/component/configurator/type/${componentType}` ).then( ( response: vuejs.HttpResponse ): void => {
                    if ( response.text ) {
                        modal.innerHTML = response.text();
                    }
                } );
            };

            // Open configurator modal.
            modal( configuratorModalOptions, $( this.$refs.configurator ) );
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
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
        },
    }
};

export default m2cContentConstructor;
