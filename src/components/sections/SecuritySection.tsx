"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { sectionContainer, trustLogos } from "@/lib/landing-content";

type SecuritySectionProps = {
  content: Dictionary["security"];
};

export default function SecuritySection({ content }: SecuritySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [animateSpread, setAnimateSpread] = useState(false);

  useEffect(() => {
    if (!expanded) return;

    const frame = requestAnimationFrame(() => {
      setAnimateSpread(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [expanded]);

  const defaultLogo = trustLogos[3];
  const handleExpand = () => {
    if (expanded) return;
    setExpanded(true);
  };

  return (
    <section className="ui-section bg-black py-24 md:py-32">
      <div className={`${sectionContainer} flex flex-col items-center gap-16`}>
        <SectionHeading
          centered
          dark
          title={content.title}
          description={content.description}
        />
        <Reveal delay={120} className="w-full">
          {expanded ? (
            <div className="grid w-full gap-6 md:grid-cols-4">
              {trustLogos.map((logo, idx) => (
                <div
                  key={logo.name}
                  className={`transition-all duration-[480ms] ease-out ${
                    animateSpread ? "translate-x-0 translate-y-0 scale-100 opacity-100" : idx < 2 ? "-translate-x-8 scale-[0.96] opacity-0" : "translate-x-8 scale-[0.96] opacity-0"
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="interactive-card flex h-56 items-center justify-center rounded-[24px] border border-white/12 bg-white p-2 shadow-[0_18px_44px_rgba(0,0,0,0.22)] md:h-60 md:p-3">
                    <Image src={withBasePath(logo.src)} alt={logo.name} width={320} height={200} className="h-full w-full object-contain" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex w-full justify-center outline-none"
              onMouseEnter={handleExpand}
              onFocusCapture={handleExpand}
              tabIndex={0}
            >
              <div className="w-full max-w-[286px] md:max-w-[280px]">
                <div className="interactive-card flex h-56 items-center justify-center rounded-[24px] border border-white/12 bg-white p-2 shadow-[0_18px_44px_rgba(0,0,0,0.22)] md:h-60 md:p-3">
                  <Image src={withBasePath(defaultLogo.src)} alt={defaultLogo.name} width={320} height={200} className="h-full w-full object-contain" />
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
