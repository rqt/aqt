import erotic from 'erotic'
import makeRequest from './make-request'

export const getFormData = (form = {}) => {
  const urlEncodedDataPairs = Object.keys(form).reduce((acc, key) => {
    const v = form[key]
    const p = `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
    return [...acc, p]
  }, [])

  const d = urlEncodedDataPairs.join('&').replace(/%20/g, '+')
  return d
}

export const getData = (type, data) => {
  switch (type) {
  case 'json':
    data = JSON.stringify(data)
    type = 'application/json'
    break
  case 'form':
    data = getFormData(data)
    type = 'application/x-www-form-urlencoded'
    break
  }
  return {
    data,
    contentType: type,
  }
}

export const exec = async (request, requestOptions,
  { data, justHeaders, binary, er = erotic(true) },
) => {
  const { req, promise } = makeRequest(request, requestOptions, {
    justHeaders,
    binary,
    er,
  })
  req.end(data)
  const res = await promise

  const isJson = isHeadersJson(res.headers)

  if (isJson && res.body) {
    try {
      res.parsedBody = JSON.parse(res.body)
    } catch (e) {
      const err = er(e)
      err.response = res.body
      throw err
    }
  }

  return res
}

/**
 * @param {IncomingMessage.headers} headers
 */
const isHeadersJson = (headers) => {
  const { 'content-type': contentType = '' } = headers
  return contentType.startsWith('application/json')
}