"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import { withBasePath } from "@/lib/base-path";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

function getLocalizedPathname(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = nextLocale;
    return segments.join("/") || "/";
  }

  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export default function LocaleSwitcher({
  locale,
  label,
}: LocaleSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const nextLocale = locale === "vi" ? "en" : "vi";
  const href = getLocalizedPathname(pathname, nextLocale);

  return (
    <Link
      href={href}
      aria-label={`${label}: ${nextLocale.toUpperCase()}`}
      className="hidden items-center justify-center p-0 transition-transform duration-[200ms] ease-out hover:scale-[1.04] md:inline-flex"
    >
      <Image
        src={withBasePath(`/images/locales/${locale}.svg`)}
        alt=""
        width={26}
        height={26}
        className="h-6.5 w-6.5 rounded-full"
      />
    </Link>
  );
}
