"use client";

import { menuItems } from "@/config/main-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import AuthButton from "./auth-button";
import { Dispatch, SetStateAction } from "react";
import { SheetClose } from "./ui/sheet";
import ProfileMenu from "./profile-menu";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function DrawerContent({
  setDrawerOpen,
}: {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const session = useSession();

  return (
    <div className="h-full py-2 mt-4">
      {session.status === "unauthenticated" ? (
        <AuthButton setDrawerOpen={setDrawerOpen} isSheetContext />
      ) : (
        <ProfileMenu />
      )}
      <hr className="my-4" />
      <div className="flex flex-col items-stretch gap-1">
        {menuItems.map((menu) => (
          <SheetClose asChild key={menu.id}>
            <Button
              variant={menu.href === pathname ? "secondary" : "ghost"}
              size="sm"
              asChild
              className={cn("items-center justify-start gap-4")}
            >
              <Link href={menu.href}>
                {menu.icon ?? null}
                {menu.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      <hr className="my-4" />

      <div className="flex flex-col items-stretch gap-1">
        {session.status === "authenticated" && (
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "items-center justify-start gap-4 hover:bg-destructive text-destructive hover:text-destructive-foreground"
              )}
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="w-4 h-4" /> Keluar
            </Button>
          </SheetClose>
        )}
      </div>
    </div>
  );
}
