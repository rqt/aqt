import erotic from 'erotic'
import { collect } from 'catchment'
import { createGunzip } from 'zlib'
import { request as Request } from 'http' // eslint-disable-line

/**
 * @param {!http.IncomingMessage} res
 */
export const isMessageGzip = (res) => {
  /**
   * @suppress {checkTypes}
   */
  const contentEncoding = res.headers['content-encoding']
  return contentEncoding == 'gzip'
}

/**
 * @param {typeof Request} request The actual http or https request function.
 * @param {!http.RequestOptions} requestOptions
 * @param {!Object} [config] Config object.
 * @param {boolean} [config.justHeaders] only return headers as soon as available. false
 * @param {boolean} [config.binary] return binary
 * @param {boolean} [config.er] erotic callback
 */
const makeRequest = (request, requestOptions, config = {}) => {
  const { justHeaders, binary, er = erotic(true) } = config
  /** @type {!http.ClientRequest} */
  let req

  /** @type {!http.IncomingHttpHeaders} */
  let headers
  /** @type {{statusMessage: string, statusCode: number}} */
  let m
  /** @type {string|!Buffer} */
  let body
  let rawLength = 0
  let byteLength = 0

  const promise = new Promise((r, j) => {
    req = request(requestOptions, async (res) => {
      ({ headers } = res)
      const { statusMessage, statusCode } = res
      m = { statusMessage, statusCode }
      if (justHeaders) {
        res.destroy()
        r()
        return
      }
      const isGzip = isMessageGzip(res)

      res.on('data', data => rawLength += data.byteLength )

      const rs = isGzip
        ? res.pipe(createGunzip())
        : res

      body = await collect(rs, { binary })
      byteLength = body.length

      r()
    })
      .on('error', (error) => {
        const err = er(error)
        j(err)
      })
      .on('timeout', () => {
        req.abort()
      })
  }).then(() => {
    const r = {
      body,
      headers,
      ...m,
      rawLength,
      byteLength,
      parsedBody: null,
    }
    return r
  })
  return { req, promise }
}

export default makeRequest

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').ClientRequest} http.ClientRequest
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingHttpHeaders} http.IncomingHttpHeaders
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').RequestOptions} http.RequestOptions
 */