"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import type { WalletDTO } from "@/types"
import { WalletDetails } from "@/components/wallets/WalletDetails"
import { PageSkeleton } from "@/components/ui/Loading"

export function WalletDetailPage({ id }: { id: string }) {
  const query = useQuery<{ wallet: WalletDTO }>({ queryKey: ["wallet", id], queryFn: async () => { const response = await fetch(`/api/wallets/${id}`); const body = await response.json(); if (!response.ok) throw new Error(body.error || "Wallet not found"); return body } })
  return <div className="mx-auto max-w-[1100px] space-y-6"><Link href="/wallets" className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-white"><ArrowLeft size={14} /> Back to wallets</Link>{query.isLoading ? <PageSkeleton /> : query.error ? <div className="terminal-card p-5 text-sm text-red-300">{query.error.message}</div> : query.data ? <WalletDetails wallet={query.data.wallet} /> : null}</div>
}
