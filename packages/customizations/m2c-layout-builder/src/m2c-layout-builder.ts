import ccLayoutBuilder from '../../../components/cc-layout-builder/src/cc-layout-builder';

import $t from 'mage/translate';
import confirm from 'Magento_Ui/js/modal/confirm';

import template from './m2c-layout-builder.tpl';

/**
 * Single component information interface.
 */
interface IComponentInformation {
    name: string;
    id: string;
    type: string;
    data?: any;
}

/**
 * Layout builder component - M2 implementation.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
const m2cLayoutBuilder: vuejs.ComponentOption = {
    template,
    mixins: [
        ccLayoutBuilder,
    ],
    methods: {
        deleteComponent( index: number ): void {
            const component: any = this;
            confirm( {
                content: $t( 'Are you sure you want to delete this item?' ),
                actions: {
                    confirm(): void {
                        component.components.splice( index, 1 );
                        component.$dispatch( 'cc-layout-builder__update' );
                    },
                },
            } );
        },
    },
};

export default m2cLayoutBuilder;
export { m2cLayoutBuilder, IComponentInformation };
