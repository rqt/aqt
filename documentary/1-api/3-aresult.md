
### `AResult` Type

The result of the `aqt` function will have the following structure:

%TYPE true
<p name="body" type="string|object|Buffer">
  <d>The return from the server. In case <code>json</code> content-type was set by the server, the response will be parsed into an object. If <code>binary</code> option was for the request, a <code>Buffer</code> will be returned. Otherwise, a string response is returned.</d>
</p>
<p name="headers" type="object">
  <d>Incoming headers returned by the server.</d>
  <e>

```json
{
  "server": "GitHub.com",
  "content-type": "application/json",
  "content-length": "2",
  "connection": "close",
  "status": "200 OK"
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
