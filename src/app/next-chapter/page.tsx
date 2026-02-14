"use client";

import confetti from "canvas-confetti";
import { Dancing_Script } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ModalShell } from "@/components/ui/ModalShell";

const romanticScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dayTwoMessage = `Yesterday was about feelings.
Today is about commitment.

It's about building something real.
Something patient.
Something lasting.

With you, things feel safe.
They feel genuine.
They feel worth protecting.

And I don't want to just feel this...
I want to live it with you.

So tell me...

Will you be my girlfriend?`;

const TYPEWRITER_DELAY_MS = 42;
const MAX_NO_ATTEMPTS = 3;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getRandomNoPosition() {
  const minLeft = 8;
  const maxLeft = 82;
  const minTop = 20;
  const maxTop = 78;

  // Reserve the Yes button region so No never overlaps or hides behind it.
  const yesZone = {
    leftMin: 6,
    leftMax: 46,
    topMin: 28,
    topMax: 76,
  };

  for (let tries = 0; tries < 24; tries += 1) {
    const left = minLeft + Math.floor(Math.random() * (maxLeft - minLeft + 1));
    const top = minTop + Math.floor(Math.random() * (maxTop - minTop + 1));
    const inYesZone =
      left >= yesZone.leftMin &&
      left <= yesZone.leftMax &&
      top >= yesZone.topMin &&
      top <= yesZone.topMax;

    if (!inYesZone) {
      return {
        left: `${left}%`,
        top: `${top}%`,
      };
    }
  }

  return { left: "72%", top: "24%" };
}

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

export default function NextChapterPage() {
  const reducedMotion = useReducedMotionPreference();
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noVisible, setNoVisible] = useState(true);
  const [noPosition, setNoPosition] = useState({ left: "70%", top: "48%" });
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showYesPopup, setShowYesPopup] = useState(false);

  useEffect(() => {
    if (reducedMotion || typedCharacters >= dayTwoMessage.length) {
      return;
    }

    const timer = window.setInterval(() => {
      setTypedCharacters((current) => {
        const next = current + 1;
        if (next >= dayTwoMessage.length) {
          window.clearInterval(timer);
          return dayTwoMessage.length;
        }
        return next;
      });
    }, TYPEWRITER_DELAY_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion, typedCharacters]);

  const displayedMessage = reducedMotion
    ? dayTwoMessage
    : dayTwoMessage.slice(0, typedCharacters);
  const isTyping = !reducedMotion && typedCharacters < dayTwoMessage.length;
  const yesScale = Math.pow(1.24, noAttempts);

  const launchFireworks = async () => {
    if (reducedMotion) return;

    const launches = 8;
    for (let burst = 0; burst < launches; burst += 1) {
      const leftOrigin = 0.12 + Math.random() * 0.3;
      const rightOrigin = 0.58 + Math.random() * 0.3;
      const burstY = 0.35 + Math.random() * 0.25;

      confetti({
        particleCount: 70,
        spread: 110,
        startVelocity: 48,
        origin: { x: leftOrigin, y: burstY },
        colors: ["#ffd6ea", "#ff8fb8", "#f8c7ff", "#fff0c4", "#ffffff"],
      });
      confetti({
        particleCount: 70,
        spread: 110,
        startVelocity: 48,
        origin: { x: rightOrigin, y: burstY },
        colors: ["#ffd6ea", "#ff8fb8", "#f8c7ff", "#fff0c4", "#ffffff"],
      });
      await wait(230);
    }
  };

  const handleNoAttempt = (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    if (!noVisible || isCelebrating) return;

    const nextAttempts = noAttempts + 1;
    setNoAttempts(nextAttempts);
    setNoPosition(getRandomNoPosition());

    if (nextAttempts >= MAX_NO_ATTEMPTS) {
      setNoVisible(false);
    }
  };

  const handleYes = async () => {
    if (isCelebrating) return;
    setNoAttempts(0);
    setNoVisible(true);
    setNoPosition({ left: "70%", top: "48%" });
    setIsCelebrating(true);

    if (!reducedMotion) {
      confetti({ particleCount: 120, spread: 88, origin: { y: 0.72 } });
      confetti({ particleCount: 60, spread: 80, origin: { x: 0.2, y: 0.68 } });
      confetti({ particleCount: 60, spread: 80, origin: { x: 0.8, y: 0.68 } });
    }

    await wait(reducedMotion ? 200 : 950);
    await launchFireworks();
    setShowYesPopup(true);
    setIsCelebrating(false);
  };

  return (
    <main>
      <div className="mb-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-md px-2 py-1 text-sm text-[#5a3148] transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f3453]"
        >
          ← Back
        </Link>
      </div>
      <Section id="next-chapter" title="Day Two" eyebrow="Next Chapter">
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-[linear-gradient(150deg,rgba(255,210,231,0.82)_0%,rgba(255,233,218,0.75)_43%,rgba(228,204,255,0.8)_100%)] p-6 shadow-[0_18px_60px_rgba(88,39,67,0.2)] md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.62),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,179,214,0.34),transparent_54%)]"
          />
          <p
            className={`${romanticScript.className} relative whitespace-pre-line text-3xl leading-[1.5] tracking-[0.01em] text-[#4f2540] md:text-5xl`}
          >
            {displayedMessage}
            {isTyping ? <span className="animate-pulse">|</span> : null}
          </p>
        </div>
        <div className="mt-6 rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,244,250,0.85),rgba(255,234,246,0.78),rgba(241,226,255,0.8))] p-4">
          <p className="mb-4 text-sm text-[#5a3148] md:text-base">
            Choose one answer:
          </p>
          <div className="relative h-44 overflow-hidden rounded-xl border border-white/80 bg-white/55">
            <CtaButton
              aria-label="Yes, I will be your girlfriend"
              className="absolute left-[12%] top-[54%] min-h-12 bg-[#c94376] px-9 text-base md:text-lg"
              style={{ transform: `translateY(-50%) scale(${yesScale})`, transformOrigin: "left center" }}
              onClick={() => {
                void handleYes();
              }}
              disabled={isCelebrating}
            >
              Yes
            </CtaButton>

            <CtaButton
              aria-label="No option"
              className={`absolute min-h-12 -translate-y-1/2 px-9 text-base transition-[left,top,opacity,transform] duration-500 md:text-lg ${
                noVisible ? "opacity-100" : "pointer-events-none opacity-0"
              } ${noVisible ? "bg-[#906378]" : "bg-[#906378]/40"}`}
              style={{ left: noPosition.left, top: noPosition.top }}
              onMouseDown={handleNoAttempt}
              onTouchStart={handleNoAttempt}
              onFocus={handleNoAttempt}
              disabled={!noVisible || isCelebrating}
            >
              No
            </CtaButton>
          </div>
        </div>
      </Section>

      <ModalShell
        title="She said yes"
        open={showYesPopup}
        onClose={() => setShowYesPopup(false)}
      >
        <p className="mb-3 text-sm text-[#6b5670]">
          Best answer ever.
        </p>
        <figure className="w-full overflow-hidden rounded-xl border border-white/70 bg-[#fff6fa] p-2">
          <Image
            src="/videos/shesaidyes.gif"
            alt="She said yes celebration"
            width={640}
            height={640}
            className="h-auto w-full rounded-lg object-cover"
            unoptimized
            sizes="(min-width: 768px) 24rem, 90vw"
          />
        </figure>
      </ModalShell>
    </main>
  );
}
