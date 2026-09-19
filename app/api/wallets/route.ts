import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth-user"
import { jsonError } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { isChainKey } from "@/lib/chains"
import { createEncryptedWallet } from "@/lib/wallet/create-wallet"
import { serializeWallet } from "@/lib/serializers"
import { mockWallets } from "@/lib/mock-data"

const inputSchema = z.object({ name: z.string().trim().min(1).max(40), chain: z.string().refine(isChainKey, "Unsupported chain") })

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const chain = new URL(request.url).searchParams.get("chain")
  const wallets = await prisma.wallet.findMany({ where: { userId: user.id, ...(isChainKey(chain) ? { chain } : {}) }, orderBy: { createdAt: "desc" } })
  if (!wallets.length && process.env.ALLOW_DEMO === "true") return NextResponse.json({ wallets: mockWallets.filter((wallet) => !isChainKey(chain) || wallet.chain === chain) })
  return NextResponse.json({ wallets: await Promise.all(wallets.map(serializeWallet)) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return jsonError("Authentication required", 401)
  const parsed = inputSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message || "Invalid wallet input")
  const generated = createEncryptedWallet()
  const wallet = await prisma.wallet.create({ data: { userId: user.id, name: parsed.data.name, chain: parsed.data.chain, address: generated.address, encryptedPrivateKey: generated.encryptedPrivateKey } })
  return NextResponse.json({ wallet: await serializeWallet(wallet) }, { status: 201 })
}
