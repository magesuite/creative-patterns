import $ from 'jquery';

import ccProductCarouselConfigurator from '../../../components/cc-product-carousel-configurator/src/cc-product-carousel-configurator';
import ccCategoryPicker from '../../../components/cc-category-picker/src/cc-category-picker';

/**
 * M2C Product carousel component for admin panel.
 * This component is responsible for managing product carousel's configuration
 */
const m2cProductCarouselConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccProductCarouselConfigurator,
    ],
    template: `
        <form class="m2c-product-carousel-configurator {{ classes }} | {{ mix }}" {{ attributes }}>

            <div class="m2-input m2-input--type-inline">
                <label class="m2-input__label">Categories:</label>
                <input type="hidden" v-model="configuration.category_id" @change="onChange" id="cp-products-carousel">
            </div>

            <div class="m2-input m2-input--type-inline">
                <label class="m2-input__label" for="cfg-pc-skus">SKUs:</label>
                <input type="text" name="cfg-pc-skus" class="m2-input__input" id="cfg-pc-skus" v-model="configuration.skus" @change="onChange">
            </div>
            <div class="m2-input m2-input--type-inline m2-input--type-hint">
                <label class="m2-input__label"> </label>
                <span class="m2-input__hint m2-input__hint--under-field">Multiple, comma-separated</span>
            </div>

            <div class="m2-input m2-input--type-inline">
                <label class="m2-input__label" for="cfg-pc-dataprovider">Custom Data Provider:</label>
                <input type="text" name="cfg-pc-dataprovider" class="m2-input__input" id="cfg-pc-dataprovider" v-model="configuration.class_overrides.dataProvider" @change="onChange">
            </div>

            <div class="m2-input m2-input--type-inline">
                <label for="cfg-pc-order-by" class="m2-input__label">Order by:</label>
                <select name="cfg-pc-order-by" class="m2-input__select" id="cfg-pc-order-by" v-model="configuration.order_by" @change="onChange">
                    <option value="creation_date">Creation date</option>
                    <option value="price">Price</option>
                    <option value="newest_products">Newest products</option>
                    <option value="bestsellers_amount">Bestsellers</option>
                </select>
                <select name="cfg-pc-order-type" class="m2-input__select" v-model="configuration.order_type" @change="onChange">
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>

            <div class="m2-input m2-input--type-inline">
                <label for="cfg-pc-order-by" class="m2-input__label">Show:</label>
                <select name="cfg-pc-limit" class="m2-input__select" id="cfg-pc-limit" v-model="configuration.limit" @change="onChange">
                    <option value="20">20 products</option>
                    <option value="40">40 products</option>
                    <option value="60">60 products</option>
                    <option value="80">80 products</option>
                    <option value="100">100 products</option>
                </select>
            </div>
        </form>
    `,
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'DESC',
                    limit: 20,
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

        if ( !this.configuration.class_overrides ) {
            this.configuration.class_overrides = {
                dataProvider: '',
            };
        }

        // Show loader
        $( 'body' ).trigger( 'showLoadingPopup' );

        // Get categories JSON with AJAX
        this.$http.get( this.categoriesDataUrl ).then( ( response: any ): void => {
            _this.categoryPicker = new ccCategoryPicker( $( '#cp-products-carousel' ), JSON.parse( response.body ), {
                multiple: false,
            } );

            // Hide loader
            $( 'body' ).trigger( 'hideLoadingPopup' );
        } );
    },
};

export default m2cProductCarouselConfigurator;
