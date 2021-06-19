import { useRef } from 'react'
import { className } from '../../modules/js/className'
import gsapK from '../../modules/js/gsapK'
import s from './index.module.scss'
import AnimationUi from '../../components/AnimationUi'

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
  const elGsap = useRef()

  const runJs = ({ duration, easeGsap }) => {
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
  }

  const childCss = ({ isShow, easeStyle }) => (
    <div
      className={className(s.text, s.css, {
        [s._show]: isShow,
      })}
    >
      {param.text.split('').map((char, i) => (
        <span className={s.char} key={`${i}-${char}`} style={easeStyle}>
          {char}
        </span>
      ))}
    </div>
  )

  const childJs = ({ isShow }) => (
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
  )

  return (
    <AnimationUi
      runJs={runJs}
      childCss={childCss}
      childJs={childJs}
      {...param}
    />
  )
}
