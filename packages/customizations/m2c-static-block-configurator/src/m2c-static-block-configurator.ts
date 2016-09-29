import ccStaticBlockConfigurator from '../../../components/cc-static-block-configurator/src/cc-static-block-configurator';

const m2cStaticBlockConfigurator: vuejs.ComponentOption = {
    template: '#m2c-static-blocks-form',
    mixins: [
        ccStaticBlockConfigurator,
    ],
};

export default m2cStaticBlockConfigurator;
