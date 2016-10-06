/* tslint:disable:no-console */

import $ from 'jquery';
import Vue from 'Vue';
import vr from 'VueResource';

import $t from 'mage/translate';
import modal from 'Magento_Ui/js/modal/modal';
import uiRegistry from 'uiRegistry';

import m2cHeadlineConfigurator from '../../../customizations/m2c-headline-configurator/src/m2c-headline-configurator';
import m2cStaticBlockConfigurator from '../../../customizations/m2c-static-block-configurator/src/m2c-static-block-configurator';
// import m2cImageTeaserConfigurator from '../../../customizations/m2c-image-teaser-configurator/src/m2c-image-teaser-configurator';
import ccComponentPicker from '../../cc-component-picker/src/cc-component-picker';
import { IComponentInformation, layoutBuilder } from '../../cc-layout-builder/src/cc-layout-builder';

// Use Vue resource
Vue.use( vr );

// Set Vue's $http headers Accept to text/html
Vue.http.headers.custom.Accept = 'text/html';

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
            click(): void {
                this.closeModal();
            },
        },
    ],
};
let $pickerModal: any;

let configuratorModalOptions: any = {
    type: 'slide',
    responsive: true,
    innerScroll: true,
    autoOpen: true,
    title: $t( 'Configure your component' ),
    buttons: [
        {
            text: $.mage.__( 'Cancel' ),
            class: '',
            click(): void {
                this.closeModal();
            },
        },
        {
            text: $.mage.__( 'Save' ),
            class: 'action-primary',
        },
    ],
};
let $configuratorModal: any;

/**
 * M2C Content Constructor component.
 * This is the final layer that is responsible for collecting and tying up all
 * of the M2C admin panel logic.
 */
const m2cContentConstructor: vuejs.ComponentOption = {
    template: `<div class="m2c-content-constructor">
        <cc-layout-builder
            v-ref:layout-builder
            :assets-src="assetsSrc"
            :add-component="getComponentPicker"
            :edit-component="editComponent"
            :components-configuration="configuration">
        </cc-layout-builder>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--picker" v-el:picker-modal></div>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--configurator" v-el:configurator-modal></div>
    </div>`,
    components: {
        'cc-layout-builder': layoutBuilder,
        'cc-component-picker': ccComponentPicker,
        'm2c-headline-configurator': m2cHeadlineConfigurator,
        'm2c-static-block-configurator': m2cStaticBlockConfigurator,
        // 'm2c-image-teaser-configurator': m2cImageTeaserConfigurator,
    },
    props: {
        configuration: {
            type: String,
            default: '',
        },
        assetsSrc: {
            type: String,
            default: '',
        },
        configuratorEndpoint: {
            type: String,
            default: '',
        },
        /* uploaderUrl: {
            type: String,
            default: '',
        }, */
    },
    data(): Object {
        return {
            currentComponentConfiguration: undefined,
        };
    },
    ready(): void {
        this.dumpConfiguration();
        this.isPickerLoaded = false;
        this.cleanupConfiguratorModal = '';
    },
    events: {
        /**
         * We update provided input with new components information each time leyout
         * builder updates.
         */
        'cc-layout-builder__update'(): void {
            this.dumpConfiguration();
        },
        'cc-headline-configurator__change'( data: any ): void {
            this._currentConfiguratorData = data;
        },
        'cc-static-block-configurator__change'( data: any ): void {
            this._currentConfiguratorData = data;
        },
        'cc-image-teaser-configurator__change'( data: any ): void {
            this._currentConfiguratorData = data;
        },
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        getComponentPicker( addComponentInformation: ( componentInfo: IComponentInformation ) => void ): void {
            const component: any = this;

            // Save adding callback for async use.
            this._addComponentInformation = addComponentInformation;

            pickerModalOptions.opened = function(): void {
                if ( !component.isPickerLoaded ) {
                    // Get picker via AJAX
                    component.$http.get( `${component.configuratorEndpoint}picker` ).then( ( response: any ): void => {
                        component.$els.pickerModal.innerHTML = response.body;
                        component.$compile( component.$els.pickerModal );
                        component.isPickerLoaded = true;
                    } );
                }
            };
            // Create or Show picker modal depending if exists
            if ( $pickerModal ) {
                $pickerModal.openModal();
            } else {
                $pickerModal = modal( pickerModalOptions, $( this.$els.pickerModal ) );
            }
        },

        /**
         * Callback that will be invoked when user choses component in picker.
         * This method should open magento modal with component configurator.
         * @param {componentType} String - type of component chosen
         */
        getComponentConfigurator( componentType: string ): void {
            const component: any = this;
            component._currentConfiguratorData = {};

            // On save component:
            configuratorModalOptions.buttons[1].click = function (): void {

                console.log( component._currentConfiguratorData );

                component._addComponentInformation( {
                    type: componentType,
                    id: 'component' + Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 ),
                    data: component._currentConfiguratorData,
                } );

                this.closeModal();
                $pickerModal.closeModal();
            };

            // Configurator modal opened callback
            configuratorModalOptions.opened = function(): void {
                // Get twig component
                component.$http.get( component.configuratorEndpoint + componentType ).then( ( response: any ): void => {
                    component.$els.configuratorModal.innerHTML = response.body;
                    // compile fetched component
                    component.cleanupConfiguratorModal = component.$compile( component.$els.configuratorModal );
                } );
            };

            configuratorModalOptions.closed = function(): void {
                // Cleanup configurator component and then remove modal
                if ( typeof component.cleanupConfiguratorModal === 'function' ) {
                    component.cleanupConfiguratorModal();
                }
                $configuratorModal.modal[ 0 ].parentNode.removeChild( $configuratorModal.modal[ 0 ] );
            };
            // Create & Show $configuratorModal
            $configuratorModal = modal( configuratorModalOptions, $( this.$els.configuratorModal ) );
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
         */
        editComponent(
            currentComponentConfiguration: IComponentInformation,
            setComponentInformation: ( componentInfo: IComponentInformation ) => void
        ): void {
            const component: any = this;

            configuratorModalOptions.buttons[1].click = function (): void {

                console.log( component._currentConfiguratorData );

                setComponentInformation( {
                    type: currentComponentConfiguration.type,
                    id: currentComponentConfiguration.id,
                    data: component._currentConfiguratorData,
                } );

                this.closeModal();
            };

            // Configurator modal opened callback
            configuratorModalOptions.opened = function(): void {
                // Get twig component
                component.$http.get( component.configuratorEndpoint + currentComponentConfiguration.type ).then( ( response: any ): void => {
                    component.$els.configuratorModal.innerHTML = response.body;

                    // Set current component configuration data
                    component.currentComponentConfiguration = currentComponentConfiguration.data;

                    // compile fetched component
                    component.cleanupConfiguratorModal = component.$compile( component.$els.configuratorModal );
                } );
            };

            configuratorModalOptions.closed = function(): void {
                // Cleanup configurator component and then remove modal
                if ( typeof component.cleanupConfiguratorModal === 'function' ) {
                    component.cleanupConfiguratorModal();
                }
                $configuratorModal.modal[ 0 ].parentNode.removeChild( $configuratorModal.modal[ 0 ] );
                component.currentComponentConfiguration = null;
            };
            // Create & Show $configuratorModal
            $configuratorModal = modal( configuratorModalOptions, $( this.$els.configuratorModal ) );
        },
        dumpConfiguration(): void {
            uiRegistry.get('cms_page_form.cms_page_form').source.set(
                'data.components',
                JSON.stringify(
                    this.$refs.layoutBuilder.getComponentInformation()
                )
            );
        },
    },
};

export default m2cContentConstructor;
