import $ from 'jquery';
import $t from 'mage/translate';

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
    template: `<div data-role="spinner" class="cc-component-placeholder__loading" v-show="isLoading">
        <div class="spinner">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
    </div>
    <div class="cc-component-hero-carousel-preview">
        <div v-bind:class="sceneClass" v-el:scene>
            <div class="cc-component-hero-carousel-preview__slide" v-if="configuration.items.length > 1">
                <img :src="configuration.items[configuration.items.length - 1].image" class="cc-component-hero-carousel-preview__image">
            </div>

            <template v-for="(index, item) in configuration.items">
                <div class="cc-component-hero-carousel-preview__slide" v-if="index < 2">
                    <img :src="configuration.items[$index].image" class="cc-component-hero-carousel-preview__image">
                    <div class="cc-component-hero-carousel-preview__slide-content" v-if="index == 0 || configuration.items.length == 1">
                        <div class="cc-component-hero-carousel-preview__thumbs">
                            <template v-for="(idx, slide) in configuration.items">
                                <img :src="configuration.items[idx].image" class="cc-component-hero-carousel-preview__thumb">
                            </template>
                        </div>
                        <div class="cc-component-hero-carousel-preview__slide-content-info">
                            <h2 class="cc-component-hero-carousel-preview__headline" v-if="configuration.items[$index].headline">{{ configuration.items[$index].headline }}</h2>
                            <h3 class="cc-component-hero-carousel-preview__subheadline" v-if="configuration.items[$index].subheadline">{{ configuration.items[$index].subheadline }}</h3>
                            <p class="cc-component-hero-carousel-preview__paragraph" v-if="configuration.items[$index].paragraph">{{ configuration.items[$index].paragraph }}</p>
                            <template v-if="configuration.items[$index].href">
                                <button type="button" class="cc-component-hero-carousel-preview__button" v-if="configuration.items[$index].ctaLabel">{{ configuration.items[$index].ctaLabel }}</button>
                            </template>
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
        isLoading: {
            type: Boolean,
            default: true,
        }
    },
    ready(): void {
        this.setImagesLoadListener();
    },
    computed: {
        sceneClass(): string {
            if ( this.configuration.items.length > 1 ) {
                return 'cc-component-hero-carousel-preview__scene';
            }

            return 'cc-component-hero-carousel-preview__scene cc-component-hero-carousel-preview__scene--single';
        },
    },
    methods: {
        /**
         * Checks for status of images if they're loaded.
         * After they're all loaded spinner is hidden and content displayed.
         */
        setImagesLoadListener(): void {
            const _this: any = this;
            const $images = $( this.$els.scene ).find( 'img' );
            let imagesCount: number = $images.length;

            $images.load( function(): void {
                imagesCount--;
                if ( !imagesCount ) {
                    _this.isLoading = false;
                    $images.each( function(): void {
                        $( this ).addClass( 'cc-component-hero-carousel-preview__image--border' );
                    } );
                }
            } ).filter( function(): boolean { return this.complete; } ).load();
        },
    },
};

export default ccComponentHeroCarouselPreview;
