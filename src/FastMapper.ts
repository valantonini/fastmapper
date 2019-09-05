import { Newable } from "@/Newable";

export default class FastMapper {
    private typeConverters: Map<string, Newable<any>> = new Map();

    public map(source: any, destination: any) {
        const propertyNames = Object.keys(destination);

        for (const propertyName of propertyNames) {

            if (typeof source[propertyName] === "object") {

                if (Array.isArray(source[propertyName])) {
                    destination[propertyName] = this.mapArray(source[propertyName], destination[propertyName]);
                    continue;
                }

                if (typeof destination[propertyName] !== typeof source[propertyName]) {

                    const insanceOfDestinationType = this.createDestinationType(source[propertyName], this.typeConverters);
                    if (insanceOfDestinationType) {
                        destination[propertyName] = insanceOfDestinationType;
                    } else {
                        // can't map?
                        continue;
                    }
                }

                this.map(source[propertyName], destination[propertyName]);

            } else {
                if (destination[propertyName] === undefined || typeof destination[propertyName] === typeof source[propertyName]) {
                    destination[propertyName] = source[propertyName];
                }
            }

        }
    }

    public withConversion<T1, T2>(source: Newable<T1>, destination: Newable<T2>): FastMapper {
        this.typeConverters.set(source.name, destination);
        return this;
    }

    private createDestinationType<T1>(sourceTypeName: Newable<T1>, typeConverters: Map<string, Newable<any>>): any | undefined {
        const mappingDestinationConstructor = typeConverters.get(sourceTypeName.constructor.name);

        if (mappingDestinationConstructor) {
            return new mappingDestinationConstructor();
        } else {
            return undefined;
        }
    }

    private mapArray(source: any[], destination: any[]): any[] {
        if (destination === undefined) {
            destination = [];
        }

        for (const value of source) {
            if (typeof value !== "object") {
                destination.push(value);
            } else {
                const convertedTarget = this.createDestinationType(value, this.typeConverters);
                if (convertedTarget !== undefined) {
                    this.map(value, convertedTarget);
                    destination.push(convertedTarget);
                }
            }
        }
        return destination;
    }
}
