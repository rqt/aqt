import { parse } from 'url'
import idioCore from '@idio/core'

export default class IdioContext {
  /** @param {import('@idio/core').MiddlewareConfig} middleware */
  async start(middleware) {
    const { app, url } = await idioCore(middleware, {
      port: 0,
    })
    this.app = app
    this.url = url
    return url
  }
  getOptions(p) {
    const { hostname, path, port } =  parse(`${this.url}/${p}`)
    return {
      hostname, path, port,
    }
  }
  async _destroy() {
    await this.app.destroy()
  }
}