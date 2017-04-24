(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('Vue'), require('VueResource'), require('mage/translate'), require('Magento_Ui/js/modal/modal'), require('uiRegistry'), require('loadingPopup'), require('Magento_Ui/js/modal/alert'), require('Magento_Ui/js/modal/confirm')) :
    typeof define === 'function' && define.amd ? define('m2cContentConstructor', ['jquery', 'Vue', 'VueResource', 'mage/translate', 'Magento_Ui/js/modal/modal', 'uiRegistry', 'loadingPopup', 'Magento_Ui/js/modal/alert', 'Magento_Ui/js/modal/confirm'], factory) :
    (global.m2cContentConstructor = factory(global.jQuery,global.Vue,global.vr,global.$t,global.modal,global.uiRegistry,global.loadingPopup,global.alert,global.confirm));
}(this, (function ($,Vue,vr,$t,modal,uiRegistry,loadingPopup,alert,confirm) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
Vue = 'default' in Vue ? Vue['default'] : Vue;
vr = 'default' in vr ? vr['default'] : vr;
$t = 'default' in $t ? $t['default'] : $t;
modal = 'default' in modal ? modal['default'] : modal;
uiRegistry = 'default' in uiRegistry ? uiRegistry['default'] : uiRegistry;
alert = 'default' in alert ? alert['default'] : alert;
confirm = 'default' in confirm ? confirm['default'] : confirm;

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
 * button configurator component.
 * This component is responsible for displaying buttons configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccButtonConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-button-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-label\" class=\"cs-input__label\">Label:</label>\n            <input type=\"text\" v-model=\"configuration.label\" id=\"cfg-label\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-target\" class=\"cs-input__label\">Target:</label>\n            <input type=\"text\" v-model=\"configuration.target\" id=\"cfg-target\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: {
                label: '',
                target: '',
            },
        },
    },
};

var m2cButtonConfigurator = {
    mixins: [
        ccButtonConfigurator,
    ],
    template: "<form class=\"m2c-button-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-label\" class=\"m2-input__label\">" + $t('Label') + ":</label>\n            <input type=\"text\" v-model=\"configuration.label\" id=\"cfg-label\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-addon m2-input--type-inline | m2c-button-configurator__item-form-element\">\n            <label for=\"cfg-target\" class=\"m2-input__label\">" + $t('Target') + ":</label>\n            <div class=\"m2-input__addon-wrapper\">\n                <input type=\"text\" class=\"m2-input__input | m2c-button-configurator__target\" v-model=\"configuration.target\" id=\"cfg-target\">\n                <span class=\"m2-input__addon | m2c-button-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal()\">\n                    <svg class=\"m2-input__addon-icon\">\n                        <use xlink:href=\"#icon_link\"></use>\n                    </svg>\n                </span>\n            </div>\n        </div>\n    </form>",
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    label: '',
                    target: '',
                };
            },
        },
        /* Get assets for displaying component images */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            this.onSave();
        },
    },
    methods: {
        /* Opens modal with M2 built-in widget chooser
         */
        openCtaTargetModal: function () {
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/cfg-target");
            this.wWidgetListener();
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of target input is changed
         */
        widgetSetListener: function () {
            var component = this;
            $('.m2c-button-configurator__cta-target-link').on('change', function () {
                component.onChange();
            });
        },
        /*
         * Check if widget chooser is loaded. If not, wait for it
         */
        wWidgetListener: function () {
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                this.disableNotLinksOptions();
                this.setWidgetEvents();
            }
            else {
                setTimeout(this.wWidgetListener, 300);
            }
        },
        /*
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         */
        setWidgetEvents: function () {
            var _this = this;
            var button = widgetTools.dialogWindow[0].querySelector('#insert_button');
            button.onclick = null;
            button.addEventListener('click', function () {
                _this.configuration.hero_url = '';
                wWidget.insertWidget();
            });
        },
        /*
         * Hide all options in widget chooser that are not links
         */
        disableNotLinksOptions: function () {
            if (wWidget.widgetEl && wWidget.widgetEl.options) {
                $(wWidget.widgetEl.options).each(function (i, el) {
                    if (el.value.split('\\').pop() !== 'Link' && i !== 0) {
                        $(el).hide();
                    }
                });
            }
        },
    },
    ready: function () {
        this.widgetSetListener();
    },
};

/**
 * Category links configurator component.
 * This component is responsible for displaying category links configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccCategoryLinksConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-category-links-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-main_category_id\" class=\"cs-input__label\">Main category ID:</label>\n            <input type=\"text\" v-model=\"configuration.main_category_id\" id=\"cfg-main_category_id\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-sub_categories_ids\" class=\"cs-input__label\">Subcategories ID's:</label>\n            <input type=\"text\" v-model=\"configuration.sub_categories_ids\" id=\"cfg-sub_categories_ids\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-shownumbers\" class=\"cs-input__label\">Show products count:</label>\n            <input type=\"checkbox\" v-model=\"configuration.shownumbers\" id=\"cfg-shownumbers\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    main_category_id: '',
                    sub_categories_ids: '',
                    shownumbers: false,
                };
            },
        },
    },
};

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

var m2cCategoryLinksConfigurator = {
    mixins: [
        ccCategoryLinksConfigurator,
    ],
    template: "<form class=\"m2c-category-links-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label class=\"m2-input__label\">Category</label>\n            <input type=\"hidden\" v-model=\"configuration.main_category_id\" id=\"cp-main\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label class=\"m2-input__label\">Subcategories</label>\n            <input type=\"hidden\" v-model=\"configuration.sub_categories_ids\" id=\"cp-sub\">\n        </div>\n        \n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-shownumbers\" class=\"m2-input__label\">Show products count:</label>\n            <input type=\"checkbox\" v-model=\"configuration.shownumbers\" id=\"cfg-shownumbers\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n    </form>",
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            this.configuration.main_category_labels = this.categoryPicker._categoriesLabels;
            this.configuration.sub_categories_labels = this.subCategoriesPicker._categoriesLabels;
            this.onSave();
        },
    },
    props: {
        /* Obtain endpoint for getting categories data for category picker */
        categoriesDataUrl: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            categoryPicker: undefined,
            subCategoriesPicker: undefined,
        };
    },
    ready: function () {
        var _this = this;
        // Show loader
        $('body').trigger('showLoadingPopup');
        this.$http.get(this.categoriesDataUrl).then(function (response) {
            _this.initializePickers(JSON.parse(response.body));
            // Hide loader
            $('body').trigger('hideLoadingPopup');
        });
    },
    methods: {
        initializePickers: function (categories) {
            var _this = this;
            this.subCategoriesPicker = new CcCategoryPicker($('#cp-sub'), categories, {
                showSearch: false,
                disabled: _this.configuration.main_category_id === '',
            });
            this.categoryPicker = new CcCategoryPicker($('#cp-main'), categories, {
                multiple: false,
                disableLastLevelItems: true,
            });
            if (this.configuration.main_category_id !== '') {
                this.subCategoriesPicker.showChildrenOnly(this.configuration.main_category_id);
            }
            $('#cp-main').on('change', function () {
                _this.updateSubcategoriesPicker(_this.configuration.main_category_id);
            });
        },
        updateSubcategoriesPicker: function (catId) {
            this.subCategoriesPicker.resetAll();
            if (catId !== '') {
                this.subCategoriesPicker.showChildrenOnly(catId);
                this.subCategoriesPicker.enable();
            }
            else {
                this.subCategoriesPicker.disable();
            }
        }
    },
};

/**
 * Headline configurator component.
 * This component is responsible for displaying headlines configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccHeadlineConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"cs-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"configuration.title\" id=\"cfg-headline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"cs-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"configuration.subtitle\" id=\"cfg-subheadline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    title: '',
                    subtitle: '',
                };
            },
        },
    },
};

var m2cHeadlineConfigurator = {
    mixins: [
        ccHeadlineConfigurator,
    ],
    template: "<form class=\"m2c-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"m2-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"configuration.title\" id=\"cfg-headline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"m2-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"configuration.subtitle\" id=\"cfg-subheadline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n    </form>",
};

var template = "<div class=\"cc-hero-carousel-configurator | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewHeroItem( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use xlink:href=\"../images/sprites.svg#icon_plus\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"item in configuration.items\">\n        <div class=\"cc-hero-carousel-configurator__item\">\n            <div class=\"cc-hero-carousel-configurator__item-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__top\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveHeroItemUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"../images/sprites.svg#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveHeroItemDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"../images/sprites.svg#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                    <template slot=\"cc-component-actions__bottom\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteHeroItem( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"../images/sprites.svg#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-hero-carousel-configurator__item-content\">\n                <div class=\"cc-hero-carousel__item-image\"></div>\n                <div class=\"cc-hero-carousel__item-options\">\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-variant\" class=\"cs-input__label\">Display variant:</label>\n                        <select name=\"cfg-hc-item{{ $index }}-variant\" class=\"cs-input__select\" id=\"cfg-hc-item{{ $index }}-variant\" v-model=\"configuration.displayVariant\">\n                            <option value=\"variant-1\">Text vertically centered on the left</option>\n                            <option value=\"variant-2\">Text vertically centered in the middle</option>\n                            <option value=\"variant-3\">Text on the bottom, left corner</option>\n                            <option value=\"variant-4\">Text on the bottom - centered</option>\n                        </select>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"cs-input__label\">Headline:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                        <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"cs-input__textarea\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-ctaLabel\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-ctaLabel\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-addon\">\n                        <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-addon\">\n                        <label for=\"cfg-hc-item{{ $index }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaTarget\" id=\"cfg-hc-item{{ $index }}-cta-target\" class=\"cs-input__input\">\n                        <span class=\"cs-input__addon\">\n                            <svg class=\"cs-input__addon-icon\">\n                                <use xlink:href=\"../images/sprites.svg#icon_link\"></use>\n                            </svg>\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"configuration.items.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewHeroItem( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use xlink:href=\"../images/sprites.svg#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</div>\n";

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
 * Component controller component.
 * This component is responsible for displaying annd handling component adding button
 * @type {vuejs.ComponentOption} Vue component object.
 */
var componentAdder = {
    template: "<div class=\"cc-component-adder {{ class }}\">\n        <div class=\"cc-component-adder__button-wrapper\" @click=\"onCreateComponent\">\n            <slot></slot>\n        </div>\n        <span class=\"cc-component-adder__dashline\"></span>\n    </div>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) {
                return value.replace('cc-component-adder', '');
            },
        },
        /**
         * Property containing callback triggered when user clicks "add component" button.
         */
        createComponent: {
            type: Function,
        },
    },
    methods: {
        /**
         * "Add component" button click handler.
         * This handler triggers "cc-component-adder__create-component" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onCreateComponent: function (event) {
            this.$dispatch('cc-component-adder__create-component', event);
            if (typeof this.createComponent === 'function') {
                this.createComponent(event);
            }
        },
    },
};

/**
 * Component placeholder component.
 */
var componentPlaceholder = {
    template: "<div class=\"cc-component-placeholder\">\n        <div class=\"cc-component-placeholder__content\">\n            <slot></slot>\n        </div>\n    </div>",
};

/**
 * Hero carousel configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccHeroCarouselConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: template,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    items: [],
                };
            },
        },
    },
};

// Pattern for teaser Item
var heroItemDataPattern = {
    image: '',
    decodedImage: '',
    displayVariant: 'variant-1',
    headline: '',
    subheadline: '',
    paragraph: '',
    ctaLabel: $t('Check offer'),
    href: '',
    sizeInfo: '',
    aspectRatio: '',
};
/**
 * M2C skin for Hero configurator component.
 * This component is responsible for displaying hero carousel's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var m2cHeroCarouselConfigurator = {
    mixins: [
        ccHeroCarouselConfigurator,
    ],
    template: "<div class=\"m2c-hero-carousel-configurator | {{ class }}\">\n        <section class=\"m2c-hero-carousel-configurator__section\">\n            <h3 class=\"m2c-hero-carousel-configurator__subtitle\">Mobile Devices Scenario</h3>\n            <div class=\"m2c-hero-carousel-configurator__scenario-options\">\n                <div class=\"m2c-hero-carousel-configurator__scenario-options-list\">\n                    <li\n                        :class=\"{\n                            'm2c-hero-carousel-configurator__option--selected': configuration.mobileDisplayVariant.id == optionId,\n                        }\"\n                        class=\"m2c-hero-carousel-configurator__option\"\n                        v-for=\"(optionId, option) in scenarioOptions.mobileDisplayVariant\"\n                        @click=\"setOption('mobileDisplayVariant', optionId)\">\n                        <div class=\"m2c-hero-carousel-configurator__option-wrapper\">\n                            <svg class=\"m2c-hero-carousel-configurator__option-icon\">\n                                <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                            </svg>\n                        </div>\n                        <p class=\"m2c-hero-carousel-configurator__option-name\">\n                            {{ option.name }}\n                        </p>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <h3 class=\"m2c-hero-carousel-configurator__title\">Content</h3>\n\n        <cc-component-adder class=\"cc-component-adder cc-component-adder--static\" v-show=\"!configuration.items.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( 0 )\">\n                <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n\n        <template v-for=\"item in configuration.items\">\n            <div class=\"m2c-hero-carousel-configurator__item\" id=\"m2c-hero-carousel-item-{{ $index }}\">\n                <cc-component-adder class=\"cc-component-adder cc-component-adder--first\">\n                    <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( $index )\">\n                        <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                            <use xlink:href=\"#icon_plus\"></use>\n                        </svg>\n                    </button>\n                </cc-component-adder>\n\n                <div class=\"m2c-hero-carousel-configurator__item-content\">\n                    <div v-bind:class=\"[ 'm2c-hero-carousel-configurator__item-col-left', configuration.items[$index].image ? 'm2c-hero-carousel-configurator__item-col-left--look-image-uploaded' : '' ]\">\n                        <div class=\"m2c-hero-carousel-configurator__item-image-wrapper\">\n                            <img :src=\"configuration.items[$index].image\" class=\"m2c-hero-carousel-configurator__item-image\" v-show=\"configuration.items[$index].image\">\n                            <input type=\"hidden\" v-model=\"configuration.items[$index].image\">\n                            <input type=\"hidden\" class=\"m2c-hero-carousel-configurator__image-url\" id=\"hero-img-{{$index}}\">\n                            <svg class=\"m2c-hero-carousel-configurator__item-image-placeholder\" v-show=\"!configuration.items[$index].image\">\n                                <use xlink:href=\"#icon_image-placeholder\"></use>\n                            </svg>\n\n                            <div class=\"m2c-hero-carousel-configurator__item-actions\">\n                                <cc-component-actions>\n                                    <template slot=\"cc-component-actions__buttons\">\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-hero-carousel-configurator__item-action-button\" @click=\"moveHeroItemUp( $index )\" :class=\"[ isFirstHeroItem( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstHeroItem( $index )\">\n                                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                <use xlink:href=\"#icon_arrow-up\"></use>\n                                            </svg>\n                                        </button>\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-hero-carousel-configurator__item-action-button\" @click=\"moveHeroItemDown( $index )\" :class=\"[ isLastHeroItem( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastHeroItem( $index )\">\n                                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                <use xlink:href=\"#icon_arrow-down\"></use>\n                                            </svg>\n                                        </button>\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon | cc-component-actions__button cc-component-actions__button--upload-image | m2c-hero-carousel-configurator__item-action-button\" @click=\"getImageUploader( $index )\">\n                                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                    <use xlink:href=\"#icon_upload-image\"></use>\n                                                </svg>\n                                                {{ configuration.items[$index].image ? imageUploadedText : noImageUploadedText }}\n                                        </button>\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-hero-carousel-configurator__item-action-button\" @click=\"deleteHeroItem( $index )\">\n                                            <svg class=\"action-button__icon\">\n                                                <use xlink:href=\"#icon_trash-can\"></use>\n                                            </svg>\n                                        </button>\n                                    </template>\n                                </cc-component-actions>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"m2c-hero-carousel-configurator__item-col-right\">\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-variant\" class=\"m2-input__label\">" + $t('Display variant') + ":</label>\n                            <select name=\"cfg-hc-item{{ $index }}-variant\" class=\"m2-input__select | m2c-hero-carousel-configurator__select\" id=\"cfg-hc-item{{ $index }}-variant\" v-model=\"configuration.items[$index].displayVariant\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                <option value=\"variant-1\">" + $t('Text vertically centered on the left') + "</option>\n                                <option value=\"variant-2\">" + $t('Text vertically centered in the middle') + "</option>\n                                <option value=\"variant-3\">" + $t('Text on the bottom, left corner') + "</option>\n                                <option value=\"variant-4\">" + $t('Text on the bottom - centered') + "</option>\n                            </select>\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__input\">\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__label\">" + $t('Subheadline') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].subheadline\" id=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__input\">\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__label\">" + $t('Paragraph') + ":</label>\n                            <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__textarea\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                        </div>\n                        <div class=\"m2-input m2-input--group\">\n                            <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__label\">" + $t('CTA label') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input m2-input--type-addon | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"hero-ctatarget-output-{{ $index }}\" class=\"m2-input__label\">" + $t('CTA target link') + ":</label>\n                                <input type=\"text\" class=\"m2-input__input | m2c-hero-carousel-configurator__cta-target-link\" v-model=\"configuration.items[$index].href\" id=\"hero-ctatarget-output-{{ $index }}\">\n                                <span class=\"m2-input__addon | m2c-hero-carousel-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal( $index )\">\n                                    <svg class=\"m2-input__addon-icon\">\n                                        <use xlink:href=\"#icon_link\"></use>\n                                    </svg>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <cc-component-adder class=\"cc-component-adder cc-component-adder--last\">\n                    <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( $index + 1 )\">\n                        <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                            <use xlink:href=\"#icon_plus\"></use>\n                        </svg>\n                    </button>\n                </cc-component-adder>\n            </div>\n        </template>\n\n        <div class=\"m2c-hero-carousel-configurator__modal\" v-el:error-modal></div>\n    </div>",
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    mobileDisplayVariant: {},
                    items: [JSON.parse(JSON.stringify(heroItemDataPattern))],
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
    },
    data: function () {
        return {
            imageUploadedText: $t('Change'),
            noImageUploadedText: $t('Upload'),
            scenarioOptions: {
                // Mobile layout scenario elements.
                mobileDisplayVariant: {
                    'list': {
                        name: 'Large teaser',
                        iconId: 'ml_col',
                    },
                    'slider': {
                        name: 'Slider',
                        iconId: 'ml_slider',
                    },
                },
            },
        };
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            this.cleanupConfiguration();
            this.onSave();
        },
    },
    methods: {
        getImageUploadText: function (index) {
            return this.configuration.items[index].image ? $t('Change') : $t('Upload');
        },
        setOption: function (optionCategory, optionId) {
            this.configuration[optionCategory] = this.scenarioOptions[optionCategory][optionId];
            this.configuration[optionCategory].id = optionId;
        },
        /* Opens M2's built-in image manager modal
         * Manages all images: image upload from hdd, select image that was already uploaded to server
         * @param index {number} - index of image of hero item
         */
        getImageUploader: function (index) {
            MediabrowserUtility.openDialog(this.uploaderBaseUrl + "target_element_id/hero-img-" + index + "/", 'auto', 'auto', $t('Insert File...'), {
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
            $(document).on('change', '.m2c-hero-carousel-configurator__image-url', function (event) {
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
            var itemIndex = input.id.substr(input.id.length - 1);
            var encodedImage = input.value.match('___directive\/([a-zA-Z0-9]*)')[1];
            var imgEndpoint = this.imageEndpoint.replace('{/encoded_image}', encodedImage);
            this.configuration.items[itemIndex].decodedImage = Base64 ? Base64.decode(encodedImage) : window.atob(encodedImage);
            var img = new Image();
            img.onload = function () {
                var ar = _this.getAspectRatio(img.naturalWidth, img.naturalHeight);
                _this.configuration.items[itemIndex].image = img.getAttribute('src');
                _this.configuration.items[itemIndex].sizeInfo = img.naturalWidth + "x" + img.naturalHeight + "px (" + ar + ")";
                _this.configuration.items[itemIndex].aspectRatio = ar;
                _this.checkImageSizes();
                _this.onChange();
            };
            img.src = imgEndpoint;
        },
        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal: function (index) {
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/hero-ctatarget-output-" + index);
            this.wWidgetListener(index);
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.href is changed
         */
        widgetSetListener: function () {
            var component = this;
            $('.m2c-hero-carousel-configurator__cta-target-link').on('change', function () {
                component.onChange();
            });
        },
        /*
         * Check if widget chooser is loaded. If not, wait for it
         */
        wWidgetListener: function (itemIndex) {
            var _this = this;
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                this.disableNotLinksOptions();
                this.setWidgetEvents(itemIndex);
            }
            else {
                window.setTimeout(function () {
                    _this.wWidgetListener(itemIndex);
                }, 300);
            }
        },
        /*
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         */
        setWidgetEvents: function (itemIndex) {
            var _this = this;
            var button = widgetTools.dialogWindow[0].querySelector('#insert_button');
            button.onclick = null;
            button.addEventListener('click', function () {
                _this.configuration.items[itemIndex].href = '';
                wWidget.insertWidget();
            });
        },
        /*
         * Hide all options in widget chooser that are not links
         */
        disableNotLinksOptions: function () {
            if (wWidget.widgetEl && wWidget.widgetEl.options) {
                $(wWidget.widgetEl.options).each(function (i, el) {
                    if (el.value.split('\\').pop() !== 'Link' && i !== 0) {
                        $(el).hide();
                    }
                });
            }
        },
        /**
         * Creates new hero item and adds it to a specified index.
         * @param {number} index New component's index in components array.
         */
        createNewHeroItem: function (index) {
            this.configuration.items.splice(index, 0, JSON.parse(JSON.stringify(heroItemDataPattern)));
            this.onChange();
        },
        /**
         * Moves hero item under given index up by swaping it with previous element.
         * @param {number} index Hero item's index in array.
         */
        moveHeroItemUp: function (index) {
            var _this = this;
            if (index > 0) {
                var $thisItem_1 = $("#m2c-hero-carousel-item-" + index);
                var $prevItem_1 = $("#m2c-hero-carousel-item-" + (index - 1));
                $thisItem_1.addClass('m2c-hero-carousel-configurator__item--animating').css('transform', "translateY( " + -Math.abs($prevItem_1.outerHeight(true)) + "px )");
                $prevItem_1.addClass('m2c-hero-carousel-configurator__item--animating').css('transform', "translateY( " + $thisItem_1.outerHeight(true) + "px )");
                setTimeout(function () {
                    _this.configuration.items.splice(index - 1, 0, _this.configuration.items.splice(index, 1)[0]);
                    _this.onChange();
                    $thisItem_1.removeClass('m2c-hero-carousel-configurator__item--animating').css('transform', '');
                    $prevItem_1.removeClass('m2c-hero-carousel-configurator__item--animating').css('transform', '');
                }, 400);
            }
        },
        /**
         * Moves hero item under given index down by swaping it with next element.
         * @param {number} index Hero item's index in array.
         */
        moveHeroItemDown: function (index) {
            var _this = this;
            if (index < this.configuration.items.length - 1) {
                var $thisItem_2 = $("#m2c-hero-carousel-item-" + index);
                var $nextItem_1 = $("#m2c-hero-carousel-item-" + (index + 1));
                $thisItem_2.addClass('m2c-hero-carousel-configurator__item--animating').css('transform', "translateY( " + $nextItem_1.outerHeight(true) + "px )");
                $nextItem_1.addClass('m2c-hero-carousel-configurator__item--animating').css('transform', "translateY( " + -Math.abs($thisItem_2.outerHeight(true)) + "px )");
                setTimeout(function () {
                    _this.configuration.items.splice(index + 1, 0, _this.configuration.items.splice(index, 1)[0]);
                    _this.onChange();
                    $thisItem_2.removeClass('m2c-hero-carousel-configurator__item--animating').css('transform', '');
                    $nextItem_1.removeClass('m2c-hero-carousel-configurator__item--animating').css('transform', '');
                }, 400);
            }
        },
        /**
         * Tells if item with given index is the first hero item.
         * @param  {number}  index Index of the hero item.
         * @return {boolean}       If hero item is first in array.
         */
        isFirstHeroItem: function (index) {
            return index === 0;
        },
        /**
         * Tells if hero item with given index is the last hero item.
         * @param  {number}  index Index of the hero item.
         * @return {boolean}       If hero item is last in array.
         */
        isLastHeroItem: function (index) {
            return index === this.configuration.items.length - 1;
        },
        /* Removes hero item after Delete button is clicked
         * and triggers hero item's onChange to update it's configuration
         * @param index {number} - index of hero item to remove
         */
        deleteHeroItem: function (index) {
            var component = this;
            confirm({
                content: $t('Are you sure you want to delete this item?'),
                actions: {
                    confirm: function () {
                        component.configuration.items.splice(index, 1);
                        component.onChange();
                    },
                },
            });
        },
        /* Cleans configuration for M2C content constructor after Saving component
         * All empty hero items has to be removed to not get into configuration object
         */
        cleanupConfiguration: function () {
            var filteredArray = this.configuration.items.filter(function (item) { return item.image !== ''; });
            this.configuration.items = filteredArray;
            this.onChange();
        },
        /* Checks if images are all the same size
         * If not - displays error by firing up this.displayImageSizeMismatchError()
         * @param images {array} - array of all uploaded images
         */
        checkImageSizes: function () {
            var itemsToCheck = JSON.parse(JSON.stringify(this.configuration.items)).filter(function (item) {
                return Boolean(item.aspectRatio); // Filter out items without aspect ratio set yet.
            });
            for (var i = 0; i < itemsToCheck.length; i++) {
                if (itemsToCheck[i].aspectRatio !== itemsToCheck[0].aspectRatio) {
                    alert({
                        title: $t('Warning'),
                        content: $t('Images you have uploaded have different aspect ratio. This may cause this component to display wrong. We recommend all images uploaded to have the same aspect ratio.'),
                    });
                    return false;
                }
            }
            return true;
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
    },
    ready: function () {
        this.imageUploadListener();
        this.widgetSetListener();
        if (!this.configuration.mobileDisplayVariant.id) {
            $('.m2c-hero-carousel-configurator__option:first-child').click();
        }
    },
};

// Pattern for teaser Item
var teaserItemPrototype$1 = {
    image: '',
    decodedImage: '',
    headline: '',
    paragraph: '',
    ctaLabel: 'More',
    href: '',
    sizeInfo: '',
    aspectRatio: '',
};
/**
 * Image teaser configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccImageTeaserConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
    },
    template: "<form class=\"cc-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-width\" class=\"cs-input__label\">Teaser width:</label>\n                <select name=\"cfg-it-width-select\" class=\"cs-input__select\" id=\"cfg-it-width\" v-model=\"configuration.teaserWidth\" @change=\"onChange\">\n                    <option value=\"full-width\" selected>Full browser width</option>\n                    <option value=\"limited-width\">Breaking point width (1280px)</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-images-per-slide\" class=\"cs-input__label\">Images per slide:</label>\n                <select name=\"cfg-it-images-per-slide\" class=\"cs-input__select\" id=\"cfg-it-images-per-slide\" v-model=\"configuration.itemsPerSlide\" @change=\"onChange\">\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                </select>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cc-image-teaser-configurator__teaser\">\n                <template v-for=\"item in configuration.items\">\n                    <div class=\"cc-image-teaser-configurator__teaser-item\" id=\"cc-image-teaser-item-{{ $index }}\">\n                        <div class=\"cc-image-teaser-configurator__toolbar\">\n                            <span class=\"cc-image-teaser-configurator__teaser-item-title\">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>\n                            <a href=\"#\" class=\"cc-image-teaser-configurator__upload-link\" href=\"#\">Upload image</a>\n                        </div>\n                        <div class=\"cc-image-teaser-configurator__image-holder-outer\">\n                            <div class=\"cc-image-teaser-configurator__image-holder-inner\">\n                                <input type=\"hidden\" value=\"\" class=\"cc-image-teaser-configurator__image-url\" v-model=\"configuration.items[$index].image\" @change=\"onChange\">\n                            </div>\n                        </div>\n                        <div class=\"cs-input cs-input--type-required\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__label\">Headline:</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"cs-input cs-input--type-required\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                            <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__textarea cs-input__textarea--look-thin\" @change=\"onChange\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                        </div>\n                        <div class=\"cs-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"cs-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                            <input type=\"text\" v-model=\"item.ctaTarget\" id=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                    </div>\n                </template>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions\">\n            <button type=\"submit\">Save</button>\n        </section>\n    </form>",
    data: function () {
        return {
            scenarioOptions: {
                // Teaser width scenario elements.
                teaserWidth: {
                    'c': {
                        name: 'Container width',
                        iconId: 'tw_content-width',
                        disabled: false,
                        teasersLimit: true,
                    },
                    'w': {
                        name: 'Window width',
                        iconId: 'tw_window-width',
                        disabled: false,
                        teasersLimit: true,
                    },
                    'w-s': {
                        name: 'Window slider',
                        iconId: 'tw_window-slider',
                        disabled: false,
                        teasersLimit: false,
                    },
                },
                // Desktop layout scenario elements.
                desktopLayout: {
                    '1': {
                        name: '1 in row',
                        iconId: 'dl_1',
                        disabled: false,
                        teasersNum: 1,
                    },
                    '2': {
                        name: '2 in row',
                        iconId: 'dl_2',
                        disabled: false,
                        teasersNum: 2,
                    },
                    '3': {
                        name: '3 in row',
                        iconId: 'dl_3',
                        disabled: false,
                        teasersNum: 3,
                    },
                    '4': {
                        name: '4 in row',
                        iconId: 'dl_4',
                        disabled: false,
                        teasersNum: 4,
                    },
                    '6': {
                        name: '6 in row',
                        iconId: 'dl_6',
                        disabled: false,
                        teasersNum: 6,
                    },
                },
                // Text positioning scenario elements.
                textPositioning: {
                    'over': {
                        name: 'Text over image',
                        iconId: 'tl_over',
                        disabled: false,
                        textPosition: true,
                    },
                    'under': {
                        name: 'Text below image',
                        iconId: 'tl_under',
                        disabled: false,
                        textPosition: false,
                    },
                },
                // Mobile layout scenario elements.
                mobileLayout: {
                    'large': {
                        name: 'Large teaser',
                        iconId: 'ml_col',
                        disabled: false,
                    },
                    'slider': {
                        name: 'Slider',
                        iconId: 'ml_slider',
                        disabled: false,
                    },
                    'row': {
                        name: 'Teasers in row',
                        iconId: 'ml_2-2',
                        disabled: false,
                    },
                    'col': {
                        name: 'Teasers in column',
                        iconId: 'ml_col',
                        disabled: false,
                    },
                    '1-2': {
                        name: 'Big, two small',
                        iconId: 'ml_1-2',
                        disabled: false,
                    },
                    '2-2': {
                        name: '2 in row, 2 rows',
                        iconId: 'ml_2-2',
                        disabled: false,
                    },
                    '1-2-1': {
                        name: 'Big, two small, big',
                        iconId: 'ml_1-2',
                        disabled: false,
                    },
                    '2-2-2': {
                        name: '2 in row, 3 rows',
                        iconId: 'ml_2-2',
                        disabled: false,
                    },
                },
            },
            availableScenarios: [
                ['c', '1', 'over', ['large']],
                ['c', '2', 'over', ['col', 'row', 'slider']],
                ['c', '2', 'under', ['col']],
                ['c', '3', 'over', ['col', 'slider', '1-2']],
                ['c', '3', 'under', ['col']],
                ['c', '4', 'over', ['2-2', 'slider', '1-2-1']],
                ['c', '4', 'under', ['col']],
                ['c', '6', 'over', ['2-2-2', 'slider']],
                ['c', '6', 'under', ['2-2-2', 'slider']],
                ['w', '1', 'over', ['large']],
                ['w', '2', 'over', ['col', 'row', 'slider']],
                ['w', '2', 'under', ['col']],
                ['w', '3', 'over', ['col', 'slider', '1-2']],
                ['w', '3', 'under', ['col']],
                ['w', '4', 'over', ['2-2', 'slider', '1-2-1']],
                ['w', '4', 'under', ['col']],
                ['w-s', '1', 'over', ['slider']],
                ['w-s', '2', 'over', ['slider']],
                ['w-s', '2', 'under', ['slider']],
                ['w-s', '3', 'over', ['slider']],
                ['w-s', '3', 'under', ['slider']],
                ['w-s', '4', 'over', ['slider']],
                ['w-s', '4', 'under', ['slider']],
            ],
        };
    },
    props: {
        /**
         * Image teaser configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    items: [JSON.parse(JSON.stringify(teaserItemPrototype$1))],
                    ignoredItems: [],
                    currentScenario: {
                        teaserWidth: {},
                        desktopLayout: {},
                        textPositioning: {},
                        mobileLayout: {},
                    },
                };
            },
        },
    },
    created: function () {
        if (this.configuration.ignoredItems === undefined) {
            this.configuration.ignoredItems = [];
        }
    },
    methods: {
        _collectPossibleOptions: function (filteredScenarios) {
            var teaserWidthIndex = 0;
            var desktopLayoutIndex = 1;
            var textPositionIndex = 2;
            var mobileLayoutsIndex = 3;
            var possibleOptions = {
                teaserWidth: {},
                desktopLayout: {},
                textPositioning: {},
                mobileLayout: {},
            };
            filteredScenarios.forEach(function (filteredScenario) {
                possibleOptions.teaserWidth[filteredScenario[teaserWidthIndex]] = true;
                possibleOptions.desktopLayout[filteredScenario[desktopLayoutIndex]] = true;
                possibleOptions.textPositioning[filteredScenario[textPositionIndex]] = true;
                filteredScenario[mobileLayoutsIndex].forEach(function (mobileLayout) {
                    possibleOptions.mobileLayout[mobileLayout] = true;
                });
            });
            Object.keys(possibleOptions).forEach(function (scenarioElement) {
                possibleOptions[scenarioElement] = Object.keys(possibleOptions[scenarioElement]);
            });
            return possibleOptions;
        },
        _findPossibleOptions: function (teaserWidth, desktopLayout, textPosition, mobileLayout) {
            var teaserWidthIndex = 0;
            var desktopLayoutIndex = 1;
            var textPositionIndex = 2;
            var mobileLayoutsIndex = 3;
            // Make a copy of available scenarios to prevent reference copying.
            var filteredScenarios = JSON.parse(JSON.stringify(this.availableScenarios));
            if (teaserWidth) {
                filteredScenarios = filteredScenarios.filter(function (availableScenario) {
                    return availableScenario[teaserWidthIndex] === teaserWidth;
                });
            }
            if (desktopLayout) {
                filteredScenarios = filteredScenarios.filter(function (availableScenario) {
                    return availableScenario[desktopLayoutIndex] === desktopLayout;
                });
            }
            if (textPosition) {
                filteredScenarios = filteredScenarios.filter(function (availableScenario) {
                    return !textPosition || availableScenario[textPositionIndex] === textPosition;
                });
            }
            if (mobileLayout) {
                filteredScenarios = filteredScenarios.filter(function (availableScenario) {
                    return availableScenario[mobileLayoutsIndex].indexOf(mobileLayout) !== -1;
                });
                filteredScenarios = filteredScenarios.map(function (availableScenario) {
                    availableScenario[mobileLayoutsIndex] = [mobileLayout];
                    return availableScenario;
                });
            }
            return this._collectPossibleOptions(filteredScenarios);
        },
        toggleOption: function (optionCategory, optionId) {
            if (this.configuration.currentScenario[optionCategory].id) {
                this.configuration.currentScenario[optionCategory] = {};
            }
            else {
                this.configuration.currentScenario[optionCategory] = this.scenarioOptions[optionCategory][optionId];
                this.configuration.currentScenario[optionCategory].id = optionId;
            }
            this.togglePossibleOptions();
            this.adjustVisibleItems();
        },
        adjustVisibleItems: function () {
            var items = this.configuration.items;
            var itemsNumber = this.configuration.currentScenario.desktopLayout.teasersNum;
            var itemsLimit = this.configuration.currentScenario.teaserWidth.teasersLimit;
            if (itemsLimit && items.length > itemsNumber) {
                var removedItems = items.splice(itemsNumber, items.length - itemsNumber);
                this.configuration.ignoredItems = removedItems.concat(this.configuration.ignoredItems);
            }
            else if (items.length < itemsNumber) {
                items.concat(this.configuration.ignoredItems.splice(0, itemsNumber - items.length));
                for (var addedItems = 0; addedItems < itemsNumber - items.length; addedItems++) {
                    items.push(JSON.parse(JSON.stringify(teaserItemPrototype$1)));
                }
            }
        },
        togglePossibleOptions: function () {
            var _this = this;
            var currentScenario = this.configuration.currentScenario;
            var possibleOptions = this._findPossibleOptions(currentScenario.teaserWidth.id, currentScenario.desktopLayout.id, currentScenario.textPositioning.id, currentScenario.mobileLayout.id);
            Object.keys(this.scenarioOptions).forEach(function (optionCategory) {
                Object.keys(_this.scenarioOptions[optionCategory]).forEach(function (scenarioOptionId) {
                    _this.scenarioOptions[optionCategory][scenarioOptionId].disabled = possibleOptions[optionCategory].indexOf(scenarioOptionId) === -1;
                });
            });
        },
        canAddTeaser: function () {
            var items = this.configuration.items;
            var itemsLimit = this.configuration.currentScenario.teaserWidth.teasersLimit;
            return (!itemsLimit || items.length < itemsLimit);
        },
    },
};

// Pattern for teaser Item
var teaserItemPrototype = {
    image: '',
    decodedImage: '',
    displayVariant: '1',
    headline: '',
    subheadline: '',
    paragraph: '',
    ctaLabel: $t('More'),
    href: '',
    sizeInfo: '',
    aspectRatio: '',
};
/**
 * M2C Image teaser component for admin panel.
 * This component is responsible for managing image teasers including image upload and widget chooser
 */
var m2cImageTeaserConfigurator = {
    mixins: [
        ccImageTeaserConfigurator,
    ],
    template: "<div class=\"m2c-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }}>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Teaser Width</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.teaserWidth.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.teaserWidth\"\n                    @click=\"!option.disabled && toggleOption('teaserWidth', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n\n        </section>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Desktop Layout</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.desktopLayout.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.desktopLayout\"\n                    @click=\"!option.disabled && toggleOption('desktopLayout', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n        </section>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Text Positioning</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.textPositioning.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.textPositioning\"\n                    @click=\"!option.disabled && toggleOption('textPositioning', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n        </section>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Mobile Layout</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.mobileLayout.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.mobileLayout\"\n                    @click=\"!option.disabled && toggleOption('mobileLayout', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <cc-component-adder class=\"cc-component-adder cc-component-adder--static\" v-show=\"!configuration.items.length\">\n                <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createTeaserItem( 0 )\">\n                    <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                        <use v-bind=\"{ 'xlink:href': '#icon_plus' }\"></use>\n                    </svg>\n                </button>\n            </cc-component-adder>\n\n            <template v-for=\"item in configuration.items\">\n                <div class=\"m2c-image-teaser-configurator__item\" id=\"m2c-image-teaser-item-{{ $index }}\">\n                    <cc-component-adder class=\"cc-component-adder cc-component-adder--first\" v-if=\"canAddTeaser()\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | m2c-image-teaser-configurator__item-action-button\" @click=\"createTeaserItem( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_300\">\n                                <use xlink:href=\"#icon_plus\"></use>\n                            </svg>\n                        </button>\n                    </cc-component-adder>\n\n                    <div class=\"m2c-image-teaser-configurator__item-content\">\n                        <div v-bind:class=\"[ 'm2c-image-teaser-configurator__item-col-left', configuration.items[$index].image ? 'm2c-image-teaser-configurator__item-col-left--look-image-uploaded' : '' ]\">\n                            <div class=\"m2c-image-teaser-configurator__toolbar\">\n                                <span class=\"m2c-image-teaser-configurator__size-info\">{{ configuration.items[$index].sizeInfo }}</span>\n                                <template v-if=\"configuration.items[$index].image\">\n                                    <a href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Change image') + "</a>\n                                </template>\n                                <template v-else>\n                                    <a href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Upload image') + "</a>\n                                </template>\n                            </div>\n                            <div class=\"m2c-image-teaser-configurator__item-image-wrapper\">\n                                <img :src=\"configuration.items[$index].image\" class=\"m2c-image-teaser-configurator__item-image\" v-show=\"configuration.items[$index].image\">\n                                <input type=\"hidden\" v-model=\"configuration.items[$index].image\">\n                                <input type=\"hidden\" class=\"m2c-image-teaser-configurator__image-url\" id=\"image-teaser-img-{{$index}}\">\n\n                                <div class=\"m2c-image-teaser-configurator__item-actions\">\n                                    <cc-component-actions>\n                                        <template slot=\"cc-component-actions__buttons\">\n                                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-image-teaser-configurator__item-action-button\" @click=\"moveImageTeaserUp( $index )\" :class=\"[ isFirstImageTeaser( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstImageTeaser( $index )\">\n                                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                    <use xlink:href=\"#icon_arrow-up\"></use>\n                                                </svg>\n                                            </button>\n                                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-image-teaser-configurator__item-action-button\" @click=\"moveImageTeaserDown( $index )\" :class=\"[ isLastImageTeaser( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastImageTeaser( $index )\">\n                                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                    <use xlink:href=\"#icon_arrow-down\"></use>\n                                                </svg>\n                                            </button>\n                                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-image-teaser-configurator__item-action-button\" @click=\"deleteTeaserItem( $index )\">\n                                                <svg class=\"action-button__icon\">\n                                                    <use xlink:href=\"#icon_trash-can\"></use>\n                                                </svg>\n                                            </button>\n                                        </template>\n                                    </cc-component-actions>\n                                </div>\n\n                            </div>\n                        </div>\n                        <div class=\"m2c-image-teaser-configurator__item-col-right\">\n                            <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"cfg-it-item{{ $index }}-variant\" class=\"m2-input__label\">" + $t('Display variant') + ":</label>\n                                <select name=\"cfg-it-item{{ $index }}-variant\" class=\"m2-input__select\" id=\"cfg-it-item{{ $index }}-variant\" v-model=\"configuration.items[$index].displayVariant\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                    <option value=\"1\">" + $t('Text vertically centered on the left') + "</option>\n                                    <option value=\"3\">" + $t('Text vertically centered in the middle') + "</option>\n                                    <option value=\"2\">" + $t('Text on the bottom, left corner') + "</option>\n                                    <option value=\"4\">" + $t('Text on the bottom - centered') + "</option>\n                                </select>\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__label\">" + $t('Subheadline') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].subheadline\" id=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__label\">" + $t('Paragraph') + ":</label>\n                                <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__textarea\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__label\">" + $t('CTA label') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input m2-input--type-addon | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"image-teaser-ctatarget-output-{{ $index }}\" class=\"m2-input__label\">" + $t('CTA target link') + ":</label>\n                                <input type=\"text\" class=\"m2-input__input | m2c-image-teaser-configurator__cta-target-link\" v-model=\"configuration.items[$index].href\" id=\"image-teaser-ctatarget-output-{{ $index }}\">\n                                <span class=\"m2-input__addon | m2c-image-teaser-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal( $index )\">\n                                    <svg class=\"m2-input__addon-icon\">\n                                        <use xlink:href=\"#icon_link\"></use>\n                                    </svg>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <cc-component-adder class=\"cc-component-adder cc-component-adder--last\" v-if=\"configuration.items.length && canAddTeaser()\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | m2c-image-teaser-configurator__item-action-button\" @click=\"createTeaserItem( $index + 1 )\">\n                            <svg class=\"action-button__icon action-button__icon--size_300\">\n                                <use xlink:href=\"#icon_plus\"></use>\n                            </svg>\n                        </button>\n                    </cc-component-adder>\n                </div>\n            </template>\n        </section>\n    </div>",
    props: {
        /**
         * Image teaser configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    items: [JSON.parse(JSON.stringify(teaserItemPrototype))],
                    ignoredItems: [],
                    currentScenario: {
                        teaserWidth: {},
                        desktopLayout: {},
                        textPositioning: {},
                        mobileLayout: {},
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
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            this.cleanupConfiguration();
            this.onSave();
        },
    },
    methods: {
        /* Opens M2's built-in image manager modal.
         * Manages all images: image upload from hdd, select image that was already uploaded to server.
         * @param index {number} - index of image of image teaser.
         */
        getImageUploader: function (index) {
            MediabrowserUtility.openDialog(this.uploaderBaseUrl + "target_element_id/image-teaser-img-" + index + "/", 'auto', 'auto', $t('Insert File...'), {
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
            $(document).on('change', '.m2c-image-teaser-configurator__image-url', function (event) {
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
            var itemIndex = input.id.substr(input.id.length - 1);
            var encodedImage = input.value.match('___directive\/([a-zA-Z0-9]*)')[1];
            var imgEndpoint = this.imageEndpoint.replace('{/encoded_image}', encodedImage);
            this.configuration.items[itemIndex].decodedImage = Base64 ? Base64.decode(encodedImage) : window.atob(encodedImage);
            var img = new Image();
            img.onload = function () {
                var ar = _this.getAspectRatio(img.naturalWidth, img.naturalHeight);
                _this.configuration.items[itemIndex].image = img.getAttribute('src');
                _this.configuration.items[itemIndex].sizeInfo = img.naturalWidth + "x" + img.naturalHeight + "px (" + ar + ")";
                _this.configuration.items[itemIndex].aspectRatio = ar;
                _this.checkImageSizes();
                _this.onChange();
            };
            img.src = imgEndpoint;
        },
        /* Creates another teaser item using teaserItemPrototype */
        createTeaserItem: function (index) {
            this.configuration.items.splice(index, 0, JSON.parse(JSON.stringify(teaserItemPrototype)));
            this.onChange();
        },
        /**
         * Moves image teaser item under given index up by swaping it with previous element.
         * @param {number} index Image teaser's index in array.
         */
        moveImageTeaserUp: function (index) {
            if (index > 0) {
                this.configuration.items.splice(index - 1, 0, this.configuration.items.splice(index, 1)[0]);
                this.onChange();
            }
        },
        /**
         * Moves image teaser item under given index down by swaping it with next element.
         * @param {number} index Image teaser's index in array.
         */
        moveImageTeaserDown: function (index) {
            if (index < this.configuration.items.length - 1) {
                this.configuration.items.splice(index + 1, 0, this.configuration.items.splice(index, 1)[0]);
                this.onChange();
            }
        },
        /**
         * Tells if item with given index is the first image teaser.
         * @param  {number}  index Index of the image teaser.
         * @return {boolean}       If image teaser is first in array.
         */
        isFirstImageTeaser: function (index) {
            return index === 0;
        },
        /**
         * Tells if image teaser with given index is the last image teaser.
         * @param  {number}  index Index of the image teaser.
         * @return {boolean}       If image teaser is last in array.
         */
        isLastImageTeaser: function (index) {
            return index === this.configuration.items.length - 1;
        },
        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal: function (index) {
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/image-teaser-ctatarget-output-" + index);
            this.wWidgetListener(index);
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.ctaTarget is changed
         */
        widgetSetListener: function () {
            var component = this;
            $('.m2c-image-teaser-configurator__cta-target-link').on('change', function () {
                component.onChange();
            });
        },
        /*
         * Check if widget chooser is loaded. If not, wait for it
         */
        wWidgetListener: function (itemIndex) {
            var _this = this;
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                this.disableNotLinksOptions();
                this.setWidgetEvents(itemIndex);
            }
            else {
                window.setTimeout(function () {
                    _this.wWidgetListener(itemIndex);
                }, 300);
            }
        },
        /*
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         */
        setWidgetEvents: function (itemIndex) {
            var _this = this;
            var button = widgetTools.dialogWindow[0].querySelector('#insert_button');
            button.onclick = null;
            button.addEventListener('click', function () {
                _this.configuration.items[itemIndex].href = '';
                wWidget.insertWidget();
            });
        },
        /*
         * Hide all options in widget chooser that are not links
         */
        disableNotLinksOptions: function () {
            if (wWidget.widgetEl && wWidget.widgetEl.options) {
                $(wWidget.widgetEl.options).each(function (i, el) {
                    if (el.value.split('\\').pop() !== 'Link' && i !== 0) {
                        $(el).hide();
                    }
                });
            }
        },
        /* Checks if it's possible to display Delete button
         * This function is used in component's template
         * Button can be displayed only on items that have item uploaded
         * @param index {number} - index of teaser item
         * @returns Boolean
         */
        isPossibleToDelete: function (index) {
            if ((index !== 0 || this.configuration.items.length > 1) && this.configuration.items[index].image !== '') {
                return true;
            }
            return false;
        },
        /* Removes teaser item after Delete button is clicked
         * and triggers component's onChange to update it's configuration
         * @param index {number} - index of teaser item to remove
         */
        deleteTeaserItem: function (index) {
            var component = this;
            confirm({
                content: $t('Are you sure you want to delete this item?'),
                actions: {
                    confirm: function () {
                        component.configuration.items.splice(index, 1);
                        component.onChange();
                    },
                },
            });
        },
        /* Checks if images are all the same size
         * If not - displays error by firing up this.displayImageSizeMismatchError()
         * @param images {array} - array of all uploaded images
         */
        checkImageSizes: function () {
            var itemsToCheck = JSON.parse(JSON.stringify(this.configuration.items)).filter(function (item) {
                return Boolean(item.aspectRatio); // Filter out items without aspect ratio set yet.
            });
            for (var i = 0; i < itemsToCheck.length; i++) {
                if (itemsToCheck[i].aspectRatio !== itemsToCheck[0].aspectRatio) {
                    alert({
                        title: $t('Warning'),
                        content: $t('Images you have uploaded have different aspect ratio. This may cause this component to display wrong. We recommend all images uploaded to have the same aspect ratio.'),
                    });
                    return false;
                }
            }
            return true;
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
        /* Cleans configuration for M2C content constructor after Saving component
         * All empty teaser items has to be removed to not get into configuration object
         */
        cleanupConfiguration: function () {
            this.configuration.items = this.configuration.items.filter(function (item) { return item.image !== ''; });
            this.configuration.ignoredItems = this.configuration.ignoredItems.filter(function (item) { return item.image !== ''; });
            this.onChange();
        },
    },
    ready: function () {
        this.imageUploadListener();
        this.widgetSetListener();
    },
};

/* tslint:disable:no-console */
/**
 * Paragraph configurator component.
 * This component is responsible for displaying paragraph configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccParagraphConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-paragraph-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"textarea-cfg-paragraph\" class=\"cs-input__label cs-input__label--look-top-align\">Paragraph:</label>\n            <textarea name=\"name\" v-model=\"configuration.paragraph\" id=\"textarea-cfg-paragraph\" class=\"cs-input__textarea\" placeholder=\"Your HTML here\" @change=\"onChange\"></textarea>\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        configuration: {
            type: Object,
            default: {
                paragraph: '',
            },
        },
    },
};

/**
 * M2C skin for Paragraph configurator component.
 * This component is responsible for displaying paragraph configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var m2cParagraphConfigurator = {
    mixins: [
        ccParagraphConfigurator,
    ],
    template: "<form class=\"m2c-paragraph-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        \n        <div class=\"m2c-paragraph-configurator__error\" v-text=\"tempConfiguration.errorMessage\" v-show=\"tempConfiguration.errorMessage\">\n        </div>\n\n        <div class=\"m2-input\">\n            <label for=\"input-cfg-id\" class=\"m2-input__label\">" + $t('Identifier') + ":</label>\n            <input type=\"text\" name=\"cfg-id\" v-model=\"tempConfiguration.identifier\" id=\"input-cfg-id\" class=\"m2-input__input m2-input__input--limited-width\" @blur=\"stripSpaces( tempConfiguration.identifier )\" maxlength=\"30\">\n        </div>\n        <div class=\"m2-input\">\n            <label for=\"input-cfg-title\" class=\"m2-input__label\">" + $t('Title') + ":</label>\n            <input type=\"text\" name=\"cfg-title\" v-model=\"tempConfiguration.title\" id=\"input-cfg-title\" class=\"m2-input__input m2-input__input--limited-width\" maxlength=\"100\">\n        </div>\n        <div class=\"m2-input\">\n            <label for=\"textarea-cfg-paragraph\" class=\"m2-input__label m2-input__label--look-top-align\">" + $t('HTML') + ":</label>\n\n            <div class=\"buttons-set | m2c-paragraph-configurator__wysiwyg-buttons\">\n                <button type=\"button\" class=\"scalable action-show-hide\" id=\"toggle-wysiwyg\">" + $t('Show / Hide Editor') + "</button>\n                <button type=\"button\" class=\"scalable action-add-widget plugin\" @click=\"openWidgetModal()\" v-show=\"!isEditorVisible\">" + $t('Insert Widget') + "...</button>\n                <button type=\"button\" class=\"scalable action-add-image plugin\" @click=\"openMediaModal()\" v-show=\"!isEditorVisible\">" + $t('Insert Image') + "...</button>\n                <button type=\"button\" class=\"scalable add-variable plugin\" @click=\"openMagentoVariablesModal()\" v-show=\"!isEditorVisible\">" + $t('Insert Variable') + "...</button>\n            </div>\n\n            <textarea name=\"cfg-paragraph\" v-model=\"tempConfiguration.content\" id=\"textarea-cfg-paragraph\" class=\"m2-input__textarea | m2c-paragraph-configurator__textarea\"></textarea>\n        </div>\n    </form>",
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    blockId: '',
                    title: '',
                };
            },
        },
        restToken: {
            type: String,
            default: '',
        },
        wysiwygConfig: {
            type: String,
            default: '',
        },
        /* Obtain base-url for the image uploader */
        uploaderBaseUrl: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            /*
             * This object if used to operate inside component. We want to bind data to inputs,
             * but we don't need them to be saved in m2c component's config. Only ID is needed,
             * since rest of data id fetched from database.
             */
            tempConfiguration: {
                identifier: '',
                title: '',
                content: '',
                errorMessage: '',
            },
            isEditorVisible: true,
            // wysiwyg editor object
            editor: undefined,
        };
    },
    ready: function () {
        // Check if wysiwygConfig was passed - means that editor is enabled in admin panel
        if (this.wysiwygConfig !== '') {
            this.wysiwygCfg = JSON.parse(this.wysiwygConfig);
            this.wysiwygCfg.height = '300px';
        }
        // Init loader and hide it
        $('body').one().loadingPopup({
            timeout: false,
        }).trigger('hideLoadingPopup');
        // If ID is already provided (means we're in edit mode)
        if (this.configuration.blockId) {
            var component_1 = this;
            // Show loader before request
            $('body').trigger('showLoadingPopup');
            // Send request to REST API to get CMS block data if in edit mode
            this.$http({
                headers: {
                    Accept: 'application/json',
                    Authorization: component_1.restToken,
                },
                method: 'get',
                url: window.location.origin + "/rest/V1/cmsBlock/" + this.configuration.blockId,
            }).then(function (response) {
                // Hide loader
                $('body').trigger('hideLoadingPopup');
                // Update components tempConfiguration
                component_1.tempConfiguration.identifier = response.data.identifier;
                component_1.tempConfiguration.title = response.data.title;
                component_1.tempConfiguration.content = response.data.content;
                component_1.configuration.title = response.data.title;
                // initialize customized WYSIWYG
                if (component_1.wysiwygCfg) {
                    component_1.initWysiwyg();
                }
            }, function (response) {
                $('body').trigger('hideLoadingPopup');
            });
        }
        else {
            // initialize customized WYSIWYG
            if (this.wysiwygCfg) {
                this.initWysiwyg();
            }
        }
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            var component = this;
            // Construct data for REST API
            var dataConstruct = {
                block: {
                    identifier: this.tempConfiguration.identifier,
                    title: this.tempConfiguration.title,
                    content: this.tempConfiguration.content,
                    active: true,
                },
            };
            // Show loader before request
            $('body').trigger('showLoadingPopup');
            // Send request to REST API
            this.$http({
                headers: {
                    Accept: 'application/json',
                    Authorization: component.restToken,
                },
                method: this.configuration.blockId ? 'put' : 'post',
                url: this.configuration.blockId ? window.location.origin + "/rest/V1/cmsBlock/" + this.configuration.blockId : window.location.origin + "/rest/V1/cmsBlock",
                body: dataConstruct,
            }).then(function (response) {
                // If status is OK update component's configuration and run Save to save component data
                if (response.ok) {
                    component.configuration.blockId = response.data.id;
                    component.configuration.title = response.data.title;
                    // Hide loader
                    $('body').trigger('hideLoadingPopup');
                    component.onSave();
                }
            }, function (response) {
                // if failed and response returned any message, put it into error div, else put default text
                if (response.message) {
                    component.tempConfiguration.errorMessage = response.data.message;
                }
                else {
                    component.tempConfiguration.errorMessage = $t('An error occured. Please try again later.');
                }
                // Set headers back
                Vue.http.headers.custom.Accept = 'text/html';
                // Hide loader
                $('body').trigger('hideLoadingPopup');
            });
        },
    },
    methods: {
        stripSpaces: function (str) {
            var striped = str.split(' ').join('-').toLowerCase();
            this.tempConfiguration.identifier = striped;
        },
        /* Opens modal with M2 built-in widget chooser
         */
        openWidgetModal: function () {
            widgetTools.openDialog(this.wysiwygCfg.widget_window_url + "widget_target_id/textarea-cfg-paragraph");
        },
        /* Opens modal with M2 built-in media uploader
         */
        openMediaModal: function () {
            MediabrowserUtility.openDialog(this.uploaderBaseUrl + "target_element_id/textarea-cfg-paragraph", 'auto', 'auto', $t('Insert File...'), {
                closed: true,
            });
        },
        /* Opens modal with M2 built-in variables
         */
        openMagentoVariablesModal: function () {
            MagentovariablePlugin.loadChooser(window.location.origin + "/admin/admin/system_variable/wysiwygPlugin/", 'textarea-cfg-paragraph');
        },
        initWysiwyg: function () {
            var _this = this;
            window.tinyMCE_GZ = window.tinyMCE_GZ || {};
            window.tinyMCE_GZ.loaded = true;
            require([
                'mage/translate',
                'mage/adminhtml/events',
                'm2cTinyMceWysiwygSetup',
                'mage/adminhtml/wysiwyg/widget',
            ], function () {
                // Setup (this global variable is already set in constructor.phtml)
                csWysiwygEditor = new m2cTinyMceWysiwygSetup('textarea-cfg-paragraph', _this.wysiwygCfg);
                // Initialization
                csWysiwygEditor.setup('exact');
                _this.isEditorVisible = true;
                // Set listener for enable/disable editor button
                Event.observe('toggle-wysiwyg', 'click', function () {
                    csWysiwygEditor.toggle();
                    _this.isEditorVisible = !_this.isEditorVisible;
                }.bind(csWysiwygEditor));
                // Set handlers for editor
                var editorFormValidationHandler = csWysiwygEditor.onFormValidation.bind(csWysiwygEditor);
                varienGlobalEvents.attachEventHandler('formSubmit', editorFormValidationHandler);
                varienGlobalEvents.clearEventHandlers('open_browser_callback');
                // Add callback for editor's IMAGE button to open file uploader while clicked
                varienGlobalEvents.attachEventHandler('open_browser_callback', csWysiwygEditor.openFileBrowser);
            });
        },
    },
};

/**
 * Product carousel configurator component.
 * This component is responsible for displaying product carousel's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccProductCarouselConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-product-carousel-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-pc-category\" class=\"cs-input__label\">Select Category:</label>\n            <select name=\"cfg-pc-category-select\" class=\"cs-input__select\" id=\"cfg-pc-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n                <option value=\"\">-- Please select category --</option>\n            </select>\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-pc-order-by\" class=\"cs-input__label\">Order by:</label>\n            <select name=\"cfg-pc-order-by\" class=\"cs-input__select\" id=\"cfg-pc-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                <option value=\"creation_date-DESC\">Creation date: newest</option>\n                <option value=\"creation_date-ASC\">Creation date: oldest</option>\n                <option value=\"price-DESC\">Price: cheapest</option>\n                <option value=\"price-ASC\">Price: most expensive</option>\n            </select>\n            <select name=\"cfg-pc-order-type\" class=\"cs-input__select\" v-model=\"configuration.order_type\" @change=\"onChange\">\n                <option value=\"ASC\">ASC</option>\n                <option value=\"DESC\">DESC</option>\n            </select>\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-pc-order-by\" class=\"cs-input__label\">Show:</label>\n            <select name=\"cfg-pc-limit\" class=\"cs-input__select\" id=\"cfg-pc-limit\" v-model=\"configuration.limit\" @change=\"onChange\">\n                <option value=\"20\">20 products</option>\n                <option value=\"40\">40 products</option>\n                <option value=\"60\">60 products</option>\n                <option value=\"80\">80 products</option>\n                <option value=\"100\">100 products</option>\n            </select>\n        </div>\n\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'DESC',
                    limit: 20,
                };
            },
        },
    },
};

/**
 * M2C Product carousel component for admin panel.
 * This component is responsible for managing product carousel's configuration
 */
var m2cProductCarouselConfigurator = {
    mixins: [
        ccProductCarouselConfigurator,
    ],
    template: '#m2c-product-carousel-form',
    props: {
        /* Obtain endpoint for getting categories data for category picker */
        categoriesDataUrl: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            categoryPicker: undefined,
        };
    },
    ready: function () {
        var _this = this;
        // Show loader
        $('body').trigger('showLoadingPopup');
        // Get categories JSON with AJAX
        this.$http.get(this.categoriesDataUrl).then(function (response) {
            _this.categoryPicker = new CcCategoryPicker($('#cp-products-carousel'), JSON.parse(response.body), {
                multiple: false,
            });
            // Hide loader
            $('body').trigger('hideLoadingPopup');
        });
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
    template: "<form class=\"m2c-products-grid-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2c-products-grid-configurator__columns\">\n            <div class=\"m2c-products-grid-configurator__column-left\">\n\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-category\" class=\"m2-input__label\">" + $t('Category ID') + ":</label>\n                    <input type=\"hidden\" name=\"cfg-pg-category-select\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-order-by\" class=\"m2-input__label\">" + $t('Order by:') + "</label>\n                    <select name=\"cfg-pg-order-by\" class=\"m2-input__select\" id=\"cfg-pg-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                        <option value=\"creation_date\">" + $t('Creation date') + "</option>\n                        <option value=\"price\">" + $t('Price') + "</option>\n                    </select>\n                    <select name=\"cfg-pg-order-type\" class=\"m2-input__select\" v-model=\"configuration.order_type\" @change=\"onChange\">\n                        <option value=\"ASC\">" + $t('ASC') + "</option>\n                        <option value=\"DESC\">" + $t('DESC') + "</option>\n                    </select>\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-rows_desktop\" class=\"m2-input__label\">" + $t('Rows desktop') + ":</label>\n                    <select name=\"cfg-pg-rows_desktop\" class=\"m2-input__select\" id=\"cfg-pg-rows_desktop\" v-model=\"configuration.rows_desktop\" @change=\"onChange\" number>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                    </select>\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-rows_tablet\" class=\"m2-input__label\">" + $t('Rows tablet') + ":</label>\n                    <select name=\"cfg-pg-rows_tablet\" class=\"m2-input__select\" id=\"cfg-pg-rows_tablet\" v-model=\"configuration.rows_tablet\" @change=\"onChange\" number>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                    </select>\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-rows_mobile\" class=\"m2-input__label\">" + $t('Rows mobile') + ":</label>\n                    <select name=\"cfg-pg-rows_mobile\" class=\"m2-input__select\" id=\"cfg-pg-rows_mobile\" v-model=\"configuration.rows_mobile\" @change=\"onChange\" number>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                    </select>\n                </div>\n\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-hero\" class=\"m2-input__label\">" + $t('Hero image') + ":</label>\n                    <select name=\"cfg-pg-hero\" class=\"m2-input__select\" id=\"cfg-pg-hero\" v-model=\"configuration.hero.position\" @change=\"onChange\">\n                        <option value=\"\">" + $t('No hero image') + "</option>\n                        <option value=\"left\">" + $t('Left') + "</option>\n                        <option value=\"right\">" + $t('Right') + "</option>\n                    </select>\n                </div>\n\n                <div class=\"m2-input\" v-show=\"configuration.hero.position\">\n                    <div class=\"m2-input m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_headline\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-hero_headline\" v-model=\"configuration.hero.headline\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_subheadline\" class=\"m2-input__label\">" + $t('Subheadline') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_subheadline\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-hero_subheadline\" v-model=\"configuration.hero.subheadline\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_paragraph\" class=\"m2-input__label | m2c-products-grid-configurator__form-label--textarea\">" + $t('Paragraph') + ":</label>\n                        <textarea type=\"text\" name=\"cfg-pg-hero_paragraph\" class=\"m2-input__textarea | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-hero_paragraph\" placeholder=\"" + $t('(max 200 characters)') + "\" maxlength=\"200\" v-model=\"configuration.hero.paragraph\"></textarea>\n                    </div>\n                    <div class=\"m2-input m2-input--type-addon m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_url\" class=\"m2-input__label\">" + $t('Url') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_url\" class=\"m2-input__input | m2c-products-grid-configurator__form-input | m2c-products-grid__hero-url\" id=\"cfg-pg-hero_url\" v-model=\"configuration.hero.href\">\n                        <span class=\"m2-input__addon | m2c-products-grid-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal()\">\n                            <svg class=\"m2-input__addon-icon\">\n                                <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_link' }\"></use>\n                            </svg>\n                        </span>\n                    </div>\n                    <div class=\"m2-input m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_button_label\" class=\"m2-input__label\">" + $t('Button label') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_button_label\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-hero_button_label\" v-model=\"configuration.hero.button.label\" @change=\"onChange\">\n                    </div>\n                </div>\n\n            </div>\n            <div v-bind:class=\"[ 'm2c-products-grid-configurator__column-right', configuration.hero.image.src ? 'm2c-products-grid-configurator__column-right--look-image-uploaded' : '' ]\" v-show=\"configuration.hero.position\">\n                <div class=\"m2c-products-grid-configurator__toolbar\">\n                    <template v-if=\"configuration.hero.image.src\">\n                        <a href=\"#\" @click=\"getImageUploader()\">" + $t('Change image') + "</a>\n                    </template>\n                    <template v-else>\n                        <a href=\"#\" @click=\"getImageUploader()\">" + $t('Upload image') + "</a>\n                    </template>\n                    <span class=\"m2c-image-teaser-configurator__size-info\">{{ configuration.hero.size_info }}</span>\n                </div>\n                <div class=\"m2c-products-grid-configurator__image-wrapper\">\n                    <img :src=\"configuration.hero.image.src\" class=\"m2c-image-teaser-configurator__item-image\" v-show=\"configuration.hero.image.src\">\n                    <input type=\"hidden\" v-model=\"configuration.hero.image.src\">\n                    <input type=\"hidden\" class=\"m2c-products-grid-configurator__image-url\" id=\"products-grid-img\">\n                </div>\n            </div>\n        </div>\n    </form>",
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
            categoryPicker: undefined,
        };
    },
    methods: {
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
         * Check if widget chooser is loaded. If not, wait for it
         */
        wWidgetListener: function () {
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                this.disableNotLinksOptions();
                this.setWidgetEvents();
            }
            else {
                setTimeout(this.wWidgetListener, 300);
            }
        },
        /*
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         */
        setWidgetEvents: function () {
            var _this = this;
            var button = widgetTools.dialogWindow[0].querySelector('#insert_button');
            button.onclick = null;
            button.addEventListener('click', function () {
                _this.configuration.hero.href = '';
                wWidget.insertWidget();
            });
        },
        /*
         * Hide all options in widget chooser that are not links
         */
        disableNotLinksOptions: function () {
            if (wWidget.widgetEl && wWidget.widgetEl.options) {
                $(wWidget.widgetEl.options).each(function (i, el) {
                    if (el.value.split('\\').pop() !== 'Link' && i !== 0) {
                        $(el).hide();
                    }
                });
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
        });
        this.imageUploadListener();
        this.widgetSetListener();
    },
};

/**
 * Static block configurator component.
 * This component is responsible for displaying static block's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccStaticBlockConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-static-block-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-static-block\" class=\"cs-input__label\">Static block:</label>\n            <select name=\"select\" class=\"cs-input__select\" id=\"cfg-static-block\" v-model=\"configuration.identifier\" @change=\"onChange\">\n                <option value=\"1\" selected>Foo</option>\n                <option value=\"2\">Bar</option>\n            </select>\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    identifier: '',
                    title: '',
                };
            },
        },
    },
};

var m2cStaticBlockConfigurator = {
    mixins: [
        ccStaticBlockConfigurator,
    ],
    template: '#m2c-static-blocks-form',
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save': function () {
            var selectedOption = this.$els.cmsBlocksSelect.options[this.$els.cmsBlocksSelect.selectedIndex];
            if (this.configuration.identifier === selectedOption.value && this.configuration.identifier !== '') {
                this.configuration.title = selectedOption.text;
                this.onSave();
            }
        },
    },
};

/**
 * Componen picker.
 * Lists all types of components available in m2c in the grid/list mode
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentPicker = {
    template: "<section class=\"cc-component-picker | {{ class }}\">\n        <ul class=\"cc-component-picker__list\" v-if=\"availableComponents.length\">\n            <li class=\"cc-component-picker__list-item cc-component-picker__list-item--{{component.type}}\" v-for=\"component in availableComponents\">\n                <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\">\n                    <span class=\"cc-component-picker__component-figure\">\n                        <svg class=\"cc-component-picker__component-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#icon_component-' + component.type }\"></use>\n                        </svg>\n                    </span>\n                    <span class=\"cc-component-picker__component-name\">{{ component.name }}</span>\n                    <span class=\"cc-component-picker__component-description\">{{ component.description }}</span>\n                </a>\n            </li>\n        </ul>\n        <p class=\"cc-component-picker__no-components\" v-if=\"!availableComponents.length\">\n            No components available.\n        </p>\n    </section>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: function (value) { return value.replace('cc-component-picker', ''); },
        },
        /**
         * Property containing callback triggered when user picks component.
         */
        pickComponent: {
            type: Function,
        },
        /**
         * JSON stringified array containing available components.
         */
        components: {
            type: String,
            default: '',
        },
        /**
         * URL for API returning JSON stringified array containing available components.
         */
        componentsEndpoint: {
            type: String,
            default: '',
        },
        /**
         * Assets src for icon
         */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            availableComponents: [],
        };
    },
    ready: function () {
        // If inline JSON is provided then parse it.
        if (this.components) {
            this.availableComponents = JSON.parse(this.components);
        }
        else if (this.componentsEndpoint) {
            // Otherwise load from endpoint if URL provided.
            this.$http.get(this.componentsEndpoint).then(function (response) {
                this.availableComponents = response.json();
            });
        }
    },
    methods: {
        /**
         * Component pick click handler.
         * This handler triggers "cc-component-picker__pick" event up the DOM chain when called.
         * @param {Event} event Click event object.
         */
        onPickComponent: function (componentType) {
            this.$dispatch('cc-component-picker__pick', componentType);
            if (typeof this.pickComponent === 'function') {
                this.pickComponent(componentType);
            }
        },
    },
};

/**
 * Brand carousel preview component.
 * This component is responsible for displaying preview of brand carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentBrandCarouselPreview = {
    template: "<div class=\"cc-component-brand-carousel-preview\">\n        <svg class=\"cc-component-brand-carousel-preview__arrow cc-component-brand-carousel-preview__arrow--left\">\n            <use xlink:href=\"#icon_dashboard-arrow-left\"></use>\n        </svg>\n\n        <ul class=\"cc-component-brand-carousel-preview__list\">\n            <template v-for=\"item in 6\">\n                <li class=\"cc-component-brand-carousel-preview__list-item\">\n                    <div class=\"cc-component-brand-carousel-preview__brand-wrapper\">\n                        <svg class=\"cc-component-brand-carousel-preview__brand\">\n                            <use xlink:href=\"#icon_component-cc-brand-logo\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <svg class=\"cc-component-brand-carousel-preview__arrow cc-component-brand-carousel-preview__arrow--right\">\n            <use xlink:href=\"#icon_dashboard-arrow-right\"></use>\n        </svg>\n    </div>",
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        /**
         * Assets (icons) source path.
         */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
};

/**
 * Button preview component.
 * This component is responsible for displaying preview of button component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentButtonPreview = {
    template: "<div class=\"cc-component-button-preview\">\n        <button class=\"cc-component-button-preview__button\" type=\"button\">{{ configuration.label }}</button>\n    </div>",
    props: {
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

/**
 * Brand carousel preview component.
 * This component is responsible for displaying preview of brand carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentCategoryLinksPreview = {
    template: "<div class=\"cc-component-category-links-preview\">\n        <div class=\"cc-component-category-links-preview__wrapper\">\n            <h1 class=\"cc-component-category-links-preview__headline\">{{ configuration.main_category_labels[0] }}</h1>\n            <div class=\"cc-component-category-links-preview__content\">\n                <ul class=\"cc-component-category-links-preview__subcats\">\n                    <template v-for=\"(index, label) in configuration.sub_categories_labels\">\n                        <li class=\"cc-component-category-links-preview__subcat\" v-if=\"index < configuration.sub_categories_labels.length\">\n                            <span class=\"cc-component-category-links-preview__subcat-label\">{{ label }}</span>\n                        </li>\n                    </template>\n                </ul>\n\n                <div class=\"cc-component-category-links-preview__all-button\">\n                    <span class=\"cc-component-category-links-preview__all-button-text\">" + $t('All products') + "</span>\n                </div>\n            </div>\n        </div>\n    </div>",
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

/**
 * Headline preview component.
 * This component is responsible for displaying preview of headline component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentHeadlinePreview = {
    template: "<div class=\"cc-component-headline-preview\">\n        <h1 class=\"cc-component-headline-preview__headline\">{{ configuration.title }}</h1>\n        <h2 class=\"cc-component-headline-preview__subheadline\">{{ configuration.subtitle }}</h2>\n    </div>",
    props: {
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentImageTeaserPreview = {
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-image-teaser-preview\" v-show=\"!isLoading\">\n        <div class=\"cc-component-image-teaser-preview__wrapper\">\n            <ul class=\"cc-component-image-teaser-preview__scene cc-component-image-teaser-preview__scene--{{ configuration.currentScenario.desktopLayout.id }}-in-row\" v-el:scene>\n                <template v-for=\"item in configuration.items\">\n                    <li class=\"cc-component-image-teaser-preview__item\" v-show=\"configuration.items[$index].image\">\n                        <img :src=\"configuration.items[$index].image\" class=\"cc-component-image-teaser-preview__item-image\">\n                        <div class=\"cc-component-image-teaser-preview__item-content\">\n                            <h2 class=\"cc-component-image-teaser-preview__headline\" v-if=\"configuration.items[$index].headline\">{{ configuration.items[$index].headline }}</h2>\n                            <h3 class=\"cc-component-image-teaser-preview__subheadline\" v-if=\"configuration.items[$index].subheadline\">{{ configuration.items[$index].subheadline }}</h3>\n                            <p class=\"cc-component-image-teaser-preview__paragraph\" v-if=\"configuration.items[$index].paragraph\">{{ configuration.items[$index].paragraph }}</p>\n                            <template v-if=\"configuration.items[$index].href\">\n                                <button type=\"button\" class=\"cc-component-image-teaser-preview__button\" v-if=\"configuration.items[$index].ctaLabel\">{{ configuration.items[$index].ctaLabel }}</button>\n                            </template>\n                        </div>\n                    </li>\n                </template>\n            </ul>\n        </div>\n    </div>",
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        isLoading: {
            type: Boolean,
            default: true,
        }
    },
    ready: function () {
        this.setImagesLoadListener();
    },
    methods: {
        /**
         * Checks for status of images if they're loaded.
         * After they're all loaded spinner is hidden and content displayed.
         */
        setImagesLoadListener: function () {
            var _this = this;
            var $images = $(this.$els.scene).find('img');
            var imagesCount = $images.length;
            $images.load(function () {
                imagesCount--;
                if (!imagesCount) {
                    _this.isLoading = false;
                    $images.each(function () {
                        $(this).addClass('cc-component-image-teaser-preview__item-image--border');
                    });
                }
            }).filter(function () { return this.complete; }).load();
        },
    }
};

/**
 * Image teaser preview component.
 * This component is responsible for displaying preview of image teaser component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentHeroCarouselPreview = {
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-hero-carousel-preview\">\n        <div v-bind:class=\"sceneClass\" v-el:scene>\n            <div class=\"cc-component-hero-carousel-preview__slide\" v-if=\"configuration.items.length > 1\">\n                <img :src=\"configuration.items[configuration.items.length - 1].image\" class=\"cc-component-hero-carousel-preview__image\">\n            </div>\n\n            <template v-for=\"(index, item) in configuration.items\">\n                <div class=\"cc-component-hero-carousel-preview__slide\" v-if=\"index < 2\">\n                    <img :src=\"configuration.items[$index].image\" class=\"cc-component-hero-carousel-preview__image\">\n                    <div class=\"cc-component-hero-carousel-preview__slide-content\" v-if=\"index == 0 || configuration.items.length == 1\">\n                        <div class=\"cc-component-hero-carousel-preview__thumbs\">\n                            <template v-for=\"(idx, slide) in configuration.items\">\n                                <img :src=\"configuration.items[idx].image\" class=\"cc-component-hero-carousel-preview__thumb\">\n                            </template>\n                        </div>\n                        <div class=\"cc-component-hero-carousel-preview__slide-content-info\">\n                            <h2 class=\"cc-component-hero-carousel-preview__headline\" v-if=\"configuration.items[$index].headline\">{{ configuration.items[$index].headline }}</h2>\n                            <h3 class=\"cc-component-hero-carousel-preview__subheadline\" v-if=\"configuration.items[$index].subheadline\">{{ configuration.items[$index].subheadline }}</h3>\n                            <p class=\"cc-component-hero-carousel-preview__paragraph\" v-if=\"configuration.items[$index].paragraph\">{{ configuration.items[$index].paragraph }}</p>\n                            <template v-if=\"configuration.items[$index].href\">\n                                <button type=\"button\" class=\"cc-component-hero-carousel-preview__button\" v-if=\"configuration.items[$index].ctaLabel\">{{ configuration.items[$index].ctaLabel }}</button>\n                            </template>\n                        </div>\n                    </div>\n                </div>\n            </template>\n        </div>\n    </div>",
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        isLoading: {
            type: Boolean,
            default: true,
        }
    },
    ready: function () {
        this.setImagesLoadListener();
    },
    computed: {
        sceneClass: function () {
            if (this.configuration.items.length > 1) {
                return 'cc-component-hero-carousel-preview__scene';
            }
            return 'cc-component-hero-carousel-preview__scene cc-component-hero-carousel-preview__scene--single';
        },
    },
    methods: {
        /**
         * Checks for status of images if they're loaded.
         * After they're all loaded spinner is hidden and content displayed.
         */
        setImagesLoadListener: function () {
            var _this = this;
            var $images = $(this.$els.scene).find('img');
            var imagesCount = $images.length;
            $images.load(function () {
                imagesCount--;
                if (!imagesCount) {
                    _this.isLoading = false;
                    $images.each(function () {
                        $(this).addClass('cc-component-hero-carousel-preview__image--border');
                    });
                }
            }).filter(function () { return this.complete; }).load();
        },
    },
};

/**
 * Paragraph preview component.
 * This component is responsible for displaying preview of Paragraph component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentParagraphPreview = {
    template: "<div class=\"cc-component-paragraph-preview\">\n        <div class=\"cc-component-paragraph-preview__content\">\n            <svg class=\"cc-component-paragraph-preview__bg\">\n                <use xlink:href=\"#icon_component-paragraph-preview\"></use>\n            </svg>\n            <h2 class=\"cc-component-paragraph-preview__title\">{{ configuration.title }}</h2>\n        </div>\n    </div>",
    props: {
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    }
};

/**
 * Product carousel preview component.
 * This component is responsible for displaying preview of product carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentProductCarouselPreview = {
    template: "<div class=\"cc-component-product-carousel-preview\">\n        <svg class=\"cc-component-product-carousel-preview__arrow cc-component-product-carousel-preview__arrow--left\">\n            <use xlink:href=\"#icon_dashboard-arrow-left\"></use>\n        </svg>\n\n        <ul class=\"cc-component-product-carousel-preview__list\">\n            <template v-for=\"item in 4\">\n                <li class=\"cc-component-product-carousel-preview__list-item\">\n                    <div class=\"cc-component-product-carousel-preview__product-wrapper\">\n                        <svg class=\"cc-component-product-carousel-preview__product\">\n                            <use xlink:href=\"#icon_component-cc-product-teaser-item\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <svg class=\"cc-component-product-carousel-preview__arrow cc-component-product-carousel-preview__arrow--right\">\n            <use xlink:href=\"#icon_dashboard-arrow-right\"></use>\n        </svg>\n    </div>",
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        /**
         * Assets (icons) source path.
         */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
};

/**
 * Product carousel preview component.
 * This component is responsible for displaying preview of product carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentProductGridPreview = {
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-product-grid-preview\" v-show=\"!isLoading\" v-el:scene>\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero.position == 'left' && configuration.hero.image.src\">\n            <img :src=\"configuration.hero.image.src\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero.headline\">{{ configuration.hero.headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero.subheadline\">{{ configuration.hero.subheadline }}</h3>\n                <p class=\"cc-component-product-grid-preview__paragraph\" v-if=\"configuration.hero.paragraph\">{{ configuration.hero.paragraph }}</p>\n                <template v-if=\"configuration.hero.href\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.hero.button.label\">{{ configuration.hero.button.label }}</button>\n                </template>\n            </div>\n        </div>\n\n        <ul v-bind:class=\"itemsGridClass\">\n            <template v-for=\"item in getItemsCount()\">\n                <li class=\"cc-component-product-grid-preview__list-item\">\n                    <div class=\"cc-component-product-grid-preview__product-wrapper\">\n                        <svg class=\"cc-component-product-grid-preview__product\">\n                            <use xlink:href=\"#icon_component-cc-product-teaser-item\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero.position == 'right' && configuration.hero.image.src\">\n            <img :src=\"configuration.hero.image.src\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero.headline\">{{ configuration.hero.headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero.subheadline\">{{ configuration.hero.subheadline }}</h3>\n                <p class=\"cc-component-product-grid-preview__paragraph\" v-if=\"configuration.hero.paragraph\">{{ configuration.hero.paragraph }}</p>\n                <template v-if=\"configuration.hero.href\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.hero.button.label\">{{ configuration.hero.button.label }}</button>\n                </template>\n            </div>\n        </div>\n    </div>",
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        isLoading: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        itemsGridClass: function () {
            if (this.configuration.hero.position) {
                return "cc-component-product-grid-preview__list cc-component-product-grid-preview__list--" + this.configuration.hero.position;
            }
            return 'cc-component-product-grid-preview__list';
        },
    },
    ready: function () {
        this.setImagesLoadListener();
    },
    methods: {
        /**
         * Checks for status of images if they're loaded.
         * After they're all loaded spinner is hidden and content displayed.
         */
        setImagesLoadListener: function () {
            var _this = this;
            var $images = $(this.$els.scene).find('img');
            var imagesCount = $images.length;
            if (imagesCount) {
                $images.load(function () {
                    imagesCount--;
                    if (!imagesCount) {
                        _this.isLoading = false;
                    }
                }).filter(function () { return this.complete; }).load();
            }
            else {
                _this.isLoading = false;
            }
        },
        getItemsCount: function () {
            return this.configuration.hero.position ? 6 : 10;
        }
    },
};

/**
 * Separator preview component.
 * This component is responsible for displaying preview of separator component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentSeparatorPreview = {
    template: "<div class=\"cc-component-separator-preview\">\n        <hr class=\"cc-component-separator-preview__separator\">\n    </div>",
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

/**
 * CMS block preview component.
 * This component is responsible for displaying preview of CMS block component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentStaticCmsBlockPreview = {
    template: "<div class=\"cc-component-static-cms-block-preview\">\n        <div class=\"cc-component-static-cms-block-preview__content\">\n            <svg class=\"cc-component-static-cms-block-preview__bg\">\n                <use xlink:href=\"#icon_component-cms-block-preview\"></use>\n            </svg>\n            <h2 class=\"cc-component-static-cms-block-preview__title\">{{ configuration.title }}</h2>\n        </div>\n    </div>",
    props: {
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
    },
};

var template$1 = "<div class=\"cc-layout-builder | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use xlink:href=\"#icon_plus\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"component in components\">\n        <div class=\"cc-layout-builder__component\">\n            <div class=\"cc-layout-builder__component-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__buttons\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" :class=\"[ isPossibleToEdit( component.type ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isPossibleToEdit( component.type )\" @click=\"editComponentSettings( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_settings\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-layout-builder__component-wrapper\">\n                <cc-component-placeholder>\n                    <h3 class=\"cc-component-placeholder__headline\" v-text=\"transformComponentTypeToText( component.type )\"></h3>\n                    <div class=\"cc-component-placeholder__component\">\n                        <component :is=\"'cc-component-' + component.type + '-preview'\" :configuration=\"component.data\" :index=\"$index\"></component>\n\n                    </div>\n                </cc-component-placeholder>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"components.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</div>\n";

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
var layoutBuilder = {
    template: template$1,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
        'cc-component-brand-carousel-preview': ccComponentBrandCarouselPreview,
        'cc-component-button-preview': ccComponentButtonPreview,
        'cc-component-headline-preview': ccComponentHeadlinePreview,
        'cc-component-image-teaser-preview': ccComponentImageTeaserPreview,
        'cc-component-hero-carousel-preview': ccComponentHeroCarouselPreview,
        'cc-component-category-links-preview': ccComponentCategoryLinksPreview,
        'cc-component-static-cms-block-preview': ccComponentStaticCmsBlockPreview,
        'cc-component-paragraph-preview': ccComponentParagraphPreview,
        'cc-component-product-carousel-preview': ccComponentProductCarouselPreview,
        'cc-component-product-grid-preview': ccComponentProductGridPreview,
        'cc-component-separator-preview': ccComponentSeparatorPreview,
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [String, Object, Array],
            default: '',
        },
        assetsSrc: {
            type: String,
            default: '',
        },
        /**
         * Initial component configuration encoded as JSON string.
         */
        componentsConfiguration: {
            type: String,
            default: '',
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should take IComponentInformation and return changed version of it.
         * If callback returns falsy value then component isn't changed.
         */
        editComponent: {
            type: Function,
            default: function (componentInfo) { return componentInfo; },
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should return IComponentInformation.
         * If callback returns falsy value then component isn't added.
         */
        addComponent: {
            type: Function,
            default: function () { return undefined; },
        },
    },
    data: function () {
        return {
            components: [],
        };
    },
    ready: function () {
        // Set initial components configuration if provided.
        this.components = this.componentsConfiguration ? JSON.parse(this.componentsConfiguration) : [];
        this.$dispatch('cc-layout-builder__update');
    },
    methods: {
        /**
         * Returns components information currently stored within layout builder.
         * @return {IComponentInformation[]} Components information array.
         */
        getComponentInformation: function () {
            return JSON.parse(JSON.stringify(this.components));
        },
        /**
         * Sets provided component information on current index in components array.
         * If component exists on given index then this compoennt will be inserted before it.
         * @param {number}                index         Component index in components array.
         * @param {IComponentInformation} componentInfo Component information.
         */
        addComponentInformation: function (index, componentInfo) {
            if (componentInfo) {
                this.components.splice(index, 0, componentInfo);
                this.$dispatch('cc-layout-builder__update');
            }
        },
        /**
         * Sets provided component information on current index in components array.
         * If component exists on given index then it will be overwritten.
         * @param {number}                index         Component index in components array.
         * @param {IComponentInformation} componentInfo Component information.
         */
        setComponentInformation: function (index, componentInfo) {
            if (componentInfo) {
                this.components.$set(index, componentInfo);
                this.$dispatch('cc-layout-builder__update');
            }
        },
        /**
         * Creates new component and adds it to a specified index.
         * This function calls callback specified by "add-component" property that
         * should return IComponentInformation.
         * If callback returns falsy value then component isn't added.
         * @param {number} index New component's index in components array.
         */
        createNewComponent: function (index) {
            var _this = this;
            /**
             * To allow both sync and async set of new component data we call
             * provided handler with callback function.
             * If handler doesn't return component information then it can still
             * set it using given callback.
             */
            var componentInfo = this.addComponent(function (asyncComponentInfo) {
                _this.addComponentInformation(index, asyncComponentInfo);
            });
            this.addComponentInformation(index, componentInfo);
        },
        /**
         * Initializes edit mode of component.
         * This function invokes callback given by "edit-component" callback that
         * should take current IComponentInformation as param and return changed version of it.
         * If callback returns falsy value then component isn't changed.
         * @param {string} index: Component's index in array.
         */
        editComponentSettings: function (index) {
            var _this = this;
            // Create a static, non-reactive copy of component data.
            var componentInfo = JSON.parse(JSON.stringify(this.components[index]));
            /**
             * To allow both sync and async set of new component data we call
             * provided handler with current component data and callback function.
             * If handler doesn't return component information then it can still
             * set it using given callback.
             */
            componentInfo = this.editComponent(componentInfo, function (asyncComponentInfo) {
                _this.setComponentInformation(index, asyncComponentInfo);
            });
            this.setComponentInformation(index, componentInfo);
        },
        /**
         * Moves component under given index up by swaping it with previous element.
         * @param {number} index Component's index in array.
         */
        moveComponentUp: function (index) {
            var _this = this;
            if (index > 0) {
                var previousComponent_1 = this.components[index - 1];
                var $thisComponent_1 = $("#" + this.components[index].id);
                var $prevComponent_1 = $("#" + this.components[index - 1].id);
                $thisComponent_1.addClass('m2c-layout-builder__component--animating').css('transform', "translateY( " + -Math.abs($prevComponent_1.outerHeight(true)) + "px )");
                $prevComponent_1.addClass('m2c-layout-builder__component--animating').css('transform', "translateY( " + $thisComponent_1.outerHeight(true) + "px )");
                setTimeout(function () {
                    _this.components.$set(index - 1, _this.components[index]);
                    _this.components.$set(index, previousComponent_1);
                    _this.$dispatch('cc-layout-builder__update');
                    $thisComponent_1.removeClass('m2c-layout-builder__component--animating').css('transform', '');
                    $prevComponent_1.removeClass('m2c-layout-builder__component--animating').css('transform', '');
                }, 400);
            }
        },
        /**
         * Moves component under given index down by swaping it with next element.
         * @param {number} index Component's index in array.
         */
        moveComponentDown: function (index) {
            var _this = this;
            if (index < this.components.length - 1) {
                var previousComponent_2 = this.components[index + 1];
                var $thisComponent_2 = $("#" + this.components[index].id);
                var $nextComponent_1 = $("#" + this.components[index + 1].id);
                $thisComponent_2.addClass('m2c-layout-builder__component--animating').css('transform', "translateY( " + $nextComponent_1.outerHeight(true) + "px )");
                $nextComponent_1.addClass('m2c-layout-builder__component--animating').css('transform', "translateY( " + -Math.abs($thisComponent_2.outerHeight(true)) + "px )");
                setTimeout(function () {
                    _this.components.$set(index + 1, _this.components[index]);
                    _this.components.$set(index, previousComponent_2);
                    _this.$dispatch('cc-layout-builder__update');
                    $thisComponent_2.removeClass('m2c-layout-builder__component--animating').css('transform', '');
                    $nextComponent_1.removeClass('m2c-layout-builder__component--animating').css('transform', '');
                }, 400);
            }
        },
        /**
         * Removes component and adder that is right after component from the DOM
         * @param {number} index Component's index in array.
         */
        deleteComponent: function (index) {
            if (window.confirm('Are you sure you want to delete this item?')) {
                this.components.splice(index, 1);
                this.$dispatch('cc-layout-builder__update');
            }
        },
        /**
         * Tells if component with given index is the first component.
         * @param  {number}  index Index of the component.
         * @return {boolean}       If component is first in array.
         */
        isFirstComponent: function (index) {
            return index === 0;
        },
        /**
         * Tells if component with given index is the last component.
         * @param  {number}  index Index of the component.
         * @return {boolean}       If component is last in array.
         */
        isLastComponent: function (index) {
            return index === this.components.length - 1;
        },
        transformComponentTypeToText: function (componentType) {
            return componentType.replace('-', ' ');
        },
        isPossibleToEdit: function (componentType) {
            return componentType === 'brand-carousel' || componentType === 'separator';
        },
    },
};

var template$2 = "<div class=\"m2c-layout-builder | {{ class }}\">\n    <div class=\"m2c-layout-builder__component m2c-layout-builder__component--static\">\n        <div class=\"m2c-layout-builder__component-wrapper\">\n            <div class=\"cc-component-placeholder__component cc-component-placeholder__component--decorated cc-component-placeholder__component--header\">\n                <svg class=\"cc-component-placeholder__component-icon\">\n                    <use xlink:href=\"#icon_component-cc-header\"></use>\n                </svg>\n            </div>\n        </div>\n\n        <cc-component-adder class=\"cc-component-adder cc-component-adder--last\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( 0 )\">\n                <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </div>\n\n    <template v-for=\"component in components\">\n        <div class=\"m2c-layout-builder__component\" id=\"{{ component.id }}\">\n            <cc-component-adder class=\"cc-component-adder cc-component-adder--first\">\n                <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( $index )\">\n                    <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                        <use xlink:href=\"#icon_plus\"></use>\n                    </svg>\n                </button>\n            </cc-component-adder>\n\n            <div class=\"m2c-layout-builder__component-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__buttons\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" :class=\"[ isPossibleToEdit( component.type ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isPossibleToEdit( component.type )\" @click=\"editComponentSettings( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_edit\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"m2c-layout-builder__component-wrapper\">\n                <cc-component-placeholder>\n                    <h3 class=\"cc-component-placeholder__headline\" v-text=\"transformComponentTypeToText( component.type )\"></h3>\n                    <div class=\"cc-component-placeholder__component\">\n\n                        <component :is=\"'cc-component-' + component.type + '-preview'\" :configuration=\"component.data\" :index=\"$index\" :assets-src=\"assetsSrc\"></component>\n\n                    </div>\n                </cc-component-placeholder>\n            </div>\n\n            <cc-component-adder class=\"cc-component-adder cc-component-adder--last\">\n                <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( $index + 1 )\">\n                    <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                        <use xlink:href=\"#icon_plus\"></use>\n                    </svg>\n                </button>\n            </cc-component-adder>\n        </div>\n    </template>\n\n    <div class=\"m2c-layout-builder__component m2c-layout-builder__component--static\">\n        <cc-component-adder class=\"cc-component-adder cc-component-adder--first\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( components.length + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n\n        <div class=\"m2c-layout-builder__component-wrapper\">\n            <div class=\"cc-component-placeholder__component cc-component-placeholder__component--decorated cc-component-placeholder__component--footer\">\n                <svg class=\"cc-component-placeholder__component-icon\">\n                    <use xlink:href=\"#icon_component-cc-footer\"></use>\n                </svg>\n            </div>\n        </div>\n    </div>\n</div>\n";

/**
 * Layout builder component - M2 implementation.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
var m2cLayoutBuilder = {
    template: template$2,
    mixins: [
        layoutBuilder,
    ],
    /**
     * Get dependencies
     */
    components: {
        'm2c-paragraph-configurator': m2cParagraphConfigurator,
    },
    methods: {
        /* Removes component from M2C
         * If it's paragraph that is about to be removed, asks if corresponding CMS Block shall be removed as well
         * @param index {number} - index of the component in layoutBuilder
         */
        deleteComponent: function (index) {
            var builder = this;
            confirm({
                content: $t('Are you sure you want to delete this item?'),
                actions: {
                    confirm: function () {
                        var component = builder.components[index];
                        builder.components.splice(index, 1);
                        if (component.type === 'paragraph') {
                            builder.deleteStaticBlock(component.data.blockId);
                        }
                        builder.$dispatch('cc-layout-builder__update');
                    },
                },
            });
        },
        deleteStaticBlock: function (cmsBlockId) {
            var component = this;
            confirm({
                content: $t('Would you like to delete CMS Block related to this component (CMS Block ID: %s) ?').replace('%s', cmsBlockId),
                actions: {
                    confirm: function () {
                        component.$dispatch('cc-layout-builder__cmsblock-delete-request', cmsBlockId);
                    },
                },
            });
        },
    },
};

/* tslint:disable:no-console */
// Use Vue resource
Vue.use(vr);
// Set Vue's $http headers Accept to text/html
Vue.http.headers.custom.Accept = 'text/html';
// Picker modal options
var pickerModalOptions = {
    type: 'slide',
    responsive: true,
    innerScroll: true,
    autoOpen: true,
    title: $t('Please select type of component'),
    buttons: [
        {
            text: $.mage.__('Cancel'),
            class: '',
            click: function () {
                this.closeModal();
            },
        },
    ],
};
var $pickerModal;
var configuratorModalOptions = {
    type: 'slide',
    responsive: true,
    innerScroll: true,
    autoOpen: true,
    title: $t('Configure your component'),
    buttons: [
        {
            text: $.mage.__('Cancel'),
            class: '',
            click: function () {
                this.closeModal();
            },
        },
        {
            text: $.mage.__('Save'),
            class: 'action-primary',
        },
    ],
};
var $configuratorModal;
/**
 * M2C Content Constructor component.
 * This is the final layer that is responsible for collecting and tying up all
 * of the M2C admin panel logic.
 */
var m2cContentConstructor = {
    template: "<div class=\"m2c-content-constructor\">\n        <m2c-layout-builder\n            v-ref:m2c-layout-builder\n            :assets-src=\"assetsSrc\"\n            :add-component=\"getComponentPicker\"\n            :edit-component=\"editComponent\"\n            :components-configuration=\"configuration\">\n        </m2c-layout-builder>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--picker\" v-el:picker-modal></div>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--configurator\" v-el:configurator-modal></div>\n    </div>",
    components: {
        'm2c-layout-builder': m2cLayoutBuilder,
        'cc-component-picker': ccComponentPicker,
        'm2c-headline-configurator': m2cHeadlineConfigurator,
        'm2c-static-block-configurator': m2cStaticBlockConfigurator,
        'm2c-image-teaser-configurator': m2cImageTeaserConfigurator,
        'm2c-paragraph-configurator': m2cParagraphConfigurator,
        'm2c-hero-carousel-configurator': m2cHeroCarouselConfigurator,
        'm2c-product-carousel-configurator': m2cProductCarouselConfigurator,
        'm2c-category-links-configurator': m2cCategoryLinksConfigurator,
        'm2c-button-configurator': m2cButtonConfigurator,
        'm2c-products-grid-configurator': m2cProductsGridConfigurator,
    },
    props: {
        configuration: {
            type: String,
            default: '',
        },
        assetsSrc: {
            type: String,
            default: '',
        },
        configuratorEndpoint: {
            type: String,
            default: '',
        },
        uploaderUrl: {
            type: String,
            default: '',
        },
        restTokenEndpoint: {
            type: String,
            default: '',
        },
        imageEndpoint: {
            type: String,
            default: '',
        },
        categoryDataProviderEndpoint: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            initialComponentConfiguration: undefined,
            restToken: undefined,
        };
    },
    ready: function () {
        this.dumpConfiguration();
        this._isPickerLoaded = false;
        this._cleanupConfiguratorModal = '';
        this._configuratorSaveCallback = function () { return undefined; };
        this.setRestToken();
        // Initialize M2 loader for m2c modals
        $('body').loadingPopup({
            timeout: false,
        }).trigger('hideLoadingPopup');
    },
    events: {
        /**
         * We update provided input with new components information each time leyout
         * builder updates.
         */
        'cc-layout-builder__update': function () {
            this.dumpConfiguration();
        },
        'cc-component-configurator__saved': function (data) {
            this._configuratorSavedCallback(data);
            if ($configuratorModal && $configuratorModal.closeModal) {
                $configuratorModal.closeModal();
            }
            if ($pickerModal && $pickerModal.closeModal) {
                $pickerModal.closeModal();
            }
        },
        'cc-layout-builder__cmsblock-delete-request': function (cmsBlockId) {
            this.deleteStaticBlock(cmsBlockId);
        },
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        getComponentPicker: function (addComponentInformation) {
            var component = this;
            // Save adding callback for async use.
            this._addComponentInformation = addComponentInformation;
            pickerModalOptions.opened = function () {
                if (!component._isPickerLoaded) {
                    // Show ajax loader
                    $('body').trigger('showLoadingPopup');
                    // Get picker via AJAX
                    component.$http.get(component.configuratorEndpoint + "picker").then(function (response) {
                        component.$els.pickerModal.innerHTML = response.body;
                        component.$compile(component.$els.pickerModal);
                        component._isPickerLoaded = true;
                        // Hide loader
                        $('body').trigger('hideLoadingPopup');
                    });
                }
            };
            // Create or Show picker modal depending if exists
            if ($pickerModal) {
                $pickerModal.openModal();
            }
            else {
                $pickerModal = modal(pickerModalOptions, $(this.$els.pickerModal));
            }
        },
        /**
         * Callback that will be invoked when user choses component in picker.
         * This method should open magento modal with component configurator.
         * @param {componentType} String - type of component chosen
         */
        getComponentConfigurator: function (componentType) {
            var _this = this;
            var newComponentId = 'component' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            this._configuratorSavedCallback = function (componentData) {
                _this._addComponentInformation({
                    type: componentType,
                    id: newComponentId,
                    data: componentData,
                });
            };
            if (componentType === 'brand-carousel' || componentType === 'separator') {
                this.$emit('cc-component-configurator__saved', []);
            }
            else {
                this.initConfiguratorModal({
                    type: componentType,
                    id: newComponentId,
                    data: undefined,
                });
            }
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
         */
        editComponent: function (prevComponentData, setComponentInformation) {
            this._configuratorSavedCallback = function (componentData) {
                setComponentInformation({
                    type: prevComponentData.type,
                    id: prevComponentData.id,
                    data: componentData,
                });
            };
            this.initConfiguratorModal(prevComponentData);
        },
        initConfiguratorModal: function (componentInformation) {
            var component = this;
            var cleanupConfiguratorModal = function () { return undefined; };
            configuratorModalOptions.buttons[1].click = function () {
                component.$broadcast('cc-component-configurator__save');
            };
            configuratorModalOptions.title = $t('Configure your component') + "<span class=\"m2c-content-constructor__modal-subheadline\">" + this.transformComponentTypeToText(componentInformation.type) + "</span>";
            // Configurator modal opened callback
            configuratorModalOptions.opened = function () {
                // Show ajax loader
                $('body').trigger('showLoadingPopup');
                // Get twig component
                component.$http.get(component.configuratorEndpoint + componentInformation.type).then(function (response) {
                    component.$els.configuratorModal.innerHTML = response.body;
                    // Set current component configuration data
                    component.initialComponentConfiguration = componentInformation.data;
                    // compile fetched component
                    cleanupConfiguratorModal = component.$compile(component.$els.configuratorModal);
                    // Hide loader
                    $('body').trigger('hideLoadingPopup');
                });
            };
            configuratorModalOptions.closed = function () {
                // Cleanup configurator component and then remove modal
                cleanupConfiguratorModal();
                component.$els.configuratorModal.innerHTML = '';
                $configuratorModal.modal[0].parentNode.removeChild($configuratorModal.modal[0]);
                component.initialComponentConfiguration = undefined;
            };
            // Create & Show $configuratorModal
            $configuratorModal = modal(configuratorModalOptions, $(this.$els.configuratorModal));
        },
        dumpConfiguration: function () {
            uiRegistry.get('cms_page_form.cms_page_form').source.set('data.components', JSON.stringify(this.$refs.m2cLayoutBuilder.getComponentInformation()));
        },
        setRestToken: function () {
            var component = this;
            // send request for token
            this.$http.get(this.restTokenEndpoint).then(function (response) {
                component.restToken = "Bearer " + response.body;
            });
        },
        deleteStaticBlock: function (cmsBlockId) {
            var component = this;
            // Send request to REST API
            this.$http({
                headers: {
                    Accept: 'application/json',
                    Authorization: component.restToken,
                },
                method: 'delete',
                url: window.location.origin + "/rest/V1/cmsBlock/" + cmsBlockId,
            }).then(function (response) {
                if (response.body !== 'true') {
                    console.warn("Something went wrong, CMS block wasn't removed, please check if block with ID: " + cmsBlockId + " exists in database");
                }
            });
        },
        transformComponentTypeToText: function (componentType) {
            var txt = componentType.replace('-', ' ');
            return txt.charAt(0).toUpperCase() + txt.slice(1);
        },
    },
};

return m2cContentConstructor;

})));
//# sourceMappingURL=m2c-content-constructor.js.map
