import { WalletDetailPage } from "@/components/wallets/WalletDetailPage"

export default async function WalletDetailRoute({ params }: { params: Promise<{ id: string }> }) { return <WalletDetailPage id={(await params).id} /> }
