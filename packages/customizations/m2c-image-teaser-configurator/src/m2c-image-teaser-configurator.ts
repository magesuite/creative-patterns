import $ from 'jquery';
import $t from 'mage/translate';
import alert from 'Magento_Ui/js/modal/alert';
import confirm from 'Magento_Ui/js/modal/confirm';

import ccImageTeaserConfigurator from '../../../components/cc-image-teaser-configurator/src/cc-image-teaser-configurator';

// Pattern for teaser Item
const teaserItemPrototype: any = {
    image: '',
    decodedImage: '',
    displayVariant: '1',
    colorScheme: 'light',
    headline: '',
    subheadline: '',
    paragraph: '',
    ctaLabel: $t( 'More' ),
    href: '',
    sizeInfo: '',
    aspectRatio: '',
};

/**
 * M2C Image teaser component for admin panel.
 * This component is responsible for managing image teasers including image upload and widget chooser
 */
const m2cImageTeaserConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccImageTeaserConfigurator,
    ],
    template: `<div class="m2c-image-teaser-configurator {{ classes }} | {{ mix }}" {{ attributes }}>
        <section class="m2c-image-teaser-configurator__section">
            <h3 class="m2c-image-teaser-configurator__subtitle">Teaser Width</h3>
            <div class="m2c-image-teaser-configurator__scenario-options">
                <div
                    :class="{
                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.teaserWidth.id == optionId,
                        'm2c-image-teaser-configurator__option--disabled': option.disabled,
                    }"
                    class="m2c-image-teaser-configurator__option"
                    v-for="(optionId, option) in scenarioOptions.teaserWidth"
                    @click="!option.disabled && toggleOption('teaserWidth', optionId)">
                    <div class="m2c-image-teaser-configurator__option-wrapper">
                        <svg class="m2c-image-teaser-configurator__option-icon">
                            <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                        </svg>
                    </div>
                    <p class="m2c-image-teaser-configurator__option-name">
                        {{ option.name }}
                    </p>
                </div>
            </div>

        </section>
        <section class="m2c-image-teaser-configurator__section">
            <h3 class="m2c-image-teaser-configurator__subtitle">Desktop Layout</h3>
            <div class="m2c-image-teaser-configurator__scenario-options">
                <div
                    :class="{
                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.desktopLayout.id == optionId,
                        'm2c-image-teaser-configurator__option--disabled': option.disabled,
                    }"
                    class="m2c-image-teaser-configurator__option"
                    v-for="(optionId, option) in scenarioOptions.desktopLayout"
                    @click="!option.disabled && toggleOption('desktopLayout', optionId)">
                    <div class="m2c-image-teaser-configurator__option-wrapper">
                        <svg class="m2c-image-teaser-configurator__option-icon">
                            <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                        </svg>
                    </div>
                    <p class="m2c-image-teaser-configurator__option-name">
                        {{ option.name }}
                    </p>
                </div>
            </div>
        </section>
        <section class="m2c-image-teaser-configurator__section">
            <h3 class="m2c-image-teaser-configurator__subtitle">Text Positioning</h3>
            <div class="m2c-image-teaser-configurator__scenario-options">
                <div
                    :class="{
                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.textPositioning.id == optionId,
                        'm2c-image-teaser-configurator__option--disabled': option.disabled,
                    }"
                    class="m2c-image-teaser-configurator__option"
                    v-for="(optionId, option) in scenarioOptions.textPositioning"
                    @click="!option.disabled && toggleOption('textPositioning', optionId)">
                    <div class="m2c-image-teaser-configurator__option-wrapper">
                        <svg class="m2c-image-teaser-configurator__option-icon">
                            <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                        </svg>
                    </div>
                    <p class="m2c-image-teaser-configurator__option-name">
                        {{ option.name }}
                    </p>
                </div>
            </div>
        </section>
        <section class="m2c-image-teaser-configurator__section">
            <h3 class="m2c-image-teaser-configurator__subtitle">Mobile Layout</h3>
            <div class="m2c-image-teaser-configurator__scenario-options">
                <div
                    :class="{
                        'm2c-image-teaser-configurator__option--selected': configuration.currentScenario.mobileLayout.id == optionId,
                        'm2c-image-teaser-configurator__option--disabled': option.disabled,
                    }"
                    class="m2c-image-teaser-configurator__option"
                    v-for="(optionId, option) in scenarioOptions.mobileLayout"
                    @click="!option.disabled && toggleOption('mobileLayout', optionId)">
                    <div class="m2c-image-teaser-configurator__option-wrapper">
                        <svg class="m2c-image-teaser-configurator__option-icon">
                            <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                        </svg>
                    </div>
                    <p class="m2c-image-teaser-configurator__option-name">
                        {{ option.name }}
                    </p>
                </div>
            </div>
        </section>

        <section class="m2c-image-teaser-configurator__section">
            <cc-component-adder class="cc-component-adder cc-component-adder--static" v-show="!configuration.items.length">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-image-teaser-configurator__item-action-button" @click="createTeaserItem( 0 )">
                    <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                        <use v-bind="{ 'xlink:href': '#icon_plus' }"></use>
                    </svg>
                </button>
            </cc-component-adder>

            <template v-for="item in configuration.items">
                <div class="m2c-image-teaser-configurator__item" id="m2c-image-teaser-item-{{ $index }}">
                    <cc-component-adder class="cc-component-adder cc-component-adder--first" v-if="canAddTeaser()">
                        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | m2c-image-teaser-configurator__item-action-button" @click="createTeaserItem( $index )">
                            <svg class="action-button__icon action-button__icon--size_300">
                                <use xlink:href="#icon_plus"></use>
                            </svg>
                        </button>
                    </cc-component-adder>

                    <div class="m2c-image-teaser-configurator__item-content">
                        <div v-bind:class="[ 'm2c-image-teaser-configurator__item-col-left', configuration.items[$index].image ? 'm2c-image-teaser-configurator__item-col-left--look-image-uploaded' : '' ]">
                            <div class="m2c-image-teaser-configurator__item-image-wrapper">
                                <img :src="configuration.items[$index].image" class="m2c-image-teaser-configurator__item-image" v-show="configuration.items[$index].image">
                                <input type="hidden" v-model="configuration.items[$index].image">
                                <input type="hidden" class="m2c-image-teaser-configurator__image-url" id="image-teaser-img-{{$index}}">
                                <svg class="m2c-image-teaser-configurator__item-image-placeholder" v-show="!configuration.items[$index].image">
                                    <use xlink:href="#icon_image-placeholder"></use>
                                </svg>

                                <div class="m2c-image-teaser-configurator__item-actions">
                                    <cc-component-actions>
                                        <template slot="cc-component-actions__buttons">
                                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-image-teaser-configurator__item-action-button" @click="moveImageTeaserUp( $index )" :class="[ isFirstImageTeaser( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isFirstImageTeaser( $index )">
                                                <svg class="action-button__icon action-button__icon--size_100">
                                                    <use xlink:href="#icon_arrow-up"></use>
                                                </svg>
                                            </button>
                                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-image-teaser-configurator__item-action-button" @click="moveImageTeaserDown( $index )" :class="[ isLastImageTeaser( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isLastImageTeaser( $index )">
                                                <svg class="action-button__icon action-button__icon--size_100">
                                                    <use xlink:href="#icon_arrow-down"></use>
                                                </svg>
                                            </button>
                                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon | cc-component-actions__button cc-component-actions__button--upload-image | m2c-image-teaser-configurator__item-action-button" @click="getImageUploader( $index )">
                                                    <svg class="action-button__icon action-button__icon--size_100">
                                                        <use xlink:href="#icon_upload-image"></use>
                                                    </svg>
                                                    {{ configuration.items[$index].image ? imageUploadedText : noImageUploadedText }}
                                            </button>
                                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-image-teaser-configurator__item-action-button" @click="deleteTeaserItem( $index )">
                                                <svg class="action-button__icon">
                                                    <use xlink:href="#icon_trash-can"></use>
                                                </svg>
                                            </button>
                                        </template>
                                    </cc-component-actions>
                                </div>

                            </div>
                        </div>
                        <div class="m2c-image-teaser-configurator__item-col-right">
                            <div class="m2-input m2-input--group">
                                <div class="m2-input | m2c-image-teaser-configurator__item-form-element">
                                    <label for="cfg-it-item{{ $index }}-variant" class="m2-input__label">${$t( 'Display variant' )}:</label>
                                    <select name="cfg-it-item{{ $index }}-variant" class="m2-input__select" id="cfg-it-item{{ $index }}-variant" v-model="configuration.items[$index].displayVariant" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }">
                                        <template v-for="(idx, scenario) in ccConfig.imageTeasersContentPositions">
                                            <option value="{{ idx + 1 }}">${$t( '{{ scenario }}' )}</option>
                                        </template>
                                    </select>
                                </div>
                                <div class="m2-input | m2c-image-teaser-configurator__item-form-element">
                                    <label for="cfg-it-item{{ $index }}-color-scheme" class="m2-input__label">${$t( 'Text color scheme' )}:</label>
                                    <select name="cfg-it-item{{ $index }}-color-scheme" class="m2-input__select" id="cfg-it-item{{ $index }}-color-scheme" v-model="configuration.items[$index].colorScheme" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }">
                                        <option value="light">${$t( 'Light' )}</option>
                                        <option value="dark">${$t( 'Dark' )}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="m2-input | m2c-image-teaser-configurator__item-form-element">
                                <label for="cfg-hc-item{{ $index }}-headline" class="m2-input__label">${$t( 'Headline' )}:</label>
                                <input type="text" v-model="configuration.items[$index].headline" id="cfg-hc-item{{ $index }}-headline" class="m2-input__input">
                            </div>
                            <div class="m2-input | m2c-image-teaser-configurator__item-form-element">
                                <label for="cfg-hc-item{{ $index }}-subheadline" class="m2-input__label">${$t( 'Subheadline' )}:</label>
                                <input type="text" v-model="configuration.items[$index].subheadline" id="cfg-hc-item{{ $index }}-subheadline" class="m2-input__input">
                            </div>
                            <div class="m2-input | m2c-image-teaser-configurator__item-form-element">
                                <label for="cfg-hc-item{{ $index }}-paragraph" class="m2-input__label">${$t( 'Paragraph' )}:</label>
                                <textarea type="text" v-model="configuration.items[$index].paragraph" id="cfg-hc-item{{ $index }}-paragraph" class="m2-input__textarea" placeholder="(${$t( 'max 400 characters' )})" maxlength="400"></textarea>
                            </div>
                            <div class="m2-input m2-input--group">
                                <div class="m2-input | m2c-image-teaser-configurator__item-form-element">
                                    <label for="cfg-hc-item{{ $index }}-cta-label" class="m2-input__label">${$t( 'CTA label' )}:</label>
                                    <input type="text" v-model="configuration.items[$index].ctaLabel" id="cfg-hc-item{{ $index }}-cta-label" class="m2-input__input">
                                </div>
                                <div class="m2-input m2-input--type-addon | m2c-image-teaser-configurator__item-form-element">
                                    <label for="image-teaser-ctatarget-output-{{ $index }}" class="m2-input__label">${$t( 'CTA target link' )}:</label>
                                    <input type="text" class="m2-input__input | m2c-image-teaser-configurator__cta-target-link" v-model="configuration.items[$index].href" id="image-teaser-ctatarget-output-{{ $index }}">
                                    <span class="m2-input__addon | m2c-image-teaser-configurator__widget-chooser-trigger" @click="openCtaTargetModal( $index )">
                                        <svg class="m2-input__addon-icon">
                                            <use xlink:href="#icon_link"></use>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <cc-component-adder class="cc-component-adder cc-component-adder--last" v-if="configuration.items.length && canAddTeaser()">
                        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | m2c-image-teaser-configurator__item-action-button" @click="createTeaserItem( $index + 1 )">
                            <svg class="action-button__icon action-button__icon--size_300">
                                <use xlink:href="#icon_plus"></use>
                            </svg>
                        </button>
                    </cc-component-adder>
                </div>
            </template>
        </section>
    </div>`,
    props: {
        /**
         * Image teaser configuration
         */
        configuration: {
            type: Object,
            default(): Object {
                return {
                    items: [ JSON.parse( JSON.stringify( teaserItemPrototype ) ) ],
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
        /* Obtain admin url */
        adminPrefix: {
            type: String,
            default: 'admin',
        },
        /* Obtain content-constructor's config file */
        ccConfig: {
            type: Object,
            default(): any {
                return {};
            },
        },
    },
    data(): any {
        return {
            imageUploadedText: $t( 'Change' ),
            noImageUploadedText: $t( 'Upload' ),
        };
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            //this.cleanupConfiguration();
            this.onSave();
        },
    },
    methods: {
        /* Opens M2's built-in image manager modal.
         * Manages all images: image upload from hdd, select image that was already uploaded to server.
         * @param index {number} - index of image of image teaser.
         */
        getImageUploader( index: number ): void {
            MediabrowserUtility.openDialog( `${this.uploaderBaseUrl}target_element_id/image-teaser-img-${index}/`,
                'auto',
                'auto',
                $t( 'Insert File...' ),
                {
                    closed: true,
                },
            );
        },

        /* Listener for image uploader
         * Since Magento does not provide any callback after image has been chosen
         * we have to watch for target where decoded url is placed
         */
        imageUploadListener(): void {
            const component: any = this;
            let isAlreadyCalled: boolean = false;

            // jQuery has to be used, for some reason native addEventListener doesn't catch change of input's value
            $( document ).on( 'change', '.m2c-image-teaser-configurator__image-url', ( event: Event ): void => {
                if ( !isAlreadyCalled ) {
                    isAlreadyCalled = true;
                    component.onImageUploaded( event.target );
                    setTimeout( (): void => {
                        isAlreadyCalled = false;
                    }, 100 );
                }
            } );
        },

        /* Action after image was uploaded
         * URL is encoded, so strip it and decode Base64 to get {{ media url="..."}} format
         * which will go to the items.image and will be used to display image on front end
         * @param input { object } - input with raw image path which is used in admin panel
         */
        onImageUploaded( input: any ): void {
            const _this: any = this;
            const itemIndex: any = input.id.substr( input.id.lastIndexOf('-') + 1 );
            const encodedImage: any = input.value.match( '___directive\/([a-zA-Z0-9]*)' )[ 1 ];
            const imgEndpoint: string = this.imageEndpoint.replace( '{/encoded_image}', encodedImage );

            this.configuration.items[ itemIndex ].decodedImage = Base64 ? Base64.decode( encodedImage ) : window.atob( encodedImage );

            const img: any = new Image();
            img.onload = function(): void {
                const ar: string = _this.getAspectRatio( img.naturalWidth, img.naturalHeight );
                _this.configuration.items[ itemIndex ].image = img.getAttribute( 'src' );
                _this.configuration.items[ itemIndex ].sizeInfo = `${img.naturalWidth}x${img.naturalHeight}px (${ar})`;
                _this.configuration.items[ itemIndex ].aspectRatio = ar;

                setTimeout( (): void => {
                    _this.checkImageSizes();
                    _this.onChange();
                }, 400 );
            };
            img.src = imgEndpoint;
        },

        /* Creates another teaser item using teaserItemPrototype */
        createTeaserItem( index: number ): void {
            this.configuration.items.splice( index, 0, JSON.parse( JSON.stringify( teaserItemPrototype ) ) );
            this.onChange();
        },

        /**
         * Moves image teaser item under given index up by swaping it with previous element.
         * @param {number} index Image teaser's index in array.
         */
        moveImageTeaserUp( index: number ): void {
            const _this: any = this;

            if ( index > 0 ) {
                const $thisItem: any = $( `#m2c-image-teaser-item-${ index }` );
                const $prevItem: any = $( `#m2c-image-teaser-item-${ index - 1 }` );

                $thisItem.addClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', `translateY( ${ -Math.abs( $prevItem.outerHeight( true ) ) }px )` );
                $prevItem.addClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', `translateY( ${ $thisItem.outerHeight( true ) }px )` );

                setTimeout( (): void => {
                    _this.configuration.items.splice( index - 1, 0, _this.configuration.items.splice( index, 1 )[ 0 ] );
                    _this.onChange();
                    $thisItem.removeClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', '' );
                    $prevItem.removeClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', '' );
                }, 400 );
            }
        },
        /**
         * Moves image teaser item under given index down by swaping it with next element.
         * @param {number} index Image teaser's index in array.
         */
        moveImageTeaserDown( index: number ): void {
            const _this: any = this;

            if ( index < this.configuration.items.length - 1 ) {
                const $thisItem: any = $( `#m2c-image-teaser-item-${ index }` );
                const $nextItem: any = $( `#m2c-image-teaser-item-${ index + 1 }` );

                $thisItem.addClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', `translateY( ${ $nextItem.outerHeight( true ) }px )` );
                $nextItem.addClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', `translateY( ${ -Math.abs( $thisItem.outerHeight( true ) ) }px )` );

                setTimeout( (): void => {
                    _this.configuration.items.splice( index + 1, 0, _this.configuration.items.splice( index, 1 )[ 0 ] );
                    _this.onChange();
                    $thisItem.removeClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', '' );
                    $nextItem.removeClass( 'm2c-image-teaser-configurator__item--animating' ).css( 'transform', '' );
                }, 400 );
            }
        },
        /**
         * Tells if item with given index is the first image teaser.
         * @param  {number}  index Index of the image teaser.
         * @return {boolean}       If image teaser is first in array.
         */
        isFirstImageTeaser( index: number ): boolean {
            return index === 0;
        },
        /**
         * Tells if image teaser with given index is the last image teaser.
         * @param  {number}  index Index of the image teaser.
         * @return {boolean}       If image teaser is last in array.
         */
        isLastImageTeaser( index: number ): boolean {
            return index === this.configuration.items.length - 1;
        },

        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal( index: number ): void {
            widgetTools.openDialog( `${window.location.origin}/${this.adminPrefix}/admin/widget/index/filter_widgets/Link/widget_target_id/image-teaser-ctatarget-output-${index}` );

            this.wWidgetListener( index );
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.ctaTarget is changed
         */
        widgetSetListener(): void {
            const component: any = this;

            $( '.m2c-image-teaser-configurator__cta-target-link' ).on( 'change', (): void => {
                component.onChange();
            } );
        },
        /*
         * Check if widget chooser is loaded. If not, wait for it, if yes:
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         * @param {number} index Hero item's index in array.
         */
        wWidgetListener( itemIndex: number ): void {
            if ( typeof wWidget !== 'undefined' && widgetTools.dialogWindow[ 0 ].innerHTML !== '' ) {
                const _this: any = this;
                const button: any = widgetTools.dialogWindow[ 0 ].querySelector( '#insert_button' );

                button.onclick = null;
                button.addEventListener( 'click', function(): void {
                    _this.configuration.items[ itemIndex ].href = '';
                    wWidget.insertWidget();
                } );
            } else {
                window.setTimeout( (): void => {
                    this.wWidgetListener( itemIndex );
                }, 300 );
            }
        },

        /* Checks if it's possible to display Delete button
         * This function is used in component's template
         * Button can be displayed only on items that have item uploaded
         * @param index {number} - index of teaser item
         * @returns Boolean
         */
        isPossibleToDelete( index: number ): Boolean {
            if ( ( index !== 0 || this.configuration.items.length > 1 ) && this.configuration.items[ index ].image !== '' ) {
                return true;
            }

            return false;
        },

        /* Removes teaser item after Delete button is clicked
         * and triggers component's onChange to update it's configuration
         * @param index {number} - index of teaser item to remove
         */
        deleteTeaserItem( index: number ): void {
            const component: any = this;

            confirm( {
                content: $t( 'Are you sure you want to delete this item?' ),
                actions: {
                    confirm(): void {
                        component.configuration.items.splice( index, 1 );
                        component.onChange();
                    }
                },
            } );
        },

        /* Checks if images are all the same size
         * If not - displays error by firing up this.displayImageSizeMismatchError()
         * @param images {array} - array of all uploaded images
         */
        checkImageSizes(): boolean {
            const itemsToCheck = JSON.parse( JSON.stringify( this.configuration.items ) ).filter( ( item: any ): boolean => {
                return Boolean( item.aspectRatio ); // Filter out items without aspect ratio set yet.
            } );
            for ( let i: number = 0; i < itemsToCheck.length; i++ ) {
                if ( itemsToCheck[ i ].aspectRatio !== itemsToCheck[ 0 ].aspectRatio ) {
                    alert( {
                        title: $t( 'Warning' ),
                        content: $t( 'Images you have uploaded have different aspect ratio. This may cause this component to display wrong. We recommend to keep the same aspect ratio for all uploaded images.' ),
                    } );
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
        getGreatestCommonDivisor( a: number, b: number ): number {
            if ( !b ) {
                return a;
            }

            return this.getGreatestCommonDivisor( b, a % b );
        },
        /* Returns Aspect ratio for 2 numbers based on GDC algoritm (greatest common divisor)
         * @param a {number}
         * @param b {number}
         * @return {number} - greatest common divisor
         */
        getAspectRatio( a: number, b: number ): string {
            let c: number = this.getGreatestCommonDivisor( a, b );

            return `${( a / c )}:${( b / c )}`;
        },
        /* Cleans configuration for M2C content constructor after Saving component
         * All empty teaser items has to be removed to not get into configuration object
         */
        cleanupConfiguration(): void {
            this.configuration.items = this.configuration.items.filter( ( item: any ): any => item.image !== '' );
            this.configuration.ignoredItems = this.configuration.ignoredItems.filter( ( item: any ): any => item.image !== '' );
            this.onChange();
        },
    },
    ready(): void {
        this.imageUploadListener();
        this.widgetSetListener();
    },
};

export default m2cImageTeaserConfigurator;
