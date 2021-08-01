export default function Px({ value, onChange }) {
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
          step="1"
          value={value}
          onChange={handleChange}
        ></input>
        px
      </div>
    </>
  )
}
