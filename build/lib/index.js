"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMessageGzip = exports.exec = exports.getData = exports.getFormData = void 0;

var _erotic = _interopRequireDefault(require("erotic"));

var _makeRequest = require("./make-request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFormData = (form = {}) => {
  const urlEncodedDataPairs = Object.keys(form).reduce((acc, key) => {
    const v = form[key];
    const p = `${encodeURIComponent(key)}=${encodeURIComponent(v)}`;
    return [...acc, p];
  }, []);
  const d = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
  return d;
};

exports.getFormData = getFormData;

const getData = (type, data) => {
  switch (type) {
    case 'json':
      data = JSON.stringify(data);
      type = 'application/json';
      break;

    case 'form':
      data = getFormData(data);
      type = 'application/x-www-form-urlencoded';
      break;
  }

  return {
    data,
    contentType: type
  };
};

exports.getData = getData;

const exec = async (request, requestOptions, {
  data,
  justHeaders,
  binary,
  er = (0, _erotic.default)(true)
}) => {
  const {
    req,
    promise
  } = (0, _makeRequest.makeRequest)(request, requestOptions, {
    justHeaders,
    binary,
    er
  });

  if (data) {
    req.write(data, () => {
      req.end();
    });
  } else {
    req.end();
  }

  const res = await promise;
  const isJson = isHeadersJson(res.headers);

  if (isJson) {
    try {
      res.parsedBody = JSON.parse(res.body);
    } catch (e) {
      const err = er(e);
      err.response = res.body;
      throw err;
    }
  }

  return res;
};
/**
 * @param {IncomingMessage.headers} headers
 */


exports.exec = exec;

const isHeadersJson = headers => {
  return headers['content-type'].startsWith('application/json');
};
/**
 * @param {IncomingMessage} req
 */


const isMessageGzip = res => {
  return res.headers['content-encoding'] == 'gzip';
};

exports.isMessageGzip = isMessageGzip;
//# sourceMappingURL=index.js.map