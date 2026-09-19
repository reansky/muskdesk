import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      xId: string
      username: string
      displayName: string
      avatarUrl?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    xId?: string
    username?: string
    displayName?: string
    avatarUrl?: string | null
  }
}
