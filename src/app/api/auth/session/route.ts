import { auth } from "@/config/auth";
import prisma from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/api/v1/manga"];
const unprotectedRoutes = ["/register", "/login", "/reset-password"];

export async function GET(req: NextRequest) {
  const session = await auth();
  const { nextUrl } = req;
  if (!session?.user) {
    // return new NextResponse(
    //   JSON.stringify({ status: "fail", message: "You are not logged in" }),
    //   { status: 401 }
    // );

    // const isProtectedRoute = protectedRoutes.some((prefix) => {
    //   console.log(prefix);
    //   return nextUrl.pathname.startsWith(prefix);
    // });
    // console.log(isProtectedRoute);

    // if (!session && isProtectedRoute) {
    //   const absoluteURL = new URL("/login", nextUrl.origin);
    //   return NextResponse.redirect(absoluteURL.toString());
    // }
    return NextResponse.json(null);
  }

  return NextResponse.json({
    // authenticated: !!session,
    // session: {
    expires: session.expires,
    user: session.user,
    // },
  });
}
