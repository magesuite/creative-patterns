import $ from '../../../node_modules/jquery/dist/jquery.js';

import {IScrollUpArrow, IScrollUpArrowSettings, ScrollUpArrow} from '../../class.cs-scroll-up-arrow';

describe('Scrollup arrow component: ', function (): void {

    let scrollupArrow: IScrollUpArrow = null;
    let scrollupArrowHtml: string = `<div class="cs-scroll-up-arrow"></div>`;
    let $scrollupArrowNode: JQuery = null;

    let scrollToParameter: number = 0;
    let scrollingSpeedParameter: number = 500;
    let visibleClass: string = 'cs-scroll-up-arrow--is-visible';

    let scrollupArrowSettings: IScrollUpArrowSettings = {
        scrollTo: scrollToParameter,
        scrollingSpeed: scrollingSpeedParameter,
        classes: {
            visible: visibleClass,
        },
    };

    beforeEach(function (): void {
        $scrollupArrowNode = $(scrollupArrowHtml);

        scrollupArrow = new ScrollUpArrow($scrollupArrowNode, scrollupArrowSettings);

    });

    it('has show() method', function (): void {
        expect(typeof scrollupArrow.show).toBe('function');
    });

    it('has hide() method', function (): void {
        expect(typeof scrollupArrow.hide).toBe('function');
    });

    it('has isVisible() method', function (): void {
        expect(typeof scrollupArrow.isVisible).toBe('function');
    });

    it('has init() method', function (): void {
        expect(typeof scrollupArrow.init).toBe('function');
    });

    it('is visible after show() method', function (): void {
        scrollupArrow.hide();
        scrollupArrow.show();

        expect($scrollupArrowNode.is(':visible'));

    });

    it('is hidden after hide() method', function (): void {
        scrollupArrow.show();
        scrollupArrow.hide();

        expect($scrollupArrowNode.is(':hidden'));

    });

    it('is is returning false after isVisible is called and component is not visible', function (): void {
        // not visible by default

        expect(!scrollupArrow.isVisible());

    });

    it('is is returning true after isVisible is called and component is visible', function (): void {

        scrollupArrow.show();

        expect(scrollupArrow.isVisible());

    });

    it('is scrolling after scroll() method', function (done: Function): void {
        let $win: JQuery = $(window);
        $win.scrollTop(500);

        scrollupArrow.scroll();

        setTimeout(() => {
            expect($win.scrollTop()).toEqual(scrollToParameter);
            done();
        }, scrollingSpeedParameter);

    });

    it('is scrolling to X point after scroll(X) method', function (done: Function): void {
        let $win: JQuery = $(window);
        let x: number = 300;
        $win.scrollTop(100);

        scrollupArrow.scroll(x);

        setTimeout(() => {
            expect($win.scrollTop()).toEqual(x);
            done();

        }, scrollingSpeedParameter);

    });

});
