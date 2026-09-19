import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/Providers"
import { AppShell } from "@/components/layout/AppShell"

export const metadata: Metadata = {
  title: "Musedesk — Your onchain desk",
  description: "Track wallets and activity across Base and Robinhood Chain.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers><AppShell>{children}</AppShell></Providers></body></html>
}
