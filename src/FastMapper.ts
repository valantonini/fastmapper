import Logger from "./NullLogger";

export default class FastMapper {
    private typeConverters: Map<string, Newable<any>> = new Map();

    public map(source: any, destination: any) {
        const propertyNames = Object.keys(destination);

        Logger.debug(`Mapping keys ${propertyNames.join(",")}`);

        for (const propertyName of propertyNames) {
            Logger.debug(`Mapping property ${propertyName}`);

            if (typeof source[propertyName] !== "object" && destination[propertyName] === undefined) {
                destination[propertyName] = source[propertyName];
                continue;
            }

            if (typeof destination[propertyName] !== typeof source[propertyName]) {

                Logger.debug(`Source constructor name ${source[propertyName].constructor.name}`);

                const mappingDestinationConstructor = this.typeConverters.get(source[propertyName].constructor.name);
                Logger.debug(`mappingDestinationConstructor: ${mappingDestinationConstructor}`);
                // has a conversion
                if (mappingDestinationConstructor) {
                    Logger.debug("Type can be converted");
                    Logger.debug(`Instantiating a ${mappingDestinationConstructor.name}`);
                    destination[propertyName] = new mappingDestinationConstructor();
                    this.map(source[propertyName], destination[propertyName]);
                    continue;
                }

                Logger.debug(`Property ${propertyName} are of different types ${typeof source[propertyName]} ${typeof destination[propertyName]}. skipping...`);
                continue;
            }

            if (typeof destination[propertyName] === "object") {
                Logger.debug("Mapping object");
                if (!destination[propertyName]) {

                    Logger.debug(`Destination ${propertyName} is null. Constructing...`);

                    const mappingDestinationConstructor = this.typeConverters.get(source[propertyName].constructor.name);

                    if (mappingDestinationConstructor) {
                        destination[propertyName] = Object.create(mappingDestinationConstructor.prototype);
                    }
                }

                this.map(source[propertyName], destination[propertyName]);

                continue;
            }

            destination[propertyName] = source[propertyName];
        }

    }

    public withConversion<T1, T2>(source: Newable<T1>, destination: Newable<T2>): FastMapper {
        this.typeConverters.set(source.name, destination);
        return this;
    }

}

// tslint:disable-next-line: max-classes-per-file
export type Newable<T> = new (...args: any[]) => T;
