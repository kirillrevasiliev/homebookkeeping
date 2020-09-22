import React, { useState, useEffect } from 'react'
import { Col, Row, RadioGroup } from 'react-materialize'
import { useQueryDocs, DocsProps, useQueryDocById } from '../hooks/firebaseDoc.hook'
import SmartSelect from '../components/SmartSelect'
import SmartForm from '../components/form/SmartForm'
import { InputsPropsTypes, number, text } from '../components/form/formUtils'
import { NavLink } from 'react-router-dom'
import Loader from '../components/app/Loader'
import { toast } from '../utils/toast'

interface InputsControlTypes {
  [key: string]: InputsPropsTypes;
}

const categoriesTypes = [
  {
    label: 'Outcome',
    value: 'outcome'
  },
  {
    label: 'Income',
    value: 'income'
  }
]

const getInputsControls = (max: number): InputsControlTypes => ({
  amount: {
    ...number,
    label: 'Enter an amount',
    error: 'Field should be a number, bigger than 0 and less than ' + max,
    validation: {
      ...number.validation,
      max
    }
  },
  description: {
    ...text,
    value: '',
    label: 'Enter a description',
    error: 'Description cannot be empty'
  }
})

const Record: React.FC<{uid: string}> = ({ uid }) => {
  const { doc: userData, updateDoc, loading: userLoading } = useQueryDocById('users', uid)
  const { docs: categories = [], loading: catLoading } = useQueryDocs(`users/${uid}/categories`)
  const { addDoc, loading: recLoading } = useQueryDocs(`users/${uid}/records`)

  const [category, setCategory] = useState<DocsProps>({ ...categories[0] })
  const [inputsOptions, setInputsOptions] = useState(getInputsControls(category.limit as number))

  const [type, setType] = useState(categoriesTypes[0].value)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setCategory({ ...categories[0] })
  }, [categories.length])

  const onCategoryChanged = (cat: DocsProps): void => {
    setCategory(cat)
    setInputsOptions(getInputsControls(cat.limit as number))
  }

  const onCreate = async (state: { [key: string]: string }): Promise<void> => {
    setLoading(true)
    const { bill: userBill } = userData.info
    const bill = type === 'income' ? (userBill + state.amount) : (userBill || 0) - +state.amount
    const doc = {
      ...state,
      categoryId: category.id,
      type
    }
    const info = { ...userData.info, bill }
    await updateDoc({ info })
    await addDoc(doc)
    toast('Record has been added')
    setLoading(false)
  }

  const isLoading = catLoading || recLoading || userLoading

  return (
    <>
      <div className="page-title">
        <h4>New record</h4>
      </div>
      {isLoading
        ? (<Loader />)
        : (Object.keys(category).length
          ? (<Row>
            <Col s={12} m={7} className="mt-1">
              <SmartSelect
                onChange={onCategoryChanged}
                label="Choose category"
                disabled={loading}
                options={categories}
                current={category}
              />
            </Col>
            <Col s={12} m={7} className="mt-1">
              <RadioGroup
                label="Choose event"
                radioClassNames='col'
                name="size"
                onChange={(event: React.MouseEvent<HTMLInputElement>): void =>
                  setType((event.target as HTMLInputElement).value)}
                options={categoriesTypes}
                disabled={loading}
                value={type}
                withGap
              />
            </Col>
            <Col s={12} m={7} className="mt-1">
              <SmartForm
                inputsOptions={inputsOptions}
                disabled={loading}
                submitTitle='Create'
                submit={onCreate}
              />
            </Col>
          </Row>
          )
          : (<p className="center">No categories yet.
            <NavLink to="/categories"> Create new</NavLink>
          </p>)
        )}
    </>
  )
}

export default Record
