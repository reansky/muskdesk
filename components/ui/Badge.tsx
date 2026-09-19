import { cn } from "@/lib/utils"

export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "live" | "blue" | "danger"; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium", tone === "live" && "border-accent/25 bg-accent/[.07] text-accent", tone === "blue" && "border-blue-400/25 bg-blue-500/[.1] text-blue-200", tone === "danger" && "border-red-400/25 bg-red-500/[.1] text-red-200", tone === "neutral" && "border-white/[.1] bg-white/[.04] text-[var(--muted)]", className)}>{children}</span>
}
