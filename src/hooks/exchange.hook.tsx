import { useEffect, useRef, useState } from 'react'
import { CURRENCY_CODE_USD } from '../const'

type ObjectAny = {[key: string]: number}

export interface CurrencyData {
  conversion_rates: ObjectAny;
  time_last_update_utc: string;
  time_next_update_utc: string;
  base_code: string;
  result: string;
  'extra-info': string;
}

export interface CurrencyDataProps {
  getCurrency: (bill: number, code: string) => number;
  loading: boolean;
  currentDate: string;
  rates: ObjectAny | null;
}


export function useCurrency(): CurrencyDataProps {
  const [rates, setRates] = useState<ObjectAny | null>(null)
  const [currentDate, setCurrentDate] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const unmounted = useRef(false)

  const getCurrency = (bill: number, code: string): number => {
    if (!rates) return 0
    return Math.floor(bill * rates[code])
  }

  const initData = async (): Promise<void> => {
    setLoading(true)
    try {
      const localData = JSON.parse(localStorage.getItem('rates') || '[]')
      if (Object.keys(localData).length && Date.now() < Date.parse(localData.time_next_update_utc)) {
        setCurrentDate(localData.time_last_update_utc)
        setRates(localData.conversion_rates)
      } else {
        const exchangerate = process.env.REACT_APP_EXCHANGERATE_API_KEY
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangerate}/latest/${CURRENCY_CODE_USD}`)
        const fetchedData: CurrencyData = await response.json()

        localStorage.setItem('rates', JSON.stringify(fetchedData))
        if (!unmounted.current) {
          setCurrentDate(fetchedData.time_last_update_utc)
          setRates(fetchedData.conversion_rates)
        }
      }

    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    unmounted.current = false as any
    (async (): Promise<void> => await initData())()
    return (): void => {
      unmounted.current = true
    }
  }, [])

  return { rates, currentDate, getCurrency, loading }
}
