import { useEffect, useRef, useState } from 'react'
import { className } from '../../modules/js/className'
import gsapK from '../../modules/js/gsapK'
import { camelCase } from '../../modules/js/string'
import styles from './index.module.scss'

const param = {
  easeName: 'expo',
  easeType: 'out',
  duration: 1,
}

const EASE_LIST = {
  linear: {
    in: {
      css: 'linear',
      gsap: 'none',
    },
    out: {
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
      gsap: CustomEase.create('ease', '.25,.1,.25,1'),
    },
    in: {
      css: 'ease-in',
      gsap: CustomEase.create('ease-in', '.42,0,1,1'),
    },
    out: {
      css: 'ease-out',
      gsap: CustomEase.create('ease-out', '0,0,.58,1'),
    },
    inOut: {
      css: 'ease-in-out',
      gsap: CustomEase.create('ease-in-out', '.42,0,.58,1'),
    },
  },
  sine: {
    in: {
      css: 'cubic-bezier(0.12, 0, 0.39, 0)',
      gsap: 'sine.in',
    },
    out: {
      css: 'cubic-bezier(0.61, 1, 0.88, 1)',
      gsap: 'sine.out',
    },
    inOut: {
      css: 'cubic-bezier(0.37, 0, 0.63, 1)',
      gsap: 'sine.inOut',
    },
  },
  quad: {
    in: {
      css: 'cubic-bezier(0.11, 0, 0.5, 0)',
      gsap: 'quad.in',
    },
    out: {
      css: 'cubic-bezier(0.5, 1, 0.89, 1)',
      gsap: 'quad.out',
    },
    inOut: {
      css: 'cubic-bezier(0.45, 0, 0.55, 1)',
      gsap: 'quad.inOut',
    },
  },
  cubic: {
    in: {
      css: 'cubic-bezier(0.32, 0, 0.67, 0)',
      gsap: 'cubic.in',
    },
    out: {
      css: 'cubic-bezier(0.33, 1, 0.68, 1)',
      gsap: 'cubic.out',
    },
    inOut: {
      css: 'cubic-bezier(0.65, 0, 0.35, 1)',
      gsap: 'cubic.inOut',
    },
  },
  quart: {
    in: {
      css: 'cubic-bezier(0.5, 0, 0.75, 0)',
      gsap: 'quart.in',
    },
    out: {
      css: 'cubic-bezier(0.25, 1, 0.5, 1)',
      gsap: 'quart.out',
    },
    inOut: {
      css: 'cubic-bezier(0.76, 0, 0.24, 1)',
      gsap: 'quart.inOut',
    },
  },
  quint: {
    in: {
      css: 'cubic-bezier(0.64, 0, 0.78, 0)',
      gsap: 'quint.in',
    },
    out: {
      css: 'cubic-bezier(0.22, 1, 0.36, 1)',
      gsap: 'quint.out',
    },
    inOut: {
      css: 'cubic-bezier(0.83, 0, 0.17, 1)',
      gsap: 'quint.inOut',
    },
  },
  expo: {
    in: {
      css: 'cubic-bezier(0.7, 0, 0.84, 0)',
      gsap: 'expo.in',
    },
    out: {
      css: 'cubic-bezier(0.16, 1, 0.3, 1)',
      gsap: 'expo.out',
    },
    inOut: {
      css: 'cubic-bezier(0.87, 0, 0.13, 1)',
      gsap: 'expo.inOut',
    },
  },
  circ: {
    in: {
      css: 'cubic-bezier(0.55, 0, 1, 0.45)',
      gsap: 'circ.in',
    },
    out: {
      css: 'cubic-bezier(0, 0.55, 0.45, 1)',
      gsap: 'circ.out',
    },
    inOut: {
      css: 'cubic-bezier(0.85, 0, 0.15, 1)',
      gsap: 'circ.inOut',
    },
  },
  back: {
    in: {
      css: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      gsap: 'back.in',
    },
    out: {
      css: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      gsap: 'back.out',
    },
    inOut: {
      css: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      gsap: 'back.inOut',
    },
  },
  elastic: {
    in: {
      css: null,
      gsap: 'elastic.in',
    },
    out: {
      css: null,
      gsap: 'elastic.out',
    },
    inOut: {
      css: null,
      gsap: 'elastic.inOut',
    },
  },
  bounce: {
    in: {
      css: null,
      gsap: 'bounce.in',
    },
    out: {
      css: null,
      gsap: 'bounce.out',
    },
    inOut: {
      css: null,
      gsap: 'bounce.inOut',
    },
  },
}

const EASE_NAME_LIST = {
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
  'in',
  'out',
  'inOut',
]

export default function Rectangle() {
  const [easeName, setEaseName] = useState(param.easeName)
  const [easeType, setEaseType] = useState(param.easeType)
  const [duration, setDuration] = useState(param.duration)
  const [isShow, setIsShow] = useState(false)
  const elGsap = useRef()

  const play = () => {
    setIsShow(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    switch (name) {
      case 'easeName':
        setEaseName(value)
        if (value !== 'ease' && easeType === 'default') {
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

  const easeCss = EASE_LIST[easeName][easeType].css
  const easeGsap = EASE_LIST[easeName][easeType].gsap

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

            <small>{easeCss}</small>
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

            <small>{easeGsap}</small>
          </dd>
        </div>
      </dl>

      <dl>
        <dt>ease:</dt>
        <dd>
          <dl>
            <dt>name:</dt>
            <dd>
              <select name="easeName" value={easeName} onChange={handleChange}>
                {Object.entries(EASE_NAME_LIST).map(([key, value]) => (
                  <option value={key} key={key}>{value}</option>
                ))}
              </select>
            </dd>

            {easeName !== 'linear' &&
              <>
                <dt>type:</dt>
                <dd>
                  <select name="easeType" value={easeType} onChange={handleChange}>
                    {EASE_TYPE_LIST.map((value) =>
                      easeName !== 'ease' && value === 'default'
                        ? null
                        : (
                          <option value={value} key={value}>{value}</option>
                        )
                    )}
                  </select>
                </dd>
              </>
            }
          </dl>
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
