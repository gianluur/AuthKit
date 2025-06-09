import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
  const requiresAuthentication = ["/profile", "/change-password"]

	const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl
 
	if (!sessionCookie) {
    if (requiresAuthentication.includes(pathname))
		  return NextResponse.redirect(new URL("/signin", request.url));
	}
  else {
    if (!requiresAuthentication.includes(pathname))
      return NextResponse.redirect(new URL("/profile", request.url));
  }
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/signup", "/signin", "/profile", "/forgot-password", "/change-password", "/reset-password"]
};