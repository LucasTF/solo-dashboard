import { NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT,
  authRoutes,
  publicRoutes,
} from "./routes";
import { verifyJwt } from "./lib/jwt";

export default function auth(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  const token = req.cookies.get("jwt");

  if (token) {
    const isLoggedIn = verifyJwt(token.value) !== null;

    if (isAuthRoute) {
      if (isLoggedIn)
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));

      return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(
        new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, req.nextUrl)
      );
    }

    return null;
  }

  if (!isAuthRoute && !isPublicRoute)
    return Response.redirect(
      new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, req.nextUrl)
    );

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
