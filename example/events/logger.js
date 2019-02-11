const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(msg) {
        console.log("Logging : " + msg);
        this.emit("Logger");
    }
}

module.exports = Logger;