import $ from 'jquery';

/**
 * Single component information interface.
 */
interface IComponentInformation {
    category_id: string;
    order_by: string;
    rows_desktop: number;
    rows_tablet: number;
    rows_mobile: number;
    hero: string;
    hero_image: string;
    hero_headline: string;
    hero_subheadline: string;
    hero_paragraph: string;
    hero_url: string;
    hero_button_label: string;
    decoded_image: string;
    size_info: string;
};

/**
 * Product carousel preview component.
 * This component is responsible for displaying preview of product carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentProductGridPreview: vuejs.ComponentOption = {
    template: `<div data-role="spinner" class="cc-component-placeholder__loading" v-show="isLoading">
        <div class="spinner">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
    </div>
    <div class="cc-component-product-grid-preview" v-show="!isLoading" v-el:scene>
        <div class="cc-component-product-grid-preview__hero" v-if="configuration.hero_position == 'left' && configuration.hero_image">
            <img :src="configuration.hero_image" class="cc-component-product-grid-preview__hero-image">
            <div class="cc-component-product-grid-preview__hero-content">
                <h2 class="cc-component-product-grid-preview__headline" v-if="configuration.hero_headline">{{ configuration.hero_headline }}</h2>
                <h3 class="cc-component-product-grid-preview__subheadline" v-if="configuration.hero_subheadline">{{ configuration.hero_subheadline }}</h3>
                <p class="cc-component-product-grid-preview__paragraph" v-if="configuration.hero_paragraph">{{ configuration.hero_paragraph }}</p>
                <template v-if="configuration.hero_url">
                    <button type="button" class="cc-component-product-grid-preview__button" v-if="configuration.button_label">{{ configuration.button_label }}</button>
                </template>
            </div>
        </div>

        <ul v-bind:class="itemsGridClass">
            <template v-for="item in getItemsCount()">
                <li class="cc-component-product-grid-preview__list-item">
                    <div class="cc-component-product-grid-preview__product-wrapper">
                        <svg class="cc-component-product-grid-preview__product">
                            <use xlink:href="#icon_component-cc-product-teaser-item"></use>
                        </svg>
                    </div>
                </li>
            </template>
        </ul>

        <div class="cc-component-product-grid-preview__hero" v-if="configuration.hero_position == 'right' && configuration.hero_image">
            <img :src="configuration.hero_image" class="cc-component-product-grid-preview__hero-image">
            <div class="cc-component-product-grid-preview__hero-content">
                <h2 class="cc-component-product-grid-preview__headline" v-if="configuration.hero_headline">{{ configuration.hero_headline }}</h2>
                <h3 class="cc-component-product-grid-preview__subheadline" v-if="configuration.hero_subheadline">{{ configuration.hero_subheadline }}</h3>
                <template v-if="configuration.hero_url">
                    <button type="button" class="cc-component-product-grid-preview__button" v-if="configuration.button_label">{{ configuration.button_label }}</button>
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
        isLoading: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        itemsGridClass(): string {
            if ( this.configuration.hero_position ) {
                return `cc-component-product-grid-preview__list cc-component-product-grid-preview__list--${ this.configuration.hero_position }`;
            }

            return 'cc-component-product-grid-preview__list';
        },
    },
    ready(): void {
        this.setImagesLoadListener();
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

            if ( imagesCount ) {
                $images.load( function(): void {
                    imagesCount--;
                    if ( !imagesCount ) {
                        _this.isLoading = false;
                    }
                } ).filter( function(): boolean { return this.complete; } ).load();
            } else {
                _this.isLoading = false;
            }
        },

        getItemsCount(): number {
            return this.configuration.hero_position ? 6 : 10;
        }
    },
};

export default ccComponentProductGridPreview;
