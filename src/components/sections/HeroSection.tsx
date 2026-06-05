"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import Reveal from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { figmaImage } from "@/lib/figma-assets";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

export default function HeroSection({ locale, content }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, [mobileMenuOpen]);

  return (
    <section className="relative min-h-[800px] overflow-hidden bg-black text-white md:min-h-[800px]">
      <Image
        src={withBasePath("/images/get-started.png")}
        alt=""
        fill
        priority
        sizes="100vw"
        className="motion-hero-media object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-[123px] backdrop-blur-[16px]">
        <Image
          src={withBasePath(figmaImage("hero-blur.png"))}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
      </div>

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="flex h-[60px] items-center gap-10 px-6 md:px-10 lg:px-20">
          <Link href={`/${locale}`} className="relative h-10 w-[102px] shrink-0">
            <Image
              src={withBasePath("/unipay-logo.svg")}
              alt="Unipay logo"
              fill
              sizes="102px"
              className="object-contain brightness-0 invert"
              style={{ width: "100%", height: "100%" }}
            />
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center overflow-hidden lg:flex">
            {content.nav.map((item) => (
              <button
                key={item.label}
                type="button"
                className="rounded-full px-3 py-2 text-base leading-5 tracking-[-0.4px] text-white transition hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-5 md:flex">
            <button type="button" className="py-2 text-base font-medium leading-5 tracking-[-0.4px] text-white">
              {content.login}
            </button>
            <button type="button" className="py-2 text-base font-medium leading-5 tracking-[-0.4px] text-white">
              {content.startNow}
            </button>
            <LocaleSwitcher locale={locale} label={content.switchLocaleLabel} className="inline-flex" />
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="ml-auto grid size-10 place-items-center rounded-full bg-white/10 text-white md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition ${mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition ${mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </span>
          </button>
        </div>
        <div className={`px-6 transition md:hidden ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
          <div className="rounded-2xl border border-white/12 bg-black/40 p-4 backdrop-blur-md">
            {content.nav.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-xl px-3 py-3 text-left text-base text-white/90 hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-sm text-white/80">{content.login}</span>
              <LocaleSwitcher locale={locale} label={content.switchLocaleLabel} className="inline-flex" />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex min-h-[800px] flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
        <Reveal
          as="p"
          mode="hero"
          delay={240}
          className="font-mono text-xs font-medium uppercase leading-[22px] tracking-[1px] text-white md:text-base"
        >
          {content.eyebrow}
        </Reveal>
        <Reveal
          as="h1"
          mode="hero"
          delay={320}
          className="mt-2 max-w-[1112px] font-serif text-[44px] font-medium leading-[1.08] tracking-[-1.2px] text-white md:text-[82px] md:leading-[1.04] md:tracking-[-2.8px]"
        >
          Nền tảng thanh toán và quản lý
          <br />
          toàn diện cho mọi doanh nghiệp.
        </Reveal>
        <Reveal
          mode="hero"
          delay={460}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button className="motion-button h-14 rounded-full bg-white px-8 text-lg font-medium leading-[26px] text-[var(--brand)] shadow-[0_2px_4px_rgba(27,28,29,0.04)]">
            Đăng ký ngay
          </button>
          <button className="motion-button h-14 rounded-full bg-[var(--brand)] px-8 text-lg font-medium leading-[26px] text-white shadow-[0_2px_4px_rgba(27,28,29,0.04)]">
            {content.secondaryCta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
