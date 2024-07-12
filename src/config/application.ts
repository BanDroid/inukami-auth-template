import { type Metadata } from "next";

const Application: Metadata & {
  version?: number;
  versionName?: string;
  owner?: string;
  ownerUsername?: string;
} = {
  title: {
    default: "Inukami",
    template: "%s | InuKami",
  },
  description:
    "baca, unduh, bagikan, atau diskusi apapun tentang manga, manhwa, dan manhua secara gratis",
  version: 1,
  versionName: "1.0",
  owner: "Fitrah Nuno Syahbani",
  ownerUsername: "BanDroid",
  icons: {
    icon: "/icon.png",
  },
};

export default Application;
