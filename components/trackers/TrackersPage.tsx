"use client"

import { Plus, Radar } from "lucide-react"
import { useState } from "react"
import { useChain } from "@/hooks/useChain"
import { useActivity, useTrackers } from "@/hooks/useApi"
import { TrackerGrid } from "@/components/trackers/TrackerGrid"
import { AddTrackerModal } from "@/components/trackers/AddTrackerModal"
import { TrackerFilters } from "@/components/trackers/TrackerFilters"
import { ActivityFeed } from "@/components/trackers/ActivityFeed"
import { TokenActivityCard } from "@/components/trackers/TokenActivityCard"
import { PageSkeleton } from "@/components/ui/Loading"
import { chains } from "@/lib/chains"

export function TrackersPage() {
  const { chain } = useChain()
  const trackers = useTrackers(chain)
  const activity = useActivity(chain)
  const [modalOpen, setModalOpen] = useState(false)
  const config = chains[chain]
  const latest = activity.data?.activities[0]
  return <div className="mx-auto max-w-[1380px] space-y-7"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{config.name} / Signals</p><h1 className="page-title mt-2">Trackers</h1><p className="mt-2 text-sm text-[var(--muted)]">Monitor wallets and activity across Base and Robinhood.</p></div><div className="flex gap-2"><TrackerFilters onRefresh={() => { void trackers.refetch(); void activity.refetch() }} isFetching={trackers.isFetching || activity.isFetching} /><button className="primary-button" onClick={() => setModalOpen(true)}><Plus size={16} /> Add tracker</button></div></div><div className="grid gap-3 sm:grid-cols-3"><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">Active trackers</p><p className="mt-2 text-2xl font-semibold text-white">{trackers.data?.trackers.filter((item) => item.status === "active").length ?? "—"}</p></div><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">Transactions observed</p><p className="mt-2 text-2xl font-semibold text-white">{trackers.data?.trackers.reduce((sum, item) => sum + item.transactions, 0).toLocaleString() ?? "—"}</p></div><div className="terminal-card flex items-center gap-3 p-4"><div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/[.1] text-accent"><Radar size={17} /></div><div><p className="text-[10px] text-[var(--muted)]">Feed status</p><p className="mt-1 text-sm font-semibold text-accent">Live indexing</p></div></div></div>{trackers.isLoading ? <PageSkeleton /> : trackers.error ? <div className="terminal-card p-5 text-sm text-red-300">{trackers.error.message}</div> : <TrackerGrid trackers={trackers.data?.trackers || []} />}<div className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]"><ActivityFeed activities={activity.data?.activities || []} />{latest && <TokenActivityCard activity={latest} />}</div><AddTrackerModal open={modalOpen} onClose={() => setModalOpen(false)} /></div>
}
