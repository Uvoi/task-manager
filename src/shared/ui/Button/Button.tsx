import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import cls from "./Button.module.scss";
import classNames from "classnames";


export type ButtonTextColor = "primary" | "secondary" | "tertiary";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "accent";
export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
{
    variant?: ButtonVariant,
    color?: ButtonTextColor
}

export const Button = (props: ButtonProps) => {
    const {className, variant = "primary", color, ...otherProps} = props;
    return <button 
            className={classNames(
                className,
                cls[`variant-${variant}`],
                cls[`color-${color}`],
                cls.button
            )} 
            {...otherProps} 
        />
}