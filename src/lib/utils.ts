import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Application from "@/config/application";
import { RedirectType, redirect } from "next/navigation";
import { auth } from "@/config/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function applicationMetadata(
  metadata?: typeof Application
): typeof Application {
  return {
    ...Application,
    ...metadata,
  };
}

export enum PROTECTION_LEVEL {
  UNPROTECTED, // ignored route
  PROTECTED, // user was null (redirect to auth page)
  STAFF_ONLY, // only user with role ADMIN or EDITOR
  REVERSE_PROTECTED, // user exist (redirect to /)
}

export async function setServerProtection(level: PROTECTION_LEVEL) {
  const session = await auth();
  switch (level) {
    case PROTECTION_LEVEL.PROTECTED: {
      session ? null : redirect("/login", RedirectType.replace);
      return;
    }
    case PROTECTION_LEVEL.STAFF_ONLY: {
      if (!session) {
        return redirect("/login", RedirectType.replace);
      }
      session.user.role === "ADMIN" || session.user.role === "EDITOR"
        ? null
        : redirect("/", RedirectType.replace);
      return;
    }
    case PROTECTION_LEVEL.REVERSE_PROTECTED: {
      session ? redirect("/", RedirectType.replace) : null;
      return;
    }
    default: {
      return;
    }
  }
}
