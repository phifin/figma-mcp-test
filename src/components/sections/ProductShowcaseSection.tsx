"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { productImage, productSlides, sectionContainer, sectionSpacing } from "@/lib/landing-content";

export default function ProductShowcaseSection() {
  const [productIndex, setProductIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSettledIndex(productIndex);
    }, 460);

    return () => window.clearTimeout(timeout);
  }, [productIndex]);

  const prevProduct = () => setProductIndex((p) => (p - 1 + productSlides.length) % productSlides.length);
  const nextProduct = () => setProductIndex((p) => (p + 1) % productSlides.length);

  return (
    <section className={`ui-section ui-divider ${sectionContainer} ${sectionSpacing} flex flex-col gap-8`}>
      <SectionHeading
        centered
        title="Thiết kế bền bỉ - Chế tác tinh tế"
        description="Phần cứng tối giản, vật liệu cao cấp được thiết kế cho sự chính xác trong mọi thao tác."
      />
      <Reveal className="surface-card relative overflow-hidden p-4 md:p-5">
        <div className="flex transition-transform duration-[420ms] ease-in-out" style={{ transform: `translateX(-${productIndex * 100}%)` }}>
          {productSlides.map(([title, desc], idx) => (
            <div key={title} className="grid min-w-full gap-8 md:grid-cols-[minmax(0,1fr)_487px] md:gap-12">
              <div className={`interactive-card rounded-[24px] bg-[var(--surface-subtle)] p-6 transition-all duration-[260ms] ease-out ${settledIndex === idx ? "translate-y-0 opacity-100 [transition-delay:100ms]" : "translate-y-3 opacity-0"}`}>
                <h3 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{title}</h3>
                <p className="ui-body mt-4">{desc}</p>
                <button className="link-animated mt-6 text-sm font-medium">
                  Xem chi tiết
                  <span className="link-arrow">→</span>
                </button>
              </div>
              <Image src={productImage} alt={title} width={487} height={390} className="h-[390px] w-full rounded-[24px] object-cover shadow-[var(--shadow-soft)]" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 rounded-t-full border border-[var(--border-subtle)] bg-white/92 shadow-[var(--shadow-soft)] backdrop-blur-sm">
          <button onClick={prevProduct} className="h-10 w-12 rounded-tl-full text-xl text-[var(--text-primary)] hover:text-[var(--brand)]">
            ←
          </button>
          <button onClick={nextProduct} className="h-10 w-12 rounded-tr-full text-xl text-[var(--text-primary)] hover:text-[var(--brand)]">
            →
          </button>
        </div>
      </Reveal>
    </section>
  );
}
