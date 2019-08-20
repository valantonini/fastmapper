
// tslint:disable: no-console
class Logger {
    public info(...args: any[]) {
        console.log(...args);
    }
    public debug(...args: any[]) {
        console.debug(...args);
    }
    public error(...args: any[]) {
        console.error(...args);
    }
    public warn(...args: any[]) {
        console.warn(...args);
    }
}

export default new Logger();
