"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = void 0;

var _erotic = _interopRequireDefault(require("erotic"));

var _catchment = _interopRequireDefault(require("catchment"));

var _zlib = require("zlib");

var _http = require("http");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line

/**
 * @param {http} request actual http or https request function
 * @param {RequestOptions} requestOptions
 * @param {object} config Config object.
 * @param {boolean} [config.justHeaders] only return headers as soon as available. false
 * @param {boolean} [config.binary] return binary
 * @param {boolean} [config.er] erotic callback
 */
const makeRequest = (request, requestOptions, config) => {
  const {
    justHeaders,
    binary,
    er = (0, _erotic.default)(true)
  } = config;
  let req;
  /** @type {IncomingHttpHeaders} */

  let h;
  /** @type {{statusMessage: string, statusCode: number}} */

  let m;
  /** @type {string|Buffer} */

  let b;
  /** @type {number} */

  let rl = 0;
  /** @type {number} */

  let bl = 0;
  const promise = new Promise((r, j) => {
    req = request(requestOptions, async res => {
      const {
        headers,
        statusMessage,
        statusCode
      } = res;
      h = headers;
      m = {
        statusMessage,
        statusCode
      };

      if (justHeaders) {
        res.destroy();
        r();
        return;
      }

      const isGzip = (0, _.isMessageGzip)(res);
      res.on('data', data => rl += data.byteLength);
      const rs = isGzip ? res.pipe((0, _zlib.createGunzip)()) : res;
      const {
        promise: p
      } = new _catchment.default({
        rs,
        binary
      });
      let body = await p;
      b = body;
      bl = body.length;
      r();
    }).on('error', error => {
      const err = er(error);
      j(err);
    });
  }).then(() => {
    const r = {
      body: b,
      headers: h,
      ...m,
      rawLength: rl,
      byteLength: bl,
      parsedBody: null
    };
    return r;
  });
  return {
    req,
    promise
  };
};

exports.makeRequest = makeRequest;
//# sourceMappingURL=make-request.js.map