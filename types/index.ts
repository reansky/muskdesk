export type ChainKey = "base" | "robinhood"

export type WalletDTO = {
  id: string
  name: string
  address: string
  chain: ChainKey
  balance: string
  usdValue: string
  createdAt: string
  lastActivity: string | null
}

export type TrackerDTO = {
  id: string
  name: string
  walletAddress: string | null
  xUsername: string | null
  chain: ChainKey
  status: "active" | "paused"
  notificationsEnabled: boolean
  minimumTransactionValue: string
  createdAt: string
  lastActivity: string | null
  transactions: number
  buyVolume: string
  sellVolume: string
  pnl: string
}

export type ActivityDTO = {
  id: string
  type: "BUY" | "SELL"
  amount: string
  usdValue: string
  transactionHash: string
  timestamp: string
  trackerName: string
  token: {
    name: string
    symbol: string
    address: string
    price: string
    marketCap: string
    liquidity: string
    volume24h: string
  }
  chain: ChainKey
}
