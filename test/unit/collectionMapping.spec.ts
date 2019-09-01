import FastMapper from "@/FastMapper";
import { expect } from "chai";

describe("Collection mapping", () => {

  it("should map a string array to an empty destination array", () => {
    const source = {
      prop: ["a", "b", "c"],
    };

    const destination = {
      prop: [],
    };

    new FastMapper().map(source, destination);

    expect(destination.prop).to.eql(["a", "b", "c"]);
  });

  it("should map a string array to an undefined destination array", () => {
    const source = {
      prop: ["a", "b", "c"],
    };

    const destination = {
      prop: undefined,
    };

    new FastMapper().map(source, destination);

    expect(destination.prop).to.eql(["a", "b", "c"]);
  });

});
