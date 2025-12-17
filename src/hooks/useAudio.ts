/**
 * @fileoverview Ses efekti yönetimi hook'u
 */

import { useRef, useCallback } from 'react';
import { AUDIO_CONFIG } from '../constants/app.constants';

/**
 * Ses efektlerini yönetmek için custom hook
 * 
 * @returns Ses çalma fonksiyonu
 * 
 * @example
 * ```tsx
 * const { playFlipSound } = useAudio();
 * 
 * const handleFlip = () => {
 *   playFlipSound();
 * };
 * ```
 */
export function useAudio() {
    const flipSoundRef = useRef<HTMLAudioElement | null>(null);

    // Lazy initialization
    const getFlipSound = useCallback((): HTMLAudioElement => {
        if (!flipSoundRef.current) {
            flipSoundRef.current = new Audio(AUDIO_CONFIG.FLIP_SOUND_DATA);
            flipSoundRef.current.volume = AUDIO_CONFIG.FLIP_SOUND_VOLUME;
        }
        return flipSoundRef.current;
    }, []);

    /**
     * Kart çevirme sesini çalar
     */
    const playFlipSound = useCallback((): void => {
        const sound = getFlipSound();
        sound.currentTime = 0;
        sound.play().catch((error) => {
            // Autoplay policy nedeniyle sessizce başarısız olabilir
            console.debug('Ses çalınamadı:', error);
        });
    }, [getFlipSound]);

    return { playFlipSound };
}
