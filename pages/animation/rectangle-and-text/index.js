import { useEffect, useRef } from 'react'
import cn from 'classnames'
import gsapK from '@modules/js/gsapK'
import s from './index.module.scss'
import AnimationUi from '@components/AnimationUi'

const params = {
  moveEase: {
    type: 'ease',
    value: {
      name: 'expo',
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
    value: 1,
  },
  textDelay: {
    type: 'time',
    value: 0.3,
  },
  staggerText: {
    type: 'time',
    value: 0.2,
  },
  startY: {
    type: 'number',
    value: 20,
    unit: 'px',
    step: 1,
  },
}

export default function Rectangle() {
  const refCover = useRef()
  const refText = useRef()
  const refItems = useRef()

  useEffect(() => {
    refItems.current = refText.current.querySelectorAll('li')
  }, [refText])

  const childJs = (isShow) => (
    <div
      className={cn(s.rectangle, s._gsap, {
        [s._show]: isShow,
      })}
    >
      <div className={cn(s.cover)} ref={refCover}></div>
      <ul className={cn(s.text)} ref={refText}>
        <li className={s.item}>Text 1</li>
        <li className={s.item}>Text 2</li>
      </ul>
    </div>
  )

  const runJs = () => {
    const {
      moveDuration,
      moveEase,
      fadeDuration,
      fadeEase,
      staggerText,
      startY,
      textDelay,
    } = params
    const elsItem = refItems.current || refText.current.querySelectorAll('li')

    gsapK
      .timeline('rectangleAndText')
      .fromTo(
        refCover.current,
        {
          y: '-100%',
        },
        {
          y: 0,
          duration: moveDuration.value,
          ease: moveEase.value.gsap,
        }
      )
      .add(
        [
          gsapK.fromTo(
            elsItem,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: fadeDuration.value,
              ease: fadeEase.value.gsap,
              stagger: staggerText.value,
            }
          ),
          gsapK.fromTo(
            elsItem,
            {
              y: startY.value,
            },
            {
              y: 0,
              duration: moveDuration.value,
              ease: moveEase.value.gsap,
              stagger: staggerText.value,
            }
          ),
        ],
        textDelay.value
      )
  }

  return <AnimationUi childJs={childJs} runJs={runJs} params={params} />
}
