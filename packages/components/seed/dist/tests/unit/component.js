(function (exports) {
    'use strict';

    function component(a, b) {
        return a + b;
    }
    ;

    describe("A suite is just a function", function () {
        it("and so is a spec", function () {
            expect(component(1, 2)).toBe(3);
        });
    });

}((this.seed = this.seed || {})));
//# sourceMappingURL=component.js.map