type XUser = {
  id: string
  username: string
  name: string
  profile_image_url?: string
  public_metrics?: { followers_count: number; following_count: number; tweet_count: number }
}

function bearerToken() {
  const raw = process.env.X_BEARER_TOKEN
  return raw ? decodeURIComponent(raw) : ""
}

async function xRequest<T>(path: string): Promise<T> {
  const token = bearerToken()
  if (!token) throw new Error("X_BEARER_TOKEN is not configured")
  const response = await fetch(`https://api.x.com/2${path}`, { headers: { authorization: `Bearer ${token}` }, cache: "no-store" })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.detail || `X API request failed (${response.status})`)
  return body
}

export async function getXUserByUsername(username: string) {
  const handle = username.replace(/^@/, "")
  const result = await xRequest<{ data?: XUser }>(`/users/by/username/${encodeURIComponent(handle)}?user.fields=profile_image_url,public_metrics`)
  return result.data || null
}

export async function getXUserTimeline(userId: string) {
  return xRequest<{ data?: Array<{ id: string; text: string; created_at?: string; public_metrics?: Record<string, number> }>; meta?: Record<string, string> }>(`/users/${encodeURIComponent(userId)}/tweets?max_results=10&tweet.fields=created_at,public_metrics`)
}
