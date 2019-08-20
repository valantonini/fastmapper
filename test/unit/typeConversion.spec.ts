
import FastMapper from "@/FastMapper";
import { expect } from "chai";

describe("Type conversion", () => {

  it("should convert a type correctly", () => {
    // tslint:disable
    class ChildSource {
      prop = "";
      constructor(val: any){
        this.prop = val;
      }
    }

    class ChildDestination {
      prop = "";
      constructor(val?: any){
        this.prop = val;
      }
    }
    // tslint:enable

    const source = {
      prop: new ChildSource("source"),
    };

    const destination = {
      prop: undefined,
    };

    new FastMapper()
      .withConversion(ChildSource, () => new ChildDestination() )
      .map(source, destination);
  });

});
