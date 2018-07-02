
### `AConfig` Type

The configuration object is the following:

%TYPE true
<p name="data" type="object">
  <d>Optional data to send to the server with the request.</d>
</p>
<p name="type" type="'form'|'json'">
  <d>How to send data: <code>json</code> to serialise JSON data and <code>form</code> for url-encoded transmission with <code>json</code> mode by default.</d>
</p>
<p name="headers" type="object">
  <d>Headers to use for the request.</d>
</p>
<p name="method" type="string">
  <d>What HTTP method to use to send data (only works when <code>data</code> is set). Default <code>POST</code>.</d>
</p>
%
