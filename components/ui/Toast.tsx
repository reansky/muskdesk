"use client"

import { CheckCircle2, X } from "lucide-react"

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-2 rounded-xl border border-accent/25 bg-[#151820] px-3 py-2.5 text-xs text-white shadow-terminal"><CheckCircle2 size={15} className="text-accent" />{message}<button className="ml-2 text-[var(--muted)] hover:text-white" onClick={onClose}><X size={14} /></button></div>
}
