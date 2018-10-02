import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';
 
/**
 * Daily deal teaser configurator component.
 * This component is responsible for displaying daily deal teaser configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccDailyDealTeaserConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-daily-deal-teaser-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
    <div class="cs-input cs-input--type-inline">
        <label for="cfg-ddt-category" class="cs-input__label">Select Category:</label>
        <select name="cfg-ddt-category-select" class="cs-input__select" id="cfg-ddt-category" v-model="configuration.category_id" @change="onChange">
            <option value="">-- Please select category --</option>
        </select>
    </div>
    <div class="cs-input cs-input--type-inline">
        <label for="cfg-ddt-order-by" class="cs-input__label">Order by:</label>
        <select name="cfg-ddt-order-by" class="cs-input__select" id="cfg-ddt-order-by" v-model="configuration.order_by" @change="onChange">
            <option value="creation_date-DESC">Creation date: newest</option>
            <option value="creation_date-ASC">Creation date: oldest</option>
            <option value="price-DESC">Price: cheapest</option>
            <option value="price-ASC">Price: most expensive</option>
        </select>
        <select name="cfg-ddt-order-type" class="cs-input__select" v-model="configuration.order_type" @change="onChange">
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
        </select>
    </div>

    <button type="submit">Save</button>
</form>`,
    props: {
        configuration: {
            type: Object,
            default: {
                title: '',
                subtitle: '',
            },
        },
    },
};
 
export default ccDailyDealTeaserConfigurator;