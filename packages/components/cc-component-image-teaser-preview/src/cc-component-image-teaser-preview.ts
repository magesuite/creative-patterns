/**
 * Single component information interface.
 */
interface IComponentInformation {
    teaserWidth: string;
    items: [
        {
            image: string,
            headline: string,
            paragraph: string,
            ctaLabel: string,
            ctaTarget: string,
        },
    ];
};

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentImageTeaserPreview: vuejs.ComponentOption = {
    template: `<div class="cc-component-image-teaser-preview">
        <div class="cc-component-image-teaser-preview__items">
            <template v-for="item in configuration.items">
                <div class="cc-component-image-teaser-preview__item-wrapper-outer" id="cc-image-teaser-item-{{ $index }}" v-show="configuration.items[$index].image">
                    <div class="cc-component-image-teaser-preview__item-wrapper-inner">
                        <div class="cc-component-image-teaser-preview__item">
                            <img :src="configuration.items[$index].image" class="cc-component-image-teaser-preview__item-image">
                            <h3 class="cc-component-image-teaser-preview__item-index">Banner {{ $index+1 }}/{{ configuration.items.length }}</h3>
                        </div>
                    </div>
                </div>
            </template>
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

export default ccComponentImageTeaserPreview;
