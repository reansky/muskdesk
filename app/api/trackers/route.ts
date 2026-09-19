import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth-user"
import { jsonError } from "@/lib/api"
import { isChainKey } from "@/lib/chains"
import { prisma } from "@/lib/prisma"
import { mockTrackers } from "@/lib/mock-data"
import { serializeTracker } from "@/lib/serializers"

const inputSchema = z.object({
  name: z.string().trim().min(1).max(50),
  walletAddress: z.union([z.string().trim().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM wallet address"), z.literal("")]).optional(),
  xUsername: z.union([z.string().trim().regex(/^@?[a-zA-Z0-9_]{1,15}$/, "Invalid X username"), z.literal("")]).optional(),
  chain: z.string().refine(isChainKey, "Unsupported chain"),
  notificationsEnabled: z.boolean().default(true),
  minimumTransactionValue: z.coerce.number().min(0).max(1_000_000).default(0),
}).refine((input) => Boolean(input.walletAddress || input.xUsername), "Add a wallet address or X username")

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const chain = new URL(request.url).searchParams.get("chain")
  const trackers = await prisma.tracker.findMany({ where: { userId: user.id, ...(isChainKey(chain) ? { chain } : {}) }, include: { _count: { select: { activities: true } }, activities: { select: { type: true, usdValue: true }, take: 200 } }, orderBy: { updatedAt: "desc" } })
  if (!trackers.length && process.env.ALLOW_DEMO === "true") return NextResponse.json({ trackers: mockTrackers.filter((tracker) => !isChainKey(chain) || tracker.chain === chain) })
  return NextResponse.json({ trackers: trackers.map(serializeTracker) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const parsed = inputSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message || "Invalid tracker input")
  const tracker = await prisma.tracker.create({ data: { userId: user.id, name: parsed.data.name, walletAddress: parsed.data.walletAddress || null, xUsername: parsed.data.xUsername || null, chain: parsed.data.chain, notificationsEnabled: parsed.data.notificationsEnabled, minimumTransactionValue: parsed.data.minimumTransactionValue } })
  return NextResponse.json({ tracker: serializeTracker(tracker) }, { status: 201 })
}
