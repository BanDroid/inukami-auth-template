"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { menuItems } from "@/config/main-menu";
import { usePathname } from "next/navigation";
import { DRAWER_ID } from "./drawer";
import { Menu, Plus, Search, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import AuthButton from "./auth-button";
import Logo from "./logo";
import ProfileMenu from "./profile-menu";

export { Navbar };

function Navbar() {
  const { status, data } = useSession();
  const pathname = usePathname();

  const PostSeriesButton = () =>
    (data?.user.role === "ADMIN" || data?.user.role === "EDITOR") &&
    pathname !== "/create-series" ? (
      <Link
        href="/create-series"
        className={cn(
          buttonVariants({
            variant: "default",
            size: "sm",
          })
        )}
      >
        <Plus className="w-5 h-5" />
        Series
      </Link>
    ) : (
      <></>
    );

  return (
    <div className="bg-background/10 backdrop-blur-md border-b-[1px] border-border max-h-auto sticky top-0 z-30">
      <nav className="flex flex-wrap items-center justify-between gap-2 px-4 py-1 max-w-7xl mx-auto">
        <div className="flex items-center justify-start gap-2">
          <Button
            className="md:hidden"
            variant="ghost"
            size="sm"
            onClick={() =>
              (
                document.querySelector(
                  `#${DRAWER_ID}`
                ) as HTMLButtonElement | null
              )?.click()
            }
          >
            <Menu />
          </Button>

          <Logo />
        </div>
        <div className="flex-1">
          <NavbarDesktopNavigation />
        </div>
        <div className="flex items-center justify-end gap-2">
          <PostSeriesButton />
          {/* change theme button */}
          <ModeToggle />
        </div>
        <SearchBar />
        {/* auth */}
        <div className="hidden md:flex items-center gap-2">
          {status !== "loading" && status === "unauthenticated" ? (
            <AuthButton />
          ) : (
            <ProfileMenu />
          )}
        </div>
      </nav>
    </div>
  );
}

function SearchBar() {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/anime?search=${value}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className={`rounded overflow-hidden flex flex-row items-stretch gap-2 w-full md:max-w-sm my-1 md:my-2 mx-auto
			${isFocus ? "bg-muted/50" : "bg-muted/20"}
		`}
    >
      <input
        className="border-none outline-none bg-transparent min-w-0 w-full flex-1 px-4 pr-0"
        type="text"
        name="search"
        placeholder="Cari manga, manhwa, atau manhua"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        type="reset"
        variant="ghost"
        size="icon"
        className={`w-6 h-6 p-1 my-auto ${
          value
            ? "flex" // "opacity-100 pointer-events-auto"
            : "hidden" // "opacity-0 pointer-events-none"
        }`}
        onClick={() => setValue("")}
      >
        <X />
      </Button>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="rounded-none rounded-tr rounded-br"
      >
        <Search className="h-full" />
      </Button>
    </form>
  );
}

function NavbarDesktopNavigation() {
  const pathname = usePathname();
  return (
    <div className="px-8 hidden md:flex items-center gap-2">
      {menuItems.map(({ id, title, icon, href }) => (
        <Link
          key={id}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
            }),
            href === pathname ? "opacity-100" : "opacity-70",
            "items-center gap-2"
          )}
          href={href}
        >
          {/* {icon ?? null} */}
          {title}
        </Link>
      ))}
    </div>
  );
}
