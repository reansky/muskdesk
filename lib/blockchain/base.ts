import { getWalletBalance, getWalletTransactions, subscribeToWallet, unsubscribeFromWallet } from "@/lib/blockchain/tracker-service"

export const base = {
  getWalletBalance: (address: string) => getWalletBalance("base", address),
  getWalletTransactions: (address: string) => getWalletTransactions("base", address),
  subscribeToWallet: (address: string) => subscribeToWallet("base", address),
  unsubscribeFromWallet: (address: string) => unsubscribeFromWallet("base", address),
}
