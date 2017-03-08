(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('ccContentConstructor', ['jquery'], factory) :
    (global.ccContentConstructor = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

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
        'cc-component-product-carousel-preview': ccComponentProductCarouselPreview,
        'cc-component-static-cms-block-preview': ccComponentStaticCmsBlockPreview,
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

/* tslint:disable:no-console */
/**
 * CC Content Constructor component.
 * Dummy example on how to implement custom Content Constructor logic.
 */
var m2cContentConstructor = {
    template: "<div class=\"cc-content-constructor\">\n        <cc-layout-builder\n            v-ref:layout-builder\n            :assets-src=\"assetsSrc\"\n            :add-component=\"pickRandomComponent\"\n            :edit-component=\"editRandomComponent\"\n            :components-configuration=\"configuration\">\n        </cc-layout-builder>\n    </div>",
    components: {
        'cc-layout-builder': layoutBuilder,
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
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        pickRandomComponent: function (addComponentInformation) {
            this._addComponentInformation = addComponentInformation;
            console.log('Getting component picker.');
            var componentTypes = [
                'headline',
                'static-block',
                'hero',
            ];
            var componentType = componentTypes[Math.floor(Math.random() * componentTypes.length)];
            if (window.confirm("Randomly picked \"" + componentType + "\" component, ok?")) {
                this.getRandomConfigurator(componentType);
            }
        },
        getRandomConfigurator: function (componentType) {
            console.log("Getting configurator for " + componentType + " component.");
            var componentConfiguration = {
                type: componentType,
                id: 'component' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
                data: {},
            };
            if (window.confirm("Do you want to add component with below configuration?\n                " + JSON.stringify(componentConfiguration, null, 2))) {
                this._addComponentInformation(componentConfiguration);
            }
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
         */
        editRandomComponent: function (currentInfo, setComponentInformation) {
            var componentConfiguration = {
                type: currentInfo.type,
                id: 'component' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
                data: currentInfo.data,
            };
            if (window.confirm("Do you want to edit component with below configuration?\n                " + JSON.stringify(componentConfiguration, null, 2))) {
                setComponentInformation(componentConfiguration);
            }
        },
    },
};

return m2cContentConstructor;

})));
//# sourceMappingURL=cc-content-constructor.js.map
