"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import Reveal from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { heroImage, sectionContainer } from "@/lib/landing-content";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

export default function HeroSection({ locale, content }: HeroSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroWords = content.heroWords;

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(Math.min(window.scrollY / 320, 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroWordIndex((current) => (current + 1) % heroWords.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [heroWords.length]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenu = () => setMobileMenuOpen(false);

    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, [mobileMenuOpen]);

  return (
    <section className="ui-section relative min-h-[92vh] overflow-hidden">
      <Image src={withBasePath(heroImage)} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,24,0.46)_0%,rgba(4,10,24,0.68)_58%,rgba(4,10,24,0.8)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white/12" />
      <div className={`${sectionContainer} absolute inset-x-0 top-0 z-20 pt-5 md:pt-6`}>
        <div className="flex items-center justify-between gap-6 px-4 py-3 text-white md:px-6">
          <div className="flex items-center gap-18 xl:gap-40">
            <Link href={`/${locale}`} className="shrink-0 cursor-pointer">
              <Image src={withBasePath("/unipay-logo.svg")} alt="Unipay logo" width={108} height={40} className="h-8 w-auto md:h-9" />
            </Link>
            <nav className="hidden items-center gap-8 text-base font-medium text-white/84 lg:flex xl:gap-9">
              {content.nav.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="cursor-pointer transition-colors duration-[200ms] ease-out hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition-colors duration-[200ms] ease-out hover:bg-white/14 lg:hidden"
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-4 w-4">
                <span
                  className={`absolute left-0 top-1/2 h-[1.5px] w-4 rounded-full bg-current transition-all duration-[220ms] ease-out ${
                    mobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded-full bg-current transition-opacity duration-[180ms] ease-out ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[1.5px] w-4 rounded-full bg-current transition-all duration-[220ms] ease-out ${
                    mobileMenuOpen ? "translate-y-0 rotate-[-45deg]" : "translate-y-[5px]"
                  }`}
                />
              </span>
            </button>
            <button type="button" className="hidden cursor-pointer text-base font-medium text-white/82 transition-colors duration-[200ms] ease-out hover:text-white md:inline-flex">
              {content.login}
            </button>
            <button
              type="button"
              className="hidden cursor-pointer px-5 py-2.5 text-base font-semibold text-white/86 transition-colors duration-[200ms] ease-out hover:text-white md:inline-flex"
            >
              {content.startNow}
            </button>
            <LocaleSwitcher locale={locale} label={content.switchLocaleLabel} />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-[260ms] ease-out lg:hidden ${
            mobileMenuOpen ? "max-h-[420px] translate-y-0 opacity-100" : "max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-4 mt-3 rounded-[24px] border border-white/12 bg-black/28 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-md md:mx-6">
            <nav className="flex flex-col gap-1">
              {content.nav.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex cursor-pointer items-center justify-start rounded-[16px] px-3 py-3 text-left text-base font-medium text-white/88 transition-colors duration-[200ms] ease-out hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="inline-flex cursor-pointer text-base font-medium text-white/82 transition-colors duration-[200ms] ease-out hover:text-white"
                >
                  {content.login}
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer text-base font-semibold text-white/86 transition-colors duration-[200ms] ease-out hover:text-white"
                >
                  {content.startNow}
                </button>
              </div>
              <LocaleSwitcher
                locale={locale}
                label={content.switchLocaleLabel}
                className="inline-flex"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${sectionContainer} relative flex min-h-[92vh] flex-col justify-center py-24 pt-36 text-center text-white transition-[opacity,transform] duration-[260ms] ease-out md:pt-40`}
        style={{ opacity: 1 - scrollProgress * 0.28, transform: `translateY(${scrollProgress * 12}px)` }}
      >
        <Reveal as="p" mode="hero" delay={40} className="font-mono text-sm uppercase tracking-[0.22em] text-white/82 md:text-base">
          {content.eyebrow}
        </Reveal>
        <Reveal as="h1" mode="hero" delay={120} className="mt-4 text-5xl leading-[0.94] tracking-tight md:text-8xl">
          <span className="font-serif italic">
            <span className="relative inline-grid min-w-[9ch] md:min-w-[11ch]">
              {heroWords.map((word, index) => {
                const isActive = index === heroWordIndex;

                return (
                  <span
                    key={word}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 transition-[opacity,transform] duration-[780ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          </span>
          <br />
          <span>{content.titleSuffix}</span>
        </Reveal>
        <Reveal mode="hero" delay={220} className="mx-auto mt-8 max-w-[680px] rounded-[20px] border border-white/12 bg-black/28 px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-md md:px-6 md:py-4">
          <p className="text-base text-white/88 md:text-lg">{content.description}</p>
        </Reveal>
        <Reveal mode="hero" delay={300} className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          <button className="btn-pill cursor-pointer btn-secondary px-8 py-3 text-base text-[var(--brand-strong)]">
            {content.primaryCta}
          </button>
          <button className="btn-pill cursor-pointer btn-primary px-8 py-3 text-base">
            {content.secondaryCta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
