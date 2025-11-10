import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    error?: boolean;
    counting?: {
        max: number
    }
}


export const Input = ({ className = '', error, ...props }: InputProps) => {
    return (
        <input
            className={`border ${error ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-secondary'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 ${className}`}
            {...props}
        />
    );
};