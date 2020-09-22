import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Row } from 'react-materialize'
import { useQueryDocs, DocsProps } from '../hooks/firebaseDoc.hook'
import { useQuery } from '../hooks/location.hook'
import HistoryList from '../components/HistoryList'
import Loader from '../components/app/Loader'
import PaginationComponent from '../components/PaginationComponent'

interface HistoryProps {
  uid: string;
}

const initialPagination = {
  currentPage: 1,
  pageSize: 5
}

const History: React.FC<HistoryProps> = ({ uid }) => {
  const query = useQuery()
  const history = useHistory()
  const [pagination, setPagination] = useState({...initialPagination, currentPage: parseInt(query.get('page') || '1')})
  const { docs: categories = [], loading: catLoading } = useQueryDocs(`users/${uid}/categories`)
  const { docs: records = [], loading: recLoading } = useQueryDocs(`users/${uid}/records`)

  const setupRecords= records.map((record: DocsProps) => ({
    ...record,
    categoryName: (categories.find((cat: DocsProps) => cat.id === record.categoryId) || {}).title,
    typeClass: record.type === 'income' ? 'green' : 'red'
  }))


  const paginateRecords = (arr: Array<DocsProps>) => {
    const { pageSize, currentPage } = pagination
    const end = currentPage * pageSize
    const start = end - pageSize
    return arr.slice(start, end)
  }

  const onPaginate = (currentPage: number): void => {
    history.push(`/history?page=${currentPage}`)
    setPagination({ ...pagination, currentPage })
  }


  const { pageSize, currentPage } = pagination
  const recordCounter = (currentPage * pageSize) - pageSize
  const isLoading = recLoading || catLoading

  return (
    <Row>
      <div className="page-title">
        <h4>History page</h4>
      </div>
      {(isLoading) && !setupRecords.length
        ? (<Loader />)
        : (!setupRecords.length
          ? (<p className="center">No records yet.<NavLink to="/record"> Create new</NavLink></p>)
          : (<>
            <HistoryList records={paginateRecords(setupRecords)} recordCounter={recordCounter} />
            <PaginationComponent
              pageCount={Math.ceil(setupRecords.length / pageSize)}
              activePage={currentPage}
              onSelect={onPaginate}
            />
          </>))}
    </Row>
  )
}

export default History
