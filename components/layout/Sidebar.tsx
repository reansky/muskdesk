"use client"

import { WalletCards, Radar, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppStore } from "@/stores/useAppStore"
import { cn } from "@/lib/utils"

const items = [
  { href: "/wallets", label: "Wallets", icon: WalletCards },
  { href: "/trackers", label: "Trackers", icon: Radar },
]

export function Sidebar() {
  const pathname = usePathname()
  const open = useAppStore((state) => state.sidebarOpen)
  const setOpen = useAppStore((state) => state.setSidebarOpen)
  return <>
    <aside className={cn("fixed inset-y-0 left-0 z-30 w-60 border-r border-white/[.08] bg-[#0d0f13]/95 px-4 py-5 backdrop-blur-xl transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex items-center justify-between px-2">
        <Link href="/wallets" className="flex items-center gap-2.5 font-bold tracking-[-.04em] text-white"><span className="h-8 w-8 overflow-hidden rounded-[10px] bg-accent shadow-[0_0_24px_rgba(200,255,68,.2)]"><img src="/assets/musedesk-logo.png" alt="" className="h-full w-full object-cover object-[50%_30%]" /></span><span>muse<span className="text-accent">desk</span></span></Link>
        <button className="icon-button lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X size={16} /></button>
      </div>
      <p className="mb-3 mt-12 px-2 text-[10px] font-bold uppercase tracking-[.16em] text-[var(--muted)]">Workspace</p>
      <nav className="space-y-1" aria-label="Main navigation">
        {items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} className={cn("flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-[var(--muted)] transition hover:bg-white/[.05] hover:text-white", pathname.startsWith(href) && "bg-white/[.07] text-white") }><Icon size={17} strokeWidth={1.8} /><span>{label}</span></Link>)}
      </nav>
      <div className="absolute bottom-5 left-4 right-4 rounded-xl border border-white/[.08] bg-white/[.025] p-3">
        <div className="flex items-center gap-2.5"><div className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-accent text-xs font-bold text-ink"><img src="/assets/musedesk-logo.png" alt="" className="h-full w-full object-cover" /></div><div className="min-w-0"><p className="truncate text-xs font-semibold text-white">@musedesk</p><p className="truncate text-[10px] text-[var(--muted)]">X profile</p></div></div>
      </div>
    </aside>
    {open && <button aria-label="Close menu" className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
  </>
}
