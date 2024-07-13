import prisma from "@/config/database";
import { resetPasswordUser } from "@/controller/auth-controller";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { resetPasswordId?: string }
) {
  const { resetPasswordId } = params;
  if (!resetPasswordId)
    return NextResponse.json(
      { success: false, message: `Forbidden.` },
      { status: 403 }
    );
  const { userId, password } = await req.json();
  const updatedUser = await resetPasswordUser(
    resetPasswordId,
    userId,
    password
  );
  if (!updatedUser) {
    return NextResponse.json(
      { success: false, message: `Kredensial tidak valid.` },
      { status: 400 }
    );
  }
  return NextResponse.json(
    {
      success: true,
      message: `Kata sandi berhasil diperbarui, silahkan masuk kembali.`,
    },
    { status: 201 }
  );
}
