/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {GoogleGenAI} from '@google/genai';

interface Flashcard {
  term: string;
  definition: string;
  language?: string;
  category?: string;
}

const topicInput = document.getElementById('topicInput') as HTMLTextAreaElement;
const generateButton = document.getElementById(
  'generateButton',
) as HTMLButtonElement;
const flashcardsContainer = document.getElementById(
  'flashcardsContainer',
) as HTMLDivElement;
const errorMessage = document.getElementById('errorMessage') as HTMLDivElement;

// Yeni UI elementleri
const shuffleButton = document.getElementById('shuffleButton') as HTMLButtonElement;
const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
const progressBar = document.getElementById('progressBar') as HTMLDivElement;
const progressText = document.getElementById('progressText') as HTMLSpanElement;

// Ses efektleri
const flipSound = new Audio('data:audio/wav;base64,UklGRogAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YWQAAABzc3N6g4ODg4J+fHp5eXl8f4GDg4OCfnx6eXl5fH+Bg4ODgn58enl5eXx/gYODg4SDgH17eXh4eXyAg4SEg4B9e3l4eHl8gIOEhIOAfXt5eHh5fICDhISDgH17eXh4eXyAg4SEg4B9e3l4eHl8gIOEhA==');
flipSound.volume = 0.3;

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

generateButton.addEventListener('click', async () => {
  const topic = topicInput.value.trim();
  if (!topic) {
    errorMessage.textContent = 'Lütfen bir konu veya terim girin.';
    flashcardsContainer.textContent = '';
    return;
  }

  errorMessage.textContent = 'Flash kartlar oluşturuluyor...';
  flashcardsContainer.textContent = '';
  generateButton.disabled = true;

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
      const flashcards: Flashcard[] = responseText
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
                language: 'tr'
              };
            }
          }
          return null;
        })
        .filter(
          (card): card is Flashcard =>
            card !== null
        );

      if (flashcards.length > 0) {
        errorMessage.textContent = '';
        createFlashcards(flashcards);
      } else {
        errorMessage.textContent = 'Kartlar oluşturulamadı. Lütfen tekrar deneyin.';
      }
    } else {
      errorMessage.textContent = 'Boş yanıt alındı. Lütfen tekrar deneyin.';
    }
  } catch (error: unknown) {
    console.error('İçerik oluşturma hatası:', error);
    const detailedError = (error as Error)?.message || 'Bilinmeyen bir hata oluştu';
    errorMessage.textContent = `Hata oluştu: ${detailedError}`;
    flashcardsContainer.textContent = '';
  } finally {
    generateButton.disabled = false;
  }
});

// Kayıt ve karıştırma işlevleri için state
let currentFlashcards: Flashcard[] = [];
let currentCardIndex = 0;

// Karıştırma fonksiyonu
function shuffleFlashcards() {
  currentFlashcards = [...currentFlashcards].sort(() => Math.random() - 0.5);
  updateProgress();
  createFlashcards(currentFlashcards);
}

// İlerleme göstergesini güncelleme
function updateProgress() {
  if (currentFlashcards.length > 0) {
    const progress = ((currentCardIndex + 1) / currentFlashcards.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentCardIndex + 1}/${currentFlashcards.length} Kart`;
  } else {
    progressBar.style.width = '0%';
    progressText.textContent = '0/0 Kart';
  }
}

// Kartları kaydetme
function saveFlashcards() {
  const data = {
    flashcards: currentFlashcards,
    savedAt: new Date().toISOString()
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
}

// Event listeners
shuffleButton.addEventListener('click', shuffleFlashcards);
saveButton.addEventListener('click', saveFlashcards);

// Kart tıklama olayını güncelle
function handleCardClick(cardDiv: HTMLDivElement, index: number) {
  cardDiv.classList.toggle('flipped');
  flipSound.currentTime = 0;
  flipSound.play().catch(console.error); // Ses çalma hatalarını yakala
  
  // Kartın durumunu güncelle
  if (cardDiv.classList.contains('flipped')) {
    currentCardIndex = index;
    updateProgress();
  }
}

// createFlashcards fonksiyonunu güncelle
function createFlashcards(flashcards: Flashcard[]) {
  currentFlashcards = flashcards;
  currentCardIndex = 0;
  flashcardsContainer.innerHTML = '';
  
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('cards-grid');
  
  flashcards.forEach((flashcard, index) => {
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

    const categoryBadge = document.createElement('span');
    categoryBadge.classList.add('category-badge');
    categoryBadge.textContent = flashcard.category || '';

    // Arka yüz
    const cardBack = document.createElement('div');
    cardBack.classList.add('flashcard-back');

    const definitionDiv = document.createElement('div');
    definitionDiv.classList.add('definition');
    definitionDiv.textContent = flashcard.definition;

    // Elementleri birleştirme
    cardFront.appendChild(termDiv);
    if (flashcard.category) {
      cardFront.appendChild(categoryBadge);
    }
    
    cardBack.appendChild(definitionDiv);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardDiv.appendChild(cardInner);

    // Kart çevirme olayı
    cardDiv.addEventListener('click', () => handleCardClick(cardDiv, index));

    cardContainer.appendChild(cardDiv);
  });
  
  flashcardsContainer.appendChild(cardContainer);
  updateProgress();
  
  // Butonları etkinleştir
  shuffleButton.disabled = false;
  saveButton.disabled = false;
}
