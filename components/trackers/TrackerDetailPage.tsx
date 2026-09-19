"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import type { ActivityDTO, TrackerDTO } from "@/types"
import { TrackerStats } from "@/components/trackers/TrackerStats"
import { ActivityFeed } from "@/components/trackers/ActivityFeed"
import { TokenActivityCard } from "@/components/trackers/TokenActivityCard"
import { Badge } from "@/components/ui/Badge"
import { PageSkeleton } from "@/components/ui/Loading"
import { truncateAddress } from "@/lib/utils"

export function TrackerDetailPage({ id }: { id: string }) {
  const query = useQuery<{ tracker: TrackerDTO; activities: ActivityDTO[] }>({ queryKey: ["tracker", id], queryFn: async () => { const response = await fetch(`/api/trackers/${id}`); const body = await response.json(); if (!response.ok) throw new Error(body.error || "Tracker not found"); return body } })
  if (query.isLoading) return <PageSkeleton />
  if (query.error || !query.data) return <div className="terminal-card p-5 text-sm text-red-300">{query.error?.message || "Tracker not found"}</div>
  const { tracker, activities } = query.data
  return <div className="mx-auto max-w-[1200px] space-y-6"><Link href={`/trackers?chain=${tracker.chain}`} className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-white"><ArrowLeft size={14} /> Back to trackers</Link><section className="terminal-card p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2"><p className="eyebrow">{tracker.chain === "base" ? "Base" : "Robinhood Chain"}</p><Badge tone={tracker.status === "active" ? "live" : "neutral"}>{tracker.status}</Badge></div><h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-white">{tracker.name}</h1><div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--muted)]"><span>{tracker.xUsername || "Account tracker"}</span>{tracker.walletAddress && <span className="font-mono">{truncateAddress(tracker.walletAddress)}</span>}</div></div><div className="text-right"><p className="text-[10px] text-[var(--muted)]">Notifications</p><p className="mt-1 text-xs text-white">{tracker.notificationsEnabled ? "On" : "Off"}</p></div></div></section><TrackerStats tracker={tracker} /><div className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]"><ActivityFeed activities={activities} />{activities[0] && <TokenActivityCard activity={activities[0]} />}</div><section className="terminal-card overflow-hidden"><div className="border-b border-white/[.08] px-5 py-4"><h2 className="text-sm font-semibold text-white">Activity table</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-xs"><thead className="text-[10px] uppercase tracking-[.12em] text-[var(--muted)]"><tr><th className="px-5 py-3 font-medium">Time</th><th className="px-5 py-3 font-medium">Type</th><th className="px-5 py-3 font-medium">Token</th><th className="px-5 py-3 font-medium">Amount</th><th className="px-5 py-3 font-medium">USD</th><th className="px-5 py-3 font-medium">Transaction</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity.id} className="border-t border-white/[.07] text-white"><td className="px-5 py-3 text-[var(--muted)]">{new Date(activity.timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</td><td className={activity.type === "BUY" ? "px-5 py-3 text-accent" : "px-5 py-3 text-red-300"}>{activity.type}</td><td className="px-5 py-3 font-semibold">${activity.token.symbol}</td><td className="px-5 py-3">{activity.amount}</td><td className="px-5 py-3">${activity.usdValue}</td><td className="px-5 py-3 font-mono text-[var(--muted)]">{truncateAddress(activity.transactionHash)}</td></tr>)}</tbody></table></div></section></div>
}
