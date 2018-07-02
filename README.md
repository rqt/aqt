# aqt

[![npm version](https://badge.fury.io/js/aqt.svg)](https://npmjs.org/package/aqt)

`aqt` is an advanced request for Node.js which returns body, headers and status after _gzip_ when necessary.

```sh
yarn add -E aqt
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`AConfig` Type](#aconfig-type)
    * [<code>data</code>](#data)
    * [<code>type</code>](#type)
    * [<code>headers</code>](#headers)
    * [<code>method</code>](#method)
  * [`aqt(url: string, config?: AConfig): AResult`](#aqturl-stringconfig-aconfig-aresult)

## API

The package exports a main default asynchronous function to make requests.

```js
import aqt from 'aqt'
```

### `AConfig` Type

The configuration object is the following:

<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
   <tr>
  <td><a name="data"><code>data</code></a></td>
  <td><em>object</em></td>
  <td>Optional data to send to the server with the request.</td>
  <td></td>
 </tr>
 <tr>
  <td><a name="type"><code>type</code></a></td>
  <td><em>'form'|'json'</em></td>
  <td>How to send data: <code>json</code> to serialise JSON data and <code>form</code> for url-encoded transmission with <code>json</code> mode by default.</td>
  <td></td>
 </tr>
 <tr>
  <td><a name="headers"><code>headers</code></a></td>
  <td><em>object</em></td>
  <td>Headers to use for the request.</td>
  <td></td>
 </tr>
 <tr>
  <td><a name="method"><code>method</code></a></td>
  <td><em>string</em></td>
  <td>What HTTP method to use to send data (only works when <code>data</code> is set). Default <code>POST</code>.</td>
  <td></td>
 </tr>
 </tbody>
</table>


### `aqt(`<br/>&nbsp;&nbsp;`url: string,`<br/>&nbsp;&nbsp;`config?: AConfig,`<br/>`): AResult`

The requests are made with the `aqt` function, which accepts either a single URL, or a URL with a configuration object of the ][`AConfig` type](#aconfig-type).

```javascript
import { HTTPContext } from 'https-context'
import aqt from 'aqt'

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
```

```json
{
  "body": "Hello World",
  "headers": {
    "content-type": "text/plain",
    "date": "Mon, 02 Jul 2018 16:58:45 GMT",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 200,
  "statusMessage": "OK"
}
```

---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
