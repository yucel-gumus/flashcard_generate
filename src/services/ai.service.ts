/**
 * @fileoverview Gemini AI servisi
 */

import type { Flashcard, GenerateFlashcardsParams } from '../types/flashcard.types';
import { AI_PROMPT_TEMPLATE, ERROR_MESSAGES } from '../constants/app.constants';
import { parseFlashcardsFromText } from '../utils/parser.utils';

// Backend URL'i - Geliştirme ortamı için localhost
// Backend URL'i - Environment variable varsa onu kullan, yoksa localhost (dev)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/generate';

/**
 * Belirtilen konu için AI destekli flashcard'lar oluşturur
 * 
 * @param params - Flashcard oluşturma parametreleri
 * @returns Oluşturulan flashcard listesi
 * @throws API hatası durumunda hata fırlatır
 */
export async function generateFlashcards(params: GenerateFlashcardsParams): Promise<Flashcard[]> {
    const { topic } = params;

    if (!topic.trim()) {
        throw new Error(ERROR_MESSAGES.EMPTY_TOPIC);
    }

    const prompt = AI_PROMPT_TEMPLATE(topic);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const responseText = data.text;

        if (!responseText) {
            throw new Error(ERROR_MESSAGES.EMPTY_RESPONSE);
        }

        const flashcards = parseFlashcardsFromText(responseText, topic);

        if (flashcards.length === 0) {
            throw new Error(ERROR_MESSAGES.GENERATION_FAILED);
        }

        return flashcards;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
}
