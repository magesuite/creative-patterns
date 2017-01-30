import $ from 'jquery';

import csTeaser from '../../teaser/src/teaser';

/**
 * component options interface.
 * Please refer to swiper documentation and our teaser component for more options and callbacks
 */
interface BrandCarouselOptions {
    /**
     * HTML Class of the component
     * @type {string}
     * @default 'cs-brand-carousel'
     */
    teaserName?: string;

    /**
     * Slides per viewport
     * @type {string / number}
     * @default 'auto'
     */
    slidesPerView?: any;

    /**
     * Space between slides (in px)
     * @type {number}
     * @default 30
     */
    spaceBetween?: number;

    /**
     * Maximum width of single slide (in px)
     * @type {number}
     * @default 220
     */
    slideMinWidth?: number;
}

export default class BrandCarousel {
    protected _$element: JQuery;

    /**
     * Creates new ProductsPromo component with optional settings.
     * @param {$element} Optional, element to be initialized as ProductsPromo component
     * @param {options}  Optional settings object.
     */
    public constructor( $element?: JQuery, options?: BrandsCarouselOptions ) {
        this._options = $.extend( {
            teaserName: 'cs-brand-carousel',
            slidesPerView: 'auto',
            spaceBetween: 30,
            slideMinWidth: 220,
            roundLengths: true,
            calculateSlides: false,
            loop: true,
            centeredSlides: true,
        }, options );

        this._$element = $element || $( `.${this._options.teaserName}` );

        this._init();
    }

    public getInstance(): any {
        return this._instance;
    }

    /**
     * Initializes all $element's with previously defined options
     */
    protected _init(): void {
        if ( this._$element.length && this._$element.find( `.${this._options.teaserName}__slide` ).length > 1 ) {
            this._instance = new csTeaser( this._$element, this._options );
        }
    }
}
