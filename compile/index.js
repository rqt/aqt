const _aqt = require('./aqt')

/**
 * Request a web page and return information including `headers`, `statusCode`, `statusMessage` along with the `body` (which is also parsed if JSON received).
 * @param {string} address The URL such as http://example.com/api.
 * @param {_rqt.AqtOptions} [options] Configuration for requests.
 * @param {!Object} [options.data] Optional data to send to the server with the request.
 * @param {string} [options.type="json"] How to send data: `json` to serialise JSON data and add _Content-Type: application/json_ header, and `form` for url-encoded transmission with _Content-Type: application/x-www-form-urlencoded_. _Multipart/form-data_ must be implemented manually. Default `json`.
 * @param {!http.OutgoingHttpHeaders} [options.headers] Headers to use for the request. By default, a single User-Agent header with _Mozilla/5.0 (Node.JS) aqt/{version}_ value is set.
 * @param {boolean} [options.compress=true] Add the `Accept-Encoding: gzip, deflate` header to indicate to the server that it can send a compressed response. Default `true`.
 * @param {number} [options.timeout] The timeout after which the request should fail.
 * @param {string} [options.method] What HTTP method to use in making of the request. When no method is given and `data` is present, defaults to `POST`.
 * @param {boolean} [options.binary=false] Whether to return a buffer instead of a string. Default `false`.
 * @param {boolean} [options.justHeaders=false] Whether to stop the request after response headers were received, without waiting for the data. Default `false`.
 */
async function aqt(address, options) {
  const res = /** @type {_rqt.AqtReturn} */ (await _aqt(address, options))
  return res
}

/* typal types/index.xml closure noSuppress */
/**
 * @typedef {_rqt.AqtOptions} AqtOptions Configuration for requests.
 */
/**
 * @typedef {Object} _rqt.AqtOptions Configuration for requests.
 * @prop {!Object} [data] Optional data to send to the server with the request.
 * @prop {string} [type="json"] How to send data: `json` to serialise JSON data and add _Content-Type: application/json_ header, and `form` for url-encoded transmission with _Content-Type: application/x-www-form-urlencoded_. _Multipart/form-data_ must be implemented manually. Default `json`.
 * @prop {!http.OutgoingHttpHeaders} [headers] Headers to use for the request. By default, a single User-Agent header with _Mozilla/5.0 (Node.JS) aqt/{version}_ value is set.
 * @prop {boolean} [compress=true] Add the `Accept-Encoding: gzip, deflate` header to indicate to the server that it can send a compressed response. Default `true`.
 * @prop {number} [timeout] The timeout after which the request should fail.
 * @prop {string} [method] What HTTP method to use in making of the request. When no method is given and `data` is present, defaults to `POST`.
 * @prop {boolean} [binary=false] Whether to return a buffer instead of a string. Default `false`.
 * @prop {boolean} [justHeaders=false] Whether to stop the request after response headers were received, without waiting for the data. Default `false`.
 */
/**
 * @typedef {import('http').OutgoingHttpHeaders} http.OutgoingHttpHeaders
 */

/* typal types/return.xml closure noSuppress */
/**
 * @typedef {_rqt.AqtReturn} AqtReturn The return type of the function.
 */
/**
 * @typedef {Object} _rqt.AqtReturn The return type of the function.
 * @prop {!(string|Object|Buffer)} body The return from the server. In case the `json` content-type was set by the server, the response will be parsed into an object. If `binary` option was used for the request, a `Buffer` will be returned. Otherwise, a string response is returned.
 * @prop {!http.IncomingHttpHeaders} headers Incoming headers returned by the server.
 * @prop {number} statusCode The status code returned by the server.
 * @prop {string} statusMessage The status message set by the server.
 */
/**
 * @typedef {import('http').IncomingHttpHeaders} http.IncomingHttpHeaders
 */

module.exports = aqt