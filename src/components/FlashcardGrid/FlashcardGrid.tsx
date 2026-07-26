/**
 * @fileoverview Flashcard Grid bileşeni (60-30-10 Design System)
 */

import React from 'react';
import type { Flashcard as FlashcardType } from '../../types/flashcard.types';
import { Flashcard } from '../Flashcard';
import './FlashcardGrid.css';

export interface FlashcardGridProps {
    /** Flashcard listesi */
    flashcards: FlashcardType[];
    /** Çevrilmiş kartların ID seti */
    flippedCards: Set<string>;
    /** Kart çevirme olayı */
    onCardFlip: (cardId: string) => void;
}

/**
 * Flashcard grid container bileşeni
 */
export const FlashcardGrid: React.FC<FlashcardGridProps> = ({
    flashcards,
    flippedCards,
    onCardFlip,
}) => {
    if (flashcards.length === 0) {
        return null;
    }

    return (
        <div className="flashcard-grid-wrapper">
            <div className="flashcard-grid-header">
                <div className="flashcard-grid-header__title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    Oluşturulan Kartlar
                </div>
                <span className="flashcard-grid-header__count">
                    {flashcards.length} Kart
                </span>
            </div>
            <div className="flashcard-grid">
                {flashcards.map((flashcard) => (
                    <Flashcard
                        key={flashcard.id}
                        flashcard={flashcard}
                        isFlipped={flippedCards.has(flashcard.id)}
                        onFlip={() => onCardFlip(flashcard.id)}
                    />
                ))}
            </div>
        </div>
    );
};
