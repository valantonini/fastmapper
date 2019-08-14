export default function fastmapper(destination: any, source: any) {
    Object.keys(destination)
            .forEach( (key: string) => {
                if (typeof destination[key] !== typeof source[key]) {
                    return;
                }

                if (typeof destination[key] === "object") {
                    fastmapper(destination[key], source[key]);
                    return;
                }

                destination[key] = source[key];
            });
}
