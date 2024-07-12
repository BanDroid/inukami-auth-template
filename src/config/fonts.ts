import { Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-default",
  weight: ["100", "400", "500", "700", "900"],
});
