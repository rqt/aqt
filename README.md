# @rqt/aqt

[![npm version](https://badge.fury.io/js/%40rqt%2Faqt.svg)](https://npmjs.org/package/@rqt/aqt)

`aqt` is an advanced request for Node.js which returns body, headers and status after _gzip_ when necessary.

```sh
yarn add -E @rqt/aqt
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`aqt(url: string, config?: Config): Result`](#aqturl-stringconfig-config-result)
  * [`Config`](#config)
- [`Result` Type](#result-type)
  * [<code>body</code>](#body)
  * [<code>headers</code>](#headers)
  * [<code>statusCode</code>](#statuscode)
  * [<code>statusMessage</code>](#statusmessage)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package exports the main default asynchronous function to make requests.

```js
import aqt from '@rqt/aqt'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `aqt(`<br/>&nbsp;&nbsp;`url: string,`<br/>&nbsp;&nbsp;`config?: Config,`<br/>`): Result`

Makes a request to the URL, either with or without options.

`import('http').OutgoingHttpHeaders` __<a name="outgoinghttpheaders">`OutgoingHttpHeaders`</a>__

__<a name="config">`Config`</a>__: Configuration for requests.

|    Name     |                     Type                      |                                                     Description                                                      | Default  |
| ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| __data*__   | _Object_                                      | Optional data to send to the server with the request.                                                                | -        |
| type        | _'form'\|'json'_                              | How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. | `'json'` |
| headers     | _[OutgoingHttpHeaders](#outgoinghttpheaders)_ | Headers to use for the request.                                                                                      | -        |
| headers     | _string_                                      | What HTTP method to use to send data.                                                                                | `POST`   |
| binary      | _boolean_                                     | Whether to return a buffer instead of a string.                                                                      | `false`  |
| justHeaders | _boolean_                                     | Whether to stop the request after response headers were received, without waiting for the data.                      | `false`  |
```js
import aqt from '@rqt/aqt'

const Request = async (url) => {
  const res = await aqt(url)
  const resp = JSON.stringify(res, null, 2)
  console.log(resp)
}
```
```json5
{
  "body": "Hello World",
  "headers": {
    "content-type": "text/plain",
    "date": "Mon, 24 Sep 2018 14:25:17 GMT",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 200,
  "statusMessage": "OK"
}
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `Result` Type

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
   <td colspan="2">The return from the server. In case <code>json</code> content-type was set by the server, the response will be parsed into an object. If <code>binary</code> option was for the request, a <code>Buffer</code> will be returned. Otherwise, a string response is returned.</td>
  </tr>
  <tr>
   <td><a name="headers"><code>headers</code></a></td>
   <td><em>object</em></td>
   <td colspan="2">Incoming headers returned by the server.</td>
  </tr>
  <tr></tr>
  <tr>
   <td colspan="4">

<details>
<summary><code>headers</code> example</summary>

```json
{
  "server": "GitHub.com",
  "date": "Wed, 18 Jul 2018 01:32:47 GMT",
  "content-type": "application/json; charset=utf-8",
  "content-length": "2",
  "connection": "close",
  "status": "200 OK",
  "x-ratelimit-limit": "60",
  "x-ratelimit-remaining": "59",
  "x-ratelimit-reset": "1531881167",
  "cache-control": "public, max-age=60, s-maxage=60",
  "vary": "Accept",
  "etag": "\"d751713988987e9331980363e24189ce\"",
  "x-github-media-type": "github.v3; format=json",
  "access-control-allow-origin": "*",
  "x-frame-options": "deny",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block",
  "content-security-policy": "default-src 'none'",
  "x-runtime-rack": "0.018822",
  "x-github-request-id": "F187:785E:65A1E8A:C2A36B5:5B4E98BF"
}
```
</details>
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


<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

(c) [Rqt][1] 2018

[1]: https://rqt.biz