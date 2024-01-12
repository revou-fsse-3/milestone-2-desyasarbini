import { ButtonHTMLAttributes, useMemo } from "react";
import styles from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  onClick?: any
  bgColorClass?: string
  textColor?: string
}

const Button = ({label, onClick, bgColorClass, textColor, ...props}: Props) => {
    return (
        <button {...props} className={`${styles.container} ${bgColorClass} ${textColor}`}> 
        {label}</button>
    )
}
export default Button