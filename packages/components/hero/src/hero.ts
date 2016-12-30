import $ from 'jquery';

import csTeaser from '../../teaser/src/teaser';

/**
 * component options interface.
 * Please refer to swiper documentation and our teaser component for more options and callbacks
 */
interface HeroOptions {
    /**
     * HTML Class of the component
     * @type {string}
     * @default 'cs-products-promo'
     */
    teaserName?: string;

    /**
     * Slides per viewport
     * @type {string: 'auto' / number}
     * @default 'auto'
     */
    slidesPerView?: any;

    /**
     * Space between slides (in px)
     * @type {number}
     * @default 10
     */
    spaceBetween?: number;

    /**
     * Tells if slides should be centered relative to viewport
     * @type {boolean}
     * @default true
     */
    centeredSlides?: boolean;

    /**
     * Autoplay in miliseconds
     * @type {number}
     * @default 5000
     */
    autoplay?: number;

    /**
     * Tells component if height of slider should be automatically adjusted every slide 
     * to the height of the highest visible slide
     * or if false, height will be set permanently to the height of the highest slide in whole component
     * @type {boolean}
     * @default true
     */
    autoHeight?: number;

    /**
     * Allows to set point where pagination is a set of bullets or fraction type
     * @type {number}
     * @default 50
     */
    paginationBreakpoint?: number;

    /**
     * If prev/next slide is visible, tells if click on any of them should swiper to it
     * @type {boolean}
     * @default true
     */
    slideToClickedSlide?: boolean;

    /**
     * Stop autoplay on any interaction. 
     * Hover pauses autoplay, while any click inside hero will stop it permanently
     * @type {boolean}
     * @default true
     */
    pauseAutoplayOnHover?: boolean;

    /**
     * Tells if slides should be looped
     * @type {boolean}
     * @default true
     */
    loop?: boolean;

    /**
     * Tells if swiper should automatically calculate slides based on width of slides
     * @type {boolean}
     * @default false
     */
    calculateSlides: boolean;

    /**
     * Tells if swiper should automatically round decimals in pixels
     * @type {boolean}
     * @default true
     */
    roundLengths: boolean;

    callbacks?: {
        /**
         * Fires right after hero has been initialized (once) 
         * @type {function}
         */
        onInit?: any;
    };
};

export default class Hero {
    protected _$element: JQuery;

    /**
     * Creates new Hero component with optional settings.
     * @param {$element} Optional, element to be initialized as Hero component
     * @param {options}  Optional settings object.
     */
    public constructor( $element?: JQuery, options?: HeroOptions ) {
        const teaserName: string = ( options && options.teaserName ) || 'cs-hero';
        const pauseAutoplayOnHover: boolean = ( options && options.pauseAutoplayOnHover ) ? options.pauseAutoplayOnHover : true;

        this._options = $.extend( {
            teaserName: teaserName,
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true,
            autoplay: 5000,
            autoHeight: true,
            paginationBreakpoint: 50,
            slideToClickedSlide: true,
            loop: true,
            calculateSlides: false,
            roundLengths: true,
            autoplayDisableOnInteraction: true,
            pauseAutoplayOnHover: pauseAutoplayOnHover,
            onInit( swiper: any ): void {
                if ( pauseAutoplayOnHover ) {
                    swiper.container.parents( `.${teaserName}` ).on( {
                        mouseover(): void {
                            swiper.pauseAutoplay();
                        },
                        mouseleave(): void {
                            if ( swiper.autoplayPaused && swiper.autoplaying ) {
                                swiper.stopAutoplay();
                                swiper.startAutoplay();
                            }
                        },
                    } );
                }

                if ( options && options.callbacks && options.callbacks.onInit && typeof options.callbacks.onInit === 'function' ) {
                    options.callbacks.onInit();
                }
            },
        }, options );

        this._$element = $element || $( `.${this._options.teaserName}` );

        this._init();
    }

    /**
     * Initializes all $element's with previously defined options
     */
    protected _init(): void {
        const _this: any = this;

        if ( this._$element.length ) {
            this._$element.each( function(): Object {
                if ( $( this ).find( `.${_this._options.teaserName}__slide` ).length > 1 ) {
                    return new csTeaser( $( this ), _this._options );
                } else {
                    $( this ).addClass( `${_this._options.teaserName}--static` );
                }
            } );
        }
    }
}
