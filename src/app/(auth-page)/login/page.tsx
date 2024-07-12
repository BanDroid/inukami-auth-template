import { redirect } from "next/navigation";
import { auth } from "@/config/auth";
import {
  PROTECTION_LEVEL,
  applicationMetadata,
  setServerProtection,
} from "@/lib/utils";
import LoginForm from "./login-form";

export const metadata = applicationMetadata({
  title: "Masuk",
});

export default async function Page() {
  await setServerProtection(PROTECTION_LEVEL.REVERSE_PROTECTED);
  const session = await auth();

  return (
    <>
      <section className="flex items-center justify-center">
        <div className="w-full h-full max-w-xl">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
