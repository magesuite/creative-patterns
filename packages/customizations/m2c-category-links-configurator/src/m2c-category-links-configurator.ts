import ccCategoryLinksConfigurator from '../../../components/cc-category-links-configurator/src/cc-category-links-configurator';

const m2cCategoryLinksConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccCategoryLinksConfigurator,
    ],
    template: `<form class="m2c-category-links-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-main_category_id" class="m2-input__label">Main category ID:</label>
            <input type="text" v-model="configuration.main_category_id" id="cfg-main_category_id" class="m2-input__input" @change="onChange">
        </div>
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-sub_categories_ids" class="m2-input__label">Subcategories ID's:</label>
            <input type="text" v-model="configuration.sub_categories_ids" id="cfg-sub_categories_ids" class="m2-input__input" @change="onChange">
        </div>
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-shownumbers" class="m2-input__label">Show products count:</label>
            <input type="checkbox" v-model="configuration.shownumbers" id="cfg-shownumbers" class="m2-input__input" @change="onChange">
        </div>
    </form>`,
};

export default m2cCategoryLinksConfigurator;
