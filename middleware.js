// import { NextResponse } from "next/server";
// import { verifyToken } from "./src/lib/auth";

// export function middleware(request) {
//     const { pathname } = request.nextUrl;

//     // Public routes that don't require authentication
//     const publicRoutes = ["/login", "/signup"];
//     const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

//     // Allow public routes and API auth routes
//     if (isPublicRoute || pathname.startsWith("/api/auth")) {
//         return NextResponse.next();
//     }

//     // Check authentication for protected routes
//     const token = request.cookies.get("token")?.value;

//     if (!token || !verifyToken(token)) {
//         // Redirect to login if not authenticated
//         if (!pathname.startsWith("/api")) {
//             return NextResponse.redirect(new URL("/login", request.url));
//         }
//         // Return 401 for API routes
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico (favicon file)
//          * - public folder
//          */
//         "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//     ],
// };



import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Only check if token exists
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
