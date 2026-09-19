"use client"

import { ArrowUpRight, Bell, MoreHorizontal, Pause, Pencil, Play, Trash2 } from "lucide-react"
import Link from "next/link"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import type { TrackerDTO } from "@/types"
import { chains } from "@/lib/chains"
import { relativeTime, truncateAddress } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"

export function TrackerCard({ tracker }: { tracker: TrackerDTO }) {
  const queryClient = useQueryClient()
  const [busy, setBusy] = useState(false)
  const chain = chains[tracker.chain]
  async function update(action: "pause" | "delete") {
    if (action === "delete" && !window.confirm(`Delete ${tracker.name}?`)) return
    setBusy(true)
    await fetch(`/api/trackers/${tracker.id}`, { method: action === "delete" ? "DELETE" : "PATCH", headers: { "content-type": "application/json" }, body: action === "delete" ? undefined : JSON.stringify({ status: tracker.status === "active" ? "paused" : "active" }) })
    await queryClient.invalidateQueries({ queryKey: ["trackers"] })
    setBusy(false)
  }
  async function edit() {
    const name = window.prompt("Tracker name", tracker.name)?.trim()
    if (!name || name === tracker.name) return
    setBusy(true)
    await fetch(`/api/trackers/${tracker.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ name }) })
    await queryClient.invalidateQueries({ queryKey: ["trackers"] })
    setBusy(false)
  }
  return <article className="terminal-card p-4 transition hover:border-white/[.16]"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold ${tracker.chain === "base" ? "bg-blue-500 text-white" : "bg-accent text-ink"}`}>{tracker.chain === "base" ? "B" : "R"}</div><div className="min-w-0"><h3 className="truncate text-sm font-semibold text-white">{tracker.name}</h3><p className="mt-1 truncate text-xs text-[var(--muted)]">{tracker.xUsername || (tracker.walletAddress ? truncateAddress(tracker.walletAddress) : "Account tracker")}</p></div></div><div className="flex items-center gap-1"><Badge tone={tracker.status === "active" ? "live" : "neutral"}>{tracker.status === "active" ? "LIVE" : "PAUSED"}</Badge><button className="icon-button" aria-label="More actions"><MoreHorizontal size={15} /></button></div></div><div className="mt-5 grid grid-cols-2 gap-4"><div><p className="text-[10px] text-[var(--muted)]">Last activity</p><p className="mt-1 text-xs text-white">{relativeTime(tracker.lastActivity)}</p></div><div><p className="text-[10px] text-[var(--muted)]">Transactions</p><p className="mt-1 text-sm font-semibold text-white">{tracker.transactions}</p></div></div><div className="mt-5 grid grid-cols-3 gap-2 rounded-lg bg-white/[.03] p-3"><div><p className="text-[10px] text-[var(--muted)]">Buy</p><p className="mt-1 text-xs font-semibold text-white">${tracker.buyVolume}</p></div><div><p className="text-[10px] text-[var(--muted)]">Sell</p><p className="mt-1 text-xs font-semibold text-white">${tracker.sellVolume}</p></div><div><p className="text-[10px] text-[var(--muted)]">PnL</p><p className="mt-1 text-xs font-semibold text-accent">+${tracker.pnl.replace("+", "")}</p></div></div><div className="surface-divider mt-4 flex items-center justify-between pt-3"><Link href={`/trackers/${tracker.id}?chain=${tracker.chain}`} className="flex items-center gap-1 text-xs font-medium text-white hover:text-accent">View <ArrowUpRight size={13} /></Link><div className="flex items-center gap-1"><button className="icon-button h-8 w-8" onClick={edit} disabled={busy} aria-label="Edit tracker"><Pencil size={13} /></button><button className="icon-button h-8 w-8" onClick={() => update("pause")} disabled={busy} aria-label={tracker.status === "active" ? "Pause tracker" : "Resume tracker"}>{tracker.status === "active" ? <Pause size={13} /> : <Play size={13} />}</button><button className="icon-button h-8 w-8" onClick={() => update("delete")} disabled={busy} aria-label="Delete tracker"><Trash2 size={13} /></button>{tracker.notificationsEnabled && <Bell size={13} className="ml-2 text-accent" />}</div></div></article>
}
