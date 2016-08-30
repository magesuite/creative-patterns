import csInputs from '../../cs-inputs/src/cs-inputs';

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
 * Headline configurator component.
 * This component is responsible for displaying headlines configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccHeadlineConfigurator: vuejs.ComponentOption = {
    template: `<form class="cc-headline-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-headline" class="cs-input__label">Headline:</label>
            <input type="text" v-model="headline.title" id="cfg-headline" class="cs-input__input">
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-subheadline" class="cs-input__label">Subheadline:</label>
            <input type="text" v-model="headline.subtitle" id="cfg-subheadline" class="cs-input__input">
        </div>
        <button type="submit">Save</button>
    </form>`,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: ''
        },
        /**
         * Property containing callback triggered when user saves component.
         */
        save: {
            type: Function
        }
    },
    data: function() {
        return {
            headline: {
                title: '',
                subtitle: ''
            }
        }
    },
    methods: {
        onSave: function( event: Event ): void {
            this.$dispatch( 'cc-headline-configurator__save', this._data );

            if ( typeof this.save === 'function' ) {
                this.save( this._data );
            }
        }
    }
};

export default ccHeadlineConfigurator;