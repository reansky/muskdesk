"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ActivityDTO, TrackerDTO, WalletDTO } from "@/types"

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...options, headers: { "content-type": "application/json", ...options?.headers } })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || "Request failed")
  return body
}

export function useWallets(chain: string) {
  return useQuery<{ wallets: WalletDTO[] }>({ queryKey: ["wallets", chain], queryFn: () => request(`/api/wallets?chain=${chain}`) })
}

export function useTrackers(chain: string) {
  return useQuery<{ trackers: TrackerDTO[] }>({ queryKey: ["trackers", chain], queryFn: () => request(`/api/trackers?chain=${chain}`) })
}

export function useActivity(chain: string) {
  return useQuery<{ activities: ActivityDTO[] }>({ queryKey: ["activity", chain], queryFn: () => request(`/api/activity?chain=${chain}`) })
}

export function useCreateWallet() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (input: { name: string; chain: string }) => request("/api/wallets", { method: "POST", body: JSON.stringify(input) }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wallets"] }) })
}

export function useCreateTracker() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (input: Record<string, unknown>) => request("/api/trackers", { method: "POST", body: JSON.stringify(input) }), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["trackers"] }); queryClient.invalidateQueries({ queryKey: ["activity"] }) } })
}
