import { useRef } from 'react'
import cn from 'classnames'
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

  const childCss = ({ isShow, easeStyle }) => (
    <div
      className={cn(s.text, s.css, {
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
      className={cn(s.text, s.gsap, {
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

  return (
    <AnimationUi
      childCss={childCss}
      childJs={childJs}
      runJs={runJs}
      {...param}
    />
  )
}
