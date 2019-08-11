import { expect } from "chai";
import Add from "../../src/index";

describe('Add()', function() {
  it('should add correctly', function() {
    expect(Add(2,3)).to.equal(5);
  });
});