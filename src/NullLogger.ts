
// tslint:disable: no-console
class NullLogger {
    public info(...args: any[]) {
        console.log(...args);
    }
    public debug(...args: any[]) {
        // omit
    }
    public error(...args: any[]) {
        console.error(...args);
    }
    public warn(...args: any[]) {
        console.warn(...args);
    }
}

export default new NullLogger();
