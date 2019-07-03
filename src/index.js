import { request as https } from 'https'
import { request as http } from 'http'
import { debuglog } from 'util'
import erotic from 'erotic'
import { parse } from 'url'
import { version } from '../package.json'
import { getData, exec } from './lib'

const LOG = debuglog('aqt')

/**
 * Request a web page and return information including `headers`, `statusCode`, `statusMessage` along with the `body` (which is also parsed if JSON received).
 * @param {string} address The URL such as http://example.com/api.
 * @param {AqtOptions} [options] Configuration for requests.
 * @param {Object} [options.data] Optional data to send to the server with the request.
 * @param {'form'|'json'} [options.type="'json'"] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. Default `'json'`.
 * @param {http.OutgoingHttpHeaders} [options.headers] Headers to use for the request.
 * @param {boolean} [options.compress=true] Add the `Accept-Encoding: gzip, deflate` header to indicate to the server that it can send a compressed response. Default `true`.
 * @param {number} [options.timeout] The timeout after which the request should fail.
 * @param {string} [options.method] What HTTP method to use in making of the request. When no method is given and `data` is present, defaults to `POST`.
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
    justHeaders = false,
    method,
    timeout,
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
    timeout,
    method,
  }

  let data
  if (d) {
    const _d = getData(type, d)
      ; ({ data } = _d)
    const { contentType } = _d

    opts.method = method || 'POST'
    if (!('Content-Type' in opts.headers)) {
      opts.headers['Content-Type'] = contentType
    }
    if (!('Content-Length' in opts.headers)) {
      opts.headers['Content-Length'] = Buffer.byteLength(data)
    }
  }
  if (compress && !('Accept-Encoding' in opts.headers)) {
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

export default aqt

/* documentary types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} AqtOptions Configuration for requests.
 * @prop {Object} [data] Optional data to send to the server with the request.
 * @prop {'form'|'json'} [type="'json'"] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. Default `'json'`.
 * @prop {http.OutgoingHttpHeaders} [headers] Headers to use for the request.
 * @prop {boolean} [compress=true] Add the `Accept-Encoding: gzip, deflate` header to indicate to the server that it can send a compressed response. Default `true`.
 * @prop {number} [timeout] The timeout after which the request should fail.
 * @prop {string} [method] What HTTP method to use in making of the request. When no method is given and `data` is present, defaults to `POST`.
 * @prop {boolean} [binary=false] Whether to return a buffer instead of a string. Default `false`.
 * @prop {boolean} [justHeaders=false] Whether to stop the request after response headers were received, without waiting for the data. Default `false`.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').OutgoingHttpHeaders} http.OutgoingHttpHeaders
 */


/* documentary types/return.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} AqtReturn
 * @prop {string|Object|Buffer} body The return from the server. In case the `json` content-type was set by the server, the response will be parsed into an object. If `binary` option was used for the request, a `Buffer` will be returned. Otherwise, a string response is returned.
 * @prop {http.IncomingHttpHeaders} headers Incoming headers returned by the server.
 * @prop {number} statusCode The status code returned by the server.
 * @prop {string} statusMessage The status message set by the server.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingHttpHeaders} http.IncomingHttpHeaders
 */
