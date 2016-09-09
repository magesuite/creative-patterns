(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jQuery'), require('Swiper')) :
    typeof define === 'function' && define.amd ? define('hero', ['jQuery', 'Swiper'], factory) :
    (global.hero = factory(global.jQuery,global.Swiper));
}(this, (function ($,Swiper) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
Swiper = 'default' in Swiper ? Swiper['default'] : Swiper;

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
var hero = function ($element, settings) {
    /**
     * Required variables initialization.
     */
    settings = settings || {};
    var hero = this;
    var heroName = 'm2c-hero';
    var jsHeroName = 'js-hero';
    var heroClass = "." + heroName;
    var $heroWrapper = $element.find("." + heroName + "__wrapper");
    /**
     * Holds current Swiper instance.
     */
    var swiperInstance;
    /**
     * Attaches component to HTML element.
     */
    $element.data(jsHeroName, this);
    /**
     * Contains current settings of slider.
     */
    var currentSettings;
    /**
     * Default settings for Swiper.
     * @type {Object}
     */
    var defaultSettings = {
        slideClass: heroName + "__slide",
        slideActiveClass: heroName + "__slide--active",
        slideVisibleClass: heroName + "__slide--visible",
        slideDuplicateClass: heroName + "__slide--clone",
        slideNextClass: heroName + "__button--next",
        slidePrevClass: heroName + "__button--prev",
        wrapperClass: heroName + "__slider",
        nextButton: $element.find(heroClass + "__nav--next")[0],
        prevButton: $element.find(heroClass + "__nav--prev")[0],
        paginationBreakpoint: 5,
        pagination: $element.find(heroClass + "__pagination"),
        paginationElement: 'li',
        paginationBulletRender: function (index, className) {
            return "<li class=\"" + heroName + "__pagination-item\"><button class=\"" + heroName + "__pagination-button\">" + (index + 1) + "</button></li>";
        },
        bulletClass: heroName + "__pagination-item",
        bulletActiveClass: heroName + "__pagination-item--active",
        paginationClickable: true,
        spaceBetween: 5,
        slideMinWidth: 150,
        watchSlidesVisibility: true,
        loop: true,
        loopedSlides: 2,
        loopAdditionalSlides: 2,
        autoplayDisableOnInteraction: false,
        a11y: true
    };
    currentSettings = $.extend(defaultSettings, settings);
    swiperInstance = new Swiper($element.find("." + heroName + "__wrapper"), currentSettings);
    /**
     * Stop/Start autoplay on mouseover/mouseout
     */
    $element.on({
        mouseover: function () {
            swiperInstance.stopAutoplay();
        },
        mouseout: function () {
            swiperInstance.startAutoplay();
        }
    });
    /**
     * Returns Swiper object.
     * @return {Swiper} Swiper object.
     */
    hero.getSwiper = function () {
        return swiperInstance;
    };
    /**
     * Updates teaser with new settings.
     * @param  {Object} settings New settings to apply.
     */
    hero.update = function (settings) {
        settings = settings || {};
        currentSettings = $.extend(currentSettings, settings);
        swiperInstance.params = $.extend(swiperInstance.params, currentSettings);
    };
    /**
     * Destroyes teaser.
     */
    hero.destroy = function () {
        swiperInstance.destroy();
    };
};

return hero;

})));
//# sourceMappingURL=hero.js.map
