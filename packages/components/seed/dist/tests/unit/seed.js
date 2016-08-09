(function (exports) {
    'use strict';

    function seed(a, b) {
        return a + b;
    }
    ;

    describe("A suite is just a function", function () {
        it("and so is a spec", function () {
            expect(seed(1, 2)).toBe(3);
        });
    });

}((this.seed = this.seed || {})));
//# sourceMappingURL=seed.js.map