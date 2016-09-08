(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('csScrollUpArrow', ['exports'], factory) :
    (factory((global.csScrollUpArrow = global.csScrollUpArrow || {})));
}(this, (function (exports) { 'use strict';

/**
 * Logic containing scrolling to the part of the page by clicking on the component
 */
var ScrollUpArrow = (function () {
    function ScrollUpArrow($element, settings) {
        this._visible = false;
        this.$element = $element;
        this.settings = settings;
    }
    ScrollUpArrow.prototype._onClick = function () {
        var _this = this;
        $('body, html').animate({
            scrollTop: this.settings.scrollTo
        }, this.settings.scrollingSpeed, function () {
            _this._onFinish();
        });
    };
    ScrollUpArrow.prototype._onFinish = function () {
    };
    ScrollUpArrow.prototype._events = function () {
        var _this = this;
        this.$element.on('click', function (e) {
            e.preventDefault();
            _this._onClick();
        });
    };
    ScrollUpArrow.prototype.show = function () {
        this.$element.addClass(this.settings.classes.visible);
        this._visible = true;
    };
    ScrollUpArrow.prototype.hide = function () {
        this.$element.removeClass(this.settings.classes.visible);
        this._visible = false;
    };
    ScrollUpArrow.prototype.isVisible = function () {
        return this._visible;
    };
    ScrollUpArrow.prototype.init = function () {
        this._events();
    };
    return ScrollUpArrow;
}());

exports.arrow = new ScrollUpArrow($('.cs-scroll-up-arrow'), {
    scrollingSpeed: 500,
    scrollTo: 0,
    classes: {
        visible: 'cs-scroll-up-arrow--is-visible'
    }
});
exports.arrow.init();
$(window).on('scroll', function () {
    if ($(window).scrollTop() > 250) {
        if (!exports.arrow.isVisible()) {
            exports.arrow.show();
        }
    }
    else {
        if (exports.arrow.isVisible()) {
            exports.arrow.hide();
        }
    }
});

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-scroll-up-arrow.js.map
