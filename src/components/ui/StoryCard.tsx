import type { ReactNode } from "react";

type StoryCardProps = {
  title?: string;
  children: ReactNode;
};

export function StoryCard({ title, children }: StoryCardProps) {
  return (
    <article
      aria-label={title}
      className="w-full min-w-0 rounded-2xl border border-white/60 bg-white/75 p-5 shadow-sm"
    >
      {children}
    </article>
  );
}
