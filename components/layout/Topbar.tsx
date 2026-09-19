"use client"

import { Bell, Menu, Search, ChevronDown, LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { useChain } from "@/hooks/useChain"
import { useAppStore } from "@/stores/useAppStore"

export function Topbar() {
  const { chain, setChain } = useChain()
  const setOpen = useAppStore((state) => state.setSidebarOpen)
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const profile = session?.user
  return <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-white/[.08] bg-[#090a0d]/80 px-4 backdrop-blur-xl sm:px-7 lg:ml-60 lg:px-9">
    <button className="icon-button lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={18} /></button>
    <div className="hidden items-center gap-2 text-sm text-[var(--muted)] sm:flex"><Search size={15} /><input className="w-44 bg-transparent text-sm text-white outline-none placeholder:text-[var(--muted)]" placeholder="Search wallets..." /></div>
    <div className="ml-auto flex items-center gap-2.5">
      <label className="relative"><select aria-label="Select chain" value={chain} onChange={(event) => setChain(event.target.value as "base" | "robinhood")} className="h-9 appearance-none rounded-lg border border-white/[.1] bg-white/[.04] py-0 pl-3 pr-8 text-xs text-white outline-none"><option value="base">Base</option><option value="robinhood">Robinhood</option></select><ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-3 text-[var(--muted)]" /></label>
      <button className="icon-button relative" aria-label="Notifications"><Bell size={16} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" /></button>
      <div className="relative"><button onClick={() => setMenuOpen((value) => !value)} className="flex items-center gap-2 rounded-lg border border-white/[.09] bg-white/[.04] px-2 py-1.5"><span className="grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-accent text-[10px] font-bold text-ink">{profile?.avatarUrl ? <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" /> : "M"}</span><span className="hidden max-w-24 truncate text-xs text-white sm:block">@{profile?.username || "musedesk"}</span><ChevronDown size={13} className="text-[var(--muted)]" /></button>{menuOpen && <div className="absolute right-0 top-12 w-44 rounded-xl border border-white/[.1] bg-[#151820] p-1.5 shadow-terminal"><p className="truncate px-2 py-2 text-xs text-[var(--muted)]">{profile?.displayName || "Muse Desk"}</p>{profile && <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs text-white hover:bg-white/[.07]"><LogOut size={14} /> Sign out</button>}</div>}</div>
    </div>
  </header>
}
