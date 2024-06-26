"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.waitForPercyIdle = waitForPercyIdle;
var _request = _interopRequireDefault(require("./request.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RETRY_ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT'];
async function waitForPercyIdle() {
  try {
    return !!(await (0, _request.default)('/percy/idle'));
  } catch (e) {
    return RETRY_ERROR_CODES.includes(e.code) && waitForPercyIdle();
  }
}
var _default = waitForPercyIdle;
exports.default = _default;