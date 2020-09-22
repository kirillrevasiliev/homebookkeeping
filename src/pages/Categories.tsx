import React, { useState } from 'react'
import { Col, Row } from 'react-materialize'
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'
import { DocsProps, useQueryDocs } from '../hooks/firebaseDoc.hook'
import Loader from '../components/app/Loader'
import { toast } from '../utils/toast'

interface CategoriesProps {
  bill: number;
  uid: number;
}

const Categories: React.FC<CategoriesProps> = ({ bill, uid }) => {
  const { loading: globalLoading, docs, addDoc, updateDoc } = useQueryDocs(`users/${uid}/categories`)
  const [loading, setLoading] = useState<boolean>(false)

  const onUpdate = async (doc: DocsProps): Promise<void> => {
    setLoading(true)
    await updateDoc(doc)
    toast(`Category ${doc.title} updated!`)
    setLoading(false)
  }

  const onCreate = async (doc: DocsProps): Promise<void> =>  {
    setLoading(true)
    await addDoc(doc)
    toast(`Category ${doc.title} created!`)
    setLoading(false)
  }

  return (
    <>
      <div className="page-title">
        <h4>Categories</h4>
      </div>
      <Row>
        {globalLoading ? <Loader /> : (
          <>
            <Col s={12} m={6} className="mt-1">
              <CategoryCreate create={onCreate} bill={bill} disabled={loading} />
            </Col>
            {!!docs.length && (<Col s={12} m={6} className="mt-1">
              <CategoryEdit categories={docs} update={onUpdate} disabled={loading} />
            </Col>)}
          </>
        )}
      </Row>
    </>
  )
}

export default Categories
