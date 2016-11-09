import ccProductCarouselConfigurator from '../../../components/cc-product-carousel-configurator/src/cc-product-carousel-configurator';

/**
 * M2C Product carousel component for admin panel.
 * This component is responsible for managing product carousel's configuration
 */
const m2cProductCarouselConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccProductCarouselConfigurator,
    ],
    template: '#m2c-product-carousel-form',
};

export default m2cProductCarouselConfigurator;
