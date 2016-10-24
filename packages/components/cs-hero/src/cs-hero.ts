import $ from 'jQuery';

import csTeaser from '../../cs-teaser/src/cs-teaser';

// Initialize hero carousels

const init: any = function(): void {
    $( '.cs-hero' ).each( function(): Object {
        return new csTeaser( $( this ), {
            teaserName: 'cs-hero',
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: '5000',
            paginationBreakpoint: 1,
            // loop: true, <-- Doesn't work - bug with number calculation
        } );
    } );
};

export { init };
