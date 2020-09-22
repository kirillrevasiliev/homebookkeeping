import React from 'react'
import ReactPaginate from 'react-paginate'
import { Icon } from 'react-materialize'

interface PaginationProps {
  activePage: number;
  pageCount: number;
  onSelect: (v: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ activePage, pageCount, onSelect }) => {
  const onPageChange = ({ selected }: { selected: number }): void => onSelect(selected + 1)

  return (
    <ReactPaginate
      nextLabel={<Icon className="waves-effect">chevron_right</Icon>}
      previousLabel={<Icon className="waves-effect">chevron_left</Icon>}
      pageLinkClassName="waves-effect"
      containerClassName="pagination"
      initialPage={activePage - 1}
      onPageChange={onPageChange}
      breakClassName="break-me"
      activeClassName="active"
      marginPagesDisplayed={1}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      breakLabel={'...'}
    />
  )
}

export default PaginationComponent
