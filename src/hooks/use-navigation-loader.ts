"use client";

import { create } from "zustand";

interface NavigationStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startNavigation: (href: string, router: any) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  startNavigation: (href, router) => {
    set({ isLoading: true });
    router.push(href);
  },
}));
