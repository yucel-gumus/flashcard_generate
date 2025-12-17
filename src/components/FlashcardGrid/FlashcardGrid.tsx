/**
 * @fileoverview Flashcard Grid bileşeni
 */

import React from 'react';
import type { Flashcard as FlashcardType } from '../../types/flashcard.types';
import { Flashcard } from '../Flashcard';
import './FlashcardGrid.css';

export interface FlashcardGridProps {
    /** Flashcard listesi */
    flashcards: FlashcardType[];
    /** Çevrilmiş kartların ID setı */
    flippedCards: Set<string>;
    /** Kart çevirme olayı */
    onCardFlip: (cardId: string) => void;
}

/**
 * Flashcard grid container bileşeni
 * 
 * @example
 * ```tsx
 * <FlashcardGrid
 *   flashcards={cards}
 *   flippedCards={flippedSet}
 *   onCardFlip={handleFlip}
 * />
 * ```
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
    );
};
