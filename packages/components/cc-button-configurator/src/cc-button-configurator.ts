import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

/**
 * button configurator component.
 * This component is responsible for displaying buttons configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccButtonConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-button-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-label" class="cs-input__label">Label:</label>
            <input type="text" v-model="configuration.label" id="cfg-label" class="cs-input__input" @change="onChange">
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-target" class="cs-input__label">Target:</label>
            <input type="text" v-model="configuration.target" id="cfg-target" class="cs-input__input" @change="onChange">
        </div>
        <button type="submit">Save</button>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default: {
                label: '',
                target: '',
            },
        },
    },
};

export default ccButtonConfigurator;
