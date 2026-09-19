import { Inbox } from "lucide-react"

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="grid min-h-56 place-items-center rounded-xl border border-dashed border-white/[.12] bg-white/[.015] p-8 text-center"><div><div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-white/[.06] text-[var(--muted)]"><Inbox size={18} /></div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[var(--muted)]">{description}</p>{action && <div className="mt-4">{action}</div>}</div></div>
}
