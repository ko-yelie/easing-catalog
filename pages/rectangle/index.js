import { useEffect, useState } from 'react'
import { className } from '../../modules/js/className'
import { camelCase } from '../../modules/js/string'
import styles from './index.module.scss'

const param = {
  easeName: 'expo',
  easeType: 'out',
  duration: 1,
}

const EASE_LIST = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  easeInSine: 'cubic-bezier(0.12, 0, 0.39, 0)',
  easeOutSine: 'cubic-bezier(0.61, 1, 0.88, 1)',
  easeInOutSine: 'cubic-bezier(0.37, 0, 0.63, 1)',
  easeInQuad: 'cubic-bezier(0.11, 0, 0.5, 0)',
  easeOutQuad: 'cubic-bezier(0.5, 1, 0.89, 1)',
  easeInOutQuad: 'cubic-bezier(0.45, 0, 0.55, 1)',
  easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
  easeInQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  easeInQuint: 'cubic-bezier(0.64, 0, 0.78, 0)',
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeInOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
  easeInExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
  easeInCirc: 'cubic-bezier(0.55, 0, 1, 0.45)',
  easeOutCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',
  easeInOutCirc: 'cubic-bezier(0.85, 0, 0.15, 1)',
  easeInBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  // easeInElastic: 'no',
  // easeOutElastic: 'no',
  // easeInOutElastic: 'no',
  // easeInBounce: 'no',
  // easeOutBounce: 'no',
  // easeInOutBounce: 'no',
}

const EASE_NAME_LIST = [
  'ease',
  'sine',
  'quad',
  'cubic',
  'quart',
  'quint',
  'expo',
  'circ',
  'back',
  // 'elastic',
  // 'bounce',
]

const EASE_TYPE_LIST = [
  '',
  'in',
  'out',
  'inOut',
]

export default function Rectangle() {
  const [easeName, setEaseName] = useState(param.easeName)
  const [easeType, setEaseType] = useState(param.easeType)
  const [duration, setDuration] = useState(param.duration)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (!isShow) {
      requestAnimationFrame(() => {
        setIsShow(true)
      })
    }
  }, [isShow])

  const play = () => {
    setIsShow(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    switch (name) {
      case 'easeName':
        setEaseName(value)
        if (value !== 'ease' && easeType === '') {
          setEaseType('in')
        }
        break
      case 'easeType':
        setEaseType(value)
        break
      case 'duration':
        if (value === '') return
        setDuration(Number(value))
        break
    }
    play()
  }

  const ease = EASE_LIST[camelCase(`ease ${easeType} ${easeName === 'ease' ? '' : easeName}`)]

  return (
    <>
      <div className={className(styles.rectangle, {[styles._show]: isShow})}>
        <div
          className={styles.inner}
          style={
            isShow
              ? {
                  transitionTimingFunction: ease,
                  transitionDuration: `${duration}s`,
                }
              : null
          }
        ></div>
      </div>

      <dl>
        <dt>ease:</dt>
        <dd>
          <dl>
            <dt>name:</dt>
            <dd>
              <select name="easeName" value={easeName} onChange={handleChange}>
                {EASE_NAME_LIST.map((value) => (
                  <option value={value} key={value}>{value}</option>
                ))}
              </select>
            </dd>

            <dt>type:</dt>
            <dd>
              <select name="easeType" value={easeType} onChange={handleChange}>
                {EASE_TYPE_LIST.map((value) =>
                  easeName !== 'ease' && value === ''
                    ? null
                    : (
                      <option value={value} key={value}>{value}</option>
                    )
                )}
              </select>
            </dd>
          </dl>

          <small>{`(${ease})`}</small>
        </dd>

        <dt>duration:</dt>
        <dd>
          <input
            name="duration"
            type="number"
            step="0.1"
            value={duration}
            onChange={handleChange}
          ></input>s
          {' '}
          <small>{`(${duration * 1000}ms)`}</small>
        </dd>
      </dl>

      <div>
        <button onClick={play}>Play</button>
      </div>
    </>
  )
}
