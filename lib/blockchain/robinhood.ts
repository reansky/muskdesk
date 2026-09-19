import { getWalletBalance, getWalletTransactions, subscribeToWallet, unsubscribeFromWallet } from "@/lib/blockchain/tracker-service"

export const robinhood = {
  getWalletBalance: (address: string) => getWalletBalance("robinhood", address),
  getWalletTransactions: (address: string) => getWalletTransactions("robinhood", address),
  subscribeToWallet: (address: string) => subscribeToWallet("robinhood", address),
  unsubscribeFromWallet: (address: string) => unsubscribeFromWallet("robinhood", address),
}
