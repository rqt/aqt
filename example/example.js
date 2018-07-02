import { HTTPContext } from 'https-context'
import aqt from '../src'

(async () => {
  let c
  try {
    c = new HTTPContext()
    await c._init()
    c.setResponse('Hello World')
    const res = await aqt(c.url)
    const i = JSON.stringify(res, null, 2)
    process.stdout.write(`${i}\n`)
  } catch (err) {
    process.stderr.write(`${err.message}\n`)
  } finally {
    await c._destroy()
  }
})()
