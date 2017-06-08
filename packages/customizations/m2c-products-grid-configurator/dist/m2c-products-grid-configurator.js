(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate')) :
    typeof define === 'function' && define.amd ? define('m2cProductsGridConfigurator', ['jquery', 'mage/translate'], factory) :
    (global.m2cProductsGridConfigurator = factory(global.jQuery,global.$t));
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
                empty: $t('There are no categories matching your selection'),
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
        else {
            this._$wrapper.find("." + this._options.classes.menu.content).html(this._options.placeholders.empty);
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
            tpl = templates.getComponentTemplate(c, t, disabledClass);
        }
        else {
            tpl = templates.getMinimalComponentTemplate(c, t, disabledClass);
        }
        this._$output.wrap("<div class=\"" + c.base + "\"></div>");
        this._$wrapper = this._$output.parent("." + c.base);
        this._$wrapper.append(tpl);
        if (this._categoriesData.optgroup) {
            this._$wrapper.find("." + c.menu.content).html(this._getContents(this._categoriesData.optgroup, ''));
        }
        else {
            this._$wrapper.find("." + c.menu.content).html(t.empty);
        }
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
                if ($cb.length) {
                    $cb.prop('checked', true);
                    this._orderedCheckboxes.push($cb[0]);
                }
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

/**
 * Base configurator component.
 * This component is responsible for providing base functionality for other configurators.
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentConfigurator = {
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        /**
         * Property containing callback triggered when user saves component.
         * For default, we are providing a dummy function so we can skip the type check.
         */
        save: {
            type: Function,
            default: function () { return function () { return undefined; }; },
        },
        /**
         * Property containing callback triggered when configuration is changed.
         * For default, we are providing a dummy function so we can skip the type check.
         */
        change: {
            type: Function,
            default: function () { return function () { return undefined; }; },
        },
        /**
         *
         */
        configuration: {
            type: String,
            default: function () { },
        },
    },
    methods: {
        onChange: function (event) {
            // Serialize reactive data.
            var data = JSON.parse(JSON.stringify(this.configuration));
            // Trigger event and callback.
            this.$dispatch('cc-component-configurator__changed', data);
            this.change(data);
        },
        onSave: function (event) {
            // Serialize reactive data.
            var data = JSON.parse(JSON.stringify(this.configuration));
            // Trigger event and callback.
            this.$dispatch('cc-component-configurator__saved', data);
            this.save(data);
        },
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            if (this._events['cc-component-configurator__save'].length === 1) {
                this.onSave();
            }
        },
    },
};

/**
 * Action button component version.
 * Small component that allows to set it's content.
 *
 * @type {vuejs.ComponentOption} Vue component object.
 */
var actionButton = {
    template: "<button class=\"action-button {{ class }}\" @click=\"_onClick\">\n        <slot></slot>\n    </button>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
    methods: {
        /**
         * Button click handler.
         * This handler triggers "action-button__click" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        _onClick: function (event) {
            this.$dispatch('action-button__click', event);
        },
    },
};

/**
 * Component actions component.
 * This component is responsible for displaying and handling user interactions of
 * side utility navigation for each component that supports:
 * - Moving component up,
 * - Moving component down,
 * - Opening component settings,
 * - Deleting component.
 *
 * @type {vuejs.ComponentOption} Vue component object.
 */
var componentActions = {
    template: "<aside class=\"cc-component-actions | {{ class }}\">\n        <div class=\"cc-component-actions__buttons\">\n            <slot name=\"cc-component-actions__buttons\"></slot>\n        </div>\n    </aside>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) { return value.replace('cc-component-actions', ''); },
        },
    },
};

/**
 * Product grid configurator component.
 * This component is responsible for displaying products grid  configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccProductsGridConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-products-grid-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cc-products-grid-configurator__columns\">\n        <div class=\"cc-products-grid-configurator__column-left\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-category\" class=\"cs-input__label\">Select Category:</label>\n                <input type=\"text\" name=\"cfg-pg-category-select\" class=\"cs-input__input\" id=\"cfg-pg-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-order-by\" class=\"cs-input__label\">Order by:</label>\n                <select name=\"cfg-pg-order-by\" class=\"cs-input__select\" id=\"cfg-pg-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                    <option value=\"creation_date\">Creation date:</option>\n                    <option value=\"price\">Price:</option>\n                </select>\n                <select name=\"cfg-pg-order-type\" class=\"cs-input__select\" v-model=\"configuration.order_type\" @change=\"onChange\">\n                    <option value=\"ASC\">ASC</option>\n                    <option value=\"DESC\">DESC</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_desktop\" class=\"cs-input__label\">Rows desktop:</label>\n                <select name=\"cfg-pg-rows_desktop\" class=\"cs-input__select\" id=\"cfg-pg-rows_desktop\" v-model=\"configuration.rows_desktop\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_tablet\" class=\"cs-input__label\">Rows tablet:</label>\n                <select name=\"cfg-pg-rows_tablet\" class=\"cs-input__select\" id=\"cfg-pg-rows_tablet\" v-model=\"configuration.rows_tablet\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_mobile\" class=\"cs-input__label\">Rows mobile:</label>\n                <select name=\"cfg-pg-rows_mobile\" class=\"cs-input__select\" id=\"cfg-pg-rows_mobile\" v-model=\"configuration.rows_mobile\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"cc-products-grid-configurator__column-right\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-hero\" class=\"cs-input__label\">Hero image:</label>\n                <select name=\"cfg-pg-hero\" class=\"cs-input__select\" id=\"cfg-pg-hero\" v-model=\"configuration.hero\" @change=\"onChange\">\n                    <option value=\"\" selected=\"selected\">No hero image</option>\n                    <option value=\"1\">Left</option>\n                    <option value=\"2\">Right</option>\n                </select>\n            </div>\n\n            <div class=\"cs-input\" v-if=\"configuration.hero\">\n\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_image\" class=\"cs-input__label\">Upload image:</label>\n                    <a href=\"#\" class=\"\" href=\"#\">Upload image</a>\n                    <input type=\"hidden\" name=\"cfg-pg-hero_image\" class=\"cs-input__input\" id=\"cfg-pg-hero_image\" v-model=\"configuration.hero_image\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_headline\" class=\"cs-input__label\">Headline:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_headline\" class=\"cs-input__input\" id=\"cfg-pg-hero_headline\" v-model=\"configuration.hero_headline\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_subheadline\" class=\"cs-input__label\">Subheadline:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_subheadline\" class=\"cs-input__input\" id=\"cfg-pg-hero_subheadline\" v-model=\"configuration.hero_subheadline\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_url\" class=\"cs-input__label\">Url:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_url\" class=\"cs-input__input\" id=\"cfg-pg-hero_url\" v-model=\"configuration.hero_url\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_button_label\" class=\"cs-input__label\">CTA button label:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_button_label\" class=\"cs-input__input\" id=\"cfg-pg-hero_button_label\" v-model=\"configuration.button_label\" @change=\"onChange\">\n                </div>\n\n            </div>\n        </div>\n        </div>\n\n        <button type=\"submit\">Save</button>\n    </form>",
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-actions': componentActions,
    },
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'ASC',
                    rows_desktop: 2,
                    rows_tablet: 2,
                    rows_mobile: 2,
                    hero_image: '',
                    hero_headline: '',
                    hero_subheadline: '',
                    hero_url: '',
                    hero_button_label: '',
                };
            },
        },
    }
};

/**
 * Product grid configurator component.
 * This component is responsible for displaying products grid  configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var m2cProductsGridConfigurator = {
    mixins: [
        ccProductsGridConfigurator,
    ],
    template: "<div class=\"m2c-products-grid-configurator {{ classes }} | {{ mix }}\" {{ attributes }}>\n        <section class=\"m2c-products-grid-configurator__section\">\n            <h3 class=\"m2c-products-grid-configurator__subtitle\">" + $t('Data source') + ":</h3>\n            <div class=\"m2c-products-grid-configurator__scenario-options m2c-products-grid-configurator__scenario-options--inputs\">\n                <div class=\"m2-input m2-input--type-inline | m2c-products-grid-configurator__section-option\">\n                    <label for=\"cfg-pg-category\" class=\"m2-input__label | m2c-products-grid-configurator__section-option-label\">" + $t('Category ID') + ":</label>\n                    <select class=\"m2-input__select tmp-select\" style=\"width:25em\">\n                        <option>" + $t('Select...') + "</option>\n                    </select>\n                    <input type=\"hidden\" name=\"cfg-pg-category-select\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n                </div>\n                <div class=\"m2-input m2-input--type-inline | m2c-products-grid-configurator__section-option\">\n                    <label for=\"cfg-pg-order-by\" class=\"m2-input__label | m2c-products-grid-configurator__section-option-label\">" + $t('Order by') + ":</label>\n                    <select name=\"cfg-pg-order-by\" class=\"m2-input__select\" id=\"cfg-pg-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                        <option value=\"creation_date\">" + $t('Creation date') + "</option>\n                        <option value=\"price\">" + $t('Price') + "</option>\n                    </select>\n                    <select name=\"cfg-pg-order-type\" class=\"m2-input__select\" v-model=\"configuration.order_type\" @change=\"onChange\">\n                        <option value=\"ASC\">" + $t('Ascending') + "</option>\n                        <option value=\"DESC\">" + $t('Descending') + "</option>\n                    </select>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"m2c-products-grid-configurator__section\">\n            <h3 class=\"m2c-products-grid-configurator__subtitle\">" + $t('Mobile Layout') + ":</h3>\n            <div class=\"m2c-products-grid-configurator__scenario-options\">\n                <ul class=\"m2c-products-grid-configurator__scenario-options-list\">\n                    <li\n                        :class=\"{\n                            'm2c-products-grid-configurator__option--selected': configuration.rows_mobile == optionId,\n                        }\"\n                        class=\"m2c-products-grid-configurator__option\"\n                        v-for=\"(optionId, option) in scenarioOptions.rows_mobile\"\n                        @click=\"setOption('rows_mobile', optionId)\">\n                        <div class=\"m2c-products-grid-configurator__option-wrapper\">\n                            <svg class=\"m2c-products-grid-configurator__option-icon\">\n                                <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                            </svg>\n                        </div>\n                        <p class=\"m2c-products-grid-configurator__option-name\">\n                            {{ option.name }}\n                        </p>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"m2c-products-grid-configurator__section\">\n            <h3 class=\"m2c-products-grid-configurator__subtitle\">" + $t('Tablet Layout') + ":</h3>\n            <div class=\"m2c-products-grid-configurator__scenario-options\">\n                <ul class=\"m2c-products-grid-configurator__scenario-options-list\">\n                    <li\n                        :class=\"{\n                            'm2c-products-grid-configurator__option--selected': configuration.rows_tablet == optionId,\n                        }\"\n                        class=\"m2c-products-grid-configurator__option\"\n                        v-for=\"(optionId, option) in scenarioOptions.rows_tablet\"\n                        @click=\"setOption('rows_tablet', optionId)\">\n                        <div class=\"m2c-products-grid-configurator__option-wrapper\">\n                            <svg class=\"m2c-products-grid-configurator__option-icon\">\n                                <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                            </svg>\n                        </div>\n                        <p class=\"m2c-products-grid-configurator__option-name\">\n                            {{ option.name }}\n                        </p>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"m2c-products-grid-configurator__section\">\n            <h3 class=\"m2c-products-grid-configurator__subtitle\">" + $t('Desktop Layout') + ":</h3>\n            <div class=\"m2c-products-grid-configurator__scenario-options\">\n                <ul class=\"m2c-products-grid-configurator__scenario-options-list\">\n                    <li\n                        :class=\"{\n                            'm2c-products-grid-configurator__option--selected': configuration.rows_desktop == optionId,\n                        }\"\n                        class=\"m2c-products-grid-configurator__option\"\n                        v-for=\"(optionId, option) in scenarioOptions.rows_desktop\"\n                        @click=\"setOption('rows_desktop', optionId)\">\n                        <div class=\"m2c-products-grid-configurator__option-wrapper\">\n                            <svg class=\"m2c-products-grid-configurator__option-icon\">\n                                <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                            </svg>\n                        </div>\n                        <p class=\"m2c-products-grid-configurator__option-name\">\n                            {{ option.name }}\n                        </p>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"m2c-products-grid-configurator__section\">\n            <h3 class=\"m2c-products-grid-configurator__subtitle\">" + $t('Hero Teaser') + ":</h3>\n            <div class=\"m2c-products-grid-configurator__scenario-options\">\n                <ul class=\"m2c-products-grid-configurator__scenario-options-list\">\n                    <li\n                        :class=\"{\n                            'm2c-products-grid-configurator__option--selected': configuration.hero.position == optionId,\n                        }\"\n                        class=\"m2c-products-grid-configurator__option\"\n                        v-for=\"(optionId, option) in scenarioOptions.hero.position\"\n                        @click=\"setOption('hero', optionId, 'position')\">\n                        <div class=\"m2c-products-grid-configurator__option-wrapper\">\n                            <svg class=\"m2c-products-grid-configurator__option-icon\">\n                                <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                            </svg>\n                        </div>\n                        <p class=\"m2c-products-grid-configurator__option-name\">\n                            {{ option.name }}\n                        </p>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <div class=\"m2c-products-grid-configurator__item\" v-show=\"configuration.hero.position\">\n            <div class=\"m2c-hero-carousel-configurator__item-content\">\n                <div v-bind:class=\"[ 'm2c-products-grid-configurator__item-col-left', configuration.hero.image.src ? 'm2c-products-grid-configurator__item-col-left--look-image-uploaded' : '' ]\">\n                    <div class=\"m2c-products-grid-configurator__item-image-wrapper\">\n                        <img :src=\"configuration.hero.image.src\" class=\"m2c-image-teaser-configurator__item-image\" v-show=\"configuration.hero.image.src\">\n                        <input type=\"hidden\" v-model=\"configuration.hero.image.src\">\n                        <input type=\"hidden\" class=\"m2c-products-grid-configurator__image-url\" id=\"products-grid-img\">\n                        <svg class=\"m2c-products-grid-configurator__item-image-placeholder\" v-show=\"!configuration.hero.image.src\">\n                            <use xlink:href=\"#icon_image-placeholder\"></use>\n                        </svg>\n\n                        <div class=\"m2c-products-grid-configurator__item-actions\">\n                            <cc-component-actions>\n                                <template slot=\"cc-component-actions__buttons\">\n                                    <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon | cc-component-actions__button cc-component-actions__button--upload-image | m2c-products-grid-configurator__item-action-button\" @click=\"getImageUploader()\">\n                                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                <use xlink:href=\"#icon_upload-image\"></use>\n                                            </svg>\n                                            {{ configuration.hero.image.src ? imageUploadedText : noImageUploadedText }}\n                                    </button>\n                                </template>\n                            </cc-component-actions>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"m2c-products-grid-configurator__item-col-right\">\n                    <div class=\"m2-input m2-input--group\">\n                        <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                            <label for=\"cfg-pg-hero_content-position-variant\" class=\"m2-input__label\">" + $t('Display variant') + ":</label>\n                            <select name=\"cfg-pg-hero_content-position-variant\" class=\"m2-input__select\" id=\"cfg-pg-hero_content-position-variant\" v-model=\"configuration.hero.displayVariant\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                <option value=\"1\">" + $t('Text vertically centered on the left') + "</option>\n                                <option value=\"3\">" + $t('Text vertically centered in the middle') + "</option>\n                                <option value=\"2\">" + $t('Text on the bottom, left corner') + "</option>\n                                <option value=\"4\">" + $t('Text on the bottom - centered') + "</option>\n                            </select>\n                        </div>\n                        <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                            <label for=\"cfg-pg-hero_color-scheme\" class=\"m2-input__label\">" + $t('Text color scheme') + ":</label>\n                            <select name=\"cfg-pg-hero_color-scheme\" class=\"m2-input__select\" id=\"cfg-pg-hero_color-scheme\" v-model=\"configuration.hero.colorScheme\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                <option value=\"light\">" + $t('Light') + "</option>\n                                <option value=\"dark\">" + $t('Dark') + "</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"m2-input | m2c-products-grid-configurator__item-form-element\">\n                        <label for=\"cfg-pg-hero_headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_headline\" class=\"m2-input__input\" id=\"cfg-pg-hero_headline\" v-model=\"configuration.hero.headline\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input | m2c-products-grid-configurator__item-form-element\">\n                        <label for=\"cfg-pg-hero_subheadline\" class=\"m2-input__label\">" + $t('Subheadline') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_subheadline\" class=\"m2-input__input\" id=\"cfg-pg-hero_subheadline\" v-model=\"configuration.hero.subheadline\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input | m2c-products-grid-configurator__item-form-element\">\n                        <label for=\"cfg-pg-hero_paragraph\" class=\"m2-input__label | m2c-products-grid-configurator__form-label--textarea\">" + $t('Paragraph') + ":</label>\n                        <textarea type=\"text\" name=\"cfg-pg-hero_paragraph\" class=\"m2-input__textarea\" id=\"cfg-pg-hero_paragraph\" placeholder=\"" + $t('(max 200 characters)') + "\" maxlength=\"200\" v-model=\"configuration.hero.paragraph\"></textarea>\n                    </div>\n                    <div class=\"m2-input m2-input--group\">\n                        <div class=\"m2-input | m2c-products-grid-configurator__item-form-element\">\n                            <label for=\"cfg-pg-hero_button_label\" class=\"m2-input__label\">" + $t('Button label') + ":</label>\n                            <input type=\"text\" name=\"cfg-pg-hero_button_label\" class=\"m2-input__input\" id=\"cfg-pg-hero_button_label\" v-model=\"configuration.hero.button.label\" @change=\"onChange\">\n                        </div>\n                        <div class=\"m2-input m2-input--type-addon | m2c-products-grid-configurator__item-form-element\">\n                            <label for=\"cfg-pg-hero_url\" class=\"m2-input__label\">" + $t('Url') + ":</label>\n                            <input type=\"text\" name=\"cfg-pg-hero_url\" class=\"m2-input__input | m2c-products-grid__hero-url\" id=\"cfg-pg-hero_url\" v-model=\"configuration.hero.href\">\n                            <span class=\"m2-input__addon | m2c-products-grid-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal()\">\n                                <svg class=\"m2-input__addon-icon\">\n                                    <use xlink:href=\"#icon_link\"></use>\n                                </svg>\n                            </span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'ASC',
                    rows_desktop: 2,
                    rows_tablet: 2,
                    rows_mobile: 2,
                    hero: {
                        position: '',
                        image: {
                            src: '',
                            alt: '',
                        },
                        displayVariant: '1',
                        colorScheme: 'light',
                        headline: '',
                        subheadline: '',
                        paragraph: '',
                        href: '',
                        button: {
                            label: '',
                        },
                        decoded_image: '',
                        size_info: '',
                    },
                };
            },
        },
        /* get assets for displaying component images */
        assetsSrc: {
            type: String,
            default: '',
        },
        /* Obtain base-url for the image uploader */
        uploaderBaseUrl: {
            type: String,
            default: '',
        },
        /* Obtain image endpoint to place permanent url for uploaded images */
        imageEndpoint: {
            type: String,
            default: '',
        },
        /* Obtain endpoint for getting categories data for category picker */
        categoriesDataUrl: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            imageUploadedText: $t('Change'),
            noImageUploadedText: $t('Upload'),
            categoryPicker: undefined,
            scenarioOptions: {
                rows_mobile: {
                    2: {
                        name: $t('2 rows of products'),
                        iconId: 'pr_2',
                    },
                    3: {
                        name: $t('3 rows of products'),
                        iconId: 'pr_3',
                    },
                    4: {
                        name: $t('4 rows of products'),
                        iconId: 'pr_4',
                    },
                },
                rows_tablet: {
                    2: {
                        name: $t('2 rows of products'),
                        iconId: 'pr_2',
                    },
                    3: {
                        name: $t('3 rows of products'),
                        iconId: 'pr_3',
                    },
                    4: {
                        name: $t('4 rows of products'),
                        iconId: 'pr_4',
                    },
                },
                rows_desktop: {
                    2: {
                        name: $t('2 rows of products'),
                        iconId: 'pr_2',
                    },
                    3: {
                        name: $t('3 rows of products'),
                        iconId: 'pr_3',
                    },
                    4: {
                        name: $t('4 rows of products'),
                        iconId: 'pr_4',
                    },
                },
                hero: {
                    position: {
                        '': {
                            name: $t('No Hero Teaser'),
                            iconId: 'no_teaser',
                        },
                        'left': {
                            name: $t('Hero Teaser on the left'),
                            iconId: 'teaser_left',
                        },
                        'right': {
                            name: $t('Hero Teaser on the right'),
                            iconId: 'teaser_right',
                        }
                    }
                },
            },
        };
    },
    methods: {
        setOption: function (optionCategory, optionId, key) {
            //this.configuration[ optionCategory ] = this.scenarioOptions[ optionCategory ][ optionId ];
            if (key) {
                this.configuration[optionCategory][key] = optionId;
            }
            else {
                this.configuration[optionCategory] = optionId;
            }
        },
        /* Opens M2's built-in image manager modal.
         * Manages all images: image upload from hdd, select image that was already uploaded to server.
         * @param index {number} - index of image of image teaser.
         */
        getImageUploader: function (index) {
            MediabrowserUtility.openDialog(this.uploaderBaseUrl + "target_element_id/products-grid-img/", 'auto', 'auto', $t('Insert File...'), {
                closed: true,
            });
        },
        /* Listener for image uploader
         * Since Magento does not provide any callback after image has been chosen
         * we have to watch for target where decoded url is placed
         */
        imageUploadListener: function () {
            var component = this;
            var isAlreadyCalled = false;
            // jQuery has to be used, for some reason native addEventListener doesn't catch change of input's value
            $(document).on('change', '.m2c-products-grid-configurator__image-url', function (event) {
                if (!isAlreadyCalled) {
                    isAlreadyCalled = true;
                    component.onImageUploaded(event.target);
                    setTimeout(function () {
                        isAlreadyCalled = false;
                    }, 100);
                }
            });
        },
        /* Action after image was uploaded
         * URL is encoded, so strip it and decode Base64 to get {{ media url="..."}} format
         * which will go to the items.image and will be used to display image on front end
         * @param input { object } - input with raw image path which is used in admin panel
         */
        onImageUploaded: function (input) {
            var _this = this;
            // const itemIndex: any = input.id.substr( input.id.length - 1 );
            var encodedImage = input.value.match('___directive\/([a-zA-Z0-9]*)')[1];
            var imgEndpoint = this.imageEndpoint.replace('{/encoded_image}', encodedImage);
            this.configuration.hero.decoded_image = Base64 ? Base64.decode(encodedImage) : window.atob(encodedImage);
            var img = new Image();
            img.onload = function () {
                var ar = _this.getAspectRatio(img.naturalWidth, img.naturalHeight);
                _this.configuration.hero.image.src = img.getAttribute('src');
                _this.configuration.hero.size_info = img.naturalWidth + "x" + img.naturalHeight + "px (" + ar + ")";
                _this.onChange();
            };
            img.src = imgEndpoint;
        },
        /* Returns greatest common divisor for 2 numbers
         * @param a {number}
         * @param b {number}
         * @return {number} - greatest common divisor
         */
        getGreatestCommonDivisor: function (a, b) {
            if (!b) {
                return a;
            }
            return this.getGreatestCommonDivisor(b, a % b);
        },
        /* Returns Aspect ratio for 2 numbers based on GDC algoritm (greatest common divisor)
         * @param a {number}
         * @param b {number}
         * @return {number} - greatest common divisor
         */
        getAspectRatio: function (a, b) {
            var c = this.getGreatestCommonDivisor(a, b);
            return (a / c) + ":" + (b / c);
        },
        /*
         * Opens modal with M2 built-in widget chooser
         */
        openCtaTargetModal: function () {
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/cfg-pg-hero_url");
            this.wWidgetListener();
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.ctaTarget is changed
         */
        widgetSetListener: function () {
            var component = this;
            $('.m2c-products-grid__hero-url').on('change', function () {
                component.onChange();
            });
        },
        /*
         * Check if widget chooser is loaded. If not, wait for it, if yes:
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         */
        wWidgetListener: function () {
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                var _this_1 = this;
                var button = widgetTools.dialogWindow[0].querySelector('#insert_button');
                button.onclick = null;
                button.addEventListener('click', function () {
                    _this_1.configuration.hero.href = '';
                    wWidget.insertWidget();
                });
            }
            else {
                setTimeout(this.wWidgetListener, 300);
            }
        },
    },
    ready: function () {
        var _this = this;
        // Show loader
        $('body').trigger('showLoadingPopup');
        // Get categories JSON with AJAX
        this.$http.get(this.categoriesDataUrl).then(function (response) {
            _this.categoryPicker = new CcCategoryPicker($('#cfg-pg-category'), JSON.parse(response.body), {
                multiple: false,
            });
            // Hide loader
            $('body').trigger('hideLoadingPopup');
            $('.tmp-select').remove();
        });
        this.imageUploadListener();
        this.widgetSetListener();
    },
};

return m2cProductsGridConfigurator;

})));
//# sourceMappingURL=m2c-products-grid-configurator.js.map
