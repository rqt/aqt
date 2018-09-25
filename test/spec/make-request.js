import { ok, equal } from 'zoroaster/assert'
import { request } from 'http'
import makeRequest from '../../src/lib/make-request'
import IdioContext from '../context/idio'

/** @type {Object.<string, (c: IdioContext)>} */
const ts = {
  context: IdioContext,
  async 'can make a compressed request'({ start, getOptions }) {
    await start({
      compress: {
        use: true,
      },
      static: {
        root: 'test/fixture',
        use: true,
      },
    })
    const opts = getOptions('chapter1.txt')
    const { req, promise } = makeRequest(request, {
      ...opts,
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
    })
    req.end()
    const {
      statusMessage, statusCode, rawLength, byteLength, headers: {
        'content-encoding': contentEncoding,
      },
    } = await promise
    equal(statusMessage, 'OK')
    equal(statusCode, 200)
    ok(rawLength < byteLength)
    equal(contentEncoding, 'gzip')
  },
}

export default ts