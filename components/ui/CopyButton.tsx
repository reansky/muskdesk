"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1400) }
  return <button className="icon-button" onClick={copy} aria-label="Copy"><span className="sr-only">Copy</span>{copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}</button>
}
