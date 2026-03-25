"use client";

import { useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { industries, industryImages, sectionContainer, sectionSpacing } from "@/lib/landing-content";

export default function IndustrySection() {
  const [industryIndex, setIndustryIndex] = useState(0);

  return (
    <section className={`ui-section bg-[var(--surface-subtle)] ${sectionSpacing}`}>
      <div className={`${sectionContainer} flex flex-col gap-10`}>
        <div className="flex items-end justify-between gap-8">
          <SectionHeading eyebrow="Built for every industry" title="Một nền tảng phù hợp với nhiều ngành nghề" />
          <Reveal as="span" delay={180} className="hidden text-5xl text-[var(--brand)] md:block">
            ✱
          </Reveal>
        </div>
        <div className="flex h-[420px] gap-4">
          {industries.map(([title, desc], idx) => {
            const active = idx === industryIndex;

            return (
              <div
                key={title}
                onMouseEnter={() => setIndustryIndex(idx)}
                className="interactive-card relative overflow-hidden rounded-[24px] transition-[flex-grow,transform,box-shadow] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ flexGrow: active ? 1.65 : 1, flexBasis: 0 }}
              >
                <Image src={industryImages[idx]} alt={title} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015]" />
                <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10 transition-opacity duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? "opacity-100" : "opacity-85"}`} />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                  <h3 className={`font-medium tracking-tight transition-all duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? "text-5xl" : "text-3xl text-white/72"}`}>{title}</h3>
                  <p className={`mt-3 max-w-xl text-sm text-white/88 transition-all duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-2 opacity-0 delay-0"}`}>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
