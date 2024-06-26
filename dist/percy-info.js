"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// helper to create a version object from a string
function toVersion(str) {
  str || (str = '0.0.0');
  return str.split(/\.|-/).reduce((version, part, i) => {
    let v = parseInt(part, 10);
    version[i] = isNaN(v) ? part : v;
    return version;
  }, {
    get major() {
      return this[0] || 0;
    },
    get minor() {
      return this[1] || 0;
    },
    get patch() {
      return this[2] || 0;
    },
    get prerelease() {
      return this[3];
    },
    get build() {
      return this[4];
    },
    toString() {
      return str;
    }
  });
}

// private version cache
let version = toVersion();
let type;

// contains local percy info
const info = {
  // get or set the CLI API address via the environment
  get address() {
    return process.env.PERCY_SERVER_ADDRESS || 'http://localhost:5338';
  },
  set address(addr) {
    return process.env.PERCY_SERVER_ADDRESS = addr;
  },
  // version information
  get version() {
    return version;
  },
  set version(v) {
    return version = toVersion(v);
  },
  get type() {
    return type;
  },
  set type(t) {
    return type = t;
  }
};
var _default = info;
exports.default = _default;