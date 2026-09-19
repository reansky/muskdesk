import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: { signIn: "/login" },
  callbacks: {
    authorized: ({ token }) => Boolean(token) || process.env.ALLOW_DEMO === "true",
  },
})

export const config = { matcher: ["/wallets/:path*", "/trackers/:path*"] }
