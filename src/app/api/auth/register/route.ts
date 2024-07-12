import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import { registerWithCredential } from "@/controller/auth-controller";
import { sendMail } from "@/config/nodemailer";
import { userSchema } from "@/types/zod-schema";
import prisma from "@/config/database";

export async function POST(req: NextRequest) {
  try {
    const validatedFields = userSchema.safeParse(await req.json());
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validasi gagal",
        },
        { status: 400 }
      );
    }
    const data = validatedFields.data;
    if (!data.password) {
      return NextResponse.json(
        {
          status: "error",
          message: "Kata sandi kosong",
        },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          status: "error",
          message: "Email sudah digunakan",
        },
        { status: 400 }
      );
    }
    const user = await registerWithCredential(data);
    const info = await sendMail({
      subject: "Verifikasi Email",
      text: `<a href="${req.nextUrl.origin}/verify/${user.id}" target="_blank" class="btn">Klik disini untuk verifikasi email</a>`,
    });
    return NextResponse.json(user);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validasi gagal",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "error",
          message: "Pengguna dengan email sama telah digunakan",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
