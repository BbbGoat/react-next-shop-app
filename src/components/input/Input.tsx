import React, { ChangeEvent } from 'react'

interface IInputProps {
  id: string;
  label: string;
  name?: string;
  labelVisible?: boolean;
  icon?: 'letter' | 'lock' | 'show' | 'hide';
  email?: boolean;
  password?: boolean;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  value?: string;
  error?: {message: string};
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

const Input = ({
  id,
  label,
  name='',
  labelVisible,
  icon,
  email,
  password,
  placeholder='',
  readOnly,
  disabled,
  value,
  error: errorProp,
  className = '',
  onChange,
  ...restProps
}: IInputProps) => {
  
  return (
    <div>Input</div>
  )
}

export default Input