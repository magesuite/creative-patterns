(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('mage/translate')) :
    typeof define === 'function' && define.amd ? define('m2cImageTeaserConfigurator', ['jquery', 'mage/translate'], factory) :
    (global.m2cImageTeaserConfigurator = factory(global.$,global.$t));
}(this, (function ($,$t) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
$t = 'default' in $t ? $t['default'] : $t;

/**
 * Image teaser configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
var ccImageTeaserConfigurator = {
    template: "<form class=\"cc-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-width\" class=\"cs-input__label\">Teaser width:</label>\n                <select name=\"cfg-it-width-select\" class=\"cs-input__select\" id=\"cfg-it-width\" v-model=\"configuration.teaserWidth\" @change=\"onChange\">\n                    <option value=\"full-width\" selected>Full browser width</option>\n                    <option value=\"limited-width\">Breaking point width (1280px)</option>\n                </select>\n            </div>\n            <div class=\"cs-input cs-input--type-inline\">\n                <label for=\"cfg-it-images-per-slide\" class=\"cs-input__label\">Images per slide:</label>\n                <select name=\"cfg-it-images-per-slide\" class=\"cs-input__select\" id=\"cfg-it-images-per-slide\" v-model=\"configuration.itemsPerSlide\" @change=\"onChange\">\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                </select>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section\">\n            <div class=\"cc-image-teaser-configurator__teaser\">\n                <div v-for=\"item in configuration.items\" class=\"cc-image-teaser-configurator__teaser-unit\">\n                    <div class=\"cc-image-teaser-configurator__toolbar\">\n                        <span class=\"cc-image-teaser-configurator__teaser-unit-title\">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>\n                        <a href=\"#\" class=\"cc-image-teaser-configurator__upload-link href=\"#\">Upload image</a>\n                    </div>\n                    <div class=\"cc-image-teaser-configurator__image-holder-outer\">\n                        <div class=\"cc-image-teaser-configurator__image-holder-inner\">\n                            <input type=\"hidden\" value=\"\" class=\"cc-image-teaser-configurator__image-url\" v-model=\"configuration.items[$index].image\" @change=\"onChange\"> \n                        </div>\n                    </div>\n                    <div class=\"cs-input cs-input--type-required\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__label\">Headline:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"cs-input__input\" @change=\"onChange\">\n                    </div>\n                    <div class=\"cs-input cs-input--type-required\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__label\">Paragraph:</label>\n                        <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"cs-input__textarea cs-input__textarea--look-thin\" @change=\"onChange\" placeholder=\"(max 200 characters)\" maxlength=\"200\"></textarea>\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__label\">CTA label:</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"cs-input__input\" @change=\"onChange\">\n                    </div>\n                    <div class=\"cs-input\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__label\">CTA target link:</label>\n                        <input type=\"text\" v-model=\"item.ctaTarget\" id=\"cfg-it-teaser{{ $index+1 }}-cta-target\" class=\"cs-input__input\" @change=\"onChange\">\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions\">\n            <button type=\"submit\">Save</button>\n        </section>\n    </form>",
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
            default: function () {
                return {
                    teaserWidth: 'full-width',
                    itemsPerSlide: '5',
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
    template: "<form class=\"m2c-image-teaser-configurator {{ classes }} | {{ mix }}\" {{ attributes }} @submit.prevent=\"onSave\">\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <div class=\"m2-input m2-input--type-inline\">\n                <label for=\"cfg-it-width\" class=\"m2-input__label\">" + $t('Teaser width') + ":</label>\n                <select name=\"cfg-it-width-select\" class=\"m2-input__select\" id=\"cfg-it-width\" v-model=\"configuration.teaserWidth\" @change=\"onChange\">\n                    <option value=\"full-width\">" + $t('Full browser width') + "</option>\n                    <option value=\"limited-width\">" + $t('Breaking point width (1280px)') + "</option>\n                </select>\n            </div>\n        </section>\n\n        <section class=\"m2c-image-teaser-configurator__section\">\n            <div class=\"m2c-image-teaser-configurator__teaser\">\n                <div v-for=\"item in configuration.items\" class=\"m2c-image-teaser-configurator__teaser-unit\">\n                    <div class=\"m2c-image-teaser-configurator__toolbar\">\n                        <span class=\"m2c-image-teaser-configurator__teaser-unit-title\">\n                            " + $t('Banner') + " {{ $index+1 }}/{{ configuration.items.length }}\n                        </span>\n                        <template v-if=\"configuration.items[$index].image\">\n                            <a href=\"#\" href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Change image') + "</a>\n                        </template>\n                        <template v-else>\n                            <a href=\"#\" href=\"#\" @click=\"getImageUploader( $index )\">" + $t('Upload image') + "</a>\n                        </template>\n                    </div>\n                    <div class=\"m2c-image-teaser-configurator__image-holder-outer\">\n                        <div class=\"m2c-image-teaser-configurator__image-holder-inner\">\n                            <img :src=\"configuration.items[$index].image\" class=\"m2c-image-teaser-configurator__image\" v-show=\"configuration.items[$index].image\">\n                            <template v-if=\"isPossibleToDelete( $index )\">\n                                <button class=\"action-button action-button--look_default action-button--type_icon | m2c-image-teaser-configurator__delete-button\" @click=\"deleteTeaserItem( $index )\">\n                                    <svg class=\"action-button__icon action-button__icon--size_300\">\n                                        <use v-bind=\"{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_trash-can' }\"></use>\n                                    </svg>\n                                    " + $t('Delete banner') + "\n                                </button>\n                            </template>\n                            <input type=\"hidden\" class=\"m2c-image-teaser-configurator__image-url\" v-model=\"configuration.items[$index].image\" id=\"img-{{$index}}\"> \n                        </div>\n                    </div>\n                    <div class=\"m2-input m2-input--type-required\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"m2-input__label\">" + $t('Headline') + ":</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].headline\" id=\"cfg-it-teaser{{ $index+1 }}-headline\" class=\"m2-input__input\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input m2-input--type-required\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"m2-input__label\">" + $t('Paragraph') + ":</label>\n                        <textarea type=\"text\" v-model=\"configuration.items[$index].paragraph\" id=\"cfg-it-teaser{{ $index+1 }}-paragraph\" class=\"m2-input__textarea m2-input__textarea--look-thin\" @change=\"onChange\" placeholder=\"(" + $t('max 200 characters') + ")\" maxlength=\"200\"></textarea>\n                    </div>\n                    <div class=\"m2-input\">\n                        <label for=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"m2-input__label\">" + $t('CTA label') + ":</label>\n                        <input type=\"text\" v-model=\"configuration.items[$index].ctaLabel\" id=\"cfg-it-teaser{{ $index+1 }}-cta-label\" class=\"m2-input__input\" @change=\"onChange\">\n                    </div>\n                    <div class=\"m2-input\">\n                        <div class=\"m2c-image-teaser-configurator__cta-actions\">\n                            <label class=\"m2-input__label\">" + $t('CTA target link') + ":</label>\n                            <template v-if=\"item.ctaTarget\">\n                                <a href=\"#\" @click=\"openCtaTargetModal( $index )\">" + $t('Edit') + "</a>\n                            </template>\n                            <template v-else>\n                                <a href=\"#\" @click=\"openCtaTargetModal( $index )\">" + $t('Add') + "</a>\n                            </template>\n                        </div>\n                        <input type=\"text\" class=\"m2-input__input m2-input--type-readonly | m2c-image-teaser-configurator__cta-target-link\" readonly v-model=\"configuration.items[$index].ctaTarget\" id=\"ctatarget-output-{{ $index }}\">\n                    </div>\n                </div>\n            </div>\n        </section>\n    </form>",
    props: {
        /* Configuration of image teaser */
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
            var base64 = input.value.substring(input.value.lastIndexOf('___directive/') + 13, input.value.lastIndexOf(',/') - 1);
            this.configuration.items[itemIndex].decodedImage = atob(base64);
            this.updateConfig();
            this.createTeaserItem();
        },
        /* Creates another teaser item using teaserItemDataPattern */
        createTeaserItem: function () {
            /* If image of last array item in this.configuration.items is not empty, add another teaser item */
            if (this.configuration.items.slice(-1)[0].image !== '') {
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

return m2cImageTeaserConfigurator;

})));
//# sourceMappingURL=m2c-image-teaser-configurator.js.map
