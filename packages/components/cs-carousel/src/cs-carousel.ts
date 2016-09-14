import {ISwiperCarousel, ISwiperCarouselSettings, SwiperCarousel} from './class.cs-carousel';

// Demo extend of abstract SwiperCarousel class and init

class DemoCarousel extends SwiperCarousel {

    protected swiperSettings: Object = {
        keyboardControl: true,
        // pagination: null,
    };

    constructor(settings: ISwiperCarouselSettings) {
        super(settings);
    }

}

let carousel: ISwiperCarousel = new DemoCarousel({
    containerSelector: '.cs-carousel__container',
});

carousel.init();
