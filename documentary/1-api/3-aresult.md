
### `AResult` Type

The result of the `aqt` function will have the following structure:

%TYPE true
<p name="body" type="string|object|Buffer">
  <d>The return from the server. In case `json` content-type was set by the server, the response will be parsed into an object. If <code>binary</code> option was for the request, a <code>Buffer</code> will be returned. Otherwise, a string response is returned.</d>
</p>
<p name="headers" type="object">
  <d>Incoming headers returned by the server.</d>
  <e>

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
