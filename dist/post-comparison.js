"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.postComparison = postComparison;
var _percyInfo = _interopRequireDefault(require("./percy-info.js"));
var _request = _interopRequireDefault(require("./request.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Post snapshot data to the CLI snapshot endpoint. If the endpoint responds with a build error,
// indicate that Percy has been disabled.
async function postComparison(options, params) {
  let query = params ? `?${new URLSearchParams(params)}` : '';
  return await _request.default.post(`/percy/comparison${query}`, options).catch(err => {
    var _err$response, _err$response$body, _err$response$body$bu;
    if ((_err$response = err.response) !== null && _err$response !== void 0 && (_err$response$body = _err$response.body) !== null && _err$response$body !== void 0 && (_err$response$body$bu = _err$response$body.build) !== null && _err$response$body$bu !== void 0 && _err$response$body$bu.error) {
      _percyInfo.default.enabled = false;
    } else {
      throw err;
    }
  });
}
var _default = postComparison;
exports.default = _default;