import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  if (session?.user?.id) return prisma.user.findUnique({ where: { id: session.user.id } })
  if (process.env.ALLOW_DEMO !== "true") return null
  return prisma.user.upsert({
    where: { id: "demo-user" },
    update: {},
    create: {
      id: "demo-user",
      xId: "demo-x-user",
      username: "musedesk",
      displayName: "Muse Desk",
      avatarUrl: "/assets/musedesk-logo.png",
    },
  })
}
