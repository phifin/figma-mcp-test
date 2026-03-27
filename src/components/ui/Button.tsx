import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondaryDark";
  className?: string;
};

export default function Button({ children, variant = "primary", className = "" }: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondaryDark"
        ? "btn-secondary-dark"
        : "btn-secondary";

  return <button className={`btn-pill cursor-pointer ${variantClass} ${className}`}>{children}</button>;
}
