(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate')) :
    typeof define === 'function' && define.amd ? define('ccCategoryPicker', ['jquery', 'mage/translate'], factory) :
    (global.ccCategoryPicker = factory(global.jQuery,global.$t));
}(this, (function ($,$t) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;

var templates = {
    getComponentTemplate: function (classes, placeholders, disabledClass) {
        return "<div class=\"m2-input__fake-select | " + classes.input.base + " " + disabledClass + "\">" + placeholders.select + "</div>\n        <div class=\"" + classes.input.base + "-opener\"></div>\n        <div class=\"" + classes.menu.base + "\">\n            <div class=\"" + classes.search.wrapper + "\">\n                <input class=\"m2-input__input | " + classes.search.input + "\" data-role=\"advanced-select-text\" type=\"text\" placeholder=\"" + placeholders.search + "\">\n                <div class=\"" + classes.search.resultsQty + "\"></div>\n            </div>\n            <div class=\"" + classes.menu.content + "\"></div>\n            <div class=\"" + classes.search.resultsWrapper + "\"></div>\n            <div class=\"" + classes.actions.wrapper + "\">\n                <button class=\"action-default | " + classes.actions.button + "\" type=\"button\">" + placeholders.doneButton + "</button>\n            </div>\n        </div>";
    },
    getMinimalComponentTemplate: function (classes, placeholders, disabledClass) {
        return "<div class=\"m2-input__fake-select | " + classes.input.base + " " + disabledClass + "\">" + placeholders.select + "</div>\n        <div class=\"" + classes.input.base + "-opener\"></div>\n        <div class=\"" + classes.menu.base + "\">\n            <div class=\"" + classes.menu.content + "\"></div>\n            <div class=\"" + classes.actions.wrapper + "\">\n                <button class=\"action-default | " + classes.actions.button + "\" type=\"button\">" + placeholders.doneButton + "</button>\n            </div>\n        </div>";
    },
    getCrumbTemplate: function (baseClass, crumbLabel, title, inputValue) {
        return "<span class=\"" + baseClass + "__crumb\">\n            <span class=\"" + baseClass + "__crumb-text\">" + crumbLabel + "</span>\n            <button class=\"" + baseClass + "__crumb-remove\" type=\"button\" title=\"" + title + "\" tabindex=\"-1\" data-value=\"" + inputValue + "\"></button>\n        </span>";
    },
};

var CcCategoryPicker = (function () {
    /**
     * Creates new CcCategoryPicker component with optional settings.
     * @param {$output} Hidden input field that will be filled with IDs after used choses it
     * @param {data} JSON with categories data
     * @param {options}  Optional settings object.
     */
    function CcCategoryPicker($output, data, options) {
        this._defaults = {
            multiple: true,
            showChildren: true,
            showSearch: true,
            disabled: false,
            disableLastLevelItems: false,
            placeholders: {
                select: $t('Select...'),
                doneButton: $t('Done'),
                search: $t('Type category name to search...'),
            },
            classes: {
                base: 'cc-category-picker',
                input: {
                    base: 'cc-category-picker__input',
                },
                menu: {
                    base: 'cc-category-picker__box',
                    open: 'cc-category-picker__box--open',
                    content: 'cc-category-picker__box-content',
                },
                search: {
                    wrapper: 'cc-category-picker__search',
                    input: 'cc-category-picker__search-input',
                    label: 'cc-category-picker__results-label',
                    resultsQty: 'cc-category-picker__results-qty',
                    resultsWrapper: 'cc-category-picker__results',
                    resultsUL: 'cc-category-picker__results-list',
                    resultsLI: 'cc-category-picker__results-item',
                    resultsPath: 'cc-category-picker__results-path',
                },
                actions: {
                    wrapper: 'cc-category-picker__actions',
                    button: 'cc-category-picker__button',
                },
                dropdown: {
                    ul: 'cc-category-picker__dropdown',
                    li: 'cc-category-picker__dropdown-item',
                    toggler: 'cc-category-picker__dropdown-toggler',
                    label: 'cc-category-picker__label',
                    checkbox: 'cc-category-picker__checkbox',
                    radio: 'cc-category-picker__radio',
                },
            },
        };
        this._categoriesData = data;
        this._categoriesLabels = [];
        this._options = $.extend(this._defaults, options);
        this._$output = $output;
        this._$wrapper = undefined;
        this._isOpen = false;
        this._prefix = Math.random().toString(36).substring(2, 5);
        this._orderedCheckboxes = [];
        this._renderPicker();
        this._afterBuild();
        this._rebuildValues();
        this._setEvents();
    }
    /**
     * This actually controls output of all events.
     * Updates picker's crumbs and values
     * @param {inputs} Optional. Array with inputs (checkboxes, radios) - they contain all data we need to show updated picker
     */
    CcCategoryPicker.prototype.updatePicker = function (inputs) {
        var c = this._options.classes;
        var _this = this;
        var ids = $(inputs).map(function () {
            return this.value;
        }).get().join(',');
        this._categoriesLabels = $(inputs).map(function () {
            return $(this).next('label').clone().children().remove().end().text();
        });
        var crumbs = $(inputs).map(function () {
            var label = $(this).next('label').clone().children().remove().end().text();
            return templates.getCrumbTemplate(c.base, label, $t('Remove this category'), this.value);
        }).get().join('');
        this._$output[0].value = ids;
        this._$output[0].dispatchEvent(new Event('change'));
        if (crumbs !== '') {
            this._$wrapper.find("." + c.input.base).html(crumbs);
        }
        else {
            this._$wrapper.find("." + c.input.base).html(this._options.placeholders.select);
        }
        this._setCrumbsEvents();
    };
    /**
     * Opens given parent - displays its children
     * @param {$item} Parent element, of which children we want to display
     */
    CcCategoryPicker.prototype.openSubcategoriesTree = function ($item) {
        var c = this._options.classes;
        $item.find("> ." + c.dropdown.ul).toggleClass(c.dropdown.ul + "--hidden");
        $item.find("> ." + c.dropdown.li + "-content ." + c.dropdown.toggler).toggleClass(c.dropdown.toggler + "--active");
    };
    /**
     * Opens picker's box
     * @param {$wrapper} wrapper (root element) of the component, since we want to know which picker should be opened
     */
    CcCategoryPicker.prototype.openPicker = function ($wrapper) {
        // Close all open pickers if class matches
        this.closePicker($("." + this._options.classes.base));
        $wrapper.find('.m2-input__fake-select').addClass('m2-input__fake-select--active');
        $wrapper.find("." + this._options.classes.menu.base).addClass(this._options.classes.menu.base + "--open");
        this.isOpen = true;
    };
    /**
     * Closes picker's box
     * @param {$wrapper} wrapper (root element) of the component, since we want to know which picker should be closed
     */
    CcCategoryPicker.prototype.closePicker = function ($wrapper) {
        $wrapper.find('.m2-input__fake-select').removeClass('m2-input__fake-select--active');
        $wrapper.find("." + this._options.classes.menu.base).removeClass(this._options.classes.menu.base + "--open");
        this.isOpen = false;
    };
    /**
     * Rebuilds content of picker to show only children elements of given parent (category ID)
     * @param {id} ID of category
     */
    CcCategoryPicker.prototype.showChildrenOnly = function (id) {
        var target = this._getChildren(id);
        if (target.optgroup) {
            this._orderedCheckboxes = [];
            this._$wrapper.find("." + this._options.classes.menu.content).html(this._getContents(target.optgroup, '', this._options.classes.dropdown.ul + "--normal"));
            this._afterBuild(false);
            this._rebuildValues();
            this._setEvents();
        }
    };
    /**
     * Enables picker
     */
    CcCategoryPicker.prototype.enable = function () {
        this._$wrapper.find("." + this._options.classes.input.base).removeClass(this._options.classes.input.base + "--disabled");
        this._options.disabled = false;
    };
    /**
     * Disables picker
     */
    CcCategoryPicker.prototype.disable = function () {
        this._$wrapper.find("." + this._options.classes.input.base).addClass(this._options.classes.input.base + "--disabled");
        this.closePicker(this._$wrapper);
        this._options.disabled = true;
    };
    /**
     * Clears output, crumbs and inputs array
     */
    CcCategoryPicker.prototype.resetAll = function () {
        this._$output[0].value = '';
        this._$wrapper.find("." + this._options.classes.input.base).html(this._options.placeholders.select);
        this._orderedCheckboxes = [];
    };
    /**
     * Renders picker component markup and initial setup
     */
    CcCategoryPicker.prototype._renderPicker = function () {
        var c = this._options.classes;
        var t = this._options.placeholders;
        var disabledClass = this._options.disabled ? c.input.base + "--disabled" : '';
        var tpl = '';
        if (this._options.showChildren && this._options.showSearch) {
            tpl = templates.getComponentTemplate(this._options.classes, this._options.placeholders, disabledClass);
        }
        else {
            tpl = templates.getMinimalComponentTemplate(this._options.classes, this._options.placeholders, disabledClass);
        }
        this._$output.wrap("<div class=\"" + c.base + "\"></div>");
        this._$wrapper = this._$output.parent("." + c.base);
        this._$wrapper.append(tpl);
        this._$wrapper.find("." + c.menu.content).html(this._getContents(this._categoriesData.optgroup, ''));
    };
    /**
     * Renders new options list based on given catehories data
     * @param {data} Array of categories
     */
    CcCategoryPicker.prototype._renderSearchResults = function (data) {
        var c = this._options.classes;
        var _this = this;
        var result = '';
        this._$wrapper.find("." + c.search.resultsWrapper).html('');
        if (data.length) {
            result += "<ul class=\"" + c.search.resultsUL + "\">";
            for (var i = 0; i < data.length; i++) {
                var path = $(data[i].path).map(function () {
                    return this;
                }).get().join(' / ');
                var checked = $("#cp-" + this._prefix + "-" + data[i].value).prop('checked') ? 'checked' : '';
                var disabled = $("#cp-" + this._prefix + "-" + data[i].value).prop('disabled') ? 'disabled' : '';
                result += "<li class=\"" + c.search.resultsLI + "\" role=\"option-group\">";
                if (this._options.multiple) {
                    result += "<div class=\"m2-input m2-input--type-checkbox\">\n                        <input class=\"m2-input__checkbox | " + c.dropdown.checkbox + "\" type=\"checkbox\" value=\"" + data[i].value + "\" name=\"cp-sr-" + this._prefix + "[]\" id=\"cp-sr-" + this._prefix + "-" + data[i].value + "\" tabindex=\"-1\" " + checked + " " + disabled + ">";
                }
                else {
                    result += "<div class=\"m2-input m2-input--type-radio\">\n                        <input class=\"m2-input__radio | " + c.dropdown.radio + "\" type=\"radio\" value=\"" + data[i].value + "\" name=\"cp-sr-" + this._prefix + "[]\" id=\"cp-sr-" + this._prefix + "-" + data[i].value + "\" tabindex=\"-1\" " + checked + " " + disabled + ">";
                }
                result += "<label for=\"cp-sr-" + this._prefix + "-" + data[i].value + "\" class=\"m2-input__label | " + c.search.label + "\">\n                    " + data[i].label + " \n                    <span class=\"" + c.search.resultsPath + "\">" + path + "</span>\n                </label></div>\n                </li>";
            }
            result += '</ul>';
        }
        this._$wrapper.find("." + c.search.resultsWrapper).html(result);
        this._$wrapper.find("." + c.search.resultsUL + " input[type=\"checkbox\"]").off('change').on('change', function () {
            _this._$wrapper.find("." + c.menu.content + " :input[value=\"" + this.value + "\"]").trigger('click');
        });
        var text = data.length === 1 ? data.length + " " + $t('Result') : data.length + " " + $t('Results');
        this._$wrapper.find("." + this._options.classes.search.resultsQty).html(text);
        this._setEvents();
    };
    /**
     * Recursive method to filter categories by label based on given query (string or its part)
     * @param {category} root category to start from
     * @param {query} string that we look for in category labels
     * @param {path} Path to the subcategory (used to display crumbs)
     * @return {categories} Array of filtered categories
     */
    CcCategoryPicker.prototype._getByQuery = function (category, query, path) {
        var _this = this;
        if (path === void 0) { path = []; }
        var categories = [];
        if (category.is_active === '1' && category.label && category.label.match(new RegExp(query, 'i'))) {
            categories.push({
                label: category.label,
                value: category.value,
                path: path,
            });
        }
        if (category.optgroup) {
            var categoryPath_1 = category.label ? path.concat([category.label]) : [];
            category.optgroup.forEach(function (subcategory) {
                _this._getByQuery(subcategory, query, categoryPath_1).map(function (cat) {
                    if (subcategory.is_active === '1') {
                        return categories.push(cat);
                    }
                });
            });
        }
        return categories;
    };
    /**
     * Recursive methods to filter categories collection to get only children of given ID
     * @param {id} ID of category to filter
     * @param {children} Optional - Array of children of a category
     * @return {result} Filtered array of children
     */
    CcCategoryPicker.prototype._getChildren = function (id, children) {
        var collection = children || this._categoriesData;
        if (collection.value && collection.value === id) {
            return collection;
        }
        if (collection.optgroup) {
            var c = collection.optgroup;
            for (var i = 0; i < c.length; i++) {
                var result = this._getChildren(id, c[i]);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    };
    /**
     * Recursive method to render list with categories as a radios / checkboxes using
     * @param {categories} Array with categories
     * @param {str} Current HTML markup of the list
     * @param {dropdownModifier} Modifier class for dropdown for styling purposes
     * @return {str} HTML markup of options list
     */
    CcCategoryPicker.prototype._getContents = function (categories, str, dropdownModifier) {
        var c = this._options.classes;
        if (!dropdownModifier) {
            dropdownModifier = '';
        }
        str += "<ul class=\"" + c.dropdown.ul + " " + c.dropdown.ul + "--hidden " + dropdownModifier + "\">";
        /**
         * Loop through categories array and find optgroups.
         * Then make a UL element out of each optgroup and build general markup
         */
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].is_active === '1') {
                var checked = $("#cp-" + this._prefix + "-" + categories[i].value).prop('checked') ? 'checked' : '';
                str += "<li class=\"" + c.dropdown.li + "\" data-role=\"option-group\">";
                if (this._options.multiple) {
                    str += "<div class=\"m2-input m2-input--type-checkbox | " + c.dropdown.li + "-content\">\n                        <input class=\"m2-input__checkbox | " + c.dropdown.checkbox + "\" type=\"checkbox\" value=\"" + categories[i].value + "\" name=\"cp-" + this._prefix + "[]\" id=\"cp-" + this._prefix + "-" + categories[i].value + "\" tabindex=\"-1\" " + checked + ">";
                }
                else {
                    str += "<div class=\"m2-input m2-input--type-radio | " + c.dropdown.li + "-content\">\n                        <input class=\"m2-input__radio | " + c.dropdown.radio + "\" type=\"radio\" value=\"" + categories[i].value + "\" name=\"cp-" + this._prefix + "[]\" id=\"cp-" + this._prefix + "-" + categories[i].value + "\" tabindex=\"-1\" " + checked + ">";
                }
                str += "<label for=\"cp-" + this._prefix + "-" + categories[i].value + "\" class=\"m2-input__label | " + c.dropdown.label + "\">" + categories[i].label + "</label>";
                if (categories[i].optgroup && categories[i].optgroup.length && this._options.showChildren) {
                    str += "<div class=\"" + c.dropdown.toggler + "\"></div></div>\n                        " + this._getContents(categories[i].optgroup, '');
                }
                else {
                    str += '</div>';
                }
                str += '</li>';
            }
        }
        str += '</ul>';
        return str;
    };
    /**
     * Adjusts markup after it is build
     */
    CcCategoryPicker.prototype._afterBuild = function (openSubTree) {
        if (openSubTree === void 0) { openSubTree = true; }
        var c = this._options.classes;
        var _this = this;
        this._$wrapper.find("." + c.menu.content + " > ." + c.dropdown.ul).removeClass(c.dropdown.ul + "--hidden");
        if (openSubTree) {
            this.openSubcategoriesTree(this._$wrapper.find("." + c.menu.content + " > ul > li:first-child"));
        }
        this._$wrapper.find("." + c.dropdown.li).each(function () {
            if ($(this).find("." + c.dropdown.ul).length) {
                $(this).addClass(c.dropdown.li + "--has-children");
            }
            else if (_this._options.disableLastLevelItems) {
                $(this).addClass(c.dropdown.li + "--disabled").find('input').prop('disabled', true);
            }
        });
    };
    /**
     * Support for exising value. If there is already some input (category IDs) in $output field
     * then it constrols initialization to setup those categories in picker's output HTML
     */
    CcCategoryPicker.prototype._rebuildValues = function () {
        if (this._$output[0].value !== '') {
            var values = this._$output[0].value.split(',');
            for (var i = 0; i < values.length; i++) {
                var $cb = this._$wrapper.find("." + this._options.classes.menu.content + " input[value=\"" + values[i] + "\"]");
                $cb.prop('checked', true);
                this._orderedCheckboxes.push($cb[0]);
            }
            this.updatePicker(this._orderedCheckboxes);
        }
    };
    /**
     * Sets most of events of picker
     */
    CcCategoryPicker.prototype._setEvents = function () {
        var c = this._options.classes;
        var _this = this;
        var fKeys = [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]; // F1-F12
        var listen = /^[a-z0-9]+$/i;
        this._$wrapper.find("." + c.input.base + "-opener").off('click').on('click', function () {
            if (_this.isOpen) {
                _this.closePicker($(this).parents("." + c.base));
            }
            else {
                _this.openPicker($(this).parents("." + c.base));
            }
        });
        this._$wrapper.find("." + c.actions.button).off('click').on('click', function () {
            _this.closePicker($(this).parents("." + c.base));
        });
        this._$wrapper.find("." + c.dropdown.toggler).off('click').on('click', function () {
            _this.openSubcategoriesTree($(this).parents("." + c.dropdown.li).first());
        });
        this._$wrapper.find("." + c.menu.content + " input[type=\"checkbox\"]").off('change').on('change', function () {
            var idx = _this._orderedCheckboxes.indexOf(this);
            if (idx !== -1) {
                _this._orderedCheckboxes.splice(idx, 1);
            }
            if (this.checked) {
                _this._orderedCheckboxes.push(this);
            }
            for (var i = void 0; i < _this._orderedCheckboxes.length; i++) {
                val = _this._orderedCheckboxes[i].value;
                if (_this._$wrapper.find("." + c.search.resultsUL + " input[value=\"" + val + "\"]").length) {
                    _this._$wrapper.find("." + c.menu.content + " input[value=\"" + val + "\"]").prop('checked', true);
                }
            }
            _this.updatePicker(_this._orderedCheckboxes);
        });
        this._$wrapper.find("." + c.menu.base + " input[type=\"radio\"]").off('change').on('change', function () {
            if (_this._$wrapper.find("." + c.search.resultsUL + " input[value=\"" + this.value + "\"]").length) {
                _this._$wrapper.find("." + c.menu.content + " input[value=\"" + this.value + "\"]").prop('checked', true);
            }
            _this.updatePicker(this);
        });
        this._$wrapper.find("." + c.search.input).off('keydown keyup').on({
            keydown: function (e) {
                if (this.value.length > 1) {
                    var key = String.fromCharCode(e.keyCode).toLowerCase();
                    if (key.match(listen) && fKeys.indexOf(e.which) === -1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                        _this._renderSearchResults(_this._getByQuery(_this._categoriesData, this.value));
                    }
                }
            },
            keyup: function () {
                if (this.value.length > 2) {
                    _this._$wrapper.find("." + c.search.resultsWrapper).show();
                    _this._$wrapper.find("." + c.search.resultsQty).show();
                    _this._$wrapper.find("." + c.menu.content).hide();
                }
                else {
                    _this._$wrapper.find("." + c.search.resultsWrapper).hide();
                    _this._$wrapper.find("." + c.search.resultsQty).hide();
                    _this._$wrapper.find("." + c.menu.content).show();
                }
            },
        });
    };
    /**
     * Controls crumbs in picker's select field
     */
    CcCategoryPicker.prototype._setCrumbsEvents = function () {
        var _this = this;
        this._$wrapper.find("." + _this._options.classes.base + "__crumb-remove").off('click').on('click', function (e) {
            var $target = _this._$wrapper.find("." + _this._options.classes.menu.content + " input[value=\"" + $(this).data('value') + "\"]");
            var $srTarget = _this._$wrapper.find("." + _this._options.classes.search.resultsWrapper + " input[value=\"" + $(this).data('value') + "\"]");
            if (_this._options.multiple) {
                $target.click();
            }
            else {
                if ($target.prop('checked')) {
                    $target.prop('checked', false);
                    _this.updatePicker();
                }
            }
            if ($srTarget.length) {
                $srTarget.prop('checked', !$srTarget.prop('checked'));
            }
            e.preventDefault();
        });
    };
    return CcCategoryPicker;
}());

return CcCategoryPicker;

})));
//# sourceMappingURL=cc-category-picker.js.map
