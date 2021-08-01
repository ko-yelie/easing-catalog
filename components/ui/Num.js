export default function Num({ value, unit, step, onChange }) {
  const handleChange = (event) => {
    const { value } = event.currentTarget
    if (value === '') return
    onChange(Number(value))
  }

  return (
    <>
      <div>
        <input
          name="delay"
          type="number"
          step={step || 1}
          value={value}
          onChange={handleChange}
        ></input>
        {unit}
      </div>
    </>
  )
}
