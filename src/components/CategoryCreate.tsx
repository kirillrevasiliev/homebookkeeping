import React from 'react'
import SmartForm from './form/SmartForm'
import { InputsPropsTypes, number, text } from './form/formUtils'
import { DocsProps } from '../hooks/firebaseDoc.hook'

interface CategoryCreate {
  create: (doc: DocsProps) => Promise<void>;
  bill: number;
  disabled: boolean;
}

interface InputsControlTypes {
  [key: string]: InputsPropsTypes;
}


const inputsControls = (max: number): InputsControlTypes => ({
  title: {
    ...text,
    label: 'Name a category'
  },
  limit: {
    ...number,
    label: 'Set a limit',
    error: 'Limit must be a number, value must be at least 1, max should be less than  ' + max,
    validation: {
      ...number.validation,
      max
    }
  }
})

const CategoryCreate: React.FC<CategoryCreate> = ({ create, bill, disabled }) => {
  return (
    <>
      <h5>Create new</h5>
      <div className="section">
        <SmartForm
          inputsOptions={inputsControls(bill)}
          submitTitle='Create'
          disabled={disabled}
          submit={create as any}
        />
      </div>
    </>
  )
}

export default CategoryCreate
