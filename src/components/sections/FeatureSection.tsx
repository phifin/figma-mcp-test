"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { solutionItems, solutionVisuals } from "@/lib/figma-assets";

type FeatureSectionProps = {
  content: Dictionary["feature"];
};

export default function FeatureSection({}: FeatureSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="grid bg-white lg:grid-cols-[minmax(0,1fr)_minmax(420px,700px)]">
      <div className="flex flex-col justify-center gap-16 px-6 py-16 md:px-10 lg:min-h-[706px] lg:px-[60px] lg:py-10">
        <Reveal
          as="h2"
          className="max-w-[640px] font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-[var(--text-primary)] md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]"
        >
          Một hệ sinh thái trọn bộ giải pháp. Bao quát mọi nhu cầu kinh doanh.
        </Reveal>
        <Reveal
          mode="stagger"
          delay={100}
          className="max-w-[640px] divide-y divide-[rgba(6,6,6,0.14)]"
        >
          {solutionItems.map((item, index) => {
            const open = openIndex === index;

            return (
              <div
                key={item.title}
                style={{ "--stagger-index": index } as CSSProperties}
                className="motion-stagger-item py-5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="text-xl font-semibold leading-8 tracking-[-0.1px] text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand)] md:text-2xl">
                    {index + 1}. {item.title}
                  </span>
                  <span className={`grid size-9 shrink-0 place-items-center text-3xl leading-none text-[var(--text-primary)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-180" : "rotate-0"}`}>
                    {open ? "-" : "+"}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className="overflow-hidden text-base leading-6 tracking-[-0.24px] text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
      <Reveal
        mode="right"
        delay={160}
        className="group relative min-h-[460px] overflow-hidden lg:min-h-[706px]"
      >
        {solutionVisuals.map((visual, index) => (
          <Image
            key={visual.title}
            src={withBasePath(visual.image)}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              index === openIndex
                ? "scale-100 opacity-100"
                : "scale-[1.025] opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
      </Reveal>
    </section>
  );
}
