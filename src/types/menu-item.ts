import { ReactNode } from "react";

export interface MenuItem {
  id: number | string;
  title: string;
  icon?: string | ReactNode;
  href: string;
}
