"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { heroImage, sectionContainer } from "@/lib/landing-content";

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const heroWords = ["Bán hàng", "Thanh toán"];

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

  return (
    <section className="ui-section relative min-h-[92vh] overflow-hidden">
      <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,24,0.46)_0%,rgba(4,10,24,0.68)_58%,rgba(4,10,24,0.8)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white/12" />
      <div
        className={`${sectionContainer} relative flex min-h-[92vh] flex-col justify-center py-24 text-center text-white transition-[opacity,transform] duration-[260ms] ease-out`}
        style={{ opacity: 1 - scrollProgress * 0.28, transform: `translateY(${scrollProgress * 12}px)` }}
      >
        <Reveal as="p" mode="hero" delay={40} className="font-mono text-sm uppercase tracking-[0.22em] text-white/82 md:text-base">
          • Point of Sale & Operations •
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
          <span>thông minh hơn với Unipay</span>
        </Reveal>
        <Reveal mode="hero" delay={220} className="mx-auto mt-8 max-w-[680px] rounded-[20px] border border-white/12 bg-black/28 px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-md md:px-6 md:py-4">
          <p className="text-base text-white/88 md:text-lg">UniPay tích hợp AI trực tiếp vào bán hàng, thanh toán và vận hành - giúp doanh nghiệp Việt vận hành hiệu quả hơn mỗi ngày trên một nền tảng duy nhất.</p>
        </Reveal>
        <Reveal mode="hero" delay={300} className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          <Button variant="secondary" className="px-8 py-3 text-base text-[var(--brand-strong)]">
            Bắt đầu với UniPay
          </Button>
          <Button variant="primary" className="px-8 py-3 text-base">
            Liên hệ tư vấn
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
