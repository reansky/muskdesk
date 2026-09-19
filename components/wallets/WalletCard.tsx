"use client"

import { ArrowUpRight, MoreHorizontal, ExternalLink } from "lucide-react"
import Link from "next/link"
import { chains } from "@/lib/chains"
import { formatCurrency, relativeTime, truncateAddress } from "@/lib/utils"
import type { WalletDTO } from "@/types"
import { Badge } from "@/components/ui/Badge"
import { CopyButton } from "@/components/ui/CopyButton"

export function WalletCard({ wallet }: { wallet: WalletDTO }) {
  const chain = chains[wallet.chain]
  return <article className="terminal-card p-4 transition hover:border-white/[.16]"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-bold ${wallet.chain === "base" ? "bg-blue-500 text-white" : "bg-accent text-ink"}`}>{wallet.chain === "base" ? "B" : "R"}</div><div><h3 className="text-sm font-semibold text-white">{wallet.name}</h3><div className="mt-1 flex items-center gap-2"><span className="font-mono text-[10px] text-[var(--muted)]">{truncateAddress(wallet.address)}</span><CopyButton value={wallet.address} /></div></div></div><button className="icon-button" aria-label="More actions"><MoreHorizontal size={16} /></button></div><div className="mt-6 grid grid-cols-2 gap-4"><div><p className="text-[10px] text-[var(--muted)]">Balance</p><p className="mt-1 text-lg font-semibold tracking-[-.04em] text-white">{wallet.balance} ETH</p><p className="mt-0.5 text-xs text-[var(--muted)]">{formatCurrency(wallet.usdValue)}</p></div><div><p className="text-[10px] text-[var(--muted)]">Last activity</p><p className="mt-2 text-xs text-white">{relativeTime(wallet.lastActivity)}</p><Badge className="mt-2" tone="live">{chain.shortName}</Badge></div></div><div className="surface-divider mt-5 flex items-center justify-between pt-3"><Link href={`/wallets/${wallet.id}?chain=${wallet.chain}`} className="flex items-center gap-1 text-xs font-medium text-white hover:text-accent">View wallet <ArrowUpRight size={13} /></Link>{chain.explorerUrl ? <a href={`${chain.explorerUrl}/address/${wallet.address}`} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-white" aria-label="Open explorer"><ExternalLink size={14} /></a> : null}</div></article>
}
