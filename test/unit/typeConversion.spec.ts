
import FastMapper from "@/FastMapper";
import { expect } from "chai";

describe("Type conversion", () => {

  it("should convert a type correctly", () => {
    // tslint:disable
    class ChildSource {
      childProp = "";
      constructor(val: any){
        this.childProp = val;
      }
    }

    class ChildDestination {
      childProp = "";
      constructor(val?: any){
        this.childProp = val;
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
      .withConversion(ChildSource, ChildDestination)
      .map(source, destination);

    expect((destination.prop as any) instanceof ChildDestination).to.equal(true);
    expect( (destination.prop as any).childProp).to.equal("source");
  });

});
