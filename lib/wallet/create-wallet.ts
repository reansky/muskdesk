import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { encryptSecret } from "@/lib/crypto"

export function createEncryptedWallet() {
  const privateKey = generatePrivateKey()
  const account = privateKeyToAccount(privateKey)
  return {
    address: account.address,
    encryptedPrivateKey: encryptSecret(privateKey),
  }
}
