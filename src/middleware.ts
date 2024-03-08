import { NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT,
  adminRoutes,
  authRoutes,
  publicRoutes,
} from "./routes";
import { verifyJwt } from "./lib/jwt";

export default async function auth(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isStartRoute = pathname === "/";
  const isApiRoute = pathname.includes("/api");
  const isAdminApiRoute = pathname.includes("/api/upload");
  const isAdminRoute = adminRoutes.includes(pathname);

  const token = req.cookies.get("jwt");
  const adminToken = req.cookies.get("adminJwt");

  if (isAdminRoute) {
    if (!adminToken)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    const isValidAdmin = (await verifyJwt(adminToken.value, true)) !== null;

    if (!isValidAdmin)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));

    return null;
  }

  if (isAdminApiRoute) {
    if (!adminToken)
      return Response.json(
        { error: "Você não está autorizado a usar essa API!" },
        { status: 401 }
      );
    const isValidAdmin = (await verifyJwt(adminToken.value, true)) !== null;

    if (!isValidAdmin)
      return Response.json(
        { error: "Você não está autorizado a usar essa API!" },
        { status: 401 }
      );

    return null;
  }

  if (token) {
    const isLoggedIn = (await verifyJwt(token.value, false)) !== null;

    if (isAuthRoute) {
      if (isLoggedIn)
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));

      return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
      if (isApiRoute)
        return Response.json(
          { error: "Você não está autorizado a usar essa API!" },
          { status: 401 }
        );

      return Response.redirect(
        new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, req.nextUrl)
      );
    }

    if (isStartRoute)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));

    return null;
  }

  if (isApiRoute)
    return Response.json(
      { error: "Você não está autorizado a usar essa API!" },
      { status: 401 }
    );

  if (!isAuthRoute && !isPublicRoute)
    return Response.redirect(
      new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, req.nextUrl)
    );

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
