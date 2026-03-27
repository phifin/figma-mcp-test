import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { featureImages, featureList, sectionContainer, sectionSpacing } from "@/lib/landing-content";

export default function FeatureSection() {
  return (
    <section className={`ui-section ui-divider ${sectionContainer} ${sectionSpacing} flex flex-col gap-10`}>
      <SectionHeading
        eyebrow="Point of Sale & Operations"
        title="Mọi thứ bạn cần để vận hành - kết nối trong một nền tảng."
        description="Quản lý bán hàng, thanh toán, khách hàng và báo cáo - tất cả trong một giao diện thống nhất, tối giản, dễ dàng."
        widthClass="max-w-[1240px]"
      />
      <div className="space-y-14 md:space-y-16">
        {featureList.map(([title, desc], idx) => (
          <div key={title} className="group">
            <div className="grid gap-8 border-t border-[var(--border-subtle)] pt-10 md:grid-cols-[minmax(0,480px)_minmax(0,1fr)] md:items-stretch md:gap-16">
              <Reveal delay={idx * 60 + 80} className="relative h-72 w-full overflow-hidden rounded-[24px] shadow-[var(--shadow-soft)] md:h-full md:min-h-[320px]">
                <Image src={featureImages[idx]} alt={title} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
              </Reveal>
              <Reveal delay={idx * 60 + 180} className="surface-card interactive-card flex h-full w-full flex-col justify-center p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-3xl font-semibold tracking-tight">{title}</span>
                  <span className="ui-eyebrow text-xs tracking-[0.2em] opacity-70 transition-opacity duration-[560ms] ease-out [transition-delay:120ms] group-hover:opacity-100">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <p className="ui-body mt-4 text-lg">{desc}</p>
                <button className="group mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-[200ms] ease-out hover:text-[var(--brand-strong)]">
                  <span className="relative inline-block after:absolute after:-bottom-[0.15rem] after:left-0 after:h-[1.5px] after:w-full after:bg-current after:content-['']">
                    Tìm hiểu thêm
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-[200ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M4 10L10 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M5.25 4H10V8.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
