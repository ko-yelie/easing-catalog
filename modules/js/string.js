/* ----------------------------------------
  文字列
---------------------------------------- */

/**
 * ユニークな文字列を取得
 * @param {string} [prefix=''] - プレフィックス文字列
 * @return {string}
 */
export function getUniqueId(prefix = '') {
  window.sdUniqueId = window.sdUniqueId > 0 ? window.sdUniqueId : 0
  return prefix + String(window.sdUniqueId++)
}

/**
 * ゼロパディング
 * @param {number} number - 数値
 * @param {number} digits - 桁数
 * @return {string} ゼロパディングした文字列
 */
export function padStartWithZero(number, digits) {
  return (Array(digits).join('0') + number).slice(-digits)
}

/**
 * 2桁のゼロパディング
 * @param {number} number - 数値
 * @return {string} ゼロパディングした文字列
 */
export function padStartWithZero2(number) {
  return padStartWithZero(number, 2)
}

/**
 * 半角スペースを br タグに変換
 * @param {string} text - テキスト
 * @return {string} 変換後のテキスト
 */
export function space2br(text) {
  return text.replace(/ /g, '<br>')
}

/**
 * キャメルケースへ変換 sampleString
 * @param {string}
 * @return {string}
 */
export function camelCase(str) {
  str = str.charAt(0).toLowerCase() + str.slice(1)
  return str
    .replace(/[-_ ](.)/g, function (match, group1) {
      return group1.toUpperCase()
    })
    .trim()
}

/**
 * スネークケースへ変換 sample_string
 * @param {string}
 * @return {string}
 */
export function snakeCase(str) {
  const camel = camelCase(str)
  return camel.replace(/[A-Z]/g, function (s) {
    return '_' + s.charAt(0).toLowerCase()
  })
}

/**
 * パスカルケースへ変換 SampleString
 * @param {string}
 * @return {string}
 */
export function pascalCase(str) {
  const camel = camelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}
