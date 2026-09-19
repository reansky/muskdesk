"use client"

import { Plus, WalletCards } from "lucide-react"
import { useState } from "react"
import { useChain } from "@/hooks/useChain"
import { useWallets } from "@/hooks/useApi"
import { WalletGrid } from "@/components/wallets/WalletGrid"
import { CreateWalletModal } from "@/components/wallets/CreateWalletModal"
import { PageSkeleton } from "@/components/ui/Loading"
import { Toast } from "@/components/ui/Toast"
import { chains } from "@/lib/chains"

export function WalletsPage() {
  const { chain } = useChain()
  const query = useWallets(chain)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState("")
  const config = chains[chain]
  return <div className="mx-auto max-w-[1380px] space-y-7"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{config.name} / Workspace</p><h1 className="page-title mt-2">Wallets</h1><p className="mt-2 text-sm text-[var(--muted)]">Manage your Musedesk wallets.</p></div><button className="primary-button" onClick={() => setModalOpen(true)}><Plus size={16} /> Create wallet</button></div><div className="grid gap-3 sm:grid-cols-3"><div className="terminal-card flex items-center gap-3 p-4"><div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/[.12] text-blue-200"><WalletCards size={17} /></div><div><p className="text-[10px] text-[var(--muted)]">Wallets on {config.shortName}</p><p className="mt-1 text-xl font-semibold text-white">{query.data?.wallets.length ?? "—"}</p></div></div><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">Native asset</p><p className="mt-2 text-xl font-semibold text-white">ETH</p><p className="mt-1 text-[10px] text-[var(--muted)]">Chain ID {config.chainId}</p></div><div className="terminal-card p-4"><p className="text-[10px] text-[var(--muted)]">Security</p><p className="mt-2 text-sm font-semibold text-accent">Encrypted at rest</p><p className="mt-1 text-[10px] text-[var(--muted)]">Private keys never listed</p></div></div>{query.isLoading ? <PageSkeleton /> : query.error ? <div className="terminal-card p-5 text-sm text-red-300">{query.error.message}</div> : <WalletGrid wallets={query.data?.wallets || []} />}<CreateWalletModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={() => setToast("Wallet created securely")} />{toast && <Toast message={toast} onClose={() => setToast("")} />}</div>
}
