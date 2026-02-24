'use client'
import {useState} from 'react'
import styles from './page.module.css'

export default function Home() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('10')

  const convert = (val: string, base: number) => {
    const num = parseInt(val, parseInt(from))
    if (isNaN(num)) return ''
    return num.toString(base).toUpperCase()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Number Base Converter</h1>
      <div className={styles.inputGroup}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter number" className={styles.input} />
        <select value={from} onChange={e => setFrom(e.target.value)} className={styles.select}>
          <option value="2">Binary (2)</option>
          <option value="8">Octal (8)</option>
          <option value="10">Decimal (10)</option>
          <option value="16">Hex (16)</option>
        </select>
      </div>
      
      {value && (
        <div className={styles.results}>
          <div className={styles.result}><span>Binary:</span> <code>{convert(value, 2)}</code></div>
          <div className={styles.result}><span>Octal:</span> <code>{convert(value, 8)}</code></div>
          <div className={styles.result}><span>Decimal:</span> <code>{convert(value, 10)}</code></div>
          <div className={styles.result}><span>Hex:</span> <code>{convert(value, 16)}</code></div>
        </div>
      )}
    </div>
  )
}