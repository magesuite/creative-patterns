import template from './cc-hero-carousel-configurator.tpl';

import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

import actionButton from '../../action-button/src/action-button';

import componentActions from '../../cc-component-actions/src/cc-component-actions';
import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';

/**
 * Hero carousel configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccHeroCarouselConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: template,
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
                    items: [],
                };
            },
        },
    },
};

export default ccHeroCarouselConfigurator;
