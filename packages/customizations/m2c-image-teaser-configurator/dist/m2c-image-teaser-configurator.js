(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate'), require('Magento_Ui/js/modal/alert'), require('Magento_Ui/js/modal/confirm')) :
    typeof define === 'function' && define.amd ? define('m2cImageTeaserConfigurator', ['jquery', 'mage/translate', 'Magento_Ui/js/modal/alert', 'Magento_Ui/js/modal/confirm'], factory) :
    (global.m2cImageTeaserConfigurator = factory(global.jQuery,global.$t,global.alert,global.confirm));
}(this, (function ($,$t,alert,confirm) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;
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
    template: "<div class=\"m2c-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }}>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Teaser Width</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.teaserWidth.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.teaserWidth\"\n                    @click=\"!option.disabled && toggleOption('teaserWidth', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n\n        </section>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Desktop Layout</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.desktopLayout.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.desktopLayout\"\n                    @click=\"!option.disabled && toggleOption('desktopLayout', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n        </section>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Text Positioning</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.textPositioning.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.textPositioning\"\n                    @click=\"!option.disabled && toggleOption('textPositioning', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n        </section>\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <h3 class=\"m2c-image-teaser-configurator__subtitle\">Mobile Layout</h3>\n            <div class=\"m2c-image-teaser-configurator__scenario-options\">\n                <div\n                    :class=\"{\n                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.mobileLayout.id == optionId,\n                        'm2c-image-teaser-configurator__option--disabled': option.disabled,\n                    }\"\n                    class=\"m2c-image-teaser-configurator__option\"\n                    v-for=\"(optionId, option) in scenarioOptions.mobileLayout\"\n                    @click=\"!option.disabled && toggleOption('mobileLayout', optionId)\">\n                    <div class=\"m2c-image-teaser-configurator__option-wrapper\">\n                        <svg class=\"m2c-image-teaser-configurator__option-icon\">\n                            <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                        </svg>\n                    </div>\n                    <p class=\"m2c-image-teaser-configurator__option-name\">\n                        {{ option.name }}\n                    </p>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <cc-component-adder class=\"cc-component-adder cc-component-adder--static\" v-show=\"!configuration.items.length\">\n                <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createTeaserItem( 0 )\">\n                    <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                        <use v-bind=\"{ 'xlink:href': '#icon_plus' }\"></use>\n                    </svg>\n                </button>\n            </cc-component-adder>\n\n            <template v-for=\"item in configuration.items\">\n                <div class=\"m2c-image-teaser-configurator__item\" id=\"m2c-image-teaser-item-{{ $index }}\">\n                    <cc-component-adder class=\"cc-component-adder cc-component-adder--first\" v-if=\"canAddTeaser()\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | m2c-image-teaser-configurator__item-action-button\" @click=\"createTeaserItem( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_300\">\n                                <use xlink:href=\"#icon_plus\"></use>\n                            </svg>\n                        </button>\n                    </cc-component-adder>\n\n                    <div class=\"m2c-image-teaser-configurator__item-content\">\n                        <div v-bind:class=\"[ 'm2c-image-teaser-configurator__item-col-left', configuration.items[$index].image ? 'm2c-image-teaser-configurator__item-col-left--look-image-uploaded' : '' ]\">\n                            <div class=\"m2c-image-teaser-configurator__toolbar\">\n                                <span class=\"m2c-image-teaser-configurator__size-info\">{{ configuration.items[$index].sizeInfo }}</span>\n                                <template v-if=\"configuration.items[$index].image\">\n                                    <a href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Change image') + "</a>\n                                </template>\n                                <template v-else>\n                                    <a href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Upload image') + "</a>\n                                </template>\n                            </div>\n                            <div class=\"m2c-image-teaser-configurator__item-image-wrapper\">\n                                <img :src=\"configuration.items[$index].image\" class=\"m2c-image-teaser-configurator__item-image\" v-show=\"configuration.items[$index].image\">\n                                <input type=\"hidden\" v-model=\"configuration.items[$index].image\">\n                                <input type=\"hidden\" class=\"m2c-image-teaser-configurator__image-url\" id=\"image-teaser-img-{{$index}}\">\n\n                                <div class=\"m2c-image-teaser-configurator__item-actions\">\n                                    <cc-component-actions>\n                                        <template slot=\"cc-component-actions__buttons\">\n                                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-image-teaser-configurator__item-action-button\" @click=\"moveImageTeaserUp( $index )\" :class=\"[ isFirstImageTeaser( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstImageTeaser( $index )\">\n                                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                    <use xlink:href=\"#icon_arrow-up\"></use>\n                                                </svg>\n                                            </button>\n                                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-image-teaser-configurator__item-action-button\" @click=\"moveImageTeaserDown( $index )\" :class=\"[ isLastImageTeaser( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastImageTeaser( $index )\">\n                                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                    <use xlink:href=\"#icon_arrow-down\"></use>\n                                                </svg>\n                                            </button>\n                                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-image-teaser-configurator__item-action-button\" @click=\"deleteTeaserItem( $index )\">\n                                                <svg class=\"action-button__icon\">\n                                                    <use xlink:href=\"#icon_trash-can\"></use>\n                                                </svg>\n                                            </button>\n                                        </template>\n                                    </cc-component-actions>\n                                </div>\n\n                            </div>\n                        </div>\n                        <div class=\"m2c-image-teaser-configurator__item-col-right\">\n                            <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"cfg-it-item{{ $index }}-variant\" class=\"m2-input__label\">" + $t('Display variant') + ":</label>\n                                <select name=\"cfg-it-item{{ $index }}-variant\" class=\"m2-input__select\" id=\"cfg-it-item{{ $index }}-variant\" v-model=\"configuration.items[$index].displayVariant\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                    <option value=\"1\">" + $t('Text vertically centered on the left') + "</option>\n                                    <option value=\"3\">" + $t('Text vertically centered in the middle') + "</option>\n                                    <option value=\"2\">" + $t('Text on the bottom, left corner') + "</option>\n                                    <option value=\"4\">" + $t('Text on the bottom - centered') + "</option>\n                                </select>\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__label\">" + $t('Subheadline') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].subheadline\" id=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__label\">" + $t('Paragraph') + ":</label>\n                                <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__textarea\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                            </div>\n                            <div class=\"m2-input | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__label\">" + $t('CTA label') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input m2-input--type-addon | m2c-image-teaser-configurator__item-form-element\">\n                                <label for=\"image-teaser-ctatarget-output-{{ $index }}\" class=\"m2-input__label\">" + $t('CTA target link') + ":</label>\n                                <input type=\"text\" class=\"m2-input__input m2-input--type-readonly | m2c-image-teaser-configurator__cta-target-link\" readonly v-model=\"configuration.items[$index].href\" id=\"image-teaser-ctatarget-output-{{ $index }}\">\n                                <span class=\"m2-input__addon | m2c-image-teaser-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal( $index )\">\n                                    <svg class=\"m2-input__addon-icon\">\n                                        <use xlink:href=\"#icon_link\"></use>\n                                    </svg>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <cc-component-adder class=\"cc-component-adder cc-component-adder--last\" v-if=\"configuration.items.length && canAddTeaser()\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | m2c-image-teaser-configurator__item-action-button\" @click=\"createTeaserItem( $index + 1 )\">\n                            <svg class=\"action-button__icon action-button__icon--size_300\">\n                                <use xlink:href=\"#icon_plus\"></use>\n                            </svg>\n                        </button>\n                    </cc-component-adder>\n                </div>\n            </template>\n        </section>\n    </div>",
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
            var component = this;
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/image-teaser-ctatarget-output-" + index);
            /* clean current value since widget chooser doesn't do that to allow multiple widgets
             * we don't want that since this should be url for CTA */
            component.configuration.items[index].ctaTarget = '';
            this.wWidgetListener();
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
        wWidgetListener: function () {
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                this.disableNotLinksOptions();
            }
            else {
                setTimeout(this.wWidgetListener, 300);
            }
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

return m2cImageTeaserConfigurator;

})));
//# sourceMappingURL=m2c-image-teaser-configurator.js.map
