"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  mode?: "default" | "hero";
};

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", mode = "default" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal={mode === "hero" ? "hero" : "default"} className={className} style={style}>
      {children}
    </Tag>
  );
}
