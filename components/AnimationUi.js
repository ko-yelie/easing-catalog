import { useEffect, useState } from 'react'
import { CustomEase } from 'gsap/dist/CustomEase'
import Easing from './Easing'
import s from './AnimationUi.module.scss'
import { EASE_LIST } from '../modules/js/easeList'

export default function AnimationUi({ runJs, childCss, childJs, ...param }) {
  const [easeName, setEaseName] = useState(param.easeName)
  const [easeType, setEaseType] = useState(param.easeType)
  const [easeCustom, setEaseCustom] = useState(param.easeCustom)
  const [bezierEditorValue, setBezierEditorValue] = useState(param.easeCustom)
  const [duration, setDuration] = useState(param.duration)
  const [isShow, setIsShow] = useState(false)

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
  const easeStyle = isShow
    ? {
        transitionTimingFunction: easeCss,
        transitionDuration: `${duration}s`,
      }
    : null

  useEffect(() => {
    if (!isShow) {
      // NOTE: CSSアニメーションが発火するようにrequestAnimationFrameを噛ます
      requestAnimationFrame(() => {
        setIsShow(true)

        runJs({ duration, easeGsap })
      })
    }
  }, [isShow, easeGsap, duration, runJs])

  return (
    <>
      <dl className={s.root}>
        <div>
          <dt>CSS:</dt>
          <dd>
            {childCss({ isShow, easeStyle })}

            <div>
              <small>{easeCss}</small>
            </div>
          </dd>
        </div>

        <div>
          <dt>GSAP:</dt>
          <dd>
            {childJs({ isShow })}

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
