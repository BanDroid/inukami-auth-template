import type { Metadata } from "next";
import { roboto } from "@/config/fonts";
import "./globals.css";
import { Drawer } from "@/components/drawer";
import { Navbar } from "@/components/navbar";
import { applicationMetadata, cn } from "@/lib/utils";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/provider/session-provider";

export const metadata: Metadata = applicationMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={cn(roboto.className, "h-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Drawer />
            <Navbar />
          </SessionProvider>
          <main className="mb-4">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
