import $ from 'jQuery';
import Swiper from 'Swiper';

/*
* Product teaser
*/
/**
 * Creates new teaser object on given element with provided settings.
 * @param  {jQuery} $element jQuery element that contains complete outline for teaser.
 * Provided element should contain ".{teaserName}__wrapper" element.
 * @param  {Object} settings Custom settings that will be passed along to Swiper.
 * @return {Object} New teaser object instance.
 */
const csTeaser: any = function( $element: any, settings: any ): void {
    /**
     * Required variables initialization.
     */
    settings = settings || {};
    const teaser: any = this;
    const teaserName: string = settings.teaserName ? settings.teaserName : 'cs-teaser';
    const teaserClass: string = `.${teaserName}`;
    const $teaserWrapper: any = $element.find( `${teaserClass}__wrapper` );
    const paginationName: string = settings.paginationName ? settings.paginationName : `${teaserName}__pagination`;
    const $pagination: any = $element.find( `.${paginationName}` );
    const $teaserNumbers: any = $element.find( `${teaserClass}__numbers` );
    const $teaserNumbersCurrent: any = $teaserNumbers.children( `${teaserClass}__number--current` );
    const $teaserNumbersTotal: any = $teaserNumbers.children( `${teaserClass}__number--total` );
    /**
     * Holds current Swiper instance.
     */
    let swiperInstance: any;

    /**
     * Attaches component to HTML element.
     */
    $element.data( teaserName, this );

    /**
     * Tells if teaser should have dynamic or fixed number of visible slides.
     * By default teaser will adjust number of visible slides according to it's
     * parrent width. You can change this behaviour by specyfying custom settings.slidesPerView
     * value, e.g. when settings.slidesPerView = 1 teaser will always show only one slide.
     * @type {Boolean}
     */
    let dynamicNumOfSlides: any = !settings.slidesPerView || settings.slidesPerView === 'auto';

    /**
     * Contains current settings of slider.
     */
    let currentSettings: any;
    /**
     * Default settings for Swiper.
     * @type {Object}
     */
    const defaultSettings: any = {
        slideClass: `${teaserName}__slide`,
        slideActiveClass: `${teaserName}__slide--active`,
        slideVisibleClass: `${teaserName}__slide--visible`,
        slideDuplicateClass: `${teaserName}__slide--clone`,
        slideNextClass: `${teaserName}__button--next`,
        slidePrevClass: `${teaserName}__button--prev`,
        wrapperClass: `${teaserName}__slides`,
        nextButton: $element.find( `${teaserClass}__nav--next` )[ 0 ],
        prevButton: $element.find( `${teaserClass}__nav--prev` )[ 0 ],
        buttonDisabledClass: `${teaserName}__nav--disabled`,
        /**
         * Maximum number of groups that will be still visible as dots.
         * If you want pagination to always be dots you can either don't add
         * .${teaserName}__numbers element in HTML or set this to something big.
         * @type {number}
         */
        paginationBreakpoint: 5,
        bulletClass: `${paginationName}-item`,
        bulletActiveClass: `${paginationName}-item--active`,
        paginationClickable: true,
        spaceBetween: 20,   // Gap between slides.
        slideMinWidth: 200,  // Minimum width of a slider.
        watchSlidesVisibility: true,
    };
    currentSettings = $.extend( defaultSettings, settings );

    /**
     * Calculates number of slides that should be visible according to teaser's wrapper width.
     * @return {number} Number of slides.
     */
    const calculateSlidesNumber: any = function(): number {
        return Math.floor( $teaserWrapper.innerWidth() / ( currentSettings.slideMinWidth + currentSettings.spaceBetween ) );
    };

    if ( dynamicNumOfSlides ) {
        currentSettings.slidesPerView =
            currentSettings.slidesPerGroup = calculateSlidesNumber();
    }

    /**
     * Renders dot(rhomb) pagination.
     * @param  {number} totalGroupNumber Total number of groups.
     */
    const renderDotPagination: any = function( totalGroupNumber: number ): void {
        $pagination.empty();
        for ( let groupIndex: number = 0; groupIndex < totalGroupNumber; groupIndex = groupIndex + 1 ) {
            let dotClass: string = '';
            if ( groupIndex === Math.ceil( swiperInstance.activeIndex / swiperInstance.params.slidesPerGroup ) ) {
                dotClass = swiperInstance.params.bulletActiveClass;
            }

            $pagination.append( `<li class="${swiperInstance.params.bulletClass} ${dotClass}">
                <button class="${paginationName}-button">${( groupIndex + 1 )}</button></li>`
            );
        }

        $teaserNumbers.removeClass( `${teaserName}__numbers--visible` );
        $pagination.removeClass( `${paginationName}--hidden` );
    };

    /**
     * Swipes on pagination click to appropriate slide.
     * @param  {Object} event Event Object
     */
    const clickDotPagination: any = function( event?: Event ): void {
        event.preventDefault();
        swiperInstance.slideTo( $( this ).index() * swiperInstance.params.slidesPerView );
    };

    /**
     * Renders number pagination.
     * @param  {number} totalGroupNumber Total number of groups.
     */
    const renderNumberPagination: any = function( totalGroupNumber: number ): void {
        const currentGroupIndex: number = Math.ceil( swiperInstance.activeIndex / swiperInstance.params.slidesPerGroup + 1 );
        $teaserNumbersCurrent.text( currentGroupIndex );
        $teaserNumbersTotal.text( totalGroupNumber );

        $pagination.addClass( `${paginationName}--hidden` );
        $teaserNumbers.addClass( `${teaserName}__numbers--visible` );
    };

    /**
     * Updates pagination by adjusting it's type and contents e.g. after window resize.
     */
    const updatePagination: any = function(): void {
        if ( $teaserNumbers.length && swiperInstance.params.paginationBreakpoint ) {
            const totalSlidesNumber: number = $teaserNumbersTotal.attr( `data-${teaserName}-total` ) || swiperInstance.slides.length;
            const totalGroupNumber: number = Math.ceil( totalSlidesNumber / swiperInstance.params.slidesPerGroup );
            if ( totalGroupNumber > swiperInstance.params.paginationBreakpoint ) {
                renderNumberPagination( totalGroupNumber );
            } else {
                renderDotPagination( totalGroupNumber );
            }
        }
    };
    currentSettings.onSlideChangeStart = updatePagination; // Update navigation after every// slide switch.

    /**
     * Updates slider sizing by adjusting number of visible slides and pagination.
     */
    const updateSliderSizing: any = function(): void {
        if ( !$element.is( ':visible' ) ) {
            return null;
        }

        if ( dynamicNumOfSlides ) {
            currentSettings.slidesPerView =
                currentSettings.slidesPerGroup = calculateSlidesNumber();
        }
        swiperInstance.params = $.extend( swiperInstance.params, currentSettings );
        updatePagination();
        swiperInstance.update();
    };

    swiperInstance = new Swiper( $element.find( `${teaserClass}__wrapper` ), currentSettings );
    currentSettings.onSlideChangeStart = updatePagination;
    updatePagination();
    $( window ).on( 'resize', updateSliderSizing );
    $pagination.on( 'click', `.${paginationName}-item`, clickDotPagination );

    /**
     * Returns Swiper object.
     * @return {Swiper} Swiper object.
     */
    teaser.getSwiper = function(): void {
        return swiperInstance;
    };

    /**
     * Updates teaser with new settings.
     * @param  {Object} settings New settings to apply.
     */
    teaser.update = function( newSettings?: any ): void {
        newSettings = newSettings || {};
        currentSettings = $.extend( currentSettings, newSettings );
        swiperInstance.params = $.extend( swiperInstance.params, currentSettings );
        dynamicNumOfSlides = !currentSettings.slidesPerView || currentSettings.slidesPerView === 'auto';
        updateSliderSizing();
    };

    /**
     * Destroyes teaser.
     */
    teaser.destroy = function(): void {
        $( window ).off( 'resize', updatePagination );
        $pagination.off( 'click', `.${paginationName}__item`,
            clickDotPagination
        );
        swiperInstance.destroy();
    };
};

export default csTeaser;
