import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

/**
 * Product carousel configurator component.
 * This component is responsible for displaying product carousel's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccProductCarouselConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-product-carousel-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-pc-category" class="cs-input__label">Select Category:</label>
            <select name="cfg-pc-category-select" class="cs-input__select" id="cfg-pc-category" v-model="configuration.category_id" @change="onChange">
                <option value="">-- Please select category --</option>
            </select>
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-pc-order-by" class="cs-input__label">Order by:</label>
            <select name="cfg-pc-order-by" class="cs-input__select" id="cfg-pc-order-by" v-model="configuration.order_by" @change="onChange">
                <option value="creation_date-DESC">Creation date: newest</option>
                <option value="creation_date-ASC">Creation date: oldest</option>
                <option value="price-DESC">Price: cheapest</option>
                <option value="price-ASC">Price: most expensive</option>
            </select>
            <select name="cfg-pc-order-type" class="cs-input__select" v-model="configuration.order_type" @change="onChange">
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
            </select>
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-pc-order-by" class="cs-input__label">Show:</label>
            <select name="cfg-pc-limit" class="cs-input__select" id="cfg-pc-limit" v-model="configuration.limit" @change="onChange">
                <option value="20">20 products</option>
                <option value="40">40 products</option>
                <option value="60">60 products</option>
                <option value="80">80 products</option>
                <option value="100">100 products</option>
            </select>
        </div>

        <button type="submit">Save</button>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    category_id: '',
                    order_by: 'creation_date',
                    order_type: 'DESC',
                    limit: 20,
                };
            },
        },
    },
};

export default ccProductCarouselConfigurator;
