# @rqt/aqt

[![npm version](https://badge.fury.io/js/%40rqt%2Faqt.svg)](https://npmjs.org/package/@rqt/aqt)

`aqt` is a network request package for Node.JS that returns the body (parsed if returned as _JSON_), headers and status after _gzip_ decompression when necessary.

```sh
yarn add @rqt/aqt
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`aqt(url: string, options?: AqtOptions): AqtReturn`](#aqturl-stringoptions-aqtoptions-aqtreturn)
  * [`_rqt.AqtOptions`](#type-_rqtaqtoptions)
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

<strong><a name="type-_rqtaqtoptions">`_rqt.AqtOptions`</a></strong>: Configuration for requests.
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
  <th>Default</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center">data</td>
  <td><em>!Object</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>Optional data to send to the server with the request.</td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">type</td>
  <td><em>string</em></td>
  <td rowSpan="3"><code>json</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>How to send data: <code>json</code> to serialise JSON data and add <em>Content-Type: application/json</em> header, and <code>form</code> for url-encoded transmission with <em>Content-Type: application/x-www-form-urlencoded</em>. <em>Multipart/form-data</em> must be implemented manually.</td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">headers</td>
  <td><em><a href="https://nodejs.org/api/http.html#http_class_http_outgoinghttpheaders" title="The headers hash map for making requests, including such properties as Content-Encoding, Content-Type, etc.">!http.OutgoingHttpHeaders</a></em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>Headers to use for the request.</td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">compress</td>
  <td><em>boolean</em></td>
  <td rowSpan="3"><code>true</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>Add the <code>Accept-Encoding: gzip, deflate</code> header to indicate to the server that it can send a compressed response.</td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">timeout</td>
  <td><em>number</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>The timeout after which the request should fail.</td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">method</td>
  <td><em>string</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>What HTTP method to use in making of the request. When no method is given and <code>data</code> is present, defaults to <code>POST</code>.</td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">binary</td>
  <td><em>boolean</em></td>
  <td rowSpan="3"><code>false</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>Whether to return a buffer instead of a string.</td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">justHeaders</td>
  <td><em>boolean</em></td>
  <td rowSpan="3"><code>false</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>Whether to stop the request after response headers were received, without waiting for the data.</td>
 </tr>
</table>

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
    "date": "Mon, 29 Jul 2019 16:28:05 GMT",
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
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="http://rqt.biz">Rqt</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>