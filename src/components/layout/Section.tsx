import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  as?: "section" | "article";
};

export function Section({
  id,
  title,
  eyebrow,
  children,
  as = "section",
}: SectionProps) {
  const Tag = as;

  return (
    <Tag
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="glass-surface scroll-mt-6 p-6 md:scroll-mt-8 md:p-8"
    >
      {eyebrow ? (
        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#5f4b62]">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id ? `${id}-heading` : undefined} className="mb-4 text-2xl font-semibold md:text-3xl">
        {title}
      </h2>
      {children}
    </Tag>
  );
}
