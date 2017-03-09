import ccButtonConfigurator from '../../../components/cc-button-configurator/src/cc-button-configurator';

import $ from 'jquery';
import $t from 'mage/translate';

const m2cButtonConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccButtonConfigurator,
    ],
    template: `<form class="m2c-button-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-label" class="m2-input__label">${$t( 'Label' )}:</label>
            <input type="text" v-model="configuration.label" id="cfg-label" class="m2-input__input" @change="onChange">
        </div>
        <div class="m2-input m2-input--type-addon m2-input--type-inline | m2c-button-configurator__item-form-element">
            <label for="cfg-target" class="m2-input__label">${$t( 'Target' )}:</label>
            <div class="m2-input__addon-wrapper">
                <input type="text" class="m2-input__input | m2c-button-configurator__target" v-model="configuration.target" id="cfg-target">
                <span class="m2-input__addon | m2c-button-configurator__widget-chooser-trigger" @click="openCtaTargetModal()">
                    <svg class="m2-input__addon-icon">
                        <use xlink:href="#icon_link"></use>
                    </svg>
                </span>
            </div>
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
                    label: '',
                    target: '',
                };
            },
        },
        /* Get assets for displaying component images */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            this.onSave();
        },
    },
    methods: {
        /* Opens modal with M2 built-in widget chooser
         */
        openCtaTargetModal(): void {
            widgetTools.openDialog( `${window.location.origin}/admin/admin/widget/index/widget_target_id/cfg-target` );

            this.wWidgetListener();
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of target input is changed
         */
        widgetSetListener(): void {
            const component: any = this;

            $( '.m2c-button-configurator__cta-target-link' ).on( 'change', (): void => {
                component.onChange();
            } );
        },
        /*
         * Check if widget chooser is loaded. If not, wait for it
         */
        wWidgetListener(): void {
            if ( typeof wWidget !== 'undefined' && widgetTools.dialogWindow[ 0 ].innerHTML !== '' ) {
                this.disableNotLinksOptions();
                this.setWidgetEvents();
            } else {
                setTimeout( this.wWidgetListener, 300 );
            }
        },
        /*
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         */
        setWidgetEvents(): void {
            const _this: any = this;
            const button: any = widgetTools.dialogWindow[ 0 ].querySelector( '#insert_button' );

            button.onclick = null;
            button.addEventListener( 'click', function(): void {
                _this.configuration.hero_url = '';
                wWidget.insertWidget();
            } );
        },
        /*
         * Hide all options in widget chooser that are not links
         */
        disableNotLinksOptions(): void {
            if ( wWidget.widgetEl && wWidget.widgetEl.options ) {
                $( wWidget.widgetEl.options ).each( function( i: boolean, el: any ): void {
                    if ( el.value.split( '\\' ).pop() !== 'Link' && i !== 0 ) {
                        $( el ).hide();
                    }
                } );
            }
        },
    },
    ready(): void {
        this.widgetSetListener();
    },
};

export default m2cButtonConfigurator;
