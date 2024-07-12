import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./register-form";
import {
  PROTECTION_LEVEL,
  applicationMetadata,
  setServerProtection,
} from "@/lib/utils";

export const metadata = applicationMetadata({
  title: "Daftar",
});

export default async function Page() {
  await setServerProtection(PROTECTION_LEVEL.REVERSE_PROTECTED);
  const session = await auth();

  return (
    <>
      <section className="flex items-center justify-center">
        <div className="w-full h-full max-w-xl">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
