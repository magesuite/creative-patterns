(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
    typeof define === 'function' && define.amd ? define('flyout', ['exports', 'jquery'], factory) :
    (factory((global.flyout = global.flyout || {}),global.jQuery));
}(this, (function (exports,$) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Flyout component is component which can fire show method (usually after clicking on its trigger).
 * Then contentTransitioningClass is added to its content and show event is triggered.
 * After transition time contentInClass class is added to content and shown event is triggered
 * On hide  transitioning class is added and in class is removed. After transition time transitioning class is removed.
 */
var Flyout = (function () {
    /**
     * Creates and initiates new Flyout component with settings.
     * * @param  {JQuery} $element Optional component settings.
     * @param  {IFlyoutSettings} settings Optional component settings.
     */
    function Flyout($element, settings) {
        this._shown = false;
        this._isTransitioning = false;
        this.eventListeners = {};
        // Extend component's defaults with given optional settings.
        this.settings = $.extend({
            transitionTime: 350,
            trigger: 'click',
            shown: false,
            minHeight: 0,
            onShow: null,
            onShowCompleted: null,
            onHide: null,
            onHideCompleted: null,
        }, settings);
        this.name = settings.name;
        // Element is main wrapper for flyout/collapse
        this.$element = $element;
        this.$content = settings.content ? settings.content : $element.find("." + this.name + "__content").first();
        this.$triggers = this.$element.find("." + this.name + "__trigger");
        // Optional close for hide method
        this.$close = this.$element.find("." + this.name + "__close").first();
        // Define all needed classes
        this.contentOutClass = this.name + "__content--out";
        this.contentInClass = this.name + "__content--in";
        this.contentTransitioningClass = this.name + "__content--transitioning";
        this.triggerInClass = this.name + "__trigger--in";
        // Attach all of the event listeners.
        this.attachEventListeners();
        // Store Component inside data of element
        this.$element.data(this.name + "-instance", this);
        // Show initial in
        if (this.settings.initiallyShown === true) {
            this.show();
        }
    }
    /**
     * Destroys component, removes all event listeners.
     */
    Flyout.prototype.destroy = function () {
        // Assign reference to allow better minification.
        var eventListeners = this.eventListeners;
        // Remove events
        this.$triggers.off('click', eventListeners.toggleState);
        this.$close.off('click', eventListeners.toggleState);
        $(document).off('debouncedresize', eventListeners.resize);
    };
    /**
     * Toggles flyout state between shown and hidden.
     */
    Flyout.prototype.toggleState = function () {
        if (this._shown === false) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    /**
     * Perform show action if element is not transitioning at the moment.
     * Remove class out for content and add class in. Add aria-expanded true for trigger
     * Set transitioning flag to true.
     * If is collapse type calculate height
     * Trigger event show
     * Trigger method showComplete after transition time
     */
    Flyout.prototype.show = function () {
        var _this = this;
        if (this._isTransitioning || this.$content.hasClass(this.contentInClass) || this._shown === true) {
            return;
        }
        this.$content.removeClass(this.contentOutClass);
        this.$content.addClass(this.contentInClass);
        this.$triggers.addClass(this.triggerInClass);
        this.$triggers.prop('aria-expanded', true);
        this._isTransitioning = true;
        if (this.settings.type === 'collapse') {
        }
        // Trigger show event and callback
        this.$element.trigger(this.name + ".show");
        if (this.settings.onShow) {
            this.settings.onShow();
        }
        setTimeout(function () { return _this.showComplete(); }, this.settings.transitionTime);
        // Add overlay if it is flyout
        if (this.settings.type === 'flyout') {
        }
    };
    /**
     * Trigger shown event
     * Set transitioning flag to false. Set shown flag to true
     */
    Flyout.prototype.showComplete = function () {
        this._isTransitioning = false;
        // Trigger show completed event and callback
        this.$element.trigger(this.name + ".shown");
        if (this.settings.onShowCompleted) {
            this.settings.onShowCompleted();
        }
        this._shown = true;
    };
    /**
     * Perform hide action if element is not transitioning at the moment.
     * Remove class in for content and trigger. Add class transitioning for content. Add aria-expanded false for trigger
     * Set transitioning flag to true.
     * If is collapse type calculate height
     * Trigger event hide
     * Trigger method hideComplete after transition time
     */
    Flyout.prototype.hide = function () {
        var _this = this;
        if (this._isTransitioning || this.$content.hasClass(this.contentTransitioningClass) || this._shown === false) {
            return;
        }
        this.$content.addClass(this.contentTransitioningClass);
        this.$content.removeClass(this.contentInClass);
        this.$triggers.removeClass(this.triggerInClass);
        this.$triggers.prop('aria-expanded', false);
        this._isTransitioning = true;
        if (this.settings.type === 'collapse') {
        }
        // Trigger hide event and callback
        this.$element.trigger(this.name + ".hide");
        if (this.settings.onHide) {
            this.settings.onHide();
        }
        setTimeout(function () { return _this.hideComplete(); }, this.settings.transitionTime);
        // Remove overlay if it is flyout
        if (this.name === 'flyout') {
        }
    };
    /**
     * Trigger hidden event
     * Set transitioning flag to false. Set shown flag to false
     */
    Flyout.prototype.hideComplete = function () {
        this.$content.removeClass("" + this.contentTransitioningClass).addClass(this.contentOutClass);
        this._isTransitioning = false;
        this._shown = false;
        // Trigger hide completed event and callback
        this.$element.trigger(this.name + ".hidden");
        if (this.settings.onHideCompleted) {
            this.settings.onHideCompleted();
        }
        if (this.settings.type === 'collapse') {
            this.$content.css({ 'height': '', 'max-height': this.settings.minHeight });
        }
    };
    /**
     * Update width of flyout
     */
    Flyout.prototype.closeOnClickOutside = function (event) {
        if (this._shown === false || this.settings.type === 'collapse') {
            return;
        }
        if (!$(event.currentTarget).is(this.$element)) {
            this.toggleState();
        }
    };
    /**
     * Attaches all needed event listeners for show / hide behaviour.
     */
    Flyout.prototype.attachEventListeners = function () {
        // Assign reference to allow better minification.
        var eventListeners = this.eventListeners;
        // Click on trigger to toggle component state
        eventListeners.toggleState = this.toggleState.bind(this);
        this.$triggers.on('click', eventListeners.toggleState);
        this.$close.on('click', eventListeners.toggleState);
        $(document).on('click', this.closeOnClickOutside.bind(this));
    };
    return Flyout;
}());

exports.Flyout = Flyout;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=flyout.js.map
