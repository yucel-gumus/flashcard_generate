/**
 * @fileoverview Ana uygulama bileşeni
 */

import React, { useState, useCallback } from 'react';
import { Button, FlashcardGrid, ProgressBar } from './components';
import { useFlashcards, useAudio } from './hooks';

/**
 * Ana Flashcard Generator uygulaması
 */
export const App: React.FC = () => {
    const [topic, setTopic] = useState<string>('');
    const { playFlipSound } = useAudio();

    const {
        flashcards,
        flippedCards,
        isLoading,
        error,
        successMessage,
        progress,
        hasCards,
        generateCards,
        flipCard,
        shuffleCards,
        saveCards,
    } = useFlashcards();

    /**
     * Form gönderimini yapar
     */
    const handleGenerate = useCallback(async (): Promise<void> => {
        await generateCards(topic);
    }, [generateCards, topic]);

    /**
     * Kart çevirme olayını yakalar
     */
    const handleCardFlip = useCallback(
        (cardId: string): void => {
            playFlipSound();
            flipCard(cardId);
        },
        [playFlipSound, flipCard]
    );

    return (
        <div className="container">
            {/* Header */}
            <header className="app-header">
                <h1 className="app-header__title">Bilgi Kartı Oluşturucu</h1>
                <p className="app-header__subtitle">
                    Yapay zeka destekli öğrenme aracı
                </p>
            </header>

            {/* Main Content */}
            <main className="app-main">
                {/* Input Section */}
                <section className="input-section">
                    <input
                        className="input-section__textarea"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="Bir konu girin (örn: JavaScript, React, Python...)"
                        aria-label="Konu girişi"
                    />

                    {/* Button Container */}
                    <div className="button-container">
                        <Button
                            variant="primary"
                            onClick={handleGenerate}
                            loading={isLoading}
                            disabled={isLoading || !topic.trim()}
                        >
                            Bilgi Kartı Oluştur
                        </Button>

                        <div className="button-container__secondary">
                            <Button
                                variant="secondary"
                                onClick={shuffleCards}
                                disabled={!hasCards || isLoading}
                            >
                                Karıştır
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={saveCards}
                                disabled={!hasCards || isLoading}
                            >
                                Kaydet
                            </Button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <ProgressBar
                        current={progress.current}
                        total={progress.total}
                        percentage={progress.percentage}
                    />
                </section>

                {/* Messages */}
                {error && (
                    <div className="message-box message-box--error" role="alert">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="message-box message-box--success" role="status">
                        {successMessage}
                    </div>
                )}

                {/* Flashcards Grid */}
                <section className="flashcards-container">
                    <FlashcardGrid
                        flashcards={flashcards}
                        flippedCards={flippedCards}
                        onCardFlip={handleCardFlip}
                    />
                </section>
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <p>© 2025 Bilgi Kartı Oluşturucu. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
};
