
/**
 * Single component information object.
 */
interface IComponentInformation {
    type: string;
    /**
     * Component ID
     * @type {string}
     */
    id: string;
    /**
     * component data values from inputs
     * @type {string}
     */
    data: Object;
}

/**
 * Components information object that should be returned by AJAX call to API.
 */
interface IComponentsInformation {
    components: IComponentInformation[];
}

/**
 * Static block configurator component.
 * This component is responsible for displaying static block's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccStaticBlockConfigurator: vuejs.ComponentOption = {
    template: `<form class="cc-static-block-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-static-block" class="cs-input__label">Static block:</label>
            <select name="select" class="cs-input__select" id="cfg-static-block" v-model="configuration.staticBlock" @change="onChange">
                <option value="1" selected>Foo</option>
                <option value="2">Bar</option>
            </select>
        </div>
        <button type="submit">Save</button>
    </form>`,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
        /**
         * Property containing callback triggered when user saves component.
         */
        save: {
            type: Function,
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function,
        },
        configuration: {
            type: Object,
            default: {
                staticBlock: '',
            },
        },
    },
    methods: {
        onChange( event: Event ): void {
            const data: any = JSON.parse( JSON.stringify( this.configuration ) );

            this.$dispatch( 'cc-static-block-configurator__change', data );

            if ( typeof this.change === 'function' ) {
                this.change( data );
            }
        },
        onSave( event: Event ): void {
            const data: any = JSON.parse( JSON.stringify( this.configuration ) );

            this.$dispatch( 'cc-static-block-configurator__save', data );

            if ( typeof this.save === 'function' ) {
                this.save( data );
            }
        },
    },
};

export default ccStaticBlockConfigurator;
