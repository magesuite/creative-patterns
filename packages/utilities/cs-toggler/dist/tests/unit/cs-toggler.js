(function (exports) {
'use strict';

describe('Toggler class', function () {
    var elem = '<div class="elem"></div>';
    var selector = '.elem';
    var togglerObj = null;
    var elemNode = null;
    var settings = null;
    beforeEach(function () {
        document.write(elem);
        elemNode = document.querySelector(selector)[0];
    });
    afterEach(function () {
        elemNode.remove();
    });
    // Check if component has methods
    // it('has show() method', function (): void {
    //     settings = {
    //         visibleClass: 'demoClass',
    //     };
    //     togglerObj = new Toggler(elemNode, settings);
    //
    //     expect(typeof togglerObj.show).toBe('function');
    // });
    // it('has hide() method', function (): void {
    //     settings = {
    //         visibleClass: 'demoClass',
    //     };
    //     togglerObj = new Toggler(elemNode, settings);
    //
    //     expect(typeof togglerObj.hide).toBe('function');
    // });
    //
    // it('has isVisible() method', function (): void {
    //     settings = {
    //         visibleClass: 'demoClass',
    //     };
    //     togglerObj = new Toggler(elemNode, settings);
    //
    //     expect(typeof togglerObj.isVisible).toBe('function');
    // });
    //
    // it('has toggle() method', function (): void {
    //     settings = {
    //         visibleClass: 'demoClass',
    //     };
    //     togglerObj = new Toggler(elemNode, settings);
    //
    //     expect(typeof togglerObj.toggle).toBe('function');
    // });
    //
    // // Check if proper types are returned
    //
    // it('isVisible() method returns boolean', function (): void {
    //     settings = {
    //         visibleClass: 'demoClass',
    //     };
    //     togglerObj = new Toggler(elemNode, settings);
    //
    //     expect(typeof togglerObj.isVisible()).toBe('boolean');
    // });
    //
    // it('isHidden() method returns boolean', function (): void {
    //     settings = {
    //         visibleClass: 'demoClass',
    //     };
    //     togglerObj = new Toggler(elemNode, settings);
    //
    //     expect(typeof togglerObj.isHidden()).toBe('boolean');
    // });
});

}((this.csToggler = this.csToggler || {})));
//# sourceMappingURL=cs-toggler.js.map
