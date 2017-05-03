import $ from 'jquery';
import $t from 'mage/translate';

import ccCategoryLinksConfigurator from '../../../components/cc-category-links-configurator/src/cc-category-links-configurator';
import ccCategoryPicker from '../../../components/cc-category-picker/src/cc-category-picker';

const m2cCategoryLinksConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccCategoryLinksConfigurator,
    ],
    template: `<form class="m2c-category-links-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <label class="m2-input__label">${$t( 'Category' )}</label>
            <input type="hidden" v-model="configuration.main_category_id" id="cp-main">
        </div>
        <div class="m2-input m2-input--type-inline">
            <label class="m2-input__label">${$t( 'Subcategories' )}</label>
            <input type="hidden" v-model="configuration.sub_categories_ids" id="cp-sub">
        </div>
        
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-shownumbers" class="m2-input__label">${$t( 'Show products count' )}</label>
            <div class="admin__actions-switch" data-role="switcher">
                <input type="checkbox" class="admin__actions-switch-checkbox" id="cfg-shownumbers" name="use_name_in_product_search" v-model="configuration.shownumbers" @change="onChange">
                <label class="admin__actions-switch-label" for="cfg-shownumbers">
                    <span class="admin__actions-switch-text" data-text-on="${$t( 'Yes' )}" data-text-off="${$t( 'No' )}"></span>
                </label>
            </div>
        </div>
    </form>`,
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            this.configuration.main_category_labels = this.categoryPicker._categoriesLabels;
            this.configuration.sub_categories_labels = this.subCategoriesPicker._categoriesLabels;
            this.onSave();
        },
    },
    props: {
        /* Obtain endpoint for getting categories data for category picker */
        categoriesDataUrl: {
            type: String,
            default: '',
        },
    },
    data(): Object {
        return {
            categoryPicker: undefined,
            subCategoriesPicker: undefined,
        };
    },
    ready(): void {
        const _this: any = this;

        // Show loader
        $( 'body' ).trigger( 'showLoadingPopup' );

        this.$http.get( this.categoriesDataUrl ).then( ( response: any ): void => {
            _this.initializePickers( JSON.parse( response.body ) );
            
            // Hide loader
            $( 'body' ).trigger( 'hideLoadingPopup' );
        } );
    },
    methods: {
        initializePickers( categories: any ): void {
            const _this: any = this;

            this.subCategoriesPicker = new ccCategoryPicker( $( '#cp-sub' ), categories, {
                showSearch: false,
                disabled: _this.configuration.main_category_id === '',
            } );

            this.categoryPicker = new ccCategoryPicker( $( '#cp-main' ), categories, {
                multiple: false,
            } );

            if ( this.configuration.main_category_id !== '' ) {
                this.subCategoriesPicker.showChildrenOnly( this.configuration.main_category_id );
            }

            $( '#cp-main' ).on( 'change', function() {
                _this.updateSubcategoriesPicker( _this.configuration.main_category_id );
            } );
        },

        updateSubcategoriesPicker( catId: string ): void {
            this.subCategoriesPicker.resetAll();

            if ( catId !== '' ) {
                this.subCategoriesPicker.showChildrenOnly( catId );
                this.subCategoriesPicker.enable();
            } else {
                this.subCategoriesPicker.disable();
            }
        }
    },
};

export default m2cCategoryLinksConfigurator;
