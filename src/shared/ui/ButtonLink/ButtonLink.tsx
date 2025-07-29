import { DetailedHTMLProps } from "react";
import classNames from "classnames";
import Link from "next/link";
import { ButtonTextColor, ButtonVariant } from "../Button/Button";
import cls from "./ButtonLink.module.scss";


export interface ButtonLinkProps extends DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
{
    variant?: ButtonVariant,
    color?: ButtonTextColor
    href: string;
}

export const ButtonLink = (props: ButtonLinkProps) => {
    const {className, variant = "primary", color, href, ...otherProps} = props;

    return (
        <Link href={href} passHref
            className={classNames(
                className,
                cls[`variant-${variant}`],
                cls[`color-${color}`],
                cls.button
            )}
            {...otherProps}
        />
    );
}