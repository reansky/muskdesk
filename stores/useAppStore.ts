"use client"

import { create } from "zustand"
import type { ChainKey } from "@/types"

type AppState = {
  chain: ChainKey
  sidebarOpen: boolean
  selectedTrackerId: string | null
  setChain: (chain: ChainKey) => void
  setSidebarOpen: (open: boolean) => void
  setSelectedTrackerId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  chain: "base",
  sidebarOpen: false,
  selectedTrackerId: null,
  setChain: (chain) => set({ chain }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSelectedTrackerId: (selectedTrackerId) => set({ selectedTrackerId }),
}))
