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
        <div class="cc-component-hero-carousel-preview__wrapper">
            <div class="cc-component-hero-carousel-preview__scene" v-el:scene>
                <template v-for="item in configuration.items">
                    <div class="cc-component-hero-carousel-preview__slide">
                        <img :src="configuration.items[$index].image" class="cc-component-hero-carousel-preview__image">
                        <div class="cc-component-hero-carousel-preview__slide-content">
                            <h2 class="cc-component-hero-carousel-preview__headline" v-if="configuration.items[$index].headline">{{ configuration.items[$index].headline }}</h2>
                            <h3 class="cc-component-hero-carousel-preview__subheadline" v-if="configuration.items[$index].subheadline">{{ configuration.items[$index].subheadline }}</h3>
                            <p class="cc-component-hero-carousel-preview__paragraph" v-if="configuration.items[$index].paragraph">{{ configuration.items[$index].paragraph }}</p>
                            <template v-if="configuration.items[$index].href">
                                <button type="button" class="cc-component-hero-carousel-preview__button" v-if="configuration.items[$index].ctaLabel">{{ configuration.items[$index].ctaLabel }}</button>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
            <div class="cc-component-hero-carousel-preview__thumbs">
                <template v-for="item in configuration.items">
                    <img :src="configuration.items[$index].image" class="cc-component-hero-carousel-preview__thumb" width="100px">
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
    ready(): void {
        const _this: any = this;
        let resizeTimer: any = undefined;

        $( window ).on( 'resize', function(): void {
            clearTimeout( resizeTimer );
            resizeTimer = setTimeout( function(): void {
                _this.setSceneTranslate();
            }, 250 );
        } );

        this.setSceneTranslate();
        this.setImagesLoadListener();
    },
    methods: {
        /**
         * Sets negative transform: translateX() for scene to display images in center
         */
        setSceneTranslate(): void {
            $( this.$els.scene ).css( 'transform', `translateX( ${ -Math.abs( this._getCalculatedHalfSceneWidth() ) }px )` );
        },
        /**
         * Calculates half of whole scene width
         * 74% (slide width) of container's width * number of images devides by 2
         * then this value has to be reduced by half of container width
         */
        _getCalculatedHalfSceneWidth(): number {
            const containerWidth: number = $( this.$els.scene ).outerWidth( true );
            return Math.round ( ( ( ( ( 74 / 100 ) * containerWidth ) * this.configuration.items.length ) / 2 ) - ( containerWidth / 2 ) );
        },
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
