import Image from "next/image";

import type { Dictionary } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";
import { sectionContainer } from "@/lib/landing-content";

type FooterProps = {
  content: Dictionary["footer"];
};

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-black text-white">
      <div className={`${sectionContainer} pb-6 pt-12`}>
        <div className="grid gap-12 md:grid-cols-[minmax(680px,1.7fr)_minmax(0,0.85fr)] md:items-start md:gap-14 lg:gap-18">
          <div className="max-w-none">
            <Image
              src={withBasePath("/unipay-logo.svg")}
              alt="Unipay logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-[620px] text-[22px] font-semibold leading-tight">
              {content.companyName}
            </p>
            <p className="mt-4 w-full max-w-none text-sm leading-6 text-white/60">
              {content.address}
            </p>
            <p className="mt-5 text-sm text-white/85">{content.contact}</p>
          </div>
          <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-20">
            {content.groups.map((group) => (
              <div key={group.title}>
                <p className="text-base font-semibold text-white/60">
                  {group.title}
                </p>
                {group.links.map((link, index) => (
                  <p
                    key={link}
                    className={index === 0 ? "mt-4 text-sm text-white/90" : "mt-2.5 text-sm text-white/90"}
                  >
                    {link}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 border-t border-white/14 pt-6 text-sm text-white/80 md:grid-cols-[minmax(680px,1.7fr)_minmax(0,0.85fr)] md:items-center">
          <div className="flex flex-wrap gap-5">
            {content.legalLinks.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="flex gap-3 md:justify-self-end">
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16">
              f
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16">
              x
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16">
              in
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
