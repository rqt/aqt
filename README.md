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
    * [<code>binary</code>](#binary)
    * [<code>method</code>](#method)
    * [<code>justHeaders</code>](#justheaders)
  * [`aqt(url: string, config?: AConfig): AResult`](#aqturl-stringconfig-aconfig-aresult)
  * [`AResult` Type](#aresult-type)
    * [<code>body</code>](#body)
    * [<code>headers</code>](#headers)
    * [<code>statusCode</code>](#statuscode)
    * [<code>statusMessage</code>](#statusmessage)

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
  <td>Headers to send along with the request.</td>
  <td></td>
 </tr>
 <tr>
  <td><a name="binary"><code>binary</code></a></td>
  <td><em>boolean</em></td>
  <td>Whether to return a buffer instead of a string. Default <code>false</code>.</td>
  <td></td>
 </tr>
 <tr>
  <td><a name="method"><code>method</code></a></td>
  <td><em>string</em></td>
  <td>What HTTP method to use to send data (only works when <code>data</code> is set). Default <code>POST</code>.</td>
  <td></td>
 </tr>
 <tr>
  <td><a name="justheaders"><code>justHeaders</code></a></td>
  <td><em>boolean</em></td>
  <td>Whether to stop the request after response headers were received, without waiting for the data. Default <code>false</code>.</td>
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
    "date": "Tue, 10 Jul 2018 14:58:01 GMT",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 200,
  "statusMessage": "OK"
}
```

### `AResult` Type

The result of the `aqt` function will have the following structure:

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
  <td><a name="body"><code>body</code></a></td>
  <td><em>string|object|Buffer</em></td>
  <td>The return from the server. In case `json` content-type was set by the server, the response will be parsed into an object. If <code>binary</code> option was for the request, a <code>Buffer</code> will be returned. Otherwise, a string response is returned.</td>
  <td></td>
 </tr>
 <tr>
  <td><a name="headers"><code>headers</code></a></td>
  <td><em>object</em></td>
  <td>Incoming headers returned by the server.</td>
  <td>

```json
{
  "server": "GitHub.com",
  "date": "Tue, 10 Jul 2018 14:37:49 GMT",
  "content-type": "application/json; charset=utf-8",
  "content-length": "2",
  "connection": "close",
  "status": "200 OK",
  "x-ratelimit-limit": "60",
  "x-ratelimit-remaining": "57",
  "x-ratelimit-reset": "1531235223",
  "cache-control": "public, max-age=60, s-maxage=60",
  "vary": "Accept",
  "etag": "\"d751713988987e9331980363e24189ce\"",
  "x-github-media-type": "github.v3; format=json",
  "access-control-expose-headers": "ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
  "access-control-allow-origin": "*",
  "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
  "x-frame-options": "deny",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block",
  "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
  "content-security-policy": "default-src 'none'",
  "x-runtime-rack": "0.026623",
  "x-github-request-id": "AB4F:0CFB:4B9AC73:A5E5785:5B44C4BD"
}
```
</td>
 </tr>
 <tr>
  <td><a name="statuscode"><code>statusCode</code></a></td>
  <td><em>number</em></td>
  <td>The status code returned by the server.</td>
  <td><code>200</code></td>
 </tr>
 <tr>
  <td><a name="statusmessage"><code>statusMessage</code></a></td>
  <td><em>string</em></td>
  <td>The status message set by the server.</td>
  <td><code>OK</code></td>
 </tr>
 </tbody>
</table>


---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
