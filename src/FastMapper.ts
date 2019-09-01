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
                   destination[propertyName].push(value);
               }
               continue;
            }

            if (typeof source[propertyName] === "object") {

                if (typeof destination[propertyName] !== typeof source[propertyName]) {

                    const mappingDestinationConstructor = this.typeConverters.get(source[propertyName].constructor.name);

                    if (mappingDestinationConstructor) {
                        destination[propertyName] = new mappingDestinationConstructor();
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
}
