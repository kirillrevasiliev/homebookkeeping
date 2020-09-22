import React from 'react'
import { NavLink, useParams, useLocation } from 'react-router-dom'
import { CardPanel, Col, Row } from 'react-materialize'
import { useQueryDocById } from '../hooks/firebaseDoc.hook'
import { currencyFormat, dateConverter } from '../utils'
import Loader from '../components/app/Loader'

interface HistoryDetailRecordProps {
  uid: string;
}

const HistoryDetailRecord: React.FC<HistoryDetailRecordProps> = ({ uid }) => {
  const location = useLocation()
  const { id } = useParams()
  const { doc: record, loading: recLoading } = useQueryDocById(`users/${uid}/records`, id)
  const { doc: category, loading: catLoading } = useQueryDocById(`users/${uid}/categories`, record.categoryId || '')

  const isLoading = recLoading || catLoading

  if (isLoading) return (<Loader />)

  const isPreparedData = Object.keys(category).length && Object.keys(record).length

  const preparedRecord = isPreparedData ? {
    ...record,
    categoryName: category.title,
    typeClass: record.type === 'income' ? 'green' : 'red'
  } : null

  return (
    <Row>
      {preparedRecord
        ? (<>
          <Col s={12} m={10} offset='m1'>
            <div className="breadcrumb-wrap mt-1 capitalize">
              <NavLink to={`/history${location.search}`} className="breadcrumb purple-text text-darken-4">History</NavLink>
              <a
                href={`/history/${id}`}
                onClick={(event: React.MouseEvent) => event.preventDefault()}
                className="breadcrumb purple-text text-darken-4"
              >{record.type}</a>
            </div>
          </Col>
          <Col s={12} m={10} offset="m1">
            <CardPanel className={'z-depth-3 white-text ' + preparedRecord.typeClass}>
              <p className="flow-text m-0">
                Amount: {currencyFormat(Number(preparedRecord.amount))}
                <br/>
                Description: {preparedRecord.description}
                <br/>
                <small>Category: {preparedRecord.categoryName}</small>
                <br/>
                <small>{dateConverter(preparedRecord.createdAt as string, 'datetime')}</small>
              </p>

            </CardPanel>
          </Col>
        </>)
        : (<p className="center">
          Item with id {id} not found
          <NavLink to={`/history${location.search}`} className="breadcrumb indigo-text">{' '}Go back</NavLink>
        </p>)}
    </Row>
  )
}

export default HistoryDetailRecord
