/**
 * @fileoverview Flashcard uygulaması için tip tanımlamaları
 */

/**
 * Tek bir bilgi kartını temsil eder
 */
export interface Flashcard {
    /** Kartın benzersiz kimliği */
    id: string;
    /** Öğrenilecek terim veya kavram */
    term: string;
    /** Terimin açıklaması veya tanımı */
    definition: string;
    /** Kartın ait olduğu kategori */
    category?: string;
    /** Kartın dili */
    language?: string;
}

/**
 * Uygulama durumunu temsil eder
 */
export interface AppState {
    /** Mevcut flashcard listesi */
    flashcards: Flashcard[];
    /** Aktif kartın indeksi */
    currentIndex: number;
    /** Çevrilmiş kartların ID'leri */
    flippedCards: Set<string>;
    /** API çağrısı devam ediyor mu */
    isLoading: boolean;
    /** Hata mesajı */
    error: string | null;
    /** Başarı mesajı */
    successMessage: string | null;
}

/**
 * Flashcard oluşturma için gerekli parametreler
 */
export interface GenerateFlashcardsParams {
    /** Konu veya terim */
    topic: string;
}

/**
 * AI servisinden gelen yanıt
 */
export interface AIResponse {
    /** Ham metin yanıtı */
    text: string;
}

/**
 * Export edilecek flashcard verisi
 */
export interface FlashcardExport {
    /** Flashcard listesi */
    flashcards: Flashcard[];
    /** Kayıt zamanı */
    savedAt: string;
    /** Export versiyonu */
    version: string;
}
