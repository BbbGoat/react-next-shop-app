import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames';

interface IButtonProps {
    type?: 'submit' | 'reset' | 'button' | undefined;
    secondary?: boolean;
    bgColor?: string;
    fgColor?: string;
    width?: string;
    [x: string]: any;
}

const Button = ({
    type = 'button',
    secondary = false,
    bgColor,
    fgColor,
    width,
    ...restProps
}: IButtonProps) => {

    const composeClasses = classNames(
        styles.button,
        secondary ? styles.secondary : styles.primary
    )
    const style = {
        backgroundColor: bgColor || '',
        color: fgColor || '',
        width: width || '',
    }
    
  return (
    <button
        className={composeClasses}
        type={type}
        style={style}
        {...restProps}
    >
    </button>
  )
}

export default Button