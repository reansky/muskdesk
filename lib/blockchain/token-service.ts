import type { ChainKey } from "@/types"

export type TokenMetadata = {
  address: string
  symbol: string
  name: string
  price: number
  marketCap: number
  liquidity: number
  volume24h: number
}

export async function getTokenMetadata(chain: ChainKey, address: string): Promise<TokenMetadata> {
  const seed = [...address].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return {
    address,
    symbol: chain === "base" ? "MUSE" : "RBN",
    name: chain === "base" ? "Muse Protocol" : "Robin Signal",
    price: Number((0.12 + (seed % 90) / 100).toFixed(4)),
    marketCap: 850000 + seed * 100,
    liquidity: 160000 + seed * 20,
    volume24h: 43000 + seed * 50,
  }
}
