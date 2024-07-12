import prisma from "@/config/database";
import { applicationMetadata } from "@/lib/utils";
import { Check } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = applicationMetadata({
  title: "Verifikasi email",
});

interface PageProps {
  params: {
    userId: string;
  };
}
export default async function Page({ params }: PageProps) {
  if (!params.userId) return notFound();
  const user = await prisma.user.update({
    where: {
      id: params.userId,
    },
    data: {
      emailVerified: true,
    },
  });
  if (!user) return notFound();
  return (
    <div className="h-[70dvh] flex flex-col items-center justify-center gap-4">
      <span className="bg-primary rounded-full overflow-hidden">
        <Check className="w-24 h-24 p-4" />
      </span>
      <h2 className="text-2xl">Email anda telah berhasil diverifikasi</h2>
    </div>
  );
}
