import React from 'react'

export const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface ValidationProps {
  validate?: boolean;
  required?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  minLength?: number;
  min?: number;
  max?: number;
}

export interface InputsPropsTypes {
  error?: string;
  label?: string;
  value?: string | number | unknown;
  valid?: boolean;
  type?: string;
  icon?: string;
  validation: ValidationProps;
}

interface InputsControlTypes {
  [key: string]: InputsPropsTypes;
}

export const validateControl = (value: string, validation: ValidationProps): boolean => {
  if (!validation) {
    return true
  }
  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== ''
  }
  if (validation.email) {
    return emailRegexp.test(String(value).toLowerCase()) && isValid
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }
  if (validation.min) {
    isValid = Number.isInteger(parseInt(value, 10)) && parseInt(value, 10) >= validation.min && isValid
  }
  if (validation.max) {
    isValid = Number.isInteger(parseInt(value, 10)) && parseInt(value, 10) <= validation.max && isValid
  }
  return isValid
}

export const validatePasswords = (pass: string, repeat: string): boolean => {
  return !!pass && !!repeat && pass === repeat
}

export const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, state: InputsControlTypes): InputsControlTypes => {
  const controlName = event.target.name
  const control = { ...state[controlName]}
  control.value = event.target.value
  control.validation.validate = false
  state[controlName] = control
  return { ...state }
}

export const email = {
  error: 'Enter valid email',
  label: 'Email',
  value: '',
  valid: true,
  type: 'email',
  icon: '',
  validation: {
    validate: false,
    required: true,
    email: true
  }
}

export const number = {
  error: '',
  label: '',
  value: '1',
  valid: true,
  type: 'number',
  icon: '',
  validation: {
    validate: false,
    required: true,
    min: 1
  }
}

export const text = {
  error: 'Field must content at lest 3 characters',
  label: '',
  value: '',
  valid: true,
  icon: '',
  validation: {
    validate: false,
    required: true,
    minLength: 3
  }
}

export const password = {
  error: 'Password must by at lest 6 character',
  label: 'Password',
  value: '',
  valid: true,
  icon: '',
  type: 'password',
  validation: {
    validate: false,
    required: true,
    minLength: 6
  }
}
