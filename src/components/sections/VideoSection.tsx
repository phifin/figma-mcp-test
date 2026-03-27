import Image from "next/image";

import { videoImage } from "@/lib/landing-content";

export default function VideoSection() {
  return (
    <section className="ui-section relative flex h-[720px] items-center justify-center overflow-hidden">
      <Image src={videoImage} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.45)_0%,rgba(3,7,18,0.68)_100%)]" />
      <button className="relative z-10 grid h-20 w-20 place-items-center rounded-full text-4xl text-white transition-transform duration-[200ms] ease-out hover:scale-[1.02]">
        ▶
      </button>
    </section>
  );
}
