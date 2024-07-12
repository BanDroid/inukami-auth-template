import Image from "next/image";
import icon from "@/app/icon.png";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link href="/">
        <Image
          src={icon.src}
          width={35}
          height={35}
          className="w-8 h-8 aspect-square"
          alt="icon.png"
        />
      </Link>
    </>
  );
}
