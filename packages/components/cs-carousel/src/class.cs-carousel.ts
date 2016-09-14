import $ from 'jQuery';
import Swiper from 'Swiper';

interface ISwiperCarousel {
    init(): void;
    next(): void;
    prev(): void;
}

interface ISwiperCarouselSettings {
    containerSelector: string;
}

abstract class SwiperCarousel implements ISwiperCarousel {
    // To be extended, will overwrite defaults
    protected swiperSettings: Object = {};

    protected swiperInstance: Swiper = null;

    // Default settings for swiper
    private defaultSwiperSettings: Object = {
        slideClass: `cs-carousel__slide`,
        slideActiveClass: `cs-carousel__slide--active`,
        slideVisibleClass: `cs-carousel__slide--visible`,
        slideDuplicateClass: `cs-carousel__slide--clone`,
        slideNextClass: `cs-carousel__slide--next`,
        slidePrevClass: `cs-carousel__slide--prev`,

        wrapperClass: `cs-carousel__wrapper`,

        bulletClass: `cs-carousel__pagination-item`,
        bulletActiveClass: `cs-carousel__pagination-item--is-active`,

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

    // Extra class settings
    private settings: ISwiperCarouselSettings;

    constructor(settings: ISwiperCarouselSettings) {
        this.settings = settings;
    }

    public getSwiper(): Object {
        return this.swiperInstance;
    }

    public init(): void {
        this._createSwiperSettings();

        this.swiperInstance = new Swiper(this.settings.containerSelector, this._createSwiperSettings());
    }

    public next(): void {
        this.swiperInstance.slideNext();
    }

    public prev(): void {
        this.swiperInstance.slidePrev();
    }

    public update(): void {
        this.swiperInstance.update();
    }

    private _createSwiperSettings(): {} {
        // Create deep copy
        return $.extend(true, this.defaultSwiperSettings, this.swiperSettings);
    }

}

export {ISwiperCarousel, ISwiperCarouselSettings, SwiperCarousel};
