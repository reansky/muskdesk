import { NextResponse } from "next/server"

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function toNumber(value: unknown) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}
