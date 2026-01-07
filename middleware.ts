import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    console.log('Middleware - Path:', pathname, 'Token:', !!token);

    // 🔐 Admin route protection
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // ✅ Checkout is accessible to all authenticated users
    // No additional checks needed for /checkout

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/account",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
