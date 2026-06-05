import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import { withBasePath } from "@/lib/base-path";
import { figmaImage } from "@/lib/figma-assets";

export default function VideoSection() {
  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden px-6 py-20 text-white md:min-h-[900px] md:px-[70px] md:py-[100px]">
      <Image
        src={withBasePath(figmaImage("ai-assistant.png"))}
        alt=""
        fill
        priority
        sizes="100vw"
        className="motion-hero-media object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />
      <Reveal className="relative z-10 max-w-[640px]">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-serif text-[38px] font-normal leading-[1.15] tracking-[-1.6px] text-white md:text-5xl md:leading-[1.2] md:tracking-[-1.8px]">
            Trợ lý AI thông minh
          </h2>
          <span className="rounded bg-white/16 px-2 py-2 text-lg font-semibold leading-none tracking-[1.44px] backdrop-blur-[1.5px]">
            SẮP RA MẮT
          </span>
        </div>
        <p className="mt-4 max-w-[580px] text-base font-medium leading-6 tracking-[-0.24px] text-white">
          Hỏi UniPay AI bất cứ điều gì về hoạt động kinh doanh của bạn để nhận những gợi ý thiết thực ngay lập tức.
        </p>
        <button className="mt-3 border-b border-white text-lg font-semibold leading-[26px] tracking-[-0.18px] text-white hover:-translate-y-0.5">
          Tìm hiểu thêm
        </button>
      </Reveal>
    </section>
  );
}
