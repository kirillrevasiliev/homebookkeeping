import React, { useState } from 'react'
import SmartSelect from './SmartSelect'
import SmartForm from './form/SmartForm'
import { Row, Col } from 'react-materialize'
import { number, text, InputsPropsTypes } from './form/formUtils'
import { DocsProps } from '../hooks/firebaseDoc.hook'

interface InputsControlTypes {
  [key: string]: InputsPropsTypes;
}

const inputsControls = (title: string | unknown, limit: number | unknown): InputsControlTypes => ({
  title: {
    ...text,
    label: 'Name a category',
    value: title
  },
  limit: {
    ...number,
    value: limit,
    validation: {
      ...number.validation,
      min: 1
    }
  }
})

interface CategoryEditProps {
  categories: Array<DocsProps>;
  update: (doc: DocsProps) => Promise<void>;
  disabled: boolean;
}

const CategoryEdit: React.FC<CategoryEditProps> = ({ categories, update, disabled }) => {
  const [current, setCurrent] = useState<DocsProps>(categories[0])

  const onUpdate = async (doc: DocsProps): Promise<void> => {
    await update({ id: current.id, ...doc})
    setCurrent({...current, ...doc})
  }

  return (
    <Row>
      <h5>Edit current</h5>
      <Col s={12} className="mt-1">
        <SmartSelect
          label="Choose edit category"
          onChange={setCurrent}
          options={categories}
          disabled={disabled}
          current={current}
        />
      </Col>
      <Col s={12} className="mt-1">
        <SmartForm
          inputsOptions={inputsControls(current.title, current.limit)}
          disabled={disabled}
          submitTitle='Edit'
          submit={onUpdate}
        />
      </Col>
    </Row>
  )
}

export default CategoryEdit
