import type { ActivityDTO } from "@/types"
import { ActivityItem } from "@/components/trackers/ActivityItem"
import { EmptyState } from "@/components/ui/EmptyState"

export function ActivityFeed({ activities }: { activities: ActivityDTO[] }) {
  if (!activities.length) return <EmptyState title="No recent activity" description="Activity will appear here when a tracked account moves." />
  return <div className="terminal-card p-4"><div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Activity feed</h2><span className="text-[10px] text-[var(--muted)]">Latest signals</span></div>{activities.slice(0, 8).map((activity) => <ActivityItem key={activity.id} activity={activity} />)}</div>
}
