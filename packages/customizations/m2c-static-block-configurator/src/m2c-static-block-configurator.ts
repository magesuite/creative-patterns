import ccStaticBlockConfigurator from '../../../components/cc-static-block-configurator/src/cc-static-block-configurator';

const m2cStaticBlockConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccStaticBlockConfigurator,
    ],
    template: '#m2c-static-blocks-form',
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            const selectedOption: any = this.$els.cmsBlocksSelect.options[ this.$els.cmsBlocksSelect.selectedIndex ];

            if ( this.configuration.identifier === selectedOption.value && this.configuration.identifier !== '' ) {
                this.configuration.title = selectedOption.text;
                this.onSave();
            }
        },
    },
};

export default m2cStaticBlockConfigurator;
