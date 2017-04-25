import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

import actionButton from '../../action-button/src/action-button';
import componentActions from '../../cc-component-actions/src/cc-component-actions';

import $ from 'jquery';
import $t from 'mage/translate';

/**
 * Product grid configurator component.
 * This component is responsible for displaying products grid  configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccProductsGridConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-products-grid-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cc-products-grid-configurator__columns">
        <div class="cc-products-grid-configurator__column-left">
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-pg-category" class="cs-input__label">Select Category:</label>
                <input type="text" name="cfg-pg-category-select" class="cs-input__input" id="cfg-pg-category" v-model="configuration.category_id" @change="onChange">
            </div>
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-pg-order-by" class="cs-input__label">Order by:</label>
                <select name="cfg-pg-order-by" class="cs-input__select" id="cfg-pg-order-by" v-model="configuration.order_by" @change="onChange">
                    <option value="creation_date">Creation date:</option>
                    <option value="price">Price:</option>
                </select>
                <select name="cfg-pg-order-type" class="cs-input__select" v-model="configuration.order_type" @change="onChange">
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
            </div>
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-pg-rows_desktop" class="cs-input__label">Rows desktop:</label>
                <select name="cfg-pg-rows_desktop" class="cs-input__select" id="cfg-pg-rows_desktop" v-model="configuration.rows_desktop" @change="onChange" number>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-pg-rows_tablet" class="cs-input__label">Rows tablet:</label>
                <select name="cfg-pg-rows_tablet" class="cs-input__select" id="cfg-pg-rows_tablet" v-model="configuration.rows_tablet" @change="onChange" number>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-pg-rows_mobile" class="cs-input__label">Rows mobile:</label>
                <select name="cfg-pg-rows_mobile" class="cs-input__select" id="cfg-pg-rows_mobile" v-model="configuration.rows_mobile" @change="onChange" number>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        </div>
        <div class="cc-products-grid-configurator__column-right">
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-pg-hero" class="cs-input__label">Hero image:</label>
                <select name="cfg-pg-hero" class="cs-input__select" id="cfg-pg-hero" v-model="configuration.hero" @change="onChange">
                    <option value="" selected="selected">No hero image</option>
                    <option value="1">Left</option>
                    <option value="2">Right</option>
                </select>
            </div>

            <div class="cs-input" v-if="configuration.hero">

                <div class="cs-input cs-input--type-inline">
                    <label for="cfg-pg-hero_image" class="cs-input__label">Upload image:</label>
                    <a href="#" class="" href="#">Upload image</a>
                    <input type="hidden" name="cfg-pg-hero_image" class="cs-input__input" id="cfg-pg-hero_image" v-model="configuration.hero_image" @change="onChange">
                </div>
                <div class="cs-input cs-input--type-inline">
                    <label for="cfg-pg-hero_headline" class="cs-input__label">Headline:</label>
                    <input type="text" name="cfg-pg-hero_headline" class="cs-input__input" id="cfg-pg-hero_headline" v-model="configuration.hero_headline" @change="onChange">
                </div>
                <div class="cs-input cs-input--type-inline">
                    <label for="cfg-pg-hero_subheadline" class="cs-input__label">Subheadline:</label>
                    <input type="text" name="cfg-pg-hero_subheadline" class="cs-input__input" id="cfg-pg-hero_subheadline" v-model="configuration.hero_subheadline" @change="onChange">
                </div>
                <div class="cs-input cs-input--type-inline">
                    <label for="cfg-pg-hero_url" class="cs-input__label">Url:</label>
                    <input type="text" name="cfg-pg-hero_url" class="cs-input__input" id="cfg-pg-hero_url" v-model="configuration.hero_url" @change="onChange">
                </div>
                <div class="cs-input cs-input--type-inline">
                    <label for="cfg-pg-hero_button_label" class="cs-input__label">CTA button label:</label>
                    <input type="text" name="cfg-pg-hero_button_label" class="cs-input__input" id="cfg-pg-hero_button_label" v-model="configuration.button_label" @change="onChange">
                </div>

            </div>
        </div>
        </div>

        <button type="submit">Save</button>
    </form>`,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-actions': componentActions,
    },
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
                    hero_image: '',
                    hero_headline: '',
                    hero_subheadline: '',
                    hero_url: '',
                    hero_button_label: '',
                };
            },
        },
    }
}

export default ccProductsGridConfigurator;
