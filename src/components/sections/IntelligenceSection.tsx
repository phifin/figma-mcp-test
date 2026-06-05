"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import {
  bankLogos,
  cardLogos,
  paymentVisuals,
  walletLogos,
} from "@/lib/figma-assets";

type IntelligenceSectionProps = {
  content: Dictionary["intelligence"];
};

const paymentGroups = [
  {
    title: "Tổ chức thẻ",
    description: "Visa · Mastercard · JCB · UnionPay · Napas",
    content: "cards",
  },
  {
    title: "Ngân hàng",
    description: "Kết nối mọi ngân hàng trong nước qua mạng lưới Napas / VietQR",
    content: "banks",
  },
  {
    title: "Ví điện tử",
    description:
      "MoMo · ZaloPay · ShopeePay · ViettelMoney · VNPAY · Apple Pay · Google Wallet",
    content: "wallets",
  },
] as const;

export default function IntelligenceSection({}: IntelligenceSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const centeredEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!centeredEntry) return;

        const nextIndex = Number(
          (centeredEntry.target as HTMLElement).dataset.paymentIndex,
        );

        if (Number.isNaN(nextIndex)) return;
        setActiveIndex(nextIndex);
      },
      {
        rootMargin: "-38% 0px -38% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const observedItems = itemRefs.current.filter(
      (item): item is HTMLDivElement => item !== null,
    );
    observedItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#fafafa] px-6 py-20 md:px-10 lg:px-[100px] lg:pb-[120px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="font-mono text-base font-medium uppercase leading-[22px] tracking-[1px] text-[var(--text-secondary)]">
            DẢI HỖ TRỢ THANH TOÁN
          </p>
          <h2 className="mt-2 font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-[var(--text-primary)] md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
            Chấp nhận mọi phương thức thanh toán phổ biến.
          </h2>
          <p className="mt-4 text-lg font-medium leading-[26px] text-[var(--text-secondary)]">
            Kết nối mọi Ngân hàng và Ví điện tử trên một nền tảng duy nhất.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-[560px_minmax(0,1fr)] lg:gap-[120px]">
          <Reveal mode="scale" delay={120} className="lg:sticky lg:top-[96px] lg:h-[560px]">
            <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#f7f6f5] shadow-[0_18px_44px_rgba(88,92,95,0.08)]">
              {paymentVisuals.map((visual, index) => (
                <Image
                  key={visual.title}
                  src={withBasePath(visual.image)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className={`transition-[opacity,transform] duration-500 ease-out ${
                    visual.fit === "cover" ? "object-cover" : "object-contain p-14"
                  } ${index === activeIndex ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"}`}
                  priority={index === 0}
                />
              ))}
            </div>
          </Reveal>

          <div className="lg:-mt-8">
            {paymentGroups.map((group, index) => (
              <div
                key={group.title}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-payment-index={index}
                className="flex min-h-[420px] items-center py-10 lg:min-h-[520px] lg:py-20"
              >
                <PaymentGroup
                  active={index === activeIndex}
                  title={group.title}
                  description={group.description}
                >
                  {group.content === "cards" ? <CardLogos /> : null}
                  {group.content === "banks" ? <BankChips /> : null}
                  {group.content === "wallets" ? <WalletChips /> : null}
                </PaymentGroup>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentGroup({
  title,
  description,
  children,
  active,
}: {
  title: string;
  description: string;
  children: ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={`transition-[opacity,transform] duration-500 ease-out ${
        active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-35"
      }`}
    >
      <h3 className="font-serif text-[36px] font-normal leading-[1.16] tracking-[-1.4px] text-[var(--text-primary)] md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
        {title}
      </h3>
      <p className="mt-4 text-base font-medium leading-6 tracking-[-0.24px] text-[var(--text-secondary)]">
        {description}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function CardLogos() {
  return (
    <Reveal mode="stagger" className="flex flex-wrap items-center gap-4">
      {cardLogos.map((logo, index) => (
        <span
          key={logo}
          style={{ "--stagger-index": index } as CSSProperties}
          className="motion-stagger-item relative flex h-11 min-w-16 items-center justify-center rounded-[10px] px-2"
        >
          <Image
            src={withBasePath(logo)}
            alt=""
            width={124}
            height={44}
            className="max-h-8 w-auto object-contain"
          />
        </span>
      ))}
    </Reveal>
  );
}

function BankChips() {
  return (
    <Reveal
      mode="stagger"
      style={{ "--motion-stagger": "26ms" } as CSSProperties}
      className="flex max-w-[600px] flex-wrap items-center gap-4"
    >
      {bankLogos.map((bank, index) => (
        <span
          key={bank.name}
          style={
            {
              "--stagger-index": index,
              width: `${bank.chipWidth}px`,
            } as CSSProperties
          }
          className="motion-stagger-item flex h-11 items-center justify-center rounded-[10px] bg-[rgba(233,233,233,0.24)]"
        >
          <Image
            src={withBasePath(bank.image)}
            alt={bank.name}
            width={bank.width}
            height={bank.height}
            style={{
              width: `${bank.width}px`,
              height: `${bank.height}px`,
            }}
            className="max-w-none object-contain"
          />
        </span>
      ))}
    </Reveal>
  );
}

function WalletChips() {
  return (
    <Reveal mode="stagger" className="flex flex-wrap items-center gap-5">
      {walletLogos.map((wallet, index) => (
        <span
          key={wallet.name}
          style={{ "--stagger-index": index } as CSSProperties}
          className="motion-stagger-item motion-card-lift flex size-12 items-center justify-center rounded-xl bg-white p-1 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
        >
          <Image
            src={withBasePath(wallet.image)}
            alt={wallet.name}
            width={40}
            height={40}
            className="max-h-10 w-auto object-contain"
          />
        </span>
      ))}
    </Reveal>
  );
}
