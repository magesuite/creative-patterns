(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('csToggler', factory) :
    (factory());
}(this, (function () { 'use strict';

// Possible to make some smart detection of visiblity? Or use jQuery? Or pass in settings or method?
var Toggler = (function () {
    function Toggler(element, settings) {
        this._element = null;
        this._settings = null;
        this._isVisible = null;
        this._isElementJQuery = null;
        this._visibleByDefault = null;
        this._element = element;
        this._settings = settings;
        this._detectElementType();
        this._detectDefaultState();
    }
    Toggler.prototype.show = function () {
        if (!this._isVisible || null) {
            if (this._visibleByDefault) {
                this._removeClass(this._settings.hiddenClass);
            }
            else {
                this._addClass(this._settings.visibleClass);
            }
        }
        this._isVisible = true;
    };
    Toggler.prototype.hide = function () {
        if (this._isVisible || null) {
            if (this._visibleByDefault) {
                this._addClass(this._settings.hiddenClass);
            }
            else {
                this._removeClass(this._settings.visibleClass);
            }
        }
        this._isVisible = false;
    };
    Toggler.prototype.isVisible = function () {
        return this._isVisible;
    };
    Toggler.prototype.isHidden = function () {
        return !this._isVisible;
    };
    Toggler.prototype.toggle = function () {
        this._isVisible ? this.hide() : this.show();
    };
    Toggler.prototype._addClass = function (className) {
        if (this._isElementJQuery) {
            this._element.addClass(className);
        }
        else {
            this._element.classList.add(className);
        }
    };
    Toggler.prototype._removeClass = function (className) {
        if (this._isElementJQuery) {
            this._element.removeClass(className);
        }
        else {
            this._element.classList.remove(className);
        }
    };
    /**
     * Check what class is provided, visible or hidden and then sue proper one for toggling
     * @private
     */
    Toggler.prototype._detectDefaultState = function () {
        this._visibleByDefault = this._settings.visibleClass ? false : true;
    };
    Toggler.prototype._detectElementType = function () {
        this._isElementJQuery = this._element.jquery ? true : false;
    };
    return Toggler;
}());
window.dupa = new Toggler(document.getElementById('dupa'), {
    hiddenClass: 'hidden',
});

})));
//# sourceMappingURL=cs-toggler.js.map
