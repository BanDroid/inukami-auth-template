import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./reset-password-form";
import {
  PROTECTION_LEVEL,
  applicationMetadata,
  setServerProtection,
} from "@/lib/utils";

export const metadata = applicationMetadata({
  title: "Permohonan reset kata sandi",
});

export default async function Page() {
  return (
    <>
      <section className="flex items-center justify-center">
        <div className="w-full h-full max-w-xl">
          <ResetPasswordForm />
        </div>
      </section>
    </>
  );
}
