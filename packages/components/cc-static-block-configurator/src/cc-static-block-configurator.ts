import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

/**
 * Static block configurator component.
 * This component is responsible for displaying static block's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccStaticBlockConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-static-block-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-static-block" class="cs-input__label">Static block:</label>
            <select name="select" class="cs-input__select" id="cfg-static-block" v-model="configuration.identifier" @change="onChange">
                <option value="1" selected>Foo</option>
                <option value="2">Bar</option>
            </select>
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-resetstyles" class="cs-input__label">Reset default styles of CMS Static Block:</label>
            <input type="checkbox" v-model="configuration.resetstyles" id="cfg-resetstyles" class="cs-input__input" @change="onChange">
        </div>
        <button type="submit">Save</button>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    identifier: '',
                    title: '',
                    resetstyles: false,
                };
            },
        },
    },
};

export default ccStaticBlockConfigurator;
