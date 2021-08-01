import { useRef } from 'react'
import cn from 'classnames'
import gsapK from '@modules/js/gsapK'
import s from './index.module.scss'
import AnimationUi from '@components/AnimationUi'

const params = {
  ease: {
    type: 'ease',
    value: {
      name: 'power4',
      type: 'out',
    },
  },
  duration: {
    type: 'time',
    value: 1,
  },
  delay: {
    type: 'time',
    value: 0.4,
  },
}

export default function Rectangle() {
  const elCoverMain = useRef()
  const elCoverFirst = useRef()

  const childCss = (isShow) => {
    const { ease, duration, delay } = params
    const style = ease.value.style && {
      ...ease.value.style,
      transitionDuration: `${duration.value}s`,
    }

    return (
      <div
        className={cn(s.rectangle, s._css, {
          [s._show]: isShow,
        })}
      >
        <div
          className={cn(s.cover, s._main)}
          style={
            style && {
              ...style,
              transitionDelay: `${delay.value}s`,
            }
          }
        ></div>
        <div className={cn(s.cover, s._first)} style={style}></div>
      </div>
    )
  }

  const childJs = (isShow) => (
    <div
      className={cn(s.rectangle, s._gsap, {
        [s._show]: isShow,
      })}
    >
      <div className={cn(s.cover, s._main)} ref={elCoverMain}></div>
      <div className={cn(s.cover, s._first)} ref={elCoverFirst}></div>
    </div>
  )

  const runJs = () => {
    const { ease, duration, delay } = params

    gsapK.fromTo(
      elCoverFirst.current,
      {
        x: 0,
      },
      {
        x: '100%',
        duration: duration.value,
        ease: ease.value.gsap,
      }
    )

    gsapK.fromTo(
      elCoverMain.current,
      {
        x: 0,
      },
      {
        x: '100%',
        duration: duration.value,
        ease: ease.value.gsap,
        delay: delay.value,
      }
    )
  }

  return (
    <AnimationUi
      childCss={childCss}
      childJs={childJs}
      runJs={runJs}
      params={params}
    />
  )
}
