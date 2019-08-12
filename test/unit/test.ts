import { expect } from "chai";
import Add from "../../src/index";

describe("Add()", () => {
  it("should add correctly", () => {
    expect(Add(2, 3)).to.equal(5);
  });
});
