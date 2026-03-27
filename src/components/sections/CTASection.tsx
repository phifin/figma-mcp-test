"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
const smoothstep = (value: number) => {
  const clamped = clamp(value);
  return clamped * clamped * (3 - 2 * clamped);
};
const mapRange = (value: number, start: number, end: number) => clamp((value - start) / (end - start));

type CTASectionProps = {
  content: Dictionary["cta"];
};

export default function CTASection({ content }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window === "undefined" ? 1440 : window.innerWidth));

  useEffect(() => {
    const updateMetrics = () => {
      setViewportWidth(window.innerWidth);

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(rect.height - viewportHeight, 1);
      const rawProgress = (-rect.top + viewportHeight * 0.14) / (scrollableDistance + viewportHeight * 0.14);
      setProgress(clamp(rawProgress));
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateMetrics();
      });
    };

    updateMetrics();
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

  const easedProgress = smoothstep(progress);
  const compactWidth =
    viewportWidth >= 1280 ? 1080 :
    viewportWidth >= 1024 ? 920 :
    viewportWidth >= 768 ? 760 :
    Math.max(viewportWidth - 56, 0);
  const fullWidth =
    viewportWidth >= 1024 ? Math.max(viewportWidth - 112, 0) :
    viewportWidth >= 768 ? Math.max(viewportWidth - 80, 0) :
    Math.max(viewportWidth - 56, 0);
  const compactHeight =
    viewportWidth >= 1024 ? 420 :
    viewportWidth >= 768 ? 360 :
    300;
  const expandedHeight =
    viewportWidth >= 1280 ? 560 :
    viewportWidth >= 1024 ? 520 :
    viewportWidth >= 768 ? 440 :
    340;
  const containerWidth = lerp(Math.min(compactWidth, fullWidth), fullWidth, easedProgress);
  const containerHeight = lerp(compactHeight, expandedHeight, easedProgress);
  const containerRadius = lerp(40, 26, easedProgress);
  const containerTranslateY = lerp(26, 0, easedProgress);
  const containerScale = lerp(0.975, 1, easedProgress);
  const smallImageOpacity = 1 - mapRange(easedProgress, 0.08, 0.62);
  const largeImageOpacity = mapRange(easedProgress, 0.14, 0.72);
  const contentTranslateY = lerp(10, 0, easedProgress);
  const contentOpacity = lerp(0.94, 1, easedProgress);

  return (
    <section ref={sectionRef} className="ui-section relative min-h-[185vh] overflow-x-clip bg-black px-7 md:min-h-[200vh] md:px-10 lg:px-14">
      <div className="sticky top-0 flex min-h-screen items-center justify-center py-10 md:py-14">
        <div className="mx-auto flex w-full justify-center">
          <div
            className="relative overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            style={{
              width: `${containerWidth}px`,
              maxWidth: "100%",
              height: `${containerHeight}px`,
              borderRadius: `${containerRadius}px`,
              transform: `translateY(${containerTranslateY}px) scale(${containerScale})`,
            }}
          >
            <div className="absolute inset-0">
              <Image
                src={withBasePath("/images/ready-with-unipay-small.png")}
                alt=""
                fill
                sizes="(max-width: 767px) calc(100vw - 56px), (max-width: 1023px) calc(100vw - 80px), calc(100vw - 112px)"
                className="object-cover"
                style={{ opacity: smallImageOpacity, transform: `scale(${lerp(1, 1.03, easedProgress)})` }}
              />
              <Image
                src={withBasePath("/images/ready-with-unipay.png")}
                alt=""
                fill
                sizes="(max-width: 767px) calc(100vw - 56px), (max-width: 1023px) calc(100vw - 80px), calc(100vw - 112px)"
                className="object-cover"
                style={{ opacity: largeImageOpacity, transform: `scale(${lerp(1.04, 1, easedProgress)})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,20,0.42)_0%,rgba(3,8,20,0.5)_54%,rgba(3,8,20,0.62)_100%)]" />
            </div>

            <div
              className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white md:px-12"
              style={{ opacity: contentOpacity, transform: `translateY(${contentTranslateY}px)` }}
            >
              <Reveal as="h2" delay={0} className="font-serif text-5xl tracking-tight md:text-7xl">
                {content.title}
              </Reveal>
              <Reveal delay={100} className="mt-8 flex flex-wrap justify-center gap-4">
                <Button variant="primary" className="px-8 py-3 text-lg">
                  {content.primaryCta}
                </Button>
                <Button variant="secondary" className="px-8 py-3 text-lg">
                  {content.secondaryCta}
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
