import React, { useEffect } from 'react'
import { Row, Col } from 'react-materialize'
import AccountBill from '../components/AccountBill'
import AccountCurrency from '../components/AccountCurrency'
import { useCurrency } from '../hooks/exchange.hook'
import { useQueryDocById } from '../hooks/firebaseDoc.hook'
import Loader from '../components/app/Loader'
import { useQuery } from '../hooks/location.hook'
import { toast } from '../utils/toast'
import { messages } from '../utils/messages'
import { useHistory } from 'react-router'

const Home: React.FC<{ uid: string }> = ({ uid }) => {
  const { doc: { info = {} }, loading: userLoading } = useQueryDocById('users', uid)
  const { rates, currentDate, getCurrency, loading } = useCurrency()
  const query = useQuery()
  const history = useHistory()

  useEffect(() => {
    const message = query.get('message')
    if (message) {
      toast(messages[message])
      history.push('/')
    }
  }, [])

  const isLoading = loading || userLoading
  const { bill } = info

  return (
    <>
      <div className="page-title">
        <h4>Account page</h4>
      </div>
      {isLoading
        ? <Loader />
        : rates && (
          <Row>
            <Col s={12} m={5}>
              <AccountBill
                getCurrency={getCurrency}
                bill={bill}
              />
            </Col>
            <Col s={12} m={7}>
              <AccountCurrency
                date={currentDate}
                rates={rates}
              />
            </Col>
          </Row>
        )}
    </>
  )
}

export default Home
