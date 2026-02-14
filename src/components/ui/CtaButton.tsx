import type { ButtonHTMLAttributes } from "react";

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CtaButton({ className, type, ...props }: CtaButtonProps) {
  return (
    <button
      type={type ?? "button"}
      {...props}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[#de5b85] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f3453] disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
    />
  );
}
