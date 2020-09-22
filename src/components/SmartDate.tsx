import React, { useEffect, useState } from 'react'
import { dateConverter } from '../utils'

const SmartDate: React.FC = () => {
  const [date, setDate] = useState<string>(Date())

  useEffect(() => {
    const interval = setInterval(() => setDate(Date()), 1000)
    return (): void => {
      clearInterval(interval)
    }
  })

  return (
    <span className="white-text">{dateConverter(date, 'datetime')}</span>
  )
}

export default SmartDate
