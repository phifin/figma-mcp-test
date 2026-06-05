"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { figmaImage } from "@/lib/figma-assets";

type CTASectionProps = {
  content: Dictionary["cta"];
};

const trailImages = [
  { src: figmaImage("industry-hotel.png"), x: 10, y: 16, width: 210, rotate: -8 },
  { src: figmaImage("device-hover-a90.png"), x: 27, y: 10, width: 180, rotate: 7 },
  { src: figmaImage("payment-card-correct.jpg"), x: 67, y: 9, width: 220, rotate: -5 },
  { src: figmaImage("industry-spa.png"), x: 84, y: 18, width: 190, rotate: 9 },
  { src: figmaImage("step-1.png"), x: 15, y: 44, width: 190, rotate: 6 },
  { src: figmaImage("device-c20.png"), x: 36, y: 39, width: 160, rotate: -10 },
  { src: figmaImage("industry-fnb.png"), x: 62, y: 42, width: 210, rotate: 8 },
  { src: figmaImage("payment-bank-correct.jpg"), x: 88, y: 46, width: 185, rotate: -7 },
  { src: figmaImage("trust-cloud.png"), x: 7, y: 74, width: 175, rotate: 5 },
  { src: figmaImage("device-hover-kiosk.png"), x: 29, y: 78, width: 195, rotate: -6 },
  { src: figmaImage("step-2.png"), x: 58, y: 74, width: 200, rotate: 4 },
  { src: figmaImage("payment-wallet-correct.jpg"), x: 78, y: 77, width: 210, rotate: -9 },
  { src: figmaImage("industry-retail.png"), x: 93, y: 70, width: 170, rotate: 7 },
  { src: figmaImage("ai-assistant.png"), x: 45, y: 18, width: 150, rotate: -4 },
] as const;

const ctaSlides = [
  figmaImage("cta-overlay.png"),
  figmaImage("device-hover-a90.png"),
  figmaImage("payment-card-correct.jpg"),
  figmaImage("industry-hotel.png"),
  figmaImage("industry-fnb.png"),
  figmaImage("industry-retail.png"),
] as const;

const revealDistance = 190;
const hideDelay = 420;
const slideInterval = 2000;

export default function CTASection({ content }: CTASectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasVisibleTrail, setHasVisibleTrail] = useState(false);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hideTimersRef = useRef<Array<number | null>>([]);
  const visibleRef = useRef<boolean[]>([]);
  const visibleCountRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % ctaSlides.length);
    }, slideInterval);

    return () => {
      window.clearInterval(slideTimer);
    };
  }, []);

  useEffect(() => {
    const hideTimers = hideTimersRef.current;

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      hideTimers.forEach((timer) => {
        if (timer !== null) {
          window.clearTimeout(timer);
        }
      });
    };
  }, []);

  const setTrailImageVisible = (index: number, visible: boolean) => {
    const element = imageRefs.current[index];
    const item = trailImages[index];
    if (!element || !item) return;

    const wasVisible = visibleRef.current[index] === true;
    if (wasVisible === visible) return;

    visibleRef.current[index] = visible;
    visibleCountRef.current += visible ? 1 : -1;
    visibleCountRef.current = Math.max(0, visibleCountRef.current);
    setHasVisibleTrail(visibleCountRef.current > 0);

    element.style.opacity = visible ? "0.95" : "0";
    element.style.transform = `rotate(${item.rotate}deg) scale(${visible ? 1.045 : 0.92})`;
  };

  const clearHideTimer = (index: number) => {
    const timer = hideTimersRef.current[index];
    if (timer === null || timer === undefined) return;

    window.clearTimeout(timer);
    hideTimersRef.current[index] = null;
  };

  const scheduleHide = (index: number) => {
    if (!visibleRef.current[index] || hideTimersRef.current[index] != null) {
      return;
    }

    hideTimersRef.current[index] = window.setTimeout(
      () => {
        setTrailImageVisible(index, false);
        hideTimersRef.current[index] = null;
      },
      hideDelay + (index % 4) * 25,
    );
  };

  const updateTrail = () => {
    const pointer = pointerRef.current;
    if (!pointer) return;

    imageRefs.current.forEach((element, index) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(pointer.x - centerX, pointer.y - centerY);

      if (distance < revealDistance) {
        clearHideTimer(index);
        setTrailImageVisible(index, true);
        scheduleHide(index);
      } else {
        scheduleHide(index);
      }
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    pointerRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      updateTrail();
      frameRef.current = null;
    });
  };

  const handlePointerLeave = () => {
    imageRefs.current.forEach((_, index) => {
      clearHideTimer(index);
      hideTimersRef.current[index] = window.setTimeout(
        () => {
          setTrailImageVisible(index, false);
          hideTimersRef.current[index] = null;
        },
        hideDelay + (index % 5) * 35,
      );
    });
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-[#1a1a1a] px-6 py-20"
    >
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-[1360px]" aria-hidden="true">
        {trailImages.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(node) => {
              imageRefs.current[index] = node;
            }}
            className="absolute overflow-hidden rounded-[22px] opacity-0 shadow-[0_18px_56px_rgba(0,0,0,0.32)] transition-[opacity,transform] duration-300 ease-out will-change-[opacity,transform]"
            style={
              {
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.width}px`,
                aspectRatio: "4 / 3",
                transform: `rotate(${item.rotate}deg) scale(0.92)`,
              } as CSSProperties
            }
          >
            <Image
              src={withBasePath(item.src)}
              alt=""
              fill
              sizes={`${item.width}px`}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/12" />
          </div>
        ))}
      </div>
      <Reveal
        mode="scale"
        className="relative z-10 flex h-[400px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-[40px] px-8 py-8 text-center text-white"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-out ${
            hasVisibleTrail ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          {ctaSlides.map((src, index) => (
            <Image
              key={src}
              src={withBasePath(src)}
              alt=""
              fill
              priority={index === 0}
              sizes="500px"
              className={`motion-image-zoom object-cover transition-opacity duration-500 ease-out ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <h2 className="font-serif text-[48px] font-medium leading-[1.06] tracking-[-1.4px] md:text-[74px] md:leading-[1.04] md:tracking-[-2px]">
            Bứt phá
            <br />
            ngay cùng
            <br />
            UniPay!
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button className="motion-button h-14 rounded-full bg-[var(--brand)] px-8 text-lg font-medium leading-[26px] text-white">
              Đăng ký ngay
            </button>
            <button className="motion-button h-14 rounded-full bg-white px-8 text-lg font-medium leading-[26px] text-[var(--brand)]">
              {content.secondaryCta}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
