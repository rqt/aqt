const erotic = require('erotic');
const { collect } = require('catchment');
const { createGunzip } = require('zlib');

/**
 * @param {import('http').IncomingMessage} req
 */
const isMessageGzip = (res) => {
  return res.headers['content-encoding'] == 'gzip'
}

/**
 * @param {typeof import('http').request} request The actual http or https request function.
 * @param {import('http').RequestOptions} requestOptions
 * @param {object} config Config object.
 * @param {boolean} [config.justHeaders] only return headers as soon as available. false
 * @param {boolean} [config.binary] return binary
 * @param {boolean} [config.er] erotic callback
 */
const makeRequest = (request, requestOptions, config = {}) => {
  const { justHeaders, binary, er = erotic(true) } = config
  /** @type {import('http').ClientRequest} */
  let req

  /** @type {import('http').IncomingHttpHeaders} */
  let headers
  /** @type {{statusMessage: string, statusCode: number}} */
  let m
  /** @type {string|Buffer} */
  let body
  /** @type {number} */
  let rawLength = 0
  /** @type {number} */
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

module.exports=makeRequest

module.exports.isMessageGzip = isMessageGzip