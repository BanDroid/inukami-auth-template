import { auth } from "@/config/auth";
import { notFound, redirect } from "next/navigation";
import prisma from "@/config/database";
import UserResetPasswordForm from "./user-reset-password-form";
import { applicationMetadata } from "@/lib/utils";

async function getUser(userId: string, resetPasswordId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
      resetPasswordId,
    },
  });
}

export async function generateMetadata({
  params: { resetPasswordId, userId },
}: PageProps) {
  const user = await getUser(userId, resetPasswordId);
  if (!user) return applicationMetadata({ title: "Pengguna tidak ditemukan" });
  return applicationMetadata({
    title: "Reset kata sandi untuk " + user.username,
  });
}

interface PageProps {
  params: {
    userId: string;
    resetPasswordId: string;
  };
}
export default async function Page({
  params: { resetPasswordId, userId },
}: PageProps) {
  const userRequested = await getUser(userId, resetPasswordId);
  if (!userRequested) {
    return notFound();
  }

  return (
    <section className="flex items-center justify-center">
      <div className="w-full h-full max-w-xl">
        <UserResetPasswordForm
          userId={userRequested.id}
          resetPasswordId={resetPasswordId}
        />
      </div>
    </section>
  );
}
