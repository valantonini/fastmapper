import fastmapper from "@/index";
import { expect } from "chai";

describe("Mapping primitive", () => {

  it("should map a string correctly", () => {
    const source = {
      prop: "source",
    };

    const destination = {
      prop: "dest",
    };

    fastmapper(destination, source);

    expect(destination.prop).to.equal("source");
  });

  it("should not create a property on the destination", () => {
    const source = {
      prop: "source",
    };

    const destination = {};

    fastmapper(destination, source);

    expect(source).to.have.property("prop");
    expect(destination).to.not.have.property("prop");
  });

  it("should not map when type does not match", () => {
    const source = {
      prop: "one",
    };

    const destination = {
      prop: 2,
    };

    fastmapper(destination, source);

    expect(destination.prop).to.equal(2);
    expect(typeof destination.prop).to.equal("number");
    expect(typeof source.prop).to.equal("string");
  });

});
