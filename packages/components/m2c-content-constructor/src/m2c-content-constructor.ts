/* tslint:disable:no-console */

import $ from 'jquery';
import Vue from 'Vue';
import vr from 'VueResource';

import $t from 'mage/translate';
import modal from 'Magento_Ui/js/modal/modal';
import uiRegistry from 'uiRegistry';
import 'loadingPopup';

import m2cButtonConfigurator from '../../../customizations/m2c-button-configurator/src/m2c-button-configurator';
import m2cCategoryLinksConfigurator from '../../../customizations/m2c-category-links-configurator/src/m2c-category-links-configurator';
import m2cHeadlineConfigurator from '../../../customizations/m2c-headline-configurator/src/m2c-headline-configurator';
import m2cHeroCarouselConfigurator from '../../../customizations/m2c-hero-carousel-configurator/src/m2c-hero-carousel-configurator';
import m2cImageTeaserConfigurator from '../../../customizations/m2c-image-teaser-configurator/src/m2c-image-teaser-configurator';
import m2cParagraphConfigurator from '../../../customizations/m2c-paragraph-configurator/src/m2c-paragraph-configurator';
import m2cProductCarouselConfigurator from '../../../customizations/m2c-product-carousel-configurator/src/m2c-product-carousel-configurator';
import m2cStaticBlockConfigurator from '../../../customizations/m2c-static-block-configurator/src/m2c-static-block-configurator';
import ccComponentPicker from '../../cc-component-picker/src/cc-component-picker';

import { IComponentInformation, m2cLayoutBuilder } from '../../../customizations/m2c-layout-builder/src/m2c-layout-builder';

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
        <m2c-layout-builder
            v-ref:m2c-layout-builder
            :assets-src="assetsSrc"
            :add-component="getComponentPicker"
            :edit-component="editComponent"
            :components-configuration="configuration">
        </m2c-layout-builder>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--picker" v-el:picker-modal></div>
        <div class="m2c-content-constructor__modal m2c-content-constructor__modal--configurator" v-el:configurator-modal></div>
    </div>`,
    components: {
        'm2c-layout-builder': m2cLayoutBuilder,
        'cc-component-picker': ccComponentPicker,
        'm2c-headline-configurator': m2cHeadlineConfigurator,
        'm2c-static-block-configurator': m2cStaticBlockConfigurator,
        'm2c-image-teaser-configurator': m2cImageTeaserConfigurator,
        'm2c-paragraph-configurator': m2cParagraphConfigurator,
        'm2c-hero-carousel-configurator': m2cHeroCarouselConfigurator,
        'm2c-product-carousel-configurator': m2cProductCarouselConfigurator,
        'm2c-category-links-configurator': m2cCategoryLinksConfigurator,
        'm2c-button-configurator': m2cButtonConfigurator,
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
        uploaderUrl: {
            type: String,
            default: '',
        },
        restTokenEndpoint: {
            type: String,
            default: '',
        },
        imageEndpoint: {
            type: String,
            default: '',
        },
    },
    data(): Object {
        return {
            initialComponentConfiguration: undefined,
            restToken: undefined,
        };
    },
    ready(): void {
        this.dumpConfiguration();
        this._isPickerLoaded = false;
        this._cleanupConfiguratorModal = '';
        this._configuratorSaveCallback = (): undefined => undefined;
        this.setRestToken();

        // Initialize M2 loader for m2c modals
        $( 'body' ).loadingPopup( {
            timeout: false,
        } ).trigger( 'hideLoadingPopup' );
    },
    events: {
        /**
         * We update provided input with new components information each time leyout
         * builder updates.
         */
        'cc-layout-builder__update'(): void {
            this.dumpConfiguration();
        },
        'cc-component-configurator__saved'( data: any ): void {
            this._configuratorSavedCallback( data );

            if ( $configuratorModal && $configuratorModal.closeModal ) {
                $configuratorModal.closeModal();
            }
            if ( $pickerModal && $pickerModal.closeModal ) {
                $pickerModal.closeModal();
            }
        },
        'cc-layout-builder__cmsblock-delete-request'( cmsBlockId: string ): void {
            this.deleteStaticBlock( cmsBlockId );
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
                if ( !component._isPickerLoaded ) {
                    // Show ajax loader
                    $( 'body' ).trigger( 'showLoadingPopup' );

                    // Get picker via AJAX
                    component.$http.get( `${component.configuratorEndpoint}picker` ).then( ( response: any ): void => {
                        component.$els.pickerModal.innerHTML = response.body;
                        component.$compile( component.$els.pickerModal );
                        component._isPickerLoaded = true;
                        // Hide loader
                        $( 'body' ).trigger( 'hideLoadingPopup' );
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
            const newComponentId: string = 'component' + Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 );
            this._configuratorSavedCallback = ( componentData: any ): void => {
                this._addComponentInformation( {
                    type: componentType,
                    id: newComponentId,
                    data: componentData,
                } );
            };

            if ( componentType === 'brand-carousel' ) {
                this.$emit( 'cc-component-configurator__saved', [] );
            } else {
                this.initConfiguratorModal( {
                    type: componentType,
                    id: newComponentId,
                    data: undefined,
                } );
            }
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
         */
        editComponent(
            prevComponentData: IComponentInformation,
            setComponentInformation: ( componentInfo: IComponentInformation ) => void,
        ): void {
            this._configuratorSavedCallback = ( componentData: any ): void => {
                setComponentInformation( {
                    type: prevComponentData.type,
                    id: prevComponentData.id,
                    data: componentData,
                } );
            };

            this.initConfiguratorModal( prevComponentData );
        },

        initConfiguratorModal( componentInformation: IComponentInformation ): void {
            const component: any = this;
            let cleanupConfiguratorModal: Function = (): undefined => undefined;

            configuratorModalOptions.buttons[1].click = function (): void {
                component.$broadcast( 'cc-component-configurator__save' );
            };
            configuratorModalOptions.title = `${ $t( 'Configure your component' ) }<span class="m2c-content-constructor__modal-subheadline">${ this.transformComponentTypeToText( componentInformation.type ) }</span>`;

            // Configurator modal opened callback
            configuratorModalOptions.opened = function(): void {
                // Show ajax loader
                $( 'body' ).trigger( 'showLoadingPopup' );

                // Get twig component
                component.$http.get( component.configuratorEndpoint + componentInformation.type ).then( ( response: any ): void => {
                    component.$els.configuratorModal.innerHTML = response.body;

                    // Set current component configuration data
                    component.initialComponentConfiguration = componentInformation.data;

                    // compile fetched component
                    cleanupConfiguratorModal = component.$compile( component.$els.configuratorModal );

                    // Hide loader
                    $( 'body' ).trigger( 'hideLoadingPopup' );
                } );
            };

            configuratorModalOptions.closed = function(): void {
                // Cleanup configurator component and then remove modal
                cleanupConfiguratorModal();
                component.$els.configuratorModal.innerHTML = '';
                $configuratorModal.modal[ 0 ].parentNode.removeChild( $configuratorModal.modal[ 0 ] );
                component.initialComponentConfiguration = undefined;
            };
            // Create & Show $configuratorModal
            $configuratorModal = modal( configuratorModalOptions, $( this.$els.configuratorModal ) );
        },

        dumpConfiguration(): void {
            uiRegistry.get('cms_page_form.cms_page_form').source.set(
                'data.components',
                JSON.stringify(
                    this.$refs.m2cLayoutBuilder.getComponentInformation(),
                ),
            );
        },

        setRestToken(): void {
            const component: any = this;

            // send request for token
            this.$http.get( this.restTokenEndpoint ).then( ( response: any ): void => {
                component.restToken = `Bearer ${response.body}`;
            } );
        },

        deleteStaticBlock( cmsBlockId: string ): void {
            const component: any = this;

            // Send request to REST API
            this.$http( {
                headers: {
                    Accept: 'application/json',
                    Authorization: component.restToken,
                },
                method: 'delete',
                url: `${ window.location.origin }/rest/V1/cmsBlock/${cmsBlockId}`,
            } ).then( ( response: any ): void => {
                if ( response.body !== 'true' ) {
                    console.warn( `Something went wrong, CMS block wasn\'t removed, please check if block with ID: ${cmsBlockId} exists in database` );
                }
            } );
        },

        transformComponentTypeToText( componentType: string ): string {
            const txt: string = componentType.replace( '-', ' ' );
            return txt.charAt( 0 ).toUpperCase() + txt.slice( 1 );
        },
    },
};

export default m2cContentConstructor;
