import { TrackerDetailPage } from "@/components/trackers/TrackerDetailPage"

export default async function TrackerDetailRoute({ params }: { params: Promise<{ id: string }> }) { return <TrackerDetailPage id={(await params).id} /> }
