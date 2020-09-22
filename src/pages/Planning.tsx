import React from 'react'
import { Row, Button } from 'react-materialize'
import { NavLink } from 'react-router-dom'
import { useQueryDocs, DocsProps } from '../hooks/firebaseDoc.hook'
import Loader from '../components/app/Loader'
import { currencyFormat } from '../utils'

const Planning: React.FC<{ uid: string }> = ({ uid }) => {
  const { docs: categories = [], loading: catLoading } = useQueryDocs(`users/${uid}/categories`)
  const { docs: records = [], loading: recLoading } = useQueryDocs(`users/${uid}/records`)

  const renderCategories = categories.map((cat: {[key: string]: string | number}) => {
    const spend: number = records
      .filter((r: DocsProps) => r.categoryId === cat.id)
      .filter((r: DocsProps) => r.type === 'outcome')
      .reduce((acc: number, r: {[key: string]: string | number }) => acc += +r.amount, 0)

    const percent = 100 * spend / +cat.limit
    const progressPercent = percent > 100 ? 100 : percent
    const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
    const tooltipValue = +cat.limit - spend
    const tooltip = `${tooltipValue < 0
      ? 'Exceeded by': 'Left'}
          ${currencyFormat(Math.abs(tooltipValue))}`

    return {
      ...cat, progressColor, progressPercent, spend, tooltip
    }
  })
  const isLoading = recLoading || catLoading

  return (
    <>
      <div className="page-title">
        <h4>Planning</h4>
      </div>
      {isLoading
        ? <Loader />
        : (!renderCategories.length
          ? (<p className="center">No records yet.<NavLink to="/record"> Create new</NavLink></p>)
          : (renderCategories.map((category: {[key: string]: string | number }) => (
            <Row key={category.id} className='row'>
              <p><strong>{`${category.title} : `}</strong>
                {currencyFormat(category.spend as number)} of {currencyFormat(category.limit as number)}
              </p>
              <Button
                tooltip={category.tooltip as string}
                tooltipOptions={{ position: 'top' }}
                className="col s12"
                node="div"
                flat
              >
                <div className="progress-wrapper">
                  <div className="progress">
                    <div
                      className={'determinate '+ category.progressColor}
                      style={{width: category.progressPercent+'%'}}
                    />
                  </div>
                </div>
              </Button>
            </Row>
          ))
          ))}
    </>
  )
}

export default Planning
