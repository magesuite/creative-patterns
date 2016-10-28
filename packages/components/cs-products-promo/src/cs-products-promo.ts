import $ from 'jQuery';

import csTeaser from '../../cs-teaser/src/cs-teaser';

// Initialize hero carousels

const init: any = function(): void {
    $( '.cs-products-promo' ).each( function(): Object {
        return new csTeaser( $( this ), {
            teaserName: 'cs-products-promo',
        } );
    } );
};

export { init };
