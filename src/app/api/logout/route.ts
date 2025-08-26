// src/app/api/logout/route.ts
import { NextResponse } from "next/server";
// If you plan to clear cookies:
// import { cookies } from "next/headers";

export async function POST() {
  // Example: clear a session cookie if you have one
  // cookies().delete("session");

  return NextResponse.json({ ok: true });
}

// Optional: allow GET too (useful if you ever call it without POST)
export function GET() {
  return NextResponse.json({ ok: true });
}
