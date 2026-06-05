"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
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

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
const smoothstep = (value: number) => {
  const next = clamp(value);
  return next * next * (3 - 2 * next);
};
const mapRange = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

const collageImages = [
  { src: "/images/product-showcase/1.png", x: 3, y: 28, w: 10, h: 20, rotate: -2, delay: 0.18 },
  { src: figmaImage("industry-hotel.png"), x: 14, y: 3, w: 11, h: 20, rotate: -4, delay: 0.24 },
  { src: "/images/product-showcase/2.png", x: 31, y: 6, w: 10, h: 19, rotate: 2, delay: 0.28 },
  { src: figmaImage("industry-fnb.png"), x: 58, y: 7, w: 10, h: 19, rotate: -2, delay: 0.32 },
  { src: figmaImage("device-hover-a90.png"), x: 80, y: 4, w: 11, h: 20, rotate: 4, delay: 0.36 },
  { src: figmaImage("industry-retail.png"), x: 17, y: 42, w: 10, h: 20, rotate: -1, delay: 0.34 },
  { src: figmaImage("industry-spa.png"), x: 72, y: 42, w: 10, h: 20, rotate: 2, delay: 0.4 },
  { src: figmaImage("payment-card-correct.jpg"), x: 89, y: 34, w: 9, h: 18, rotate: -3, delay: 0.46 },
  { src: figmaImage("payment-bank-correct.jpg"), x: 2, y: 72, w: 10, h: 19, rotate: 3, delay: 0.48 },
  { src: figmaImage("industry-health.png"), x: 24, y: 70, w: 10, h: 19, rotate: -2, delay: 0.52 },
  { src: figmaImage("trust-cloud.png"), x: 46, y: 72, w: 10, h: 19, rotate: 1, delay: 0.56 },
  { src: figmaImage("payment-wallet-correct.jpg"), x: 67, y: 70, w: 10, h: 19, rotate: -3, delay: 0.6 },
  { src: figmaImage("ai-assistant.png"), x: 88, y: 72, w: 10, h: 19, rotate: 2, delay: 0.64 },
] as const;

export default function HeroSection({ locale, content }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      setScrollProgress(clamp(-rect.top / scrollRange));
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const sceneProgress = smoothstep(scrollProgress);
  const settleProgress = smoothstep(mapRange(scrollProgress, 0, 0.16));
  const collageProgress = smoothstep(mapRange(scrollProgress, 0.1, 0.72));
  const heroContentOpacity = 1 - smoothstep(mapRange(scrollProgress, 0.04, 0.28));
  const collageTextOpacity = smoothstep(mapRange(scrollProgress, 0.52, 0.76));
  const whiteSceneOpacity = smoothstep(mapRange(scrollProgress, 0.14, 0.5));
  const headerOnLight = scrollProgress > 0.42;
  const mainCardStyle = {
    left: `${lerp(0, 44.5, collageProgress)}%`,
    top: `${lerp(0, 28, collageProgress) + lerp(0, 3, settleProgress)}vh`,
    width: `${lerp(100, 11, collageProgress)}%`,
    height: `${lerp(100, 21, collageProgress)}vh`,
    borderRadius: `${lerp(0, 24, collageProgress)}px`,
    boxShadow: `0 ${lerp(0, 22, collageProgress)}px ${lerp(0, 60, collageProgress)}px rgba(0,0,0,${lerp(0, 0.18, collageProgress)})`,
  } as CSSProperties;

  return (
    <section ref={sectionRef} className="relative min-h-[230vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-white transition-colors duration-300"
          style={{ opacity: whiteSceneOpacity }}
        />
        {collageImages.map((image, index) => {
          const itemProgress = smoothstep(mapRange(scrollProgress, image.delay, 0.72));

          return (
            <div
              key={`${image.src}-${index}`}
              className="absolute overflow-hidden rounded-[22px] bg-[#f4f4f4] shadow-[0_18px_50px_rgba(0,0,0,0.14)] will-change-[opacity,transform]"
              style={
                {
                  left: `${image.x}vw`,
                  top: `${image.y}vh`,
                  width: `clamp(112px, ${image.w}vw, 210px)`,
                  height: `clamp(120px, ${image.h}vh, 220px)`,
                  opacity: itemProgress,
                  transform: `translate3d(0, ${lerp(42, 0, itemProgress)}px, 0) scale(${lerp(0.78, 1, itemProgress)}) rotate(${lerp(image.rotate * 2, image.rotate, itemProgress)}deg)`,
                } as CSSProperties
              }
            >
              <Image
                src={withBasePath(image.src)}
                alt=""
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          );
        })}
        <div
          className="absolute overflow-hidden bg-black will-change-[left,top,width,height,border-radius]"
          style={mainCardStyle}
        >
          <Image
            src={withBasePath("/images/get-started.png")}
            alt=""
            fill
            priority
            sizes={collageProgress > 0.5 ? "24vw" : "100vw"}
            className="object-cover object-center"
            style={{
              transform: `scale(${lerp(1.04, 1, sceneProgress)})`,
              transition: "transform 120ms linear",
            }}
          />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: lerp(0.34, 0.08, collageProgress) }}
          />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-[123px] backdrop-blur-[16px]"
          style={{ opacity: 1 - whiteSceneOpacity }}
        >
          <Image
            src={withBasePath(figmaImage("hero-blur.png"))}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-80"
          />
        </div>

      <header className="absolute inset-x-0 top-0 z-30">
        <div className="flex h-[60px] items-center gap-10 px-6 md:px-10 lg:px-20">
          <Link href={`/${locale}`} className="relative h-10 w-[102px] shrink-0">
            <Image
              src={withBasePath("/unipay-logo.svg")}
              alt="Unipay logo"
              fill
              sizes="102px"
              className={`object-contain transition duration-300 ${headerOnLight ? "" : "brightness-0 invert"}`}
              style={{ width: "100%", height: "100%" }}
            />
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center overflow-hidden lg:flex">
            {content.nav.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`rounded-full px-3 py-2 text-base leading-5 tracking-[-0.4px] transition ${
                  headerOnLight ? "text-[#060606] hover:bg-black/5" : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-5 md:flex">
            <button
              type="button"
              className={`py-2 text-base font-medium leading-5 tracking-[-0.4px] transition ${
                headerOnLight ? "text-[#060606]" : "text-white"
              }`}
            >
              {content.login}
            </button>
            <button
              type="button"
              className={`py-2 text-base font-medium leading-5 tracking-[-0.4px] transition ${
                headerOnLight ? "text-[#060606]" : "text-white"
              }`}
            >
              {content.startNow}
            </button>
            <LocaleSwitcher locale={locale} label={content.switchLocaleLabel} className="inline-flex" />
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
            className={`ml-auto grid size-10 place-items-center rounded-full transition md:hidden ${
              headerOnLight ? "bg-black/5 text-[#060606]" : "bg-white/10 text-white"
            }`}
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

        <div
          className="relative z-20 flex h-screen flex-col items-center justify-center px-6 pb-20 pt-28 text-center"
          style={{
            opacity: heroContentOpacity,
            transform: `translateY(${lerp(0, -28, smoothstep(mapRange(scrollProgress, 0, 0.4)))}px)`,
            pointerEvents: heroContentOpacity > 0.2 ? "auto" : "none",
          }}
        >
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
        <div
          className="pointer-events-none absolute inset-x-6 top-[70%] z-10 mx-auto max-w-[1120px] -translate-y-1/2 text-center md:inset-x-10"
          style={{
            opacity: collageTextOpacity,
            transform: `translateY(calc(-50% + ${lerp(42, 0, collageTextOpacity)}px))`,
          }}
        >
          <p className="font-serif text-[34px] font-normal leading-[1.12] tracking-[-1px] text-[#060606] md:text-[54px] md:tracking-[-1.8px]">
            Nền tảng thanh toán và quản lý toàn diện cho mọi doanh nghiệp.
          </p>
        </div>
      </div>
    </section>
  );
}
