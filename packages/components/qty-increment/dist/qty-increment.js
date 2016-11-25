(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('qtyIncrement', ['jquery'], factory) :
    (global.qtyIncrement = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var QtyIncrement = (function () {
    /**
     * Creates new QtyIncrement component with optional settings.
     * @param  {QtyIncrementOptions} options  Optional settings object.
     */
    function QtyIncrement($element, options) {
        this._eventListeners = {};
        this._options = $.extend(this._options, options);
        this._options.namespace = this._options.namespace || 'cs-';
        this._$container = $element || $("." + this._options.namespace + "qty-increment");
        this._$input = this._$container.find("." + this._options.namespace + "qty-increment__input");
        this._$decrementBtn = this._$container.find("." + this._options.namespace + "qty-increment__button--decrement");
        this._$incrementBtn = this._$container.find("." + this._options.namespace + "qty-increment__button--increment");
        this._minValue = this._options.minValue || 1;
        this._maxValue = this._options.maxValue || 10;
        this._errorHandler = this._options.errorHandler || this._defaultErrorHandler;
        this._attachEvents();
        this._updateButtonsState();
    }
    /**
     * Upddate button state (disable / enable)
     */
    QtyIncrement.prototype._updateButtonsState = function () {
        var currentValue = this._$input.val();
        // If value of input is less than minimum, disable decrease button, otherwise, enable button
        if (currentValue <= this._minValue) {
            this._$container.find($("." + this._options.namespace + "qty-increment__button--decrement")).attr('disabled', 'disabled').addClass(this._options.namespace + "qty-increment__button--disabled");
        }
        else {
            this._$container.find($("." + this._options.namespace + "qty-increment__button--decrement")).removeAttr('disabled').removeClass(this._options.namespace + "qty-increment__button--disabled");
        }
        // If value of input is less than minimum, disable increase button, otherwise, enable button
        if (currentValue >= this._maxValue) {
            this._$container.find($("." + this._options.namespace + "qty-increment__button--increment")).attr('disabled', 'disabled').addClass(this._options.namespace + "qty-increment__button--disabled");
        }
        else {
            this._$container.find($("." + this._options.namespace + "qty-increment__button--increment")).removeAttr('disabled').removeClass(this._options.namespace + "qty-increment__button--disabled");
        }
    };
    QtyIncrement.prototype._defaultErrorHandler = function () {
        if (parseFloat(this._$input.val()) > this._maxValue) {
            alert("The maximum value is " + this._maxValue + ".");
        }
        else if (parseFloat(this._$input.val()) < this._minValue) {
            alert("The minimum value is " + this._minValue + ".");
        }
    };
    /**
     * Shows error message and fixes value of input to min/max
     */
    QtyIncrement.prototype._validate = function () {
        var isValid = false;
        if (parseFloat(this._$input.val()) > this._maxValue || parseFloat(this._$input.val()) < this._minValue) {
            // trigger errorHandler method to show error
            this._errorHandler();
            // Set minimum/maximum after error appeared
            if (parseFloat(this._$input.val()) > this._maxValue) {
                this._$input.val(this._maxValue);
            }
            else if (parseFloat(this._$input.val()) < this._minValue) {
                this._$input.val(this._minValue);
            }
            isValid = false;
        }
        else {
            $(document).trigger("." + this._options.namespace + "qty-increment:change", this._$input);
            isValid = true;
        }
        return isValid;
    };
    /**
     * Attaches events needed by component.
     */
    QtyIncrement.prototype._attachEvents = function () {
        var _this = this;
        var component = this;
        this._eventListeners.clickListener = function ($btn) {
            var oldValue = _this._$input.val();
            var newVal;
            if ($btn.get(0) === _this._$incrementBtn.get(0)) {
                newVal = parseFloat(oldValue) + 1;
                // Don't allow incrementing above maxValue
                if (oldValue < _this._maxValue) {
                    newVal = parseFloat(oldValue) + 1;
                }
                else {
                    newVal = _this._maxValue;
                }
            }
            else {
                // Don't allow decrementing below minValue
                if (oldValue > _this._minValue) {
                    newVal = parseFloat(oldValue) - 1;
                }
                else {
                    newVal = _this._minValue;
                }
            }
            _this._$input.val(newVal);
            // Run buttons state update function
            _this._updateButtonsState();
            // If previous value of input is different than the one after user click, trigger change event.
            if (oldValue !== newVal) {
                $(document).trigger("." + _this._options.namespace + "qty-increment:change", _this._$input);
            }
        };
        this._eventListeners.keydownListener = function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode === 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // Let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        };
        this._eventListeners.keyupListener = function () {
            _this._validate();
            _this._updateButtonsState();
        };
        this._eventListeners.blurListener = function () {
            if (_this._$input.val() === '') {
                _this._$input.val(_this._minValue);
            }
            _this._updateButtonsState();
        };
        this._$decrementBtn.on('click', function () {
            component._eventListeners.clickListener($(this));
        });
        this._$incrementBtn.on('click', function () {
            component._eventListeners.clickListener($(this));
        });
        this._$input.on('keydown', this._eventListeners.keydownListener);
        this._$input.on('keyup', this._eventListeners.keyupListener);
        this._$input.on('blur', this._eventListeners.blurListener);
    };
    return QtyIncrement;
}());

return QtyIncrement;

})));
//# sourceMappingURL=qty-increment.js.map
