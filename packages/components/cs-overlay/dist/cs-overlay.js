(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('csOverlay', ['exports'], factory) :
    (factory((global.csOverlay = global.csOverlay || {})));
}(this, (function (exports) { 'use strict';

var Overlay = (function () {
    function Overlay(settings) {
        this._visible = false;
        this.onShow = null;
        this.onHide = null;
        this.$element = settings.$element;
        this.visibleClass = settings.visibleClass;
        this.onShow = settings.onShow;
        this.onHide = settings.onHide;
    }
    Overlay.prototype.hide = function () {
        this.$element.removeClass(this.visibleClass);
        this._visible = false;
        this.$element.trigger('overlay:hidden');
        if (this.onHide) {
            this.onHide();
        }
    };
    Overlay.prototype.show = function () {
        this.$element.addClass(this.visibleClass);
        this._visible = true;
        this.$element.trigger('overlay:shown');
        if (this.onShow) {
            this.onShow();
        }
    };
    Overlay.prototype.isVisible = function () {
        return this._visible;
    };
    return Overlay;
}());

//jQuery needed
var overlay = new Overlay({
    $element: $('.cs-overlay'),
    visibleClass: 'cs-overlay--is-visible',
    onShow: function () {
        $('p').css('webkitFilter', 'blur(5px)');
    },
    onHide: function () {
        $('p').css('webkitFilter', 'none');
    },
});
$('#show').on('click', function () {
    overlay.show();
});
$('.cs-overlay').on('click', function () {
    overlay.hide();
});

exports.overlay = overlay;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-overlay.js.map
