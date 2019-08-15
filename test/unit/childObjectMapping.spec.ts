
import FastMapper from "@/FastMapper";
import { expect } from "chai";

describe("Object mapping", () => {

  it("should map a child object correctly", () => {
    const source = {
      prop: {
        prop: "source",
      },
    };

    const destination = {
      prop: {
        prop: "destination",
      },
    };

    new FastMapper().map(destination, source);

    expect(destination.prop.prop).to.equal("source");
  });

  it("should map a child object correctly and preserve type", () => {
    // tslint:disable
    class ChildSource {
      prop = "";
      constructor(val: any){
        this.prop = val;
      }
    }

    class ChildDestination {
      prop = "";
      constructor(val: any){
        this.prop = val;
      }
    }
    // tslint:enable

    const source = {
      prop: new ChildSource("source"),
    };

    const destination = {
      prop: new ChildDestination("destination"),
    };

    new FastMapper().map(destination, source);

    expect(source.prop instanceof ChildSource).to.equal(true);
    expect(destination.prop instanceof ChildDestination).to.equal(true);
  });

});
