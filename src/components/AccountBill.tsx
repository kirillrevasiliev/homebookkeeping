import React from 'react'
import Card from 'react-materialize/lib/Card'
import { CURRENCIES_TYPES } from '../const'

interface CurrenciesProps {
  bill: number;
  getCurrency: (bill: number, code: string) => number;
}

const AccountBill: React.FC<CurrenciesProps> = ({ bill, getCurrency }) => {
  return (
    <Card
      textClassName="white-text"
      title="Currency Account"
      className="light-blue"
    >
      {CURRENCIES_TYPES.map((code: string) => (
        <p key={code}>
          <span>{`${getCurrency(bill, code)} - ${code}`}</span>
        </p>
      ))}
    </Card>
  )
}

export default AccountBill
