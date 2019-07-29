import { request as https } from 'https'
import { request as http } from 'http'
import { debuglog } from 'util'
import erotic from 'erotic'
import { parse } from 'url'
import { getData, exec } from './lib'

let ua
try {
  // require in index won't lead to --process_common_js_modules
  const { 'version': version, 'name': name } = require('../package.json')
  ua = name == '@rqt/aqt' ? `@rqt/aqt/${version}` : `@rqt/aqt via ${name}/${version}`
} catch (err) {
  ua = '@aqt/rqt'
}

const LOG = debuglog('aqt')

/**
 * Request a web page and return information including `headers`, `statusCode`, `statusMessage` along with the `body` (which is also parsed if JSON received).
 * @param {string} address The URL such as http://example.com/api.
 * @param {_rqt.AqtOptions} [options] Configuration for requests.
 */
const aqt = async (address, options = {}) => {
  const {
    data: d,
    type = 'json',
    headers: outgoingHeaders = {
      'User-Agent': `Mozilla/5.0 (Node.JS) ${ua}`,
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

  /** @type {!_rqt.AqtReturn} */
  const res = {
    body: parsedBody ? parsedBody : body,
    headers,
    statusCode,
    statusMessage,
  }
  return res
}

export default aqt

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').AqtOptions} _rqt.AqtOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').AqtReturn} _rqt.AqtReturn
 */