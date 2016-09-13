import $ from '../../../node_modules/jquery/dist/jquery.min.js';

import {IOverlay, IOverlaySettings, Overlay} from '../../class.cs-overlay';

describe('Component object: ', function (): void {
    let overlay: IOverlay = null;
    let overlayHTML: string = '<div class="cs-overlay"></div>';
    let $overlayNode: JQuery = null;

    let overlaySettings: IOverlaySettings = {
        $element: $overlayNode,
        visibleClass: 'cs-overlay--is-visible',
    };

    beforeEach(function (): void {
        $overlayNode = $(overlayHTML);

        overlaySettings.$element = $overlayNode;

        overlay = new Overlay(overlaySettings);
    });

    it('has show method', function (): void {
        expect(typeof overlay.show).toBe('function');
    });

    it('has hide method', function (): void {
        expect(typeof overlay.hide).toBe('function');
    });

    it('has isVisible method', function (): void {
        expect(typeof overlay.isVisible).toBe('function');
    });

    it('calls proper callback on show', function (done: Function): void {
        overlaySettings.onShow = function (): void {
            done();
        };

        overlay = new Overlay(overlaySettings);

        overlay.show();
    });

    it('calls proper callback on hide', function (done: Function): void {
        overlaySettings.onHide = function (): void {
            done();
        };

        overlay = new Overlay(overlaySettings);

        overlay.hide();
    });

    it('hides overlay after hide() method', function (): void {
        overlay.hide();
        expect($overlayNode.is(':hidden'));
    });

    it('shows overlay after show() method', function (): void {
        overlay.hide();
        overlay.show();
        expect($overlayNode.is(':visible'));
    });

});
