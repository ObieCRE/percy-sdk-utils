"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.request = request;
var _percyInfo = _interopRequireDefault(require("./percy-info.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function cylog(message, meta) {
  Cypress.log({
    name: 'percySnapshot',
    displayName: 'percysdkutils',
    consoleProps: () => meta,
    message
  });
}
// Helper to send a request to the local CLI API
async function request(path, options = {}) {
  let url = path.startsWith('http') ? path : `${_percyInfo.default.address}${path}`;
  let response = await request.fetch(url, options);

  cylog(response);
  cylog(JSON.stringify(response, null, 2));
  cylog(JSON.stringify(response.body));
  // maybe parse response body as json
  if (typeof response.body === 'string' && response.headers['content-type'] === 'application/json') {
    try {
      response.body = JSON.parse(response.body);
    } catch (e) {}
  }

  // throw an error if status is not ok
  if (!(response.status >= 200 && response.status < 300)) {
    throw Object.assign(new Error(), {
      message: response.body.error || /* istanbul ignore next: in tests, there's always an error message */
      `${response.status} ${response.statusText}`,
      response
    });
  }
  return response;
}
request.post = function post(url, json) {
  cylog('in utils request 1');
  console.log('in utils request 2')
  console.log(JSON.stringify(json))
  return request(url, {
    method: 'POST',
    body: JSON.stringify(json),
    timeout: 600000
  });
};

// environment specific implementation
if (process.env.__PERCY_BROWSERIFIED__) {
  cylog('hello 1');

  // use window.fetch in browsers
  const winFetch = window.fetch;
  request.fetch = async function fetch(url, options) {
    let response = await winFetch(url, options);
    return {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: await response.text()
    };
  };
} else {
  cylog('hello 2');
  // use http.request in node
  request.fetch = async function fetch(url, options) {
    let {
      protocol
    } = new URL(url);
    // rollup throws error for -> await import(protocol === 'https:' ? 'https' : 'http')
    let {
      default: http
    } = protocol === 'https:' ? await Promise.resolve().then(() => _interopRequireWildcard(require('https'))) : await Promise.resolve().then(() => _interopRequireWildcard(require('http')));
    return new Promise((resolve, reject) => {
      http.request(url, options).on('response', response => {
        let body = '';
        response.on('data', chunk => body += chunk.toString());
        response.on('end', () => resolve({
          status: response.statusCode,
          statusText: response.statusMessage,
          headers: response.headers,
          body
        }));
      }).on('error', reject).end(options.body);
    });
  };
}
var _default = request;
exports.default = _default;