export default function Time({ value, onChange }) {
  const handleChange = (event) => {
    const { value } = event.currentTarget
    if (value === '') return
    onChange(Number(value))
  }

  return (
    <>
      <div>
        <input
          name="time"
          type="number"
          step="0.1"
          value={value}
          onChange={handleChange}
        ></input>
        s
      </div>
      <div>
        <small>{`(${value * 1000}ms)`}</small>
      </div>
    </>
  )
}
