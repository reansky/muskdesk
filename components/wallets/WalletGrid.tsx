import type { WalletDTO } from "@/types"
import { WalletCard } from "@/components/wallets/WalletCard"
import { EmptyState } from "@/components/ui/EmptyState"

export function WalletGrid({ wallets }: { wallets: WalletDTO[] }) {
  if (!wallets.length) return <EmptyState title="No wallets on this chain" description="Create your first Musedesk wallet to start tracking balance and activity." />
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{wallets.map((wallet) => <WalletCard key={wallet.id} wallet={wallet} />)}</div>
}
