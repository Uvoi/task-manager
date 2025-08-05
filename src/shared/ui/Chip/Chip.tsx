interface ChipProps
{
    value?: string;
    color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'success' | 'accent';
    variant?: 'filled' | 'outlined' | 'clear';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
    rounded?: boolean;
}

const COLORS = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    error: 'bg-error',
    warning: 'bg-warning',
    success: 'bg-success',
    accent: 'bg-accent text-bg-primary',
}

const BORDERS = 
{
    primary: 'border-primary',
    secondary: 'border-secondary',
    tertiary: 'border-tertiary',
    error: 'border-error',
    warning: 'border-warning',
    success: 'border-success',
    accent: 'border-accent',
}

const VARIANTS = {
    filled: '',
    outlined: `bg-transparent border`,
    clear: 'bg-transparent',
}

export const Chip = ({value, color='primary', variant='filled', rounded=true, startIcon, endIcon, className}:ChipProps) =>
{
    return(
        <span className={`${rounded && "rounded-xl"} whitespace-nowrap h-fit px-2 ${VARIANTS[variant]} ${variant === 'outlined' ? BORDERS[color] : ''} ${variant === 'filled' ? COLORS[color] : ''} ${className}`}>{value}</span>
    )
}