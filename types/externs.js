/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/**
 * Configuration for requests.
 * @typedef {{ data: ((!Object)|undefined), type: (string|undefined), headers: ((!http.OutgoingHttpHeaders)|undefined), compress: (boolean|undefined), timeout: (number|undefined), method: (string|undefined), binary: (boolean|undefined), justHeaders: (boolean|undefined) }}
 */
_rqt.AqtOptions

/* typal types/return.xml externs */
/** @const */
var _rqt = {}
/**
 * The return type of the function.
 * @typedef {{ body: !(string|Object|Buffer), headers: !http.IncomingHttpHeaders, statusCode: number, statusMessage: string }}
 */
_rqt.AqtReturn
