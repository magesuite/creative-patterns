import template from './cc-component-picker.tpl';

/**
 * Single component information object.
 */
interface IComponentInformation {
    type: string;
    /**
     * Cover image url.
     * @type {string}
     */
    cover: string;
    /**
     * Cover image alt attribute value.
     * @type {string}
     */
    coverAlt: string;
    name: string;
}

/**
 * Components information object that should be returned by AJAX call to API.
 */
interface IComponentsInformation {
    components: IComponentInformation[];
}

/**
 * Componen picker.
 * Lists all types of components available in m2c in the grid/list mode
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentPicker: vuejs.ComponentOption = {
    template: template,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: ( value: String ): String => value.replace( 'cc-component-picker', '' )
        },
        /**
         * Property containing callback triggered when user picks component.
         */
        pickComponent: {
            type: Function
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
    data: function(): any {
        return {
            availableComponents: []
        };
    },
    ready: function(): void {
        // If inline JSON is provided then parse it.
        if ( this.components ) {
            this.availableComponents = this.components;
        } else if ( this.componentsEndpoint ) {
            // Otherwise load from endpoint if URL provided.
            this.$http.get( this.componentsEndpoint ).then( function( response: vuejs.HttpResponse ): void {
                this.availableComponents = response.json();
            } );
        }
    },
    methods: {
        /**
         * Component pick click handler.
         * This handler triggers "cc-component-picker__pick" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onPickComponent: function ( componentType: String ): void {
            this.$dispatch( 'cc-component-picker__pick', componentType );

            if ( typeof this.pickComponent === 'function' ) {
                this.pickComponent( componentType );
            }
        }
    },
};

export default ccComponentPicker;
