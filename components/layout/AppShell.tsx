"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { MobileNavigation } from "@/components/layout/MobileNavigation"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === "/login") return <>{children}</>
  return <><Sidebar /><Topbar /><main className="min-h-[calc(100vh-72px)] px-4 pb-24 pt-6 sm:px-7 lg:ml-60 lg:px-9 lg:pb-10">{children}</main><MobileNavigation /></>
}
