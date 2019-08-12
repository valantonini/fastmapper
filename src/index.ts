export default function fastmapper(destination: any, source: any) {
    Object.keys(destination)
            .forEach( (key: string) => {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    destination[key] = source[key];
                }
            });
}
