(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('Swiper')) :
    typeof define === 'function' && define.amd ? define('imageTeaser', ['jquery', 'Swiper'], factory) :
    (global.imageTeaser = factory(global.jQuery,global.Swiper));
}(this, (function ($,Swiper) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
Swiper = 'default' in Swiper ? Swiper['default'] : Swiper;

/**
 * Breakpoint utility for sharing breakpoints between CSS and JS.
 */
/**
 * Converts dash-case to camelCase.
 * @type {Function}
 */
var camelCase = function (input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group) {
        return group.toUpperCase();
    });
};
/**
 * Returns object containign available breakpoints.
 * @return {Object} Object containing avaliable breakpoints in shape { breakpointName: pixelsNumber }
 */
var getAvaliableBreakpoints = function () { return JSON.parse(window.getComputedStyle(body, ':before')
    .getPropertyValue('content').slice(1, -1).replace(/\\"/g, '"')); };
/**
 * Returs current breakpoint set by CSS.
 * @return {number} Current breakpoint in number of pixels.
 */
var getCurrentBreakpoint = function () { return +window.getComputedStyle(body, ':after')
    .getPropertyValue('content').replace(/"/g, ''); };
var body = document.querySelector('body');
/**
 * Module cache to export.
 * @type {Object}
 */
var breakpoint = {
    current: getCurrentBreakpoint(),
};
/**
 * Available breakpoints cache.
 */
var breakpoints = getAvaliableBreakpoints();
// Extend breakpoint module with available breakpoint keys converted to camelCase.
Object.keys(breakpoints).forEach(function (breakpointName) {
    breakpoint[camelCase(breakpointName)] = breakpoints[breakpointName];
});
// Let's check if we can register passive resize event for better performance.
var passiveOption = undefined;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            passiveOption = { passive: true };
        },
    });
    window.addEventListener('test', null, opts);
}
catch (e) { }
// Update current breakpoint on every resize.
window.addEventListener('resize', function () {
    breakpoint.current = getCurrentBreakpoint();
}, passiveOption);

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
var csTeaser = function ($element, settings) {
    /**
     * Required variables initialization.
     */
    settings = settings || {};
    var teaser = this;
    var teaserName = settings.teaserName ? settings.teaserName : 'cs-teaser';
    var teaserClass = "." + teaserName;
    var $teaserWrapper = $element.find(teaserClass + "__wrapper");
    var paginationName = settings.paginationName ? settings.paginationName : teaserName + "__pagination";
    var fractionPaginationSeparator = settings.fractionPaginationSeparator ? settings.fractionPaginationSeparator : '/';
    /**
     * Holds current Swiper instance.
     */
    var swiperInstance;
    /**
     * Tells if swiper was destroyed.
     */
    var destroyed;
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
        slideNextClass: teaserName + "__slide--next",
        slidePrevClass: teaserName + "__slide--prev",
        wrapperClass: teaserName + "__slides",
        nextButton: $element.find(teaserClass + "__nav--next")[0],
        prevButton: $element.find(teaserClass + "__nav--prev")[0],
        buttonDisabledClass: teaserName + "__nav--disabled",
        pagination: $element.find("." + paginationName),
        /**
         * Maximum number of groups that will be still visible as dots.
         * If you want pagination to always be dots you can either don't add
         * .${teaserName}__numbers element in HTML or set this to something big.
         * @type {number}
         */
        paginationBreakpoint: 5,
        onlyBulletPagination: false,
        bulletClass: paginationName + "-item",
        bulletActiveClass: paginationName + "-item--active",
        paginationCurrentClass: teaserName + "__number--current",
        paginationTotalClass: teaserName + "__number--total",
        paginationClickable: true,
        spaceBetween: 20,
        slideMinWidth: 200,
        calculateSlides: true,
        maxSlidesPerView: null,
        watchSlidesVisibility: true,
        paginationBulletRender: function (swiper, index, className) {
            return "<li class=\"" + className + "\">\n                <button class=\"" + paginationName + "-button\">" + (index + 1) + "</button></li>";
        },
        paginationFractionRender: function (swiper, currentClassName, totalClassName) {
            return "<span class=\"" + teaserName + "__number " + currentClassName + "\"></span> " + fractionPaginationSeparator + " <span class=\"" + teaserName + "__number " + totalClassName + "\"></span>";
        },
    };
    currentSettings = $.extend(defaultSettings, settings);
    /**
     * Calculates number of slides that should be visible according to teaser's wrapper width.
     * @return {number} Number of slides.
     */
    var calculateSlidesNumber = function () {
        var slidesNumber = Math.floor($teaserWrapper.innerWidth() / (currentSettings.slideMinWidth + currentSettings.spaceBetween));
        var maxSlidesAllowed = parseInt(currentSettings.maxSlidesPerView, 10);
        if (slidesNumber < maxSlidesAllowed) {
            return slidesNumber;
        }
        else {
            return maxSlidesAllowed;
        }
    };
    if (dynamicNumOfSlides && currentSettings.calculateSlides) {
        currentSettings.slidesPerView =
            currentSettings.slidesPerGroup = calculateSlidesNumber();
    }
    /**
     * Updates slider sizing by adjusting number of visible slides and pagination.
     */
    var updateSliderSizing = function () {
        if (!$element.is(':visible')) {
            return null;
        }
        if (dynamicNumOfSlides && currentSettings.calculateSlides) {
            currentSettings.slidesPerView =
                currentSettings.slidesPerGroup = calculateSlidesNumber();
        }
        swiperInstance.params = $.extend(swiperInstance.params, currentSettings);
    };
    var postInit = function () {
        if (swiperInstance.params.slidesPerView !== 1 && !swiperInstance.params.onlyBulletPagination) {
            var totalSlidesNumber = swiperInstance.slides.length;
            var totalGroupNumber = Math.ceil(totalSlidesNumber / swiperInstance.params.slidesPerGroup);
            if (totalGroupNumber > swiperInstance.params.paginationBreakpoint) {
                swiperInstance.params.paginationType = 'fraction';
            }
            else {
                swiperInstance.params.paginationType = 'bullets';
            }
        }
    };
    swiperInstance = new Swiper($element.find(teaserClass + "__wrapper"), currentSettings);
    destroyed = false;
    postInit();
    swiperInstance.update();
    $(window).on('resize', function () {
        if (!destroyed) {
            updateSliderSizing();
            postInit();
            swiperInstance.update();
        }
    });
    /**
     * Returns Swiper object.
     * @return {Swiper} Swiper object.
     */
    teaser.getSwiper = function () {
        return swiperInstance;
    };
    /**
     * Destroyes teaser.
     */
    teaser.destroy = function () {
        swiperInstance.destroy();
        destroyed = true;
    };
};

var ImageTeaser = (function () {
    /**
     * Creates new ImageTeaser component with optional settings.
     * @param  {ImageTeaser} options  Optional settings object.
     */
    function ImageTeaser($element, options) {
        this._options = $.extend(this._options, options);
        this._options.teaserName = this._options.teaserName || 'cs-image-teaser';
        this._$container = $element;
        var maxMobileWidth = breakpoint.tablet - 1;
        this._swiperDefaults = {
            spaceBetween: 8,
            slidesPerView: parseInt(this._$container.data('items-per-view'), 10) || 1,
            slidesPerGroup: parseInt(this._$container.data('items-per-view'), 10) || 1,
            isSlider: Boolean(this._$container.data('is-slider')) || false,
            isSliderMobile: Boolean(this._$container.data('mobile-is-slider')) || false,
            carouselBreakpoint: breakpoint.tablet,
            loop: true,
            centeredSlides: false,
            breakpoints: (_a = {},
                _a[maxMobileWidth] = {
                    slidesPerView: parseInt(this._$container.data('mobile-items-per-view'), 10) || parseInt(this._$container.data('items-per-view'), 10) || 1,
                    slidesPerGroup: parseInt(this._$container.data('mobile-items-per-view'), 10) || parseInt(this._$container.data('items-per-view'), 10) || 1,
                },
                _a
            ),
        };
        this._options = $.extend(this._swiperDefaults, this._options);
        if (this._options.isSlider) {
            this._initTeaser(this._$container);
        }
        if (this._options.isSliderMobile && !this._options.isSlider) {
            var _this_1 = this;
            this._toggleMobileTeaser();
            $(window).on('resize', function () {
                _this_1._toggleMobileTeaser();
            });
        }
        var _a;
    }
    ImageTeaser.prototype.getInstance = function () {
        return this._instance;
    };
    
    /**
     * Initializes teaser
     */
    ImageTeaser.prototype._initTeaser = function () {
        this._instance = new csTeaser(this._$container, this._options);
    };
    /**
     * Initializes teaser only for mobiles
     */
    ImageTeaser.prototype._toggleMobileTeaser = function () {
        if ($(window).width() < this._options.carouselBreakpoint) {
            if (!this._instance) {
                this._$container.addClass(this._options.teaserName + "--slider");
                this._initTeaser();
            }
        }
        else {
            if (this._instance) {
                this._instance.destroy();
                this._$container
                    .removeClass(this._options.teaserName + "--slider")
                    .find("." + this._options.teaserName + "__slides").removeAttr('style')
                    .find("." + this._options.teaserName + "__slide").removeAttr('style');
                this._instance = undefined;
            }
        }
    };
    return ImageTeaser;
}());

return ImageTeaser;

})));
//# sourceMappingURL=image-teaser.js.map
