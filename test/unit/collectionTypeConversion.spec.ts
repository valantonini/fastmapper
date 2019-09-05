import FastMapper from "@/FastMapper";
import { expect } from "chai";

describe("Collection mapping", () => {

  it("should map and convert array if a converter exists", () => {
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
      prop: [new ChildSource("source")],
    };

    const destination = {
      prop: undefined,
    };

    new FastMapper()
      .withConversion(ChildSource, ChildDestination)
      .map(source, destination);

    const actual = (destination.prop!)[0] as any;
    expect(actual instanceof ChildDestination, "element 0 of destination.prop is not an instanceof ChildDestination").to.equal(true);
    expect( actual.childProp, "element 0 of destination.prop's childProp does not have correct value").to.equal("source");
  });

  it("should map and convert an array of different type objects if a converter exists", () => {
    // tslint:disable
    class ChildSource1 {
      childProp = "";
      constructor(val: any){
        this.childProp = val;
      }
    }

    class ChildSource2 {
      childProp = "";
      constructor(val: any){
        this.childProp = val;
      }
    }

    class ChildDestination1 {
      childProp = "";
      constructor(val?: any){
        this.childProp = val;
      }
    }
    class ChildDestination2 {
      childProp = "";
      constructor(val?: any){
        this.childProp = val;
      }
    }
    // tslint:enable

    const source = {
      prop: [new ChildSource1("source1"), new ChildSource2("source2")],
    };

    const destination = {
      prop: undefined,
    };

    new FastMapper()
      .withConversion(ChildSource1, ChildDestination1)
      .withConversion(ChildSource2, ChildDestination2)
      .map(source, destination);

    const firstElement = (destination.prop!)[0] as any;
    expect(firstElement instanceof ChildDestination1, "element 0 of destination.prop is not an instanceof ChildDestination1").to.equal(true);
    expect(firstElement.childProp, "element 0 of destination.prop's childProp does not have correct value").to.equal("source1");

    const secondElement = (destination.prop!)[1] as any;
    expect(secondElement instanceof ChildDestination2, "element 1 of destination.prop is not an instanceof ChildDestination1").to.equal(true);
    expect(secondElement.childProp, "element 1 of destination.prop's childProp does not have correct value").to.equal("source2");
  });

});
