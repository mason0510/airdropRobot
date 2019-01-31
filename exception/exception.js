const log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: 'airdrop/exception/application.log' }
    },
    categories: {
        default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
});

let logger = log4js.getLogger('cheese');

module.exports = logger;
<<<<<<< HEAD
// logger.debug("aaaa")
=======
logger.debug("aaaa")
>>>>>>> d38da3035aaf8501c258928302d18c36b2320fe7
