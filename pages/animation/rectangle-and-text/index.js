import { useRef } from 'react'
import cn from 'classnames'
import gsapK from '@modules/js/gsapK'
import s from './index.module.scss'
import AnimationUi from '@components/AnimationUi'

const param = {
  easeName: 'power4',
  easeType: 'out',
  easeCustom: [0.25, 0.1, 0.25, 1],
  duration: 1,
  delayMain: 0.4,
}

export default function Rectangle() {
  const elCoverMain = useRef()
  const elCoverFirst = useRef()

  const childJs = ({ isShow }) => (
    <div
      className={cn(s.rectangle, s._gsap, {
        [s._show]: isShow,
      })}
    >
      <div className={cn(s.cover, s._main)} ref={elCoverMain}></div>
      <div className={cn(s.cover, s._first)} ref={elCoverFirst}></div>
    </div>
  )

  const runJs = ({ duration, easeGsap }) => {
    gsapK.fromTo(
      elCoverFirst.current,
      {
        x: 0,
      },
      {
        x: '100%',
        duration,
        ease: easeGsap,
      }
    )

    gsapK.fromTo(
      elCoverMain.current,
      {
        x: 0,
      },
      {
        x: '100%',
        duration,
        ease: easeGsap,
        delay: param.delayMain,
      }
    )
  }

  return <AnimationUi childJs={childJs} runJs={runJs} {...param} />
}
