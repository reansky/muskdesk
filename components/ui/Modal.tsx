"use client"

import { X } from "lucide-react"

export function Modal({ open, onClose, title, description, children }: { open: boolean; onClose: () => void; title: string; description?: string; children: React.ReactNode }) {
  if (!open) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl border border-white/[.12] bg-[#151820] p-5 shadow-terminal" role="dialog" aria-modal="true"><div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="text-lg font-semibold tracking-[-.03em] text-white">{title}</h2>{description && <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{description}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={16} /></button></div>{children}</div></div>
}
