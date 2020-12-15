// 非特殊符号(仅中英文数字)
/**
 * @param {string} name
 * @returns {Boolean}
 */
export function validName(name) {
  const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  return reg.test(name)
}

// 非中文
/**
 * @param {string} name
 * @returns {Boolean}
 */
export function validNameNoCN_only(name) {
  const reg = /^[^\u4e00-\u9fa5]+$/
  return reg.test(name)
}

// email
/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

// 正整数
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPositiveInt(str) {
  const reg = /^[1-9]+[0-9]*$/
  return reg.test(str)
}

// tinyInteger、Integer、bigInteger ( 整数 )
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validInt(str) {
  const reg = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/
  return reg.test(str)
}


// 仅数字（可小数）
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validFloatNumber(str) {
  const reg = /^\d+$|^\d+[.]?\d+$/
  return reg.test(str)
}

// 非中文非特殊字符
/**
 * @param {string} name
 * @returns {Boolean}
 */
export function validNameNoCN(name) {
  const reg = /^[a-zA-Z0-9]+$/
  return reg.test(name)
}

// 数据表名称规范
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validTableName(str) {
  const reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  return reg.test(str)
}

// ipAddress
/**
 * @param {string} ipAddress
 * @returns {Boolean}
 */
export function validIpAddress(ipAddress) {
  const reg = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1 -9]?\d))))$/
  return reg.test(ipAddress)
}

// path
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// url
/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

// 小写字母
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

// 大写字母
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

// mobile
/**
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile(mobile) {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  return reg.test(mobile)
}
