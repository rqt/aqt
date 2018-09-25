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
 * @param {Config} [config] Configuration for requests.
 * @param {Object} config.data Optional data to send to the server with the request.
 * @param {'form'|'json'} [config.type="'json'"] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. Default `'json'`.
 * @param {OutgoingHttpHeaders} [config.headers] Headers to use for the request.
 * @param {boolean} [config.compress=true] Add the `Accept-Encoding: gzip, deflate` header automatically to indicate to the server that it can send a compressed response. Default `true`.
 * @param {string} [config.headers="POST"] What HTTP method to use to send data. Default `POST`.
 * @param {boolean} [config.binary=false] Whether to return a buffer instead of a string. Default `false`.
 * @param {boolean} [config.justHeaders=false] Whether to stop the request after response headers were received, without waiting for the data. Default `false`.
 */
const aqt = async (address, config = {}) => {
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
  } = config
  const er = erotic(true)

  const { hostname, protocol, port, path } = parse(address)
  const isHttps = protocol === 'https:'
  const request = isHttps ? https : http

  const options = {
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

    options.method = method
    options.headers['Content-Type'] = contentType
    options.headers['Content-Length'] = Buffer.byteLength(data)
  }
  if (compress) {
    options.headers['Accept-Encoding'] = 'gzip, deflate'
  }

  const {
    body, headers, byteLength, statusCode, statusMessage, rawLength,
    parsedBody,
  } = await exec(request, options, {
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
 * @typedef {import('http').OutgoingHttpHeaders} OutgoingHttpHeaders
 *
 * @typedef {Object} Config Configuration for requests.
 * @prop {Object} data Optional data to send to the server with the request.
 * @prop {'form'|'json'} [type="'json'"] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. Default `'json'`.
 * @prop {OutgoingHttpHeaders} [headers] Headers to use for the request.
 * @prop {boolean} [compress=true] Add the `Accept-Encoding: gzip, deflate` header automatically to indicate to the server that it can send a compressed response. Default `true`.
 * @prop {string} [headers="POST"] What HTTP method to use to send data. Default `POST`.
 * @prop {boolean} [binary=false] Whether to return a buffer instead of a string. Default `false`.
 * @prop {boolean} [justHeaders=false] Whether to stop the request after response headers were received, without waiting for the data. Default `false`.
 */
