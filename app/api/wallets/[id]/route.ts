import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth-user"
import { jsonError } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { serializeWallet } from "@/lib/serializers"
import { mockWallets } from "@/lib/mock-data"

const patchSchema = z.object({ name: z.string().trim().min(1).max(40) }).strict()

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const { id } = await context.params
  const wallet = await prisma.wallet.findFirst({ where: { id, userId: user.id } })
  if (wallet) return NextResponse.json({ wallet: await serializeWallet(wallet) })
  const mock = process.env.ALLOW_DEMO === "true" ? mockWallets.find((item) => item.id === id) : null
  return mock ? NextResponse.json({ wallet: mock }) : jsonError("Wallet not found", 404)
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const parsed = patchSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return jsonError("Invalid wallet input")
  const { id } = await context.params
  const wallet = await prisma.wallet.findFirst({ where: { id, userId: user.id } })
  if (!wallet) return jsonError("Wallet not found", 404)
  const updated = await prisma.wallet.update({ where: { id }, data: { name: parsed.data.name } })
  return NextResponse.json({ wallet: await serializeWallet(updated) })
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const { id } = await context.params
  const wallet = await prisma.wallet.findFirst({ where: { id, userId: user.id } })
  if (!wallet) return jsonError("Wallet not found", 404)
  await prisma.wallet.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
