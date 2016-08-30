import ccComponentPicker from '../../cc-component-picker/src/cc-component-picker';

import template from './m2c-component-picker.tpl';

/**
 * M2C component picker.
 * This is just an additional layer over generic component picker
 * that can have custom, Magento 2 specific logic.
 * @type {vuejs.ComponentOption} Vue component object.
 */
const m2cComponentPicker: vuejs.ComponentOption = {
    template: template,
    components: {
        'cc-component-picker': ccComponentPicker
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: ( value: String ): String => value.replace( 'm2c-component-picker', '' )
        },
        /**
         * JSON stringified array containing available components.
         */
        components: {
            type: String,
            default: ''
        },
        /**
         * URL for API returning JSON stringified array containing available components.
         */
        componentsEndpoint: {
            type: String,
            default: ''
        }
    },
    methods: {
        /**
         * Component pick Magento 2 custom click handler.
         * @param {Event} event Click event obj ect.
         */
        onPickComponent: function ( componentType: String ): void {
            console.log( componentType );
        }
    },
};

export default m2cComponentPicker;
