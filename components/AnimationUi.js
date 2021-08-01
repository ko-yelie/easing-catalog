import { useEffect, useState } from 'react'
import s from './AnimationUi.module.scss'
import Easing from './ui/Easing'
import Px from './ui/Px'
import Time from './ui/Time'

export default function AnimationUi({ childCss, childJs, runJs, params }) {
  const [isShow, setIsShow] = useState(false)

  const play = () => {
    setIsShow(false)
  }

  const htmlUi = Object.entries(params).map(([name, p]) => {
    let html
    switch (p.type) {
      case 'ease': {
        const onChange = (name, type, bezier, easeGsapText, style) => {
          p.value.name = name
          p.value.type = type
          p.value.bezier = bezier
          p.value.gsap = easeGsapText
          p.value.style = style
          play()
        }
        html = (
          <Easing
            easeName={p.value.name}
            easeType={p.value.type}
            bezier={p.value.bezier}
            onChange={onChange}
          />
        )
        break
      }
      case 'time': {
        const onChange = (value) => {
          p.value = value
          play()
        }
        html = <Time value={p.value} onChange={onChange} />
        break
      }
      case 'px': {
        const onChange = (value) => {
          p.value = value
          play()
        }
        html = <Px value={p.value} onChange={onChange} />
        break
      }
    }
    return (
      <div key={name}>
        <dt>{name}:</dt>
        <dd>{html}</dd>
      </div>
    )
  })

  useEffect(() => {
    if (!isShow) {
      setIsShow(true)
      runJs()
    }
  }, [isShow, runJs])

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === 'KeyP') {
        e.preventDefault()
        play()
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return (
    <div className={s.root}>
      <dl className={s.visual}>
        {childCss && (
          <div>
            <dt>CSS:</dt>
            <dd>{childCss(isShow)}</dd>
          </div>
        )}

        <div>
          <dt>GSAP:</dt>
          <dd>
            {childJs(isShow)}

            <div>{/* <small>{easeGsapText}</small> */}</div>
          </dd>
        </div>
      </dl>

      <div className={s.ui}>
        <div>
          <button onClick={play}>Play</button>
        </div>

        <dl>{htmlUi}</dl>
      </div>
    </div>
  )
}
