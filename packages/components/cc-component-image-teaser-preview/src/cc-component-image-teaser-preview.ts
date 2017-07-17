import $ from 'jquery';
/**
 * Single component information interface.
 */
interface IComponentInformation {
    teaserWidth: string;
    items: [
        {
            image: string,
            headline: string,
            subheadline: string,
            paragraph: string,
            ctaLabel: string,
            href: string,
        },
    ];
};

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentImageTeaserPreview: vuejs.ComponentOption = {
    template: `<div data-role="spinner" class="cc-component-placeholder__loading" v-show="isLoading">
        <div class="spinner">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
    </div>
    <div class="cc-component-image-teaser-preview" v-show="!isLoading">
        <div class="cc-component-image-teaser-preview__wrapper">
            <ul class="cc-component-image-teaser-preview__scene cc-component-image-teaser-preview__scene--{{ configuration.currentScenario.desktopLayout.id }}-in-row" v-el:scene>
                <template v-for="item in configuration.items">
                    <li class="cc-component-image-teaser-preview__item">
                        <img v-if="configuration.items[$index].image" :src="configuration.items[$index].image" class="cc-component-image-teaser-preview__item-image">
                        <div class="cc-component-image-teaser-preview__image-placeholder-wrapper" v-show="!configuration.items[$index].image">
                            <svg class="cc-component-image-teaser-preview__image-placeholder">
                                <use xlink:href="#icon_image-placeholder"></use>
                            </svg>
                        </div>
                        <div class="cc-component-image-teaser-preview__item-content">
                            <h2 class="cc-component-image-teaser-preview__headline" v-if="configuration.items[$index].headline">{{ configuration.items[$index].headline }}</h2>
                            <h3 class="cc-component-image-teaser-preview__subheadline" v-if="configuration.items[$index].subheadline">{{ configuration.items[$index].subheadline }}</h3>
                            <p class="cc-component-image-teaser-preview__paragraph" v-if="configuration.items[$index].paragraph">{{ configuration.items[$index].paragraph }}</p>
                            <template v-if="configuration.items[$index].href">
                                <button type="button" class="cc-component-image-teaser-preview__button" v-if="configuration.items[$index].ctaLabel">{{ configuration.items[$index].ctaLabel }}</button>
                            </template>
                        </div>
                    </li>
                </template>
            </ul>
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
        this.hideEmptySlideContents();
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
                        $images.each( function(): void {
                            $( this ).addClass( 'cc-component-image-teaser-preview__item-image--border' );
                        } );
                    }
                } ).filter( function(): boolean { return this.complete; } ).load();
            } else {
                _this.isLoading = false;
            }
        },
        hideEmptySlideContents(): any {
            $( this.$els.scene ).find( '.cc-component-image-teaser-preview__item-content' ).each( function(): void {
                if ( !$( this ).children().length ) {
                    $( this ).hide();
                }
            } );
        },
    }
};

export default ccComponentImageTeaserPreview;
