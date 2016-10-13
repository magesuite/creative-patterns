import ccImageTeaserConfigurator from '../../../components/cc-image-teaser-configurator/src/cc-image-teaser-configurator';
import $ from 'jquery';
import $t from 'mage/translate';

// Pattern for teaser Item
const teaserItemDataPattern: any = {
    image: '',
    decodedImage: '',
    headline: '',
    paragraph: '',
    ctaLabel: $t( 'More' ),
    ctaTarget: '',
};

/**
 * M2C Image teaser component for admin panel.
 * This component is responsible for managing image teasers including image upload and widget chooser
 */
const m2cImageTeaserConfigurator: vuejs.ComponentOption = {
    template: `<form class="m2c-image-teaser-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <section class="m2c-image-teaser-configurator__section">
            <div class="m2-input m2-input--type-inline">
                <label for="cfg-it-width" class="m2-input__label">${$t( 'Teaser width' )}:</label>
                <select name="cfg-it-width-select" class="m2-input__select" id="cfg-it-width" v-model="configuration.teaserWidth" @change="onChange">
                    <option value="full-width">${$t( 'Full browser width' )}</option>
                    <option value="limited-width">${$t( 'Breaking point width (1280px)' )}</option>
                </select>
            </div>
        </section>

        <section class="m2c-image-teaser-configurator__section">
            <div class="m2c-image-teaser-configurator__teaser">
                <template v-for="item in configuration.items">
                    <div class="m2c-image-teaser-configurator__teaser-item" id="m2c-image-teaser-item-{{ $index }}">
                        <div class="m2c-image-teaser-configurator__toolbar">
                            <span class="m2c-image-teaser-configurator__teaser-item-title">
                                ${$t( 'Banner' )} {{ $index+1 }}/{{ configuration.items.length }}
                            </span>
                            <template v-if="configuration.items[$index].image">
                                <a href="#" href="#" @click="getImageUploader( $index )">${$t( 'Change image' )}</a>
                            </template>
                            <template v-else>
                                <a href="#" href="#" @click="getImageUploader( $index )">${$t( 'Upload image' )}</a>
                            </template>
                        </div>
                        <div class="m2c-image-teaser-configurator__image-holder-outer">
                            <div class="m2c-image-teaser-configurator__image-holder-inner">
                                <img :src="configuration.items[$index].image" class="m2c-image-teaser-configurator__image" v-show="configuration.items[$index].image">
                                <template v-if="isPossibleToDelete( $index )">
                                    <button class="action-button action-button--look_default action-button--type_icon | m2c-image-teaser-configurator__delete-button" @click="deleteTeaserItem( $index )">
                                        <svg class="action-button__icon action-button__icon--size_300">
                                            <use v-bind="{ 'xlink:href': assetsSrc + 'images/sprites.svg#icon_trash-can' }"></use>
                                        </svg>
                                        ${$t( 'Delete banner' )}
                                    </button>
                                </template>
                                <input type="hidden" class="m2c-image-teaser-configurator__image-url" v-model="configuration.items[$index].image" id="img-{{$index}}"> 
                            </div>
                        </div>
                        <div class="m2-input">
                            <label for="cfg-it-teaser{{ $index+1 }}-headline" class="m2-input__label">${$t( 'Headline' )}:</label>
                            <input type="text" v-model="configuration.items[$index].headline" id="cfg-it-teaser{{ $index+1 }}-headline" class="m2-input__input" @change="onChange">
                        </div>
                        <div class="m2-input">
                            <label for="cfg-it-teaser{{ $index+1 }}-paragraph" class="m2-input__label">${$t( 'Paragraph' )}:</label>
                            <textarea type="text" v-model="configuration.items[$index].paragraph" id="cfg-it-teaser{{ $index+1 }}-paragraph" class="m2-input__textarea m2-input__textarea--look-thin" @change="onChange" placeholder="(${$t( 'max 200 characters' )})" maxlength="200"></textarea>
                        </div>
                        <div class="m2-input">
                            <label for="cfg-it-teaser{{ $index+1 }}-cta-label" class="m2-input__label">${$t( 'CTA label' )}:</label>
                            <input type="text" v-model="configuration.items[$index].ctaLabel" id="cfg-it-teaser{{ $index+1 }}-cta-label" class="m2-input__input" @change="onChange">
                        </div>
                        <div class="m2-input">
                            <div class="m2c-image-teaser-configurator__cta-actions">
                                <label class="m2-input__label">${$t( 'CTA target link' )}:</label>
                                <template v-if="item.ctaTarget">
                                    <a href="#" @click="openCtaTargetModal( $index )">${$t( 'Edit' )}</a>
                                </template>
                                <template v-else>
                                    <a href="#" @click="openCtaTargetModal( $index )">${$t( 'Add' )}</a>
                                </template>
                            </div>
                            <input type="text" class="m2-input__input m2-input--type-readonly | m2c-image-teaser-configurator__cta-target-link" readonly v-model="configuration.items[$index].ctaTarget" id="ctatarget-output-{{ $index }}">
                        </div>
                    </div>
                </template>
            </div>
        </section>
    </form>`,
    props: {
        /*
         * Single's component configuration 
         */
        configuration: {
            type: Object,
            default(): Object {
                return {
                    teaserWidth: 'full-width',
                    items: [ JSON.parse( JSON.stringify( teaserItemDataPattern ) ) ],
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
        m2cConfigurationSaved(): any {
            this.cleanupConfiguration();
        },
    },
    methods: {
        /* Opens M2's built-in image manager modal
         * Manages all images: image upload from hdd, select image that was already uploaded to server 
         * @param index {number} - index of image teaser item
         */
        getImageUploader( index: number ): void {
            MediabrowserUtility.openDialog( `${this.uploaderBaseUrl}target_element_id/img-${index}/`,
                'auto',
                'auto',
                $t( 'Insert File...' ),
                {
                    closed: true,
                }
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
            $( '.m2c-image-teaser-configurator__image-url' ).on( 'change', ( event: Event ): void => {
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
            this.updateConfig();
            this.createTeaserItem();
        },

        /* Creates another teaser item using teaserItemDataPattern */
        createTeaserItem(): void {
            /* If image of last array item in this.configuration.items is not empty, add another teaser item */
            if ( this.configuration.items && this.configuration.items.slice( -1 )[ 0 ].image !== '' ) {
                this.configuration.items.push( JSON.parse( JSON.stringify( teaserItemDataPattern ) ) );
            }
        },

        /* Opens modal with M2 built-in widget chooser 
         * @param index {number} - index of teaser item to know where to place output of widget chooser
         */
        openCtaTargetModal( index: number ): void {
            const component: any = this;

            widgetTools.openDialog( `${window.location.origin}/admin/admin/widget/index/widget_target_id/ctatarget-output-${index}` );

            /* clean current value since widget chooser doesn't do that to allow multiple widgets
             * we don't want that since this should be url for CTA */
            component.configuration.items[ index ].ctaTarget = '';

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
        widgetSetListener(): void {
            const component: any = this;

            $( '.m2c-image-teaser-configurator__cta-target-link' ).on( 'change', (): void => {
                component.updateConfig();
            } );
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
            if ( confirm( $t( `Are you sure you want to remove this banner?` ) ) ) {
                this.configuration.items.splice( index, 1 );
                this.updateConfig();
            }
        },

        /* Cleans configuration for M2C content constructor after Saving component
         * All empty teaser items has to be removed to not get into configuration object
         */
        cleanupConfiguration(): void {
            const filteredArray: any = this.configuration.items.filter( ( item: any ): any => item.image !== '' );
            this.configuration.items = filteredArray;
            this.updateConfig();
        },
    },
    ready(): void {
        this.widgetSetListener();
        this.createTeaserItem();
    },
    mixins: [
        ccImageTeaserConfigurator,
    ],
};

export default m2cImageTeaserConfigurator;
