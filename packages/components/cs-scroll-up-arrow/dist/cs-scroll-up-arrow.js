(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jQuery')) :
    typeof define === 'function' && define.amd ? define('csScrollUpArrow', ['jQuery'], factory) :
    (global.csScrollUpArrow = factory(global.jQuery));
}(this, (function ($$1) { 'use strict';

$$1 = 'default' in $$1 ? $$1['default'] : $$1;

/**
 * Logic containing scrolling to the part of the page by clicking on the component
 */
var ScrollUpArrow = (function () {
    function ScrollUpArrow($element, settings) {
        this._visible = false;
        this.onClickCallback = null;
        this.onFinishCallback = null;
        this.$element = $element;
        this.settings = settings;
        this.onClickCallback = settings.onClickCallback;
        this.onFinishCallback = settings.onFinishCallback;
    }
    ScrollUpArrow.prototype.show = function () {
        this.$element.addClass(this.settings.classes.visible);
        this._visible = true;
    };
    ScrollUpArrow.prototype.hide = function () {
        this.$element.removeClass(this.settings.classes.visible);
        this._visible = false;
    };
    ScrollUpArrow.prototype.scroll = function (to) {
        var _this = this;
        var scrollingTo = null;
        if (to) {
            scrollingTo = to;
        }
        else {
            scrollingTo = this.settings.scrollTo;
        }
        $$1('body, html').animate({
            scrollTop: scrollingTo,
        }, this.settings.scrollingSpeed, function () {
            if (_this.onFinishCallback) {
                _this.onFinishCallback();
            }
        });
    };
    ScrollUpArrow.prototype.isVisible = function () {
        return this._visible;
    };
    ScrollUpArrow.prototype.init = function () {
        this._events();
    };
    ScrollUpArrow.prototype._onClick = function () {
        this.scroll();
    };
    ScrollUpArrow.prototype._events = function () {
        var _this = this;
        this.$element.on('click', function (e) {
            e.preventDefault();
            _this._onClick();
            if (_this.onClickCallback) {
                _this.onClickCallback();
            }
        });
    };
    return ScrollUpArrow;
}());

// demo
var arrow = null;
arrow = new ScrollUpArrow($('.cs-scroll-up-arrow'), {
    scrollingSpeed: 500,
    scrollTo: 0,
    classes: {
        visible: 'cs-scroll-up-arrow--is-visible',
    },
});
arrow.init();
$(window).on('scroll', function () {
    if ($(window).scrollTop() > 250) {
        if (!arrow.isVisible()) {
            arrow.show();
        }
    }
    else {
        if (arrow.isVisible()) {
            arrow.hide();
        }
    }
});
var arrow$1 = arrow;

return arrow$1;

})));
//# sourceMappingURL=cs-scroll-up-arrow.js.map
