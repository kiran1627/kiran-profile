'use client';

import { useRef, useCallback, useEffect } from 'react';
import usePortfolioStore from '../../store/usePortfolioStore';

/**
 * Phoneme to Viseme mapping for lip synchronization.
 * Maps common phonemes to ARKit blend shape combinations.
 */
const VISEME_MAP = {
  // Silence
  sil: { jawOpen: 0, mouthOpen: 0, mouthPucker: 0, mouthSmileLeft: 0, mouthSmileRight: 0 },
  // Vowels
  AA: { jawOpen: 0.6, mouthOpen: 0.5, mouthFunnel: 0.1 },
  AE: { jawOpen: 0.5, mouthOpen: 0.4, mouthSmileLeft: 0.2, mouthSmileRight: 0.2 },
  AH: { jawOpen: 0.4, mouthOpen: 0.35, mouthFunnel: 0.05 },
  AO: { jawOpen: 0.5, mouthOpen: 0.45, mouthPucker: 0.2 },
  EH: { jawOpen: 0.3, mouthOpen: 0.25, mouthSmileLeft: 0.3, mouthSmileRight: 0.3 },
  ER: { jawOpen: 0.25, mouthOpen: 0.2, mouthPucker: 0.15, mouthFunnel: 0.1 },
  EY: { jawOpen: 0.2, mouthOpen: 0.15, mouthSmileLeft: 0.4, mouthSmileRight: 0.4 },
  IH: { jawOpen: 0.15, mouthOpen: 0.1, mouthSmileLeft: 0.35, mouthSmileRight: 0.35 },
  IY: { jawOpen: 0.1, mouthOpen: 0.05, mouthSmileLeft: 0.5, mouthSmileRight: 0.5 },
  OW: { jawOpen: 0.35, mouthOpen: 0.3, mouthPucker: 0.4, mouthFunnel: 0.3 },
  UH: { jawOpen: 0.2, mouthOpen: 0.2, mouthPucker: 0.3 },
  UW: { jawOpen: 0.15, mouthOpen: 0.1, mouthPucker: 0.5, mouthFunnel: 0.4 },
  // Consonants
  B: { jawOpen: 0, mouthOpen: 0, mouthPressLeft: 0.4, mouthPressRight: 0.4 },
  CH: { jawOpen: 0.1, mouthOpen: 0.05, mouthSmileLeft: 0.3, mouthSmileRight: 0.3 },
  D: { jawOpen: 0.1, mouthOpen: 0.05 },
  F: { jawOpen: 0.05, mouthOpen: 0, mouthLowerDownLeft: 0.2, mouthLowerDownRight: 0.2 },
  G: { jawOpen: 0.15, mouthOpen: 0.1 },
  K: { jawOpen: 0.15, mouthOpen: 0.1 },
  L: { jawOpen: 0.15, mouthOpen: 0.1, tongueOut: 0.1 },
  M: { jawOpen: 0, mouthOpen: 0, mouthPressLeft: 0.3, mouthPressRight: 0.3 },
  N: { jawOpen: 0.05, mouthOpen: 0.02 },
  P: { jawOpen: 0, mouthOpen: 0, mouthPressLeft: 0.4, mouthPressRight: 0.4 },
  R: { jawOpen: 0.1, mouthOpen: 0.05, mouthPucker: 0.2 },
  S: { jawOpen: 0.05, mouthOpen: 0.02, mouthSmileLeft: 0.2, mouthSmileRight: 0.2 },
  SH: { jawOpen: 0.08, mouthOpen: 0.03, mouthPucker: 0.3 },
  T: { jawOpen: 0.08, mouthOpen: 0.03 },
  TH: { jawOpen: 0.1, mouthOpen: 0.05, tongueOut: 0.15 },
  V: { jawOpen: 0.05, mouthOpen: 0, mouthLowerDownLeft: 0.15, mouthLowerDownRight: 0.15 },
  W: { jawOpen: 0.1, mouthOpen: 0.05, mouthPucker: 0.4 },
  Z: { jawOpen: 0.05, mouthOpen: 0.02, mouthSmileLeft: 0.15, mouthSmileRight: 0.15 },
};

/**
 * Hook for real-time lip synchronization using audio analysis.
 * Extracts audio amplitude and maps it to mouth morph targets.
 */
export function useLipSync() {
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioContextRef = useRef(null);
  const currentVisemeRef = useRef('sil');
  const smoothedValuesRef = useRef({});

  const setAvatarMouthOpenness = usePortfolioStore((s) => s.setAvatarMouthOpenness);
  const setAvatarIsSpeaking = usePortfolioStore((s) => s.setAvatarIsSpeaking);

  /**
   * Connect an audio element to the analyser for lip sync
   */
  const connectAudio = useCallback((audioElement) => {
    if (!audioElement) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch (err) {
      console.warn('Lip sync audio connection failed:', err);
    }
  }, []);

  /**
   * Get current mouth morph targets based on audio analysis.
   * Call this in useFrame for real-time updates.
   */
  const getMouthTargets = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) {
      return VISEME_MAP.sil;
    }

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    // Compute energy in different frequency bands
    const data = dataArrayRef.current;
    const len = data.length;

    // Low frequencies (bass) - jaw movement
    let lowEnergy = 0;
    for (let i = 0; i < len * 0.15; i++) {
      lowEnergy += data[i];
    }
    lowEnergy = lowEnergy / (len * 0.15) / 255;

    // Mid frequencies - mouth shape
    let midEnergy = 0;
    for (let i = Math.floor(len * 0.15); i < len * 0.5; i++) {
      midEnergy += data[i];
    }
    midEnergy = midEnergy / (len * 0.35) / 255;

    // High frequencies - lip detail
    let highEnergy = 0;
    for (let i = Math.floor(len * 0.5); i < len; i++) {
      highEnergy += data[i];
    }
    highEnergy = highEnergy / (len * 0.5) / 255;

    // Overall amplitude
    const amplitude = (lowEnergy + midEnergy + highEnergy) / 3;
    setAvatarMouthOpenness(amplitude);

    if (amplitude < 0.02) {
      setAvatarIsSpeaking(false);
      return VISEME_MAP.sil;
    }

    setAvatarIsSpeaking(true);

    // Map audio features to viseme-like targets
    const targets = {
      jawOpen: Math.min(lowEnergy * 0.8, 0.7),
      mouthOpen: Math.min(midEnergy * 0.7, 0.6),
      mouthPucker: highEnergy > 0.3 ? highEnergy * 0.3 : 0,
      mouthSmileLeft: midEnergy > 0.4 ? (midEnergy - 0.4) * 0.5 : 0,
      mouthSmileRight: midEnergy > 0.4 ? (midEnergy - 0.4) * 0.5 : 0,
      mouthFunnel: lowEnergy > 0.5 ? (lowEnergy - 0.5) * 0.4 : 0,
    };

    // Smooth the values
    for (const [key, value] of Object.entries(targets)) {
      const prev = smoothedValuesRef.current[key] || 0;
      smoothedValuesRef.current[key] = prev + (value - prev) * 0.3;
      targets[key] = smoothedValuesRef.current[key];
    }

    return targets;
  }, [setAvatarMouthOpenness, setAvatarIsSpeaking]);

  /**
   * Disconnect and cleanup
   */
  const disconnect = useCallback(() => {
    analyserRef.current = null;
    dataArrayRef.current = null;
    setAvatarIsSpeaking(false);
    setAvatarMouthOpenness(0);
  }, [setAvatarIsSpeaking, setAvatarMouthOpenness]);

  return { connectAudio, getMouthTargets, disconnect, VISEME_MAP };
}
