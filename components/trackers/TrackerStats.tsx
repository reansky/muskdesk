import type { TrackerDTO } from "@/types"

export function TrackerStats({ tracker }: { tracker: TrackerDTO }) {
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">Transactions</p><p className="mt-2 text-2xl font-semibold text-white">{tracker.transactions}</p></div><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">Buy volume</p><p className="mt-2 text-2xl font-semibold text-white">${tracker.buyVolume}</p></div><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">Sell volume</p><p className="mt-2 text-2xl font-semibold text-white">${tracker.sellVolume}</p></div><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">PnL</p><p className="mt-2 text-2xl font-semibold text-accent">+${tracker.pnl.replace("+", "")}</p></div></div>
}
