export default class FastMapper {
    public map(destination: any, source: any) {
        Object.keys(destination)
                .forEach( (key: string) => {
                    if (typeof destination[key] !== typeof source[key]) {
                        return;
                    }
                    if (typeof destination[key] === "object") {
                        this.map(destination[key], source[key]);
                        return;
                    }
                    destination[key] = source[key];
                });
    }
}
