import ccMagentoProductGridTeasersConfigurator from '../../../components/cc-magento-product-grid-teasers-configurator/src/cc-magento-product-grid-teasers-configurator';

import $ from 'jquery';
import $t from 'mage/translate';
import alert from 'Magento_Ui/js/modal/alert';
import confirm from 'Magento_Ui/js/modal/confirm';

// Pattern for teaser Item
const teaserDataPattern: any = {
    sizeSelect: '2x1',
    size: {
        x: 2,
        y: 1
    },
    position: 'left',
    row: 1,
    isAvailableForMobile: 1,
    image: '',
    decodedImage: '',
    displayVariant: 'variant-1',
    colorScheme: 'light',
    headline: '',
    subheadline: '',
    paragraph: '',
    ctaLabel: $t( 'Check offer' ),
    href: '',
};

/**
 * M2C skin for magento product grid teasers configurator component.
 * This component will be responsible for configuration of image teasers inside native products grid on M2 category pages
 * @type {vuejs.ComponentOption} Vue component object.
 */
const m2cMagentoProductGridTeasersConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccMagentoProductGridTeasersConfigurator,
    ],
    template: `<div class="m2c-magento-product-grid-teasers-configurator | {{ class }}">
        <cc-component-adder class="cc-component-adder cc-component-adder--static" v-show="!configuration.teasers.length">
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-magento-product-grid-teasers-configurator__item-action-button" @click="createNewTeaser( 0 )">
                <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                    <use xlink:href="#icon_plus"></use>
                </svg>
            </button>
        </cc-component-adder>

        <template v-for="item in configuration.teasers">
            <div class="m2c-magento-product-grid-teasers-configurator__item" id="m2c-magento-pg-teaser-{{ $index }}">
                <cc-component-adder class="cc-component-adder cc-component-adder--first">
                    <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-magento-product-grid-teasers-configurator__item-action-button" @click="createNewTeaser( $index )">
                        <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                            <use xlink:href="#icon_plus"></use>
                        </svg>
                    </button>
                </cc-component-adder>

                <div class="m2c-magento-product-grid-teasers-configurator__item-content">
                    <div v-bind:class="[ 'm2c-magento-product-grid-teasers-configurator__item-col-left', configuration.teasers[$index].image ? 'm2c-magento-product-grid-teasers-configurator__item-col-left--look-image-uploaded' : '' ]">
                        <div class="m2c-magento-product-grid-teasers-configurator__item-image-wrapper">
                            <img :src="configuration.teasers[$index].image" class="m2c-magento-product-grid-teasers-configurator__item-image" v-show="configuration.teasers[$index].image">
                            <input type="hidden" v-model="configuration.teasers[$index].image">
                            <input type="hidden" class="m2c-magento-product-grid-teasers-configurator__image-url" id="mpg-teaser-img-{{$index}}">
                            <svg class="m2c-magento-product-grid-teasers-configurator__item-image-placeholder" v-show="!configuration.teasers[$index].image">
                                <use xlink:href="#icon_image-placeholder"></use>
                            </svg>

                            <div class="m2c-magento-product-grid-teasers-configurator__item-actions">
                                <cc-component-actions>
                                    <template slot="cc-component-actions__buttons">
                                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-magento-product-grid-teasers-configurator__item-action-button" @click="moveHeroItemUp( $index )" :class="[ isFirstTeaser( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isFirstTeaser( $index )">
                                            <svg class="action-button__icon action-button__icon--size_100">
                                                <use xlink:href="#icon_arrow-up"></use>
                                            </svg>
                                        </button>
                                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-magento-product-grid-teasers-configurator__item-action-button" @click="moveHeroItemDown( $index )" :class="[ isLastTeaser( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isLastTeaser( $index )">
                                            <svg class="action-button__icon action-button__icon--size_100">
                                                <use xlink:href="#icon_arrow-down"></use>
                                            </svg>
                                        </button>
                                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon | cc-component-actions__button cc-component-actions__button--upload-image | m2c-magento-product-grid-teasers-configurator__item-action-button" @click="getImageUploader( $index )">
                                                <svg class="action-button__icon action-button__icon--size_100">
                                                    <use xlink:href="#icon_upload-image"></use>
                                                </svg>
                                                {{ configuration.teasers[$index].image ? imageUploadedText : noImageUploadedText }}
                                        </button>
                                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-magento-product-grid-teasers-configurator__item-action-button" @click="deleteTeaser( $index )">
                                            <svg class="action-button__icon">
                                                <use xlink:href="#icon_trash-can"></use>
                                            </svg>
                                        </button>
                                    </template>
                                </cc-component-actions>
                            </div>
                        </div>
                    </div>
                    <div class="m2c-magento-product-grid-teasers-configurator__item-col-right">
                        <div class="m2-input m2-input--group m2-input--group-quarter">
                            <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="cfg-mpg-teaser{{ $index }}-size-select" class="m2-input__label">${$t( 'Teaser size' )}:</label>
                                <select name="cfg-mpg-teaser{{ $index }}-size-select" class="m2-input__select | m2c-magento-product-grid-teasers-configurator__select" id="cfg-mpg-teaser{{ $index }}-size-select" v-model="configuration.teasers[$index].sizeSelect" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }" @change="setTeaserSize($index)">
                                    <option value="1x1">${$t( '1x1' )}</option>
                                    <option value="1x2">${$t( '1x2' )}</option>
                                    <option value="2x1">${$t( '2x1' )}</option>
                                    <option value="2x2">${$t( '2x2' )}</option>
                                </select>
                            </div>
                            <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="cfg-mpg-teaser{{ $index }}-position" class="m2-input__label">${$t( 'Position' )}:</label>
                                <select name="cfg-mpg-teaser{{ $index }}-position" class="m2-input__select | m2c-magento-product-grid-teasers-configurator__select" id="cfg-mpg-teaser{{ $index }}-position" v-model="configuration.teasers[$index].position" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }">
                                    <option value="left">${$t( 'Left' )}</option>
                                    <option value="center">${$t( 'Center' )}</option>
                                    <option value="right">${$t( 'Right' )}</option>
                                </select>
                            </div>
                            <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="cfg-mpg-teaser{{ $index }}-row" class="m2-input__label">${$t( 'Row' )}:</label>
                                <select name="cfg-mpg-teaser{{ $index }}-row" class="m2-input__select | m2c-magento-product-grid-teasers-configurator__select" id="cfg-mpg-teaser{{ $index }}-row" v-model="configuration.teasers[$index].row" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }">
                                    <option v-for="i in rowsCount" value="{{ i + 1 }}">{{ i + 1 }}</option>
                                    <option value="1000">${$t( 'as last' )}</option>
                                </select>
                            </div>
                            <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="cfg-mpg-teaser{{ $index }}-mobile" class="m2-input__label">${$t( 'Show in mobiles' )}:</label>
                                <div class="admin__actions-switch" data-role="switcher">
                                    <input type="checkbox" class="admin__actions-switch-checkbox" id="cfg-mpg-teaser{{ $index }}-mobile" name="cfg-mpg-teaser{{ $index }}-mobile" v-model="configuration.teasers[$index].isAvailableForMobile">
                                    <label class="admin__actions-switch-label" for="cfg-mpg-teaser{{ $index }}-mobile"">
                                        <span class="admin__actions-switch-text" data-text-on="${$t( 'Yes' )}" data-text-off="${$t( 'No' )}"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="m2-input m2-input--group">
                            <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="cfg-mpg-teaser{{ $index }}-variant" class="m2-input__label">${$t( 'Display variant' )}:</label>
                                <select name="cfg-mpg-teaser{{ $index }}-variant" class="m2-input__select | m2c-magento-product-grid-teasers-configurator__select" id="cfg-mpg-teaser{{ $index }}-variant" v-model="configuration.teasers[$index].displayVariant" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }">
                                    <template v-for="(idx, scenario) in ccConfig.imageTeasersContentPositions">
                                        <option value="variant-{{ idx + 1 }}">${$t( '{{ scenario }}' )}</option>
                                    </template>
                                </select>
                            </div>
                            <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="cfg-mpg-teaser{{ $index }}-color-scheme" class="m2-input__label">${$t( 'Text color scheme' )}:</label>
                                <select name="cfg-mpg-teaser{{ $index }}-color-scheme" class="m2-input__select | m2c-magento-product-grid-teasers-configurator__select" id="cfg-mpg-teaser{{ $index }}-color-scheme" v-model="configuration.teasers[$index].colorScheme" v-bind="{ 'style': 'background-image: url( ' + assetsSrc + 'images/dropdown-arrows-bg.svg ), linear-gradient( #e3e3e3, #e3e3e3 ), linear-gradient( #adadad, #adadad )' }">
                                    <option value="light">${$t( 'Light' )}</option>
                                    <option value="dark">${$t( 'Dark' )}</option>
                                </select>
                            </div>
                        </div>
                        <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                            <label for="cfg-mpg-teaser{{ $index }}-headline" class="m2-input__label">${$t( 'Headline' )}:</label>
                            <input type="text" v-model="configuration.teasers[$index].headline" id="cfg-mpg-teaser{{ $index }}-headline" class="m2-input__input">
                        </div>
                        <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                            <label for="cfg-mpg-teaser{{ $index }}-subheadline" class="m2-input__label">${$t( 'Subheadline' )}:</label>
                            <input type="text" v-model="configuration.teasers[$index].subheadline" id="cfg-mpg-teaser{{ $index }}-subheadline" class="m2-input__input">
                        </div>
                        <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                            <label for="cfg-mpg-teaser{{ $index }}-paragraph" class="m2-input__label">${$t( 'Paragraph' )}:</label>
                            <textarea type="text" v-model="configuration.teasers[$index].paragraph" id="cfg-mpg-teaser{{ $index }}-paragraph" class="m2-input__textarea" placeholder="(${$t( 'max 200 characters' )})" maxlength="200"></textarea>
                        </div>
                        <div class="m2-input m2-input--group">
                            <div class="m2-input | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="cfg-mpg-teaser{{ $index }}-cta-label" class="m2-input__label">${$t( 'CTA label' )}:</label>
                                <input type="text" v-model="configuration.teasers[$index].ctaLabel" id="cfg-mpg-teaser{{ $index }}-cta-label" class="m2-input__input">
                            </div>
                            <div class="m2-input m2-input--type-addon | m2c-magento-product-grid-teasers-configurator__item-form-element">
                                <label for="teaser-ctatarget-output-{{ $index }}" class="m2-input__label">${$t( 'CTA target link' )}:</label>
                                <input type="text" class="m2-input__input | m2c-magento-product-grid-teasers-configurator__cta-target-link" v-model="configuration.teasers[$index].href" id="teaser-ctatarget-output-{{ $index }}">
                                <span class="m2-input__addon | m2c-magento-product-grid-teasers-configurator__widget-chooser-trigger" @click="openCtaTargetModal( $index )">
                                    <svg class="m2-input__addon-icon">
                                        <use xlink:href="#icon_link"></use>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <cc-component-adder class="cc-component-adder cc-component-adder--last">
                    <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-magento-product-grid-teasers-configurator__item-action-button" @click="createNewTeaser( $index + 1 )">
                        <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                            <use xlink:href="#icon_plus"></use>
                        </svg>
                    </button>
                </cc-component-adder>
            </div>
        </template>

        <div class="m2c-magento-product-grid-teasers-configurator__modal" v-el:error-modal></div>
    </div>`,
    props: {
        /*
         * Single's component configuration
         */
        configuration: {
            type: Object,
            default(): any {
                return {
                    teasers: [ JSON.parse( JSON.stringify( teaserDataPattern ) ) ],
                    json: [],
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
        /* Obtain content-constructor's config file */
        ccConfig: {
            type: Object,
            default(): any {
                return {};
            },
        },
        productsPerPage: {
            type: String,
            default: '30',
        },
        /* Obtain admin url */
        adminPrefix: {
            type: String,
            default: 'admin',
        },
    },
    data(): any {
        return {
            imageUploadedText: $t( 'Change' ),
            noImageUploadedText: $t( 'Upload' ),
            configuration: this.getInitialConfiguration(),
            rowsCount: this.getCurrentFErowsCount(),
        };
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            //this.cleanupConfiguration();
            this.generateTeasersConfig();
            this.onSave();
        },
    },
    methods: {
        getInitialConfiguration(): any {
            if ( !this.configuration ) {
                this.configuration = {
                    teasers: [ JSON.parse( JSON.stringify( teaserDataPattern ) ) ],
                };
            }

            return this.configuration;
        },
        /**
         * Calculates "virtual" length of products in the grid
         * "virtual" means that teasers are included and their sizes are calculated too
         * f.e if teaser covers 2 tiles it counts as 2 brics, accordingly if it's 2x2 then it takes 4 bricks
         * @return {number} number of available bricks in grid
         */
        getVirtualBricksLength(): number {
            let virtualLength: number = parseInt( this.productsPerPage, 10 );

            for ( let i: number = 0; i < this.configuration.teasers.length; i++ ) {
                virtualLength += this.configuration.teasers[ i ].size.x * this.configuration.teasers[ i ].size.y - 1;
            }

            return virtualLength;
        },
        /**
         * Calculates how many rows there's displayed if the grid on front-end
         * Currently divider is hardcoded for desktop breakpoint
         * @return {number} number of rows in FE grid
         */
        getCurrentFErowsCount(): number {
            if ( this.ccConfig.columnsConfig.filterScenario === 'sidebar' ) {
                return Math.ceil( this.getVirtualBricksLength() / this.ccConfig.columnsConfig.withSidebar.desktop );
            }

            return Math.ceil( this.getVirtualBricksLength() / this.ccConfig.columnsConfig.full.desktop );
        },

        /**
         * When you open component after changes in M2 grid settings (when products per page chnaged)
         * Or, after you delete some teasers - this method updates available rows count on FE side and checks if
         * current row setting of the teaser is not higher than this.rowsCount.
         * If yes, it changes row setting to be equal this.rowsCount
         */
        fixOverflowedRowsSetup(): void {
            this.rowsCount = this.getCurrentFErowsCount();

            for ( let i: number = 0; i < this.configuration.teasers.length; i++ ) {
                if ( this.configuration.teasers[ i ].row > this.rowsCount ) {
                    this.configuration.teasers[ i ].row = this.rowsCount;
                }
            }
        },
        /* Opens M2's built-in image manager modal
         * Manages all images: image upload from hdd, select image that was already uploaded to server
         * @param index {number} - index of image of hero item
         */
        getImageUploader( index: number ): void {
            MediabrowserUtility.openDialog( `${this.uploaderBaseUrl}target_element_id/mpg-teaser-img-${index}/`,
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
            $( document ).on( 'change', '.m2c-magento-product-grid-teasers-configurator__image-url', ( event: Event ): void => {
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

            this.configuration.teasers[ itemIndex ].decodedImage = Base64 ? Base64.decode( encodedImage ) : window.atob( encodedImage );

            const img: any = new Image();
            img.onload = function(): void {
                _this.configuration.teasers[ itemIndex ].image = img.getAttribute( 'src' );
                _this.onChange();
            };
            img.src = imgEndpoint;
        },
        /* Opens modal with M2 built-in widget chooser
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal( index: number ): void {
            widgetTools.openDialog( `${window.location.origin}/${this.adminPrefix}/admin/widget/index/filter_widgets/Link/widget_target_id/teaser-ctatarget-output-${index}` );
            this.wWidgetListener( index );
        },
        /* Sets listener for widget chooser
         * It triggers component.onChange to update component's configuration
         * after value of item.href is changed
         */
        widgetSetListener(): void {
            const component: any = this;

            $( '.m2c-magento-product-grid-teasers-configurator__cta-target-link' ).on( 'change', (): void => {
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
                    _this.configuration.teasers[ itemIndex ].href = '';
                    wWidget.insertWidget();
                } );
            } else {
                window.setTimeout( (): void => {
                    this.wWidgetListener( itemIndex );
                }, 300 );
            }
        },
        setTeaserSize( index: number ) {
            this.fixOverflowedRowsSetup();

            const size: any = this.configuration.teasers[ index ].sizeSelect.split( 'x' );
            this.configuration.teasers[ index ].size.x = size[ 0 ];
            this.configuration.teasers[ index ].size.y = size[ 1 ];
        },
        /**
         * Creates new hero item and adds it to a specified index.
         * @param {number} index New component's index in components array.
         */
        createNewTeaser( index: number ): void {
            this.configuration.teasers.splice( index, 0, JSON.parse( JSON.stringify( teaserDataPattern ) ) );
            this.rowsCount = this.getCurrentFErowsCount();
            this.onChange();
        },
        /**
         * Moves hero item under given index up by swaping it with previous element.
         * @param {number} index Hero item's index in array.
         */
        moveTeaserUp( index: number ): void {
            const _this: any = this;

            if ( index > 0 ) {
                const $thisItem: any = $( `#m2c-magento-pg-teaser-${ index }` );
                const $prevItem: any = $( `#m2c-magento-pg-teaser-${ index - 1 }` );

                $thisItem.addClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', `translateY( ${ -Math.abs( $prevItem.outerHeight( true ) ) }px )` );
                $prevItem.addClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', `translateY( ${ $thisItem.outerHeight( true ) }px )` );

                setTimeout( (): void => {
                    _this.configuration.teasers.splice( index - 1, 0, _this.configuration.teasers.splice( index, 1 )[ 0 ] );
                    _this.onChange();
                    $thisItem.removeClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', '' );
                    $prevItem.removeClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', '' );
                }, 400 );
            }
        },
        /**
         * Moves hero item under given index down by swaping it with next element.
         * @param {number} index Hero item's index in array.
         */
        moveTeaserDown( index: number ): void {
            const _this: any = this;

            if ( index < this.configuration.teasers.length - 1 ) {
                const $thisItem: any = $( `#m2c-magento-pg-teaser-${ index }` );
                const $nextItem: any = $( `#m2c-magento-pg-teaser-${ index + 1 }` );

                $thisItem.addClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', `translateY( ${ $nextItem.outerHeight( true ) }px )` );
                $nextItem.addClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', `translateY( ${ -Math.abs( $thisItem.outerHeight( true ) ) }px )` );

                setTimeout( (): void => {
                    _this.configuration.teasers.splice( index + 1, 0, _this.configuration.teasers.splice( index, 1 )[ 0 ] );
                    _this.onChange();
                    $thisItem.removeClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', '' );
                    $nextItem.removeClass( 'm2c-magento-product-grid-teasers-configurator__item--animating' ).css( 'transform', '' );
                }, 400 );
            }
        },
        /**
         * Tells if item with given index is the first hero item.
         * @param  {number}  index Index of the hero item.
         * @return {boolean}       If hero item is first in array.
         */
        isFirstTeaser( index: number ): boolean {
            return index === 0;
        },
        /**
         * Tells if hero item with given index is the last hero item.
         * @param  {number}  index Index of the hero item.
         * @return {boolean}       If hero item is last in array.
         */
        isLastTeaser( index: number ): boolean {
            return index === this.configuration.teasers.length - 1;
        },
        /* Removes hero item after Delete button is clicked
         * and triggers hero item's onChange to update it's configuration
         * @param index {number} - index of hero item to remove
         */
        deleteTeaser( index: number ): void {
            const component: any = this;

            confirm( {
                content: $t( 'Are you sure you want to delete this item?' ),
                actions: {
                    confirm(): void {
                        component.configuration.teasers.splice( index, 1 );
                        component.fixOverflowedRowsSetup();
                        component.onChange();
                    },
                },
            } );
        },
        /* Cleans configuration for M2C content constructor after Saving component
         * All empty teasers have to be removed to not get into configuration object
         */
        cleanupConfiguration(): void {
            const filteredArray: any = this.configuration.teasers.filter( ( teaser: any ): any => teaser.image !== '' );
            this.configuration.teasers = filteredArray;
            this.onChange();
        },
        /* Generates 1:1 JSON for grid-layout component so it can be simply passed without any modifications within templates
         */
        generateTeasersConfig(): void {
            this.configuration.json = [];

            for ( let i: number = 0; i < this.configuration.teasers.length; i++ ) {
                const teaser: any = {
                    id: i + 1,
                    mobile: Number( this.configuration.teasers[ i ].isAvailableForMobile ),
                    size: {
                        x: Number( this.configuration.teasers[ i ].size.x ),
                        y: Number( this.configuration.teasers[ i ].size.y ),
                    },
                    gridPosition: {
                        x: this.configuration.teasers[ i ].position,
                        y: Number( this.configuration.teasers[ i ].row ),
                    },
                };

                this.configuration.json.push( teaser );
            }
        },
    },
    ready(): void {
        this.imageUploadListener();
        this.widgetSetListener();
        this.fixOverflowedRowsSetup();
    },
};

export default m2cMagentoProductGridTeasersConfigurator;
