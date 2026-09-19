import { createPublicClient, http, type Address } from "viem"
import { chains } from "@/lib/chains"
import type { ChainKey } from "@/types"

export type WalletTransaction = {
  hash: string
  type: "BUY" | "SELL"
  amount: string
  usdValue: string
  timestamp: string
}

function mockNumber(address: string, salt: string) {
  const value = [...`${address}:${salt}`].reduce((sum, character) => sum + character.charCodeAt(0), 0)
  return (value % 87) / 100 + 0.12
}

export async function getWalletBalance(chainKey: ChainKey, address: string) {
  const chain = chains[chainKey]
  if (chain.rpcUrl) {
    const client = createPublicClient({ transport: http(chain.rpcUrl) })
    const balance = await client.getBalance({ address: address as Address })
    return { amount: Number(balance) / 1e18, source: "rpc" as const }
  }
  return { amount: mockNumber(address, chainKey), source: "mock" as const }
}

export async function getWalletTransactions(chainKey: ChainKey, address: string): Promise<WalletTransaction[]> {
  const base = mockNumber(address, chainKey)
  return Array.from({ length: 4 }, (_, index) => ({
    hash: `0x${address.slice(2, 10)}${index.toString(16).padStart(56, "0")}`,
    type: index % 2 === 0 ? "BUY" : "SELL",
    amount: `${(base + index / 10).toFixed(2)} ETH`,
    usdValue: `$${Math.round((base + index / 10) * 2600).toLocaleString()}`,
    timestamp: new Date(Date.now() - index * 3600_000).toISOString(),
  }))
}

export async function subscribeToWallet(_chainKey: ChainKey, _address: string) {
  return { subscribed: true }
}

export async function unsubscribeFromWallet(_chainKey: ChainKey, _address: string) {
  return { subscribed: false }
}
