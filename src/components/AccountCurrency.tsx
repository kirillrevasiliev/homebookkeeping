import React from 'react'
import Card from 'react-materialize/lib/Card'
import { dateConverter } from '../utils'
import { CURRENCIES_TYPES } from '../const'

type ObjectAny = {[key: string]: number}
interface CurrenciesProps {
  rates: ObjectAny;
  date: string;
}

const AccountCurrency: React.FC<CurrenciesProps> = ({ rates = {}, date = '' }) => {
  return (
    <Card
      className="orange darken-3"
      textClassName="white-text"
      title="Exchange Rates"
    >
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {CURRENCIES_TYPES.map((key: string) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{rates[key].toFixed(5)}</td>
              <td>{dateConverter(date, 'date')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default AccountCurrency
