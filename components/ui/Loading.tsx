export function Skeleton({ className = "" }: { className?: string }) { return <div className={`animate-pulse rounded-lg bg-white/[.06] ${className}`} /> }

export function PageSkeleton() {
  return <div className="space-y-6"><Skeleton className="h-10 w-56" /><Skeleton className="h-4 w-80" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><Skeleton className="h-44" /><Skeleton className="h-44" /><Skeleton className="h-44" /></div></div>
}
