import ccHeroCarouselConfigurator from '../../../components/cc-hero-carousel-configurator/src/cc-hero-carousel-configurator';

import $ from 'jquery';
import $t from 'mage/translate';
import confirm from 'Magento_Ui/js/modal/confirm';

// Pattern for teaser Item
const heroItemDataPattern: any = {
    image: '',
    decodedImage: '',
    displayVariant: 'variant-1',
    headline: '',
    paragraph: '',
    ctaLabel: $t( 'Check offer' ),
    href: '',
};

/**
 * M2C skin for Hero configurator component.
 * This component is responsible for displaying hero carousel's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const m2cHeroCarouselConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccHeroCarouselConfigurator,
    ],
    template: `<div class="m2c-hero-carousel-configurator | {{ class }}">
        <cc-component-adder>
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | m2c-hero-carousel-configurator__item-action-button" @click="createNewHeroItem( 0 )">
                <svg class="action-button__icon action-button__icon--size_300">
                    <use v-bind="{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_plus' }"></use>
                </svg>
            </button>
        </cc-component-adder>
        <template v-for="item in configuration.items">
            <div class="m2c-hero-carousel-configurator__item" id="m2c-hero-carousel-item-{{ $index }}">
                <div class="m2c-hero-carousel-configurator__item-actions">
                    <cc-component-actions>
                        <template slot="cc-component-actions__top">
                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-hero-carousel-configurator__item-action-button" @click="moveHeroItemUp( $index )" :class="[ isFirstHeroItem( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isFirstHeroItem( $index )">
                                <svg class="action-button__icon action-button__icon--size_100">
                                    <use v-bind="{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_arrow-up' }"></use>
                                </svg>
                            </button>
                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-hero-carousel-configurator__item-action-button" @click="moveHeroItemDown( $index )" :class="[ isLastHeroItem( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isLastHeroItem( $index )">
                                <svg class="action-button__icon action-button__icon--size_100">
                                    <use v-bind="{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_arrow-down' }"></use>
                                </svg>
                            </button>
                        </template>
                        <template slot="cc-component-actions__bottom">
                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-hero-carousel-configurator__item-action-button" @click="deleteHeroItem( $index )">
                                <svg class="action-button__icon">
                                    <use v-bind="{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_trash-can' }"></use>
                                </svg>
                            </button>
                        </template>
                    </cc-component-actions>
                </div>
                <div class="m2c-hero-carousel-configurator__item-content">
                    <div v-bind:class="[ 'm2c-hero-carousel-configurator__item-col-left', configuration.items[$index].image ? 'm2c-hero-carousel-configurator__item-col-left--look-image-uploaded' : '' ]">
                        <div class="m2c-hero-carousel-configurator__toolbar">
                            <template v-if="configuration.items[$index].image">
                                <a href="#" @click="getImageUploader( $index )">${$t( 'Change image' )}</a>
                            </template>
                            <template v-else>
                                <a href="#" @click="getImageUploader( $index )">${$t( 'Upload image' )}</a>
                            </template>
                        </div>
                        <div class="m2c-hero-carousel-configurator__item-image-wrapper">
                            <img :src="configuration.items[$index].image" class="m2c-hero-carousel-configurator__item-image" v-show="configuration.items[$index].image">
                            <input type="hidden" class="m2c-hero-carousel-configurator__image-url" v-model="configuration.items[$index].image" id="hero-img-{{$index}}">
                        </div>
                    </div>
                    <div class="m2c-hero-carousel-configurator__item-col-right">
                        <div class="m2-input | m2c-hero-carousel-configurator__item-form-element">
                            <label for="cfg-hc-item{{ $index }}-variant" class="m2-input__label">${$t( 'Display variant' )}:</label>
                            <select name="cfg-hc-item{{ $index }}-variant" class="m2-input__select" id="cfg-hc-item{{ $index }}-variant" v-model="configuration.items[$index].displayVariant" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }">
                                <option value="variant-1">${$t( 'Text vertically centered on the left' )}</option>
                                <option value="variant-2">${$t( 'Text vertically centered in the middle' )}</option>
                                <option value="variant-3">${$t( 'Text on the bottom, left corner' )}</option>
                                <option value="variant-4">${$t( 'Text on the bottom - centered' )}</option>
                            </select>
                        </div>
                        <div class="m2-input | m2c-hero-carousel-configurator__item-form-element">
                            <label for="cfg-hc-item{{ $index }}-headline" class="m2-input__label">${$t( 'Headline' )}:</label>
                            <input type="text" v-model="configuration.items[$index].headline" id="cfg-hc-item{{ $index }}-headline" class="m2-input__input">
                        </div>
                        <div class="m2-input | m2c-hero-carousel-configurator__item-form-element">
                            <label for="cfg-hc-item{{ $index }}-paragraph" class="m2-input__label">${$t( 'Paragraph' )}:</label>
                            <textarea type="text" v-model="configuration.items[$index].paragraph" id="cfg-hc-item{{ $index }}-paragraph" class="m2-input__textarea" placeholder="(max 200 characters)" maxlength="200"></textarea>
                        </div>
                        <div class="m2-input | m2c-hero-carousel-configurator__item-form-element">
                            <label for="cfg-hc-item{{ $index }}-cta-label" class="m2-input__label">${$t( 'CTA label' )}:</label>
                            <input type="text" v-model="configuration.items[$index].ctaLabel" id="cfg-hc-item{{ $index }}-cta-label" class="m2-input__input">
                        </div>
                        <div class="m2-input m2-input--type-addon | m2c-hero-carousel-configurator__item-form-element">
                            <label for="hero-ctatarget-output-{{ $index }}" class="m2-input__label">${$t( 'CTA target link' )}:</label>
                            <input type="text" class="m2-input__input m2-input--type-readonly | m2c-hero-carousel-configurator__cta-target-link" readonly v-model="configuration.items[$index].href" id="hero-ctatarget-output-{{ $index }}">
                            <span class="m2-input__addon | m2c-hero-carousel-configurator__widget-chooser-trigger" @click="openCtaTargetModal( $index )">
                                <svg class="m2-input__addon-icon">
                                    <use v-bind="{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_link' }"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <cc-component-adder v-if="configuration.items.length">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | m2c-hero-carousel-configurator__item-action-button" @click="createNewHeroItem( $index + 1 )">
                    <svg class="action-button__icon action-button__icon--size_300">
                        <use v-bind="{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_plus' }"></use>
                    </svg>
                </button>
            </cc-component-adder>
        </template>
    </div>`,
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default: {
                items: [ JSON.parse( JSON.stringify( heroItemDataPattern ) ) ],
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
        'cc-component-configurator__save'(): void {
            this.cleanupConfiguration();
            this.onSave();
        },
    },
    methods: {
        /* Opens M2's built-in image manager modal
         * Manages all images: image upload from hdd, select image that was already uploaded to server
         * @param index {number} - index of image of hero item
         */
        getImageUploader( index: number ): void {
            MediabrowserUtility.openDialog( `${this.uploaderBaseUrl}target_element_id/hero-img-${index}/`,
                'auto',
                'auto',
                $t( 'Insert File...' ),
                {
                    closed: true,
                },
            );

            this.imageUploadListener();
        },

        /* Listener for image uploader
         * Since Magento does not provide any callback after image has been chosen
         * we have to watch for target where decoded url is placed
         */
        imageUploadListener(): void {
            const component: any = this;

            // jQuery has to be used, native addEventListener doesn't catch change of input's value
            $( '.m2c-hero-carousel-configurator__image-url' ).on( 'change', ( event: Event ): void => {
                component.onImageUploaded( event.target );

                // For some reason this is emmitted twice, so prevent second action
                $( this ).off( event );
            } );
        },

        /* Action after image was uploaded
         * URL is encoded, so strip it and decode Base64 to get {{ media url="..."}} format
         * which will go to the items.image and will be used to display image on front end
         * @param input { object } - input with raw image path which is used in admin panel
         */
        onImageUploaded( input: any ): void {
            const itemIndex: any = input.id.substr( input.id.length - 1 );
            const encodedImage: any = input.value.match( '___directive\/([a-zA-Z0-9]*)' )[ 1 ];

            this.configuration.items[ itemIndex ].decodedImage = Base64 ? Base64.decode( encodedImage ) : window.atob( encodedImage );
            this.onChange();
        },
        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal( index: number ): void {
            widgetTools.openDialog( `${window.location.origin}/admin/admin/widget/index/widget_target_id/hero-ctatarget-output-${index}` );

            /* clean current value since widget chooser doesn't do that to allow multiple widgets
             * we don't want that since this should be url for CTA
             */
            this.configuration.items[ index ].href = '';
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.href is changed
         */
        widgetSetListener(): void {
            const component: any = this;

            $( '.m2c-hero-carousel-configurator__cta-target-link' ).on( 'change', (): void => {
                component.onChange();
            } );
        },
        /**
         * Creates new hero item and adds it to a specified index.
         * @param {number} index New component's index in components array.
         */
        createNewHeroItem( index: number ): void {
            this.configuration.items.splice( index, 0, JSON.parse( JSON.stringify( heroItemDataPattern ) ) );
            this.onChange();
        },
        /**
         * Moves hero item under given index up by swaping it with previous element.
         * @param {number} index Hero item's index in array.
         */
        moveHeroItemUp( index: number ): void {
            if ( index > 0 ) {
                this.configuration.items.splice( index - 1, 0, this.configuration.items.splice( index, 1 )[ 0 ] );
                this.onChange();
            }
        },
        /**
         * Moves hero item under given index down by swaping it with next element.
         * @param {number} index Hero item's index in array.
         */
        moveHeroItemDown( index: number ): void {
            if ( index < this.configuration.items.length - 1 ) {
                this.configuration.items.splice( index + 1, 0, this.configuration.items.splice( index, 1 )[ 0 ] );
                this.onChange();
            }
        },
        /**
         * Tells if item with given index is the first hero item.
         * @param  {number}  index Index of the hero item.
         * @return {boolean}       If hero item is first in array.
         */
        isFirstHeroItem( index: number ): boolean {
            return index === 0;
        },
        /**
         * Tells if hero item with given index is the last hero item.
         * @param  {number}  index Index of the hero item.
         * @return {boolean}       If hero item is last in array.
         */
        isLastHeroItem( index: number ): boolean {
            return index === this.configuration.items.length - 1;
        },
        /* Removes hero item after Delete button is clicked
         * and triggers hero item's onChange to update it's configuration
         * @param index {number} - index of hero item to remove
         */
        deleteHeroItem( index: number ): void {
            const component: any = this;

            confirm( {
                content: $t( 'Are you sure you want to delete this item?' ),
                actions: {
                    confirm(): void {
                        component.configuration.items.splice( index, 1 );
                        component.onChange();
                    },
                },
            } );
        },
        /* Cleans configuration for M2C content constructor after Saving component
         * All empty hero items has to be removed to not get into configuration object
         */
        cleanupConfiguration(): void {
            const filteredArray: any = this.configuration.items.filter( ( item: any ): any => item.image !== '' );
            this.configuration.items = filteredArray;
            this.onChange();
        },
    },
    ready(): void {
        this.widgetSetListener();
    },
};

export default m2cHeroCarouselConfigurator;
