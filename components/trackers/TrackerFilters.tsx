"use client"

import { RefreshCw } from "lucide-react"

export function TrackerFilters({ onRefresh, isFetching }: { onRefresh: () => void; isFetching: boolean }) {
  return <div className="flex items-center gap-2"><button className="secondary-button" onClick={onRefresh} disabled={isFetching}><RefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> <span className="hidden sm:inline">Refresh</span></button><div className="hidden rounded-lg border border-white/[.09] bg-white/[.03] px-3 py-2 text-xs text-[var(--muted)] sm:block">All trackers</div></div>
}
