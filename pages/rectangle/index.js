import { useEffect, useState } from 'react'
import { className } from '../../utils/className'
import styles from './index.module.scss'

export default function Rectangle() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 1000)
  })

  return (
    <div className={className(styles.rectangle, {[styles._show]: show})}>
    </div>
  )
}
