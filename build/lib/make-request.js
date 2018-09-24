let erotic = require('erotic'); if (erotic && erotic.__esModule) erotic = erotic.default;
let Catchment = require('catchment'); if (Catchment && Catchment.__esModule) Catchment = Catchment.default;
const { createGunzip } = require('zlib');

/**
 * @param {import('http').IncomingMessage} req
 */
       const isMessageGzip = (res) => {
  return res.headers['content-encoding'] == 'gzip'
}

/**
 * @param {http} request actual http or https request function
 * @param {RequestOptions} requestOptions
 * @param {object} config Config object.
 * @param {boolean} [config.justHeaders] only return headers as soon as available. false
 * @param {boolean} [config.binary] return binary
 * @param {boolean} [config.er] erotic callback
 */
       const makeRequest = (request, requestOptions, config) => {
  const { justHeaders, binary, er = erotic(true) } = config
  let req

  /** @type {import('http').IncomingHttpHeaders} */
  let h
  /** @type {{statusMessage: string, statusCode: number}} */
  let m
  /** @type {string|Buffer} */
  let b
  /** @type {number} */
  let rl = 0
  /** @type {number} */
  let bl = 0

  const promise = new Promise((r, j) => {
    req = request(requestOptions, async (res) => {
      const { headers, statusMessage, statusCode } = res
      h = headers
      m = { statusMessage, statusCode }
      if (justHeaders) {
        res.destroy()
        r()
        return
      }
      const isGzip = isMessageGzip(res)

      res.on('data', data => rl += data.byteLength )

      const rs = isGzip
        ? res.pipe(createGunzip())
        : res


      const { promise: p } = new Catchment({ rs, binary })
      let body = await p

      b = body
      bl = body.length

      r()
    })
      .on('error', (error) => {
        const err = er(error)
        j(err)
      })
  }).then(() => {
    const r = {
      body: b,
      headers: h,
      ...m,
      rawLength: rl,
      byteLength: bl,
      parsedBody: null,
    }
    return r
  })
  return { req, promise }
}

module.exports.isMessageGzip = isMessageGzip
module.exports.makeRequest = makeRequest
//# sourceMappingURL=make-request.js.map