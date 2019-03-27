const path = require('path');

const winston = require('winston');

const getNamespace = require('continuation-local-storage').getNamespace;

/**
 * Get req id.
 * @return {string} - req id.
 */
const _getReqId = function() {
  const myRequest = getNamespace('myRequest');
  return myRequest.get('reqId') || '-';
};

/**
 * Implement the logger
 * @param {object} config - The general config object.
 * @returns {object} The module.
 */
module.exports = function(config) {
  winston.configure({
    transports: [
      new (winston.transports.Console)(Object.assign({
        level:         'debug',
        filename:      path.join('./log/node.log'),
        name:          'console.info',
        maxsize:       1024 * 1024 * 10, // 10MB
        maxFiles:      1000,
        timestamp:     true,
        zippedArchive: true,
        colorize:      true
      }, config.log))/* ,
      new (winston.transports.File)(Object.assign({
        level:         'info',
        filename:      path.join('./log/node.log'),
        name:          'file.info',
        maxsize:       1024 * 1024 * 10, // 10MB
        maxFiles:      1000,
        timestamp:     true,
        zippedArchive: true,
        colorize:      true
      }, config.log))*/
    ]
  });

  winston.info('Init logger end.');
  function CustomError() {
    // Use V8's feature to get a structured stack trace
    const oldStackTrace = Error.prepareStackTrace;
    const oldLimit = Error.stackTraceLimit;
    try {
      Error.stackTraceLimit = 3; // <- we only need the top 3
      Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
      Error.captureStackTrace(this, CustomError);
      // eslint-disable-next-line no-unused-expressions
      this.stack; // invoke the getter for 'stack'
    } finally {
      Error.stackTraceLimit = oldLimit;
      Error.prepareStackTrace = oldStackTrace;
    }
  }
  function getAndFormatStackTraceElement() {
    const stack = new CustomError().stack;
    const CALLER_INDEX = 2; // <- position in stacktrace to find deepest caller
    const element = stack[CALLER_INDEX];
    const fileName = path.basename(element.getFileName());

    return `${element.getFunctionName()}(${fileName}:${element.getLineNumber()})`;
  }
  // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

  return {
    silly() {
      winston.silly(`"${_getReqId()}" ${getAndFormatStackTraceElement()}: `, ...arguments);
    },
    debug() {
      winston.debug(`"${_getReqId()}" ${getAndFormatStackTraceElement()}: `, ...arguments);
    },
    verbose() {
      winston.verbose(`"${_getReqId()}" ${getAndFormatStackTraceElement()}: `, ...arguments);
    },
    log() {
      winston.info(`"${_getReqId()}" ${getAndFormatStackTraceElement()}: `, ...arguments);
    },
    info() {
      winston.info(`"${_getReqId()}" ${getAndFormatStackTraceElement()}: `, ...arguments);
    },
    warn() {
      winston.warn(`"${_getReqId()}" ${getAndFormatStackTraceElement()}: `, ...arguments);
    },
    error() {
      winston.error(`"${_getReqId()}" ${getAndFormatStackTraceElement()}: `, ...arguments);
    }
  };
};
