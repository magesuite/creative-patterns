import $ from 'jquery';
import $t from 'mage/translate';

import ccCategoryPicker from '../../../components/cc-category-picker/src/cc-category-picker';
import ccProductsGridConfigurator from '../../../components/cc-products-grid-configurator/src/cc-products-grid-configurator';

/**
 * Product grid configurator component.
 * This component is responsible for displaying products grid  configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const m2cProductsGridConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccProductsGridConfigurator,
    ],
    template: `<div class="m2c-products-grid-configurator {{ classes }} | {{ mix }}" {{ attributes }}>
        <section class="m2c-products-grid-configurator__section">
            <h3 class="m2c-products-grid-configurator__subtitle">${$t( 'Data source' )}:</h3>
            <div class="m2c-products-grid-configurator__scenario-options m2c-products-grid-configurator__scenario-options--inputs">
                <div class="m2-input m2-input--type-inline | m2c-products-grid-configurator__section-option">
                    <label for="cfg-pg-category" class="m2-input__label | m2c-products-grid-configurator__section-option-label">${$t( 'Category ID' )}:</label>
                    <select class="m2-input__select tmp-select" style="width:25em">
                        <option>${$t( 'Select...' )}</option>
                    </select>
                    <input type="hidden" name="cfg-pg-category-select" class="m2-input__input | m2c-products-grid-configurator__form-input" id="cfg-pg-category" v-model="configuration.category_id" @change="onChange">
                </div>
                <div class="m2-input m2-input--type-inline | m2c-products-grid-configurator__section-option">
                    <label for="cfg-pg-order-by" class="m2-input__label | m2c-products-grid-configurator__section-option-label">${$t( 'Order by' )}:</label>
                    <select name="cfg-pg-order-by" class="m2-input__select" id="cfg-pg-order-by" v-model="configuration.order_by" @change="onChange">
                        <option value="creation_date">${$t( 'Creation date' )}</option>
                        <option value="price">${$t( 'Price' )}</option>
                    </select>
                    <select name="cfg-pg-order-type" class="m2-input__select" v-model="configuration.order_type" @change="onChange">
                        <option value="ASC">${$t( 'Ascending' )}</option>
                        <option value="DESC">${$t( 'Descending' )}</option>
                    </select>
                </div>
            </div>
        </section>

        <section class="m2c-products-grid-configurator__section">
            <h3 class="m2c-products-grid-configurator__subtitle">${$t( 'Mobile Layout' )}:</h3>
            <div class="m2c-products-grid-configurator__scenario-options">
                <ul class="m2c-products-grid-configurator__scenario-options-list">
                    <li
                        :class="{
                            'm2c-products-grid-configurator__option--selected': configuration.rows_mobile == optionId,
                        }"
                        class="m2c-products-grid-configurator__option"
                        v-for="(optionId, option) in scenarioOptions.rows_mobile"
                        @click="setOption('rows_mobile', optionId)">
                        <div class="m2c-products-grid-configurator__option-wrapper">
                            <svg class="m2c-products-grid-configurator__option-icon">
                                <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                            </svg>
                        </div>
                        <p class="m2c-products-grid-configurator__option-name">
                            {{ option.name }}
                        </p>
                    </li>
                </ul>
            </div>
        </section>

        <section class="m2c-products-grid-configurator__section">
            <h3 class="m2c-products-grid-configurator__subtitle">${$t( 'Tablet Layout' )}:</h3>
            <div class="m2c-products-grid-configurator__scenario-options">
                <ul class="m2c-products-grid-configurator__scenario-options-list">
                    <li
                        :class="{
                            'm2c-products-grid-configurator__option--selected': configuration.rows_tablet == optionId,
                        }"
                        class="m2c-products-grid-configurator__option"
                        v-for="(optionId, option) in scenarioOptions.rows_tablet"
                        @click="setOption('rows_tablet', optionId)">
                        <div class="m2c-products-grid-configurator__option-wrapper">
                            <svg class="m2c-products-grid-configurator__option-icon">
                                <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                            </svg>
                        </div>
                        <p class="m2c-products-grid-configurator__option-name">
                            {{ option.name }}
                        </p>
                    </li>
                </ul>
            </div>
        </section>

        <section class="m2c-products-grid-configurator__section">
            <h3 class="m2c-products-grid-configurator__subtitle">${$t( 'Desktop Layout' )}:</h3>
            <div class="m2c-products-grid-configurator__scenario-options">
                <ul class="m2c-products-grid-configurator__scenario-options-list">
                    <li
                        :class="{
                            'm2c-products-grid-configurator__option--selected': configuration.rows_desktop == optionId,
                        }"
                        class="m2c-products-grid-configurator__option"
                        v-for="(optionId, option) in scenarioOptions.rows_desktop"
                        @click="setOption('rows_desktop', optionId)">
                        <div class="m2c-products-grid-configurator__option-wrapper">
                            <svg class="m2c-products-grid-configurator__option-icon">
                                <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                            </svg>
                        </div>
                        <p class="m2c-products-grid-configurator__option-name">
                            {{ option.name }}
                        </p>
                    </li>
                </ul>
            </div>
        </section>

        <section class="m2c-products-grid-configurator__section">
            <h3 class="m2c-products-grid-configurator__subtitle">${$t( 'Hero Teaser' )}:</h3>
            <div class="m2c-products-grid-configurator__scenario-options">
                <ul class="m2c-products-grid-configurator__scenario-options-list">
                    <li
                        :class="{
                            'm2c-products-grid-configurator__option--selected': configuration.hero.position == optionId,
                        }"
                        class="m2c-products-grid-configurator__option"
                        v-for="(optionId, option) in scenarioOptions.hero.position"
                        @click="setOption('hero', optionId, 'position')">
                        <div class="m2c-products-grid-configurator__option-wrapper">
                            <svg class="m2c-products-grid-configurator__option-icon">
                                <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                            </svg>
                        </div>
                        <p class="m2c-products-grid-configurator__option-name">
                            {{ option.name }}
                        </p>
                    </li>
                </ul>
            </div>
        </section>

        <div class="m2c-products-grid-configurator__item" v-show="configuration.hero.position">
            <div class="m2c-hero-carousel-configurator__item-content">
                <div v-bind:class="[ 'm2c-products-grid-configurator__item-col-left', configuration.hero.image.src ? 'm2c-products-grid-configurator__item-col-left--look-image-uploaded' : '' ]">
                    <div class="m2c-products-grid-configurator__item-image-wrapper">
                        <img :src="configuration.hero.image.src" class="m2c-image-teaser-configurator__item-image" v-show="configuration.hero.image.src">
                        <input type="hidden" v-model="configuration.hero.image.src">
                        <input type="hidden" class="m2c-products-grid-configurator__image-url" id="products-grid-img">
                        <svg class="m2c-products-grid-configurator__item-image-placeholder" v-show="!configuration.hero.image.src">
                            <use xlink:href="#icon_image-placeholder"></use>
                        </svg>

                        <div class="m2c-products-grid-configurator__item-actions">
                            <cc-component-actions>
                                <template slot="cc-component-actions__buttons">
                                    <button is="action-button" class="action-button action-button--look_default action-button--type_icon | cc-component-actions__button cc-component-actions__button--upload-image | m2c-products-grid-configurator__item-action-button" @click="getImageUploader()">
                                            <svg class="action-button__icon action-button__icon--size_100">
                                                <use xlink:href="#icon_upload-image"></use>
                                            </svg>
                                            {{ configuration.hero.image.src ? imageUploadedText : noImageUploadedText }}
                                    </button>
                                </template>
                            </cc-component-actions>
                        </div>
                    </div>
                </div>

                <div class="m2c-products-grid-configurator__item-col-right">
                    <div class="m2-input | m2c-products-grid-configurator__item-form-element">
                        <label for="cfg-pg-hero_headline" class="m2-input__label">${$t( 'Headline' )}:</label>
                        <input type="text" name="cfg-pg-hero_headline" class="m2-input__input" id="cfg-pg-hero_headline" v-model="configuration.hero.headline" @change="onChange">
                    </div>
                    <div class="m2-input | m2c-products-grid-configurator__item-form-element">
                        <label for="cfg-pg-hero_subheadline" class="m2-input__label">${$t( 'Subheadline' )}:</label>
                        <input type="text" name="cfg-pg-hero_subheadline" class="m2-input__input" id="cfg-pg-hero_subheadline" v-model="configuration.hero.subheadline" @change="onChange">
                    </div>
                    <div class="m2-input | m2c-products-grid-configurator__item-form-element">
                        <label for="cfg-pg-hero_paragraph" class="m2-input__label | m2c-products-grid-configurator__form-label--textarea">${$t( 'Paragraph' )}:</label>
                        <textarea type="text" name="cfg-pg-hero_paragraph" class="m2-input__textarea" id="cfg-pg-hero_paragraph" placeholder="${$t( '(max 200 characters)' )}" maxlength="200" v-model="configuration.hero.paragraph"></textarea>
                    </div>
                    <div class="m2-input m2-input--group">
                        <div class="m2-input | m2c-products-grid-configurator__item-form-element">
                            <label for="cfg-pg-hero_button_label" class="m2-input__label">${$t( 'Button label' )}:</label>
                            <input type="text" name="cfg-pg-hero_button_label" class="m2-input__input" id="cfg-pg-hero_button_label" v-model="configuration.hero.button.label" @change="onChange">
                        </div>
                        <div class="m2-input m2-input--type-addon | m2c-products-grid-configurator__item-form-element">
                            <label for="cfg-pg-hero_url" class="m2-input__label">${$t( 'Url' )}:</label>
                            <input type="text" name="cfg-pg-hero_url" class="m2-input__input | m2c-products-grid__hero-url" id="cfg-pg-hero_url" v-model="configuration.hero.href">
                            <span class="m2-input__addon | m2c-products-grid-configurator__widget-chooser-trigger" @click="openCtaTargetModal()">
                                <svg class="m2-input__addon-icon">
                                    <use xlink:href="#icon_link"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'ASC',
                    rows_desktop: 2,
                    rows_tablet: 2,
                    rows_mobile: 2,
                    hero: {
                        position: '',
                        image: {
                            src: '',
                            alt: '',
                        },
                        headline: '',
                        subheadline: '',
                        paragraph: '',
                        href: '',
                        button: {
                            label: '',
                        },
                        decoded_image: '',
                        size_info: '',
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
        /* Obtain endpoint for getting categories data for category picker */
        categoriesDataUrl: {
            type: String,
            default: '',
        },
    },
    data(): Object {
        return {
            imageUploadedText: $t( 'Change' ),
            noImageUploadedText: $t( 'Upload' ),
            categoryPicker: undefined,
            scenarioOptions: {
                rows_mobile: {
                    2: {
                        name:  $t( '2 rows of products' ),
                        iconId: 'pr_2',
                    },
                    3: {
                        name:  $t( '3 rows of products' ),
                        iconId: 'pr_3',
                    },
                    4: {
                        name:  $t( '4 rows of products' ),
                        iconId: 'pr_4',
                    },
                },
                rows_tablet: {
                    2: {
                        name:  $t( '2 rows of products' ),
                        iconId: 'pr_2',
                    },
                    3: {
                        name:  $t( '3 rows of products' ),
                        iconId: 'pr_3',
                    },
                    4: {
                        name:  $t( '4 rows of products' ),
                        iconId: 'pr_4',
                    },
                },
                rows_desktop: {
                    2: {
                        name:  $t( '2 rows of products' ),
                        iconId: 'pr_2',
                    },
                    3: {
                        name:  $t( '3 rows of products' ),
                        iconId: 'pr_3',
                    },
                    4: {
                        name:  $t( '4 rows of products' ),
                        iconId: 'pr_4',
                    },
                },
                hero: {
                    position: {
                        '': {
                            name:  $t( 'No Hero Teaser' ),
                            iconId: 'no_teaser',
                        },
                        'left': {
                            name:  $t( 'Hero Teaser on the left' ),
                            iconId: 'teaser_left',
                        },
                        'right': {
                            name:  $t( 'Hero Teaser on the right' ),
                            iconId: 'teaser_right',
                        }
                    }
                },
            },
        };
    },
    methods: {
        setOption( optionCategory: string, optionId: string, key?: string ): void {
            //this.configuration[ optionCategory ] = this.scenarioOptions[ optionCategory ][ optionId ];
            if ( key ) {
                this.configuration[ optionCategory ][ key ] = optionId;
            } else {
                this.configuration[ optionCategory ] = optionId;
            }
        },
        /* Opens M2's built-in image manager modal.
         * Manages all images: image upload from hdd, select image that was already uploaded to server.
         * @param index {number} - index of image of image teaser.
         */
        getImageUploader( index: number ): void {
            MediabrowserUtility.openDialog( `${this.uploaderBaseUrl}target_element_id/products-grid-img/`,
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
            $( document ).on( 'change', '.m2c-products-grid-configurator__image-url', ( event: Event ): void => {
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
            // const itemIndex: any = input.id.substr( input.id.length - 1 );
            const encodedImage: any = input.value.match( '___directive\/([a-zA-Z0-9]*)' )[ 1 ];
            const imgEndpoint: string = this.imageEndpoint.replace( '{/encoded_image}', encodedImage );

            this.configuration.hero.decoded_image = Base64 ? Base64.decode( encodedImage ) : window.atob( encodedImage );

            const img: any = new Image();
            img.onload = function(): void {
                const ar: string = _this.getAspectRatio( img.naturalWidth, img.naturalHeight );
                _this.configuration.hero.image.src = img.getAttribute( 'src' );
                _this.configuration.hero.size_info = `${img.naturalWidth}x${img.naturalHeight}px (${ar})`;
                _this.onChange();
            };
            img.src = imgEndpoint;
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
            const c: number = this.getGreatestCommonDivisor( a, b );

            return `${( a / c )}:${( b / c )}`;
        },

        /*
         * Opens modal with M2 built-in widget chooser
         */
        openCtaTargetModal(): void {
            widgetTools.openDialog( `${window.location.origin}/admin/admin/widget/index/widget_target_id/cfg-pg-hero_url` );

            this.wWidgetListener();
        },

        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.ctaTarget is changed
         */
        widgetSetListener(): void {
            const component: any = this;

            $( '.m2c-products-grid__hero-url' ).on( 'change', (): void => {
                component.onChange();
            } );
        },

        /*
         * Check if widget chooser is loaded. If not, wait for it
         */
        wWidgetListener(): void {
            if ( typeof wWidget !== 'undefined' && widgetTools.dialogWindow[ 0 ].innerHTML !== '' ) {
                this.disableNotLinksOptions();
                this.setWidgetEvents();
            } else {
                setTimeout( this.wWidgetListener, 300 );
            }
        },
        /*
         * Override default onClick for "Insert Widget" button in widget's modal window
         * to clear input's value before inserting new one
         */
        setWidgetEvents(): void {
            const _this: any = this;
            const button: any = widgetTools.dialogWindow[ 0 ].querySelector( '#insert_button' );

            button.onclick = null;
            button.addEventListener( 'click', function(): void {
                _this.configuration.hero.href = '';
                wWidget.insertWidget();
            } );
        },
        /*
         * Hide all options in widget chooser that are not links
         */
        disableNotLinksOptions(): void {
            if ( wWidget.widgetEl && wWidget.widgetEl.options ) {
                $( wWidget.widgetEl.options ).each( function( i: boolean, el: any ): void {
                    if ( el.value.split( '\\' ).pop() !== 'Link' && i !== 0 ) {
                        $( el ).hide();
                    }
                } );
            }
        },
    },
    ready(): void {
        const _this: any = this;

        // Show loader
        $( 'body' ).trigger( 'showLoadingPopup' );

        // Get categories JSON with AJAX
        this.$http.get( this.categoriesDataUrl ).then( ( response: any ): void => {
            _this.categoryPicker = new ccCategoryPicker( $( '#cfg-pg-category' ), JSON.parse( response.body ), {
                multiple: false,
            } );

            // Hide loader
            $( 'body' ).trigger( 'hideLoadingPopup' );
            $( '.tmp-select' ).remove();
        } );

        this.imageUploadListener();
        this.widgetSetListener();
    },
};

export default m2cProductsGridConfigurator;
