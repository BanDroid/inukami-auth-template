"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useSession } from "next-auth/react";

export default function AuthButton({
  setDrawerOpen,
  isSheetContext,
}: {
  setDrawerOpen?: Dispatch<SetStateAction<boolean>>;
  isSheetContext?: boolean;
}) {
  const session = useSession();

  if (session.status === "authenticated") return null;

  return isSheetContext ? (
    <>
      <AuthButtonStyle
        variant="outline"
        href="/register"
        setDrawerOpen={setDrawerOpen}
      >
        Daftar
      </AuthButtonStyle>
      <AuthButtonStyle
        variant="default"
        href="/login"
        setDrawerOpen={setDrawerOpen}
      >
        Masuk
      </AuthButtonStyle>
    </>
  ) : (
    <>
      <AuthButtonStyle variant="outline" href="/register">
        Daftar
      </AuthButtonStyle>
      <AuthButtonStyle variant="default" href="/login">
        Masuk
      </AuthButtonStyle>
    </>
  );
}

function AuthButtonStyle({
  variant,
  href,
  children,
  setDrawerOpen,
}: {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  href: string;
  children: ReactNode;
  setDrawerOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant,
          size: "default",
        }),
        "w-full mb-2 md:mb-0 flex md:inline-flex items-center gap-2"
      )}
      href={href}
      onClick={() => setDrawerOpen?.(false)}
    >
      {children}
    </Link>
  );
}
