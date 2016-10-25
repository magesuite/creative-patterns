(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jQuery')) :
    typeof define === 'function' && define.amd ? define('csSwiper', ['exports', 'jQuery'], factory) :
    (factory((global.csSwiper = global.csSwiper || {}),global.jQuery));
}(this, (function (exports,$) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

//import Swiper from 'Swiper';
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
var CsTeaser = function ($element, settings) {
    /**
     * Required variables initialization.
     */
    settings = settings || {};
    var teaser = this;
    var teaserName = settings.teaserName ? settings.teaserName : 'cs-teaser';
    var teaserClass = "." + teaserName;
    var $teaserWrapper = $element.find(teaserClass + "__wrapper");
    var paginationName = settings.paginationName ? settings.paginationName : teaserName + "__pagination";
    var $pagination = $element.find("." + paginationName);
    var $teaserNumbers = $element.find(teaserClass + "-numbers");
    var $teaserNumbersCurrent = $teaserNumbers.children(teaserClass + "-number--current");
    var $teaserNumbersTotal = $teaserNumbers.children(teaserClass + "-number--total");
    /**
     * Holds current Swiper instance.
     */
    var swiperInstance;
    /**
     * Attaches component to HTML element.
     */
    $element.data(teaserName, this);
    /**
     * Tells if teaser should have dynamic or fixed number of visible slides.
     * By default teaser will adjust number of visible slides according to it's
     * parrent width. You can change this behaviour by specyfying custom settings.slidesPerView
     * value, e.g. when settings.slidesPerView = 1 teaser will always show only one slide.
     * @type {Boolean}
     */
    var dynamicNumOfSlides = !settings.slidesPerView || settings.slidesPerView === 'auto';
    /**
     * Contains current settings of slider.
     */
    var currentSettings;
    /**
     * Default settings for Swiper.
     * @type {Object}
     */
    var defaultSettings = {
        slideClass: teaserName + "__slide",
        slideActiveClass: teaserName + "__slide--active",
        slideVisibleClass: teaserName + "__slide--visible",
        slideDuplicateClass: teaserName + "__slide--clone",
        slideNextClass: teaserName + "__button--next",
        slidePrevClass: teaserName + "__button--prev",
        wrapperClass: teaserName + "__slides",
        nextButton: $element.find(teaserClass + "__nav--next")[0],
        prevButton: $element.find(teaserClass + "__nav--prev")[0],
        /**
         * Maximum number of groups that will be still visible as rhombs.
         * If you want pagination to always be rhombs you can either don't add
         * .rc-product-teaser__numbers element in HTML or set this to something big.
         * @type {number}
         */
        paginationBreakpoint: 5,
        bulletClass: paginationName + "__item",
        bulletActiveClass: paginationName + "__item--active",
        paginationClickable: true,
        spaceBetween: 28,
        slideMinWidth: 150,
        watchSlidesVisibility: true,
    };
    currentSettings = $.extend(defaultSettings, settings);
    /**
     * Calculates number of slides that should be visible according to teaser's wrapper width.
     * @return {number} Number of slides.
     */
    var calculateSlidesNumber = function () {
        return Math.floor($teaserWrapper.innerWidth() / (currentSettings.slideMinWidth + currentSettings.spaceBetween));
    };
    if (dynamicNumOfSlides) {
        currentSettings.slidesPerView =
            currentSettings.slidesPerGroup = calculateSlidesNumber();
    }
    /**
     * Renders dot(rhomb) pagination.
     * @param  {number} totalGroupNumber Total number of groups.
     */
    var renderDotPagination = function (totalGroupNumber) {
        $pagination.empty();
        for (var groupIndex = 0; groupIndex < totalGroupNumber; groupIndex = groupIndex + 1) {
            var dotClass = '';
            if (groupIndex === Math.ceil(swiperInstance.activeIndex / swiperInstance.params.slidesPerGroup)) {
                dotClass = swiperInstance.params.bulletActiveClass;
            }
            $pagination.append("<li class=\"" + swiperInstance.params.bulletClass + " " + dotClass + "\">\n                <button class=\"" + paginationName + "__button\">" + (groupIndex + 1) + "</button></li>");
        }
        $teaserNumbers.removeClass(teaserName + "__numbers--visible");
        $pagination.removeClass(paginationName + "--hidden");
    };
    /**
     * Swipes on pagination click to appropriate slide.
     * @param  {Object} event Event Object
     */
    var clickDotPagination = function (event) {
        event.preventDefault();
        swiperInstance.slideTo($(this).index() * swiperInstance.params.slidesPerView);
    };
    /**
     * Renders number pagination.
     * @param  {number} totalGroupNumber Total number of groups.
     */
    var renderNumberPagination = function (totalGroupNumber) {
        var currentGroupIndex = Math.ceil(swiperInstance.activeIndex / swiperInstance.params.slidesPerGroup + 1);
        $teaserNumbersCurrent.text(currentGroupIndex);
        $teaserNumbersTotal.text(totalGroupNumber);
        $pagination.addClass(paginationName + "--hidden");
        $teaserNumbers.addClass(teaserName + "__numbers--visible");
    };
    /**
     * Updates pagination by adjusting it's type and contents e.g. after window resize.
     */
    var updatePagination = function () {
        if ($teaserNumbers.length && swiperInstance.params.paginationBreakpoint) {
            var totalSlidesNumber = $teaserNumbersTotal.attr("data-" + teaserName + "-total") || swiperInstance.slides.length;
            var totalGroupNumber = Math.ceil(totalSlidesNumber / swiperInstance.params.slidesPerGroup);
            if (totalGroupNumber > swiperInstance.params.paginationBreakpoint) {
                renderNumberPagination(totalGroupNumber);
            }
            else {
                renderDotPagination(totalGroupNumber);
            }
        }
    };
    currentSettings.onSlideChangeStart = updatePagination; // Update navigation after every// slide switch.
    /**
     * Updates slider sizing by adjusting number of visible slides and pagination.
     */
    var updateSliderSizing = function () {
        if (!$element.is(':visible')) {
            return null;
        }
        if (dynamicNumOfSlides) {
            currentSettings.slidesPerView =
                currentSettings.slidesPerGroup = calculateSlidesNumber();
        }
        swiperInstance.params = $.extend(swiperInstance.params, currentSettings);
        updatePagination();
        swiperInstance.update();
    };
    swiperInstance = new Swiper($element.find(teaserClass + "__wrapper"), currentSettings);
    updatePagination();
    $(window).on('resize', updateSliderSizing);
    $pagination.on('click', "." + paginationName + "__item", clickDotPagination);
    /**
     * Returns Swiper object.
     * @return {Swiper} Swiper object.
     */
    teaser.getSwiper = function () {
        return swiperInstance;
    };
    /**
     * Updates teaser with new settings.
     * @param  {Object} settings New settings to apply.
     */
    teaser.update = function (settings) {
        settings = settings || {};
        currentSettings = $.extend(currentSettings, settings);
        swiperInstance.params = $.extend(swiperInstance.params, currentSettings);
        dynamicNumOfSlides = !settings.slidesPerView || settings.slidesPerView === 'auto';
        updateSliderSizing();
    };
    /**
     * Destroyes teaser.
     */
    teaser.destroy = function () {
        $(window).off('resize', updatePagination);
        $pagination.off('click', "." + paginationName + "__item", clickDotPagination);
        swiperInstance.destroy();
    };
};
/**
 * Initializes every teaser with "data-rc-product-teaser" attribute with default settings.
 */
$('[data-rc-product-teaser]').each(function () {
    return new CsTeaser($(this));
});

exports.CsTeaser = CsTeaser;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-swiper.js.map
