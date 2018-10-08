import $t from 'mage/translate';
import ccHeadlineConfigurator from '../../../components/cc-headline-configurator/src/cc-headline-configurator';

/**
 * Single component information interface.
 */
interface IComponentSettings {
    title?: string;
    subtitle?: string;
    headingTag?: string;
}

const headlineDefaults: IComponentSettings = {
    title: '',
    subtitle: '',
    headingTag: 'h2',
};

const m2cHeadlineConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccHeadlineConfigurator,
    ],
    template: `<div class="m2c-headline-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-headline" class="m2-input__label">${ $t('Headline') }:</label>
            <input type="text" v-model="configuration.title" id="cfg-headline" class="m2-input__input" @change="onChange">
        </div>
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-subheadline" class="m2-input__label">${ $t('Subheadline') }:</label>
            <input type="text" v-model="configuration.subtitle" id="cfg-subheadline" class="m2-input__input" @change="onChange">
        </div>

        <div class="m2c-headline-configurator__advanced-trigger">
            <span :class="isAvdancedSettingsOpen ? 'active' : ''" role="button" @click="toggleAdvancedContent()">${ $t('Advanced settings') }</span>
        </div>

        <div class="m2c-headline-configurator__advanced-content" v-show="isAvdancedSettingsOpen">
            <div class="m2-input m2-input--type-inline">
                <label for="cfg-heading-tag" class="m2-input__label">${ $t('Level of Heading tag') }:</label>
                <select name="cfg-heading-tag" class="m2-input__select" id="cfg-heading-tag" v-model="configuration.headingTag" @change="onChange">
                    <option v-for="n in 6" value="h{{ n+1 }}" :selected="n+1 === configuration.headingTag">Heading {{ n+1 }} (h{{ n+1 }})</option>
                </select>
            </div>
        </div>
    </div>`,
    props: {
        configuration: {
            type: Object,
            default(): any {
                return headlineDefaults;
            },
        },
    },
    data(): Object {
        return {
            isAvdancedSettingsOpen: false,
        }
    },
    methods:{
        toggleAdvancedContent(): void {
            this.isAvdancedSettingsOpen = !this.isAvdancedSettingsOpen;
        },
    },
    ready(): void {
        if (!this.configuration.headingTag) {
            this.configuration.headingTag = headlineDefaults.headingTag;
        }
    },
};

export default m2cHeadlineConfigurator;
