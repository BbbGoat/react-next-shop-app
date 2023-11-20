import React, { ChangeEvent, useState } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames';

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

  const [inputValue, setInputValue] = useState(value? value : '');
  
  const checkType = () => {
    if (email) {
      return 'email'
    }
    if (password) {
      return 'password'
    }

    return 'text';
  }

  // => input태그에 바로 이벤트 걸어주지 않고 handle 함수 사용하는 이유 :
  // 태그의 value가 state로 등록됐기 때문에 여기서 함께 업데이트 해줘야함
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e)
  }
  
  return (

    <div>
      <label htmlFor={id} className={classNames(styles.label, labelVisible || styles.labelHidden)}>
        {label}
      </label>

      <div className={classNames(styles.inputWrapper, errorProp && styles.inputWrapperError)}>
        <input
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />
      </div>
    </div>
  )
}

export default Input