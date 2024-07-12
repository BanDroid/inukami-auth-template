import { PROTECTION_LEVEL, setServerProtection } from "@/lib/utils";
// under-development
export default async function Page() {
  await setServerProtection(PROTECTION_LEVEL.PROTECTED);
  return <></>;
}
