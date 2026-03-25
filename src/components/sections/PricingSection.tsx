import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  pricing,
  sectionContainer,
  sectionSpacing,
} from "@/lib/landing-content";

export default function PricingSection() {
  return (
    <section
      className={`ui-section bg-[var(--surface-subtle)] ${sectionSpacing}`}
    >
      <div className={sectionContainer}>
        <SectionHeading
          eyebrow="Bảng giá"
          title="Các gói dành cho doanh nghiệp"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pricing.map(([name, desc, price, unit, suffix, cta], idx) => (
            <Reveal key={name} delay={idx * 80}>
              <article
                className={`interactive-card flex h-[520px] flex-col rounded-[24px]  p-6 ${
                  idx === 1
                    ? "border-blue-800 border-[3px] bg-white shadow-[0_24px_64px_rgba(37,99,235,0.16)]"
                    : "border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.9)] shadow-[0_18px_42px_rgba(15,23,42,0.05)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {name}
                    </h3>
                    {idx === 1 ? (
                      <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-strong)]">
                        PHỔ BIẾN NHẤT
                      </span>
                    ) : null}
                  </div>
                  <p className="ui-body mt-4">{desc}</p>
                </div>
                <div className="my-6 border-t border-[var(--border-subtle)]" />
                <div className="flex-1">
                  <p className="text-6xl leading-none tracking-tight text-[var(--text-primary)]">
                    {price}{" "}
                    <span className="text-4xl text-[var(--text-muted)]">
                      {unit}
                    </span>
                  </p>
                  <p className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
                    {suffix}
                  </p>
                </div>
                <Button
                  variant={idx === 1 ? "primary" : "secondary"}
                  className={`h-14 w-full text-lg ${idx === 1 ? "" : "border-[rgba(15,23,42,0.1)] bg-white/80 text-[var(--text-primary)] shadow-[0_10px_24px_rgba(15,23,42,0.06)]"}`}
                >
                  {cta}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
