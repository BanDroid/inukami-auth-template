import { NextResponse, NextRequest } from "next/server";
import {
  resetPasswordRequest,
  resetPasswordUser,
} from "@/controller/auth-controller";
import { sendMail } from "@/config/nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json(
      { success: false, message: `Email diperlukan` },
      { status: 400 }
    );
  const updatedUser = await resetPasswordRequest(email);
  if (!updatedUser) {
    return NextResponse.json(
      {
        success: false,
        message: `Tidak terdapat pengguna dengan email ${email}`,
      },
      { status: 400 }
    );
  }
  const info = await sendMail({
    to: updatedUser.email,
    subject: "Permintaan Reset Kata Sandi",
    text: `<a href="${req.nextUrl.origin}/reset-password/${updatedUser.id}/${updatedUser.resetPasswordId}">Klik disini untuk reset kata sandi</a>`,
  });
  if (!info)
    return NextResponse.json(
      {
        success: false,
        message: `Gagal mengirim permintaan reset kata sandi ${email}`,
      },
      { status: 400 }
    );
  return NextResponse.json(
    {
      success: true,
      message: `Permintaan reset kata sandi dikirim ke ${email}. Mohon cek email untuk langkah selanjutnya.`,
    },
    { status: 201 }
  );
}

export async function PUT(req: NextRequest) {
  const { userId, password } = await req.json();
  const updatedUser = await resetPasswordUser(userId, password);
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
