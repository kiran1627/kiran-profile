import { create } from 'zustand';

/**
 * Global portfolio state store using Zustand.
 * Manages avatar, voice, chat, and UI state across the entire app.
 */
const usePortfolioStore = create((set, get) => ({
  // ─── Avatar State ───────────────────────────────────────────
  avatarExpression: 'idle', // idle | greeting | thinking | happy | listening | talking
  avatarIsSpeaking: false,
  avatarMouthOpenness: 0,
  cursorPosition: { x: 0, y: 0 },

  setAvatarExpression: (expression) => set({ avatarExpression: expression }),
  setAvatarIsSpeaking: (isSpeaking) => set({ avatarIsSpeaking: isSpeaking }),
  setAvatarMouthOpenness: (openness) => set({ avatarMouthOpenness: openness }),
  setCursorPosition: (pos) => set({ cursorPosition: pos }),

  // ─── Voice State ────────────────────────────────────────────
  voiceMuted: false,
  voicePlaying: false,
  voiceVolume: 0.8,
  hasPlayedIntro: false,

  toggleVoiceMuted: () => set((s) => ({ voiceMuted: !s.voiceMuted })),
  setVoicePlaying: (playing) => set({ voicePlaying: playing }),
  setVoiceVolume: (volume) => set({ voiceVolume: volume }),
  setHasPlayedIntro: (played) => set({ hasPlayedIntro: played }),

  // ─── Chat State ─────────────────────────────────────────────
  chatOpen: false,
  chatMessages: [],
  chatLoading: false,

  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
  setChatOpen: (open) => set({ chatOpen: open }),
  addChatMessage: (message) =>
    set((s) => ({ chatMessages: [...s.chatMessages, message] })),
  setChatLoading: (loading) => set({ chatLoading: loading }),
  clearChat: () => set({ chatMessages: [] }),

  // ─── UI State ───────────────────────────────────────────────
  activeSection: 'hero',
  scrollProgress: 0,
  isLoaded: false,
  isMobile: false,
  reducedMotion: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
}));

export default usePortfolioStore;
