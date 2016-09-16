(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jQuery'), require('Swiper')) :
    typeof define === 'function' && define.amd ? define('csCarousel', ['jQuery', 'Swiper'], factory) :
    (factory(global.jQuery,global.Swiper));
}(this, (function ($,Swiper) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
Swiper = 'default' in Swiper ? Swiper['default'] : Swiper;

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var SwiperCarousel = (function () {
    function SwiperCarousel(settings) {
        // To be extended, will overwrite defaults
        this.swiperSettings = {};
        this.swiperInstance = null;
        // Default settings for swiper
        this.defaultSwiperSettings = {
            slideClass: "cs-carousel__slide",
            slideActiveClass: "cs-carousel__slide--active",
            slideVisibleClass: "cs-carousel__slide--visible",
            slideDuplicateClass: "cs-carousel__slide--clone",
            slideNextClass: "cs-carousel__slide--next",
            slidePrevClass: "cs-carousel__slide--prev",
            wrapperClass: "cs-carousel__wrapper",
            bulletClass: "cs-carousel__pagination-item",
            bulletActiveClass: "cs-carousel__pagination-item--is-active",
            pagination: '.cs-carousel__pagination',
            paginationType: 'bullets',
            paginationElement: 'li',
            paginationClickable: true,
            nextButton: '.cs-carousel__button--next',
            prevButton: '.cs-carousel__button--prev',
            spaceBetween: 20,
            slideMinWidth: 150,
            watchSlidesVisibility: true,
            loop: true,
            loopedSlides: 2,
            loopAdditionalSlides: 2,
            autoplayDisableOnInteraction: false,
            a11y: true,
            slidesPerView: 'auto',
            centeredSlides: true,
        };
        this.settings = settings;
    }
    SwiperCarousel.prototype.getSwiper = function () {
        return this.swiperInstance;
    };
    SwiperCarousel.prototype.init = function () {
        this._createSwiperSettings();
        this.swiperInstance = new Swiper(this.settings.containerSelector, this._createSwiperSettings());
    };
    SwiperCarousel.prototype.next = function () {
        this.swiperInstance.slideNext();
    };
    SwiperCarousel.prototype.prev = function () {
        this.swiperInstance.slidePrev();
    };
    SwiperCarousel.prototype.update = function () {
        this.swiperInstance.update();
    };
    SwiperCarousel.prototype._createSwiperSettings = function () {
        // Create deep copy
        return $.extend(true, this.defaultSwiperSettings, this.swiperSettings);
    };
    return SwiperCarousel;
}());

// Demo extend of abstract SwiperCarousel class and init
var DemoCarousel = (function (_super) {
    __extends(DemoCarousel, _super);
    function DemoCarousel(settings) {
        _super.call(this, settings);
        this.swiperSettings = {
            keyboardControl: true,
        };
    }
    return DemoCarousel;
}(SwiperCarousel));
var carousel = new DemoCarousel({
    containerSelector: '.cs-carousel__container',
});
carousel.init();

})));
//# sourceMappingURL=cs-carousel.js.map
