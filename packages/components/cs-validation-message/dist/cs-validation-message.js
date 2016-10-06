(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('csValidationMessage', factory) :
    (factory());
}(this, (function () { 'use strict';

// TODO: Should we move initial methods from constructor to init() method??
var ValidationMessage = (function () {
    function ValidationMessage($component, settings) {
        this._$component = null;
        this._settings = {
            types: null,
        };
        this._message = null;
        this._type = null;
        this._typeClasses = null;
        this._$component = $component;
        this._settings = Object.assign(this._settings, settings);
        this._message = this._$component.text();
        if (this._settings.types) {
            this._typeClasses = this._getTypesClasses();
            this._detectType();
        }
    }
    ValidationMessage.prototype.getMessage = function () {
        return this._message;
    };
    ValidationMessage.prototype.setMessage = function (message) {
        this._message = message;
        this._printMessage();
    };
    ValidationMessage.prototype.getType = function () {
        return this._type;
    };
    ValidationMessage.prototype.setType = function (type) {
        this._type = type;
        this._resetComponentType();
        this._updateComponentType();
    };
    ValidationMessage.prototype._detectType = function () {
        var _this = this;
        this._settings.types.forEach(function (classname, type) {
            if (_this._$component.hasClass(classname)) {
                _this._type = type;
            }
        });
    };
    ValidationMessage.prototype._getTypesClasses = function () {
        var classes = '';
        this._settings.types.forEach(function (value) {
            classes += value + ' ';
        });
        return classes;
    };
    ValidationMessage.prototype._resetComponentType = function () {
        this._$component.removeClass(this._typeClasses);
    };
    ValidationMessage.prototype._updateComponentType = function () {
        this._$component.addClass(this._settings.types.get(this._type));
    };
    ValidationMessage.prototype._printMessage = function () {
        this._$component.text(this._message);
    };
    return ValidationMessage;
}());

var validationTypes = new Map();
validationTypes.set('positive', 'cs-validation-message--type_positive');
validationTypes.set('warning', 'cs-validation-message--type_warning');
validationTypes.set('negative', 'cs-validation-message--type_negative');
var valMessage = new ValidationMessage($('.cs-validation-message'), {
    types: validationTypes,
});
$('#setPositive').click(function () {
    valMessage.setType('positive');
});
$('#setNegative').click(function () {
    valMessage.setType('negative');
});
$('#setWarning').click(function () {
    valMessage.setType('warning');
});
$('#getText').click(function () {
    alert(valMessage.getMessage());
});
$('#getType').click(function () {
    alert(valMessage.getType());
});
$('#setText').click(function () {
    valMessage.setMessage('another text message');
});

})));
//# sourceMappingURL=cs-validation-message.js.map
