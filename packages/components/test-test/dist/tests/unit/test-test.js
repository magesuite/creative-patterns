(function (exports) {
    'use strict';

    function add(a, b) {
        return a + b;
    }
    ;

    describe('A suite is just a function', function () {
        it('and so is a spec', function () {
            expect(add(1, 2)).toBe(3);
        });
    });

}((this.testTest = this.testTest || {})));
//# sourceMappingURL=test-test.js.map