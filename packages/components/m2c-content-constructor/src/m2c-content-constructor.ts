// This is an UMD module to work with Magento 2 requirejs system.
import Vue from 'vue';

/**
 * M2C Content Constructor component.
 * This is the final layer that is responsible for collecting and tying up all
 * of the M2C admin panel logic.
 */
const m2cContentConstructor: vuejs.ComponentOption = {
    template: `<div class="m2c-content-constructor">
    </div>`
};

/**
 * Since it is the last layer of M2C frontend integration in Magento, we can
 * finally initialize Vue here.
 */
new Vue( {
    el: 'body',
    components: {
        'm2c-content-constructor': m2cContentConstructor
    }
} );

/**
 * Export Vue component object so we can test it.
 * @type {vuejs.ComponentOption}
 */
export default m2cContentConstructor;
