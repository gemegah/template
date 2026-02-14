import type {
  ConfessionBlock,
  EasterEgg,
  ProposalOption,
  TimelineItem,
} from "@/types/story";

export const storyMeta = {
  title: "Our Timeline -> Our Choice -> Our Future",
  acts: ["How We Started", "My Confession", "The Question"],
  nextChapterPath: "/next-chapter",
  intro: {
    heading: "Hey babe...",
    subheading: "Welcome to our little corner of the internet.",
    ctaLabel: "Start Our Story",
  },
  proposalPrompt: "Will you be my Valentine?",
  proposalOpenLabel: "Open",
} as const;

export const timelineItems: TimelineItem[] = [
  {
    year: "2020",
    title: "Where It Began",
    body: "We met, and I had no idea you would become this important.",
    media: {
      type: "photo",
      src: "/images/1st.png",
      alt: "A warm memory from when we first met in 2020",
    },
  },
  {
    year: "2021-2024",
    title: "Best Friends Era",
    body: "Friends, best friends, and the occasional not-talking breaks.",
    media: {
      type: "screenshot",
      src: "/images/2nd.png",
      alt: "A chat screenshot that captures our playful friendship years",
      sensitive: false,
    },
  },
  {
    year: "Late 2025",
    title: "We Became Us",
    body: "Somehow, somewhere between all the chaos, we became us.",
    media: {
      type: "image",
      src: "/images/chp2.png",
      alt: "A meaningful image representing the shift into our relationship",
    },
  },
];

export const confessionBlocks: ConfessionBlock[] = [
  {
    order: 1,
    text: "I know I am not perfect. I can be annoying, slow to act, and sometimes a full-time doofus.",
  },
  {
    order: 2,
    text: "I have fumbled moments and hesitated when I should have been certain.",
  },
  {
    order: 3,
    text: "But loving you, caring about you, and choosing you have always been clear.",
  },
  {
    order: 4,
    text: "And even when I don’t get everything right… my heart has always known where it belongs..",
  },
];

export const proposalOptions: ProposalOption[] = [
  { id: "yes", label: "Yes", outcome: "celebrate" },
  { id: "of-course", label: "Of course", outcome: "celebrate" },
  { id: "try-again", label: "Try Again", outcome: "loop" },
];

export const easterEggs: EasterEgg[] = [
  {
    id: "stars-hidden-message",
    triggerType: "click",
    triggerValue: "star",
    responseType: "message",
    payload: {
      messages: [
        "That day you laughed at my joke...",
        "Our first serious talk...",
        "When I knew it was you...",
      ],
    },
  },
  {
    id: "name-trigger-note",
    triggerType: "input",
    triggerValue: "yolie",
    responseType: "overlay",
    payload: {
      title: "Secret Love Note",
      note: "If you typed your name, you already know you are my favorite person.",
    },
  },
  {
    id: "memory-wall",
    triggerType: "hover",
    triggerValue: "memory-note",
    responseType: "note",
    payload: {
      notes: [
        "That day you laughed at my joke...",
        "Our first serious talk...",
        "When I knew it was you...",
      ],
    },
  },
  {
    id: "doofus-apology",
    triggerType: "click",
    triggerValue: "apology-button",
    responseType: "audio",
    payload: {
      text: "I am sorry for being silly sometimes. Please forgive your favorite idiot.",
      audioSrc: "/audio/doofus-apology.mp3",
    },
  },
];
