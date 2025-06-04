/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {GoogleGenAI} from '@google/genai';

interface Flashcard {
  term: string;
  definition: string;
}

const topicInput = document.getElementById('topicInput') as HTMLTextAreaElement;
const generateButton = document.getElementById(
  'generateButton',
) as HTMLButtonElement;
const flashcardsContainer = document.getElementById(
  'flashcardsContainer',
) as HTMLDivElement;
const errorMessage = document.getElementById('errorMessage') as HTMLDivElement;

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

generateButton.addEventListener('click', async () => {
  const topic = topicInput.value.trim();
  if (!topic) {
    errorMessage.textContent =
      'Lütfen bir konu veya terim-tanım çifti girin.';
    flashcardsContainer.textContent = '';
    return;
  }

  errorMessage.textContent = 'Bilgi Kartları oluşturuluyor...';
  flashcardsContainer.textContent = '';
  generateButton.disabled = true; 

  try {
    const prompt = `"${topic}" konusu için bilgi kartı listesi oluştur. Her kartta bir terim ve kısa bir tanım olmalı. Çıktıyı "Terim: Tanım" çiftleri şeklinde, her çift yeni bir satırda olacak şekilde formatla. Terimler ve tanımlar tek bir iki nokta üst üste ile ayrılmalı ve açıkça ayırt edilebilir olmalı. Örnek çıktı:
    Merhaba: Selam
    Hoşçakal: Güle güle`;
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
              return {term, definition};
            }
          }
          return null; 
        })
        .filter((card): card is Flashcard => card !== null); 

      if (flashcards.length > 0) {
        errorMessage.textContent = '';
        flashcards.forEach((flashcard, index) => {
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('flashcard');
          cardDiv.dataset['index'] = index.toString();

          const cardInner = document.createElement('div');
          cardInner.classList.add('flashcard-inner');

          const cardFront = document.createElement('div');
          cardFront.classList.add('flashcard-front');

          const termDiv = document.createElement('div');
          termDiv.classList.add('term');
          termDiv.textContent = flashcard.term;

          const cardBack = document.createElement('div');
          cardBack.classList.add('flashcard-back');

          const definitionDiv = document.createElement('div');
          definitionDiv.classList.add('definition');
          definitionDiv.textContent = flashcard.definition;

          cardFront.appendChild(termDiv);
          cardBack.appendChild(definitionDiv);
          cardInner.appendChild(cardFront);
          cardInner.appendChild(cardBack);
          cardDiv.appendChild(cardInner);

          flashcardsContainer.appendChild(cardDiv);

          cardDiv.addEventListener('click', () => {
            cardDiv.classList.toggle('flipped');
          });
        });
      } else {
        errorMessage.textContent =
          'Yanıttan geçerli bilgi kartı oluşturulamadı. Lütfen formatı kontrol edin.';
      }
    } else {
      errorMessage.textContent =
        'Bilgi kartı oluşturulamadı veya boş yanıt alındı. Lütfen tekrar deneyin.';
    }
  } catch (error: unknown) {
    console.error('İçerik oluşturma hatası:', error);
    const detailedError =
      (error as Error)?.message || 'Bilinmeyen bir hata oluştu';
    errorMessage.textContent = `Bir hata oluştu: ${detailedError}`;
    flashcardsContainer.textContent = ''; 
  } finally {
    generateButton.disabled = false; 
  }
});
