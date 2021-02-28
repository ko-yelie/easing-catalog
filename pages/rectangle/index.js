import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
// import { BezierCurveEditor } from 'react-bezier-curve-editor'
import BezierEditor from 'bezier-easing-editor'
import { className } from '../../modules/js/className'
import gsapK from '../../modules/js/gsapK'
import { camelCase } from '../../modules/js/string'
import styles from './index.module.scss'
import { debounce } from '../../modules/js/event'
import { round2 } from '../../modules/js/math'

gsap.registerPlugin(CustomEase)

const param = {
  easeName: 'expo',
  easeType: 'out',
  easeCustom: [.25,.1,.25,1],
  duration: 1,
}

const EASE_LIST = {
  linear: {
    out: {
      css: 'linear',
      gsap: 'none',
    },
    in: {
      css: 'linear',
      gsap: 'none',
    },
    inOut: {
      css: 'linear',
      gsap: 'none',
    },
  },
  ease: {
    default: {
      css: 'ease',
      gsap: '.25,.1,.25,1',
    },
    out: {
      css: 'ease-out',
      gsap: '0,0,.58,1',
    },
    in: {
      css: 'ease-in',
      gsap: '.42,0,1,1',
    },
    inOut: {
      css: 'ease-in-out',
      gsap: '.42,0,.58,1',
    },
  },
  sine: {
    out: {
      css: 'cubic-bezier(0.61, 1, 0.88, 1)',
      gsap: 'sine.out',
    },
    in: {
      css: 'cubic-bezier(0.12, 0, 0.39, 0)',
      gsap: 'sine.in',
    },
    inOut: {
      css: 'cubic-bezier(0.37, 0, 0.63, 1)',
      gsap: 'sine.inOut',
    },
  },
  quad: {
    out: {
      css: 'cubic-bezier(0.5, 1, 0.89, 1)',
      gsap: 'quad.out',
    },
    in: {
      css: 'cubic-bezier(0.11, 0, 0.5, 0)',
      gsap: 'quad.in',
    },
    inOut: {
      css: 'cubic-bezier(0.45, 0, 0.55, 1)',
      gsap: 'quad.inOut',
    },
  },
  cubic: {
    out: {
      css: 'cubic-bezier(0.33, 1, 0.68, 1)',
      gsap: 'cubic.out',
    },
    in: {
      css: 'cubic-bezier(0.32, 0, 0.67, 0)',
      gsap: 'cubic.in',
    },
    inOut: {
      css: 'cubic-bezier(0.65, 0, 0.35, 1)',
      gsap: 'cubic.inOut',
    },
  },
  quart: {
    out: {
      css: 'cubic-bezier(0.25, 1, 0.5, 1)',
      gsap: 'quart.out',
    },
    in: {
      css: 'cubic-bezier(0.5, 0, 0.75, 0)',
      gsap: 'quart.in',
    },
    inOut: {
      css: 'cubic-bezier(0.76, 0, 0.24, 1)',
      gsap: 'quart.inOut',
    },
  },
  quint: {
    out: {
      css: 'cubic-bezier(0.22, 1, 0.36, 1)',
      gsap: 'quint.out',
    },
    in: {
      css: 'cubic-bezier(0.64, 0, 0.78, 0)',
      gsap: 'quint.in',
    },
    inOut: {
      css: 'cubic-bezier(0.83, 0, 0.17, 1)',
      gsap: 'quint.inOut',
    },
  },
  expo: {
    out: {
      css: 'cubic-bezier(0.16, 1, 0.3, 1)',
      gsap: 'expo.out',
    },
    in: {
      css: 'cubic-bezier(0.7, 0, 0.84, 0)',
      gsap: 'expo.in',
    },
    inOut: {
      css: 'cubic-bezier(0.87, 0, 0.13, 1)',
      gsap: 'expo.inOut',
    },
  },
  circ: {
    out: {
      css: 'cubic-bezier(0, 0.55, 0.45, 1)',
      gsap: 'circ.out',
    },
    in: {
      css: 'cubic-bezier(0.55, 0, 1, 0.45)',
      gsap: 'circ.in',
    },
    inOut: {
      css: 'cubic-bezier(0.85, 0, 0.15, 1)',
      gsap: 'circ.inOut',
    },
  },
  back: {
    out: {
      css: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      gsap: 'back.out',
    },
    in: {
      css: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      gsap: 'back.in',
    },
    inOut: {
      css: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      gsap: 'back.inOut',
    },
  },
  elastic: {
    out: {
      css: null,
      gsap: 'elastic.out',
    },
    in: {
      css: null,
      gsap: 'elastic.in',
    },
    inOut: {
      css: null,
      gsap: 'elastic.inOut',
    },
  },
  bounce: {
    out: {
      css: null,
      gsap: 'bounce.out',
    },
    in: {
      css: null,
      gsap: 'bounce.in',
    },
    inOut: {
      css: null,
      gsap: 'bounce.inOut',
    },
  },
}

const EASE_NAME_LIST = {
  'custom': 'custom',
  'linear': 'linear (none)',
  'ease': 'ease',
  'sine': 'sine',
  'quad': 'quad (power1)',
  'cubic': 'cubic (power2)',
  'quart': 'quart (power3)',
  'quint': 'quint (power4)',
  'expo': 'expo',
  'circ': 'circ',
  'back': 'back',
  'elastic': 'elastic',
  'bounce': 'bounce',
}

const EASE_TYPE_LIST = [
  'default',
  'out',
  'in',
  'inOut',
]

let timerId

export default function Rectangle() {
  const [easeName, setEaseName] = useState(param.easeName)
  const [easeType, setEaseType] = useState(param.easeType)
  const [easeCustom, setEaseCustom] = useState(param.easeCustom)
  const [bezierEditorValue, setBezierEditorValue] = useState(param.easeCustom)
  const [duration, setDuration] = useState(param.duration)
  const [isShow, setIsShow] = useState(false)
  const elGsap = useRef()

  const isCustom = easeName === 'custom'
  const isDefaultEase = easeName === 'ease'
  const easeCustomText = String(easeCustom)
  const bezierEditorValueText = String(bezierEditorValue)

  const play = () => {
    setIsShow(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    switch (name) {
      case 'easeName':
        setEaseName(value)
        if (value !== 'ease' && easeType === 'default') {
          setEaseType('out')
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

  const handleChangeBezier = (value) => {
    const roundedValue = value.map(num => round2(num))
    setBezierEditorValue(roundedValue)
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      setEaseCustom(roundedValue)
      play()
    }, 100)
  }

  const ease = !isCustom && EASE_LIST[easeName][easeType]
  const easeCss = isCustom
    ? `cubic-bezier(${easeCustomText})`
    : ease.css
  const easeGsap = isCustom
    ? CustomEase.create('customEase', easeCustomText)
    : isDefaultEase
    ? CustomEase.create('customEase', ease.gsap)
    : ease.gsap
  const easeGsapText = isCustom
    ? `CustomEase.create('customEase', '${easeCustomText}')`
    : isDefaultEase
    ? `CustomEase.create('customEase', '${ease.gsap}')`
    : ease.gsap

  useEffect(() => {
    if (!isShow) {
      requestAnimationFrame(() => {
        setIsShow(true)

        gsapK.fromTo(elGsap.current, {
          x: '-100%',
        }, {
          x: 0,
          duration,
          ease: easeGsap,
        })
      })
    }
  }, [isShow])

  return (
    <>
      <dl className={className(styles.ui)}>
        <div>
          <dt>CSS:</dt>
          <dd>
            <div className={className(styles.rectangle, styles.css, {[styles._show]: isShow})}>
              <div
                className={styles.inner}
                style={
                  isShow
                    ? {
                        transitionTimingFunction: easeCss,
                        transitionDuration: `${duration}s`,
                      }
                    : null
                }
              ></div>
            </div>

            <div><small>{easeCss}</small></div>
          </dd>
        </div>

        <div>
          <dt>GSAP:</dt>
          <dd>
            <div className={className(styles.rectangle, styles.gsap, {[styles._show]: isShow})}>
              <div
                className={styles.inner}
                ref={elGsap}
              ></div>
            </div>

            <div><small>{easeGsapText}</small></div>
          </dd>
        </div>
      </dl>

      <dl>
        <div>
          <dt>ease:</dt>
          <dd>
            <div className={className(styles.ease)}>
              <dl>
                <div>
                  <dt>name:</dt>
                  <dd>
                    <select name="easeName" value={easeName} onChange={handleChange}>
                      {Object.entries(EASE_NAME_LIST).map(([key, value]) => (
                        <option value={key} key={key}>{value}</option>
                      ))}
                    </select>
                  </dd>
                </div>

                {!(isCustom || easeName === 'linear') &&
                  <div>
                    <dt>type:</dt>
                    <dd>
                      <select name="easeType" value={easeType} onChange={handleChange}>
                        {EASE_TYPE_LIST.map((value) =>
                          !isDefaultEase && value === 'default'
                            ? null
                            : (
                              <option value={value} key={value}>{value}</option>
                            )
                        )}
                      </select>
                    </dd>
                  </div>
                }
              </dl>

              {isCustom &&
                <div>
                  <div><small>{bezierEditorValueText}</small></div>

                  {/* <BezierCurveEditor {...(String(param.easeCustom) === String(easeCustom) ? { value: easeCustom } : null)} onChange={handleChangeBezier} /> */}
                  <BezierEditor
                    defaultValue={bezierEditorValue}
                    onChange={handleChangeBezier}
                    width={300}
                    height={300}
                    padding={[32, 32, 32, 32]}
                    textStyle={{
                      fontSize: "0",
                    }}
                  />
                </div>
              }
            </div>
          </dd>
        </div>

        <div>
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
            <div><small>{`(${duration * 1000}ms)`}</small></div>
          </dd>
        </div>
      </dl>

      <div>
        <button onClick={play}>Play</button>
      </div>
    </>
  )
}
