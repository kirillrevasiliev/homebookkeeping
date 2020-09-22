import React from 'react'
import { Select } from 'react-materialize'
import { DocsProps } from '../hooks/firebaseDoc.hook'

interface SmartSelectProps {
  label: string;
  options: Array<DocsProps>;
  current: DocsProps;
  onChange: (data: DocsProps) => void;
  disabled?: boolean;
}

const SmartSelect: React.FC<SmartSelectProps> = ({ label, options, current, onChange, disabled }) => {
  const _onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(options.find(c => c.id === event.target.value) || {})
  }
  return (
    <Select
      onChange={_onChange}
      disabled={disabled}
      value={current.id}
      multiple={false}
      label={label}
      noLayout
      options={{
        dropdownOptions: {
          alignment: 'left',
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          coverTrigger: true,
          hover: false,
          inDuration: 150,
          outDuration: 250
        }
      }}
    >
      {options.map((opt: DocsProps) => (
        <option key={opt.id} value={opt.id}>{opt.title}</option>
      ))}
    </Select>
  )
}

export default SmartSelect
