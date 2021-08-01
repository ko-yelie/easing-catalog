import { useEffect, useState } from 'react'
import { CustomEase } from 'gsap/dist/CustomEase'
import s from './AnimationUi.module.scss'
import { EASE_LIST } from '@modules/js/easeList'
import Easing from './ui/Easing'
import Duration from './ui/Duration'

export default function AnimationUi({ childCss, childJs, runJs, ...param }) {
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
      setIsShow(true)
      runJs({ duration, easeGsap })
    }
  }, [isShow, easeGsap, duration, runJs])

  return (
    <>
      <dl className={s.root}>
        {childCss && (
          <div>
            <dt>CSS:</dt>
            <dd>
              {childCss({ isShow, easeStyle })}

              <div>
                <small>{easeCss}</small>
              </div>
            </dd>
          </div>
        )}

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

      <dl>
        <Easing
          easeName={easeName}
          easeType={easeType}
          bezierEditorValue={bezierEditorValue}
          isDefaultEase={isDefaultEase}
          isCustom={isCustom}
          onChangeEaseName={setEaseName}
          onChangeEaseType={setEaseType}
          onChangeBezierEditorValue={setBezierEditorValue}
          onChangeEaseCustom={setEaseCustom}
          play={play}
        />

        <Duration
          duration={duration}
          onChangeDuration={setDuration}
          play={play}
        />
      </dl>

      <div>
        <button onClick={play}>Play</button>
      </div>
    </>
  )
}
