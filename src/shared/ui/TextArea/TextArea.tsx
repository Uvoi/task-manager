import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  variant?: "clear"
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', variant, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`resize-none p-2 focus:outline-none ${variant === "clear" ? "" : "border rounded-md focus:ring-1"} ${className}`}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';