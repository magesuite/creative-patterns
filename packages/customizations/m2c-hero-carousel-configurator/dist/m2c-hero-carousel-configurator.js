(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate'), require('Magento_Ui/js/modal/alert'), require('Magento_Ui/js/modal/confirm')) :
    typeof define === 'function' && define.amd ? define('m2cHeroCarouselConfigurator', ['jquery', 'mage/translate', 'Magento_Ui/js/modal/alert', 'Magento_Ui/js/modal/confirm'], factory) :
    (global.m2cHeroCarouselConfigurator = factory(global.jQuery,global.$t,global.alert,global.confirm));
}(this, (function ($,$t,alert,confirm) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;
alert = 'default' in alert ? alert['default'] : alert;
confirm = 'default' in confirm ? confirm['default'] : confirm;

var template = "<div class=\"cc-hero-carousel-configurator | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewHeroItem( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use xlink:href=\"../images/sprites.svg#icon_plus\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"item in configuration.items\">\n        <div class=\"cc-hero-carousel-configurator__item\">\n            <div class=\"cc-hero-carousel-configurator__item-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__top\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveHeroItemUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"../images/sprites.svg#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveHeroItemDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"../images/sprites.svg#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                    <template slot=\"cc-component-actions__bottom\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteHeroItem( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"../images/sprites.svg#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-hero-carousel-configurator__item-content\">\n                <div class=\"cc-hero-carousel__item-image\"></div>\n                <div class=\"cc-hero-carousel__item-options\">\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-variant\" class=\"cs-input__label\">Display variant:</label>\n                        <select name=\"cfg-hc-item{{ $index }}-variant\" class=\"cs-input__select\" id=\"cfg-hc-item{{ $index }}-variant\" v-model=\"configuration.displayVariant\">\n                            <option value=\"variant-1\">Text vertically centered on the left</option>\n                            <option value=\"variant-2\">Text vertically centered in the middle</option>\n                            <option value=\"variant-3\">Text on the bottom, left corner</option>\n                            <option value=\"variant-4\">Text on the bottom - centered</option>\n                        </select>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"cs-input__label\">Headline:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                        <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"cs-input__textarea\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-ctaLabel\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-ctaLabel\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-addon\">\n                        <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-addon\">\n                        <label for=\"cfg-hc-item{{ $index }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaTarget\" id=\"cfg-hc-item{{ $index }}-cta-target\" class=\"cs-input__input\">\n                        <span class=\"cs-input__addon\">\n                            <svg class=\"cs-input__addon-icon\">\n                                <use xlink:href=\"../images/sprites.svg#icon_link\"></use>\n                            </svg>\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"configuration.items.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewHeroItem( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use xlink:href=\"../images/sprites.svg#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</div>\n";

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
    colorScheme: 'light',
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
    template: "<div class=\"m2c-hero-carousel-configurator | {{ class }}\">\n        <section class=\"m2c-hero-carousel-configurator__section\">\n            <h3 class=\"m2c-hero-carousel-configurator__subtitle\">Mobile Devices Scenario</h3>\n            <div class=\"m2c-hero-carousel-configurator__scenario-options\">\n                <ul class=\"m2c-hero-carousel-configurator__scenario-options-list\">\n                    <li\n                        :class=\"{\n                            'm2c-hero-carousel-configurator__option--selected': configuration.mobileDisplayVariant.id == optionId,\n                        }\"\n                        class=\"m2c-hero-carousel-configurator__option\"\n                        v-for=\"(optionId, option) in scenarioOptions.mobileDisplayVariant\"\n                        @click=\"setOption('mobileDisplayVariant', optionId)\">\n                        <div class=\"m2c-hero-carousel-configurator__option-wrapper\">\n                            <svg class=\"m2c-hero-carousel-configurator__option-icon\">\n                                <use v-bind=\"{ 'xlink:href': '#' + option.iconId }\"></use>\n                            </svg>\n                        </div>\n                        <p class=\"m2c-hero-carousel-configurator__option-name\">\n                            {{ option.name }}\n                        </p>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <h3 class=\"m2c-hero-carousel-configurator__title\">Content</h3>\n\n        <cc-component-adder class=\"cc-component-adder cc-component-adder--static\" v-show=\"!configuration.items.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( 0 )\">\n                <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n\n        <template v-for=\"item in configuration.items\">\n            <div class=\"m2c-hero-carousel-configurator__item\" id=\"m2c-hero-carousel-item-{{ $index }}\">\n                <cc-component-adder class=\"cc-component-adder cc-component-adder--first\">\n                    <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( $index )\">\n                        <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                            <use xlink:href=\"#icon_plus\"></use>\n                        </svg>\n                    </button>\n                </cc-component-adder>\n\n                <div class=\"m2c-hero-carousel-configurator__item-content\">\n                    <div v-bind:class=\"[ 'm2c-hero-carousel-configurator__item-col-left', configuration.items[$index].image ? 'm2c-hero-carousel-configurator__item-col-left--look-image-uploaded' : '' ]\">\n                        <div class=\"m2c-hero-carousel-configurator__item-image-wrapper\">\n                            <img :src=\"configuration.items[$index].image\" class=\"m2c-hero-carousel-configurator__item-image\" v-show=\"configuration.items[$index].image\">\n                            <input type=\"hidden\" v-model=\"configuration.items[$index].image\">\n                            <input type=\"hidden\" class=\"m2c-hero-carousel-configurator__image-url\" id=\"hero-img-{{$index}}\">\n                            <svg class=\"m2c-hero-carousel-configurator__item-image-placeholder\" v-show=\"!configuration.items[$index].image\">\n                                <use xlink:href=\"#icon_image-placeholder\"></use>\n                            </svg>\n\n                            <div class=\"m2c-hero-carousel-configurator__item-actions\">\n                                <cc-component-actions>\n                                    <template slot=\"cc-component-actions__buttons\">\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-hero-carousel-configurator__item-action-button\" @click=\"moveHeroItemUp( $index )\" :class=\"[ isFirstHeroItem( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstHeroItem( $index )\">\n                                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                <use xlink:href=\"#icon_arrow-up\"></use>\n                                            </svg>\n                                        </button>\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-hero-carousel-configurator__item-action-button\" @click=\"moveHeroItemDown( $index )\" :class=\"[ isLastHeroItem( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastHeroItem( $index )\">\n                                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                <use xlink:href=\"#icon_arrow-down\"></use>\n                                            </svg>\n                                        </button>\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon | cc-component-actions__button cc-component-actions__button--upload-image | m2c-hero-carousel-configurator__item-action-button\" @click=\"getImageUploader( $index )\">\n                                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                                    <use xlink:href=\"#icon_upload-image\"></use>\n                                                </svg>\n                                                {{ configuration.items[$index].image ? imageUploadedText : noImageUploadedText }}\n                                        </button>\n                                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-hero-carousel-configurator__item-action-button\" @click=\"deleteHeroItem( $index )\">\n                                            <svg class=\"action-button__icon\">\n                                                <use xlink:href=\"#icon_trash-can\"></use>\n                                            </svg>\n                                        </button>\n                                    </template>\n                                </cc-component-actions>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"m2c-hero-carousel-configurator__item-col-right\">\n                        <div class=\"m2-input m2-input--group\">\n                            <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-variant\" class=\"m2-input__label\">" + $t('Display variant') + ":</label>\n                                <select name=\"cfg-hc-item{{ $index }}-variant\" class=\"m2-input__select | m2c-hero-carousel-configurator__select\" id=\"cfg-hc-item{{ $index }}-variant\" v-model=\"configuration.items[$index].displayVariant\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                    <option value=\"variant-1\">" + $t('Text vertically centered on the left') + "</option>\n                                    <option value=\"variant-2\">" + $t('Text vertically centered in the middle') + "</option>\n                                    <option value=\"variant-3\">" + $t('Text on the bottom, left corner') + "</option>\n                                    <option value=\"variant-4\">" + $t('Text on the bottom - centered') + "</option>\n                                </select>\n                            </div>\n                            <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-color-scheme\" class=\"m2-input__label\">" + $t('Text color scheme') + ":</label>\n                                <select name=\"cfg-hc-item{{ $index }}-color-scheme\" class=\"m2-input__select | m2c-hero-carousel-configurator__select\" id=\"cfg-hc-item{{ $index }}-color-scheme\" v-model=\"configuration.items[$index].colorScheme\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                    <option value=\"light\">" + $t('Light') + "</option>\n                                    <option value=\"dark\">" + $t('Dark') + "</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__input\">\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__label\">" + $t('Subheadline') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].subheadline\" id=\"cfg-hc-item{{ $index }}-subheadline\" class=\"m2-input__input\">\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__label\">" + $t('Paragraph') + ":</label>\n                            <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__textarea\" placeholder=\"(" + $t('max 200 characters') + ")\" maxlength=\"200\"></textarea>\n                        </div>\n                        <div class=\"m2-input m2-input--group\">\n                            <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__label\">" + $t('CTA label') + ":</label>\n                                <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__input\">\n                            </div>\n                            <div class=\"m2-input m2-input--type-addon | m2c-hero-carousel-configurator__item-form-element\">\n                                <label for=\"hero-ctatarget-output-{{ $index }}\" class=\"m2-input__label\">" + $t('CTA target link') + ":</label>\n                                <input type=\"text\" class=\"m2-input__input | m2c-hero-carousel-configurator__cta-target-link\" v-model=\"configuration.items[$index].href\" id=\"hero-ctatarget-output-{{ $index }}\">\n                                <span class=\"m2-input__addon | m2c-hero-carousel-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal( $index )\">\n                                    <svg class=\"m2-input__addon-icon\">\n                                        <use xlink:href=\"#icon_link\"></use>\n                                    </svg>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <cc-component-adder class=\"cc-component-adder cc-component-adder--last\">\n                    <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( $index + 1 )\">\n                        <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                            <use xlink:href=\"#icon_plus\"></use>\n                        </svg>\n                    </button>\n                </cc-component-adder>\n            </div>\n        </template>\n\n        <div class=\"m2c-hero-carousel-configurator__modal\" v-el:error-modal></div>\n    </div>",
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
                    'hidden': {
                        name: 'Hidden',
                        iconId: 'ml_hidden',
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
                setTimeout(function () {
                    _this.checkImageSizes();
                    _this.onChange();
                }, 400);
            };
            img.src = imgEndpoint;
        },
        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal: function (index) {
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/filter_widgets/Link/widget_target_id/hero-ctatarget-output-" + index);
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
         * Check if widget chooser is loaded. If not, wait for it, if yes:
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         * @param {number} index Hero item's index in array.
         */
        wWidgetListener: function (itemIndex) {
            var _this = this;
            if (typeof wWidget !== 'undefined' && widgetTools.dialogWindow[0].innerHTML !== '') {
                var _this_1 = this;
                var button = widgetTools.dialogWindow[0].querySelector('#insert_button');
                button.onclick = null;
                button.addEventListener('click', function () {
                    _this_1.configuration.items[itemIndex].href = '';
                    wWidget.insertWidget();
                });
            }
            else {
                window.setTimeout(function () {
                    _this.wWidgetListener(itemIndex);
                }, 300);
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
                        content: $t('Images you have uploaded have different aspect ratio. This may cause this component to display wrong. We recommend to keep the same aspect ratio for all uploaded images.'),
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

return m2cHeroCarouselConfigurator;

})));
//# sourceMappingURL=m2c-hero-carousel-configurator.js.map
