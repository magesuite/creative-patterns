import $ from 'jQuery';

import csTeaser from '../../cs-teaser/src/cs-teaser';

// Initialize hero carousels

const init: any = function(): void {
    $( '.cs-product-carousel' ).each( function(): Object {
        return new csTeaser( $( this ), {
            teaserName: 'cs-product-carousel',
        } );
    } );
};

export { init };
