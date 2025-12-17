/**
 * @fileoverview ProgressBar bileşeni
 */

import React from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
    /** Mevcut ilerleme değeri */
    current: number;
    /** Toplam değer */
    total: number;
    /** Yüzde değeri (opsiyonel, hesaplanır) */
    percentage?: number;
}

/**
 * İlerleme çubuğu bileşeni
 * 
 * @example
 * ```tsx
 * <ProgressBar current={5} total={10} />
 * ```
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    total,
    percentage,
}) => {
    const progressPercent = percentage ?? (total > 0 ? (current / total) * 100 : 0);

    return (
        <div className="progress-container" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
            <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
            <span className="progress-text">
                {current}/{total} Kart
            </span>
        </div>
    );
};
