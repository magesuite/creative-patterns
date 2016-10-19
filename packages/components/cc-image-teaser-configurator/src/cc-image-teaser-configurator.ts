import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';
/**
 * Image teaser configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccImageTeaserConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-image-teaser-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <section class="cc-image-teaser-configurator__section">
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-it-width" class="cs-input__label">Teaser width:</label>
                <select name="cfg-it-width-select" class="cs-input__select" id="cfg-it-width" v-model="configuration.teaserWidth" @change="onChange">
                    <option value="full-width" selected>Full browser width</option>
                    <option value="limited-width">Breaking point width (1280px)</option>
                </select>
            </div>
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-it-images-per-slide" class="cs-input__label">Images per slide:</label>
                <select name="cfg-it-images-per-slide" class="cs-input__select" id="cfg-it-images-per-slide" v-model="configuration.itemsPerSlide" @change="onChange">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
        </section>

        <section class="cc-image-teaser-configurator__section">
            <div class="cc-image-teaser-configurator__teaser">
                <template v-for="item in configuration.items">
                    <div class="cc-image-teaser-configurator__teaser-item" id="cc-image-teaser-item-{{ $index }}">
                        <div class="cc-image-teaser-configurator__toolbar">
                            <span class="cc-image-teaser-configurator__teaser-item-title">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>
                            <a href="#" class="cc-image-teaser-configurator__upload-link href="#">Upload image</a>
                        </div>
                        <div class="cc-image-teaser-configurator__image-holder-outer">
                            <div class="cc-image-teaser-configurator__image-holder-inner">
                                <input type="hidden" value="" class="cc-image-teaser-configurator__image-url" v-model="configuration.items[$index].image" @change="onChange">
                            </div>
                        </div>
                        <div class="cs-input cs-input--type-required">
                            <label for="cfg-it-teaser{{ $index+1 }}-headline" class="cs-input__label">Headline:</label>
                            <input type="text" v-model="configuration.items[$index].headline" id="cfg-it-teaser{{ $index+1 }}-headline" class="cs-input__input" @change="onChange">
                        </div>
                        <div class="cs-input cs-input--type-required">
                            <label for="cfg-it-teaser{{ $index+1 }}-paragraph" class="cs-input__label">Paragraph:</label>
                            <textarea type="text" v-model="configuration.items[$index].paragraph" id="cfg-it-teaser{{ $index+1 }}-paragraph" class="cs-input__textarea cs-input__textarea--look-thin" @change="onChange" placeholder="(max 200 characters)" maxlength="200"></textarea>
                        </div>
                        <div class="cs-input">
                            <label for="cfg-it-teaser{{ $index+1 }}-cta-label" class="cs-input__label">CTA label:</label>
                            <input type="text" v-model="configuration.items[$index].ctaLabel" id="cfg-it-teaser{{ $index+1 }}-cta-label" class="cs-input__input" @change="onChange">
                        </div>
                        <div class="cs-input">
                            <label for="cfg-it-teaser{{ $index+1 }}-cta-target" class="cs-input__label">CTA target link:</label>
                            <input type="text" v-model="item.ctaTarget" id="cfg-it-teaser{{ $index+1 }}-cta-target" class="cs-input__input" @change="onChange">
                        </div>
                    </div>
                </template>
            </div>
        </section>

        <section class="cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions">
            <button type="submit">Save</button>
        </section>
    </form>`,
    props: {
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default(): Object {
                return {
                    teaserWidth: 'full-width',
                    items: [
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                    ],
                };
            },
        },
    },
};

export default ccImageTeaserConfigurator;
