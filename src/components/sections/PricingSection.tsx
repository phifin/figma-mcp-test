import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { pricingPlans } from "@/lib/figma-assets";

type PricingSectionProps = {
  content: Dictionary["pricing"];
};

export default function PricingSection({}: PricingSectionProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#2e2e2e_5%,#1a1a1a_48%)] px-6 py-10 text-white md:px-[60px]">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-base font-medium uppercase leading-[22px] tracking-[1px] text-[#b9bbbd]">
            GÓI giải pháp
          </p>
          <h2 className="mt-2 font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-white md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
            Chọn gói phù hợp với quy mô cửa hàng.
          </h2>
          <p className="mt-4 max-w-[703px] text-lg font-medium leading-[26px] text-[#b9bbbd]">
            Càng mở rộng, hệ thiết bị càng linh hoạt - thanh toán, in hóa đơn đến quầy tự phục vụ, mở rộng theo nhu cầu thực tế.
          </p>
        </Reveal>

        <Reveal mode="stagger" delay={120} className="mt-[88px] grid gap-10 lg:grid-cols-3 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <article
              key={plan.name}
              style={{ "--stagger-index": index } as CSSProperties}
              className={`motion-card-lift motion-stagger-item flex min-h-[560px] flex-col border-l border-white/80 px-6 md:px-8 ${index === 1 ? "lg:scale-[1.02]" : ""}`}
            >
              <div>
                <h3 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.3px] text-white md:text-[32px] lg:text-[30px] 2xl:whitespace-nowrap">
                  {plan.name}
                </h3>
                <p className="mt-2 min-h-[52px] text-lg font-medium leading-[26px] tracking-[-0.18px] text-[#80848b]">
                  {plan.description}
                </p>
              </div>
              <div className="my-8 h-px bg-white/45" />
              <div className="flex flex-1 flex-col justify-between gap-10 pt-6">
                <div className="space-y-2">
                  {plan.features.map(([label, value]) => (
                    <div key={label} className="flex gap-6 border-b border-white/10 pb-2 last:border-b-0">
                      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white/10">
                        <span className="size-3 rounded-[2px] border border-white/60" />
                      </span>
                      <div className="text-lg font-medium leading-[26px] tracking-[-0.18px]">
                        <p className="text-base leading-6 text-[#b9bbbd]">{label}</p>
                        <p className="mt-1 text-white">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="motion-button h-14 rounded-full bg-white px-5 text-lg font-medium leading-[26px] text-[var(--brand)]">
                    Mua ngay
                  </button>
                  <button className="motion-button h-14 rounded-full bg-[var(--brand)] px-5 text-lg font-medium leading-[26px] text-white">
                    Đăng ký tư vấn
                  </button>
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal as="p" delay={120} className="mt-14 text-center text-lg italic leading-[26px] text-[#b9bbbd]">
          * Phí thẻ tùy theo ngành hàng - liên hệ để nhận mức cụ thể. Hết HĐ tặng? Xem biểu phí tại{" "}
          <span className="font-semibold not-italic text-white underline">Bảng giá</span>
        </Reveal>
      </div>
    </section>
  );
}
