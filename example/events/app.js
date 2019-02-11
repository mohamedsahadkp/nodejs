const Logger = require('./logger');
const logger = new Logger();

logger.on("Logger", () => {
    console.log("Event emitter called");
});

logger.log("test msg");


