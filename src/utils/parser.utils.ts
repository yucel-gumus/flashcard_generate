/**
 * @fileoverview Text parsing utility fonksiyonları
 */

import type { Flashcard } from '../types/flashcard.types';

/**
 * Benzersiz ID oluşturur
 */
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * AI yanıtını parse ederek Flashcard dizisine dönüştürür
 * 
 * @param text - Parse edilecek ham metin (Terim: Tanım formatında)
 * @param category - Kartların kategorisi
 * @returns Parse edilmiş flashcard dizisi
 * 
 * @example
 * ```typescript
 * const text = "Merhaba: Hello\nHoşçakal: Goodbye";
 * const cards = parseFlashcardsFromText(text, "Temel Kelimeler");
 * // => [{ term: "Merhaba", definition: "Hello", ... }, ...]
 * ```
 */
export function parseFlashcardsFromText(text: string, category: string): Flashcard[] {
    const results: Flashcard[] = [];

    const lines = text.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex === -1) continue;

        const term = trimmedLine.substring(0, colonIndex).trim();
        const definition = trimmedLine.substring(colonIndex + 1).trim();

        if (!term || !definition) continue;

        results.push({
            id: generateId(),
            term,
            definition,
            category,
            language: 'tr',
        });
    }

    return results;
}

/**
 * Metni sanitize eder (XSS koruması)
 * 
 * @param text - Sanitize edilecek metin
 * @returns Güvenli metin
 */
export function sanitizeText(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
