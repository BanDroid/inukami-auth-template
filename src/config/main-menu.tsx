import { MenuItem } from "@/types/menu-item";
import { Home, Tag, Calendar } from "lucide-react";

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Beranda",
    icon: <Home className="w-4 h-4" />,
    href: "/",
  },
  {
    id: 2,
    title: "Genre",
    icon: <Tag className="w-4 h-4" />,
    href: "/genre",
  },
  {
    id: 3,
    title: "Jadwal rilis",
    icon: <Calendar className="w-4 h-4" />,
    href: "/jadwal-rilis",
  },
];

export { menuItems };
