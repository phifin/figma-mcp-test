import { redirect } from "next/navigation";

import { defaultLocale } from "@/i18n/config";
import { withBasePath } from "@/lib/base-path";

export default function RootPage() {
  redirect(withBasePath(`/${defaultLocale}`));
}
