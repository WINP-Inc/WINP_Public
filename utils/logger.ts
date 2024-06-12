class Logger {
    static instance: any;
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
        return this;
    }

    log(mess: any, data = '') {
        console.log(mess, data);
    }
}

const instance = new Logger();
Object.freeze(instance);

export default Logger;