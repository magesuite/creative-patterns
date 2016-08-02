import { component } from '../../component';

describe("A suite is just a function", function() {
  it("and so is a spec", function() {
    expect(component(1, 2)).toBe(3);
  });
});
