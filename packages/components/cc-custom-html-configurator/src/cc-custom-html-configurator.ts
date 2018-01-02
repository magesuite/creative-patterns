import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

/**
 * CustomHtml configurator component.
 * This component is responsible for displaying CustomHtmls configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccCustomHtmlConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-custom-html-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <p>Custom html component should be used only by developers because custom markup can break page layout and logic.</p>
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-title" class="cs-input__label">Title:</label>
            <input type="text" v-model="configuration.title" id="cfg-title" class="cs-input__input" @change="onChange" />
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-markup" class="cs-input__label">Custom html markup:</label>
            <textarea v-model="configuration.markup" id="cfg-markup" class="cs-input__textarea" @change="onChange"></textarea>
        </div>
        <button type="submit">Save</button>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default(): any {
                return {
                    title: '',
                    markup: '',
                };
            },
        },
    },
};

export default ccCustomHtmlConfigurator;
