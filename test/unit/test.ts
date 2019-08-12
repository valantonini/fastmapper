import Add from "@/index";
import { expect } from "chai";

describe("Add()", () => {
  it("should add correctly", () => {
    expect(Add(2, 3)).to.equal(5);
  });
});
