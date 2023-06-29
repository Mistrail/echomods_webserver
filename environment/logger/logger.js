import winston from 'winston';

const errorHandle = new winston.transports.File({
  maxsize: 65532,
  maxFiles: 5,
  filename: 'log/error.log',
  format: winston.format.combine(
    winston.format.json({
      space: 4,
    }),
  ),
  level: 'error',
});

const errorConsole = new winston.transports.Console({
  level: 'error',
  format: winston.format.cli(),
});

const logger = winston.createLogger({
  handleExceptions: true,
  exitOnError: false,
  exceptionHandlers: [errorHandle, errorConsole],
});

export default logger;
