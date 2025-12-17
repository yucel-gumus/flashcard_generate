/**
 * @fileoverview Yeniden kullanılabilir Button bileşeni
 */

import React from 'react';
import './Button.css';

export interface ButtonProps {
    /** Buton içeriği */
    children: React.ReactNode;
    /** Tıklama olayı */
    onClick?: () => void;
    /** Buton varyantı */
    variant?: 'primary' | 'secondary';
    /** Devre dışı durumu */
    disabled?: boolean;
    /** Yükleniyor durumu */
    loading?: boolean;
    /** Ek CSS sınıfları */
    className?: string;
    /** Buton tipi */
    type?: 'button' | 'submit' | 'reset';
}

/**
 * Yeniden kullanılabilir Button bileşeni
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Oluştur
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    loading = false,
    className = '',
    type = 'button',
}) => {
    const buttonClass = [
        'button',
        `button--${variant}`,
        loading ? 'button--loading' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
            aria-busy={loading}
        >
            <span className="button__text">{children}</span>
        </button>
    );
};
