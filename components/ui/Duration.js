export default function Duration({ duration, onChangeDuration, play }) {
  const handleChange = (event) => {
    const { value } = event.currentTarget
    if (value === '') return
    onChangeDuration(Number(value))
    play()
  }

  return (
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
  )
}
