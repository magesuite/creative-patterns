import ccParagraphConfigurator from '../../../components/cc-paragraph-configurator/src/cc-paragraph-configurator';

import $ from 'jquery';
import $t from 'mage/translate';
import Vue from 'Vue';

/**
 * M2C skin for Paragraph configurator component.
 * This component is responsible for displaying paragraph configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const m2cParagraphConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccParagraphConfigurator,
    ],
    template: `<form class="m2c-paragraph-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        
        <div class="m2c-paragraph-configurator__error" v-text="tempConfiguration.errorMessage" v-show="tempConfiguration.errorMessage">
        </div>

        <div class="m2-input">
            <label for="input-cfg-id" class="m2-input__label">${$t( 'Identifier' )}:</label>
            <input type="text" name="cfg-id" v-model="tempConfiguration.identifier" id="input-cfg-id" class="m2-input__input m2-input__input--limited-width" @blur="stripSpaces( tempConfiguration.identifier )" maxlength="30">
        </div>
        <div class="m2-input">
            <label for="input-cfg-title" class="m2-input__label">${$t( 'Title' )}:</label>
            <input type="text" name="cfg-title" v-model="tempConfiguration.title" id="input-cfg-title" class="m2-input__input m2-input__input--limited-width" maxlength="100">
        </div>
        <div class="m2-input">
            <label for="textarea-cfg-paragraph" class="m2-input__label m2-input__label--look-top-align">${$t( 'HTML' )}:</label>

            <div class="buttons-set | m2c-paragraph-configurator__wysiwyg-buttons">
                <button type="button" class="scalable action-show-hide" id="toggle-wysiwyg">${$t( 'Show / Hide Editor' )}</button>
                <button type="button" class="scalable action-add-widget plugin" @click="openWidgetModal()" v-show="!isEditorVisible">${$t( 'Insert Widget' )}...</button>
                <button type="button" class="scalable action-add-image plugin" @click="openMediaModal()" v-show="!isEditorVisible">${$t( 'Insert Image' )}...</button>
                <button type="button" class="scalable add-variable plugin" @click="openMagentoVariablesModal()" v-show="!isEditorVisible">${$t( 'Insert Variable' )}...</button>
            </div>

            <textarea name="cfg-paragraph" v-model="tempConfiguration.content" id="textarea-cfg-paragraph" class="m2-input__textarea | m2c-paragraph-configurator__textarea"></textarea>
        </div>
    </form>`,
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default(): Object {
                return {
                    blockId: '',
                    title: '',
                };
            },
        },
        restToken: {
            type: String,
            default: '',
        },
        wysiwygConfig: {
            type: String,
            default: '',
        },
        /* Obtain base-url for the image uploader */
        uploaderBaseUrl: {
            type: String,
            default: '',
        },
    },
    data(): void {
        return {
            /*
             * This object if used to operate inside component. We want to bind data to inputs,
             * but we don't need them to be saved in m2c component's config. Only ID is needed,
             * since rest of data id fetched from database.
             */
            tempConfiguration: {
                identifier: '',
                title: '',
                content: '',
                errorMessage: '',
            },

            isEditorVisible: true,

            // wysiwyg editor object
            editor: undefined,
        };
    },
    ready(): void {
        // Check if wysiwygConfig was passed - means that editor is enabled in admin panel
        if ( this.wysiwygConfig !== '' ) {
            this.wysiwygCfg = JSON.parse( this.wysiwygConfig );
            this.wysiwygCfg.height = '300px';
        }

        // Init loader and hide it
        $( 'body' ).one().loadingPopup( {
            timeout: false,
        } ).trigger( 'hideLoadingPopup' );

        // If ID is already provided (means we're in edit mode)
        if ( this.configuration.blockId ) {
            const component: any = this;

            // Show loader before request
            $( 'body' ).trigger( 'showLoadingPopup' );

            // Send request to REST API to get CMS block data if in edit mode
            this.$http( {
                headers: {
                    Accept: 'application/json',
                    Authorization: component.restToken,
                },
                method: 'get',
                url: `${ window.location.origin }/rest/all/V1/cmsBlock/${this.configuration.blockId}`,
            } ).then( ( response: any ): void => {

                // Hide loader
                $( 'body' ).trigger( 'hideLoadingPopup' );

                // Update components tempConfiguration
                component.tempConfiguration.identifier = response.data.identifier;
                component.tempConfiguration.title = response.data.title;
                component.tempConfiguration.content = response.data.content;
                component.configuration.title = response.data.title;

                // initialize customized WYSIWYG
                if ( component.wysiwygCfg ) {
                    component.initWysiwyg();
                }

            }, ( response: any ): void => {
                $( 'body' ).trigger( 'hideLoadingPopup' );
            } );
        } else {
            // initialize customized WYSIWYG
            if ( this.wysiwygCfg ) {
                this.initWysiwyg();
            }
        }
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            const component: any = this;

            // Construct data for REST API
            const dataConstruct: any = {
                block: {
                    identifier: this.tempConfiguration.identifier,
                    title: this.tempConfiguration.title,
                    content: this.tempConfiguration.content,
                    active: true,
                },
            };

            // Show loader before request
            $( 'body' ).trigger( 'showLoadingPopup' );

            // Send request to REST API
            this.$http( {
                headers: {
                    Accept: 'application/json',
                    Authorization: component.restToken,
                },
                method: this.configuration.blockId ? 'put' : 'post',
                url: this.configuration.blockId ? `${ window.location.origin }/rest/all/V1/cmsBlock/${this.configuration.blockId}` : `${ window.location.origin }/rest/all/V1/cmsBlock`,
                body: dataConstruct,
            } ).then( ( response: any ): void => {

                // If status is OK update component's configuration and run Save to save component data
                if ( response.ok ) {
                    component.configuration.blockId = response.data.id;
                    component.configuration.title = response.data.title;

                    // Hide loader
                    $( 'body' ).trigger( 'hideLoadingPopup' );
                    component.onSave();
                }
            }, ( response: any ): void => {
                // if failed and response returned any message, put it into error div, else put default text
                if ( response.message ) {
                    component.tempConfiguration.errorMessage = response.data.message;
                } else {
                    component.tempConfiguration.errorMessage = $t( 'An error occured. Please try again later.' );
                }

                // Set headers back
                Vue.http.headers.custom.Accept = 'text/html';

                // Hide loader
                $( 'body' ).trigger( 'hideLoadingPopup' );
            } );
        },
    },
    methods: {
        stripSpaces( str: string ): void {
            const striped: string = str.split( ' ' ).join( '-' ).toLowerCase();
            this.tempConfiguration.identifier = striped;
        },
        /* Opens modal with M2 built-in widget chooser
         */
        openWidgetModal(): void {
            widgetTools.openDialog( `${this.wysiwygCfg.widget_window_url}widget_target_id/textarea-cfg-paragraph` );
        },
        /* Opens modal with M2 built-in media uploader
         */
        openMediaModal(): void {
            MediabrowserUtility.openDialog( `${this.uploaderBaseUrl}target_element_id/textarea-cfg-paragraph`,
                'auto',
                'auto',
                $t( 'Insert File...' ),
                {
                    closed: true,
                },
            );
        },
        /* Opens modal with M2 built-in variables
         */
        openMagentoVariablesModal(): void {
            MagentovariablePlugin.loadChooser( `${window.location.origin}/admin/admin/system_variable/wysiwygPlugin/`, 'textarea-cfg-paragraph' );
        },
        initWysiwyg(): void {
            const _this: any = this;

            window.tinyMCE_GZ = window.tinyMCE_GZ || {};
            window.tinyMCE_GZ.loaded = true;

            require( [
                'mage/translate',
                'mage/adminhtml/events',
                'm2cTinyMceWysiwygSetup',
                'mage/adminhtml/wysiwyg/widget',
            ], function(): void {
                // Setup (this global variable is already set in constructor.phtml)
                csWysiwygEditor = new m2cTinyMceWysiwygSetup( 'textarea-cfg-paragraph', _this.wysiwygCfg );

                // Initialization
                csWysiwygEditor.setup( 'exact' );
                _this.isEditorVisible = true;

                // Set listener for enable/disable editor button
                Event.observe( 'toggle-wysiwyg', 'click', function(): void {
                    csWysiwygEditor.toggle();
                    _this.isEditorVisible = !_this.isEditorVisible;
                }.bind( csWysiwygEditor ) );

                // Set handlers for editor
                const editorFormValidationHandler = csWysiwygEditor.onFormValidation.bind( csWysiwygEditor );
                varienGlobalEvents.attachEventHandler( 'formSubmit', editorFormValidationHandler );
                varienGlobalEvents.clearEventHandlers( 'open_browser_callback' );

                // Add callback for editor's IMAGE button to open file uploader while clicked
                varienGlobalEvents.attachEventHandler( 'open_browser_callback', csWysiwygEditor.openFileBrowser );
            } );
        },
    },
};

export default m2cParagraphConfigurator;
