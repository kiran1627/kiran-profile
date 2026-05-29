'use client';

import { useRef, useCallback } from 'react';
import usePortfolioStore from '../store/usePortfolioStore';

const INTRO_TEXT = `Hey there! I'm Kiran Babu Bandela, an AI Engineer passionate about building intelligent systems with LLMs, computer vision, and autonomous agents. Feel free to explore my work, or ask me anything!`;

/**
 * Hook managing the voice system: TTS generation, playback, controls.
 * Integrates with the lip sync system via audio element sharing.
 */
export function useVoiceSystem() {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const queueRef = useRef([]);
  const isPlayingRef = useRef(false);

  const voiceMuted = usePortfolioStore((s) => s.voiceMuted);
  const voiceVolume = usePortfolioStore((s) => s.voiceVolume);
  const setVoicePlaying = usePortfolioStore((s) => s.setVoicePlaying);
  const setHasPlayedIntro = usePortfolioStore((s) => s.setHasPlayedIntro);
  const setAvatarExpression = usePortfolioStore((s) => s.setAvatarExpression);
  const setAvatarIsSpeaking = usePortfolioStore((s) => s.setAvatarIsSpeaking);

  /**
   * Initialize audio element if not already created
   */
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audioRef.current = audio;

      audio.addEventListener('play', () => {
        setVoicePlaying(true);
        setAvatarIsSpeaking(true);
        setAvatarExpression('talking');
      });

      audio.addEventListener('ended', () => {
        setVoicePlaying(false);
        setAvatarIsSpeaking(false);
        setAvatarExpression('idle');
        isPlayingRef.current = false;
        processQueue();
      });

      audio.addEventListener('pause', () => {
        setVoicePlaying(false);
        setAvatarIsSpeaking(false);
      });

      audio.addEventListener('error', () => {
        setVoicePlaying(false);
        setAvatarIsSpeaking(false);
        isPlayingRef.current = false;
        processQueue();
      });
    }
    return audioRef.current;
  }, [setVoicePlaying, setAvatarIsSpeaking, setAvatarExpression]);

  /**
   * Process next item in speech queue
   */
  const processQueue = useCallback(() => {
    if (queueRef.current.length === 0 || isPlayingRef.current) return;
    const nextText = queueRef.current.shift();
    if (nextText) {
      generateAndPlay(nextText);
    }
  }, []);

  /**
   * Generate speech and play it
   */
  const generateAndPlay = useCallback(async (text) => {
    if (voiceMuted) return;

    isPlayingRef.current = true;
    const audio = getAudio();

    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.fallback || !response.ok) {
          console.log('Voice API not configured, using Web Speech API fallback');
          
          // Use native SpeechSynthesis as fallback
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            
            utterance.onstart = () => {
              setVoicePlaying(true);
              setAvatarIsSpeaking(true);
              setAvatarExpression('talking');
            };
            
            utterance.onend = () => {
              setVoicePlaying(false);
              setAvatarIsSpeaking(false);
              setAvatarExpression('idle');
              isPlayingRef.current = false;
              processQueue();
            };
            
            utterance.onerror = () => {
              setVoicePlaying(false);
              setAvatarIsSpeaking(false);
              setAvatarExpression('idle');
              isPlayingRef.current = false;
              processQueue();
            };
            
            window.speechSynthesis.speak(utterance);
            return;
          } else {
            // No speech synthesis available
            isPlayingRef.current = false;
            setAvatarExpression('talking');
            setTimeout(() => setAvatarExpression('idle'), 2000);
            return;
          }
        }
      }

      if (!response.ok) {
        throw new Error('Voice generation failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      audio.src = url;
      audio.volume = voiceVolume;
      await audio.play().catch(() => {
        // Autoplay blocked - that's ok
        console.log('Autoplay blocked, user interaction required');
        isPlayingRef.current = false;
      });
    } catch (error) {
      console.warn('Voice generation error:', error);
      isPlayingRef.current = false;
      processQueue();
    }
  }, [voiceMuted, voiceVolume, getAudio, setAvatarExpression, processQueue, setVoicePlaying, setAvatarIsSpeaking]);

  /**
   * Speak text (queues if something is already playing)
   */
  const speak = useCallback((text) => {
    if (voiceMuted) return;
    if (isPlayingRef.current) {
      queueRef.current.push(text);
    } else {
      generateAndPlay(text);
    }
  }, [voiceMuted, generateAndPlay]);

  /**
   * Play the introduction
   */
  const playIntro = useCallback(() => {
    setAvatarExpression('greeting');
    setTimeout(() => {
      speak(INTRO_TEXT);
      setHasPlayedIntro(true);
    }, 1500);
  }, [speak, setAvatarExpression, setHasPlayedIntro]);

  /**
   * Replay the last speech
   */
  const replay = useCallback(() => {
    const audio = getAudio();
    if (audio.src) {
      audio.currentTime = 0;
      audio.volume = voiceVolume;
      audio.play().catch(() => {});
    }
  }, [voiceVolume, getAudio]);

  /**
   * Stop current speech
   */
  const stop = useCallback(() => {
    const audio = getAudio();
    audio.pause();
    audio.currentTime = 0;
    queueRef.current = [];
    isPlayingRef.current = false;
    setVoicePlaying(false);
    setAvatarIsSpeaking(false);
    setAvatarExpression('idle');
  }, [getAudio, setVoicePlaying, setAvatarIsSpeaking, setAvatarExpression]);

  /**
   * Get the audio element for lip sync connection
   */
  const getAudioElement = useCallback(() => {
    return getAudio();
  }, [getAudio]);

  return {
    speak,
    playIntro,
    replay,
    stop,
    getAudioElement,
    INTRO_TEXT,
  };
}
