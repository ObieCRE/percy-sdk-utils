"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.logger = logger;
// Used when determining if a message should be logged
const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

// Create a small logger util using the specified namespace
function logger(namespace) {
  return Object.keys(LOG_LEVELS).reduce((ns, lvl) => Object.assign(ns, {
    [lvl]: (...a) => logger.log(namespace, lvl, ...a)
  }), {});
}
Object.assign(logger, {
  // Set and/or return the local loglevel
  loglevel: (lvl = logger.loglevel.lvl) => {
    return logger.loglevel.lvl = lvl || process.env.PERCY_LOGLEVEL || 'info';
  },
  // Track and send/write logs for the specified namespace and log level
  log: (ns, lvl, msg, meta) => {
    let err = typeof msg !== 'string' && (lvl === 'error' || lvl === 'debug');

    // check if the specific level is within the local loglevel range
    if (LOG_LEVELS[lvl] != null && LOG_LEVELS[lvl] >= LOG_LEVELS[logger.loglevel()]) {
      let debug = logger.loglevel() === 'debug';
      let label = debug ? `percy:${ns}` : 'percy';

      // colorize the label when possible for consistency with the CLI logger
      if (!process.env.__PERCY_BROWSERIFIED__) label = `\u001b[95m${label}\u001b[39m`;
      msg = `[${label}] ${err && debug && msg.stack || msg}`;
      if (process.env.__PERCY_BROWSERIFIED__) {
        // use console[warn|error|log] in browsers
        console[['warn', 'error'].includes(lvl) ? lvl : 'log'](msg);
      } else {
        // use process[stdout|stderr].write in node
        process[lvl === 'info' ? 'stdout' : 'stderr'].write(msg + '\n');
      }
    }
  }
});
var _default = logger;
exports.default = _default;