import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import type { ActivityDTO } from "@/types"
import { Badge } from "@/components/ui/Badge"
import { relativeTime, truncateAddress } from "@/lib/utils"

export function ActivityItem({ activity }: { activity: ActivityDTO }) {
  const buy = activity.type === "BUY"
  return <div className="flex items-center gap-3 border-t border-white/[.08] py-3 first:border-t-0"><div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${buy ? "bg-accent/[.1] text-accent" : "bg-red-400/[.1] text-red-300"}`}>{buy ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}</div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className={`text-[10px] font-bold ${buy ? "text-accent" : "text-red-300"}`}>{activity.type}</span><span className="truncate text-xs font-semibold text-white">${activity.token.symbol}</span><Badge tone="neutral">{activity.chain === "base" ? "BASE" : "RBH"}</Badge></div><p className="mt-1 truncate text-[10px] text-[var(--muted)]">{activity.trackerName} · {truncateAddress(activity.transactionHash)}</p></div><div className="text-right"><p className="text-xs font-semibold text-white">{activity.amount}</p><p className="mt-1 text-[10px] text-[var(--muted)]">${activity.usdValue} · {relativeTime(activity.timestamp)}</p></div></div>
}
