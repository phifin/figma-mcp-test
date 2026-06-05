"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { industryCards } from "@/lib/figma-assets";

type IndustrySectionProps = {
  content: Dictionary["industries"];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function IndustrySection({}: IndustrySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const signFrameRef = useRef<number | null>(null);
  const signMoveRef = useRef<{
    element: HTMLElement;
    clientX: number;
    clientY: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (signFrameRef.current !== null) {
        window.cancelAnimationFrame(signFrameRef.current);
      }
    };
  }, []);

  const updateSignPosition = (
    element: HTMLElement,
    clientX: number,
    clientY: number,
  ) => {
    signMoveRef.current = { element, clientX, clientY };

    if (signFrameRef.current !== null) return;

    signFrameRef.current = window.requestAnimationFrame(() => {
      const nextMove = signMoveRef.current;
      if (nextMove) {
        const rect = nextMove.element.getBoundingClientRect();
        const divider = nextMove.element.querySelector<HTMLElement>(
          "[data-industry-divider]",
        );
        const dividerRect = divider?.getBoundingClientRect();
        const panelInset = 16;
        const panelWidth = Math.max(rect.width - panelInset * 2, 1);
        const xPercent = clamp(
          ((nextMove.clientX - rect.left - panelInset) / panelWidth) * 100,
          12,
          88,
        );
        const lowerBoundary = dividerRect
          ? dividerRect.top - rect.top
          : rect.height * 0.66;
        const y = clamp(nextMove.clientY - rect.top, 58, lowerBoundary - 58);

        nextMove.element.style.setProperty("--industry-sign-x", `${xPercent}%`);
        nextMove.element.style.setProperty("--industry-sign-y", `${y}px`);
      }

      signFrameRef.current = null;
    });
  };

  return (
    <section className="overflow-hidden bg-[#fafafa] px-6 py-20 md:px-10 lg:px-[60px]">
      <Reveal>
        <p className="font-mono text-base font-medium uppercase leading-[22px] tracking-[1px] text-[var(--text-secondary)]">
          BUILT FOR EVERY INDUSTRY
        </p>
        <h2 className="mt-2 font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-[var(--text-primary)] md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
          Thiết kế chuyên biệt cho từng lĩnh vực.
        </h2>
        <p className="mt-2 text-lg font-medium leading-[26px] text-[var(--text-secondary)]">
          Giải pháp thanh toán và vận hành đáp ứng nhu cầu THỰC TẾ của doanh nghiệp bạn.
        </p>
      </Reveal>
      <Reveal delay={100} className="mt-10 h-px bg-[rgba(6,6,6,0.14)]" />
      <Reveal mode="stagger" delay={140} className="mt-10 flex h-[420px] w-full gap-4 overflow-hidden pb-2">
        {industryCards.map((card, index) => {
          const active = activeIndex === index;

          return (
            <article
              key={card.title}
              style={
                {
                  "--stagger-index": index,
                  flexBasis: 0,
                  flexGrow: active ? 4 : 1,
                  flexShrink: 1,
                } as CSSProperties
              }
              onPointerEnter={(event) => {
                setActiveIndex(index);
                updateSignPosition(
                  event.currentTarget,
                  event.clientX,
                  event.clientY,
                );
              }}
              onPointerMove={(event) => {
                if (active) {
                  updateSignPosition(
                    event.currentTarget,
                    event.clientX,
                    event.clientY,
                  );
                }
              }}
              className="motion-stagger-item group relative min-w-[128px] overflow-hidden transition-[flex-grow,opacity] duration-[900ms] ease-[cubic-bezier(0.37,0,0.63,1)]"
            >
              <Image
                src={withBasePath(card.image)}
                alt={card.title}
                fill
                sizes={active ? "(min-width: 1024px) 60vw, 80vw" : "220px"}
                className={`object-cover blur-[1px] transition-transform duration-[900ms] ease-[cubic-bezier(0.37,0,0.63,1)] will-change-transform ${
                  active ? "scale-100" : "scale-[1.08]"
                }`}
              />
              <div
                className={`absolute inset-0 bg-black/25 transition-opacity duration-[900ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                  active ? "opacity-70" : "opacity-45"
                }`}
              />
              <div
                className={`absolute inset-0 bg-[linear-gradient(168deg,rgba(25,25,25,0.2)_28%,rgba(0,0,0,0.55)_92%)] transition-opacity duration-[900ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                  active ? "opacity-90" : "opacity-65"
                }`}
              />
              {active && card.sign ? (
                <p
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 animate-[industry-sign-in_700ms_cubic-bezier(0.37,0,0.63,1)_both] whitespace-nowrap font-serif text-[clamp(54px,6vw,104px)] leading-none tracking-[-0.64px] text-white will-change-[left,top]"
                  style={
                    {
                      left: "var(--industry-sign-x, 50%)",
                      top: "var(--industry-sign-y, 32%)",
                    } as CSSProperties
                  }
                >
                  {card.sign}
                </p>
              ) : null}
              <div className="absolute inset-x-4 bottom-8 text-white">
                <div
                  className={`mb-4 h-px origin-left bg-white/55 transition-[opacity,transform] duration-[760ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                    active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                  data-industry-divider
                />
                <div className={active ? "relative flex items-end gap-5" : "relative"}>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`font-medium tracking-[-0.32px] transition-[font-size,line-height,color,transform] duration-[760ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                        active
                          ? "translate-y-0 text-5xl leading-[1.08] text-white"
                          : "translate-y-2 text-[40px] leading-[1.08] text-white/64"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`max-w-[520px] overflow-hidden text-sm leading-5 tracking-[-0.12px] text-white transition-[max-height,margin,opacity,transform] duration-[760ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                        active
                          ? "mt-3 max-h-20 translate-y-0 opacity-100"
                          : "mt-0 max-h-0 translate-y-4 opacity-0"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                  <button
                    className={`shrink-0 text-sm font-medium leading-5 tracking-[-0.12px] underline underline-offset-4 transition-[opacity,transform] duration-[760ms] ease-[cubic-bezier(0.37,0,0.63,1)] hover:-translate-y-0.5 ${
                      active
                        ? "relative translate-x-0 opacity-100"
                        : "pointer-events-none absolute bottom-0 right-0 translate-x-4 opacity-0"
                    }`}
                    tabIndex={active ? 0 : -1}
                  >
                    Xem giải pháp
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </Reveal>
    </section>
  );
}
