"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { deviceCards } from "@/lib/figma-assets";

type ProductShowcaseSectionProps = {
  content: Dictionary["productShowcase"];
};

export default function ProductShowcaseSection({
  content,
}: ProductShowcaseSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const currentIndex = activeIndex ?? 0;
  const canGoPrevious = activeIndex !== null && currentIndex > 0;
  const canGoNext =
    activeIndex === null || currentIndex < deviceCards.length - 1;
  const previousProduct = () =>
    setActiveIndex((current) => Math.max((current ?? 1) - 1, 0));
  const nextProduct = () =>
    setActiveIndex((current) =>
      current === null ? 0 : Math.min(current + 1, deviceCards.length - 1),
    );
  const activateProduct = (index: number) => {
    setActiveIndex((current) => (current === index ? current : index));
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const alignActiveCard = () => {
      const viewport = viewportRef.current;
      const card = cardRefs.current[activeIndex];
      if (!viewport || !card) return;

      const viewportRect = viewport.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const inset = 48;
      const overflowLeft = cardRect.left - (viewportRect.left + inset);
      const overflowRight = cardRect.right - (viewportRect.right - inset);

      if (overflowLeft < 0) {
        viewport.scrollBy({ left: overflowLeft, behavior: "smooth" });
      } else if (overflowRight > 0) {
        viewport.scrollBy({ left: overflowRight, behavior: "smooth" });
      }
    };

    alignActiveCard();
    const settleTimers = [
      window.setTimeout(alignActiveCard, 320),
      window.setTimeout(alignActiveCard, 820),
    ];

    return () => {
      settleTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [activeIndex]);

  return (
    <section className="bg-white py-20">
      <div className="flex items-end justify-between gap-8 px-6 md:px-10 lg:px-20">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-[var(--text-primary)] md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
            Thiết bị bán hàng tinh tế, tối ưu cho mọi mô hình kinh doanh.
          </h2>
          <p className="mt-4 text-base font-medium leading-6 tracking-[-0.24px] text-[var(--text-secondary)]">
            Thiết kế hiện đại, vận hành đơn giản, đáp ứng trọn vẹn nhu cầu kinh doanh của bạn.
          </p>
          <button className="mt-3 border-b border-current text-lg font-semibold leading-[26px] tracking-[-0.18px] text-[var(--text-primary)] hover:text-[var(--brand)]">
            Xem tất cả thiết bị
          </button>
        </Reveal>
        <Reveal delay={140} className="flex gap-4">
          <button
            type="button"
            onClick={previousProduct}
            disabled={!canGoPrevious}
            aria-label={content.previousLabel}
            className="grid size-12 place-items-center text-4xl leading-none text-black transition disabled:cursor-default disabled:opacity-25"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={nextProduct}
            disabled={!canGoNext}
            aria-label={content.nextLabel}
            className="grid size-12 place-items-center text-4xl leading-none text-black transition disabled:cursor-default disabled:opacity-25"
          >
            <span aria-hidden>→</span>
          </button>
        </Reveal>
      </div>

      <div
        ref={viewportRef}
        className="mt-12 overflow-hidden px-6 pb-3 scroll-smooth md:px-10 lg:px-10"
      >
        <Reveal
          mode="stagger"
          delay={120}
          className="flex items-stretch gap-6"
        >
          {deviceCards.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={item.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={
                  {
                    "--stagger-index": index,
                    transitionProperty: "width, transform, box-shadow, opacity",
                    transitionDuration: "700ms, 700ms, 700ms, 560ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.37,0,0.63,1), cubic-bezier(0.37,0,0.63,1), cubic-bezier(0.37,0,0.63,1), cubic-bezier(0.25,0.46,0.45,0.94)",
                  } as CSSProperties
                }
                onMouseMove={() => activateProduct(index)}
                onFocus={() => activateProduct(index)}
                tabIndex={0}
                className={`motion-stagger-item group relative h-[360px] shrink-0 cursor-pointer overflow-hidden bg-[#f7f6f5] outline-none transition-[width,transform,box-shadow] duration-[1000ms] ease-[cubic-bezier(0.37,0,0.63,1)] will-change-[width,transform] md:h-[400px] ${
                  isActive
                    ? "z-10 w-[min(340px,calc(100vw-48px))] -translate-y-1 shadow-[0_22px_70px_rgba(0,0,0,0.14)] md:w-[436px] lg:w-[540px]"
                    : "w-[min(320px,calc(100vw-48px))] translate-y-0 md:w-[400px] lg:w-[460px]"
                }`}
              >
                <div
                  className={`absolute inset-0 flex flex-col p-6 transition-[opacity,transform] duration-[860ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                    isActive ? "-translate-x-3 opacity-0" : "translate-x-0 opacity-100"
                  }`}
                  aria-hidden={isActive}
                >
                  <div className="relative min-h-0 flex-1">
                    <Image
                      src={withBasePath(item.image)}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 540px, (min-width: 768px) 436px, 340px"
                      className={`object-contain transition-transform duration-[1000ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                        isActive ? "scale-[1.015]" : "scale-100"
                      }`}
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-7 tracking-[-0.2px] text-[var(--text-primary)] underline underline-offset-4 transition-colors duration-300 group-hover:text-[var(--brand)]">
                    {item.title}
                  </h3>
                </div>

                <div
                  className={`absolute inset-0 transition-[opacity,transform] duration-[940ms] ease-[cubic-bezier(0.37,0,0.63,1)] ${
                    isActive ? "translate-x-0 scale-100 opacity-100" : "translate-x-4 scale-[1.025] opacity-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={withBasePath(item.hoverImage ?? item.image)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 540px, (min-width: 768px) 436px, 340px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_58%,rgba(0,0,0,0.66)_84%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-xl font-semibold leading-7 tracking-[-0.2px] text-white underline underline-offset-4">
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-[360px] text-sm font-normal leading-[18px] tracking-[-0.14px] text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-2 opacity-0"
                      }`}
                    >
                      {item.hoverDescription}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
