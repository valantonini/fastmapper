import Logger from "./NullLogger";

export default class FastMapper {
    private s: any = {};
    private d: any = {};

    public map(source: any, destination: any) {
        const propertyNames = Object.keys(destination);

        for (const propertyName of propertyNames) {

            Logger.debug(`Mapping property ${propertyName}`);

            if (typeof destination[propertyName] !== typeof source[propertyName]) {

                Logger.debug(`Source constructor name ${source[propertyName].constructor.name}`);
                if (source[propertyName].constructor.name === this.s.name) {
                    Logger.debug("Type can be converted");
                    const g = this.d();
                    Logger.debug(`made a ${g.constructor.name}`);
                }

                Logger.debug(`Property ${propertyName} are of different types. skipping...`);
                return;
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

                return;
            }

            destination[propertyName] = source[propertyName];
        }

    }

    public withConversion(source: any, destination: any): FastMapper {
        Logger.debug(`source conversion name ${source.name}`);
        Logger.debug(`destination conversion name ${destination().constructor.name}`);
        this.d = destination;
        this.s = source;
        return this;
    }

}
