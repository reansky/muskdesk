"use client"

import { Download, ExternalLink, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { chains } from "@/lib/chains"
import { CopyButton } from "@/components/ui/CopyButton"
import { Badge } from "@/components/ui/Badge"
import { truncateAddress } from "@/lib/utils"
import type { WalletDTO } from "@/types"
import { TokenBalances } from "@/components/wallets/TokenBalances"
import { TransactionList } from "@/components/wallets/TransactionList"

export function WalletDetails({ wallet }: { wallet: WalletDTO }) {
  const chain = chains[wallet.chain]
  const router = useRouter()
  const [name, setName] = useState(wallet.name)
  const [exportedKey, setExportedKey] = useState("")
  const [busy, setBusy] = useState(false)
  async function rename() { const next = window.prompt("Wallet name", name)?.trim(); if (!next || next === name) return; await fetch(`/api/wallets/${wallet.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: next }) }); setName(next) }
  async function remove() { if (!window.confirm("Delete this wallet? This cannot be undone.")) return; await fetch(`/api/wallets/${wallet.id}`, { method: "DELETE" }); router.push("/wallets") }
  async function exportWallet() { if (window.prompt("Type EXPORT to reveal the private key once") !== "EXPORT") return; setBusy(true); const response = await fetch(`/api/wallets/${wallet.id}/export`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ confirmation: "EXPORT" }) }); const body = await response.json(); setBusy(false); if (response.ok) setExportedKey(body.privateKey) }
  return <div className="space-y-5"><section className="terminal-card p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-center gap-3"><div className={`grid h-12 w-12 place-items-center rounded-xl text-lg font-bold ${wallet.chain === "base" ? "bg-blue-500 text-white" : "bg-accent text-ink"}`}>{wallet.chain === "base" ? "B" : "R"}</div><div><p className="eyebrow">{chain.name}</p><h1 className="mt-1 text-xl font-semibold text-white">{name}</h1><div className="mt-2 flex items-center gap-2 font-mono text-xs text-[var(--muted)]">{truncateAddress(wallet.address)}<CopyButton value={wallet.address} /></div></div></div><div className="flex flex-wrap gap-2">{chain.explorerUrl && <a className="secondary-button" href={`${chain.explorerUrl}/address/${wallet.address}`} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Explorer</a>}<button className="secondary-button" onClick={rename}><Pencil size={14} /> Rename</button><button className="secondary-button" onClick={exportWallet} disabled={busy}><Download size={14} /> {busy ? "Preparing..." : "Export"}</button><button className="icon-button text-red-300" onClick={remove} aria-label="Delete wallet"><Trash2 size={15} /></button><Badge tone="live">LIVE</Badge></div></div><div className="mt-7 grid gap-4 sm:grid-cols-3"><div><p className="text-xs text-[var(--muted)]">Native balance</p><p className="mt-1 text-2xl font-semibold text-white">{wallet.balance} ETH</p></div><div><p className="text-xs text-[var(--muted)]">Estimated value</p><p className="mt-1 text-2xl font-semibold text-white">${wallet.usdValue}</p></div><div><p className="text-xs text-[var(--muted)]">Last activity</p><p className="mt-2 text-sm text-white">{wallet.lastActivity ? new Date(wallet.lastActivity).toLocaleString() : "No activity"}</p></div></div>{exportedKey && <div className="mt-5 rounded-lg border border-red-400/30 bg-red-400/[.06] p-3"><p className="text-xs font-semibold text-red-200">Private key revealed once. Never share it.</p><p className="mt-2 break-all font-mono text-[11px] text-red-100">{exportedKey}</p><div className="mt-2"><CopyButton value={exportedKey} /></div></div>}</section><TransactionList /><TokenBalances /></div>
}
