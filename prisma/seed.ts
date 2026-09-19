import { PrismaClient } from "@prisma/client"
import { createEncryptedWallet } from "../lib/wallet/create-wallet"
import { mockActivities, mockTokens, mockTrackers } from "../lib/mock-data"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { id: "demo-user" },
    update: {},
    create: { id: "demo-user", xId: "demo-x-user", username: "musedesk", displayName: "Muse Desk", avatarUrl: "/assets/musedesk-logo.png" },
  })

  await prisma.trackerActivity.deleteMany({ where: { tracker: { userId: user.id } } })
  await prisma.tracker.deleteMany({ where: { userId: user.id } })
  await prisma.wallet.deleteMany({ where: { userId: user.id } })
  await prisma.token.deleteMany({})

  const tokens = []
  for (const token of mockTokens) {
    tokens.push(await prisma.token.create({ data: { ...token, price: token.price, marketCap: token.marketCap, liquidity: token.liquidity, volume24h: token.volume24h } }))
  }

  for (let index = 0; index < 5; index += 1) {
    const wallet = createEncryptedWallet()
    await prisma.wallet.create({ data: { userId: user.id, name: `Musedesk Wallet ${index + 1}`, address: wallet.address, chain: index % 2 === 0 ? "base" : "robinhood", encryptedPrivateKey: wallet.encryptedPrivateKey } })
  }

  const trackers = []
  for (let index = 0; index < mockTrackers.length; index += 1) {
    const source = mockTrackers[index]
    const tracker = await prisma.tracker.create({ data: { userId: user.id, name: source.name, walletAddress: source.walletAddress, xUsername: source.xUsername, chain: source.chain, status: source.status, notificationsEnabled: source.notificationsEnabled, minimumTransactionValue: Number(source.minimumTransactionValue) } })
    trackers.push(tracker)
  }

  for (let index = 0; index < mockActivities.length; index += 1) {
    const activity = mockActivities[index]
    const token = tokens[index % tokens.length]
    const tracker = trackers[index % trackers.length]
    await prisma.trackerActivity.create({ data: { trackerId: tracker.id, tokenId: token.id, type: activity.type, amount: activity.amount, usdValue: Number(activity.usdValue), transactionHash: activity.transactionHash, timestamp: new Date(activity.timestamp) } })
  }
}

main().finally(() => prisma.$disconnect())
