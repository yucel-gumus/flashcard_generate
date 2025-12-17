/**
 * @fileoverview Gemini AI servisi
 */

import { GoogleGenAI } from '@google/genai';
import type { Flashcard, GenerateFlashcardsParams } from '../types/flashcard.types';
import { AI_PROMPT_TEMPLATE, GEMINI_MODEL, ERROR_MESSAGES } from '../constants/app.constants';
import { parseFlashcardsFromText } from '../utils/parser.utils';

/** Gemini AI istemcisi */
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string });

/**
 * Belirtilen konu için AI destekli flashcard'lar oluşturur
 * 
 * @param params - Flashcard oluşturma parametreleri
 * @returns Oluşturulan flashcard listesi
 * @throws API hatası durumunda hata fırlatır
 * 
 * @example
 * ```typescript
 * const cards = await generateFlashcards({ topic: 'JavaScript' });
 * ```
 */
export async function generateFlashcards(params: GenerateFlashcardsParams): Promise<Flashcard[]> {
    const { topic } = params;

    if (!topic.trim()) {
        throw new Error(ERROR_MESSAGES.EMPTY_TOPIC);
    }

    const prompt = AI_PROMPT_TEMPLATE(topic);

    try {
        const result = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });

        const responseText = result?.text ?? '';

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
