import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogOut, UserRound } from "lucide-react";
import { auth } from "@/config/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";

export default function ProfileMenu() {
  const session = useSession();
  if (session.status === "loading" || !session.data) return null;
  return (
    <>
      <ProfileMenuDesktop session={session.data} />
      <ProfileMenuMobile session={session.data} />
    </>
  );
}

interface ProfileMenuNodeProps {
  session: Session;
}

function ProfileMenuDesktop({ session }: ProfileMenuNodeProps) {
  console.log(session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:block" asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session.user!.image} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {session
              .user!.username.match(/\b(\w)/g)
              .map((c: string) => c.toUpperCase())
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserRound className="w-4 h-4 mr-2" />
            Profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <span
            className="text-destructive"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileMenuMobile({ session }: ProfileMenuNodeProps) {
  return (
    <div className="flex md:hidden items-center space-x-2 cursor-pointer">
      <Avatar className="bg-secondary">
        <AvatarImage src={session.user!.image} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {session
            .user!.username.match(/\b(\w)/g)
            .map((c: string) => c.toUpperCase())
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h5 className="font-semibold">{session.user!.username}</h5>
        <span className="inline-block text-sm opacity-50">
          {session.user!.email}
        </span>
      </div>
    </div>
  );
}
