import { useMemo } from "react";

interface ChipProps
{
    value?: string;
    color?: string;
    variant?: 'filled' | 'outlined' | 'clear';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
    rounded?: boolean;
}

const VARIANTS = {
    filled: '',
    outlined: `bg-transparent border`,
    clear: 'bg-transparent',
}

const getBrightness = (hex: string): number => {
    if (!hex || hex === 'transparent' || !hex.startsWith('#')) return 255;
    
    let color = hex.replace('#', '');
    
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }
    
    if (color.length !== 6) return 255;
    
    try {
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        
        return (r * 299 + g * 587 + b * 114) / 1000;
    } catch {
        return 255;
    }
};

const getTextColor = (backgroundColor: string): string => {
    const brightness = getBrightness(backgroundColor);
    return brightness > 128 ? '#000000' : '#FFFFFF';
};

const isValidHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/i.test(color);
};

export const Chip = ({value, color='primary', variant='filled', rounded=true, startIcon, endIcon, className}:ChipProps) =>
{
    const getChipStyles = () => {
        const styles: React.CSSProperties = {};
        
        if (variant === 'filled' && color && color !== 'primary') {
            const hexColor = color.startsWith('#') ? color : `#${color}`;
            if (isValidHexColor(hexColor)) {
                styles.backgroundColor = hexColor;
                styles.color = getTextColor(hexColor);
            }
        }
        
        if (variant === 'outlined' && color && color !== 'primary') {
            const hexColor = color.startsWith('#') ? color : `#${color}`;
            if (isValidHexColor(hexColor)) {
                styles.borderColor = hexColor;
                styles.color = hexColor;
            }
        }
        
        return styles;
    };

    return(
        <span 
            className={`
                ${rounded && "rounded-xl"} 
                w-fit 
                h-fit 
                flex 
                items-center 
                gap-2 
                px-2
                whitespace-nowrap 
                ${VARIANTS[variant]} 
                ${variant === 'outlined' && (!color || color === 'primary') && 'border-primary'} 
                ${variant === 'filled' && (!color || color === 'primary') && 'bg-primary'} 
                ${className}`
            }
            style={getChipStyles()}
        >
            {startIcon}
            {value}
            {endIcon}
        </span>
    )
}