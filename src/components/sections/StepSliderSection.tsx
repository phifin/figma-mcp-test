"use client";

import { useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { figmaImage } from "@/lib/figma-assets";

type StepSliderSectionProps = {
  content: Dictionary["steps"];
};

const stepImages = [
  figmaImage("step-1.png"),
  figmaImage("step-2.png"),
  figmaImage("step-3.png"),
];

export default function StepSliderSection({ content }: StepSliderSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < content.items.length - 1;
  const previousSlide = () => setActiveIndex((current) => Math.max(current - 1, 0));
  const nextSlide = () =>
    setActiveIndex((current) => Math.min(current + 1, content.items.length - 1));

  return (
    <section className="bg-white py-20">
      <div className="flex items-end justify-between gap-8 px-6 md:px-10 lg:px-20">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-[var(--text-primary)] md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
            {content.title}
          </h2>
          <p className="mt-4 text-lg font-medium leading-[26px] text-[var(--text-secondary)]">
            {content.description}
          </p>
        </Reveal>
        <Reveal delay={140} className="flex gap-4">
          <button
            type="button"
            onClick={previousSlide}
            disabled={!canGoPrevious}
            aria-label={content.previousLabel}
            className="grid size-12 place-items-center text-4xl leading-none text-black transition disabled:cursor-default disabled:opacity-25"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={!canGoNext}
            aria-label={content.nextLabel}
            className="grid size-12 place-items-center text-4xl leading-none text-black transition disabled:cursor-default disabled:opacity-25"
          >
            <span aria-hidden>→</span>
          </button>
        </Reveal>
      </div>

      <Reveal
        mode="scale"
        delay={160}
        className="mx-auto mt-16 max-w-[1440px] px-6 pb-2 md:px-10 lg:px-20"
      >
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 24}px))`,
            }}
          >
            {content.items.map((step, index) => (
              <div key={step.title} className="w-full shrink-0">
                <article className="group grid h-auto min-h-[500px] w-full gap-8 overflow-hidden rounded-2xl bg-[#f5f5f5] px-7 py-10 md:grid-cols-[minmax(0,1fr)_400px] md:items-end md:gap-16 md:px-20 md:pb-20 md:pt-20">
                  <div className="flex h-full flex-col justify-between gap-12 md:pb-0">
                    <p className="font-serif text-[72px] font-normal leading-[1.1] tracking-[-3px] text-[#1a1a1a] md:text-[80px] md:tracking-[-3.8px]">
                      {step.number}
                    </p>
                    <div>
                      <h3 className="text-[32px] font-semibold leading-9 text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[560px] text-base leading-6 tracking-[-0.24px] text-[var(--text-primary)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative min-h-[300px] overflow-hidden rounded-t-[24px] border-[12px] border-white/60 shadow-[0_16px_32px_-12px_rgba(88,92,95,0.1)] md:h-[376px]">
                    <Image
                      src={withBasePath(stepImages[index])}
                      alt={step.title}
                      fill
                      sizes="400px"
                      className="motion-image-zoom object-cover"
                    />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {content.items.map((step, index) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Đi tới ${step.title}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-[#1a1a1a]" : "w-1.5 bg-[#1a1a1a]/25"
              }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
