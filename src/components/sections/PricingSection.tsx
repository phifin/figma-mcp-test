import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";
import { sectionContainer, sectionSpacing } from "@/lib/landing-content";

type PricingSectionProps = {
  content: Dictionary["pricing"];
};

export default function PricingSection({ content }: PricingSectionProps) {
  return (
    <section
      className={`ui-section bg-[var(--surface-subtle)] ${sectionSpacing}`}
    >
      <div className={sectionContainer}>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {content.plans.map((plan, idx) => (
            <Reveal key={plan.name} delay={idx * 80}>
              <article
                className={`flex h-[520px] flex-col rounded-[24px] p-6 ${
                  plan.featured
                    ? "border-blue-800 border-[3px] bg-white shadow-[0_24px_64px_rgba(37,99,235,0.16)] transition-[transform,box-shadow] duration-[200ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_28px_72px_rgba(37,99,235,0.18)]"
                    : "interactive-card border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.9)] shadow-[0_18px_42px_rgba(15,23,42,0.05)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {plan.name}
                    </h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-strong)]">
                        {content.featuredBadge}
                      </span>
                    ) : null}
                  </div>
                  <p className="ui-body mt-4">{plan.description}</p>
                </div>
                <div className="my-6 border-t border-[var(--border-subtle)]" />
                <div className="flex-1">
                  <p className="text-6xl leading-none tracking-tight text-[var(--text-primary)]">
                    {plan.price}{" "}
                    <span className="text-4xl text-[var(--text-muted)]">
                      {plan.unit}
                    </span>
                  </p>
                  <p className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
                    {plan.suffix}
                  </p>
                </div>
                <Button
                  variant={plan.featured ? "primary" : "secondary"}
                  className={`h-14 w-full text-lg ${plan.featured ? "" : "border-[rgba(15,23,42,0.1)] bg-white/80 text-[var(--text-primary)] shadow-[0_10px_24px_rgba(15,23,42,0.06)]"}`}
                >
                  {plan.cta}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
