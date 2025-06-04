import { GoogleGenAI } from '@google/genai';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

class FlashcardApp {
  private topicInput!: HTMLTextAreaElement;
  private generateButton!: HTMLButtonElement;
  private flashcardsContainer!: HTMLDivElement;
  private errorMessage!: HTMLDivElement;
  private ai: GoogleGenAI;
  private flashcards: Flashcard[] = [];

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.initializeElements();
    this.addEventListeners();
  }

  private initializeElements(): void {
    const topicInput = document.getElementById('topicInput');
    const generateButton = document.getElementById('generateButton');
    const flashcardsContainer = document.getElementById('flashcardsContainer');
    const errorMessage = document.getElementById('errorMessage');

    if (!topicInput || !generateButton || !flashcardsContainer || !errorMessage) {
      throw new Error('Required DOM elements not found');
    }

    this.topicInput = topicInput as HTMLTextAreaElement;
    this.generateButton = generateButton as HTMLButtonElement;
    this.flashcardsContainer = flashcardsContainer as HTMLDivElement;
    this.errorMessage = errorMessage as HTMLDivElement;
  }

  private addEventListeners(): void {
    this.generateButton.addEventListener('click', () => this.handleGenerate());
    this.topicInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        this.handleGenerate();
      }
    });
  }

  private async handleGenerate(): Promise<void> {
    const topic = this.topicInput.value.trim();
    if (!topic) {
      this.showError('Lütfen bir konu veya terim-tanım çifti girin.');
      return;
    }

    this.setGenerating(true);

    try {
      const cards = await this.generateFlashcards(topic);
      if (cards.length > 0) {
        this.flashcards = cards;
        this.renderFlashcards();
        this.clearError();
      } else {
        this.showError('Bilgi kartı oluşturulamadı. Lütfen başka bir konu deneyin.');
      }
    } catch (error) {
      console.error('Flashcard generation error:', error);
      this.showError(error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      this.setGenerating(false);
    }
  }

  private async generateFlashcards(topic: string): Promise<Flashcard[]> {
    const prompt = `"${topic}" konusu için bilgi kartı listesi oluştur. 
    Her kartta bir terim ve kısa bir tanım olmalı. 
    Çıktıyı "Terim: Tanım" formatında, her çift yeni bir satırda olacak şekilde ver. 
    En az 5, en fazla 100 kart oluştur.`;

    const result = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
    });

    const responseText = result?.text?.trim() ?? '';
    if (!responseText) {
      throw new Error('API yanıt vermedi');
    }

    return responseText
      .split('\n')
      .map((line, index) => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const term = parts[0].trim();
          const definition = parts.slice(1).join(':').trim();
          if (term && definition) {
            return {
              id: `card-${index}`,
              term,
              definition
            };
          }
        }
        return null;
      })
      .filter((card): card is Flashcard => card !== null);
  }

  private renderFlashcards(): void {
    this.flashcardsContainer.innerHTML = '';
    
    this.flashcards.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'flashcard';
      cardDiv.dataset.id = card.id;

      const cardInner = document.createElement('div');
      cardInner.className = 'flashcard-inner';

      const front = document.createElement('div');
      front.className = 'flashcard-front';
      front.innerHTML = `<div class="term">${this.escapeHtml(card.term)}</div>`;

      const back = document.createElement('div');
      back.className = 'flashcard-back';
      back.innerHTML = `<div class="definition">${this.escapeHtml(card.definition)}</div>`;

      cardInner.appendChild(front);
      cardInner.appendChild(back);
      cardDiv.appendChild(cardInner);

      cardDiv.addEventListener('click', () => {
        cardDiv.classList.toggle('flipped');
      });

      this.flashcardsContainer.appendChild(cardDiv);
    });
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  private setGenerating(isGenerating: boolean): void {
    this.generateButton.disabled = isGenerating;
    if (isGenerating) {
      this.errorMessage.textContent = 'Bilgi Kartları oluşturuluyor...';
      this.flashcardsContainer.innerHTML = '';
    }
  }

  private showError(message: string): void {
    this.errorMessage.textContent = message;
    this.flashcardsContainer.innerHTML = '';
  }

  private clearError(): void {
    this.errorMessage.textContent = '';
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    new FlashcardApp();
  } catch (error) {
    console.error('Application initialization failed:', error);
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
      errorMessage.textContent = 'Uygulama başlatılamadı. Lütfen sayfayı yenileyin.';
    }
  }
});
