import { create } from 'zustand';

export const useSessionStore = create((set) => ({
  sessions: [],
  setSessions: (sessions) => set({ sessions }),
}));