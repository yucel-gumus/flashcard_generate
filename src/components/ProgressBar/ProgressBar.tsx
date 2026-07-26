/**
 * @fileoverview ProgressBar bileşeni (60-30-10 Design System)
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
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    total,
    percentage,
}) => {
    const progressPercent = percentage ?? (total > 0 ? (current / total) * 100 : 0);

    return (
        <div className="progress-container" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
            <div className="progress-info">
                <span className="progress-label">Öğrenme İlerlemesi</span>
                <span className="progress-text">
                    {current} / {total} Tamamlandı (%{Math.round(progressPercent)})
                </span>
            </div>
            <div className="progress-bar-wrapper">
                <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>
        </div>
    );
};
