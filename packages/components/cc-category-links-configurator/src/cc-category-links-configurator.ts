import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

/**
 * Category links configurator component.
 * This component is responsible for displaying category links configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccCategoryLinksConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-category-links-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-main_category_id" class="cs-input__label">Main category ID:</label>
            <input type="text" v-model="configuration.main_category_id" id="cfg-main_category_id" class="cs-input__input" @change="onChange">
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-sub_categories_ids" class="cs-input__label">Subcategories ID's:</label>
            <input type="text" v-model="configuration.sub_categories_ids" id="cfg-sub_categories_ids" class="cs-input__input" @change="onChange">
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-shownumbers" class="cs-input__label">Show products count:</label>
            <input type="checkbox" v-model="configuration.shownumbers" id="cfg-shownumbers" class="cs-input__input" @change="onChange">
        </div>
        <button type="submit">Save</button>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    main_category_id: '',
                    sub_categories_ids: '',
                    shownumbers: false,
                };
            },
        },
    },
};

export default ccCategoryLinksConfigurator;
