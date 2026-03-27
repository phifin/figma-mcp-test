import { notFound } from "next/navigation";

import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

export { defaultLocale, locales, type Locale };

export function getLocaleFromParam(locale: string): Locale {
  if (!hasLocale(locale)) {
    notFound();
  }

  return locale;
}

