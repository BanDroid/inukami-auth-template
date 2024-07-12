import { Role, User } from "@prisma/client";
import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & User;
  }
  interface User extends DefaultUser {
    role: Role;
  }
}
