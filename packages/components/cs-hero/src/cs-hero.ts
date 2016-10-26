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
            autoHeight: true,
            paginationBreakpoint: 1,
            onClick( swiper: any, event: Event ): void {
                swiper.stopAutoplay();
                swiper.wasInteracted = true;
            },
            onInit( swiper: any ): void {
                swiper.wasInteracted = false;

                $( `.${swiper.params.bulletClass}` ).on( 'click', function(): void {
                    if ( !swiper.wasInteracted ) {
                        swiper.startAutoplay();
                    }
                } );

                swiper.container.on( {
                    mouseover(): void {
                        swiper.stopAutoplay();
                    },
                    mouseleave(): void {
                        if ( !swiper.wasInteracted ) {
                            swiper.startAutoplay();
                        }
                    },
                } );
            },
            // loop: true, <-- Doesn't work - bug with number calculation
        } );
    } );
};

export { init };
