"use client";

import confetti from "canvas-confetti";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ModalShell } from "@/components/ui/ModalShell";
import { StoryCard } from "@/components/ui/StoryCard";
import {
  confessionBlocks,
  proposalOptions,
  storyMeta,
  timelineItems,
} from "@/content/story";
import { trackEvent } from "@/lib/analytics";
import type { CelebrationState, ProposalState, UnlockState } from "@/types/story";

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function MainStoryExperience() {
  const actOneRef = useRef<HTMLDivElement | null>(null);
  const actTwoRef = useRef<HTMLDivElement | null>(null);
  const actThreeRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotionPreference();
  const [proposalState, setProposalState] = useState<ProposalState>("idle");
  const [celebrationState, setCelebrationState] = useState<CelebrationState>("off");
  const [unlockState, setUnlockState] = useState<UnlockState>("locked");
  const [actIUnlocked, setActIUnlocked] = useState(false);
  const [actICompleted, setActICompleted] = useState(false);
  const [actIIUnlocked, setActIIUnlocked] = useState(false);
  const [actIICompleted, setActIICompleted] = useState(false);
  const [actIIIUnlocked, setActIIIUnlocked] = useState(false);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [tryAgainCount, setTryAgainCount] = useState(0);
  const chapterUnlockDate = useMemo(() => new Date(2026, 1, 15, 0, 0, 0, 0), []);

  const confessionText = useMemo(
    () => confessionBlocks.map((block) => block.text).join("\n\n"),
    [],
  );

  useEffect(() => {
    if (reducedMotion) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedCharacters(index);
      if (index >= confessionText.length) {
        window.clearInterval(timer);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [confessionText, reducedMotion]);

  useEffect(() => {
    if (Date.now() >= chapterUnlockDate.getTime()) {
      setUnlockState("unlocked");
      return;
    }

    const unlockTimer = window.setTimeout(() => {
      setUnlockState("unlocked");
    }, chapterUnlockDate.getTime() - Date.now());

    return () => window.clearTimeout(unlockTimer);
  }, [chapterUnlockDate]);

  const displayedConfession = reducedMotion
    ? confessionText
    : confessionText.slice(0, typedCharacters);
  const isTyping = !reducedMotion && typedCharacters < confessionText.length;

  const scrollToSection = (
    ref: RefObject<HTMLElement | HTMLDivElement | null>,
    block: ScrollLogicalPosition = "start",
  ) => {
    ref.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block,
    });
  };

  const handleStartStory = () => {
    setActIUnlocked(true);
    trackEvent({
      name: "story_start",
      route: "/",
      timestamp: new Date().toISOString(),
    });
    window.setTimeout(() => scrollToSection(actOneRef), 0);
  };

  const handleCompleteActI = () => {
    setActICompleted(true);
    setActIIUnlocked(true);
    window.setTimeout(() => scrollToSection(actTwoRef, "center"), 0);
  };

  const handleCompleteActII = () => {
    setActIICompleted(true);
    setActIIIUnlocked(true);
    window.setTimeout(() => scrollToSection(actThreeRef), 0);
  };

  const triggerCelebration = () => {
    setProposalState("answered");
    setCelebrationState("active");

    if (!reducedMotion) {
      confetti({ particleCount: 120, spread: 88, origin: { y: 0.7 } });
      confetti({ particleCount: 60, spread: 80, origin: { x: 0.2, y: 0.65 } });
      confetti({ particleCount: 60, spread: 80, origin: { x: 0.8, y: 0.65 } });
    }

    trackEvent({
      name: "celebration_shown",
      route: "/",
      timestamp: new Date().toISOString(),
    });
    window.setTimeout(() => setCelebrationState("completed"), 1400);
  };

  const handleProposalOption = (optionId: "yes" | "of-course" | "try-again") => {
    trackEvent({
      name: "proposal_option_selected",
      route: "/",
      timestamp: new Date().toISOString(),
      optionId,
    });

    if (optionId === "try-again") {
      setTryAgainCount((value) => value + 1);
      setProposalState("open");
      return;
    }

    triggerCelebration();
  };

  return (
    <main>
      <header className="glass-surface mb-8 flex min-h-[420px] flex-col items-center justify-center p-8 text-center md:mb-10 md:min-h-[520px] md:p-14">
        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#5f4b62]">
          Opening Scene
        </p>
        <figure className="mb-6 w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-[#fff6fa] p-2">
          <Image
            src="/images/begin.png"
            alt="Opening memory"
            width={900}
            height={560}
            className="h-auto w-full rounded-xl object-cover"
            priority
            sizes="(min-width: 768px) 32rem, 95vw"
          />
        </figure>
        <h1 className="mb-4 text-2xl font-semibold sm:text-3xl md:text-5xl">
          {storyMeta.intro.heading}
        </h1>
        <p className="mb-8 max-w-2xl text-base md:text-lg">
          {storyMeta.intro.subheading}
        </p>
        <CtaButton
          aria-label={storyMeta.intro.ctaLabel}
          className="w-full sm:w-auto"
          onClick={handleStartStory}
        >
          {storyMeta.intro.ctaLabel}
        </CtaButton>
        {/* Easter eggs temporarily disabled. */}
      </header>

      <div className="grid gap-6 md:gap-8">
        {actIUnlocked ? (
          <Section
            id="act-i"
            title={storyMeta.acts[0]}
            eyebrow="Act I"
            as="section"
          >
            <div ref={actOneRef} className="grid gap-4">
              {timelineItems.map((item) => (
                <StoryCard key={item.year} title={`${item.year} ${item.title}`}>
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#6b5670]">
                    {item.year}
                  </p>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mb-4">{item.body}</p>
                  {item.media ? (
                    <figure className="h-40 w-full overflow-hidden rounded-xl border border-white/70 bg-[#fff6fa]">
                      <Image
                        src={item.media.src}
                        alt={item.media.alt}
                        width={900}
                        height={360}
                        sizes="(min-width: 768px) 40rem, 95vw"
                        className={`h-full w-full object-contain ${
                          item.media.sensitive ? "blur-[2px]" : ""
                        }`}
                      />
                    </figure>
                  ) : null}
                </StoryCard>
              ))}
              <CtaButton
                aria-label="Continue to Act II"
                className="w-full sm:w-auto"
                disabled={actICompleted}
                onClick={handleCompleteActI}
              >
                {actICompleted ? "Act I Complete" : "Continue to Act II"}
              </CtaButton>
            </div>
          </Section>
        ) : null}

        {actIIUnlocked ? (
          <Section id="act-ii" title={storyMeta.acts[1]} eyebrow="Act II">
            <div ref={actTwoRef} className="grid gap-4">
              <StoryCard title="Confession">
                <p className="whitespace-pre-line">
                  {displayedConfession}
                  {isTyping ? <span className="animate-pulse">|</span> : null}
                </p>
              </StoryCard>
              <CtaButton
                aria-label="Continue to Act III"
                className="w-full sm:w-auto"
                disabled={actIICompleted}
                onClick={handleCompleteActII}
              >
                {actIICompleted ? "Act II Complete" : "Continue to Act III"}
              </CtaButton>
            </div>
          </Section>
        ) : null}

        {actIIIUnlocked ? (
          <Section id="act-iii" title={storyMeta.acts[2]} eyebrow="Act III">
            <div ref={actThreeRef}>
              <StoryCard title="The Question">
                <p className="mb-4 text-lg font-medium">So... I have a question.</p>
                <CtaButton
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setTryAgainCount(0);
                    setProposalState("open");
                    trackEvent({
                      name: "proposal_open",
                      route: "/",
                      timestamp: new Date().toISOString(),
                    });
                  }}
                >
                  {storyMeta.proposalOpenLabel}
                </CtaButton>

                {celebrationState !== "off" ? (
                  <div className="mt-5 rounded-xl border border-[#f0bfd4] bg-[#fff1f8] p-4">
                    <p className="mt-2 text-xl" aria-hidden="true">

                    </p>
                    {unlockState === "unlocked" ? (
                      <>
                        <p className="mt-3 text-sm text-[#6b5670]">
                          Next chapter is now unlocked.
                        </p>
                        <Link
                          href={storyMeta.nextChapterPath}
                          onClick={() =>
                            trackEvent({
                              name: "next_chapter_opened",
                              route: "/next-chapter",
                              timestamp: new Date().toISOString(),
                            })
                          }
                          className="mt-3 inline-flex min-h-11 min-w-11 w-full items-center justify-center rounded-full bg-[#7f3453] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b1f31] sm:w-auto"
                        >
                          Continue to Next Chapter
                        </Link>
                      </>
                    ) : (
                      <>
                        <p className="mt-3 text-sm text-[#6b5670]">
                          Next chapter is locked and will be available on February 15, 2026.
                        </p>
                        <button
                          type="button"
                          disabled
                          className="mt-3 inline-flex min-h-11 min-w-11 w-full cursor-not-allowed items-center justify-center rounded-full bg-[#b6adb3] px-5 text-sm font-semibold text-white opacity-80 sm:w-auto"
                        >
                          Continue to Next Chapter
                        </button>
                      </>
                    )}
                  </div>
                ) : null}
              </StoryCard>
            </div>
          </Section>
        ) : null}
      </div>

      <ModalShell
        title={storyMeta.proposalPrompt}
        open={proposalState === "open"}
        onClose={() => {
          setTryAgainCount(0);
          setProposalState("idle");
        }}
      >
        <p className="mb-3 text-sm text-[#6b5670]">Pick the answer that feels right.</p>
        <figure className="mb-4 w-full max-w-sm overflow-hidden rounded-xl border border-white/70 bg-[#fff6fa] p-2">
          <Image
            src="/videos/pussGIF.gif"
            alt="Puss in boots reaction"
            width={640}
            height={640}
            className="h-auto w-full rounded-lg object-cover"
            unoptimized
            sizes="(min-width: 768px) 24rem, 90vw"
          />
        </figure>
        {tryAgainCount > 0 ? (
          <p className="mb-3 text-sm text-[#6b5670]">
            WEI, Try again s3 s3n?
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {proposalOptions.map((option) => (
            <CtaButton
              key={option.id}
              onClick={() => handleProposalOption(option.id)}
              className={option.id === "try-again" ? "bg-[#9f6f82]" : ""}
            >
              {option.label}
            </CtaButton>
          ))}
        </div>
      </ModalShell>
    </main>
  );
}
