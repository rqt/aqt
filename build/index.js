const { request: https } = require('https');
const { request: http } = require('http');
const { debuglog } = require('util');
let erotic = require('erotic'); if (erotic && erotic.__esModule) erotic = erotic.default;
const { parse } = require('url');
const { version } = require('../package.json');
const { getData, exec } = require('./lib');

const LOG = debuglog('aqt')

/**
 * Request a web page and return information including `headers`, `statusCode`, `statusMessage` along with the `body` (which is also parsed if JSON received).
 * @param {string} address The URL such as http://example.com/api.
 * @param {AqtOptions} [options] Configuration for requests.
 * @param {Object} options.data Optional data to send to the server with the request.
 * @param {'form'|'json'} [options.type="'json'"] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. Default `'json'`.
 * @param {OutgoingHttpHeaders} [options.headers] Headers to use for the request.
 * @param {boolean} [options.compress=true] Add the `Accept-Encoding: gzip, deflate` header automatically to indicate to the server that it can send a compressed response. Default `true`.
 * @param {string} [options.method="POST"] What HTTP method to use to send data. Default `POST`.
 * @param {boolean} [options.binary=false] Whether to return a buffer instead of a string. Default `false`.
 * @param {boolean} [options.justHeaders=false] Whether to stop the request after response headers were received, without waiting for the data. Default `false`.
 * @returns {Promise.<AqtReturn>} The body, headers and status.
 */
const aqt = async (address, options = {}) => {
  const {
    data: d,
    type = 'json',
    headers: outgoingHeaders = {
      'User-Agent': `Mozilla/5.0 (Node.js) aqt/${version}`,
    },
    compress = true,
    binary = false,
    method = 'POST',
    justHeaders = false,
  } = options
  const er = erotic(true)

  const { hostname, protocol, port, path } = parse(address)
  const isHttps = protocol === 'https:'
  const request = isHttps ? https : http

  const opts = {
    hostname,
    port,
    path,
    headers: {
      ...outgoingHeaders,
    },
  }

  let data
  if (d) {
    const _d = getData(type, d)
      ; ({ data } = _d)
    const { contentType } = _d

    opts.method = method
    opts.headers['Content-Type'] = contentType
    opts.headers['Content-Length'] = Buffer.byteLength(data)
  }
  if (compress) {
    opts.headers['Accept-Encoding'] = 'gzip, deflate'
  }

  const {
    body, headers, byteLength, statusCode, statusMessage, rawLength,
    parsedBody,
  } = await exec(request, opts, {
    data,
    justHeaders,
    binary,
    er,
  })

  LOG('%s %s B%s', address, byteLength, `${byteLength != rawLength ? ` (raw ${rawLength} B)` : ''}`)

  return {
    body: parsedBody ? parsedBody : body,
    headers,
    statusCode,
    statusMessage,
  }
}

module.exports=aqt

/* documentary types/index.xml */
/**
 * @typedef {import('http').OutgoingHttpHeaders} OutgoingHttpHeaders
 *
 * @typedef {Object} AqtOptions Configuration for requests.
 * @prop {Object} data Optional data to send to the server with the request.
 * @prop {'form'|'json'} [type="'json'"] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. Default `'json'`.
 * @prop {OutgoingHttpHeaders} [headers] Headers to use for the request.
 * @prop {boolean} [compress=true] Add the `Accept-Encoding: gzip, deflate` header automatically to indicate to the server that it can send a compressed response. Default `true`.
 * @prop {string} [method="POST"] What HTTP method to use to send data. Default `POST`.
 * @prop {boolean} [binary=false] Whether to return a buffer instead of a string. Default `false`.
 * @prop {boolean} [justHeaders=false] Whether to stop the request after response headers were received, without waiting for the data. Default `false`.
 */


/* documentary types/return.xml */
/**
 * @typedef {import('http').IncomingHttpHeaders} IncomingHttpHeaders
 *
 * @typedef {Object} AqtReturn
 * @prop {string|object|Buffer} body The return from the server. In case the `json` content-type was set by the server, the response will be parsed into an object. If `binary` option was used for the request, a `Buffer` will be returned. Otherwise, a string response is returned.
 * @prop {IncomingHttpHeaders} headers Incoming headers returned by the server.
 * @prop {number} statusCode The status code returned by the server.
 * @prop {string} statusMessage The status message set by the server.
 */
