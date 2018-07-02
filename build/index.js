"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arqt = void 0;

var _https = require("https");

var _http = require("http");

var _util = require("util");

var _erotic = _interopRequireDefault(require("erotic"));

var _url = require("url");

var _package = require("../package.json");

var _lib = require("./lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOG = (0, _util.debuglog)('aqt');
/**
 * Advanced Request - request a web page and return information including `headers`, `statusCode`, `statusMessage` along with the `body` (which is also parsed if JSON received).
 * @param {string} address Url such as http://example.com/api
 * @param {Aconfig} [config] Configuration object
 * @param {object} [config.data] Data to send to the server with the request.
 * @param {object} [config.headers] Headers to use in the request.
 * @param {'form'|'json'} [config.type='json'] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default.
 * @param {string} [config.method='POST'] What method to use to send data (only works when `data` is set). Default `POST`.
 */

const arqt = async (address, config) => {
  const {
    data: d,
    type = 'json',
    headers: outgoingHeaders = {
      'User-Agent': `Mozilla/5.0 (Node.js) rqt/${_package.version}`
    },
    binary = false,
    method = 'POST',
    justHeaders = false
  } = config;
  const er = (0, _erotic.default)(true);
  const {
    hostname,
    protocol,
    port,
    path
  } = (0, _url.parse)(address);
  const isHttps = protocol === 'https:';
  const request = isHttps ? _https.request : _http.request;
  const options = {
    hostname,
    port,
    path,
    headers: outgoingHeaders
  };
  let data;

  if (d) {
    const _d = (0, _lib.getData)(type, d);

    ({
      data
    } = _d);
    const {
      contentType
    } = _d;
    options.method = method;
    options.headers['Content-Type'] = contentType;
    options.headers['Content-Length'] = Buffer.byteLength(data);
  }

  const {
    body,
    headers,
    byteLength,
    statusCode,
    statusMessage,
    rawLength,
    parsedBody
  } = await (0, _lib.exec)(request, options, {
    data,
    justHeaders,
    binary,
    er
  });
  LOG('%s %s B%s', address, byteLength, `${byteLength != rawLength ? ` (raw ${rawLength} B)` : ''}`);
  return {
    body: parsedBody ? parsedBody : body,
    headers,
    statusCode,
    statusMessage
  };
};
/**
 * @typedef {Object} Aconfig
 * @property {object} [data] Optional data to send to the server with the request.
 * @property {'form'|'json'} [type='json'] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default.
 * @property {object} [headers] Headers to use for the request.
 * @property {string} [method='POST'] What HTTP method to use to send data (only works when `data` is set). Default `POST`.
 */


exports.arqt = arqt;
//# sourceMappingURL=index.js.map