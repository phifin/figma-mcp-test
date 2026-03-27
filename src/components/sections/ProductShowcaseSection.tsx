"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { sectionContainer, sectionSpacing } from "@/lib/landing-content";

const IMAGE_TRANSITION_MS = 1000000;
const TEXT_TRANSITION_MS = Math.max(
  340,
  Math.min(IMAGE_TRANSITION_MS * 0.48, 1400),
);

type ProductShowcaseSectionProps = {
  content: Dictionary["productShowcase"];
};

export default function ProductShowcaseSection({
  content,
}: ProductShowcaseSectionProps) {
  const [productIndex, setProductIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(
    null,
  );
  const [imageTransitionActive, setImageTransitionActive] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [textEntering, setTextEntering] = useState(true);
  const [incomingImageReady, setIncomingImageReady] = useState(true);
  const imageTimeoutRef = useRef<number | null>(null);
  const contentTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (imageTimeoutRef.current !== null) {
        window.clearTimeout(imageTimeoutRef.current);
      }
      if (contentTimeoutRef.current !== null) {
        window.clearTimeout(contentTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!imageTransitionActive || previousImageIndex === null) return;

    imageTimeoutRef.current = window.setTimeout(() => {
      setPreviousImageIndex(null);
      setImageTransitionActive(false);
      imageTimeoutRef.current = null;
    }, IMAGE_TRANSITION_MS);

    return () => {
      if (imageTimeoutRef.current !== null) {
        window.clearTimeout(imageTimeoutRef.current);
        imageTimeoutRef.current = null;
      }
    };
  }, [imageTransitionActive, previousImageIndex]);

  const goToProduct = (nextIndex: number, nextDirection: 1 | -1) => {
    if (nextIndex === productIndex) return;

    if (imageTimeoutRef.current !== null) {
      window.clearTimeout(imageTimeoutRef.current);
      imageTimeoutRef.current = null;
    }
    if (contentTimeoutRef.current !== null) {
      window.clearTimeout(contentTimeoutRef.current);
      contentTimeoutRef.current = null;
    }

    setPreviousImageIndex(productIndex);
    setProductIndex(nextIndex);
    setImageTransitionActive(false);
    setIncomingImageReady(false);
    setTextVisible(false);
    setTextEntering(true);

    contentTimeoutRef.current = window.setTimeout(() => {
      setContentIndex(nextIndex);
      setTextVisible(true);
      setTextEntering(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTextEntering(true);
        });
      });
      contentTimeoutRef.current = null;
    }, 120);
  };

  const prevProduct = () =>
    goToProduct(
      (productIndex - 1 + content.slides.length) % content.slides.length,
      -1,
    );
  const nextProduct = () =>
    goToProduct((productIndex + 1) % content.slides.length, 1);

  const { title, description } = content.slides[contentIndex];
  const progressWidth = `${((productIndex + 1) / content.slides.length) * 100}%`;
  const currentImage = withBasePath(
    `/images/product-showcase/${productIndex + 1}.png`,
  );
  const previousImage =
    previousImageIndex !== null
      ? withBasePath(`/images/product-showcase/${previousImageIndex + 1}.png`)
      : null;
  const imageTransitionStyle: CSSProperties = {
    transitionDuration: `${IMAGE_TRANSITION_MS}ms`,
  };
  const textTransitionStyle: CSSProperties = {
    transitionDuration: `${TEXT_TRANSITION_MS}ms`,
  };

  return (
    <section
      className={`ui-section ui-divider ${sectionContainer} ${sectionSpacing} flex flex-col gap-8`}
    >
      <SectionHeading
        centered
        title={content.title}
        description={content.description}
      />
      <Reveal className="relative rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.54)]">
        <div className="px-4 pb-4 pt-4 md:px-5 md:pb-5 md:pt-5">
          <div className="grid gap-8 rounded-[26px] pb-12 md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] md:gap-12 md:pb-14">
            <div className="surface-card flex min-h-[390px] flex-col rounded-[24px] p-6">
              <div className="relative min-h-[220px]">
                <div
                  key={contentIndex}
                  style={textTransitionStyle}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[340ms] ease-out ${
                    textVisible
                      ? textEntering
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[10px] opacity-0"
                      : "translate-y-0 opacity-0"
                  }`}
                >
                  <h3 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <div className="mt-5 h-px w-full bg-[rgba(15,23,42,0.18)]" />
                  <p className="ui-body mt-5">{description}</p>
                  <button className="group mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--text-primary)] transition-colors duration-[200ms] ease-out hover:text-[var(--brand-strong)]">
                    <span className="relative inline-block after:absolute after:-bottom-[0.15rem] after:left-0 after:h-[1.5px] after:w-full after:bg-current after:content-['']">
                      {content.viewDetails}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-[200ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path
                        d="M4 10L10 4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5.25 4H10V8.75"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="h-[2px] w-full rounded-full bg-[rgba(15,23,42,0.08)]">
                  <div
                    className="h-full rounded-full bg-[var(--text-primary)] transition-[width] duration-[420ms] ease-in-out"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>

            <div className="relative min-h-[390px] overflow-hidden rounded-[24px]">
              {previousImage ? (
                <Image
                  src={previousImage}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  style={imageTransitionStyle}
                  className={`object-contain object-center p-5 transition-[opacity,transform] duration-[1280ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] md:p-7 ${
                    imageTransitionActive
                      ? "translate-y-[4px] opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                />
              ) : null}
              <Image
                src={currentImage}
                alt={title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                onLoad={() => {
                  if (!incomingImageReady && previousImageIndex !== null) {
                    setIncomingImageReady(true);
                    requestAnimationFrame(() => {
                      setImageTransitionActive(true);
                    });
                  }
                }}
                style={imageTransitionStyle}
                className={`object-contain object-center p-5 transition-[opacity,transform] duration-[1280ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] md:p-7 ${
                  previousImageIndex === null
                    ? "translate-y-0 opacity-100"
                    : incomingImageReady && imageTransitionActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[4px] opacity-0"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
          <div className="pointer-events-auto relative -mb-px translate-y-1/2">
            <div
              className="absolute inset-x-0 -top-3 bottom-1/2 rounded-t-full bg-white"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-1 rounded-full border border-[rgba(15,23,42,0.08)] bg-white p-1">
              <button
                onClick={prevProduct}
                aria-label={content.previousLabel}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-[var(--text-primary)] transition-all duration-[200ms] ease-out hover:bg-[var(--surface-subtle)] hover:text-[var(--brand)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14.5 6.5L9 12L14.5 17.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={nextProduct}
                aria-label={content.nextLabel}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-[var(--text-primary)] transition-all duration-[200ms] ease-out hover:bg-[var(--surface-subtle)] hover:text-[var(--brand)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9.5 6.5L15 12L9.5 17.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
