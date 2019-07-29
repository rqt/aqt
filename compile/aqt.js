#!/usr/bin/env node
             
const https = require('https');
const http = require('http');
const util = require('util');
const url = require('url');
const os = require('os');
const zlib = require('zlib');
const stream = require('stream');             
const {request:u} = https;
const {request:y} = http;
const {debuglog:z} = util;
const A = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, B = (a, b = !1) => A(a, 2 + (b ? 1 : 0)), C = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:G} = os;
const H = /\s+at.*(?:\(|\s)(.*)\)?/, I = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, J = G(), K = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, f = new RegExp(I.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(d => {
    d = d.match(H);
    if (null === d || !d[1]) {
      return !0;
    }
    d = d[1];
    return d.includes(".app/Contents/Resources/electron.asar") || d.includes(".app/Contents/Resources/default_app.asar") ? !1 : !f.test(d);
  }).filter(d => d.trim()).map(d => b ? d.replace(H, (e, k) => e.replace(k, k.replace(J, "~"))) : d).join("\n");
};
function L(a, b, c = !1) {
  return function(f) {
    var d = C(arguments), {stack:e} = Error();
    const k = A(e, 2, !0), l = (e = f instanceof Error) ? f.message : f;
    d = [`Error: ${l}`, ...null !== d && a === d || c ? [b] : [k, b]].join("\n");
    d = K(d);
    return Object.assign(e ? f : Error(), {message:l, stack:d});
  };
}
;function M(a) {
  var {stack:b} = Error();
  const c = C(arguments);
  b = B(b, a);
  return L(c, b, a);
}
;const {parse:N} = url;
const {Writable:O} = stream;
const P = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Q extends O {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const f = void 0 === b.binary ? !1 : b.binary, d = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {a:e = M(!0), proxyError:k} = a || {}, l = (n, q) => e(q);
    super(b);
    this.b = [];
    this.g = new Promise((n, q) => {
      this.on("finish", () => {
        let g;
        f ? g = Buffer.concat(this.b) : g = this.b.join("");
        n(g);
        this.b = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          l`${g}`;
        } else {
          const t = K(g.stack);
          g.stack = t;
          k && l`${g}`;
        }
        q(g);
      });
      d && P(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get c() {
    return this.g;
  }
}
const R = async(a, b) => {
  b = void 0 === b ? {} : b;
  ({c:a} = new Q(Object.assign({}, {rs:a}, b, {a:M(!0)})));
  return await a;
};
const {createGunzip:S} = zlib;
const T = a => {
  ({"content-encoding":a} = a.headers);
  return "gzip" == a;
}, U = (a, b, c) => {
  c = void 0 === c ? {} : c;
  const {justHeaders:f, binary:d, a:e = M(!0)} = c;
  let k, l, n, q, g = 0, t = 0;
  c = (new Promise((v, w) => {
    k = a(b, async h => {
      ({headers:l} = h);
      const {statusMessage:p, statusCode:r} = h;
      n = {statusMessage:p, statusCode:r};
      if (f) {
        h.destroy();
      } else {
        var m = T(h);
        h.on("data", x => g += x.byteLength);
        h = m ? h.pipe(S()) : h;
        q = await R(h, {binary:d});
        t = q.length;
      }
      v();
    }).on("error", h => {
      h = e(h);
      w(h);
    }).on("timeout", () => {
      k.abort();
    });
  })).then(() => Object.assign({}, {body:q, headers:l}, n, {h:g, byteLength:t, f:null}));
  return {i:k, c};
};
const V = (a = {}) => Object.keys(a).reduce((b, c) => {
  const f = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(f)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), W = async(a, b, {data:c, justHeaders:f, binary:d, a:e = M(!0)}) => {
  const {i:k, c:l} = U(a, b, {justHeaders:f, binary:d, a:e});
  k.end(c);
  a = await l;
  ({"content-type":b = ""} = a.headers);
  if ((b = b.startsWith("application/json")) && a.body) {
    try {
      a.f = JSON.parse(a.body);
    } catch (n) {
      throw e = e(n), e.response = a.body, e;
    }
  }
  return a;
};
let X;
try {
  const {version:a, name:b} = require("../package.json");
  X = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  X = "@aqt/rqt";
}
const Y = z("aqt");
module.exports = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:f = "json", headers:d = {"User-Agent":`Mozilla/5.0 (Node.JS) ${X}`}, compress:e = !0, binary:k = !1, justHeaders:l = !1, method:n, timeout:q} = b;
  b = M(!0);
  const {hostname:g, protocol:t, port:v, path:w} = N(a), h = "https:" === t ? u : y, p = {hostname:g, port:v, path:w, headers:Object.assign({}, d), timeout:q, method:n};
  if (c) {
    var r = f;
    var m = c;
    switch(r) {
      case "json":
        m = JSON.stringify(m);
        r = "application/json";
        break;
      case "form":
        m = V(m), r = "application/x-www-form-urlencoded";
    }
    m = {data:m, contentType:r};
    ({data:r} = m);
    ({contentType:m} = m);
    p.method = n || "POST";
    "Content-Type" in p.headers || (p.headers["Content-Type"] = m);
    "Content-Length" in p.headers || (p.headers["Content-Length"] = Buffer.byteLength(r));
  }
  !e || "Accept-Encoding" in p.headers || (p.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:x, headers:Z, byteLength:D, statusCode:aa, statusMessage:ba, h:E, f:F} = await W(h, p, {data:r, justHeaders:l, binary:k, a:b});
  Y("%s %s B%s", a, D, `${D != E ? ` (raw ${E} B)` : ""}`);
  return {body:F ? F : x, headers:Z, statusCode:aa, statusMessage:ba};
};


//# sourceMappingURL=aqt.js.map