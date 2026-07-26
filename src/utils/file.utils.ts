/**
 * @fileoverview Dosya işlemleri utility fonksiyonları
 */

import type { Flashcard, FlashcardExport } from '../types/flashcard.types';

/**
 * Flashcard'ları JSON dosyası olarak bilgisayara indirir
 * 
 * @param flashcards - İndirilecek flashcard listesi
 * @param filename - Dosya adı (opsiyonel, tarih bazlı varsayılan)
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

    const defaultFilename = `flashcards-${new Date().toISOString().split('T')[0]}.json`;
    const finalFilename = filename ?? defaultFilename;

    const jsonString = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonString)}`;

    const anchor = document.createElement('a');
    anchor.setAttribute('href', dataUri);
    anchor.setAttribute('download', finalFilename);
    anchor.style.display = 'none';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
