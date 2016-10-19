/* tslint:disable:no-console */

import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

/**
 * Paragraph configurator component.
 * This component is responsible for displaying paragraph configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccParagraphConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-paragraph-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="textarea-cfg-paragraph" class="cs-input__label cs-input__label--look-top-align">Paragraph:</label>
            <textarea name="name" v-model="configuration.paragraph" id="textarea-cfg-paragraph" class="cs-input__textarea" placeholder="Your HTML here" @change="onChange"></textarea>
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
        configuration: {
            type: Object,
            default: {
                paragraph: '',
            },
        },
    },
};

export default ccParagraphConfigurator;
