import fastmapper from "@/index";
import { expect } from "chai";
import { Destination, Source } from "./Objects";

describe("Mapping primitive", () => {
  const result: any = {};

  beforeEach(() => {
    const source = new Source();
    const destination = new Destination();

    fastmapper(destination, source);
  });

  it("should map a string correctly", () => {
    // expect(Add(2, 3)).to.equal(5);
  });

});
