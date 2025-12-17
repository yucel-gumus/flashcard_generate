/**
 * @fileoverview Uygulama sabitleri
 */

/** Ses efekti ayarları */
export const AUDIO_CONFIG = {
    FLIP_SOUND_VOLUME: 0.3,
    FLIP_SOUND_DATA: 'data:audio/wav;base64,UklGRogAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YWQAAABzc3N6g4ODg4J+fHp5eXl8f4GDg4OCfnx6eXl5fH+Bg4ODgn58enl5eXx/gYODg4SDgH17eXh4eXyAg4SEg4B9e3l4eHl8gIOEhIOAfXt5eHh5fICDhISDgH17eXh4eXyAg4SEg4B9e3l4eHl8gIOEhA==',
} as const;

/** Animasyon süreleri (ms) */
export const ANIMATION_TIMING = {
    INSTRUCTION_DELAY: 500,
    INSTRUCTION_DURATION: 4000,
    FLIP_DURATION: 800,
} as const;

/** UI sabitleri */
export const UI_CONFIG = {
    MIN_CARD_HEIGHT: 220,
    GRID_MIN_COLUMN_WIDTH: 300,
} as const;

/** API prompt şablonu */
export const AI_PROMPT_TEMPLATE = (topic: string): string => `
${topic} konusu için flash kartlar oluştur. Her kartta bir terim ve kısa bir açıklama olmalı. 
Çıktıyı "Terim: Tanım" formatında, her çift yeni bir satırda olacak şekilde düzenle. 
Terimler ve tanımlar iki nokta üst üste ile ayrılmalı. 
Örnek çıktı:
Merhaba: Hello
Hoşçakal: Goodbye
`.trim();

/** Gemini model adı */
export const GEMINI_MODEL = 'gemini-3-flash-preview';

/** Hata mesajları */
export const ERROR_MESSAGES = {
    EMPTY_TOPIC: 'Lütfen bir konu veya terim girin.',
    GENERATION_FAILED: 'Kartlar oluşturulamadı. Lütfen tekrar deneyin.',
    EMPTY_RESPONSE: 'Boş yanıt alındı. Lütfen tekrar deneyin.',
    UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu.',
} as const;

/** Başarı mesajları */
export const SUCCESS_MESSAGES = {
    GENERATING: 'Flash kartlar oluşturuluyor...',
    TIP: '💡 İpucu: Kartlara tıklayarak cevapları görebilirsiniz!',
} as const;
