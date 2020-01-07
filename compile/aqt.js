#!/usr/bin/env node
             
const https = require('https');
const http = require('http');
const util = require('util');
const url = require('url');
const os = require('os');
const zlib = require('zlib');
const stream = require('stream');             
const t = https.request;
const x = http.request;
const y = util.debuglog;
const z = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, A = (a, b = !1) => z(a, 2 + (b ? 1 : 0)), B = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const F = os.homedir;
const G = /\s+at.*(?:\(|\s)(.*)\)?/, H = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, I = F(), J = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, f = new RegExp(H.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(d => {
    d = d.match(G);
    if (null === d || !d[1]) {
      return !0;
    }
    d = d[1];
    return d.includes(".app/Contents/Resources/electron.asar") || d.includes(".app/Contents/Resources/default_app.asar") ? !1 : !f.test(d);
  }).filter(d => d.trim()).map(d => b ? d.replace(G, (e, k) => e.replace(k, k.replace(I, "~"))) : d).join("\n");
};
function K(a, b, c = !1) {
  return function(f) {
    var d = B(arguments), {stack:e} = Error();
    const k = z(e, 2, !0), l = (e = f instanceof Error) ? f.message : f;
    d = [`Error: ${l}`, ...null !== d && a === d || c ? [b] : [k, b]].join("\n");
    d = J(d);
    return Object.assign(e ? f : Error(), {message:l, stack:d});
  };
}
;function L(a) {
  var {stack:b} = Error();
  const c = B(arguments);
  b = A(b, a);
  return K(c, b, a);
}
;const M = url.parse;
const N = stream.Writable;
const O = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class P extends N {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...f} = a || {}, {b:d = L(!0), proxyError:e} = a || {}, k = (l, m) => d(m);
    super(f);
    this.a = [];
    this.g = new Promise((l, m) => {
      this.on("finish", () => {
        let g;
        b ? g = Buffer.concat(this.a) : g = this.a.join("");
        l(g);
        this.a = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          k`${g}`;
        } else {
          const r = J(g.stack);
          g.stack = r;
          e && k`${g}`;
        }
        m(g);
      });
      c && O(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get c() {
    return this.g;
  }
}
const Q = async(a, b = {}) => {
  ({c:a} = new P({rs:a, ...b, b:L(!0)}));
  return await a;
};
const R = zlib.createGunzip;
const S = (a, b, c = {}) => {
  const {justHeaders:f, binary:d, b:e = L(!0)} = c;
  let k, l, m, g, r = 0, u = 0;
  c = (new Promise((v, w) => {
    k = a(b, async h => {
      ({headers:l} = h);
      m = {statusMessage:h.statusMessage, statusCode:h.statusCode};
      if (f) {
        h.destroy();
      } else {
        var n = "gzip" == h.headers.a;
        h.on("data", q => r += q.byteLength);
        h = n ? h.pipe(R()) : h;
        g = await Q(h, {binary:d});
        u = g.length;
      }
      v();
    }).on("error", h => {
      h = e(h);
      w(h);
    }).on("timeout", () => {
      k.abort();
    });
  })).then(() => ({body:g, headers:l, ...m, h:r, byteLength:u, f:null}));
  return {i:k, c};
};
const T = (a = {}) => Object.keys(a).reduce((b, c) => {
  const f = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(f)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), U = async(a, b, {data:c, justHeaders:f, binary:d, b:e = L(!0)}) => {
  const {i:k, c:l} = S(a, b, {justHeaders:f, binary:d, b:e});
  k.end(c);
  a = await l;
  ({"content-type":b = ""} = a.headers);
  if ((b = b.startsWith("application/json")) && a.body) {
    try {
      a.f = JSON.parse(a.body);
    } catch (m) {
      throw e = e(m), e.response = a.body, e;
    }
  }
  return a;
};
let V;
try {
  const {version:a, name:b} = require("../package.json");
  V = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  V = "@aqt/rqt";
}
const W = y("aqt");
module.exports = async(a, b = {}) => {
  const {data:c, type:f = "json", headers:d = {"User-Agent":`Mozilla/5.0 (Node.JS) ${V}`}, compress:e = !0, binary:k = !1, justHeaders:l = !1, method:m, timeout:g} = b;
  b = L(!0);
  const {hostname:r, protocol:u, port:v, path:w} = M(a), h = "https:" === u ? t : x, n = {hostname:r, port:v, path:w, headers:{...d}, timeout:g, method:m};
  if (c) {
    var q = f;
    var p = c;
    switch(q) {
      case "json":
        p = JSON.stringify(p);
        q = "application/json";
        break;
      case "form":
        p = T(p), q = "application/x-www-form-urlencoded";
    }
    p = {data:p, contentType:q};
    ({data:q} = p);
    p = p.contentType;
    n.method = m || "POST";
    "Content-Type" in n.headers || (n.headers["Content-Type"] = p);
    "Content-Length" in n.headers || (n.headers["Content-Length"] = Buffer.byteLength(q));
  }
  !e || "Accept-Encoding" in n.headers || (n.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:X, headers:Y, byteLength:C, statusCode:Z, statusMessage:aa, h:D, f:E} = await U(h, n, {data:q, justHeaders:l, binary:k, b});
  W("%s %s B%s", a, C, `${C != D ? ` (raw ${D} B)` : ""}`);
  return {body:E ? E : X, headers:Y, statusCode:Z, statusMessage:aa};
};


//# sourceMappingURL=aqt.js.map