import {IScrollUpArrow, ScrollUpArrow} from './class.cs-scroll-up-arrow';

// demo

let arrow: IScrollUpArrow = null;

arrow = new ScrollUpArrow($('.cs-scroll-up-arrow'), {
    scrollingSpeed: 500,
    scrollTo: 0,
    classes: {
        visible: 'cs-scroll-up-arrow--is-visible',
    },
});

arrow.init();

$(window).on('scroll', () => {
    if ($(window).scrollTop() > 250) {
        if (!arrow.isVisible()) {
            arrow.show();

        }
    } else {
        if (arrow.isVisible()) {
            arrow.hide();

        }
    }
});

export default arrow;
