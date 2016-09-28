import $ from 'jQuery';
import Swiper from 'Swiper';

/*
* Product teaser
*/
/**
 * Creates new product slider object on given element with provided settings.
 * @param  {jQuery} $element jQuery element that contains complete outline for teaser.
 * Provided element should contain ".m2c-hero__wrapper" element.
 * @param  {Object} settings Custom settings that will be passed along to Swiper.
 * @return {Object} New product slider object instance.
 */
let hero: any = function( $element: JQuery, settings: Object ): any {
    /**
     * Required variables initialization.
     */
    settings = settings || {};
    let component: any = this;
    const heroName: string = 'm2c-hero';
    const jsHeroName: string = 'js-hero';
    const heroClass: string = `.${heroName}`;
    /**
     * Holds current Swiper instance.
     */
    let swiperInstance: any;

    /**
     * Attaches component to HTML element.
     */
    $element.data( jsHeroName, this );

    /**
     * Contains current settings of slider.
     */
    let currentSettings: any;
    /**
     * Default settings for Swiper.
     * @type {Object}
     */
    const defaultSettings: any = {
        slideClass: `${heroName}__slide`,
        slideActiveClass: `${heroName}__slide--active`,
        slideVisibleClass: `${heroName}__slide--visible`,
        slideDuplicateClass: `${heroName}__slide--clone`,
        slideNextClass: `${heroName}__button--next`,
        slidePrevClass: `${heroName}__button--prev`,
        wrapperClass: `${heroName}__slider`,
        nextButton: $element.find( `${heroClass}__nav--next` )[ 0 ],
        prevButton: $element.find( `${heroClass}__nav--prev` )[ 0 ],
        paginationBreakpoint: 5,
        pagination: $element.find( `${heroClass}__pagination`),
        paginationElement: 'li',
        paginationBulletRender( index: number, className: string ): string {
            return `<li class="${heroName}__pagination-item"><button class="${heroName}__pagination-button">${index + 1}</button></li>`;
        },
        bulletClass: `${heroName}__pagination-item`,
        bulletActiveClass: `${heroName}__pagination-item--active`,
        paginationClickable: true,
        spaceBetween: 5,   // Gap between slides.
        slideMinWidth: 150,  // Minimum width of a slider.
        watchSlidesVisibility: true,
        loop: true,
        loopedSlides: 2,
        loopAdditionalSlides: 2,
        autoplayDisableOnInteraction: false,
        a11y: true,
    };
    currentSettings = $.extend( defaultSettings, settings );

    swiperInstance = new Swiper( $element.find( `.${heroName}__wrapper` ), currentSettings );

    /**
     * Stop/Start autoplay on mouseover/mouseout
     */
    $element.on( {
        mouseover(): void {
            swiperInstance.stopAutoplay();
        },
        mouseout(): void {
            swiperInstance.startAutoplay();
        },
    } );

    /**
     * Returns Swiper object.
     * @return {Swiper} Swiper object.
     */
    component.getSwiper = function(): any {
        return swiperInstance;
    };

    /**
     * Updates teaser with new settings.
     * @param  {Object} settings New settings to apply.
     */
    component.update = function( options?: Object ): void {
        options = options || {};
        currentSettings = $.extend( currentSettings, options );
        swiperInstance.params = $.extend( swiperInstance.params, currentSettings );
    };

    /**
     * Destroyes teaser.
     */
    component.destroy = function(): void {
        swiperInstance.destroy();
    };
};

export default hero;
