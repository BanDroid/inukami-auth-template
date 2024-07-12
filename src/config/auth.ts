import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { config } from "@/middleware";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    // signOut: "/api/auth/signout",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const protectedRoutes = ["/profile", "/api/v1/manga"];
    //   const unprotectedRoutes = ["/register", "/login", "/reset-password"];
    //   const isProtectedRoute = protectedRoutes.some((prefix) =>
    //     nextUrl.pathname.startsWith(prefix)
    //   );
    //   if (!auth && isProtectedRoute) {
    //     const absoluteURL = new URL("/login", nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString());
    //   }
    //   if (auth && unprotectedRoutes.includes(nextUrl.pathname)) {
    //     const absoluteURL = new URL("/", nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString());
    //   }
    //   return true;
    // },
    session: async ({ session, token }) => {
      const user = await getUser(token.email!);
      const obj: {
        user: User;
        sessionToken: string;
        userId: string;
        expires: Date & string;
      } = {
        ...session,
        user: {
          ...session.user,
          ...user,
          provider: token.provider,
        },
      };
      return obj;
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        const user = await getUser(token.email!);
        return {
          ...token,
          ...user,
          provider: account?.provider,
        };
      }
      return token;
    },
  },
});

async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      image: true,
      role: true,
    },
  });
}
