"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "captureAutomateScreenshot", {
  enumerable: true,
  get: function () {
    return _postScreenshot.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "fetchPercyDOM", {
  enumerable: true,
  get: function () {
    return _percyDom.default;
  }
});
Object.defineProperty(exports, "flushSnapshots", {
  enumerable: true,
  get: function () {
    return _flushSnapshots.default;
  }
});
Object.defineProperty(exports, "isPercyEnabled", {
  enumerable: true,
  get: function () {
    return _percyEnabled.default;
  }
});
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function () {
    return _logger.default;
  }
});
Object.defineProperty(exports, "percy", {
  enumerable: true,
  get: function () {
    return _percyInfo.default;
  }
});
Object.defineProperty(exports, "postBuildEvents", {
  enumerable: true,
  get: function () {
    return _postBuildEvent.default;
  }
});
Object.defineProperty(exports, "postComparison", {
  enumerable: true,
  get: function () {
    return _postComparison.default;
  }
});
Object.defineProperty(exports, "postSnapshot", {
  enumerable: true,
  get: function () {
    return _postSnapshot.default;
  }
});
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function () {
    return _request.default;
  }
});
Object.defineProperty(exports, "waitForPercyIdle", {
  enumerable: true,
  get: function () {
    return _percyIdle.default;
  }
});
var _logger = _interopRequireDefault(require("./logger.js"));
var _percyInfo = _interopRequireDefault(require("./percy-info.js"));
var _request = _interopRequireDefault(require("./request.js"));
var _percyEnabled = _interopRequireDefault(require("./percy-enabled.js"));
var _percyIdle = _interopRequireDefault(require("./percy-idle.js"));
var _percyDom = _interopRequireDefault(require("./percy-dom.js"));
var _postSnapshot = _interopRequireDefault(require("./post-snapshot.js"));
var _postComparison = _interopRequireDefault(require("./post-comparison.js"));
var _postBuildEvent = _interopRequireDefault(require("./post-build-event.js"));
var _flushSnapshots = _interopRequireDefault(require("./flush-snapshots.js"));
var _postScreenshot = _interopRequireDefault(require("./post-screenshot.js"));
var _default = _interopRequireWildcard(require("./index.js"));
exports.default = _default;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }