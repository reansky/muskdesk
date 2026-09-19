import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth-user"
import { jsonError } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { mockActivities, mockTrackers } from "@/lib/mock-data"
import { serializeActivity, serializeTracker } from "@/lib/serializers"

const patchSchema = z.object({ name: z.string().trim().min(1).max(50).optional(), status: z.enum(["active", "paused"]).optional(), notificationsEnabled: z.boolean().optional() }).strict()

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const { id } = await context.params
  const tracker = await prisma.tracker.findFirst({ where: { id, userId: user.id }, include: { _count: { select: { activities: true } }, activities: { include: { token: true }, orderBy: { timestamp: "desc" }, take: 50 } } })
  if (tracker) return NextResponse.json({ tracker: serializeTracker(tracker), activities: tracker.activities.map((activity) => serializeActivity({ ...activity, tracker })) })
  if (process.env.ALLOW_DEMO === "true") {
    const mock = mockTrackers.find((item) => item.id === id)
    if (mock) return NextResponse.json({ tracker: mock, activities: mockActivities.filter((activity) => activity.trackerName === mock.name) })
  }
  return jsonError("Tracker not found", 404)
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const parsed = patchSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return jsonError("Invalid tracker input")
  const { id } = await context.params
  const tracker = await prisma.tracker.findFirst({ where: { id, userId: user.id } })
  if (!tracker) return jsonError("Tracker not found", 404)
  const updated = await prisma.tracker.update({ where: { id }, data: parsed.data })
  return NextResponse.json({ tracker: serializeTracker(updated) })
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const { id } = await context.params
  const tracker = await prisma.tracker.findFirst({ where: { id, userId: user.id } })
  if (!tracker) return jsonError("Tracker not found", 404)
  await prisma.tracker.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
