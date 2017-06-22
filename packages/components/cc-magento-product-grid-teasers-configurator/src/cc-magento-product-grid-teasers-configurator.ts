import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

import actionButton from '../../action-button/src/action-button';
import componentActions from '../../cc-component-actions/src/cc-component-actions';
import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';

/**
 * Magento product-grid teasers configurator component.
 * This component will be responsible for configuration of image teasers inside native products grid on M2 category pages
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccMagentoProductGridTeasersConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<div class="cc-magento-product-grid-teasers-configurator | {{ class }}">
    <cc-component-adder>
        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewTeaser( 0 )">
            <svg class="action-button__icon action-button__icon--size_300">
                <use xlink:href="../images/sprites.svg#icon_plus"></use>
            </svg>
        </button>
    </cc-component-adder>
    <template v-for="item in configuration.teasers">
        <div class="cc-magento-product-grid-teasers-configurator__item">
            <div class="cc-magento-product-grid-teasers-configurator__item-actions">
                <cc-component-actions>
                    <template slot="cc-component-actions__top">
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up" @click="moveTeaserUp( $index )" :class="[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isFirstComponent( $index )">
                            <svg class="action-button__icon action-button__icon--size_100">
                                <use xlink:href="../images/sprites.svg#icon_arrow-up"></use>
                            </svg>
                        </button>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down" @click="moveTeaserDown( $index )" :class="[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isLastComponent( $index )">
                            <svg class="action-button__icon action-button__icon--size_100">
                                <use xlink:href="../images/sprites.svg#icon_arrow-down"></use>
                            </svg>
                        </button>
                    </template>
                    <template slot="cc-component-actions__bottom">
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete" @click="deleteTeaser( $index )">
                            <svg class="action-button__icon">
                                <use xlink:href="../images/sprites.svg#icon_trash-can"></use>
                            </svg>
                        </button>
                    </template>
                </cc-component-actions>
            </div>
            <div class="cc-magento-product-grid-teasers-configurator__item-content">
                <div class="cc-magento-product-grid-teasers__item-image"></div>
                <div class="cc-magento-product-grid-teasers__item-options">
                    <div class="cs-input">
                        <label for="cfg-mpg-teaser{{ $index }}-variant" class="cs-input__label">Display variant:</label>
                        <select name="cfg-mpg-teaser{{ $index }}-variant" class="cs-input__select" id="cfg-mpg-teaser{{ $index }}-variant" v-model="configuration.displayVariant">
                            <option value="variant-1">Text vertically centered on the left</option>
                            <option value="variant-2">Text vertically centered in the middle</option>
                            <option value="variant-3">Text on the bottom, left corner</option>
                            <option value="variant-4">Text on the bottom - centered</option>
                        </select>
                    </div>
                    <div class="cs-input">
                        <label for="cfg-mpg-teaser{{ $index }}-headline" class="cs-input__label">Headline:</label>
                        <input type="text" v-model="configuration.items[$index].headline" id="cfg-mpg-teaser{{ $index }}-headline" class="cs-input__input">
                    </div>
                    <div class="cs-input">
                        <label for="cfg-mpg-teaser{{ $index }}-paragraph" class="cs-input__label">Paragraph:</label>
                        <textarea type="text" v-model="configuration.items[$index].paragraph" id="cfg-mpg-teaser{{ $index }}-paragraph" class="cs-input__textarea" placeholder="(max 200 characters)" maxlength="200"></textarea>
                    </div>
                    <div class="cs-input">
                        <label for="cfg-mpg-teaser{{ $index }}-ctaLabel" class="cs-input__label">CTA label:</label>
                        <input type="text" v-model="configuration.items[$index].ctaLabel" id="cfg-mpg-teaser{{ $index }}-ctaLabel" class="cs-input__input">
                    </div>
                    <div class="cs-input cs-input--type-addon">
                        <label for="cfg-mpg-teaser{{ $index }}-cta-label" class="cs-input__label">CTA label:</label>
                        <input type="text" v-model="configuration.items[$index].ctaLabel" id="cfg-mpg-teaser{{ $index }}-cta-label" class="cs-input__input">
                    </div>
                    <div class="cs-input cs-input--type-addon">
                        <label for="cfg-mpg-teaser{{ $index }}-cta-target" class="cs-input__label">CTA target link:</label>
                        <input type="text" v-model="configuration.items[$index].ctaTarget" id="cfg-mpg-teaser{{ $index }}-cta-target" class="cs-input__input">
                        <span class="cs-input__addon">
                            <svg class="cs-input__addon-icon">
                                <use xlink:href="../images/sprites.svg#icon_link"></use>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <cc-component-adder v-if="configuration.items.length">
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewTeaser( $index + 1 )">
                <svg class="action-button__icon action-button__icon--size_300">
                    <use xlink:href="../images/sprites.svg#icon_plus"></use>
                </svg>
            </button>
        </cc-component-adder>
    </template>
</div>`,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
        /**
         * Single's component configuration 
         */
        configuration: {
            type: Object,
            default(): Object {
                return {
                    teasers: [],
                };
            },
        },
    },
};

export default ccMagentoProductGridTeasersConfigurator;
