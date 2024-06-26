"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.fetchPercyDOM = fetchPercyDOM;
var _percyInfo = _interopRequireDefault(require("./percy-info.js"));
var _request = _interopRequireDefault(require("./request.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Fetch and cache the @percy/dom script
async function fetchPercyDOM() {
  if (_percyInfo.default.domScript == null) {
    let response = await (0, _request.default)('/percy/dom.js');
    _percyInfo.default.domScript = response.body;
  }
  return _percyInfo.default.domScript;
}
var _default = fetchPercyDOM;
exports.default = _default;