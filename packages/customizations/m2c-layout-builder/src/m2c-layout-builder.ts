import ccLayoutBuilder from '../../../components/cc-layout-builder/src/cc-layout-builder';

import m2cParagraphConfigurator from '../../m2c-paragraph-configurator/src/m2c-paragraph-configurator';

import $t from 'mage/translate';
import confirm from 'Magento_Ui/js/modal/confirm';

import template from './m2c-layout-builder.tpl';

/**
 * Single component information interface.
 */
interface IComponentInformation {
    name: string;
    id: string;
    section: string;
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
    /**
     * Get dependencies
     */
    components: {
        'm2c-paragraph-configurator': m2cParagraphConfigurator,
    },
    methods: {
        /* Removes component from M2C
         * If it's paragraph that is about to be removed, asks if corresponding CMS Block shall be removed as well
         * @param index {number} - index of the component in layoutBuilder
         */
        deleteComponent( index: number ): void {
            const builder: any = this;

            confirm( {
                content: $t( 'Are you sure you want to delete this item?' ),
                actions: {
                    confirm(): void {
                        const component: any = builder.components[ index ];

                        builder.components.splice( index, 1 );

                        if ( component.type === 'paragraph' ) {
                            builder.deleteStaticBlock( component.data.blockId );
                        }

                        builder.$dispatch( 'cc-layout-builder__update' );
                    },
                },
            } );
        },

        deleteStaticBlock( cmsBlockId: string ): void {
            const component: any = this;

            confirm( {
                content: $t( 'Would you like to delete CMS Block related to this component (CMS Block ID: %s) ?' ).replace( '%s', cmsBlockId ),
                actions: {
                    confirm(): void {
                        component.$dispatch( 'cc-layout-builder__cmsblock-delete-request', cmsBlockId );
                    },
                },
            } );
        },

        getTranslatedText( originalText: string ): string {
            return $t( originalText );
        },
    },
};

export default m2cLayoutBuilder;
export { m2cLayoutBuilder, IComponentInformation };
