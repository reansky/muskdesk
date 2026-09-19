"use client"

import { WalletCards, Radar } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
  const pathname = usePathname()
  return <nav className="fixed inset-x-3 bottom-3 z-20 grid grid-cols-2 rounded-2xl border border-white/[.1] bg-[#151820]/95 p-1.5 shadow-terminal backdrop-blur-xl lg:hidden"><Link href="/wallets" className={cn("flex h-11 items-center justify-center gap-2 rounded-xl text-xs text-[var(--muted)]", pathname.startsWith("/wallets") && "bg-white/[.08] text-white")}><WalletCards size={16} /> Wallets</Link><Link href="/trackers" className={cn("flex h-11 items-center justify-center gap-2 rounded-xl text-xs text-[var(--muted)]", pathname.startsWith("/trackers") && "bg-white/[.08] text-white")}><Radar size={16} /> Trackers</Link></nav>
}
