(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate')) :
    typeof define === 'function' && define.amd ? define('m2cProductsGridConfigurator', ['jquery', 'mage/translate'], factory) :
    (global.m2cProductsGridConfigurator = factory(global.jQuery,global.$t));
}(this, (function ($,$t) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;

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
 * Product grid configurator component.
 * This component is responsible for displaying products grid  configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccProductsGridConfigurator = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: "<form class=\"cc-products-grid-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cc-products-grid-configurator__columns\">\n        <div class=\"cc-products-grid-configurator__column-left\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-category\" class=\"cs-input__label\">Select Category:</label>\n                <input type=\"text\" name=\"cfg-pg-category-select\" class=\"cs-input__input\" id=\"cfg-pg-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-order-by\" class=\"cs-input__label\">Order by:</label>\n                <select name=\"cfg-pg-order-by\" class=\"cs-input__select\" id=\"cfg-pg-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                    <option value=\"creation_date-DESC\">Creation date: newest</option>\n                    <option value=\"creation_date-ASC\">Creation date: oldest</option>\n                    <option value=\"price-DESC\">Price: cheapest</option>\n                    <option value=\"price-ASC\">Price: most expensive</option>\n                </select>\n                <select name=\"cfg-pg-order-type\" class=\"cs-input__select\" v-model=\"configuration.order_type\" @change=\"onChange\">\n                    <option value=\"ASC\">ASC</option>\n                    <option value=\"DESC\">DESC</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_desktop\" class=\"cs-input__label\">Rows desktop:</label>\n                <select name=\"cfg-pg-rows_desktop\" class=\"cs-input__select\" id=\"cfg-pg-rows_desktop\" v-model=\"configuration.rows_desktop\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_tablet\" class=\"cs-input__label\">Rows tablet:</label>\n                <select name=\"cfg-pg-rows_tablet\" class=\"cs-input__select\" id=\"cfg-pg-rows_tablet\" v-model=\"configuration.rows_tablet\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-rows_mobile\" class=\"cs-input__label\">Rows mobile:</label>\n                <select name=\"cfg-pg-rows_mobile\" class=\"cs-input__select\" id=\"cfg-pg-rows_mobile\" v-model=\"configuration.rows_mobile\" @change=\"onChange\" number>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"cc-products-grid-configurator__column-right\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-pg-hero\" class=\"cs-input__label\">Hero image:</label>\n                <select name=\"cfg-pg-hero\" class=\"cs-input__select\" id=\"cfg-pg-hero\" v-model=\"configuration.hero\" @change=\"onChange\">\n                    <option value=\"\" selected=\"selected\">No hero image</option>\n                    <option value=\"1\">Left</option>\n                    <option value=\"2\">Right</option>\n                </select>\n            </div>\n\n            <div class=\"cs-input\" v-if=\"configuration.hero\">\n\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_image\" class=\"cs-input__label\">Upload image:</label>\n                    <a href=\"#\" class=\"\" href=\"#\">Upload image</a>\n                    <input type=\"hidden\" name=\"cfg-pg-hero_image\" class=\"cs-input__input\" id=\"cfg-pg-hero_image\" v-model=\"configuration.hero_image\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_headline\" class=\"cs-input__label\">Headline:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_headline\" class=\"cs-input__input\" id=\"cfg-pg-hero_headline\" v-model=\"configuration.hero_headline\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_subheadline\" class=\"cs-input__label\">Subheadline:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_subheadline\" class=\"cs-input__input\" id=\"cfg-pg-hero_subheadline\" v-model=\"configuration.hero_subheadline\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_url\" class=\"cs-input__label\">Url:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_url\" class=\"cs-input__input\" id=\"cfg-pg-hero_url\" v-model=\"configuration.hero_url\" @change=\"onChange\">\n                </div>\n                <div class=\"cs-input cs-input--type-inline\">\n                    <label for=\"cfg-pg-hero_button_label\" class=\"cs-input__label\">CTA button label:</label>\n                    <input type=\"text\" name=\"cfg-pg-hero_button_label\" class=\"cs-input__input\" id=\"cfg-pg-hero_button_label\" v-model=\"configuration.button_label\" @change=\"onChange\">\n                </div>\n\n            </div>\n        </div>\n        </div>\n\n        <button type=\"submit\">Save</button>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    category_id: '',
                    order_by: 'creation_date-DESC',
                    order_type: 'DESC',
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
    template: "<form class=\"m2c-products-grid-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2c-products-grid-configurator__columns\">\n            <div class=\"m2c-products-grid-configurator__column-left\">\n\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-category\" class=\"m2-input__label\">" + $t('Category ID') + ":</label>\n                    <input type=\"text\" name=\"cfg-pg-category-select\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-category\" v-model=\"configuration.category_id\" @change=\"onChange\">\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-order-by\" class=\"m2-input__label\">" + $t('Order by:') + "</label>\n                    <select name=\"cfg-pg-order-by\" class=\"m2-input__select\" id=\"cfg-pg-order-by\" v-model=\"configuration.order_by\" @change=\"onChange\">\n                        <option value=\"creation_date-DESC\">" + $t('Creation date: newest') + "</option>\n                        <option value=\"creation_date-ASC\">" + $t('Creation date: oldest') + "</option>\n                        <option value=\"price-DESC\">" + $t('Price: cheapest') + "</option>\n                        <option value=\"price-ASC\">" + $t('Price: most expensive') + "</option>\n                    </select>\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-rows_desktop\" class=\"m2-input__label\">" + $t('Rows desktop') + ":</label>\n                    <select name=\"cfg-pg-rows_desktop\" class=\"m2-input__select\" id=\"cfg-pg-rows_desktop\" v-model=\"configuration.rows_desktop\" @change=\"onChange\" number>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                    </select>\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-rows_tablet\" class=\"m2-input__label\">" + $t('Rows tablet') + ":</label>\n                    <select name=\"cfg-pg-rows_tablet\" class=\"m2-input__select\" id=\"cfg-pg-rows_tablet\" v-model=\"configuration.rows_tablet\" @change=\"onChange\" number>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                    </select>\n                </div>\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-rows_mobile\" class=\"m2-input__label\">" + $t('Rows mobile') + ":</label>\n                    <select name=\"cfg-pg-rows_mobile\" class=\"m2-input__select\" id=\"cfg-pg-rows_mobile\" v-model=\"configuration.rows_mobile\" @change=\"onChange\" number>\n                        <option value=\"2\">2</option>\n                        <option value=\"3\">3</option>\n                        <option value=\"4\">4</option>\n                    </select>\n                </div>\n\n                <div class=\"m2-input m2-input--type-inline\">\n                    <label for=\"cfg-pg-hero\" class=\"m2-input__label\">" + $t('Hero image') + ":</label>\n                    <select name=\"cfg-pg-hero\" class=\"m2-input__select\" id=\"cfg-pg-hero\" v-model=\"configuration.hero\" @change=\"onChange\">\n                        <option value=\"\" selected=\"selected\">" + $t('No hero image') + "</option>\n                        <option value=\"1\">" + $t('Left') + "</option>\n                        <option value=\"2\">" + $t('Right') + "</option>\n                    </select>\n                </div>\n\n                <div class=\"m2-input\" v-if=\"configuration.hero\">\n                    <div class=\"m2-input m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_headline\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-hero_headline\" v-model=\"configuration.hero_headline\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_subheadline\" class=\"m2-input__label\">" + $t('Subheadline') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_subheadline\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-hero_subheadline\" v-model=\"configuration.hero_subheadline\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input m2-input--type-addon m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_url\" class=\"m2-input__label\">" + $t('Url') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_url\" class=\"m2-input__input m2-input--type-readonly | m2c-products-grid-configurator__form-input | m2c-products-grid__hero-url\" id=\"cfg-pg-hero_url\" readonly v-model=\"configuration.hero_url\">\n                        <span class=\"m2-input__addon | m2c-products-grid-configurator__widget-chooser-trigger\" @click=\"openCtaTargetModal()\">\n                            <svg class=\"m2-input__addon-icon\">\n                                <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_link' }\"></use>\n                            </svg>\n                        </span>\n                    </div>\n                    <div class=\"m2-input m2-input--type-inline\">\n                        <label for=\"cfg-pg-hero_button_label\" class=\"m2-input__label\">" + $t('Button label') + ":</label>\n                        <input type=\"text\" name=\"cfg-pg-hero_button_label\" class=\"m2-input__input | m2c-products-grid-configurator__form-input\" id=\"cfg-pg-hero_button_label\" v-model=\"configuration.button_label\" @change=\"onChange\">\n                    </div>\n                </div>\n\n            </div>\n            <div v-bind:class=\"[ 'm2c-products-grid-configurator__column-right', configuration.hero_image ? 'm2c-products-grid-configurator__column-right--look-image-uploaded' : '' ]\" v-show=\"configuration.hero\">\n                <div class=\"m2c-products-grid-configurator__toolbar\">\n                    <template v-if=\"configuration.hero_image\">\n                        <a href=\"#\" @click=\"getImageUploader()\">" + $t('Change image') + "</a>\n                    </template>\n                    <template v-else>\n                        <a href=\"#\" @click=\"getImageUploader()\">" + $t('Upload image') + "</a>\n                    </template>\n                    <span class=\"m2c-image-teaser-configurator__size-info\">{{ configuration.size_info }}</span>\n                </div>\n                <div class=\"m2c-products-grid-configurator__image-wrapper\">\n                    <img :src=\"configuration.hero_image\" class=\"m2c-image-teaser-configurator__item-image\" v-show=\"configuration.hero_image\">\n                    <input type=\"hidden\" v-model=\"configuration.hero_image\">\n                    <input type=\"hidden\" class=\"m2c-products-grid-configurator__image-url\" id=\"products-grid-img\">\n                </div>\n            </div>\n        </div>\n    </form>",
    props: {
        configuration: {
            type: Object,
            default: function () {
                return {
                    category_id: '',
                    order_by: 'creation_date-DESC',
                    rows_desktop: 2,
                    rows_tablet: 2,
                    rows_mobile: 2,
                    hero_image: '',
                    hero_headline: '',
                    hero_subheadline: '',
                    hero_url: '',
                    hero_button_label: '',
                    decoded_image: '',
                    size_info: '',
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
            this.configuration.decoded_image = Base64 ? Base64.decode(encodedImage) : window.atob(encodedImage);
            var img = new Image();
            img.onload = function () {
                var ar = _this.getAspectRatio(img.naturalWidth, img.naturalHeight);
                _this.configuration.hero_image = img.getAttribute('src');
                _this.configuration.size_info = img.naturalWidth + "x" + img.naturalHeight + "px (" + ar + ")";
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
            var component = this;
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/cfg-pg-hero_url");
            /* clean current value since widget chooser doesn't do that to allow multiple widgets
             * we don't want that since this should be url for CTA */
            component.configuration.hero_url = '';
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
    },
    ready: function () {
        this.imageUploadListener();
        this.widgetSetListener();
    }
};

return m2cProductsGridConfigurator;

})));
//# sourceMappingURL=m2c-products-grid-configurator.js.map
