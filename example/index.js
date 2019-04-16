import { HTTPContext } from 'https-context'
/* start example */
import aqt from '../src'

const Request = async (url) => {
  const res = await aqt(url)
  const resp = JSON.stringify(res, null, 2)
  console.log(resp)
}
/* end example */

(async () => {
  const c = new HTTPContext()
  await c._init()
  c.setResponse('Hello World')
  await Request(c.url)
  process.exit()
})()