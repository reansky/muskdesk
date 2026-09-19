# Musedesk

Musedesk is a focused crypto wallet and tracker dashboard for Base and Robinhood Chain. It uses X as the only authentication method and keeps wallet management inside the product.

## Stack

- Next.js 15 App Router, React, TypeScript
- Tailwind CSS, Lucide React
- TanStack Query and Zustand
- Prisma + PostgreSQL
- Auth.js / NextAuth X OAuth
- viem for EVM wallet generation and RPC balance reads
- Zod for API validation

## Run locally

```bash
cp .env.example .env
# Set DATABASE_URL, AUTH_SECRET, and a 64-character WALLET_ENCRYPTION_KEY.
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`, `/wallets`, or `/trackers?chain=base`.

## Environment

`BASE_RPC_URL`, `ROBINHOOD_RPC_URL`, `BASE_EXPLORER_URL`, and `ROBINHOOD_EXPLORER_URL` are intentionally blank in `.env.example`. Supply your own RPC and explorer services. The app never hard-codes chain endpoints.

For X OAuth 2.0 Authorization Code + PKCE, create an X application and set:

```env
X_CLIENT_ID=...
X_CLIENT_SECRET=...
X_REDIRECT_URI=http://localhost:3000/api/auth/callback/twitter
```

Add the same callback URL in the X developer console. `NEXTAUTH_URL` must match the running origin.

The provider requests only the `users.read` scope and enables both PKCE and state checks. It stores only the X user ID, username, display name, and profile image. It does not request DMs, email, contacts, tweet write access, or posting permissions. Do not commit `.env`, `.env.local`, or any X secret to source control. Rotate credentials immediately if they are pasted into a public issue, chat, screenshot, or repository.

`ALLOW_DEMO=true` provides a local demo user and deterministic seed fallback when there is no authenticated X session. Set it to `false` in production. The demo fallback does not bypass authorization for database records: all database queries still scope to the current user.

## Security

- Private keys are generated with viem's secure randomness.
- Keys are encrypted using AES-256-GCM before being written to PostgreSQL.
- `WALLET_ENCRYPTION_KEY` must be a 32-byte hex key in production.
- Normal wallet API responses never include private keys.
- Export is a separate explicit `POST /api/wallets/:id/export` action and requires the confirmation string `EXPORT`.
- No private key is logged or sent to analytics.
- Wallet and tracker queries are scoped to the authenticated user.

## Routes

- `/wallets?chain=base`
- `/wallets?chain=robinhood`
- `/trackers?chain=base`
- `/trackers?chain=robinhood`
- `/wallets/[id]`
- `/trackers/[id]`

API handlers live under `app/api` and validate inputs with Zod. `lib/blockchain/` keeps chain access separate from UI. RPC balance reads use viem when an RPC URL is configured; transaction and token enrichment are deterministic adapters ready to be replaced by an indexer or websocket worker.
