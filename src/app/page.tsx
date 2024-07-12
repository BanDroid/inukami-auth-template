import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { auth, signOut } from "@/config/auth";
import Autoplay from "embla-carousel-autoplay";
import prisma from "@/config/database";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}
export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  return (
    <>
      <header className="container"></header>
    </>
  );
}
