
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
 * Image teaser configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccImageTeaserConfigurator: vuejs.ComponentOption = {
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
                <div v-for="item in configuration.items" class="cc-image-teaser-configurator__teaser-unit">
                    <div class="cc-image-teaser-configurator__toolbar">
                        <span class="cc-image-teaser-configurator__teaser-unit-title">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>
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
            </div>
        </section>

        <section class="cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions">
            <button type="submit">Save</button>
        </section>
    </form>`,
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
        /**
         * Property containing callback triggered when user saves component.
         */
        save: {
            type: Function,
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function,
        },
        configuration: {
            type: Object,
            default(): Object {
                return {
                    teaserWidth: 'full-width',
                    itemsPerSlide: '5',
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
    methods: {
        onSave( event: Event ): void {
            const data: any = JSON.parse( JSON.stringify( this.configuration ) );

            this.$dispatch( 'cc-image-teaser-configurator__save', data );

            if ( typeof this.save === 'function' ) {
                this.save( data );
            }
        },
        updateConfig(): void {
            const data: any = JSON.parse( JSON.stringify( this.configuration ) );

            this.$dispatch( 'cc-image-teaser-configurator__change', data );

            if ( typeof this.change === 'function' ) {
                this.change( data );
            }
        },
        onChange( event: Event ): void {
            this.updateConfig();
        },
    },
};

export default ccImageTeaserConfigurator;
