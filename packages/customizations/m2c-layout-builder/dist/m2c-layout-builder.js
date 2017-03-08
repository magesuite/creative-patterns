(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('mage/translate'), require('Vue'), require('Magento_Ui/js/modal/confirm')) :
    typeof define === 'function' && define.amd ? define('m2cLayoutBuilder', ['exports', 'jquery', 'mage/translate', 'Vue', 'Magento_Ui/js/modal/confirm'], factory) :
    (factory((global.m2cLayoutBuilder = global.m2cLayoutBuilder || {}),global.jQuery,global.$t,global.Vue,global.confirm));
}(this, (function (exports,$,$t,Vue,confirm) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;
Vue = 'default' in Vue ? Vue['default'] : Vue;
confirm = 'default' in confirm ? confirm['default'] : confirm;

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
    template: "<div data-role=\"spinner\" class=\"cc-component-placeholder__loading\" v-show=\"isLoading\">\n        <div class=\"spinner\">\n            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n        </div>\n    </div>\n    <div class=\"cc-component-product-grid-preview\" v-show=\"!isLoading\" v-el:scene>\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero_position == 'left' && configuration.hero_image\">\n            <img :src=\"configuration.hero_image\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero_headline\">{{ configuration.hero_headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero_subheadline\">{{ configuration.hero_subheadline }}</h3>\n                <template v-if=\"configuration.hero_url\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.button_label\">{{ configuration.button_label }}</button>\n                </template>\n            </div>\n        </div>\n\n        <ul v-bind:class=\"itemsGridClass\">\n            <template v-for=\"item in getItemsCount()\">\n                <li class=\"cc-component-product-grid-preview__list-item\">\n                    <div class=\"cc-component-product-grid-preview__product-wrapper\">\n                        <svg class=\"cc-component-product-grid-preview__product\">\n                            <use xlink:href=\"#icon_component-cc-product-teaser-item\"></use>\n                        </svg>\n                    </div>\n                </li>\n            </template>\n        </ul>\n\n        <div class=\"cc-component-product-grid-preview__hero\" v-if=\"configuration.hero_position == 'right' && configuration.hero_image\">\n            <img :src=\"configuration.hero_image\" class=\"cc-component-product-grid-preview__hero-image\">\n            <div class=\"cc-component-product-grid-preview__hero-content\">\n                <h2 class=\"cc-component-product-grid-preview__headline\" v-if=\"configuration.hero_headline\">{{ configuration.hero_headline }}</h2>\n                <h3 class=\"cc-component-product-grid-preview__subheadline\" v-if=\"configuration.hero_subheadline\">{{ configuration.hero_subheadline }}</h3>\n                <template v-if=\"configuration.hero_url\">\n                    <button type=\"button\" class=\"cc-component-product-grid-preview__button\" v-if=\"configuration.button_label\">{{ configuration.button_label }}</button>\n                </template>\n            </div>\n        </div>\n    </div>",
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
            if (this.configuration.hero_position) {
                return "cc-component-product-grid-preview__list cc-component-product-grid-preview__list--" + this.configuration.hero_position;
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
            return this.configuration.hero_position ? 6 : 10;
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
    template: "<div class=\"cc-component-static-cms-block-preview\">\n        <h2 class=\"cc-component-static-cms-block-preview__block-id\">CMS Block ID: {{ configuration.identifier }}</h2>\n    </div>",
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

var template = "<div class=\"cc-layout-builder | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use xlink:href=\"#icon_plus\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"component in components\">\n        <div class=\"cc-layout-builder__component\">\n            <div class=\"cc-layout-builder__component-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__buttons\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" :class=\"[ isPossibleToEdit( component.type ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isPossibleToEdit( component.type )\" @click=\"editComponentSettings( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_settings\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-layout-builder__component-wrapper\">\n                <cc-component-placeholder>\n                    <h3 class=\"cc-component-placeholder__headline\" v-text=\"transformComponentTypeToText( component.type )\"></h3>\n                    <div class=\"cc-component-placeholder__component\">\n                        <component :is=\"'cc-component-' + component.type + '-preview'\" :configuration=\"component.data\" :index=\"$index\"></component>\n\n                    </div>\n                </cc-component-placeholder>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"components.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</div>\n";

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
var layoutBuilder = {
    template: template,
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

var template$1 = "<div class=\"m2c-layout-builder | {{ class }}\">\n    <div class=\"m2c-layout-builder__component m2c-layout-builder__component--static\">\n        <div class=\"m2c-layout-builder__component-wrapper\">\n            <div class=\"cc-component-placeholder__component cc-component-placeholder__component--decorated cc-component-placeholder__component--header\">\n                <svg class=\"cc-component-placeholder__component-icon\">\n                    <use xlink:href=\"#icon_component-cc-header\"></use>\n                </svg>\n            </div>\n        </div>\n\n        <cc-component-adder class=\"cc-component-adder cc-component-adder--last\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( 0 )\">\n                <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </div>\n\n    <template v-for=\"component in components\">\n        <div class=\"m2c-layout-builder__component\" id=\"{{ component.id }}\">\n            <cc-component-adder class=\"cc-component-adder cc-component-adder--first\">\n                <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( $index )\">\n                    <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                        <use xlink:href=\"#icon_plus\"></use>\n                    </svg>\n                </button>\n            </cc-component-adder>\n\n            <div class=\"m2c-layout-builder__component-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__buttons\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-up\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use xlink:href=\"#icon_arrow-down\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" :class=\"[ isPossibleToEdit( component.type ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isPossibleToEdit( component.type )\" @click=\"editComponentSettings( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_edit\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use xlink:href=\"#icon_trash-can\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"m2c-layout-builder__component-wrapper\">\n                <cc-component-placeholder>\n                    <h3 class=\"cc-component-placeholder__headline\" v-text=\"transformComponentTypeToText( component.type )\"></h3>\n                    <div class=\"cc-component-placeholder__component\">\n\n                        <component :is=\"'cc-component-' + component.type + '-preview'\" :configuration=\"component.data\" :index=\"$index\" :assets-src=\"assetsSrc\"></component>\n\n                    </div>\n                </cc-component-placeholder>\n            </div>\n\n            <cc-component-adder class=\"cc-component-adder cc-component-adder--last\">\n                <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( $index + 1 )\">\n                    <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                        <use xlink:href=\"#icon_plus\"></use>\n                    </svg>\n                </button>\n            </cc-component-adder>\n        </div>\n    </template>\n\n    <div class=\"m2c-layout-builder__component m2c-layout-builder__component--static\">\n        <cc-component-adder class=\"cc-component-adder cc-component-adder--first\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button\" @click=\"createNewComponent( components.length + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon\">\n                    <use xlink:href=\"#icon_plus\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n\n        <div class=\"m2c-layout-builder__component-wrapper\">\n            <div class=\"cc-component-placeholder__component cc-component-placeholder__component--decorated cc-component-placeholder__component--footer\">\n                <svg class=\"cc-component-placeholder__component-icon\">\n                    <use xlink:href=\"#icon_component-cc-footer\"></use>\n                </svg>\n            </div>\n        </div>\n    </div>\n</div>\n";

/**
 * Layout builder component - M2 implementation.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
var m2cLayoutBuilder = {
    template: template$1,
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

exports['default'] = m2cLayoutBuilder;
exports.m2cLayoutBuilder = m2cLayoutBuilder;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=m2c-layout-builder.js.map
