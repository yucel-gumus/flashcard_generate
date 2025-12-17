/**
 * @fileoverview Tek bir Flashcard bileşeni
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
 * 
 * @example
 * ```tsx
 * <Flashcard
 *   flashcard={{ id: '1', term: 'Merhaba', definition: 'Hello' }}
 *   isFlipped={false}
 *   onFlip={() => handleFlip('1')}
 * />
 * ```
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
                {/* Ön Yüz */}
                <div className="flashcard__front">
                    <div className="flashcard__term">{flashcard.term}</div>
                    <div className="flashcard__instruction">
                        Cevabı görmek için tıklayın
                    </div>
                </div>

                {/* Arka Yüz */}
                <div className="flashcard__back">
                    <div className="flashcard__definition">{flashcard.definition}</div>
                    <div className="flashcard__instruction">
                        Tekrar çevirmek için tıklayın
                    </div>
                </div>
            </div>
        </div>
    );
};
