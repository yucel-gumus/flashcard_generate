/**
 * @fileoverview Flashcard iş mantığı hook'u
 */

import { useState, useCallback } from 'react';
import type { AppState } from '../types/flashcard.types';
import { generateFlashcards as generateFlashcardsService } from '../services/ai.service';
import { downloadFlashcardsAsJson } from '../utils/file.utils';
import { ANIMATION_TIMING, SUCCESS_MESSAGES } from '../constants/app.constants';

/** Hook'un başlangıç durumu */
const initialState: AppState = {
    flashcards: [],
    currentIndex: 0,
    flippedCards: new Set<string>(),
    isLoading: false,
    error: null,
    successMessage: null,
};

/**
 * Flashcard yönetimi için custom hook
 * 
 * Tüm flashcard operasyonlarını (oluşturma, çevirme, karıştırma, kaydetme)
 * ve ilgili state'i yönetir.
 * 
 * @returns Flashcard state ve operasyonları
 * 
 * @example
 * ```tsx
 * const { 
 *   flashcards, 
 *   isLoading, 
 *   generateCards, 
 *   flipCard 
 * } = useFlashcards();
 * ```
 */
export function useFlashcards() {
    const [state, setState] = useState<AppState>(initialState);

    /**
     * Mesajları temizler
     */
    const clearMessages = useCallback((): void => {
        setState((prev) => ({ ...prev, error: null, successMessage: null }));
    }, []);

    /**
     * Hata mesajı gösterir
     */
    const setError = useCallback((message: string): void => {
        setState((prev) => ({
            ...prev,
            error: message,
            successMessage: null
        }));
    }, []);

    /**
     * Başarı mesajı gösterir
     */
    const setSuccess = useCallback((message: string): void => {
        setState((prev) => ({
            ...prev,
            successMessage: message,
            error: null
        }));
    }, []);

    /**
     * AI ile flashcard'lar oluşturur
     */
    const generateCards = useCallback(async (topic: string): Promise<void> => {
        if (state.isLoading) return;

        setState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
            successMessage: SUCCESS_MESSAGES.GENERATING,
        }));

        try {
            const flashcards = await generateFlashcardsService({ topic });

            setState((prev) => ({
                ...prev,
                flashcards,
                currentIndex: 0,
                flippedCards: new Set<string>(),
                isLoading: false,
                error: null,
                successMessage: null,
            }));

            // İpucu mesajını göster
            setTimeout(() => {
                setSuccess(SUCCESS_MESSAGES.TIP);
                setTimeout(clearMessages, ANIMATION_TIMING.INSTRUCTION_DURATION);
            }, ANIMATION_TIMING.INSTRUCTION_DELAY);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Bilinmeyen hata',
                successMessage: null,
            }));
        }
    }, [state.isLoading, clearMessages, setSuccess]);

    /**
     * Kartı çevirir
     */
    const flipCard = useCallback((cardId: string): void => {
        setState((prev) => {
            const newFlippedCards = new Set(prev.flippedCards);

            if (newFlippedCards.has(cardId)) {
                newFlippedCards.delete(cardId);
            } else {
                newFlippedCards.add(cardId);
            }

            // Güncel indeksi bul
            const cardIndex = prev.flashcards.findIndex((c) => c.id === cardId);

            return {
                ...prev,
                flippedCards: newFlippedCards,
                currentIndex: cardIndex >= 0 ? cardIndex : prev.currentIndex,
            };
        });
    }, []);

    /**
     * Kartların sırasını karıştırır
     */
    const shuffleCards = useCallback((): void => {
        setState((prev) => ({
            ...prev,
            flashcards: [...prev.flashcards].sort(() => Math.random() - 0.5),
            currentIndex: 0,
            flippedCards: new Set<string>(),
        }));
    }, []);

    /**
     * Kartları JSON olarak indirir
     */
    const saveCards = useCallback((): void => {
        if (state.flashcards.length > 0) {
            downloadFlashcardsAsJson(state.flashcards);
        }
    }, [state.flashcards]);

    /**
     * Tüm state'i sıfırlar
     */
    const reset = useCallback((): void => {
        setState(initialState);
    }, []);

    // Hesaplanmış değerler
    const progress = {
        current: state.flippedCards.size,
        total: state.flashcards.length,
        percentage: state.flashcards.length > 0
            ? (state.flippedCards.size / state.flashcards.length) * 100
            : 0,
    };

    const hasCards = state.flashcards.length > 0;

    return {
        // State
        flashcards: state.flashcards,
        flippedCards: state.flippedCards,
        isLoading: state.isLoading,
        error: state.error,
        successMessage: state.successMessage,
        progress,
        hasCards,

        // Actions
        generateCards,
        flipCard,
        shuffleCards,
        saveCards,
        reset,
        clearMessages,
        setError,
    };
}
