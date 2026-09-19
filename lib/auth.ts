import type { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import { prisma } from "@/lib/prisma"

type XProfile = {
  data?: { id?: string; username?: string; name?: string; profile_image_url?: string }
  id?: string
  username?: string
  name?: string
  profile_image_url?: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.X_CLIENT_ID || "",
      clientSecret: process.env.X_CLIENT_SECRET || "",
      version: "2.0",
      checks: ["pkce", "state"],
      authorization: {
        params: {
          scope: "users.read",
          ...(process.env.X_REDIRECT_URI ? { redirect_uri: process.env.X_REDIRECT_URI } : {}),
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ profile }) {
      const x = (profile || {}) as XProfile
      const data = x.data || x
      const xId = data.id
      if (!xId) return false
      await prisma.user.upsert({
        where: { xId },
        update: {
          username: data.username || "unknown",
          displayName: data.name || data.username || "X user",
          avatarUrl: data.profile_image_url || null,
        },
        create: {
          xId,
          username: data.username || "unknown",
          displayName: data.name || data.username || "X user",
          avatarUrl: data.profile_image_url || null,
        },
      })
      return true
    },
    async jwt({ token, profile }) {
      if (profile) {
        const x = (profile as XProfile).data || (profile as XProfile)
        token.xId = x.id
        token.username = x.username
        token.displayName = x.name
        token.avatarUrl = x.profile_image_url
      }
      return token
    },
    async session({ session, token }) {
      if (!token.xId || !token.username) return session
      const user = await prisma.user.findUnique({ where: { xId: token.xId } })
      if (!user) return session
      session.user = {
        id: user.id,
        xId: user.xId,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      }
      return session
    },
  },
}
