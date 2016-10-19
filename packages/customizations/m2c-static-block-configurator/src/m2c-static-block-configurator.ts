import ccStaticBlockConfigurator from '../../../components/cc-static-block-configurator/src/cc-static-block-configurator';

const m2cStaticBlockConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccStaticBlockConfigurator,
    ],
    template: '#m2c-static-blocks-form',
};

export default m2cStaticBlockConfigurator;
