(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('isMobile')) :
    typeof define === 'function' && define.amd ? define('select', ['jquery', 'isMobile'], factory) :
    (global.select = factory(global.jQuery,global.isMobile));
}(this, (function ($,isMobile) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
isMobile = 'default' in isMobile ? isMobile['default'] : isMobile;

var HtmlSelect = (function () {
    /**
     * Creates new htmlSelect component with optional settings.
     * @param  {htmlSelectOptions} options  Optional settings object.
     */
    function HtmlSelect($element, options, selectpickerOptions) {
        this._options = $.extend(this._options, options);
        this._options.namespace = this._options.namespace || 'cs-';
        this._$select = $element || $("." + this._options.namespace + "select");
        var _this = this;
        this._selectpickerOptions = $.extend({
            mobile: isMobile.any,
            realSelectClass: _this._options.namespace + "select",
            selectClass: _this._options.namespace + "html-select",
            menuClass: _this._options.namespace + "html-select__menu",
            menuListClass: _this._options.namespace + "html-select__menu-list",
            menuListitemClass: _this._options.namespace + "html-select__menu-item",
            linkClass: _this._options.namespace + "html-select__menu-link",
            styleBase: '',
            iconBase: '',
            tickIcon: '',
            noneSelectedText: 'Nothing selected',
            template: {
                caret: _this._options.caretMarkup || "<span class=\"" + _this._options.namespace + "html-select__trigger-caret\"><span class=\"" + _this._options.namespace + "html-select__trigger-caret-arrow\"></span></span>",
            },
        }, selectpickerOptions);
        this._onRendered();
        this._render();
        this._setCallbacks();
    }
    /**
     * Dynamically set padding for a html-select element
     * @param  {$select} jQuery select element.
     */
    HtmlSelect.prototype._setPadding = function ($select) {
        var $contentAfter = $select.siblings().find("." + this._options.namespace + "html-select__trigger-subtext");
        var $caret = $select.siblings().find("." + this._options.namespace + "html-select__trigger-caret");
        var buttonsLeftPadding = parseInt($select.siblings().find("." + this._options.namespace + "html-select__trigger").css('padding-left'), 10);
        if ($contentAfter.length) {
            var padding = $caret.outerWidth() + $contentAfter.outerWidth() + (2 * buttonsLeftPadding);
            $select.siblings().find("." + this._options.namespace + "html-select__menu-item-text").css('padding-right', padding);
            $select.siblings().find("." + this._options.namespace + "html-select__trigger").css('padding-right', padding);
        }
    };
    /**
     * runs _setHtmlSelectPadding method after $select is rendered
     */
    HtmlSelect.prototype._onRendered = function () {
        var _this = this;
        this._$select.on('rendered.bs.select', function () {
            _this._setPadding($(this));
        });
    };
    /**
     * Initialize selectpicker plugin for all ${this._options.namespace}select elements
     */
    HtmlSelect.prototype._render = function () {
        var _this = this;
        this._$select.each(function () {
            var limit = $(this).attr('data-options-limit') ? parseInt($(this).data('options-limit'), 10) : 8;
            var triggerStyle = _this._options.namespace + "html-select__trigger";
            if ($(this).hasClass(_this._options.namespace + "html-select--big")) {
                triggerStyle = _this._options.namespace + "html-select__trigger " + _this._options.namespace + "html-select__trigger--big";
            }
            else if ($(this).hasClass(_this._options.namespace + "html-select--light")) {
                triggerStyle = _this._options.namespace + "html-select__trigger " + _this._options.namespace + "html-select__trigger--light";
            }
            else if ($(this).hasClass(_this._options.namespace + "html-select--light-reverse")) {
                triggerStyle = _this._options.namespace + "html-select__trigger " + _this._options.namespace + "html-select__trigger--light-reverse";
            }
            _this._selectpickerOptions.size = limit;
            _this._selectpickerOptions.styleBase = triggerStyle;
            $(this).selectpicker(_this._selectpickerOptions);
        });
    };
    /**
     * Set callbacks for ${this._options.namespace}select elements
     */
    HtmlSelect.prototype._setCallbacks = function () {
        var _this = this;
        $("." + _this._options.namespace + "html-select").on('show.bs.select', function (event) {
            setTimeout(function () {
                return $(event.target).parent().addClass(_this._options.namespace + "html-select--animate");
            }, 30);
        });
        $("." + _this._options.namespace + "html-select").on('hide.bs.select', function (event) {
            $(event.target).parent().removeClass("." + _this._options.namespace + "html-select--animate");
        });
    };
    return HtmlSelect;
}());

return HtmlSelect;

})));
//# sourceMappingURL=select.js.map
