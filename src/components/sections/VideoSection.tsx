import Image from "next/image";

import { videoImage } from "@/lib/landing-content";

export default function VideoSection() {
  return (
    <section className="ui-section relative flex h-[720px] items-center justify-center overflow-hidden">
      <Image src={videoImage} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.45)_0%,rgba(3,7,18,0.68)_100%)]" />
      <button className="btn-pill btn-secondary-dark relative z-10 p-8 text-4xl text-white">
        ▶
      </button>
    </section>
  );
}
