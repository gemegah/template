export type MediaAsset = {
  type: "image" | "screenshot" | "photo";
  src: string;
  alt: string;
  sensitive?: boolean;
};

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
  media?: MediaAsset;
};

export type ConfessionBlock = {
  order: number;
  text: string;
};

export type ProposalOutcome = "celebrate" | "loop";

export type ProposalOption = {
  id: "yes" | "of-course" | "try-again";
  label: string;
  outcome: ProposalOutcome;
};

export type EasterEggTriggerType = "click" | "input" | "hover" | "sequence";

export type EasterEggResponseType = "message" | "audio" | "overlay" | "note";

export type EasterEgg = {
  id: string;
  triggerType: EasterEggTriggerType;
  triggerValue: string;
  responseType: EasterEggResponseType;
  payload: Record<string, unknown>;
};

export type ProposalState = "idle" | "open" | "answered";
export type CelebrationState = "off" | "active" | "completed";
export type TypewriterState = "idle" | "running" | "done" | "skipped";
export type UnlockState = "locked" | "unlocked";
export type StoryFlowStep = "intro" | "act-i" | "act-ii" | "act-iii";
export type SectionUnlockState = {
  actI: boolean;
  actII: boolean;
  actIII: boolean;
};
