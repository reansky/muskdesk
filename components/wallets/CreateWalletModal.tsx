"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { useCreateWallet } from "@/hooks/useApi"
import type { ChainKey } from "@/types"

export function CreateWalletModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated?: () => void }) {
  const [name, setName] = useState("Musedesk Wallet")
  const [chain, setChain] = useState<ChainKey>("base")
  const mutation = useCreateWallet()
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    await mutation.mutateAsync({ name: name.trim() || "Musedesk Wallet", chain })
    onCreated?.()
    onClose()
  }
  return <Modal open={open} onClose={onClose} title="Create wallet" description="A new EVM wallet will be generated securely. Your private key is encrypted and never returned in normal API responses."><form onSubmit={submit} className="space-y-4"><label className="block"><span className="mb-1.5 block text-xs text-[var(--muted)]">Wallet name</span><input value={name} onChange={(event) => setName(event.target.value)} className="input-shell w-full" maxLength={40} required /></label><label className="block"><span className="mb-1.5 block text-xs text-[var(--muted)]">Chain</span><select value={chain} onChange={(event) => setChain(event.target.value as ChainKey)} className="input-shell w-full"><option value="base">Base</option><option value="robinhood">Robinhood Chain</option></select></label><div className="rounded-lg border border-accent/20 bg-accent/[.05] p-3 text-xs leading-5 text-[#d8f58f]">Back up your wallet after creation. Musedesk cannot recover a wallet if you lose its export credentials.</div>{mutation.error && <p className="text-xs text-red-300">{mutation.error.message}</p>}<button className="primary-button w-full" disabled={mutation.isPending}>{mutation.isPending ? "Generating..." : "Create wallet"}</button></form></Modal>
}
