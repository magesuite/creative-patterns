import $ from 'jquery';
import $t from 'mage/translate';

import ccDailyDealTeaserConfigurator from '../../../components/cc-daily-deal-teaser-configurator/src/cc-daily-deal-teaser-configurator';
import ccCategoryPicker from '../../../components/cc-category-picker/src/cc-category-picker';

/**
 * M2C daily deal teaser component for admin panel.
 * This component is responsible for managing daily deal teaser's configuration
 */
const m2cDailyDealTeaserConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccDailyDealTeaserConfigurator,
    ],
    template: `<form class="m2c-daily-deal-teaser-configurator" {{ attributes }}>

        <div class="m2-input m2-input--type-inline">
            <label class="m2-input__label">${$t( 'Categories' )}:</label>
            <input type="hidden" v-model="configuration.category_id" @change="onChange" id="cp-daily-deal-teaser">
        </div>

        <div class="m2-input m2-input--type-inline">
            <label class="m2-input__label" for="cfg-ddt-skus">${$t( 'SKUs' )}:</label>
            <input type="text" name="cfg-ddt-skus" class="m2-input__input" id="cfg-ddt-skus" v-model="configuration.skus" @change="onChange">
        </div>
        <div class="m2-input m2-input--type-inline m2-input--type-hint">
            <label class="m2-input__label"> </label>
            <span class="m2-input__hint m2-input__hint--under-field">${$t( 'Multiple, comma-separated' )}</span>
        </div>
        <div class="m2-input m2-input--type-inline m2-input--type-hint" v-if="configuration.skus.length">
            <label class="m2-input__label"> </label>
            <span class="m2-input__hint m2-input__hint--under-field m2-input__hint--info-mark">${$t( 'Providing list of comma separated SKUs will disable any filtering and sorting configured for that component.  Category (if specified) will also not be taken into account. Only products with specified SKUs will be displayed in exactly the same order as they are provided in SKUs field.' )}</span>
        </div>

        <div class="m2-input m2-input--type-inline">
            <label class="m2-input__label" for="cfg-ddt-dataprovider">${$t( 'Custom Data Provider' )}:</label>
            <input type="text" name="cfg-ddt-dataprovider" class="m2-input__input" id="cfg-ddt-dataprovider" v-model="configuration.class_overrides.dataProvider" @change="onChange">
        </div>

        <div class="m2-input m2-input--type-inline">
            <label for="cfg-ddt-filter" class="m2-input__label">${$t( 'Filter' )}:</label>
            <select name="cfg-ddt-filter" class="m2-input__select" id="cfg-ddt-filter" v-model="configuration.filter" @change="onChange">
                <option value="">${$t( 'No filter' )}</option>
                <template v-for="filter in productCollectionsFilters">
                    <option value="{{ filter.value }}" :selected="filter.value === configuration.filter">{{ filter.label }}</option>
                </template>
            </select>
        </div>

        <div class="m2-input m2-input--type-inline">
            <label for="cfg-ddt-order-by" class="m2-input__label">${$t( 'Order by' )}:</label>
            <select name="cfg-ddt-order-by" class="m2-input__select" id="cfg-ddt-order-by" v-model="configuration.order_by" @change="onChange">
                <option value="">${$t( 'Not specified' )}</option>
                <template v-for="sorter in productCollectionsSorters">
                    <option value="{{ sorter.value }}" :selected="sorter.value === configuration.order_by">{{ sorter.label }}</option>
                </template>
            </select>
            <select name="cfg-ddt-order-type" class="m2-input__select" v-model="configuration.order_type" @change="onChange">
                <option value="ASC">${$t( 'Ascending' )}</option>
                <option value="DESC">${$t( 'Descending' )}</option>
            </select>
        </div>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    category_id: '',
                    filter: '',
                    order_by: 'creation_date',
                    order_type: 'DESC',
                    skus: '',
                    class_overrides: {
                        dataProvider: '',
                    },
                };
            },
        },
        /* Obtain endpoint for getting categories data for category picker */
        categoriesDataUrl: {
            type: String,
            default: '',
        },
        productCollectionsSorters: {
            type: [String, Array],
            default: '',
        },
        productCollectionsFilters: {
            type: [String, Array],
            default: '',
        },
    },
    data(): Object {
        return {
            categoryPicker: undefined,
        };
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            if ( this.configuration.class_overrides.dataProvider === '' ) {
                delete this.configuration.class_overrides;
            }

            this.onSave();
        },
    },
    ready(): void {
        const _this: any = this;

        this.productCollectionsSorters = this.productCollectionsSorters !== '' ? JSON.parse(this.productCollectionsSorters) : [];
        this.productCollectionsFilters = this.productCollectionsFilters !== '' ? JSON.parse(this.productCollectionsFilters) : [];

        if ( !this.configuration.class_overrides ) {
            this.configuration.class_overrides = {
                dataProvider: '',
            };
        }

        // Show loader
        $( 'body' ).trigger( 'showLoadingPopup' );

        // Get categories JSON with AJAX
        this.$http.get( this.categoriesDataUrl ).then( ( response: any ): void => {
            _this.categoryPicker = new ccCategoryPicker( $( '#cp-daily-deal-teaser' ), JSON.parse( response.body ), {
                multiple: false,
            } );
            
            // Hide loader
            $( 'body' ).trigger( 'hideLoadingPopup' );
        } );
    },
};

export default m2cDailyDealTeaserConfigurator;
