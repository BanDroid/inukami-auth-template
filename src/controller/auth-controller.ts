import prisma from "@/config/database";
import { userSchema } from "@/types/zod-schema";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { sendMail } from "@/config/nodemailer";
import { z } from "zod";

export const registerWithCredential = async (
  args: z.infer<typeof userSchema>
) => {
  const hashedPassword = await bcrypt.hash(args.password!, 10);
  return await prisma.user.create({
    data: {
      username: args.username,
      email: args.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
      image: true,
      role: true,
    },
  });
};

export const resetPasswordRequest = async (email: string) => {
  const userFromEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userFromEmail) {
    return null;
  }
  const resetId = randomUUID();
  const updatedUser = await prisma.user.update({
    where: {
      id: userFromEmail.id,
    },
    data: {
      resetPasswordId: resetId,
    },
  });
  return updatedUser;
};

export const resetPasswordUser = async (
  resetPasswordId: string,
  userId: string,
  newPassword: string
) => {
  if (!newPassword) return null;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
      resetPasswordId,
    },
    data: {
      password: hashedPassword,
    },
  });
  return updatedUser;
};
