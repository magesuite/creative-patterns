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
let hero = function( $element, settings ) {
    /**
     * Required variables initialization.
     */
    settings = settings || {};
    let hero = this;
    const heroName = 'm2c-hero';
    const jsHeroName = 'js-hero';
    const heroClass = `.${heroName}`;
    const $heroWrapper = $element.find( `.${heroName}__wrapper` );
    /**
     * Holds current Swiper instance.
     */
    let swiperInstance;

    /**
     * Attaches component to HTML element.
     */
    $element.data( jsHeroName, this );

    /**
     * Contains current settings of slider.
     */
    let currentSettings;
    /**
     * Default settings for Swiper.
     * @type {Object}
     */
    const defaultSettings = {
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
        paginationBulletRender( index, className ) {
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
        mouseover() {
            swiperInstance.stopAutoplay();
        },
        mouseout() {
            swiperInstance.startAutoplay();
        },
    } );

    /**
     * Returns Swiper object.
     * @return {Swiper} Swiper object.
     */
    hero.getSwiper = function() {
        return swiperInstance;
    };

    /**
     * Updates teaser with new settings.
     * @param  {Object} settings New settings to apply.
     */
    hero.update = function( settings ) {
        settings = settings || {};
        currentSettings = $.extend( currentSettings, settings );
        swiperInstance.params = $.extend( swiperInstance.params, currentSettings );
    };

    /**
     * Destroyes teaser.
     */
    hero.destroy = function() {
        swiperInstance.destroy();
    };
};

export default hero;
