import { DetailedHTMLProps } from "react";
import NextLink from "next/link";
import cls from "./Link.module.scss";
import classNames from "classnames";

interface LinkProps extends DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
{
    href: string;
    color?: 'default' | 'primary' | 'secondary' | 'tretiary' | 'accent';
    className?: string;
    hoverStyle?: 'underline' | 'border' | 'none';
}
export const Link = ({ className, color = 'default', href, hoverStyle='none', ...otherProps }: LinkProps) =>
{
    return(
        <NextLink href={href} className={classNames(className, cls[color], cls[hoverStyle], cls.link)} {...otherProps}/>
    )
}