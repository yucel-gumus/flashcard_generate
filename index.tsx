/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {GoogleGenAI} from '@google/genai';

// Tip tanımlamaları
interface Flashcard {
  term: string;
  definition: string;
  language?: string;
  category?: string;
}

interface AppState {
  currentFlashcards: Flashcard[];
  currentCardIndex: number;
  isGenerating: boolean;
}

// DOM elementleri
const elements = {
  topicInput: document.getElementById('topicInput') as HTMLTextAreaElement,
  generateButton: document.getElementById('generateButton') as HTMLButtonElement,
  flashcardsContainer: document.getElementById('flashcardsContainer') as HTMLDivElement,
  errorMessage: document.getElementById('errorMessage') as HTMLDivElement,
  shuffleButton: document.getElementById('shuffleButton') as HTMLButtonElement,
  saveButton: document.getElementById('saveButton') as HTMLButtonElement,
  progressBar: document.getElementById('progressBar') as HTMLDivElement,
  progressText: document.getElementById('progressText') as HTMLSpanElement,
};

// Uygulama durumu
const appState: AppState = {
  currentFlashcards: [],
  currentCardIndex: 0,
  isGenerating: false,
};

// Sabitler
const CONSTANTS = {
  FLIP_SOUND_VOLUME: 0.3,
  INSTRUCTION_DELAY: 500,
  INSTRUCTION_DURATION: 4000,
  MIN_CARD_HEIGHT: 220,
} as const;

// Ses efekti
const flipSound = new Audio('data:audio/wav;base64,UklGRogAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YWQAAABzc3N6g4ODg4J+fHp5eXl8f4GDg4OCfnx6eXl5fH+Bg4ODgn58enl5eXx/gYODg4SDgH17eXh4eXyAg4SEg4B9e3l4eHl8gIOEhIOAfXt5eHh5fICDhISDgH17eXh4eXyAg4SEg4B9e3l4eHl8gIOEhA==');
flipSound.volume = CONSTANTS.FLIP_SOUND_VOLUME;

// AI istemcisi
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// Yardımcı fonksiyonlar
const showError = (message: string): void => {
  elements.errorMessage.textContent = message;
  elements.flashcardsContainer.textContent = '';
};

const showSuccess = (message: string): void => {
  elements.errorMessage.innerHTML = `<span style="color: var(--tertiary); font-weight: 500;">${message}</span>`;
};

const clearMessages = (): void => {
  elements.errorMessage.textContent = '';
};

const setButtonsState = (disabled: boolean, loading = false): void => {
  elements.generateButton.disabled = disabled;
  elements.shuffleButton.disabled = disabled || appState.currentFlashcards.length === 0;
  elements.saveButton.disabled = disabled || appState.currentFlashcards.length === 0;
  
  if (loading) {
    elements.generateButton.classList.add('loading');
  } else {
    elements.generateButton.classList.remove('loading');
  }
};

const updateProgress = (): void => {
  const { currentFlashcards, currentCardIndex } = appState;
  
  if (currentFlashcards.length > 0) {
    const progress = ((currentCardIndex + 1) / currentFlashcards.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
    elements.progressText.textContent = `${currentCardIndex + 1}/${currentFlashcards.length} Kart`;
  } else {
    elements.progressBar.style.width = '0%';
    elements.progressText.textContent = '0/0 Kart';
  }
};

const parseFlashcardsFromText = (text: string, topic: string): Flashcard[] => {
  return text
    .split('\n')
    .map((line) => {
      const parts = line.split(':');
      if (parts.length >= 2 && parts[0].trim()) {
        const term = parts[0].trim();
        const definition = parts.slice(1).join(':').trim();
        if (definition) {
          return {
            term,
            definition,
            category: topic,
            language: 'tr',
          } as Flashcard;
        }
      }
      return null;
    })
    .filter((card): card is Flashcard => card !== null);
};

const createInstructionElement = (text: string): HTMLDivElement => {
  const instructionDiv = document.createElement('div');
  instructionDiv.classList.add('card-instruction');
  instructionDiv.textContent = text;
  return instructionDiv;
};

const createCardElement = (flashcard: Flashcard, index: number): HTMLDivElement => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('flashcard');
  cardDiv.dataset['index'] = index.toString();

  const cardInner = document.createElement('div');
  cardInner.classList.add('flashcard-inner');

  // Ön yüz
  const cardFront = document.createElement('div');
  cardFront.classList.add('flashcard-front');

  const termDiv = document.createElement('div');
  termDiv.classList.add('term');
  termDiv.textContent = flashcard.term;

  const frontInstruction = createInstructionElement('Cevabı görmek için tıklayın');

  cardFront.appendChild(termDiv);
  if (flashcard.category) {
    const categoryBadge = document.createElement('span');
    categoryBadge.classList.add('category-badge');
    categoryBadge.textContent = flashcard.category;
    cardFront.appendChild(categoryBadge);
  }
  cardFront.appendChild(frontInstruction);

  // Arka yüz
  const cardBack = document.createElement('div');
  cardBack.classList.add('flashcard-back');

  const definitionDiv = document.createElement('div');
  definitionDiv.classList.add('definition');
  definitionDiv.textContent = flashcard.definition;

  const backInstruction = createInstructionElement('Tekrar çevirmek için tıklayın');

  cardBack.appendChild(definitionDiv);
  cardBack.appendChild(backInstruction);

  // Elementleri birleştir
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardDiv.appendChild(cardInner);

  // Kart tıklama olayı
  cardDiv.addEventListener('click', () => handleCardClick(cardDiv, index));

  return cardDiv;
};

const handleCardClick = (cardDiv: HTMLDivElement, index: number): void => {
  cardDiv.classList.toggle('flipped');
  
  // Ses efekti
  flipSound.currentTime = 0;
  flipSound.play().catch(console.error);
  
  // İlerleme güncelleme
  if (cardDiv.classList.contains('flipped')) {
    appState.currentCardIndex = index;
    updateProgress();
  }
};

const createFlashcards = (flashcards: Flashcard[]): void => {
  appState.currentFlashcards = flashcards;
  appState.currentCardIndex = 0;
  elements.flashcardsContainer.innerHTML = '';
  
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('cards-grid');
  
  flashcards.forEach((flashcard, index) => {
    const cardElement = createCardElement(flashcard, index);
    cardContainer.appendChild(cardElement);
  });
  
  elements.flashcardsContainer.appendChild(cardContainer);
  updateProgress();
  
  // Butonları etkinleştir
  setButtonsState(false);
};

const shuffleFlashcards = (): void => {
  appState.currentFlashcards = [...appState.currentFlashcards].sort(() => Math.random() - 0.5);
  updateProgress();
  createFlashcards(appState.currentFlashcards);
};

const saveFlashcards = (): void => {
  const data = {
    flashcards: appState.currentFlashcards,
    savedAt: new Date().toISOString(),
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `flashcards-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const showInstructionMessage = (): void => {
  setTimeout(() => {
    if (elements.errorMessage.textContent === '') {
      showSuccess('💡 İpucu: Kartlara tıklayarak cevapları görebilirsiniz!');
      setTimeout(() => {
        if (elements.errorMessage.innerHTML.includes('İpucu')) {
          clearMessages();
        }
      }, CONSTANTS.INSTRUCTION_DURATION);
    }
  }, CONSTANTS.INSTRUCTION_DELAY);
};

const generateFlashcards = async (): Promise<void> => {
  const topic = elements.topicInput.value.trim();
  
  if (!topic) {
    showError('Lütfen bir konu veya terim girin.');
    return;
  }

  if (appState.isGenerating) {
    return;
  }

  appState.isGenerating = true;
  elements.errorMessage.textContent = 'Flash kartlar oluşturuluyor...';
  elements.flashcardsContainer.textContent = '';
  setButtonsState(true, true);

  try {
    const prompt = `${topic} konusu için flash kartlar oluştur. Her kartta bir terim ve kısa bir açıklama olmalı. Çıktıyı "Terim: Tanım" formatında, her çift yeni bir satırda olacak şekilde düzenle. Terimler ve tanımlar iki nokta üst üste ile ayrılmalı. Örnek çıktı:
    Merhaba: Hello
    Hoşçakal: Goodbye`;
    
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
    });

    const responseText = result?.text ?? '';

    if (responseText) {
      const flashcards = parseFlashcardsFromText(responseText, topic);

      if (flashcards.length > 0) {
        clearMessages();
        createFlashcards(flashcards);
        showInstructionMessage();
      } else {
        showError('Kartlar oluşturulamadı. Lütfen tekrar deneyin.');
      }
    } else {
      showError('Boş yanıt alındı. Lütfen tekrar deneyin.');
    }
  } catch (error: unknown) {
    console.error('İçerik oluşturma hatası:', error);
    const detailedError = (error as Error)?.message || 'Bilinmeyen bir hata oluştu';
    showError(`Hata oluştu: ${detailedError}`);
  } finally {
    appState.isGenerating = false;
    setButtonsState(false);
  }
};

// Event listeners
elements.generateButton.addEventListener('click', generateFlashcards);
elements.shuffleButton.addEventListener('click', shuffleFlashcards);
elements.saveButton.addEventListener('click', saveFlashcards);

// Klavye kısayolları
elements.topicInput.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault();
    generateFlashcards();
  }
});

// Sayfa yüklendiğinde başlangıç durumu
document.addEventListener('DOMContentLoaded', () => {
  updateProgress();
  setButtonsState(false);
});
