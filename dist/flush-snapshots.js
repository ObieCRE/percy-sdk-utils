"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.flushSnapshots = flushSnapshots;
var _percyInfo = _interopRequireDefault(require("./percy-info.js"));
var _request = _interopRequireDefault(require("./request.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Posts to the local Percy server one or more snapshots to flush. Given no arguments, all snapshots
// will be flushed. Does nothing when Percy is not enabled.
async function flushSnapshots(options) {
  if (_percyInfo.default.enabled) {
    // accept one or more snapshot names
    options && (options = [].concat(options).map(o => typeof o === 'string' ? {
      name: o
    } : o));
    await _request.default.post('/percy/flush', options);
  }
}
var _default = flushSnapshots;
exports.default = _default;