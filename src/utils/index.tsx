import { LOCALE, CURRENCY_CODE_USD } from '../const'

const CURRENCY_CODE = CURRENCY_CODE_USD

export function currencyFormat(value: number, currency = CURRENCY_CODE): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency
  }).format(value)
}

export function dateConverter(date: string, format: string): string {
  const options: {[key: string]: string} = {}
  if(format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }
  if(format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  return new Intl.DateTimeFormat(LOCALE, options).format(new Date(date))
}
