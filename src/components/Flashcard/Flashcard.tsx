/**
 * @fileoverview Tek bir Flashcard bileşeni (60-30-10 Design System)
 */

import React from 'react';
import type { Flashcard as FlashcardType } from '../../types/flashcard.types';
import './Flashcard.css';

export interface FlashcardProps {
    /** Flashcard verisi */
    flashcard: FlashcardType;
    /** Çevrilmiş durumu */
    isFlipped: boolean;
    /** Çevirme olayı */
    onFlip: () => void;
}

/**
 * Tek bir bilgi kartı bileşeni
 */
export const Flashcard: React.FC<FlashcardProps> = ({
    flashcard,
    isFlipped,
    onFlip,
}) => {
    const handleKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onFlip();
        }
    };

    return (
        <div
            className={`flashcard ${isFlipped ? 'flashcard--flipped' : ''}`}
            onClick={onFlip}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            aria-label={`Kart: ${flashcard.term}. ${isFlipped ? 'Tanım gösteriliyor' : 'Tanımı görmek için tıklayın'}`}
        >
            <div className="flashcard__inner">
                {/* Ön Yüz (Soru) - Secondary #FFB6A6 */}
                <div className="flashcard__front">
                    <span className="flashcard__tag">Soru</span>
                    <div className="flashcard__content">
                        <h3 className="flashcard__term">{flashcard.term}</h3>
                    </div>
                    <div className="flashcard__instruction">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                        </svg>
                        Cevabı Gör
                    </div>
                </div>

                {/* Arka Yüz (Cevap) - Accent #9BCEC1 */}
                <div className="flashcard__back">
                    <span className="flashcard__tag">Cevap</span>
                    <div className="flashcard__content">
                        <p className="flashcard__definition">{flashcard.definition}</p>
                    </div>
                    <div className="flashcard__instruction">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 22v-6h6M2.66 8.43a10 10 0 1 1 .57 8.38L2.5 22"/>
                        </svg>
                        Soruyu Gör
                    </div>
                </div>
            </div>
        </div>
    );
};
