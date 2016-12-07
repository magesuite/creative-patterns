"use strict";
var cc_component_configurator_1 = require("../../cc-component-configurator/src/cc-component-configurator");
var action_button_1 = require("../../action-button/src/action-button");
var cc_component_actions_1 = require("../../cc-component-actions/src/cc-component-actions");
var cc_component_adder_1 = require("../../cc-component-adder/src/cc-component-adder");
var cc_component_placeholder_1 = require("../../cc-component-placeholder/src/cc-component-placeholder");
;
var teaserItemPrototype = {
    image: '',
    decodedImage: '',
    headline: '',
    paragraph: '',
    ctaLabel: 'More',
    href: '',
    sizeInfo: '',
    aspectRatio: '',
};
var ccImageTeaserConfigurator = {
    mixins: [
        cc_component_configurator_1.default,
    ],
    components: {
        'action-button': action_button_1.default,
        'cc-component-adder': cc_component_adder_1.default,
        'cc-component-actions': cc_component_actions_1.default,
        'cc-component-placeholder': cc_component_placeholder_1.default,
    },
    template: "<form class=\"cc-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-width\" class=\"cs-input__label\">Teaser width:</label>\n                <select name=\"cfg-it-width-select\" class=\"cs-input__select\" id=\"cfg-it-width\" v-model=\"configuration.teaserWidth\" @change=\"onChange\">\n                    <option value=\"full-width\" selected>Full browser width</option>\n                    <option value=\"limited-width\">Breaking point width (1280px)</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-images-per-slide\" class=\"cs-input__label\">Images per slide:</label>\n                <select name=\"cfg-it-images-per-slide\" class=\"cs-input__select\" id=\"cfg-it-images-per-slide\" v-model=\"configuration.itemsPerSlide\" @change=\"onChange\">\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                </select>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cc-image-teaser-configurator__teaser\">\n                <template v-for=\"item in configuration.items\">\n                    <div class=\"cc-image-teaser-configurator__teaser-item\" id=\"cc-image-teaser-item-{{ $index }}\">\n                        <div class=\"cc-image-teaser-configurator__toolbar\">\n                            <span class=\"cc-image-teaser-configurator__teaser-item-title\">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>\n                            <a href=\"#\" class=\"cc-image-teaser-configurator__upload-link\" href=\"#\">Upload image</a>\n                        </div>\n                        <div class=\"cc-image-teaser-configurator__image-holder-outer\">\n                            <div class=\"cc-image-teaser-configurator__image-holder-inner\">\n                                <input type=\"hidden\" value=\"\" class=\"cc-image-teaser-configurator__image-url\" v-model=\"configuration.items[$index].image\" @change=\"onChange\">\n                            </div>\n                        </div>\n                        <div class=\"cs-input cs-input--type-required\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__label\">Headline:</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"cs-input cs-input--type-required\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                            <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__textarea cs-input__textarea--look-thin\" @change=\"onChange\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                        </div>\n                        <div class=\"cs-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"cs-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                            <input type=\"text\" v-model=\"item.ctaTarget\" id=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                    </div>\n                </template>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions\">\n            <button type=\"submit\">Save</button>\n        </section>\n    </form>",
    data: function () {
        return {
            scenarioOptions: {
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
                    items.push(JSON.parse(JSON.stringify(teaserItemPrototype)));
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ccImageTeaserConfigurator;
