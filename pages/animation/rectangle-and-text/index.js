import { useRef } from 'react'
import cn from 'classnames'
import gsapK from '@modules/js/gsapK'
import s from './index.module.scss'
import AnimationUi from '@components/AnimationUi'

const param = {
  easeName: 'expo',
  easeType: 'out',
  easeCustom: [0.25, 0.1, 0.25, 1],
  duration: 1.2,

  easeNameFade: 'power2',
  easeTypeFade: 'out',
  durationFade: 1,
  delayText: 0.4,
  staggerText: 0.2,
  startY: 20,
}

export default function Rectangle() {
  const elCover = useRef()
  const elText = useRef()

  const childJs = ({ isShow }) => (
    <div
      className={cn(s.rectangle, s._gsap, {
        [s._show]: isShow,
      })}
    >
      <div className={cn(s.cover)} ref={elCover}></div>
      <ul className={cn(s.text)} ref={elText}>
        <li className={s.item}>Text 1</li>
        <li className={s.item}>Text 2</li>
      </ul>
    </div>
  )

  const runJs = ({ duration, easeGsap }) => {
    const elsItem = elText.current.querySelectorAll('li')

    gsapK
      .timeline('rectangleAndText')
      .fromTo(
        elCover.current,
        {
          y: '-100%',
        },
        {
          y: 0,
          duration,
          ease: easeGsap,
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
              duration: param.durationFade,
              ease: `${param.easeNameFade}.${param.easeTypeFade}`,
              stagger: param.staggerText,
            }
          ),
          gsapK.fromTo(
            elsItem,
            {
              y: param.startY,
            },
            {
              y: 0,
              duration,
              ease: easeGsap,
              stagger: param.staggerText,
            }
          ),
        ],
        param.delayText
      )
  }

  return <AnimationUi childJs={childJs} runJs={runJs} {...param} />
}
