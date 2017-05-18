(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('genderDetection', ['jquery'], factory) :
    (global.genderDetection = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var GenderDetection = (function () {
    /**
     * Creates new Gender Detection component with optional settings.
     * @param {options} Optional settings object.
     */
    function GenderDetection(_$element, options) {
        this.options = $.extend(true, {}, {
            sourceClass: 'cs-gender-detection__source',
            inputsWrapperClass: 'cs-gender-detection__content',
            inputsWrapperActiveClass: 'cs-gender-detection__content--active',
            delay: 0,
        }, options);
        this._$element = _$element;
        // Read API key from data-api-key attribute
        this._apiKey = this._$element.data('api-key');
        this._$source = this._$element.find("." + this.options.sourceClass);
        this._$optionsWrapper = this._$element.find("." + this.options.inputsWrapperClass);
        // Select output fields by data-gender attribute
        this._$output = this._$optionsWrapper.find('[data-gender]');
        // this._$output was not edited (selected manually) yet
        this._isEdited = false;
        // If input, options or apiKey is missing then stop script execution
        if (!this._$source.length && !this._$optionsWrapper.length && !this._apiKey && this._apiKey === '') {
            return;
        }
        if (this._$output.length) {
            this._setEvents();
        }
    }
    /**
     * Sets gender on frontend after delay if provided in options
     * @param $output {JQuery} jquery element to set as :checked or that value should be set for.
     * @param gender {String} Optional gender string ('male' / 'female')
     */
    GenderDetection.prototype._setGender = function ($output, gender) {
        setTimeout(function () {
            if (gender && gender !== '') {
                $output.val(gender);
            }
            else {
                $output.attr('checked', true);
            }
            if ($output.data('selectpicker')) {
                $output.selectpicker('refresh');
            }
        }, this.options.delay);
        this._isEdited = true;
    };
    /**
     * Prepares options wrapper: adds 'active' class and gets the actual target
     * @param data {Object} data object returned by gender-api.com
     */
    GenderDetection.prototype._prepareOutput = function (data) {
        var $output = this._$optionsWrapper.find('[data-gender]');
        if (this.options.inputsWrapperActiveClass) {
            this._$optionsWrapper.addClass(this.options.inputsWrapperActiveClass);
        }
        if ($output.length && $output.is('select') && $output.find("option[value=\"" + data.gender + "\"]").length) {
            this._setGender($output, data.gender);
        }
        else if ($output.length && ($output.attr('type') === 'radio' || $output.attr('type') === 'checkbox')) {
            $output = $output.filter(function () {
                return $(this).data('gender') === data.gender;
            });
            if ($output.length) {
                this._setGender($output);
            }
        }
    };
    /**
     * Sends request to gender-api.com
     * @param name {String} Name provided by user ( inputs' value )
     */
    GenderDetection.prototype._getData = function (name) {
        return $.get("https://gender-api.com/get?name=" + name + "&key=" + this._apiKey);
    };
    /**
     * Sets 'onchange' events
     */
    GenderDetection.prototype._setEvents = function () {
        var _that = this;
        // If gender is selected manually before name if provided or if it's edited later then set flag so that script knows not to check gender again
        $(document).on('change', "." + this.options.inputsWrapperClass + " input, ." + this.options.inputsWrapperClass + " select", function () {
            _that._isEdited = true;
        });
        // listed to 'onchange' on name input
        $(document).on('change', "." + this.options.sourceClass, function () {
            var name = _that._$source.val();
            if (name !== '' && !_that._isEdited) {
                // If ajax class defined in options, adds it to 'body'
                if (_that.options.ajaxLoadingClass) {
                    $('body').addClass(_that.options.ajaxLoadingClass);
                }
                _that._getData(name).then(function (data) {
                    $('body').removeClass(_that.options.ajaxLoadingClass);
                    _that._prepareOutput(data);
                });
            }
        });
    };
    return GenderDetection;
}());

return GenderDetection;

})));
//# sourceMappingURL=gender-detection.js.map
