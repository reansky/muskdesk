"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { isChainKey } from "@/lib/chains"
import { useAppStore } from "@/stores/useAppStore"
import type { ChainKey } from "@/types"

export function useChain() {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const chain = isChainKey(params.get("chain")) ? (params.get("chain") as ChainKey) : "base"
  const setStoreChain = useAppStore((state) => state.setChain)

  useEffect(() => setStoreChain(chain), [chain, setStoreChain])

  function setChain(next: ChainKey) {
    const query = new URLSearchParams(params.toString())
    query.set("chain", next)
    router.push(`${pathname}?${query.toString()}`)
  }

  return { chain, setChain }
}
