/**
 * event の起きた点の、クライアント内での X, Y 座標を取得する
 * @param {Event} e - event object
 * @return {{x: number, y: number}}
 */
export function getClientPos(e) {
  const eObj = e.changedTouches ? e.changedTouches[0] : e

  return {
    x: eObj.clientX,
    y: eObj.clientY,
  }
}

/**
 * event の起きた点の、offset X, Y 座標を取得する
 * @param {Event} e - event object
 * @return {{x: number, y: number}}
 */
export function getOffsetPos(e) {
  const eObj = e.changedTouches ? e.changedTouches[0] : e

  return {
    x: eObj.offsetX,
    y: eObj.offsetY,
  }
}

export function throttle(fn, delay) {
  let timerId
  let lastExecTime = 0
  return function () {
    const elapsedTime = performance.now() - lastExecTime
    const execute = () => {
      fn.apply(this, arguments)
      lastExecTime = performance.now()
    }
    if (!timerId) {
      execute()
    }
    if (timerId) {
      clearTimeout(timerId)
    }
    if (elapsedTime > delay) {
      execute()
    } else {
      timerId = setTimeout(execute, delay)
    }
  }
}

export function debounce(fn, interval) {
  let timerId
  return function () {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

/**
 * DOM 解析完了時のイベントハンドラ登録（既に完了している場合は即実行）
 *
 * @param {function} fn イベントハンドラ
 */
export function onReady(fn) {
  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

/**
 * 画像読み込み完了時のイベントハンドラ登録（既に完了している場合は即実行）
 *
 * @param {function} fn イベントハンドラ
 */
export function onLoad(fn) {
  if (document.readyState === 'complete') {
    fn()
  } else {
    window.addEventListener('load', fn)
  }
}
