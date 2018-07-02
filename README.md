# aqt

[![npm version](https://badge.fury.io/js/aqt.svg)](https://npmjs.org/package/aqt)

`aqt` is an advanced request for Node.js which returns body, headers and status after _gzip_ when necessary.

```sh
yarn add -E aqt
```

## API

### `aqt(): AQT`

Call this function to get a result you want.

```javascript
import aqt from 'aqt'

(async () => {
  await aqt()
})()
```

---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
