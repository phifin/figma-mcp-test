import type { CSSProperties } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { trustCards } from "@/lib/figma-assets";

type SecuritySectionProps = {
  content: Dictionary["security"];
};

export default function SecuritySection({}: SecuritySectionProps) {
  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-[100px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <p className="font-mono text-base font-medium uppercase leading-[22px] tracking-[1px] text-[var(--text-secondary)]">
            DẢI TIN CẬY
          </p>
          <h2 className="mt-2 font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-[#1e2022] md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
            Nền tảng được tin tưởng bởi doanh nghiệp và đối tác hàng đầu.
          </h2>
        </Reveal>

        <Reveal mode="stagger" delay={120} className="mt-20 grid gap-14 md:grid-cols-3 md:items-start md:justify-between">
          {trustCards.map((card, index) => (
            <article
              key={card.title}
              style={{ "--stagger-index": index } as CSSProperties}
              className={`motion-stagger-item mx-auto flex w-full max-w-[300px] flex-col gap-6 ${index === 1 ? "md:mt-20" : ""}`}
            >
              <div className={`${index === 1 ? "h-[300px]" : index === 0 ? "h-[200px]" : "h-[300px]"} motion-float-soft relative w-full`} style={{ "--float-delay": `${index * 180}ms` } as CSSProperties}>
                {card.badges ? (
                  <div className="flex h-full flex-col items-center justify-center gap-6">
                    <Image
                      src={withBasePath(card.image)}
                      alt=""
                      width={151}
                      height={120}
                      className="h-auto w-[151px] object-contain"
                    />
                    <div className="flex items-center gap-6">
                      {card.badges.map((badge) => (
                        <Image key={badge} src={withBasePath(badge)} alt="" width={120} height={120} className="size-[120px] object-contain" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <Image
                    src={withBasePath(card.image)}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="text-[22px] font-medium leading-8 text-[#707070]">
                {card.title}
              </h3>
              <p className="text-base font-semibold leading-5 text-[#1e2022]">
                {card.description}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
