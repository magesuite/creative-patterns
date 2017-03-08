import $ from 'jquery';

import $t from 'mage/translate';

/**
 * Single component information interface.
 */
interface IComponentInformation {
    main_category_id: string;
    main_category_labels: string;
    sub_categories_ids: string;
    sub_categories_labels: string;
    shownumbers: boolean;
};

/**
 * Brand carousel preview component.
 * This component is responsible for displaying preview of brand carousel component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentCategoryLinksPreview: vuejs.ComponentOption = {
    template: `<div class="cc-component-category-links-preview">
        <div class="cc-component-category-links-preview__wrapper">
            <h1 class="cc-component-category-links-preview__headline">{{ configuration.main_category_labels[0] }}</h1>
            <div class="cc-component-category-links-preview__content">
                <ul class="cc-component-category-links-preview__subcats">
                    <template v-for="(index, label) in configuration.sub_categories_labels">
                        <li class="cc-component-category-links-preview__subcat" v-if="index < configuration.sub_categories_labels.length">
                            <span class="cc-component-category-links-preview__subcat-label">{{ label }}</span>
                        </li>
                    </template>
                </ul>

                <div class="cc-component-category-links-preview__all-button">
                    <span class="cc-component-category-links-preview__all-button-text">${ $t( 'All products' ) }</span>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
    },
};

export default ccComponentCategoryLinksPreview;
