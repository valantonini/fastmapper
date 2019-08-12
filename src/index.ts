export default function fastmapper(destination: any, source: any) {
    Object.keys(destination)
            .forEach( (key: string) => {
                destination[key] = source[key];
            });
}
