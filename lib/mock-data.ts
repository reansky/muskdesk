import type { ActivityDTO, ChainKey, TrackerDTO, WalletDTO } from "@/types"

const addresses = [
  "0x71F4A5C0D5A8F89D8E4B8E2E2A8E4C1F92F4A92F",
  "0x8B2D41C4E5A7A8D1B2F4C1A9E3D8B7C6A5F4E3D2",
  "0x9C1E22A41F7B4D8C6E5A3B2C1D0E9F8A7B6C5D4E",
  "0xA1B2C3D4E5F60718293A4B5C6D7E8F9012345678",
  "0xC4D5E6F708192A3B4C5D6E7F8091A2B3C4D5E6F7",
]

export const mockWallets: WalletDTO[] = addresses.map((address, index) => ({
  id: `mock-wallet-${index + 1}`,
  name: `Musedesk Wallet ${index + 1}`,
  address,
  chain: (index % 2 === 0 ? "base" : "robinhood") as ChainKey,
  balance: ["0.42", "1.18", "0.08", "3.74", "0.66"][index],
  usdValue: ["1,096.80", "3,068.00", "208.80", "9,724.00", "1,716.00"][index],
  createdAt: new Date(Date.now() - (index + 2) * 86_400_000).toISOString(),
  lastActivity: new Date(Date.now() - (index + 1) * 3_600_000).toISOString(),
}))

const trackerNames = ["Smart Money", "Early Base", "Signal Room", "Robin Watch", "MUSE Treasury", "Quiet Conviction"]

export const mockTrackers: TrackerDTO[] = trackerNames.map((name, index) => ({
  id: `mock-tracker-${index + 1}`,
  name,
  walletAddress: addresses[index % addresses.length],
  xUsername: ["@musealpha", "@based", "@signalroom", "@robinhoodapp", "@musedesk", "@quietconviction"][index],
  chain: (index % 2 === 0 ? "base" : "robinhood") as ChainKey,
  status: index === 4 ? "paused" : "active",
  notificationsEnabled: index !== 5,
  minimumTransactionValue: ["250", "500", "1000", "250", "5000", "100"][index],
  createdAt: new Date(Date.now() - (index + 1) * 2 * 86_400_000).toISOString(),
  lastActivity: new Date(Date.now() - (index + 1) * 12 * 60_000).toISOString(),
  transactions: [142, 86, 64, 51, 39, 28][index],
  buyVolume: ["18,420", "12,850", "9,642", "7,318", "44,210", "3,190"][index],
  sellVolume: ["12,350", "8,110", "5,224", "3,408", "32,920", "1,840"][index],
  pnl: ["+6,070", "+4,740", "+4,418", "+3,910", "+11,290", "+1,350"][index],
}))

const tokenSymbols = ["MUSE", "DOGEBOT", "BASE", "MORPHO", "AERO", "DEGEN", "RBN", "NOVA", "SPARK", "ZORA", "MINT", "GLOW", "ORBIT", "LENS", "WAVE"]

export const mockTokens = tokenSymbols.map((symbol, index) => ({
  id: `mock-token-${index + 1}`,
  chain: index % 2 === 0 ? "base" : "robinhood",
  address: `0x${(index + 1).toString(16).padStart(40, "0")}`,
  symbol,
  name: `${symbol} Protocol`,
  price: 0.12 + index / 10,
  marketCap: 840_000 + index * 125_000,
  liquidity: 140_000 + index * 24_000,
  volume24h: 42_000 + index * 8_300,
}))

export const mockActivities: ActivityDTO[] = Array.from({ length: 20 }, (_, index) => {
  const token = mockTokens[index % mockTokens.length]
  const tracker = mockTrackers[index % mockTrackers.length]
  const type: "BUY" | "SELL" = index % 3 === 0 ? "SELL" : "BUY"
  return {
    id: `mock-activity-${index + 1}`,
    type,
    amount: `${(0.2 + (index % 7) / 10).toFixed(2)} ETH`,
    usdValue: `${(180 + index * 63.4).toFixed(2)}`,
    transactionHash: `0x${(index + 24).toString(16).padStart(64, "0")}`,
    timestamp: new Date(Date.now() - index * 19 * 60_000).toISOString(),
    trackerName: tracker.name,
    token: {
      name: token.name,
      symbol: token.symbol,
      address: token.address,
      price: token.price.toFixed(3),
      marketCap: String(token.marketCap),
      liquidity: String(token.liquidity),
      volume24h: String(token.volume24h),
    },
    chain: tracker.chain as ChainKey,
  }
})
