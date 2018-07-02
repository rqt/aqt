import { ok, assert, equal, deepEqual, throws } from 'zoroaster/assert'
import aqt from '../../src'
import Context from '../context'
import { version } from '../../package.json'
import { HTTPContext } from 'https-context'

/** @type {Object.<string, (h: HTTPContext, c: Context)>} */
const T = {
  context: [
    HTTPContext,
    Context,
  ],
  async 'is a function'() {
    equal(typeof aqt, 'function')
  },
  async 'requests data from server' ({ setResponse, getState, url }) {
    const expected = 'test-data'
    setResponse(expected)
    const res = await aqt(url)
    const { called } = getState()
    ok(called)
    equal(res.body, expected)
    equal(res.statusCode, 200)
    equal(res.statusMessage, 'OK')
    ok('headers' in res)
    equal(res.headers['content-type'], 'text/plain')
  },
  async 'fails when ENOTFOUND'() {
    const url = `http://not-a-valid-web-page-${Math.floor(Math.random() * 10000)}.io`
    await throws({
      fn: aqt,
      args: [url],
      code: 'ENOTFOUND',
    })
  },
  async 'requests data from https'() {
    const url = 'https://google.com'
    const res = await aqt(url)
    equal(res.statusCode, 301)
    equal(res.statusMessage, 'Moved Permanently')
    ok(/The document has moved/.test(res.body))
  },
  async 'sends json data'({ getState, url, response }, { data }) {
    const res = await aqt(url, {
      data,
    })
    const { called, headers, postData } = getState()
    ok(called)
    equal(headers['content-type'], 'application/json')
    equal(postData, JSON.stringify(data))
    equal(res.body, response)
    equal(res.statusCode, 200)
    equal(res.statusMessage, 'OK')
  },
  async 'sends form data'({ getState, url, response }, { data }) {
    const res = await aqt(url, {
      data,
      type: 'form',
    })
    const { called, headers, postData } = getState()
    ok(called)
    equal(headers['content-type'], 'application/x-www-form-urlencoded')
    equal(postData, Object.keys(data).map(k => `${k}=${data[k]}`).join('&'))
    equal(res.body, response)
    equal(res.statusCode, 200)
    equal(res.statusMessage, 'OK')
  },
  async 'parses json data'({ url, setResponse, setContentType, getState }, { data }) {
    setContentType('application/json')
    setResponse(JSON.stringify(data))
    const res = await aqt(url)
    const { called } = getState()
    ok(called)
    deepEqual(res.body, data)
    equal(res.statusCode, 200)
    equal(res.statusMessage, 'OK')
  },
  async 'parses json data with charset'({ url, setResponse, setContentType, getState }, { data }) {
    setContentType('application/json; charset=utf8')
    setResponse(JSON.stringify(data))
    const res = await aqt(url)
    const { called } = getState()
    ok(called)
    deepEqual(res.body, data)
    equal(res.statusCode, 200)
    equal(res.statusMessage, 'OK')
  },
  async 'rejects when cannot parse json data'({ url, setContentType, setResponse }) {
    const data = 'not-json-data'
    setContentType('application/json')
    setResponse(data)
    try {
      await aqt(url)
      throw new Error('Should have thrown an error')
    } catch ({ response, message, stack }) {
      equal(response, data)
      assert(/Unexpected token o/.test(message))
      assert(/ at rejects when cannot parse json data/.test(stack))
    }
  },
  async 'sends headers'({ url, getState }) {
    const testHeader = 'test post header'
    await aqt(url, {
      data: 'test',
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        'x-test': testHeader,
      },
    })
    const { headers } = getState()
    equal(headers['x-test'], testHeader)
  },
  async 'sends user-agent'({ url, getState }) {
    const expected = `Mozilla/5.0 (Node.js) aqt/${version}`
    await aqt(url, {
      data: 'test',
      contentType: 'application/x-www-form-urlencoded',
    })
    const { headers } = getState()
    equal(headers['user-agent'], expected)
  },
  async 'requests github data'() {
    const res = await aqt('https://api.github.com/users/octocat/orgs')
    deepEqual(res.body, [])
    equal(res.statusCode, 200)
    equal(res.statusMessage, 'OK')
  },
  async 'returns binary data'({ url, setResponse }) {
    const d = 'test buffer'
    setResponse(d)
    const expected = new Buffer(d)
    const res = await aqt(url, {
      binary: true,
    })
    assert(res.body instanceof Buffer)
    deepEqual(res.body, expected)
  }
}

export default T
