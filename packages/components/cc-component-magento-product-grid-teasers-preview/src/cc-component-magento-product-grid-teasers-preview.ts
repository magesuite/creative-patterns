import $ from 'jquery';
import $t from 'mage/translate';

/**
 * Single component information interface.
 */
interface IComponentInformation {
    teasers: any;
};

/**
 * Magento products-grid teasers preview component.
 * This component displays preview of magento-product-grid-teasers component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentMagentoProductGridTeasersPreview: vuejs.ComponentOption = {
    template: `<div class="cc-component-magento-product-grid-teasers-preview">
        <ul class="cc-component-magento-product-grid-teasers-preview__list">
            <li class="cc-component-magento-product-grid-teasers-preview__list-item cc-component-magento-product-grid-teasers-preview__list-item--teaser">
                <svg class="cc-component-magento-product-grid-teasers-preview__image-placeholder">
                    <use xlink:href="#icon_image-placeholder"></use>
                </svg>
            </li>

            <template v-for="i in 7">
                <li class="cc-component-magento-product-grid-teasers-preview__list-item">
                    <div class="cc-component-magento-product-grid-teasers-preview__product-wrapper">
                        <svg class="cc-component-magento-product-grid-teasers-preview__product">
                            <use xlink:href="#icon_component-cc-product-teaser-item"></use>
                        </svg>
                    </div>
                </li>
            </template>

            <li class="cc-component-magento-product-grid-teasers-preview__list-item cc-component-magento-product-grid-teasers-preview__list-item--text">
                <div>
                    <div class="cc-component-magento-product-grid-teasers-preview__teasers-count">
                        {{ teasersLength }}
                    </div>
                    ${$t( 'teasers' )}
                </div>
            </li>
        </ul>
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
    computed: {
        teasersLength(): number {
            return this.configuration && this.configuration.teasers ? this.configuration.teasers.length : 0;
        },
    },
};

export default ccComponentMagentoProductGridTeasersPreview;
