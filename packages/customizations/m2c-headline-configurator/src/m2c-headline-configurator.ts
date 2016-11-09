import ccHeadlineConfigurator from '../../../components/cc-headline-configurator/src/cc-headline-configurator';

const m2cHeadlineConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccHeadlineConfigurator,
    ],
    template: `<form class="m2c-headline-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-headline" class="m2-input__label">Headline:</label>
            <input type="text" v-model="configuration.title" id="cfg-headline" class="m2-input__input" @change="onChange">
        </div>
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-subheadline" class="m2-input__label">Subheadline:</label>
            <input type="text" v-model="configuration.subtitle" id="cfg-subheadline" class="m2-input__input" @change="onChange">
        </div>
    </form>`,
};

export default m2cHeadlineConfigurator;
