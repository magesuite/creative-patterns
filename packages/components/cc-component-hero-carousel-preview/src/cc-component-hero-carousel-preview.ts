/**
 * Single component information interface.
 */
interface IComponentInformation {
    items: [
        {
            image: string,
            headline: string,
            subheadline: string,
            paragraph: string,
            ctaLabel: string,
            ctaTarget: string,
            displayVariant: string
        },
        ];
};

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentHeroCarouselPreview: vuejs.ComponentOption = {
    template: `<div class="cc-component-hero-carousel-preview">
        <div class="cc-component-hero-carousel-preview__wrapper">
            <div class="cc-component-hero-carousel-preview__background">
                <img :src="configuration.items[0].image" class="cc-component-hero-carousel-preview__background-image">
            </div>
            <div class="cc-component-hero-carousel-preview__slides">
                <template v-for="item in configuration.items">
                     <img :src="configuration.items[$index].image" class="cc-component-hero-carousel-preview__slide">
                </template>
            </div>
        </div>
    </div>`,
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
    },
};

export default ccComponentHeroCarouselPreview;
