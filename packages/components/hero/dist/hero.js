(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('Swiper')) :
    typeof define === 'function' && define.amd ? define('hero', ['jquery', 'Swiper'], factory) :
    (global.hero = factory(global.jQuery,global.Swiper));
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
        if ((swiperInstance.originalParams.slidesPerView !== 1 || swiperInstance.params.calculateSlides) && !swiperInstance.params.onlyBulletPagination) {
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

var Hero = (function () {
    /**
     * Creates new Hero component with optional settings.
     * @param {$element} Optional, element to be initialized as Hero component
     * @param {options}  Optional settings object.
     */
    function Hero($element, options) {
        var _this = this;
        var teaserName = (options && options.teaserName) || 'cs-hero';
        var pauseAutoplayOnHover = (options && options.pauseAutoplayOnHover) ? options.pauseAutoplayOnHover : true;
        this._$element = $element || $("." + this._options.teaserName);
        this._swiperDefaults = {
            teaserName: teaserName,
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true,
            autoplay: 5000,
            autoHeight: true,
            paginationBreakpoint: 50,
            slideToClickedSlide: true,
            loop: true,
            calculateSlides: false,
            roundLengths: true,
            autoplayDisableOnInteraction: true,
            pauseAutoplayOnHover: pauseAutoplayOnHover,
            onInit: function (swiper) {
                if (pauseAutoplayOnHover) {
                    swiper.container.parents("." + teaserName).on({
                        mouseenter: function () {
                            if (_this._instance) {
                                swiper.pauseAutoplay();
                                swiper.emit('onAutoplayPause', swiper);
                            }
                        },
                        mouseleave: function () {
                            if (swiper.autoplayPaused && swiper.autoplaying && _this._instance) {
                                swiper.stopAutoplay();
                                swiper.startAutoplay();
                                swiper.emit('onAutoplayResume', swiper);
                            }
                        },
                    });
                }
                if (options && options.callbacks && options.callbacks.onInit && typeof options.callbacks.onInit === 'function') {
                    options.callbacks.onInit(swiper);
                }
            },
        };
        this._options = $.extend(true, this._swiperDefaults, options);
        this._options.destroyForMobile = (this._$element.hasClass(teaserName + "--as-list-mobile") || this._$element.hasClass(teaserName + "--hidden-mobile")) ? true : false;
        if (this._$element.find("." + this._options.teaserName + "__slide").length > 1) {
            if (this._options.destroyForMobile) {
                this._toggleMobileHeros();
                $(window).on('resize', function () {
                    _this._toggleMobileHeros();
                });
            }
            else {
                this._initHeros();
            }
        }
        else {
            this._$element.addClass(this._options.teaserName + "--static");
        }
    }
    Hero.prototype.getInstance = function () {
        return this._instance;
    };
    /**
     * Initializes heros
     */
    Hero.prototype._initHeros = function () {
        this._instance = new csTeaser(this._$element, this._options);
    };
    /**
     * if mobileDisplayVariant was set to 'list' - initialize slider only for resolutions
     * greater than mobile
     */
    Hero.prototype._toggleMobileHeros = function () {
        if ($(window).width() >= breakpoint.tablet) {
            if (!this._instance) {
                this._initHeros();
            }
        }
        else {
            if (this._instance) {
                this._instance.destroy();
                this._$element
                    .find("." + this._options.teaserName + "__slides").removeAttr('style')
                    .find("." + this._options.teaserName + "__slide").removeAttr('style');
                this._instance = undefined;
            }
        }
    };
    return Hero;
}());

return Hero;

})));
//# sourceMappingURL=hero.js.map
