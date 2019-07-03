# @rqt/aqt

[![npm version](https://badge.fury.io/js/%40rqt%2Faqt.svg)](https://npmjs.org/package/@rqt/aqt)

`aqt` is a network request package for Node.js that returns the body (parsed if returned as _JSON_), headers and status after _gzip_ decompression when necessary.

```sh
yarn add -E @rqt/aqt
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`aqt(url: string, options?: AqtOptions): AqtReturn`](#aqturl-stringoptions-aqtoptions-aqtreturn)
  * [`AqtOptions`](#type-aqtoptions)
- [`AqtReturn` Type](#aqtreturn-type)
  * [<code>body</code>](#body)
  * [<code>headers</code>](#headers)
  * [<code>statusCode</code>](#statuscode)
  * [<code>statusMessage</code>](#statusmessage)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package exports the main default asynchronous function to make requests.

```js
import aqt from '@rqt/aqt'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `aqt(`<br/>&nbsp;&nbsp;`url: string,`<br/>&nbsp;&nbsp;`options?: AqtOptions,`<br/>`): AqtReturn`

Makes a request to the URL, either with or without options.

`import('http').OutgoingHttpHeaders` __<a name="type-httpoutgoinghttpheaders">`http.OutgoingHttpHeaders`</a>__

__<a name="type-aqtoptions">`AqtOptions`</a>__: Configuration for requests.

|    Name     |                                Type                                |                                                     Description                                                      | Default  |
| ----------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | -------- |
| __data*__   | <em>Object</em>                                                    | Optional data to send to the server with the request.                                                                | -        |
| type        | <em>('form' \| 'json')</em>                                        | How to send data: `json` to serialise JSON data and `form` for url-encoded transmission with `json` mode by default. | `'json'` |
| headers     | <em>[http.OutgoingHttpHeaders](#type-httpoutgoinghttpheaders)</em> | Headers to use for the request.                                                                                      | -        |
| compress    | <em>boolean</em>                                                   | Add the `Accept-Encoding: gzip, deflate` header to indicate to the server that it can send a compressed response.    | `true`   |
| timeout     | <em>number</em>                                                    | The timeout after which the request should fail.                                                                     | -        |
| method      | <em>string</em>                                                    | What HTTP method to use in making of the request. When no method is given and `data` is present, defaults to `POST`. | -        |
| binary      | <em>boolean</em>                                                   | Whether to return a buffer instead of a string.                                                                      | `false`  |
| justHeaders | <em>boolean</em>                                                   | Whether to stop the request after response headers were received, without waiting for the data.                      | `false`  |
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
    "date": "Wed, 03 Jul 2019 15:32:44 GMT",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 200,
  "statusMessage": "OK"
}
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `AqtReturn` Type

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
   <td colspan="2">The return from the server. In case <code>json</code> content-type was set by the server, the response will be parsed into an object. If <code>binary</code> option was used for the request, a <code>Buffer</code> will be returned. Otherwise, a string response is returned.</td>
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

```json5
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


<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="http://rqt.biz">Rqt</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>