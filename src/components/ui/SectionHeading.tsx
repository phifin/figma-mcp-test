import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
  widthClass?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  dark = false,
  widthClass = "max-w-3xl",
}: SectionHeadingProps) {
  const alignClass = centered ? "mx-auto text-center" : "";
  const eyebrowClass = dark ? "text-white/60" : "ui-eyebrow";
  const bodyClass = dark ? "text-white/78" : "ui-body";

  return (
    <div className={`${alignClass} ${widthClass}`}>
      {eyebrow ? (
        <Reveal as="p" delay={60} className={`font-mono text-sm uppercase tracking-[0.22em] ${eyebrowClass}`}>
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal as="h2" delay={120} className={`mt-3 font-serif text-4xl leading-tight tracking-tight md:text-5xl ${dark ? "text-white" : "text-[var(--text-primary)]"}`}>
        {title}
      </Reveal>
      {description ? (
        <Reveal as="p" delay={220} className={`mt-4 text-lg ${bodyClass}`}>
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}
