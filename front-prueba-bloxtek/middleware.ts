import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAuthStore } from "@/stores/auth.store";

export function middleware(req: NextRequest) {
  const token = useAuthStore.getState().token;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
