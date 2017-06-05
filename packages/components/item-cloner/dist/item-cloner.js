(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('itemCloner', ['jquery'], factory) :
    (global.itemCloner = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

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

/**
 * ItemCloner clones given item on mouseover and places is on top of hovered element in the same place
 * Clone resides on the bottom of the DOM tree and is positioned absolutely with height z-index ( defined in options )
 */
var ItemCloner = (function () {
    /**
     * Creates and initiates new ItemCloner component with given settings.
     * @param  {$origins} jquery object that should be cloned.
     * @param  {IItemClonerSettings} settings Optional component settings.
     */
    function ItemCloner($origins, settings) {
        if (!$origins.length) {
            return;
        }
        this.settings = $.extend(true, {}, {
            clonerClass: 'cs-item-cloner',
            clonerHoverClass: 'cs-item-cloner--visible',
            cloneZindex: 200,
            breakpoint: breakpoint.laptop,
            delay: 10,
            touch: {
                enabled: true,
                displayAsStatic: false,
                staticClass: 'cs-grid-product--static',
                disableAnimations: false,
            }
        }, settings);
        this._isTouch = ('ontouchstart' in document.documentElement);
        this.$origins = $origins;
        this.isActive = false;
        this.$origin = undefined;
        this.$wrapper = undefined;
        this.$clone = undefined;
        this._animationClassTimeout;
        this._createCloneWrapper();
        this._setEvents();
        if (this.settings.belowBreakpointClass && this.settings.belowBreakpointClass !== '') {
            this._setBelowBreakpointClass();
        }
        if (this._isTouch && !this.settings.touch.enabled && this.settings.touch.displayAsStatic) {
            this._setAsStatic();
        }
        if (this._isTouch && this.settings.touch.disableAnimations) {
            this.$origins.addClass('no-transition');
        }
    }
    /**
     * Destroys clone, removes all classes added during cloning, reverts to original state
     */
    ItemCloner.prototype.destroy = function () {
        if (this.isActive && this.$wrapper.children().length) {
            if (this.settings.onBeforeHide && typeof (this.settings.onBeforeHide) === 'function') {
                this.settings.onBeforeHide();
            }
            this.$wrapper.html('').removeClass(this.settings.clonerHoverClass).removeAttr('style');
            this.$origins.filter("." + this.settings.originHoverClass).removeClass(this.settings.originHoverClass);
            if (this.settings.delay > 0) {
                clearTimeout(this._animationClassTimeout);
            }
            this.isActive = false;
            this.$origin = undefined;
            this.$clone = undefined;
            if (this.settings.onHidden && typeof (this.settings.onHidden) === 'function') {
                this.settings.onHidden();
            }
        }
    };
    /**
     * Creates wrapper and appends it to the document (before end).
     * Then assigns newly created element to this.$wrapper
     */
    ItemCloner.prototype._createCloneWrapper = function () {
        if (!$("." + this.settings.clonerClass).length) {
            $('body').append("<div class=\"" + this.settings.clonerClass + "\"></div>");
        }
        this.$wrapper = $("." + this.settings.clonerClass);
    };
    /**
     * After clone has been created, this method sets it to active
     * @param  {$origin} jquery object that will be cloned.
     */
    ItemCloner.prototype._setCloneActive = function () {
        this.$clone.addClass("" + this.settings.cloneContentHoverClass);
        this.isActive = true;
        if (this.settings.onShown && typeof (this.settings.onShown) === 'function') {
            this.settings.onShown(this);
        }
    };
    /**
     * Actually clones given element and replaces $wrapper's  HTML with it
     * @param  {$origin} jquery object that will be cloned.
     */
    ItemCloner.prototype._clone = function ($origin) {
        var _this = this;
        this.$origin = $origin;
        // Run onBeforeShow callback if defined
        if (this.settings.onBeforeShow && typeof (this.settings.onBeforeShow) === 'function') {
            this.settings.onBeforeShow();
        }
        // Get data before any action
        var cords = $origin.offset();
        var realWidth = $origin[0].getBoundingClientRect().width;
        this.$wrapper.css({
            top: cords.top,
            left: cords.left,
            zIndex: this.settings.cloneZindex,
            width: realWidth,
        }).addClass(this.settings.clonerHoverClass);
        // Clone original element
        this.$clone = $origin.clone(true);
        // Add class to original element
        $origin.addClass(this.settings.originHoverClass);
        // physically replace wrapper's content with $clone
        this.$wrapper.html(this.$clone);
        // Add class to clone after it has been placed in $wrapper
        this.$clone.addClass(this.settings.clonerClass + "__clone");
        /* Add another class indicating that cloned element should be in hover state
         * Timeout helps with CSS animations witch didn't run without it.
        */
        if (this.settings.delay > 0) {
            this._animationClassTimeout = setTimeout(function () {
                _this._setCloneActive();
            }, this.settings.delay);
        }
        else {
            this._setCloneActive();
        }
    };
    /**
     * Setups events
     */
    ItemCloner.prototype._setEvents = function () {
        var _this = this;
        var throttler;
        var onEvents = this._isTouch ? 'touchstart' : 'mouseenter';
        var offEvents = this._isTouch ? 'touchend touchcancel' : 'mouseleave';
        this.$origins.stop().on(onEvents, function (event) {
            // Clone only if needed
            if ((event.type === 'touchstart' && _this.settings.touch.enabled) || event.type === 'mouseenter') {
                if (!$(this).hasClass(_this.settings.clonerClass + "__clone") && $(window).width() >= _this.settings.breakpoint) {
                    // Emergency destroy
                    if (_this.isActive) {
                        _this.destroy();
                    }
                    _this._clone($(this));
                }
            }
        });
        // Run destroy menthod when mouse leaves the clone
        this.$wrapper.stop().on(offEvents, function () {
            _this.destroy();
        });
        // Run destroy menthod when called from outside
        $(document).on('destroyItemClones', function () {
            _this.destroy();
        });
        // On touches destroy when touchstart anywhere in body but not on $wrapper
        if (this.settings.touch.enabled) {
            $(document).on('touchstart', function (event) {
                if (!$(event.target).hasClass("" + _this.settings.clonerClass) && !$(event.target).parents("." + _this.settings.clonerClass).length) {
                    _this.destroy();
                }
            });
        }
        // Resize event to set class for $origins if needed
        if (this.settings.belowBreakpointClass && this.settings.belowBreakpointClass !== '') {
            $(window).on('resize', function () {
                clearTimeout(throttler);
                throttler = setTimeout(function () {
                    _this._setBelowBreakpointClass();
                }, 250);
            });
        }
    };
    /**
     * On touch devices, set this.settings.touch.staticClass *
     * Only if hover is disabled and option to do so is set to true
     */
    ItemCloner.prototype._setAsStatic = function () {
        if (this.settings.touch.staticClass && this.settings.touch.staticClass !== '') {
            this.$origins.addClass(this.settings.touch.staticClass);
        }
    };
    /**
     * If {this.settings.belowBreakpointClass} is set, add this class
     * Only if window width value is lower than defined breakpoint
     */
    ItemCloner.prototype._setBelowBreakpointClass = function () {
        if ($(window).width() < this.settings.breakpoint) {
            this.destroy();
            this.$origins.addClass(this.settings.belowBreakpointClass);
        }
        else {
            this.$origins.removeClass(this.settings.belowBreakpointClass);
        }
    };
    return ItemCloner;
}());

return ItemCloner;

})));
//# sourceMappingURL=item-cloner.js.map
