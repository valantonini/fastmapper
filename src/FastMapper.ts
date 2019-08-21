import Logger from "./NullLogger";

export default class FastMapper {
    private s!: Newable<any>;
    private d!: Newable<any>;

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

                // has a conversion
                if (this.s && source[propertyName].constructor.name === this.s.name) {
                    Logger.debug("Type can be converted");
                    Logger.debug(`Instantiating a ${this.d.name}`);
                    destination[propertyName] = new this.d();
                    this.map(source[propertyName], destination[propertyName]);
                    continue;
                }

                // tslint:disable-next-line: max-line-length
                Logger.debug(`Property ${propertyName} are of different types ${typeof source[propertyName]} ${typeof destination[propertyName]}. skipping...`);
                continue;
            }

            if (typeof destination[propertyName] === "object") {
                Logger.debug("Mapping object");
                if (!destination[propertyName]) {

                    Logger.debug(`Destination ${propertyName} is null. Constructing...`);

                    if (source[propertyName] instanceof this.s.constructor) {
                        destination[propertyName] = Object.create(this.d.prototype);
                    }
                }

                this.map(source[propertyName], destination[propertyName]);

                continue;
            }

            destination[propertyName] = source[propertyName];
        }

    }

    public withConversion<T1, T2>(source: Newable<T1>, destination: Newable<T2>): FastMapper {
        this.d = destination;
        this.s = source;
        return this;
    }

}

// tslint:disable-next-line: max-classes-per-file
export type Newable<T> = new (...args: any[]) => T;
