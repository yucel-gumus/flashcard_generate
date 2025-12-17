/**
 * @fileoverview Dosya işlemleri utility fonksiyonları
 */

import type { Flashcard, FlashcardExport } from '../types/flashcard.types';

/**
 * Flashcard'ları JSON dosyası olarak indirir
 * 
 * @param flashcards - İndirilecek flashcard listesi
 * @param filename - Dosya adı (opsiyonel, tarih bazlı varsayılan)
 * 
 * @example
 * ```typescript
 * downloadFlashcardsAsJson(flashcards);
 * // => flashcards-2025-12-17.json dosyası indirilir
 * ```
 */
export function downloadFlashcardsAsJson(
    flashcards: Flashcard[],
    filename?: string
): void {
    const exportData: FlashcardExport = {
        flashcards,
        savedAt: new Date().toISOString(),
        version: '1.0.0',
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const defaultFilename = `flashcards-${new Date().toISOString().split('T')[0]}.json`;

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename ?? defaultFilename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
}
