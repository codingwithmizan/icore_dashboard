import { NextResponse, type NextRequest } from "next/server";
// import { auth, signOut } from "@/auth";

export const middleware = async (req: NextRequest) => {
  // const session = await auth();
  const publicRoutes = ["/login", "/forgot-password"];

  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // if (!session?.user) {
  //   await signOut({ redirect: false });
  //   return NextResponse.redirect(new URL("/login", req.nextUrl));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// import { NextResponse, type NextRequest } from "next/server";
// import { auth, signOut } from "@/auth";
// import { sessionSchema, type SafeSession } from "@/lib/validations/session";
// import { hasAccess } from "@/lib/auth/roles";

// // ----------------------------
// // Config
// // ----------------------------
// const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"];
// const PROTECTED_ROUTES = ["/dashboard", "/account", "/settings"];
// const ADMIN_ROUTES = ["/admin", "/admin/settings"];
// const MAINTENANCE_MODE = false;
// const MAINTENANCE_WHITELIST = ["/admin", "/api"];
// const DEBUG = process.env.NODE_ENV === "development";

// // ----------------------------
// // Path Matchers
// // ----------------------------
// const isMatch = (pathname: string, routes: string[]) =>
//   routes.some((route) => pathname.startsWith(route));

// const isSessionExpired = (expires?: number) => (expires ? Date.now() > expires : false);

// // ----------------------------
// // Middleware
// // ----------------------------
// export const middleware = async (req: NextRequest) => {
//   const { pathname, search } = req.nextUrl;

//   try {
//     const rawSession = await auth();
//     const parsed = sessionSchema.safeParse(rawSession);

//     if (!parsed.success) {
//       console.warn("[Middleware] Invalid session format");
//       return NextResponse.redirect(new URL("/error", req.nextUrl));
//     }

//     const session: SafeSession = parsed.data;
//     const user = session.user;

//     if (DEBUG) {
//       console.log("[Middleware] Path:", pathname);
//       console.log("[Middleware] User:", user);
//     }

//     // 1. Maintenance mode
//     if (MAINTENANCE_MODE && !isMatch(pathname, MAINTENANCE_WHITELIST)) {
//       return NextResponse.redirect(new URL("/maintenance", req.nextUrl));
//     }

//     // 3. Redirect logged-in users away from public pages
//     if (user && isMatch(pathname, PUBLIC_ROUTES)) {
//       return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//     }

//     // 4. Guest access to protected or admin routes
//     if (!user && isMatch(pathname, [...PROTECTED_ROUTES, ...ADMIN_ROUTES])) {
//       const callbackUrl = `${pathname}${search}`;
//       return NextResponse.redirect(
//         new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.nextUrl)
//       );
//     }

//     // 5. Expired session
//     if (user && isSessionExpired(user.accessTokenExpires)) {
//       await signOut({ redirect: false });
//       return NextResponse.redirect(new URL("/login", req.nextUrl));
//     }

//     // 6. Admin access check
//     if (user && isMatch(pathname, ADMIN_ROUTES)) {
//       if (!hasAccess(user.role, "admin")) {
//         return NextResponse.redirect(new URL("/403", req.nextUrl));
//       }
//     }

//     // 7. Allow everything else
//     return NextResponse.next();
//   } catch (error) {
//     console.error("[Middleware] Unexpected error:", error);
//     return NextResponse.redirect(new URL("/error", req.nextUrl));
//   }
// };

// // ----------------------------
// // Match Routes
// // ----------------------------
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)"],
// };
