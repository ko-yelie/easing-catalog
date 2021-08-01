import { CustomEase } from 'gsap/dist/CustomEase'
// import { BezierCurveEditor } from 'react-bezier-curve-editor'
import BezierEditor from 'bezier-easing-editor'
import s from './Easing.module.scss'
import { round2 } from '@modules/js/math'
import { EASE_LIST, EASE_NAME_LIST, EASE_TYPE_LIST } from '@modules/js/easeList'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Easing({ easeName, easeType, bezier, onChange }) {
  const [easeText, setEaseText] = useState('')
  const [isCustom, setIsCustom] = useState(easeName === 'custom')
  const [isDefaultEase, setIsDefaultEase] = useState(easeName === 'ease')
  const [myBezier, setMyBezier] = useState(bezier || [0.25, 0.1, 0.25, 1])
  const isMount = useRef(false)

  const bezierEditorValueText = String(myBezier)

  const handleChange = useCallback(
    (event) => {
      let name, value
      if (event) {
        ;({
          currentTarget: { name, value },
        } = event)
      }
      let easeNameCurrent = easeName
      let easeTypeCurrent = easeType
      let bezierCurrent = bezier || [0.25, 0.1, 0.25, 1]
      switch (name) {
        case 'easeName':
          easeNameCurrent =
            value !== 'ease' && easeType === 'default' ? 'out' : value
          break
        case 'easeType':
          easeTypeCurrent = value
          break
        case 'bezier':
          bezierCurrent = value
          setMyBezier(value)
          break
      }
      const isDefaultEase = easeNameCurrent === 'ease'
      const isCustom = easeNameCurrent === 'custom'
      const ease = !isCustom && EASE_LIST[easeNameCurrent][easeTypeCurrent]
      const easeCustomText = String(bezierCurrent)
      const easeGsapText = isCustom
        ? CustomEase.create('customEase', easeCustomText)
        : isDefaultEase
        ? CustomEase.create('customEase', ease.gsap)
        : ease.gsap
      onChange(easeNameCurrent, easeTypeCurrent, bezierCurrent, easeGsapText)
      setEaseText(isCustom ? easeCustomText : ease.gsap)
      setIsCustom(isCustom)
      setIsDefaultEase(isDefaultEase)
    },
    [easeName, easeType, bezier, onChange]
  )

  const handleChangeBezier = (value) => {
    const roundedValue = value.map((num) => round2(num))
    handleChange({
      currentTarget: {
        name: 'bezier',
        value: roundedValue,
      },
    })
  }

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      handleChange()
    }
  }, [handleChange])

  return (
    <div className={s.ease}>
      <dl>
        <div>
          <small>{easeText}</small>
        </div>

        <div>
          <dt>name:</dt>
          <dd>
            <select name="easeName" value={easeName} onChange={handleChange}>
              {Object.entries(EASE_NAME_LIST).map(([key, value]) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
          </dd>
        </div>

        {!(isCustom || easeName === 'linear') && (
          <div>
            <dt>type:</dt>
            <dd>
              <select name="easeType" value={easeType} onChange={handleChange}>
                {EASE_TYPE_LIST.map((value) =>
                  !isDefaultEase && value === 'default' ? null : (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </dd>
          </div>
        )}
      </dl>

      {isCustom && (
        <div>
          <div>
            <small>{bezierEditorValueText}</small>
          </div>

          {/* <BezierCurveEditor {...(String(param.easeCustom) === String(easeCustom) ? { value: easeCustom } : null)} onChange={handleChangeBezier} /> */}
          <BezierEditor
            defaultValue={bezier}
            onChange={handleChangeBezier}
            width={300}
            height={300}
            padding={[32, 32, 32, 32]}
            textStyle={{
              fontSize: '0',
            }}
          />
        </div>
      )}
    </div>
  )
}
