// This is an UMD module to work with Magento 2 requirejs system.

import Vue from 'Vue';
import { layoutBuilder, IComponentInformation } from '../../cc-layout-builder/src/cc-layout-builder';
import ccComponentPicker from '../../cc-component-picker/src/cc-component-picker';
import m2cHeadlineConfigurator from '../../../customizations/m2c-headline-configurator/src/m2c-headline-configurator';
import $ from 'jquery';
import modal from 'Magento_Ui/js/modal/modal';
import $t from 'mage/translate';
import vr from 'VueResource';
import uiRegistry from 'uiRegistry';

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
            click: function (): void {
                this.closeModal();
            }
        },
        {
            text: $.mage.__( 'Save' ),
            class: 'action-primary'
        }
    ],
    closed: function(): void {
        this.innerHTML = '';
    }
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
            :add-component="getComponentPicker"
            :edit-component="editComponent"
            :components-configuration="configuration">
        </cc-layout-builder>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--picker" v-el:picker-modal>
            <cc-component-picker
                :pick-component="getComponentConfigurator"
                components='[{"type":"static-block","cover":"http://placehold.it/350x185","coverAlt":"cover of static block","name":"Static block"},{"type":"headline","cover":"http://placehold.it/350x185","coverAlt":"cover of headline","name":"Headline"}]'>
            </cc-component-picker>
        </div>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--configurator" v-el:configurator-modal></div>
    </div>`,
    components: {
        'cc-layout-builder': layoutBuilder,
        'cc-component-picker': ccComponentPicker,
    },
    props: {
        configuration: {
            type: String,
            default: ''
        }
    },
    ready: function(): void {
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
        'cc-headline-configurator__change': function( data: any ): void {
            console.log( data );
            this._currentConfiguratorData = data;
        }
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        getComponentPicker: function( addComponentInformation: ( componentInfo: IComponentInformation ) => void ): void {
            console.log( 'Getting component picker.' );
            // Save adding callback for async use.
            this._addComponentInformation = addComponentInformation;
            // Open picker modal.
            $pickerModal = modal( pickerModalOptions, $( this.$els.pickerModal ) );
        },
        getComponentConfigurator: function( componentType: string ): void {
            console.log( `Getting configurator for ${componentType} component.` );
            const component: any = this;
            component._currentConfiguratorData = {};
            // Open configurator modal.
            configuratorModalOptions.buttons[1].click = function (): void {
                component._addComponentInformation(  {
                    type: 'headline',
                    id: 'component' + Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 ),
                    data: component._currentConfiguratorData
                } );

                this.closeModal();
                $pickerModal.closeModal();
            };
            configuratorModalOptions.opened = function(): void {
                const modal: HTMLElement = this;

                const headlineConfigurator: any = Vue.extend( m2cHeadlineConfigurator );
                new headlineConfigurator( {
                    parent: component
                } ).$mount().$appendTo( modal );
            };

            $configuratorModal = modal( configuratorModalOptions, $( this.$els.configuratorModal ) );
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
            uiRegistry.get('cms_page_form.cms_page_form').source.set(
                'data.components',
                JSON.stringify(
                    this.$refs.layoutBuilder.getComponentInformation()
                )
            );
        },
    }
};

export default m2cContentConstructor;
