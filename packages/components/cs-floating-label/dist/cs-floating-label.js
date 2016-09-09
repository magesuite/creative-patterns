(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.csFloatingLabel = global.csFloatingLabel || {})));
}(this, (function (exports) { 'use strict';

var FloatingLabel = (function () {
    function FloatingLabel(settings) {
        this.input = settings.input;
        this.label = settings.label;
        this.labelFloatedClass = settings.labelFloatedClass;
    }
    FloatingLabel.prototype.float = function () {
        this.label.addClass(this.labelFloatedClass);
    };
    FloatingLabel.prototype.unFloat = function () {
        this.label.removeClass(this.labelFloatedClass);
    };
    FloatingLabel.prototype._events = function () {
        var _this = this;
        this.input.on('focus', function () {
            _this.float();
        });
        this.input.on('blur', function () {
            if (!_this.input.val().length) {
                _this.unFloat();
            }
        });
    };
    FloatingLabel.prototype.init = function () {
        this._events();
    };
    return FloatingLabel;
}());

exports['default'] = FloatingLabel;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-floating-label.js.map
