import { Newable } from "@/Newable";

export default class FastMapper {
    private typeConverters: Map<string, Newable<any>> = new Map();

    public map(source: any, destination: any) {
        const propertyNames = Object.keys(destination);

        for (const propertyName of propertyNames) {

            if (Array.isArray(source[propertyName])) {
                if (destination[propertyName] === undefined) {
                    destination[propertyName] = [];
                }

                for (const value of source[propertyName]) {
                    if (typeof value !== "object") {
                        destination[propertyName].push(value);
                    } else {
                        const convertedTarget = this.createDestinationType(value, this.typeConverters);
                        if (convertedTarget) {
                            this.map(value, convertedTarget);
                            destination[propertyName].push(convertedTarget);
                        }
                    }
                }
                continue;
            }

            if (typeof source[propertyName] === "object") {

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

    private createDestinationType<T1>(sourceTypeName: Newable<T1>, typeConverters: Map<string, Newable<any>>) {
        const mappingDestinationConstructor = typeConverters.get(sourceTypeName.constructor.name);

        if (mappingDestinationConstructor) {
            return new mappingDestinationConstructor();
        } else {
            return undefined;
        }
    }
}
