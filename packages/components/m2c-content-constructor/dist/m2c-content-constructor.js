(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('Vue'), require('VueResource'), require('mage/translate'), require('Magento_Ui/js/modal/modal'), require('uiRegistry')) :
    typeof define === 'function' && define.amd ? define('m2cContentConstructor', ['jquery', 'Vue', 'VueResource', 'mage/translate', 'Magento_Ui/js/modal/modal', 'uiRegistry'], factory) :
    (global.m2cContentConstructor = factory(global.$,global.Vue,global.vr,global.$t,global.modal,global.uiRegistry));
}(this, (function ($,Vue,vr,$t,modal,uiRegistry) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
Vue = 'default' in Vue ? Vue['default'] : Vue;
vr = 'default' in vr ? vr['default'] : vr;
$t = 'default' in $t ? $t['default'] : $t;
modal = 'default' in modal ? modal['default'] : modal;
uiRegistry = 'default' in uiRegistry ? uiRegistry['default'] : uiRegistry;

/* tslint:disable:no-console */
/**
 * Headline configurator component.
 * This component is responsible for displaying headlines configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccHeadlineConfigurator = {
    template: "<form class=\"cc-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"cs-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"configuration.title\" id=\"cfg-headline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"cs-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"configuration.subtitle\" id=\"cfg-subheadline\" class=\"cs-input__input\" @change=\"onChange\">\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
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
         */
        save: {
            type: Function,
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function,
        },
        configuration: {
            type: Object,
            default: {
                title: '',
                subtitle: '',
            },
        },
    },
    methods: {
        onChange: function (event) {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-headline-configurator__change', data);
            if (typeof this.change === 'function') {
                this.change(data);
            }
        },
        onSave: function (event) {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-headline-configurator__save', data);
            if (typeof this.save === 'function') {
                this.save(data);
            }
        },
    },
};

/* tslint:disable:no-console */
// TODO: Use m2-input component the Vue way.
var m2cHeadlineConfigurator = {
    template: "<form class=\"m2c-headline-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-headline\" class=\"m2-input__label\">Headline:</label>\n            <input type=\"text\" v-model=\"configuration.title\" id=\"cfg-headline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n        <div class=\"m2-input m2-input--type-inline\">\n            <label for=\"cfg-subheadline\" class=\"m2-input__label\">Subheadline:</label>\n            <input type=\"text\" v-model=\"configuration.subtitle\" id=\"cfg-subheadline\" class=\"m2-input__input\" @change=\"onChange\">\n        </div>\n    </form>",
    mixins: [
        ccHeadlineConfigurator,
    ],
};

/**
 * Image teaser configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccImageTeaserConfigurator = {
    template: "<form class=\"cc-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-width\" class=\"cs-input__label\">Teaser width:</label>\n                <select name=\"cfg-it-width-select\" class=\"cs-input__select\" id=\"cfg-it-width\" v-model=\"configuration.teaserWidth\" @change=\"onChange\">\n                    <option value=\"full-width\" selected>Full browser width</option>\n                    <option value=\"limited-width\">Breaking point width (1280px)</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-images-per-slide\" class=\"cs-input__label\">Images per slide:</label>\n                <select name=\"cfg-it-images-per-slide\" class=\"cs-input__select\" id=\"cfg-it-images-per-slide\" v-model=\"configuration.itemsPerSlide\" @change=\"onChange\">\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                </select>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cc-image-teaser-configurator__teaser\">\n                <template v-for=\"item in configuration.items\">\n                    <div class=\"cc-image-teaser-configurator__teaser-item\" id=\"cc-image-teaser-item-{{ $index }}\">\n                        <div class=\"cc-image-teaser-configurator__toolbar\">\n                            <span class=\"cc-image-teaser-configurator__teaser-item-title\">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>\n                            <a href=\"#\" class=\"cc-image-teaser-configurator__upload-link href=\"#\">Upload image</a>\n                        </div>\n                        <div class=\"cc-image-teaser-configurator__image-holder-outer\">\n                            <div class=\"cc-image-teaser-configurator__image-holder-inner\">\n                                <input type=\"hidden\" value=\"\" class=\"cc-image-teaser-configurator__image-url\" v-model=\"configuration.items[$index].image\" @change=\"onChange\"> \n                            </div>\n                        </div>\n                        <div class=\"cs-input cs-input--type-required\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__label\">Headline:</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"cs-input cs-input--type-required\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                            <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__textarea cs-input__textarea--look-thin\" @change=\"onChange\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                        </div>\n                        <div class=\"cs-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"cs-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                            <input type=\"text\" v-model=\"item.ctaTarget\" id=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__input\" @change=\"onChange\">\n                        </div>\n                    </div>\n                </template>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions\">\n            <button type=\"submit\">Save</button>\n        </section>\n    </form>",
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
         */
        save: {
            type: Function,
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function,
        },
        /**
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    teaserWidth: 'full-width',
                    items: [
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                        {
                            image: '',
                            headline: '',
                            paragraph: '',
                            ctaLabel: 'More',
                            ctaTarget: '',
                        },
                    ],
                };
            },
        },
    },
    methods: {
        onSave: function (event) {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-image-teaser-configurator__save', data);
            if (typeof this.save === 'function') {
                this.save(data);
            }
        },
        updateConfig: function () {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-image-teaser-configurator__change', data);
            if (typeof this.change === 'function') {
                this.change(data);
            }
        },
        onChange: function (event) {
            this.updateConfig();
        },
    },
};

// Pattern for teaser Item
var teaserItemDataPattern = {
    image: '',
    decodedImage: '',
    headline: '',
    paragraph: '',
    ctaLabel: $t('More'),
    ctaTarget: '',
};
/**
 * M2C Image teaser component for admin panel.
 * This component is responsible for managing image teasers including image upload and widget chooser
 */
var m2cImageTeaserConfigurator = {
    template: "<form class=\"m2c-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <div class=\"m2-input m2-input--type-inline\">\n                <label for=\"cfg-it-width\" class=\"m2-input__label\">" + $t('Teaser width') + ":</label>\n                <select name=\"cfg-it-width-select\" class=\"m2-input__select\" id=\"cfg-it-width\" v-model=\"configuration.teaserWidth\" @change=\"onChange\">\n                    <option value=\"full-width\">" + $t('Full browser width') + "</option>\n                    <option value=\"limited-width\">" + $t('Breaking point width (1280px)') + "</option>\n                </select>\n            </div>\n        </section>\n\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <div class=\"m2c-image-teaser-configurator__teaser\">\n                <template v-for=\"item in configuration.items\">\n                    <div class=\"m2c-image-teaser-configurator__teaser-item\" id=\"m2c-image-teaser-item-{{ $index }}\">\n                        <div class=\"m2c-image-teaser-configurator__toolbar\">\n                            <span class=\"m2c-image-teaser-configurator__teaser-item-title\">\n                                " + $t('Banner') + " {{ $index+1 }}/{{ configuration.items.length }}\n                            </span>\n                            <template v-if=\"configuration.items[$index].image\">\n                                <a href=\"#\" href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Change image') + "</a>\n                            </template>\n                            <template v-else>\n                                <a href=\"#\" href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Upload image') + "</a>\n                            </template>\n                        </div>\n                        <div class=\"m2c-image-teaser-configurator__image-holder-outer\">\n                            <div class=\"m2c-image-teaser-configurator__image-holder-inner\">\n                                <img :src=\"configuration.items[$index].image\" class=\"m2c-image-teaser-configurator__image\" v-show=\"configuration.items[$index].image\">\n                                <template v-if=\"isPossibleToDelete( $index )\">\n                                    <button class=\"action-button action-button--look_default action-button--type_icon | m2c-image-teaser-configurator__delete-button\" @click=\"deleteTeaserItem( $index )\">\n                                        <svg class=\"action-button__icon action-button__icon--size_300\">\n                                            <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_trash-can' }\"></use>\n                                        </svg>\n                                        " + $t('Delete banner') + "\n                                    </button>\n                                </template>\n                                <input type=\"hidden\" class=\"m2c-image-teaser-configurator__image-url\" v-model=\"configuration.items[$index].image\" id=\"img-{{$index}}\"> \n                            </div>\n                        </div>\n                        <div class=\"m2-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"m2-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"m2-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"m2-input__label\">" + $t('Paragraph') + ":</label>\n                            <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"m2-input__textarea m2-input__textarea--look-thin\" @change=\"onChange\" placeholder=\"(" + $t('max 200 characters') + ")\" maxlength=\"200\"></textarea>\n                        </div>\n                        <div class=\"m2-input\">\n                            <label for=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"m2-input__label\">" + $t('CTA label') + ":</label>\n                            <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"m2-input__input\" @change=\"onChange\">\n                        </div>\n                        <div class=\"m2-input\">\n                            <div class=\"m2c-image-teaser-configurator__cta-actions\">\n                                <label class=\"m2-input__label\">" + $t('CTA target link') + ":</label>\n                                <template v-if=\"item.ctaTarget\">\n                                    <a href=\"#\" @click=\"openCtaTargetModal( $index )\">" + $t('Edit') + "</a>\n                                </template>\n                                <template v-else>\n                                    <a href=\"#\" @click=\"openCtaTargetModal( $index )\">" + $t('Add') + "</a>\n                                </template>\n                            </div>\n                            <input type=\"text\" class=\"m2-input__input m2-input--type-readonly | m2c-image-teaser-configurator__cta-target-link\" readonly v-model=\"configuration.items[$index].ctaTarget\" id=\"ctatarget-output-{{ $index }}\">\n                        </div>\n                    </div>\n                </template>\n            </div>\n        </section>\n    </form>",
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: function () {
                return {
                    teaserWidth: 'full-width',
                    items: [JSON.parse(JSON.stringify(teaserItemDataPattern))],
                };
            },
        },
        /* Collect base-url for the image uploader */
        uploaderBaseUrl: {
            type: String,
            default: '',
        },
        /* get assets for displaying component images */
        assetsSrc: {
            type: String,
            default: '',
        },
    },
    events: {
        m2cConfigurationSaved: function () {
            this.cleanupConfiguration();
        },
    },
    methods: {
        /* Opens M2's built-in image manager modal
         * Manages all images: image upload from hdd, select image that was already uploaded to server
         * @param index {number} - index of image teaser item
         */
        getImageUploader: function (index) {
            MediabrowserUtility.openDialog(this.uploaderBaseUrl + "target_element_id/img-" + index + "/", 'auto', 'auto', $t('Insert File...'), {
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
            $('.m2c-image-teaser-configurator__image-url').on('change', function (event) {
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
            this.updateConfig();
            this.createTeaserItem();
        },
        /* Creates another teaser item using teaserItemDataPattern */
        createTeaserItem: function () {
            /* If image of last array item in this.configuration.items is not empty, add another teaser item */
            if (this.configuration.items && this.configuration.items.slice(-1)[0].image !== '') {
                this.configuration.items.push(JSON.parse(JSON.stringify(teaserItemDataPattern)));
            }
        },
        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal: function (index) {
            var component = this;
            widgetTools.openDialog(window.location.origin + "/admin/admin/widget/index/widget_target_id/ctatarget-output-" + index);
            /* clean current value since widget chooser doesn't do that to allow multiple widgets
             * we don't want that since this should be url for CTA */
            component.configuration.items[index].ctaTarget = '';
            // There must be better way to do that...
            /*const getIsWidgetReady: any = window.setInterval((): void => {
                if ( !$( widgetTools.dialogWindow[ 0 ] ).is( ':empty' ) ) {

                    if ( wWidget ) {
                        hideUnwantedWidgetOptions( wWidget );
                        clearInterval( getIsWidgetReady );
                    }
                }
            }, 100);

            const hideUnwantedWidgetOptions: void = function( wWidget: any ) {
                for ( let option of wWidget.widgetEl.options ) {
                    if (
                        escape( option.value ) === 'Magento%5CCms%5CBlock%5CWidget%5CBlock' ||
                        escape( option.value ) === 'Magento%5CCatalog%5CBlock%5CProduct%5CWidget%5CNewWidget' ||
                        escape( option.value ) === 'Magento%5CCatalogWidget%5CBlock%5CProduct%5CProductsList' ||
                        escape( option.value ) === 'Magento%5CSales%5CBlock%5CWidget%5CGuest%5CForm' ||
                        escape( option.value ) === 'Magento%5CReports%5CBlock%5CProduct%5CWidget%5CCompared' ||
                        escape( option.value ) === 'Magento%5CReports%5CBlock%5CProduct%5CWidget%5CViewed'
                    ) {
                        option.style.display = 'none';
                    }
                }
            };*/
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.ctaTarget is changed
         */
        widgetSetListener: function () {
            var component = this;
            $('.m2c-image-teaser-configurator__cta-target-link').on('change', function () {
                component.updateConfig();
            });
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
            if (confirm($t("Are you sure you want to remove this banner?"))) {
                this.configuration.items.splice(index, 1);
                this.updateConfig();
            }
        },
        /* Cleans configuration for M2C content constructor after Saving component
         * All empty teaser items has to be removed to not get into configuration object
         */
        cleanupConfiguration: function () {
            var filteredArray = this.configuration.items.filter(function (item) { return item.image !== ''; });
            this.configuration.items = filteredArray;
            this.updateConfig();
        },
    },
    ready: function () {
        this.widgetSetListener();
        this.createTeaserItem();
    },
    mixins: [
        ccImageTeaserConfigurator,
    ],
};

/**
 * Static block configurator component.
 * This component is responsible for displaying static block's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccStaticBlockConfigurator = {
    template: "<form class=\"cc-static-block-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <div class=\"cs-input cs-input--type-inline\">\n            <label for=\"cfg-static-block\" class=\"cs-input__label\">Static block:</label>\n            <select name=\"select\" class=\"cs-input__select\" id=\"cfg-static-block\" v-model=\"configuration.identifier\" @change=\"onChange\">\n                <option value=\"1\" selected>Foo</option>\n                <option value=\"2\">Bar</option>\n            </select>\n        </div>\n        <button type=\"submit\">Save</button>\n    </form>",
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
         */
        save: {
            type: Function,
        },
        /**
         * Property containing callback triggered when configuration is changed.
         */
        change: {
            type: Function,
        },
        configuration: {
            type: Object,
            default: {
                identifier: '',
            },
        },
    },
    methods: {
        onChange: function (event) {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-static-block-configurator__change', data);
            if (typeof this.change === 'function') {
                this.change(data);
            }
        },
        onSave: function (event) {
            var data = JSON.parse(JSON.stringify(this.configuration));
            this.$dispatch('cc-static-block-configurator__save', data);
            if (typeof this.save === 'function') {
                this.save(data);
            }
        },
    },
};

var m2cStaticBlockConfigurator = {
    template: '#m2c-static-blocks-form',
    mixins: [
        ccStaticBlockConfigurator,
    ],
};

/**
 * Componen picker.
 * Lists all types of components available in m2c in the grid/list mode
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccComponentPicker = {
    template: "<section class=\"cc-component-picker | {{ class }}\">\n        <ul class=\"cc-component-picker__list\" v-if=\"availableComponents.length\">\n            <li class=\"cc-component-picker__list-item cc-component-picker__list-item--{{component.type}}\" v-for=\"component in availableComponents\">\n                <a class=\"cc-component-picker__component-link\" href=\"#\" @click.prevent=\"onPickComponent( component.type )\">\n                    <span class=\"cc-component-picker__component-figure\">\n                        <svg class=\"cc-component-picker__component-icon\">\n                            <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_component-' + component.type }\"></use>\n                        </svg>\n                    </span>\n                    <span class=\"cc-component-picker__component-name\">{{ component.name }}</span>\n                </a>\n                <p class=\"cc-component-picker__component-description\">{{ component.description }}</p>\n            </li>\n        </ul>\n        <p class=\"cc-component-picker__no-components\" v-if=\"!availableComponents.length\">\n            No components available.\n        </p>\n    </section>",
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
    template: "<div class=\"cc-component-image-teaser-preview\">\n        <div class=\"cc-component-image-teaser-preview__items\">\n            <template v-for=\"item in configuration.items\">\n                <div class=\"cc-component-image-teaser-preview__item-wrapper-outer\" id=\"cc-image-teaser-item-{{ $index }}\" v-show=\"configuration.items[$index].image\">\n                    <div class=\"cc-component-image-teaser-preview__item-wrapper-inner\">\n                        <div class=\"cc-component-image-teaser-preview__item\">\n                            <img :src=\"configuration.items[$index].image\" class=\"cc-component-image-teaser-preview__item-image\">\n                            <h3 class=\"cc-component-image-teaser-preview__item-index\">Banner {{ $index+1 }}/{{ configuration.items.length }}</h3>\n                        </div>\n                    </div>\n                </div>\n            </template>\n        </div>\n    </div>",
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

var template = "<div class=\"cc-layout-builder | {{ class }}\">\n    <cc-component-adder>\n        <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( 0 )\">\n            <svg class=\"action-button__icon action-button__icon--size_300\">\n                <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_plus' }\"></use>\n            </svg>\n        </button>\n    </cc-component-adder>\n    <template v-for=\"component in components\">\n        <div class=\"cc-layout-builder__component\">\n            <div class=\"cc-layout-builder__component-actions\">\n                <cc-component-actions>\n                    <template slot=\"cc-component-actions__top\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up\" @click=\"moveComponentUp( $index )\" :class=\"[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isFirstComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_arrow-up' }\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down\" @click=\"moveComponentDown( $index )\" :class=\"[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]\" :disabled=\"isLastComponent( $index )\">\n                            <svg class=\"action-button__icon action-button__icon--size_100\">\n                                <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_arrow-down' }\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                    <template slot=\"cc-component-actions__bottom\">\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings\" @click=\"editComponentSettings( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_settings' }\"></use>\n                            </svg>\n                        </button>\n                        <button is=\"action-button\" class=\"action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete\" @click=\"deleteComponent( $index )\">\n                            <svg class=\"action-button__icon\">\n                                <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_trash-can' }\"></use>\n                            </svg>\n                        </button>\n                    </template>\n                </cc-component-actions>\n            </div>\n            <div class=\"cc-layout-builder__component-wrapper\">\n                <cc-component-placeholder>\n                    <h3 class=\"cc-component-placeholder__headline\" v-text=\"transformComponentTypeToText( component.type )\"></h3>\n                    <div class=\"cc-component-placeholder__component\">\n\n                        <component :is=\"'cc-component-' + component.type + '-preview'\" :configuration=\"component.data\" :index=\"$index\"></component>\n\n                    </div>\n                </cc-component-placeholder>\n            </div>\n        </div>\n        <cc-component-adder v-if=\"components.length\">\n            <button is=\"action-button\" class=\"action-button action-button--look_important action-button--type_icon-only\" @click=\"createNewComponent( $index + 1 )\">\n                <svg class=\"action-button__icon action-button__icon--size_300\">\n                    <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_plus' }\"></use>\n                </svg>\n            </button>\n        </cc-component-adder>\n    </template>\n</div>\n";

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
var layoutBuilder = {
    template,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
        'cc-component-headline-preview': ccComponentHeadlinePreview,
        'cc-component-image-teaser-preview': ccComponentImageTeaserPreview,
        'cc-component-static-cms-block-preview': ccComponentStaticCmsBlockPreview,
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
            if (index > 0) {
                var previousComponent = this.components[index - 1];
                this.components.$set(index - 1, this.components[index]);
                this.components.$set(index, previousComponent);
                this.$dispatch('cc-layout-builder__update');
            }
        },
        /**
         * Moves component under given index down by swaping it with next element.
         * @param {number} index Component's index in array.
         */
        moveComponentDown: function (index) {
            if (index < this.components.length - 1) {
                var previousComponent = this.components[index + 1];
                this.components.$set(index + 1, this.components[index]);
                this.components.$set(index, previousComponent);
                this.$dispatch('cc-layout-builder__update');
            }
        },
        /**
         * Removes component and adder that is right after component from the DOM
         * @param {number} index Component's index in array.
         */
        deleteComponent: function (index) {
            if (confirm("Are you sure you want to remove this component?")) {
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
    template: "<div class=\"m2c-content-constructor\">\n        <cc-layout-builder\n            v-ref:layout-builder\n            :assets-src=\"assetsSrc\"\n            :add-component=\"getComponentPicker\"\n            :edit-component=\"editComponent\"\n            :components-configuration=\"configuration\">\n        </cc-layout-builder>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--picker\" v-el:picker-modal></div>\n        <div class=\"m2c-content-constructor__modal m2c-content-constructor__modal--configurator\" v-el:configurator-modal></div>\n    </div>",
    components: {
        'cc-layout-builder': layoutBuilder,
        'cc-component-picker': ccComponentPicker,
        'm2c-headline-configurator': m2cHeadlineConfigurator,
        'm2c-static-block-configurator': m2cStaticBlockConfigurator,
        'm2c-image-teaser-configurator': m2cImageTeaserConfigurator,
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
    },
    data: function () {
        return {
            currentComponentConfiguration: undefined,
        };
    },
    ready: function () {
        this.dumpConfiguration();
        this.isPickerLoaded = false;
        this.cleanupConfiguratorModal = '';
    },
    events: {
        /**
         * We update provided input with new components information each time leyout
         * builder updates.
         */
        'cc-layout-builder__update': function () {
            this.dumpConfiguration();
        },
        'cc-headline-configurator__change': function (data) {
            this._currentConfiguratorData = data;
        },
        'cc-static-block-configurator__change': function (data) {
            this._currentConfiguratorData = data;
        },
        'cc-image-teaser-configurator__change': function (data) {
            this._currentConfiguratorData = data;
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
                if (!component.isPickerLoaded) {
                    // Get picker via AJAX
                    component.$http.get(component.configuratorEndpoint + "picker").then(function (response) {
                        component.$els.pickerModal.innerHTML = response.body;
                        component.$compile(component.$els.pickerModal);
                        component.isPickerLoaded = true;
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
            var component = this;
            component._currentConfiguratorData = {};
            // On save component:
            configuratorModalOptions.buttons[1].click = function () {
                component.$broadcast('m2cConfigurationSaved');
                component._addComponentInformation({
                    type: componentType,
                    id: 'component' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
                    data: component._currentConfiguratorData,
                });
                this.closeModal();
                $pickerModal.closeModal();
            };
            // Configurator modal opened callback
            configuratorModalOptions.opened = function () {
                // Get twig component
                component.$http.get(component.configuratorEndpoint + componentType).then(function (response) {
                    $(component.$els.configuratorModal).html(response.body);
                    // compile fetched component
                    component.cleanupConfiguratorModal = component.$compile(component.$els.configuratorModal);
                });
            };
            configuratorModalOptions.closed = function () {
                // Cleanup configurator component and then remove modal
                if (typeof component.cleanupConfiguratorModal === 'function') {
                    component.cleanupConfiguratorModal();
                }
                $configuratorModal.modal[0].parentNode.removeChild($configuratorModal.modal[0]);
            };
            // Create & Show $configuratorModal
            $configuratorModal = modal(configuratorModalOptions, $(this.$els.configuratorModal));
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
         */
        editComponent: function (currentComponentConfiguration, setComponentInformation) {
            var component = this;
            configuratorModalOptions.buttons[1].click = function () {
                component.$broadcast('m2cConfigurationSaved');
                setComponentInformation({
                    type: currentComponentConfiguration.type,
                    id: currentComponentConfiguration.id,
                    data: component._currentConfiguratorData,
                });
                this.closeModal();
            };
            // Configurator modal opened callback
            configuratorModalOptions.opened = function () {
                // Get twig component
                component.$http.get(component.configuratorEndpoint + currentComponentConfiguration.type).then(function (response) {
                    component.$els.configuratorModal.innerHTML = response.body;
                    // Set current component configuration data
                    component.currentComponentConfiguration = currentComponentConfiguration.data;
                    // compile fetched component
                    component.cleanupConfiguratorModal = component.$compile(component.$els.configuratorModal);
                });
            };
            configuratorModalOptions.closed = function () {
                // Cleanup configurator component and then remove modal
                if (typeof component.cleanupConfiguratorModal === 'function') {
                    component.cleanupConfiguratorModal();
                }
                $configuratorModal.modal[0].parentNode.removeChild($configuratorModal.modal[0]);
                component.currentComponentConfiguration = null;
            };
            // Create & Show $configuratorModal
            $configuratorModal = modal(configuratorModalOptions, $(this.$els.configuratorModal));
        },
        dumpConfiguration: function () {
            uiRegistry.get('cms_page_form.cms_page_form').source.set('data.components', JSON.stringify(this.$refs.layoutBuilder.getComponentInformation()));
        },
    },
};

return m2cContentConstructor;

})));
//# sourceMappingURL=m2c-content-constructor.js.map
