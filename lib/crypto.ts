import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto"

function getEncryptionKey() {
  const configured = process.env.WALLET_ENCRYPTION_KEY
  if (configured && /^[0-9a-f]{64}$/i.test(configured)) return Buffer.from(configured, "hex")
  if (process.env.NODE_ENV === "production") throw new Error("WALLET_ENCRYPTION_KEY must be a 32-byte hex key")
  return createHash("sha256").update(process.env.AUTH_SECRET || "musedesk-local-development-key").digest()
}

export function encryptSecret(value: string) {
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv)
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()
  return `v1:${iv.toString("hex")}:${tag.toString("hex")}:${ciphertext.toString("hex")}`
}

export function decryptSecret(payload: string) {
  const [version, ivHex, tagHex, ciphertextHex] = payload.split(":")
  if (version !== "v1" || !ivHex || !tagHex || !ciphertextHex) throw new Error("Invalid encrypted secret")
  const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(ivHex, "hex"))
  decipher.setAuthTag(Buffer.from(tagHex, "hex"))
  return Buffer.concat([decipher.update(Buffer.from(ciphertextHex, "hex")), decipher.final()]).toString("utf8")
}
