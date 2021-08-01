import { useRef } from 'react'
import cn from 'classnames'
import gsapK from '@modules/js/gsapK'
import s from './index.module.scss'
import AnimationUi from '@components/AnimationUi'

const params = {
  moveEase: {
    type: 'ease',
    value: {
      name: 'power4',
      type: 'out',
    },
  },
  moveDuration: {
    type: 'time',
    value: 1.2,
  },
  fadeEase: {
    type: 'ease',
    value: {
      name: 'power2',
      type: 'out',
    },
  },
  fadeDuration: {
    type: 'time',
    value: 1.2,
  },
  stagger: {
    type: 'time',
    value: 0.09,
  },
  y: {
    type: 'number',
    value: 1.2,
    unit: 'em',
    step: 0.1,
  },
}
const TEXT = 'animation'

export default function Text() {
  const elGsap = useRef()

  const childCss = (isShow) => {
    const { moveEase, moveDuration, stagger, y } = params
    const style = {
      ...moveEase.value.style,
      transitionDuration: `${moveDuration.value}s`,
      transform: `translateY(${isShow ? 0 : y.value}${y.unit})`,
      opacity: isShow ? 1 : 0,
    }

    return (
      <div
        className={cn(s.text, s.css, {
          [s._show]: isShow,
        })}
      >
        {TEXT.split('').map((char, i) => (
          <span
            className={s.char}
            key={`${i}-${char}`}
            style={{
              ...style,
              transitionDelay: `${stagger.value * i}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    )
  }

  const childJs = (isShow) => (
    <div
      className={cn(s.text, s.gsap, {
        [s._show]: isShow,
      })}
      ref={elGsap}
    >
      {TEXT.split('').map((char, i) => (
        <span className={s.char} key={`${i}-${char}`}>
          {char}
        </span>
      ))}
    </div>
  )

  const runJs = () => {
    const chars = elGsap.current.querySelectorAll('span')
    const { moveEase, moveDuration, fadeEase, fadeDuration, stagger, y } =
      params

    gsapK.fromTo(
      chars,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: fadeDuration.value,
        ease: fadeEase.value.gsap,
        stagger: stagger.value,
      }
    )

    gsapK.fromTo(
      chars,
      {
        y: `${y.value}${y.unit}`,
      },
      {
        y: 0,
        duration: moveDuration.value,
        ease: moveEase.value.gsap,
        stagger: stagger.value,
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
