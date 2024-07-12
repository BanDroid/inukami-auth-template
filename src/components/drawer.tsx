"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DrawerContent from "./drawer-content";
import Application from "@/config/application";
import { useState } from "react";

export const DRAWER_ID = "navigation-drawer";

export function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
    >
      <SheetTrigger
        id={DRAWER_ID}
        className="hidden"
        onClick={() => setIsOpen((prevValue) => !prevValue)}
      >
        open
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{Application.title?.toString()}</SheetTitle>
          <SheetDescription>{Application.description}</SheetDescription>
        </SheetHeader>
        <DrawerContent setDrawerOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
