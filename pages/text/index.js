import { useEffect, useRef, useState } from 'react'
import { CustomEase } from 'gsap/dist/CustomEase'
import Easing from '../../components/Easing'
import { className } from '../../modules/js/className'
import gsapK from '../../modules/js/gsapK'
import s from './index.module.scss'
import { EASE_LIST } from '../../modules/js/easeList'

const param = {
  easeName: 'power4',
  easeType: 'out',
  easeCustom: [0.25, 0.1, 0.25, 1],
  duration: 1.2,
  y: '1.2em',
  easeFade: 'power2.out',
  stagger: 0.09,
  text: 'animation',
}

export default function Text() {
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

  const play = () => {
    setIsShow(false)
  }

  const ease = !isCustom && EASE_LIST[easeName][easeType]
  const easeCss = isCustom ? `cubic-bezier(${easeCustomText})` : ease.css
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
      // NOTE: CSSアニメーションが発火するようにrequestAnimationFrameを噛ます
      requestAnimationFrame(() => {
        setIsShow(true)

        const chars = elGsap.current.querySelectorAll('span')
        const { y, easeFade, stagger } = param

        gsapK.fromTo(
          chars,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration,
            ease: easeFade,
            stagger,
          }
        )

        gsapK.fromTo(
          chars,
          {
            y,
          },
          {
            y: 0,
            duration,
            ease: easeGsap,
            stagger,
          }
        )
      })
    }
  }, [isShow, easeGsap, duration])

  return (
    <>
      <dl className={className(s.design)}>
        <div>
          <dt>CSS:</dt>
          <dd>
            <div
              className={className(s.text, s.css, {
                [s._show]: isShow,
              })}
            >
              {param.text.split('').map((char, i) => (
                <span
                  className={s.char}
                  key={`${i}-${char}`}
                  style={
                    isShow
                      ? {
                          transitionTimingFunction: easeCss,
                          transitionDuration: `${duration}s`,
                        }
                      : null
                  }
                >
                  {char}
                </span>
              ))}
            </div>

            <div>
              <small>{easeCss}</small>
            </div>
          </dd>
        </div>

        <div>
          <dt>GSAP:</dt>
          <dd>
            <div
              className={className(s.text, s.gsap, {
                [s._show]: isShow,
              })}
              ref={elGsap}
            >
              {param.text.split('').map((char, i) => (
                <span className={s.char} key={`${i}-${char}`}>
                  {char}
                </span>
              ))}
            </div>

            <div>
              <small>{easeGsapText}</small>
            </div>
          </dd>
        </div>
      </dl>

      <Easing
        easeName={easeName}
        easeType={easeType}
        bezierEditorValue={bezierEditorValue}
        duration={duration}
        isDefaultEase={isDefaultEase}
        isCustom={isCustom}
        onChangeEaseName={setEaseName}
        onChangeEaseType={setEaseType}
        onChangeDuration={setDuration}
        onChangeBezierEditorValue={setBezierEditorValue}
        onChangeEaseCustom={setEaseCustom}
        play={play}
      />

      <div>
        <button onClick={play}>Play</button>
      </div>
    </>
  )
}
