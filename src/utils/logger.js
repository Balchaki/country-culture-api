const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, splat } = format;

class Logger {
    constructor(options = {}) {
        const {
            level = process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            console = true,
            file = process.env.NODE_ENV === 'production',
            filename = 'app.log'
        } = options;

        const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
            let metaStr = '';
            if (metadata && Object.keys(metadata).length > 0) {
                metaStr = JSON.stringify(metadata);
            }
            return `[${timestamp}] ${level}: ${message} ${metaStr}`;
        });

        const logTransports = [];

        if (console) {
            logTransports.push(new transports.Console({
                format: combine(
                    colorize(),
                    splat(),
                    logFormat
                )
            }));
        }

        if (file) {
            logTransports.push(new transports.File({
                filename,
                format: combine(
                    splat(),
                    logFormat
                ),
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                tailable: true
            }));
        }
        this.logger = createLogger({
            level,
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                splat()
            ),
            transports: logTransports,
            exitOnError: false
        });

        this.logger.info('Logger inicializado');
    }

    info(message, metadata = {}) {
        this.logger.info(message, metadata);
    }

    error(message, error = {}) {
        // Formata o erro para incluir stack trace quando disponível
        const metadata = error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
                ...error
            }
            : error;

        this.logger.error(message, metadata);
    }


    debug(message, metadata = {}) {
        this.logger.debug(message, metadata);
    }

    warn(message, metadata = {}) {
        this.logger.warn(message, metadata);
    }
}

module.exports = new Logger({
    level: 0,
    console: true,
    file: process.env.NODE_ENV === 'production',
    filename: process.env.LOG_FILE || 'logs/app.log'
});
