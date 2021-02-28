/**
 * GLSL の mix と同じ
 *
 * @export
 * @param {number} x
 * @param {number} y
 * @param {number} a
 * @returns {number}
 */
export function mix(x, y, a) {
  return x * (1 - a) + y * a
}

/**
 * mix と同じ
 *
 * @export
 * @param {number} x
 * @param {number} y
 * @param {number} a
 * @returns {number}
 */
export function lerp(x, y, a) {
  return x * (1 - a) + y * a
}

/**
 * GLSL の clamp と同じ
 *
 * @export
 * @param {number} x
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b)
}

/**
 * 値のマッピング
 *
 * @export
 * @param {number} num
 * @param {number} toMin
 * @param {number} toMax
 * @param {number} fromMin
 * @param {number} fromMax
 * @returns {number}
 */
export function map(num, toMin, toMax, fromMin, fromMax) {
  if (num <= fromMin) {
    return toMin
  }
  if (num >= fromMax) {
    return toMax
  }
  const p = (toMax - toMin) / (fromMax - fromMin)
  return (num - fromMin) * p + toMin
}

/**
 * 指定した位に小数を丸める
 *
 * @export
 * @param {number} num 丸める小数
 * @param {number} place 丸める位
 * @returns {number} 丸めた小数
 */
export function roundDecimal(num, place) {
  const exponentiation = 10 ** place
  return Math.round(num * exponentiation) / exponentiation
}

/**
 * 小数第 2 位に丸める
 *
 * @export
 * @param {number} num 丸める小数
 * @returns {number} 丸めた小数
 */
export function round2(num) {
  return Math.round(num * 100) / 100
}

/**
 * スライダーのようなループするインデックスを取得
 *
 * @export
 * @param {number} index インデックス（ループ範囲外も対象）
 * @param {number} length インデックスのループ数
 * @returns {number} ループした後のインデックス
 */
export function getLoopIndex(index, length) {
  return (index + length) % length
}

/**
 * 乱数取得
 *
 * @export
 * @param {number} [min=0] 最小値
 * @param {number} [max=1] 最大値
 * @returns {number}
 */
export function getRandom(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}
