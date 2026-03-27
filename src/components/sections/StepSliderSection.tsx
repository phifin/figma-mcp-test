"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { sectionContainer, sectionSpacing, stepImages, steps } from "@/lib/landing-content";

export default function StepSliderSection() {
  const [stepIndex, setStepIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => setViewportWidth(viewport.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  const prevStep = () => setStepIndex((s) => (s - 1 + steps.length) % steps.length);
  const nextStep = () => setStepIndex((s) => (s + 1) % steps.length);
  const isDesktop = viewportWidth >= 768;
  const previewWidth = viewportWidth ? (isDesktop ? 96 : 36) : 96;
  const slideGap = isDesktop ? 24 : 16;
  const slideWidth = viewportWidth ? Math.max(viewportWidth - previewWidth, 0) : 0;
  const translateX = slideWidth ? stepIndex * (slideWidth + slideGap) : 0;
  const slidesWithPreview = [...steps.map((step, idx) => ({ step, image: stepImages[idx], clone: false })), { step: steps[0], image: stepImages[0], clone: true }];

  return (
    <section className={`ui-section ui-divider ${sectionContainer} ${sectionSpacing} flex flex-col gap-10`}>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          title="Chọn cách bắt đầu phù hợp với doanh nghiệp của bạn"
          description="Từ cửa hàng nhỏ đến chuỗi nhiều điểm bán, UniPay giúp bạn bắt đầu nhanh, triển khai đơn giản và mở rộng theo nhu cầu thực tế."
        />
        <Reveal delay={180} className="flex gap-2.5">
          <button
            onClick={prevStep}
            aria-label="Bước trước"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(15,23,42,0.1)] bg-[rgba(246,248,251,0.92)] text-[var(--text-primary)] transition-all duration-300 ease-out hover:border-[rgba(37,99,235,0.18)] hover:bg-white hover:text-[var(--brand)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14.5 6.5L9 12L14.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextStep}
            aria-label="Bước tiếp theo"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(15,23,42,0.1)] bg-[rgba(246,248,251,0.92)] text-[var(--text-primary)] transition-all duration-300 ease-out hover:border-[rgba(37,99,235,0.18)] hover:bg-white hover:text-[var(--brand)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9.5 6.5L15 12L9.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Reveal>
      </div>
      <Reveal className="overflow-hidden rounded-[32px]">
        <div ref={viewportRef} className="overflow-hidden rounded-[32px]">
          <div className="flex gap-4 transition-transform duration-[420ms] ease-in-out md:gap-6" style={{ transform: `translateX(-${translateX}px)` }}>
            {slidesWithPreview.map(({ step, image, clone }, idx) => {
              const [no, title, desc] = step;
              const isActive = idx === stepIndex;

              return (
                <div
                  key={`${title}-${clone ? "preview" : idx}`}
                  className={`w-[calc(100%-2.25rem)] shrink-0 transition-[opacity,transform] duration-[260ms] ease-out md:w-[calc(100%-6rem)] ${isActive ? "scale-[1.01] opacity-100" : "scale-[0.995] opacity-88"}`}
                  style={slideWidth ? { width: `${slideWidth}px` } : undefined}
                >
                  <article className="grid min-h-[500px] items-center gap-10 overflow-hidden rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-[#f4f5f1] px-8 py-8 shadow-[0_22px_56px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] md:gap-12 md:px-14 md:py-14">
                    <div className="flex flex-col justify-center">
                      <p className="text-7xl font-bold tracking-tight text-[var(--text-primary)] md:text-[88px]">{no}</p>
                      <h3 className="mt-12 text-4xl font-semibold tracking-tight text-[var(--text-primary)] md:text-[44px]">{title}</h3>
                      <p className="ui-body mt-3 max-w-xl">{desc}</p>
                    </div>
                    <div className="relative h-[320px] w-full self-stretch overflow-hidden rounded-[26px] md:h-full md:min-h-[372px]">
                      <Image src={image} alt={title} fill sizes="(min-width: 768px) 36vw, 100vw" className="object-cover object-center" />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
