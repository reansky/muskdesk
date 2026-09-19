import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-user"
import { jsonError } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { decryptSecret } from "@/lib/crypto"

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const body = await request.json().catch(() => null) as { confirmation?: string } | null
  if (body?.confirmation !== "EXPORT") return jsonError("Explicit EXPORT confirmation required")
  const { id } = await context.params
  const wallet = await prisma.wallet.findFirst({ where: { id, userId: user.id } })
  if (!wallet) return jsonError("Wallet not found", 404)
  return NextResponse.json({ privateKey: decryptSecret(wallet.encryptedPrivateKey) }, { headers: { "cache-control": "no-store" } })
}
