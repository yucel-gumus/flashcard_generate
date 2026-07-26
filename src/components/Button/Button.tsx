/**
 * @fileoverview Yeniden kullanılabilir Button bileşeni (60-30-10 Design System)
 */

import React from 'react';
import './Button.css';

export interface ButtonProps {
    /** Buton içeriği */
    children: React.ReactNode;
    /** Tıklama olayı */
    onClick?: () => void;
    /** Buton varyantı */
    variant?: 'primary' | 'secondary' | 'outline';
    /** Opsiyonel SVG İkon */
    icon?: React.ReactNode;
    /** Tam genişlik kaplama */
    fullWidth?: boolean;
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
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    icon,
    fullWidth = false,
    disabled = false,
    loading = false,
    className = '',
    type = 'button',
}) => {
    const buttonClass = [
        'button',
        `button--${variant}`,
        fullWidth ? 'button--full-width' : '',
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
            {icon && <span className="button__icon">{icon}</span>}
            <span className="button__text">{children}</span>
        </button>
    );
};
