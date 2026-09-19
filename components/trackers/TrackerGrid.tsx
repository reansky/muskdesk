import type { TrackerDTO } from "@/types"
import { TrackerCard } from "@/components/trackers/TrackerCard"
import { EmptyState } from "@/components/ui/EmptyState"

export function TrackerGrid({ trackers }: { trackers: TrackerDTO[] }) {
  if (!trackers.length) return <EmptyState title="No trackers on this chain" description="Add a wallet or X account to start monitoring onchain activity." />
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{trackers.map((tracker) => <TrackerCard key={tracker.id} tracker={tracker} />)}</div>
}
