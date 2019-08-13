import fastmapper from "@/index";
import { expect } from "chai";
import { Destination, Source } from "./Objects";

describe("Mapping primitive", () => {
  let source!: Source;
  let destination!: Destination;

  beforeEach(() => {
    source = new Source();
    destination = new Destination();

    fastmapper(destination, source);
  });

  it("should map a string correctly", () => {
    expect(destination.aString).to.equal("source");
  });

  it("should not create a property on the destination", () => {
    expect(destination).to.not.have.property("onlyOnSource");
  });

  it("should not map when type does not match", () => {
    expect(destination.overwriteNumberWithString).to.equal(2);
    expect(typeof destination.overwriteNumberWithString).to.equal("number");
  });

});
