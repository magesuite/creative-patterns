import $ from 'jquery';

import ccProductCarouselConfigurator from '../../../components/cc-product-carousel-configurator/src/cc-product-carousel-configurator';
import ccCategoryPicker from '../../../components/cc-category-picker/src/cc-category-picker';

/**
 * M2C Product carousel component for admin panel.
 * This component is responsible for managing product carousel's configuration
 */
const m2cProductCarouselConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccProductCarouselConfigurator,
    ],
    template: '#m2c-product-carousel-form',
    props: {
        /* Obtain endpoint for getting categories data for category picker */
        categoriesDataUrl: {
            type: String,
            default: '',
        },
    },
    data(): Object {
        return {
            categoryPicker: undefined,
        };
    },
    ready(): void {
        const _this: any = this;

        // Show loader
        $( 'body' ).trigger( 'showLoadingPopup' );

        // Get categories JSON with AJAX
        this.$http.get( this.categoriesDataUrl ).then( ( response: any ): void => {
            _this.categoryPicker = new ccCategoryPicker( $( '#cp-products-carousel' ), JSON.parse( response.body ), {
                multiple: false,
            } );
            
            // Hide loader
            $( 'body' ).trigger( 'hideLoadingPopup' );
        } );
    },
};

export default m2cProductCarouselConfigurator;
