"use client";

import { useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { accordionItems, dataImage, sectionContainer, sectionSpacing } from "@/lib/landing-content";

export default function IntelligenceSection() {
  const [openAccordions, setOpenAccordions] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setOpenAccordions((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <section className={`ui-section ui-divider ${sectionContainer} ${sectionSpacing} grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,620px)] md:gap-16`}>
      <div>
        <SectionHeading
          eyebrow="UniPay Intelligence"
          title="Kinh doanh dựa trên dữ liệu"
          description="Từ dữ liệu bán hàng đến tồn kho, hóa đơn và vận hành đa điểm bán, AI tích hợp sâu giúp doanh nghiệp đưa ra quyết định chính xác hơn mỗi ngày."
        />
        <div className="mt-10 divide-y divide-[var(--border-subtle)] rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] px-6 shadow-[var(--shadow-soft)]">
          {accordionItems.map(([title, desc], idx) => {
            const open = openAccordions.includes(idx);

            return (
              <div key={title} className="py-5">
                <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => toggleAccordion(idx)}>
                  <span className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{title}</span>
                  <span className={`relative block h-7 w-7 shrink-0 text-[var(--text-primary)] transition-transform duration-[220ms] ease-out ${open ? "rotate-90" : "rotate-0"}`} aria-hidden="true">
                    <span className="absolute left-1/2 top-1/2 h-[2.5px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    <span className={`absolute left-1/2 top-1/2 h-5 w-[2.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-[220ms] ease-out ${open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}`} />
                  </span>
                </button>
                <div className={`grid transition-all duration-[260ms] ease-out ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className={`ui-body overflow-hidden text-base transition-all duration-[260ms] ease-out ${open ? "translate-y-0" : "-translate-y-1"}`}>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Reveal delay={120} className="surface-card interactive-card relative flex items-center justify-center p-3">
        <Image src={dataImage} alt="Dữ liệu kinh doanh" width={600} height={513} className="h-auto w-full rounded-[20px] object-cover" />
      </Reveal>
    </section>
  );
}
