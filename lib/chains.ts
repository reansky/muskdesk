import type { ChainKey } from "@/types"

export type ChainConfig = {
  key: ChainKey
  name: string
  shortName: string
  chainId: number
  nativeToken: "ETH"
  rpcUrl: string | undefined
  explorerUrl: string | undefined
}

export const chains: Record<ChainKey, ChainConfig> = {
  base: {
    key: "base",
    name: "Base",
    shortName: "BASE",
    chainId: 8453,
    nativeToken: "ETH",
    rpcUrl: process.env.BASE_RPC_URL || undefined,
    explorerUrl: process.env.BASE_EXPLORER_URL || undefined,
  },
  robinhood: {
    key: "robinhood",
    name: "Robinhood Chain",
    shortName: "RBH",
    chainId: 4663,
    nativeToken: "ETH",
    rpcUrl: process.env.ROBINHOOD_RPC_URL || undefined,
    explorerUrl: process.env.ROBINHOOD_EXPLORER_URL || undefined,
  },
}

export function isChainKey(value: string | null | undefined): value is ChainKey {
  return value === "base" || value === "robinhood"
}

export function getChain(value: string | null | undefined): ChainConfig {
  return chains[isChainKey(value) ? value : "base"]
}
