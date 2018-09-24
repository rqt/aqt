## `Result` Type

The result of the `aqt` function will have the following structure:

%TYPE true
<p name="body" type="string|object|Buffer">
  <d>The return from the server. In case <code>json</code> content-type was set by the server, the response will be parsed into an object. If <code>binary</code> option was for the request, a <code>Buffer</code> will be returned. Otherwise, a string response is returned.</d>
</p>
<p name="headers" type="object">
  <d>Incoming headers returned by the server.</d>
  <e row>

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
</e>
</p>
<p name="statusCode" type="number">
  <d>The status code returned by the server.</d>
  <e><code>200</code></e>
</p>
<p name="statusMessage" type="string">
  <d>The status message set by the server.</d>
  <e><code>OK</code></e>
</p>
%

%~%