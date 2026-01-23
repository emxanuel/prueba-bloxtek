import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { config as configFront } from "./config";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  if (isPublicRoute || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  else {
    const response = axios.get(`${configFront.apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => {
      return NextResponse.redirect(new URL("/login", req.url));
    }).then((response) => {
      if (response) {
        return NextResponse.next();
      }
      else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    });
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
