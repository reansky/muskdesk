import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-user"
import { jsonError } from "@/lib/api"
import { isChainKey } from "@/lib/chains"
import { prisma } from "@/lib/prisma"
import { mockActivities } from "@/lib/mock-data"
import { serializeActivity } from "@/lib/serializers"

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const chain = new URL(request.url).searchParams.get("chain")
  const activities = await prisma.trackerActivity.findMany({ where: { tracker: { userId: user.id, ...(isChainKey(chain) ? { chain } : {}) } }, include: { token: true, tracker: true }, orderBy: { timestamp: "desc" }, take: 50 })
  if (!activities.length && process.env.ALLOW_DEMO === "true") return NextResponse.json({ activities: mockActivities.filter((activity) => !isChainKey(chain) || activity.chain === chain) })
  return NextResponse.json({ activities: activities.map(serializeActivity) })
}
