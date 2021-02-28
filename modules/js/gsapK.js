import { gsap } from 'gsap'

const _builtInKeys = [
  'autoCSS',
  'callbackScope',
  'delay',
  'duration',
  'ease',
  'immediateRender',
  'lazy',
  'onComplete',
  'onCompleteParams',
  'onCompleteScope',
  'onStart',
  'onStartParams',
  'onStartScope',
  'onOverwrite',
  'onRepeat',
  'onRepeatParams',
  'onRepeatScope',
  'onReverseComplete',
  'onReverseCompleteParams',
  'onReverseCompleteScope',
  'onUpdate',
  'onUpdateParams',
  'onUpdateScope',
  'overwrite',
  'paused',
  'repeat',
  'repeatDelay',
  'startAt',
  'useFrames',
  'yoyo',
  'yoyoEase',
]

function _killTweensOf(target, vars) {
  const varsKill = {}
  Object.keys(vars).forEach((key) => {
    if (_builtInKeys.some((builtInKey) => key === builtInKey)) return
    varsKill[key] = true
  })
  gsap.killTweensOf(target, varsKill)
}

const _cacheTimeline = {}

/**
 * kill を自動実行する gsap
 * （使用可能メソッドは to, fromTo, set, timeline）
 */
export const gsapK = {
  /**
   * gsap.to() と同じ
   */
  to(target, vars) {
    if (!target || target.length === 0) return
    _killTweensOf(target, vars)
    return gsap.to(target, vars)
  },

  /**
   * gsap.fromTo() と同じ
   */
  fromTo(target, fromVars, toVars) {
    if (!target || target.length === 0) return
    _killTweensOf(target, toVars)
    return gsap.fromTo(target, fromVars, toVars)
  },

  /**
   * gsap.set() と同じ
   */
  set(target, vars) {
    if (!target || target.length === 0) return
    _killTweensOf(target, vars)
    return gsap.set(target, vars)
  },

  /**
   * gsap.timeline() と同じ
   */
  timeline(name, vars) {
    if (name && _cacheTimeline[name]) {
      _cacheTimeline[name].pause().kill()
    }
    return (_cacheTimeline[name] = gsap.timeline(vars))
  },
}

export { gsapK as default }
