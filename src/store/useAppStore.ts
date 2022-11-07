import create from 'zustand';

interface AppState {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (showAuthModal: boolean) => void;
  user: string | null;
  setUser: (user: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  showSidebar: false,
  setShowSidebar: (showSidebar) => set(() => ({ showSidebar })),
  showAuthModal: false,
  setShowAuthModal: (showAuthModal) => set(() => ({ showAuthModal })),
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
