"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.isPercyEnabled = isPercyEnabled;
var _percyInfo = _interopRequireDefault(require("./percy-info.js"));
var _request = _interopRequireDefault(require("./request.js"));
var _logger = _interopRequireDefault(require("./logger.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Check if Percy is enabled using the healthcheck endpoint
async function isPercyEnabled() {
  if (_percyInfo.default.enabled == null) {
    let log = (0, _logger.default)('utils');
    let error;
    try {
      let response = await (0, _request.default)('/percy/healthcheck');
      _percyInfo.default.version = response.headers['x-percy-core-version'];
      _percyInfo.default.config = response.body.config;
      _percyInfo.default.build = response.body.build;
      _percyInfo.default.enabled = true;
      _percyInfo.default.type = response.body.type;
    } catch (e) {
      _percyInfo.default.enabled = false;
      error = e;
    }
    if (_percyInfo.default.enabled && _percyInfo.default.version.major !== 1) {
      log.info('Unsupported Percy CLI version, disabling snapshots');
      log.debug(`Found version: ${_percyInfo.default.version}`);
      _percyInfo.default.enabled = false;
    } else if (!_percyInfo.default.enabled) {
      log.info('Percy is not running, disabling snapshots');
      log.debug(error);
    }
  }
  return _percyInfo.default.enabled;
}
var _default = isPercyEnabled;
exports.default = _default;