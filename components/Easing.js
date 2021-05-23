// import { BezierCurveEditor } from 'react-bezier-curve-editor'
import BezierEditor from 'bezier-easing-editor';
import s from './Easing.module.scss';
import { className } from '../modules/js/className';
import { round2 } from '../modules/js/math';
import { EASE_NAME_LIST, EASE_TYPE_LIST } from '../modules/js/easeList';

let timerId;

export default function Easing(props) {
  const {
    easeName,
    easeType,
    bezierEditorValue,
    duration,
    isDefaultEase,
    isCustom,
    onChangeEaseName,
    onChangeEaseType,
    onChangeDuration,
    onChangeBezierEditorValue,
    onChangeEaseCustom,
    play,
  } = props;

  const bezierEditorValueText = String(bezierEditorValue);

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'easeName':
        onChangeEaseName(value);
        if (value !== 'ease' && easeType === 'default') {
          onChangeEaseType('out');
        }
        break;
      case 'easeType':
        onChangeEaseType(value);
        break;
      case 'duration':
        if (value === '') return;
        onChangeDuration(Number(value));
        break;
    }
    play();
  };

  const handleChangeBezier = (value) => {
    const roundedValue = value.map((num) => round2(num));
    onChangeBezierEditorValue(roundedValue);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      onChangeEaseCustom(roundedValue);
      play();
    }, 100);
  };

  return (
    <dl>
      <div>
        <dt>ease:</dt>
        <dd>
          <div className={className(s.ease)}>
            <dl>
              <div>
                <dt>name:</dt>
                <dd>
                  <select
                    name="easeName"
                    value={easeName}
                    onChange={handleChange}
                  >
                    {Object.entries(EASE_NAME_LIST).map(([key, value]) => (
                      <option value={key} key={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>

              {!(isCustom || easeName === 'linear') && (
                <div>
                  <dt>type:</dt>
                  <dd>
                    <select
                      name="easeType"
                      value={easeType}
                      onChange={handleChange}
                    >
                      {EASE_TYPE_LIST.map((value) =>
                        !isDefaultEase && value === 'default' ? null : (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        )
                      )}
                    </select>
                  </dd>
                </div>
              )}
            </dl>

            {isCustom && (
              <div>
                <div>
                  <small>{bezierEditorValueText}</small>
                </div>

                {/* <BezierCurveEditor {...(String(param.easeCustom) === String(easeCustom) ? { value: easeCustom } : null)} onChange={handleChangeBezier} /> */}
                <BezierEditor
                  defaultValue={bezierEditorValue}
                  onChange={handleChangeBezier}
                  width={300}
                  height={300}
                  padding={[32, 32, 32, 32]}
                  textStyle={{
                    fontSize: '0',
                  }}
                />
              </div>
            )}
          </div>
        </dd>
      </div>

      <div>
        <dt>duration:</dt>
        <dd>
          <input
            name="duration"
            type="number"
            step="0.1"
            value={duration}
            onChange={handleChange}
          ></input>
          s{' '}
          <div>
            <small>{`(${duration * 1000}ms)`}</small>
          </div>
        </dd>
      </div>
    </dl>
  );
}
