import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

/**
 * Headline configurator component.
 * This component is responsible for displaying headlines configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccHeadlineConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-headline-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-headline" class="cs-input__label">Headline:</label>
            <input type="text" v-model="configuration.title" id="cfg-headline" class="cs-input__input" @change="onChange">
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-subheadline" class="cs-input__label">Subheadline:</label>
            <input type="text" v-model="configuration.subtitle" id="cfg-subheadline" class="cs-input__input" @change="onChange">
        </div>
        <button type="submit">Save</button>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default(): any {
                return {
                    title: '',
                    subtitle: '',
                };
            },
        },
    },
};

export default ccHeadlineConfigurator;
