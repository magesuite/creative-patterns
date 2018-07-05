import $ from 'jquery';
import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

import actionButton from '../../action-button/src/action-button';
import componentActions from '../../cc-component-actions/src/cc-component-actions';
import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';

import ccComponentProductFinderPreview from '../../cc-component-product-finder-preview/src/cc-component-product-finder-preview';

/**
 * Product Finder configurator component.
 * This component is responsible for configuring Product Finder component to be displayed as CC component. It finds products based on couple of customer answers
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccProductFinderConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
        'cc-product-finder-preview': ccComponentProductFinderPreview,
    },
    template: `<div class="cc-product-finder-configurator {{ classes }} | {{ mix }}" {{ attributes }}>
        <section class="cc-product-finder-configurator__section">
            <h3 class="cc-product-finder-configurator__subtitle">Default settings:</h3>
            <div class="cc-product-finder-configurator__scenario-options cc-product-finder-configurator__scenario-options--inputs">
                <div class="cc-input cc-input--type-inline | cc-product-finder-configurator__section-option">
                    <label for="cfg-pf-layout-m" class="cc-input__label | cc-product-finder-configurator__section-option-label">Mobile layout:</label>
                    <select name="cfg-pf-layout-m" class="cc-input__select" id="cfg-pf-layout-m" v-model="configuration.optionsPerRow.mobile" @change="onChange">
                        <option value="1">1 option per row</option>
                        <option value="2">2 options per row</option>
                        <option value="3">3 options per row</option>
                    </select>
                </div>
                <div class="cc-input cc-input--type-inline | cc-product-finder-configurator__section-option">
                    <label for="cfg-pf-layout-t" class="cc-input__label | cc-product-finder-configurator__section-option-label">Tablet layout:</label>
                    <select name="cfg-pf-layout-t" class="cc-input__select" id="cfg-pf-layout-t" v-model="configuration.optionsPerRow.tablet" @change="onChange">
                        <option value="2">2 options per row</option>
                        <option value="3">3 options per row</option>
                        <option value="4">4 options per row</option>
                    </select>
                </div>
                <div class="cc-input cc-input--type-inline | cc-product-finder-configurator__section-option">
                    <label for="cfg-pf-layout-d" class="cc-input__label | cc-product-finder-configurator__section-option-label">Desktop layout:</label>
                    <select name="cfg-pf-layout-d" class="cc-input__select" id="cfg-pf-layout-d" v-model="configuration.optionsPerRow.desktop" @change="onChange">
                        <option value="3">3 options per row</option>
                        <option value="4">4 options per row</option>
                        <option value="5">5 options per row</option>
                        <option value="6">6 options per row</option>
                    </select>
                </div>
            </div>
        </section>

        <section class="cc-product-finder-configurator__section">
            <cc-component-adder class="cc-component-adder cc-component-adder--static" v-show="!configuration.steps.length">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | cc-product-finder-configurator__item-action-button" @click="createStep( 0 )">
                    <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                        <use v-bind="{ 'xlink:href': '#icon_plus' }"></use>
                    </svg>
                </button>
            </cc-component-adder>

            <template v-for="step in configuration.steps">
                <div class="cc-product-finder-configurator__step" id="m2c-product-finder-step-{{ $index }}">
                    <cc-component-adder class="cc-component-adder cc-component-adder--first">
                        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-product-finder-configurator__item-action-button" @click="createStep( $index )">
                            <svg class="action-button__icon action-button__icon--size_300">
                                <use xlink:href="#icon_plus"></use>
                            </svg>
                        </button>
                    </cc-component-adder>

                    <div class="cc-product-finder-configurator__step-content">
                        <div class="cc-product-finder-configurator__preview">
                            
                        </div>

                        <div class="cc-product-finder-configurator__source">
                            <div class="cc-input">
                                <label for="cfg-pf-step{{ $index }}-sourcefield" class="cc-input__label">Step data:</label>
                                <textarea name="cfg-pf-step{{ $index }}-sourcefield" class="cc-input__textarea" id="cfg-pf-step{{ $index }}-sourcefield" v-model="configuration.steps[$index].source"></textarea>
                            </div>
                        </div>
                    </div>

                    <cc-component-adder class="cc-component-adder cc-component-adder--last" v-if="configuration.steps.length">
                        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-product-finder-configurator__item-action-button" @click="createStep( $index + 1 )">
                            <svg class="action-button__icon action-button__icon--size_300">
                                <use xlink:href="#icon_plus"></use>
                            </svg>
                        </button>
                    </cc-component-adder>
                </div>
            </template>
        </section>
    </div>`,
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    optionsPerRow: {
                        mobile: 2,
                        tablet: 3,
                        desktop: 5,
                    },
                    steps: [
                        {},
                    ],
                };
            },
        },
    }
}

export default ccProductFinderConfigurator;
