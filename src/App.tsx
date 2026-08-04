/**
 * @fileoverview Ana uygulama bileşeni (60-30-10 Design System)
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
            {/* App Header */}
            <header className="app-header">
                <h1 className="app-header__title">
                    Bilgi Kartı <span>Oluşturucu</span>
                </h1>
                <p className="app-header__subtitle">
                    Yapay zekanın gücüyle dilediğiniz konuda anında bilgi kartları üretin ve öğrenmenizi hızlandırın.
                </p>

                {hasCards && (
                    <div className="header-stats">
                        <div className="stat-chip">
                            Toplam Kart
                            <span className="stat-chip__value">{flashcards.length}</span>
                        </div>
                        <div className="stat-chip">
                            İncelenen
                            <span className="stat-chip__value">{flippedCards.size}</span>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="app-main">
                {/* Input Section - Hero Control Panel */}
                <section className="input-section">
                    <label className="input-section__label" htmlFor="topic-input">
                        Öğrenmek İstediğiniz Konu
                    </label>
                    <div className="input-wrapper">
                        <svg className="input-wrapper__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            id="topic-input"
                            className="input-section__textarea"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                            placeholder="Bir konu girin (örn: React Hooks, Python Veri Yapıları, Dünya Tarihi...)"
                            aria-label="Konu girişi"
                        />
                    </div>

                    {/* Button Controls Container */}
                    <div className="button-container">
                        <Button
                            variant="primary"
                            onClick={handleGenerate}
                            loading={isLoading}
                            disabled={isLoading || !topic.trim()}
                            icon={
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                </svg>
                            }
                        >
                            Bilgi Kartları Oluştur
                        </Button>

                        {hasCards && (
                            <div className="button-container__secondary">
                                <Button
                                    variant="secondary"
                                    onClick={shuffleCards}
                                    disabled={isLoading}
                                    icon={
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="16 3 21 3 21 8" />
                                            <line x1="4" y1="20" x2="21" y2="3" />
                                            <polyline points="21 16 21 21 16 21" />
                                            <line x1="15" y1="15" x2="21" y2="21" />
                                            <line x1="4" y1="4" x2="9" y2="9" />
                                        </svg>
                                    }
                                >
                                    Kartları Karıştır
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => saveCards(topic)}
                                    disabled={isLoading}
                                    icon={
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                            <polyline points="10 9 9 9 8 9" />
                                        </svg>
                                    }
                                >
                                    PDF Olarak Kaydet
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar Container */}
                    {hasCards && (
                        <ProgressBar
                            current={progress.current}
                            total={progress.total}
                            percentage={progress.percentage}
                        />
                    )}
                </section>

                {/* Notifications & Status Messages */}
                {error && (
                    <div className="message-box message-box--error" role="alert">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="message-box message-box--success" role="status">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {successMessage}
                    </div>
                )}

                {/* Flashcards Grid Container */}
                <section className="flashcards-container">
                    <FlashcardGrid
                        flashcards={flashcards}
                        flippedCards={flippedCards}
                        onCardFlip={handleCardFlip}
                    />

                    {/* Empty State */}
                    {!hasCards && !isLoading && (
                        <div className="empty-state">
                            <div className="empty-state__icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </div>
                            <h3 className="empty-state__title">Henüz Kart Oluşturulmadı</h3>
                            <p className="empty-state__description">
                                Yukarıdaki arama kutusuna çalışmak istediğiniz konuyu yazın ve "Bilgi Kartları Oluştur" butonuna basarak yapay zekanın kartlarınızı hazırlamasını sağlayın.
                            </p>
                        </div>
                    )}
                </section>
                <footer className="w-full py-4 text-center text-xs text-gray-500 border-t border-gray-200/20 mt-8">
                    <p>Geliştirici: <a href="https://www.yucelgumus.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-gray-700 transition-colors">Yücel Gümüş</a></p>
                </footer>
            </main>
        </div>
    );
};
