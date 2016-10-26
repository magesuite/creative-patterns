(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate'), require('Magento_Ui/js/modal/confirm')) :
    typeof define === 'function' && define.amd ? define('m2cHeroCarouselConfigurator', ['jquery', 'mage/translate', 'Magento_Ui/js/modal/confirm'], factory) :
    (global.m2cHeroCarouselConfigurator = factory(global.jQuery,global.$t,global.confirm));
}(this, (function ($,$t,confirm) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;
confirm = 'default' in confirm ? confirm['default'] : confirm;

var template = "<div class=\"cc-hero-carousel-configurator | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewHeroItem( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use xlink:href=\"../images/sprites.svg#icon_plus\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"item in configuration.items\">\n        <div class=\"cc-hero-carousel-configurator__item\">\n            <div class=\"cc-hero-carousel-configurator__item-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__top\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveHeroItemUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"../images/sprites.svg#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveHeroItemDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"../images/sprites.svg#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                    <template slot=\"cc-component-actions__bottom\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteHeroItem( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"../images/sprites.svg#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-hero-carousel-configurator__item-content\">\n                <div class=\"cc-hero-carousel__item-image\"></div>\n                <div class=\"cc-hero-carousel__item-options\">\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-scenario\" class=\"cs-input__label\">Display scenario:</label>\n                        <select name=\"cfg-hc-item{{ $index }}-scenario\" class=\"cs-input__select\" id=\"cfg-hc-item{{ $index }}-scenario\" v-model=\"configuration.displayScenario\">\n                            <option value=\"left-middle\">Text vertically centered on the left</option>\n                            <option value=\"center-middle\">Text vertically centered in the middle</option>\n                            <option value=\"left-bottom\">Text on the bottom, left corner</option>\n                            <option value=\"center-botom\">Text on the bottom - centered</option>\n                        </select>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"cs-input__label\">Headline:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                        <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"cs-input__textarea\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-hc-item{{ $index }}-ctaLabel\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-ctaLabel\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-addon\">\n                        <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"cs-input__input\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-addon\">\n                        <label for=\"cfg-hc-item{{ $index }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaTarget\" id=\"cfg-hc-item{{ $index }}-cta-target\" class=\"cs-input__input\">\n                        <span class=\"cs-input__addon\">\n                            <svg class=\"cs-input__addon-icon\">\n                                <use xlink:href=\"../images/sprites.svg#icon_link\"></use>\n                            </svg>\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"configuration.items.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewHeroItem( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use xlink:href=\"../images/sprites.svg#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</div>\n";

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
    template: "<aside class=\"cc-component-actions | {{ class }}\">\n        <div class=\"cc-component-actions__top\">\n            <slot name=\"cc-component-actions__top\"></slot>\n        </div>\n        <div class=\"cc-component-actions__bottom\">\n            <slot name=\"cc-component-actions__bottom\"></slot>\n        </div>\n    </aside>",
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
    template: "<section class=\"cc-component-adder | {{ class }}\">\n        <div class=\"cc-component-adder__button-wrapper\" @click=\"onCreateComponent\">\n            <slot></slot>\n        </div>\n    </section>",
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
    template,
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
    displayScenario: 'left-middle',
    headline: '',
    paragraph: '',
    ctaLabel: $t('Check offer'),
    ctaTarget: '',
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
    template: "<div class=\"m2c-hero-carousel-configurator | {{ class }}\">\n        <cc-component-adder>\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( 0 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_plus' }\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n        <template v-for=\"item in configuration.items\">\n            <div class=\"m2c-hero-carousel-configurator__item\" id=\"m2c-hero-carousel-item-{{ $index }}\">\n                <div class=\"m2c-hero-carousel-configurator__item-actions\">\n                    <cc-component-actions>\n                        <template slot=\"cc-component-actions__top\">\n                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-hero-carousel-configurator__item-action-button\" @click=\"moveHeroItemUp( $index )\" :class=\"[ isFirstHeroItem( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstHeroItem( $index )\">\n                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                    <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_arrow-up' }\"></use>\n                                </svg>\n                            </button>\n                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-hero-carousel-configurator__item-action-button\" @click=\"moveHeroItemDown( $index )\" :class=\"[ isLastHeroItem( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastHeroItem( $index )\">\n                                <svg class=\"action-button__icon action-button__icon--size_100\">\n                                    <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_arrow-down' }\"></use>\n                                </svg>\n                            </button>\n                        </template>\n                        <template slot=\"cc-component-actions__bottom\">\n                            <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-hero-carousel-configurator__item-action-button\" @click=\"deleteHeroItem( $index )\">\n                                <svg class=\"action-button__icon\">\n                                    <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_trash-can' }\"></use>\n                                </svg>\n                            </button>\n                        </template>\n                    </cc-component-actions>\n                </div>\n                <div class=\"m2c-hero-carousel-configurator__item-content\">\n                    <div v-bind:class=\"[ 'm2c-hero-carousel-configurator__item-col-left', configuration.items[$index].image ? 'm2c-hero-carousel-configurator__item-col-left--look-image-uploaded' : '' ]\">\n                        <div class=\"m2c-hero-carousel-configurator__toolbar\">\n                            <template v-if=\"configuration.items[$index].image\">\n                                <a href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Change image') + "</a>\n                            </template>\n                            <template v-else>\n                                <a href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Upload image') + "</a>\n                            </template>\n                        </div>\n                        <div class=\"m2c-hero-carousel-configurator__item-image-wrapper\">\n                            <img :src=\"configuration.items[$index].image\" class=\"m2c-hero-carousel-configurator__item-image\" v-show=\"configuration.items[$index].image\">\n                            <input type=\"hidden\" class=\"m2c-hero-carousel-configurator__image-url\" v-model=\"configuration.items[$index].image\" id=\"hero-img-{{$index}}\"> \n                        </div>\n                    </div>\n                    <div class=\"m2c-hero-carousel-configurator__item-col-right\">\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-scenario\" class=\"m2-input__label\">" + $t('Display scenario') + ":</label>\n                            <select name=\"cfg-hc-item{{ $index }}-scenario\" class=\"m2-input__select\" id=\"cfg-hc-item{{ $index }}-scenario\" v-model=\"configuration.items[$index].displayScenario\" v-bind=\"{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }\">\n                                <option value=\"left-middle\">" + $t('Text vertically centered on the left') + "</option>\n                                <option value=\"center-middle\">" + $t('Text vertically centered in the middle') + "</option>\n                                <option value=\"left-bottom\">" + $t('Text on the bottom, left corner') + "</option>\n                                <option value=\"center-botom\">" + $t('Text on the bottom - centered') + "</option>\n                            </select>\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-hc-item{{ $index }}-headline\" class=\"m2-input__input\">\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__label\">" + $t('Paragraph') + ":</label>\n                            <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-hc-item{{ $index }}-paragraph\" class=\"m2-input__textarea\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                        </div>\n                        <div class=\"m2-input | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__label\">" + $t('CTA label') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-hc-item{{ $index }}-cta-label\" class=\"m2-input__input\">\n                        </div>\n                        <div class=\"m2-input m2-input--type-addon | m2c-hero-carousel-configurator__item-form-element\">\n                            <label for=\"hero-ctatarget-output-{{ $index }}\" class=\"m2-input__label\">" + $t('CTA target link') + ":</label>\n                            <input type=\"text\" class=\"m2-input__input m2-input--type-readonly | m2c-hero-carousel-configurator__cta-target-link\" readonly v-model=\"configuration.items[$index].ctaTarget\" id=\"hero-ctatarget-output-{{ $index }}\">\n                            <span class=\"m2-input__addon | m2c-hero-carousel-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal( $index )\">\n                                <svg class=\"m2-input__addon-icon\">\n                                    <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_link' }\"></use>\n                                </svg>\n                            </span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <cc-component-adder v-if=\"configuration.items.length\">\n                <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | m2c-hero-carousel-configurator__item-action-button\" @click=\"createNewHeroItem( $index + 1 )\">\n                    <svg class=\"action-button__icon action-button__icon--size_300\">\n                        <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_plus' }\"></use>\n                    </svg>\n                </button>\n            </cc-component-adder>\n        </template>\n    </div>",
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: {
                items: [JSON.parse(JSON.stringify(heroItemDataPattern))],
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
        /* Opens M2's built-in image manager modal
         * Manages all images: image upload from hdd, select image that was already uploaded to server
         * @param index {number} - index of image of hero item
         */
        getImageUploader: function (index) {
            MediabrowserUtility.openDialog(this.uploaderBaseUrl + "target_element_id/hero-img-" + index + "/", 'auto', 'auto', $t('Insert File...'), {
                closed: true,
            });
            this.imageUploadListener();
        },
        /* Listener for image uploader
         * Since Magento does not provide any callback after image has been chosen
         * we have to watch for target where decoded url is placed
         */
        imageUploadListener: function () {
            var _this = this;
            var component = this;
            // jQuery has to be used, native addEventListener doesn't catch change of input's value
            $('.m2c-hero-carousel-configurator__image-url').on('change', function (event) {
                component.onImageUploaded(event.target);
                // For some reason this is emmitted twice, so prevent second action
                $(_this).off(event);
            });
        },
        /* Action after image was uploaded
         * URL is encoded, so strip it and decode Base64 to get {{ media url="..."}} format
         * which will go to the items.image and will be used to display image on front end
         * @param input { object } - input with raw image path which is used in admin panel
         */
        onImageUploaded: function (input) {
            var itemIndex = input.id.substr(input.id.length - 1);
            var encodedImage = input.value.match('___directive\/([a-zA-Z0-9]*)')[1];
            this.configuration.items[itemIndex].decodedImage = Base64 ? Base64.decode(encodedImage) : window.atob(encodedImage);
            this.onChange();
        },
        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal: function (index) {
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/hero-ctatarget-output-" + index);
            /* clean current value since widget chooser doesn't do that to allow multiple widgets
             * we don't want that since this should be url for CTA
             */
            this.configuration.items[index].ctaTarget = '';
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.ctaTarget is changed
         */
        widgetSetListener: function () {
            var component = this;
            $('.m2c-hero-carousel-configurator__cta-target-link').on('change', function () {
                component.onChange();
            });
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
            if (index > 0) {
                this.configuration.items.splice(index - 1, 0, this.configuration.items.splice(index, 1)[0]);
                this.onChange();
            }
        },
        /**
         * Moves hero item under given index down by swaping it with next element.
         * @param {number} index Hero item's index in array.
         */
        moveHeroItemDown: function (index) {
            if (index < this.configuration.items.length - 1) {
                this.configuration.items.splice(index + 1, 0, this.configuration.items.splice(index, 1)[0]);
                this.onChange();
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
    },
    ready: function () {
        this.widgetSetListener();
    },
};

return m2cHeroCarouselConfigurator;

})));
//# sourceMappingURL=m2c-hero-carousel-configurator.js.map