import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import Easing from '../../components/Easing';
import { className } from '../../modules/js/className';
import gsapK from '../../modules/js/gsapK';
import s from './index.module.scss';
import { EASE_LIST } from '../../modules/js/easeList';

const param = {
  easeName: 'expo',
  easeType: 'out',
  easeCustom: [0.25, 0.1, 0.25, 1],
  duration: 1,
};

export default function Text() {
  const [easeName, setEaseName] = useState(param.easeName);
  const [easeType, setEaseType] = useState(param.easeType);
  const [easeCustom, setEaseCustom] = useState(param.easeCustom);
  const [bezierEditorValue, setBezierEditorValue] = useState(param.easeCustom);
  const [duration, setDuration] = useState(param.duration);
  const [isShow, setIsShow] = useState(false);
  const elGsap = useRef();

  const isCustom = easeName === 'custom';
  const isDefaultEase = easeName === 'ease';
  const easeCustomText = String(easeCustom);

  const play = () => {
    setIsShow(false);
  };

  const ease = !isCustom && EASE_LIST[easeName][easeType];
  const easeCss = isCustom ? `cubic-bezier(${easeCustomText})` : ease.css;
  const easeGsap = isCustom
    ? CustomEase.create('customEase', easeCustomText)
    : isDefaultEase
    ? CustomEase.create('customEase', ease.gsap)
    : ease.gsap;
  const easeGsapText = isCustom
    ? `CustomEase.create('customEase', '${easeCustomText}')`
    : isDefaultEase
    ? `CustomEase.create('customEase', '${ease.gsap}')`
    : ease.gsap;

  useEffect(() => {
    if (!isShow) {
      requestAnimationFrame(() => {
        setIsShow(true);

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
        );
      });
    }
  }, [isShow]);

  return (
    <>
      <dl className={className(s.design)}>
        <div>
          <dt>CSS:</dt>
          <dd>
            <div
              className={className(s.rectangle, s.css, {
                [s._show]: isShow,
              })}
            >
              <div
                className={s.inner}
                style={
                  isShow
                    ? {
                        transitionTimingFunction: easeCss,
                        transitionDuration: `${duration}s`,
                      }
                    : null
                }
              ></div>
            </div>

            <div>
              <small>{easeCss}</small>
            </div>
          </dd>
        </div>

        <div>
          <dt>GSAP:</dt>
          <dd>
            <div
              className={className(s.rectangle, s.gsap, {
                [s._show]: isShow,
              })}
            >
              <div className={s.inner} ref={elGsap}></div>
            </div>

            <div>
              <small>{easeGsapText}</small>
            </div>
          </dd>
        </div>
      </dl>

      <Easing
        easeName={easeName}
        easeType={easeType}
        bezierEditorValue={bezierEditorValue}
        duration={duration}
        isDefaultEase={isDefaultEase}
        isCustom={isCustom}
        onChangeEaseName={setEaseName}
        onChangeEaseType={setEaseType}
        onChangeDuration={setDuration}
        onChangeBezierEditorValue={setBezierEditorValue}
        onChangeEaseCustom={setEaseCustom}
        play={play}
      />

      <div>
        <button onClick={play}>Play</button>
      </div>
    </>
  );
}
