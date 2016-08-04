import { seed } from '../../seed';

describe("A suite is just a function", function() {
  it("and so is a spec", function() {
    expect(seed(1, 2)).toBe(3);
  });
});
