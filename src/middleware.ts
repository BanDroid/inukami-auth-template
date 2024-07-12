import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { auth } from "@/config/auth";

// Initialize the rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 1, // Per second
});

// middleware
export async function middleware(request: NextRequest) {
  try {
    // Consume a point for each request
    await rateLimiter.consume(request.ip as string);
    return NextResponse.next();
  } catch (rateLimiterRes) {
    // If rate limit is exceeded, send a 429 response
    return new NextResponse("Too many requests", { status: 429 });
  }
}

// export default auth(middleware);

export const config = {
  // specify the route you want to protect
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
