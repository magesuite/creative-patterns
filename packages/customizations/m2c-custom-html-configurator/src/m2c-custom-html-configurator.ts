import ccCustomHtmlConfigurator from '../../../components/cc-custom-html-configurator/src/cc-custom-html-configurator';

const m2cCustomHtmlConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccCustomHtmlConfigurator,
    ],
    template: `<form class="cc-custom-html-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <p class="m2-warning">Custom html component should be used only by developers because custom markup can break page layout and logic.</p>
        </div>
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-title" class="m2-input__label">Title:</label>
            <input type="text" v-model="configuration.title" id="cfg-title" class="m2-input__input" @change="onChange" />
        </div>
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-markup" class="m2-input__label">Custom html markup:</label>
            <textarea v-model="configuration.markup" id="cfg-markup" class="m2-input__textarea" @change="onChange"></textarea>
        </div>
    </form>`,
};

export default m2cCustomHtmlConfigurator;
