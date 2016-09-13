(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('cs2WaySwitch', factory) :
    (factory());
}(this, (function () { 'use strict';

//JQuery needed
var TwoWaySwitch = (function () {
    function TwoWaySwitch(settings) {
        this._whichActive = null;
        this._$activeItem = null;
        this._activeItemNo = null;
        this.settings = settings;
    }
    TwoWaySwitch.prototype._getItemsState = function () {
        var _this = this;
        this._$activeItem = this.settings.$items.each(function (index, element) {
            var $element = $(element);
            $element.data('switchIndex', index);
            if ($element.hasClass(_this.settings.activeClass)) {
                _this._activeItemNo = index;
                return $element;
            }
        });
    };
    TwoWaySwitch.prototype._events = function () {
        var _this = this;
        this.settings.$items.each(function (index, element) {
            var $element = $(element);
            var elementNo = $element.data('switchIndex');
            $element.on('click', function (e) {
                e.preventDefault();
                if (_this._isItemActive($element)) {
                    return 'Item already active';
                }
                _this._resetActive();
                _this.setActive($element);
                //Callbacks
                _this.settings.onChange ? _this.settings.onChange() : 'or no callback .(ツ)_/¯ ';
                if (elementNo === 0 && _this.settings.onFirst) {
                    _this.settings.onFirst();
                }
                else if (elementNo === 1 && _this.settings.onSecond) {
                    _this.settings.onSecond();
                }
                else if (elementNo > 1) {
                    throw new Error('Wrong index');
                }
            });
        });
    };
    TwoWaySwitch.prototype._isItemActive = function ($element) {
        return $element.data('switchIndex') === this._activeItemNo;
    };
    TwoWaySwitch.prototype._resetActive = function () {
        this.settings.$items.removeClass(this.settings.activeClass);
        this._whichActive = null;
        this.settings.$items.data('isActive', false);
    };
    TwoWaySwitch.prototype.setActive = function ($element) {
        $element.data('isActive', true);
        $element.addClass(this.settings.activeClass);
        this._activeItemNo = $element.data('switchIndex');
    };
    TwoWaySwitch.prototype.init = function () {
        this._getItemsState();
        this._events();
    };
    return TwoWaySwitch;
}());

var buttons = new TwoWaySwitch({
    $element: $('.cs-2-way-switch'),
    $items: $('.cs-2-way-switch__item'),
    activeClass: 'cs-2-way-switch__item--is-active',
    onFirst: function () {
        $('body').append('<strong>first</strong> button callback<br><br>');
    },
    onSecond: function () {
        $('body').append('<strong>second</strong> button callback<br><br>');
    },
    onChange: function () {
        $('body').append('<strong>any</strong> button changed callback<br><br>');
    }
});
buttons.init();

})));
//# sourceMappingURL=cs-2-way-switch.js.map
