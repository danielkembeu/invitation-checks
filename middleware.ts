import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieKey = process.env.NEXT_PUBLIC_LSK ?? "";
  const cookieStored = request.cookies.get(cookieKey)?.value;
  const isLoggedIn = cookieStored === "true"; // ou simplement Boolean()

  if (!isLoggedIn) {
    // Si non connecté, redirige vers auth
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Si connecté, laisse passer
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
