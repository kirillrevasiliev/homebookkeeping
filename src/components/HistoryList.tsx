import React from 'react'
import { currencyFormat, dateConverter } from '../utils'
import { useLocation, Link } from 'react-router-dom'

type Record = {[key: string]: string | number}

interface HistoryTableProps {
  records: Array<Record>;
  recordCounter: number;
}

const HistoryList: React.FC<HistoryTableProps> = ({ records, recordCounter }) => {
  const location = useLocation()
  const isOdd = (index: number): string => index % 2 ? '' : 'brown lighten-5'
  return (
    <ul className="collection z-depth-2">
      {records.map((record: Record, index: number) => (
        <Link key={record.id} to={`/history/${record.id}${location.search}`}>
          <li className={`collection-item numeric black-text ${isOdd(index)}`}>
            <span className="counter">{recordCounter + index + 1}</span>
            <span className="title">
              <span className={'white-text badge ' + record.typeClass}>{record.type}</span>
              <div className="amount">
                <strong>{currencyFormat(record.amount as number)}</strong>
                &#160;{record.categoryName}
              </div>
            </span>
            <p>
              {dateConverter(record.createdAt as string, 'datetime')}
            </p>
          </li>
        </Link>))
      }
    </ul>
  )
}

export default HistoryList
