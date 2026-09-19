import { getWalletBalance } from "@/lib/blockchain/tracker-service"
import { formatCurrency } from "@/lib/utils"
import type { ActivityDTO, ChainKey, TrackerDTO, WalletDTO } from "@/types"

export async function serializeWallet(wallet: { id: string; name: string; address: string; chain: string; createdAt: Date; updatedAt: Date }): Promise<WalletDTO> {
  const chain = wallet.chain as ChainKey
  let balance = 0
  try { balance = (await getWalletBalance(chain, wallet.address)).amount } catch (_) { balance = 0 }
  return { id: wallet.id, name: wallet.name, address: wallet.address, chain, balance: balance.toFixed(2), usdValue: formatCurrency(balance * 2600).replace("$", ""), createdAt: wallet.createdAt.toISOString(), lastActivity: wallet.updatedAt.toISOString() }
}

export function serializeTracker(tracker: { id: string; name: string; walletAddress: string | null; xUsername: string | null; chain: string; status: string; notificationsEnabled: boolean; minimumTransactionValue: unknown; createdAt: Date; updatedAt: Date; _count?: { activities: number }; activities?: { type: string; usdValue: unknown }[] }): TrackerDTO {
  const buyVolume = tracker.activities?.filter((activity) => activity.type === "BUY").reduce((total, activity) => total + Number(activity.usdValue), 0) || 0
  const sellVolume = tracker.activities?.filter((activity) => activity.type === "SELL").reduce((total, activity) => total + Number(activity.usdValue), 0) || 0
  const money = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 0 })
  return { id: tracker.id, name: tracker.name, walletAddress: tracker.walletAddress, xUsername: tracker.xUsername, chain: tracker.chain as ChainKey, status: tracker.status === "paused" ? "paused" : "active", notificationsEnabled: tracker.notificationsEnabled, minimumTransactionValue: String(tracker.minimumTransactionValue ?? "0"), createdAt: tracker.createdAt.toISOString(), lastActivity: tracker.updatedAt.toISOString(), transactions: tracker._count?.activities ?? tracker.activities?.length ?? 0, buyVolume: money(buyVolume), sellVolume: money(sellVolume), pnl: money(buyVolume - sellVolume) }
}

export function serializeActivity(activity: { id: string; type: string; amount: string; usdValue: unknown; transactionHash: string; timestamp: Date; tracker: { name: string; chain: string }; token: { name: string; symbol: string; address: string; price: unknown; marketCap: unknown; liquidity: unknown; volume24h: unknown } | null }): ActivityDTO {
  const token = activity.token || { name: "Unknown token", symbol: "TOKEN", address: "0x", price: 0, marketCap: 0, liquidity: 0, volume24h: 0 }
  return { id: activity.id, type: activity.type === "SELL" ? "SELL" : "BUY", amount: activity.amount, usdValue: String(activity.usdValue), transactionHash: activity.transactionHash, timestamp: activity.timestamp.toISOString(), trackerName: activity.tracker.name, chain: activity.tracker.chain as ChainKey, token: { name: token.name, symbol: token.symbol, address: token.address, price: String(token.price), marketCap: String(token.marketCap), liquidity: String(token.liquidity), volume24h: String(token.volume24h) } }
}
