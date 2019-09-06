
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

    expect(destination.prop).to.be.an.instanceof(ChildDestination);
    expect( (destination.prop as any).childProp, "childProp does not have correct value").to.equal("source");
  });

  it("should convert multiple types correctly", () => {
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
      prop1: new ChildSource1("source1"),
      prop2: new ChildSource2("source2"),
    };

    const destination = {
      prop1: undefined,
      prop2: undefined,
    };

    new FastMapper()
      .withConversion(ChildSource1, ChildDestination1)
      .withConversion(ChildSource2, ChildDestination2)
      .map(source, destination);

    expect(destination.prop1).to.be.an.instanceof(ChildDestination1);
    expect( (destination.prop1 as any).childProp, "childProp1 does not have correct value").to.equal("source1");

    expect(destination.prop2).to.be.an.instanceOf(ChildDestination2);
    expect( (destination.prop2 as any).childProp, "childProp2 does not have correct value").to.equal("source2");
  });

  it("should convert a type correctly and preserve the functions", () => {
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

      aFunction() {
        return "function result"
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

    expect( (destination.prop as any).aFunction()).to.equal("function result");
  });

});
