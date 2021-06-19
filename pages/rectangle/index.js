import { useRef } from 'react'
import cn from 'classnames'
import gsapK from '../../modules/js/gsapK'
import s from './index.module.scss'
import AnimationUi from '../../components/AnimationUi'

const param = {
  easeName: 'expo',
  easeType: 'out',
  easeCustom: [0.25, 0.1, 0.25, 1],
  duration: 1,
}

export default function Rectangle() {
  const elGsap = useRef()

  const runJs = ({ duration, easeGsap }) => {
    gsapK.fromTo(
      elGsap.current,
      {
        x: '-100%',
      },
      {
        x: 0,
        duration,
        ease: easeGsap,
      }
    )
  }

  const childCss = ({ isShow, easeStyle }) => (
    <div
      className={cn(s.rectangle, s.css, {
        [s._show]: isShow,
      })}
    >
      <div className={s.inner} style={easeStyle}></div>
    </div>
  )

  const childJs = ({ isShow }) => (
    <div
      className={cn(s.rectangle, s.gsap, {
        [s._show]: isShow,
      })}
    >
      <div className={s.inner} ref={elGsap}></div>
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
