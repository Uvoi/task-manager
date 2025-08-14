import { useState, useEffect } from 'react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Modal = ({ isOpen, onClose, children, className = '' }: ModalProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setShouldRender(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            document.body.style.overflow = '';
            setIsVisible(false);
            setTimeout(() => setShouldRender(false), 200);
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
            <div className="fixed inset-0 bg-[#00000069]" onClick={onClose} />
            <div className={`relative bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-300 ${
                isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            } ${className}`}>
                {children}
            </div>
        </div>
    );
};