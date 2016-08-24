(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define('m2CContentConstructor', ['vue'], factory) :
    (global.m2CContentConstructor = factory(global.Vue));
}(this, function (Vue) { 'use strict';

    Vue = 'default' in Vue ? Vue['default'] : Vue;

    /**
     * M2C Content Constructor component.
     */
    var m2cContentConstructor = {
        template: "<div class=\"m2c-content-constructor\">\n    </div>"
    };
    /**
     * Since it is the last layer of M2C frontend integration in Magento, we can
     * finally initialize Vue here.
     */
    new Vue({
        el: 'body',
        components: {
            'm2c-content-constructor': m2cContentConstructor
        }
    });

    return m2cContentConstructor;

}));
//# sourceMappingURL=m2c-content-constructor.js.map