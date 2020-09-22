import React, { useState, useEffect, useMemo } from 'react'
import { Button, TextInput } from 'react-materialize'
import { onChangeHandler, validateControl, validatePasswords } from './formUtils'

type ObjectProp = {[key: string]: any}

interface SmartFormProps {
  submit: (params: ObjectProp) => Promise<void>;
  inputsOptions: ObjectProp;
  disabled: boolean;
  submitTitle?: string;
}

const SmartForm: React.FC<SmartFormProps> = ({ submit, inputsOptions, disabled, submitTitle = 'Submit' }) => {
  const [state, setState] = useState({ ...inputsOptions })

  const memoOptions = useMemo(() => inputsOptions, [JSON.stringify(inputsOptions)])

  useEffect(() => {
    setState({...memoOptions})
  }, [memoOptions])

  const onValidate = (formControls: ObjectProp): boolean => {
    let isValid = true
    Object.keys(formControls).forEach((key: string) => {
      const control = { ...formControls[key] }
      control.valid = validateControl(control.value, control.validation)
      control.validation.validate = !control.valid
      isValid = control.valid && isValid
    })
    if (formControls['password'] && formControls['confirmPassword']) {
      const valid = validatePasswords(formControls['password'].value, formControls['confirmPassword'].value)
      formControls['confirmPassword'].validation.validate = !valid
      isValid = isValid && valid
    }
    setState({ ...formControls })
    return isValid
  }

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const controlName = event.target.name
    const control = { ...state[controlName]}
    control.valid = validateControl(control.value, control.validation)
    control.validation.validate = !control.valid
    setState({ ...state, [controlName]: {...control} })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => setState(onChangeHandler(event, state))

  const onSubmit = async () => {
    if (onValidate(state)) {
      const props: ObjectProp = {}
      Object.keys(state).forEach((key: string) => props[key] = state[key].value)
      await submit(props)
    }
  }

  return (
    <>
      {Object.keys(inputsOptions).map((name: string) => {
        const { value, error, label, icon, type, validation: { validate } } = state[name]
        const inputClassName = validate ? 'invalid' : ''
        const inputProps: ObjectProp = {
          inputClassName, value, error, label, icon, type, onChange, disabled, onBlur, name
        }
        if (state[name].type === 'number') {
          inputProps['min'] = state[name].validation.min
          inputProps['max'] = state[name].validation.max
        }
        return (<TextInput {...inputProps} key={name} noLayout/>)
      })}
      <Button
        onClick={onSubmit}
        disabled={disabled}
        className="purple darken-4"
        node="button"
        waves="light"
      >
        {submitTitle}
      </Button>
    </>
  )
}

export default SmartForm
