import { request as https } from 'https'
import { request as http  } from 'http'
import { debuglog } from 'util'
import erotic from 'erotic'
import { parse } from 'url'
import { version } from '../package.json'
import { getData, exec } from './lib'

const LOG = debuglog('aqt')

/**
 * Advanced Request - request a web page and return information including `headers`, `statusCode`, `statusMessage` along with the `body` (which is also parsed if JSON received).
 * @param {string} address Url such as http://example.com/api
 * @param {Aconfig} [config] Configuration object
 * @param {object} [config.data] Data to send to the server with the request.
 * @param {object} [config.headers] Headers to use in the request.
 * @param {'form'|'json'} [config.type='json'] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default.
 * @param {string} [config.method='POST'] What method to use to send data (only works when `data` is set). Default `POST`.
 */
export const aqt = async (address, config = {}) => {
  const {
    data: d,
    type = 'json',
    headers: outgoingHeaders = {
      'User-Agent': `Mozilla/5.0 (Node.js) aqt/${version}`,
    },
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
    headers: outgoingHeaders,
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

  const { body, headers, byteLength, statusCode, statusMessage, rawLength, parsedBody } = await exec(request, options, {
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

/**
 * @typedef {Object} Aconfig
 * @property {object} [data] Optional data to send to the server with the request.
 * @property {'form'|'json'} [type='json'] How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default.
 * @property {object} [headers] Headers to use for the request.
 * @property {string} [method='POST'] What HTTP method to use to send data (only works when `data` is set). Default `POST`.
 */
