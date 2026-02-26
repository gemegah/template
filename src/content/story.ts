import type {
  ConfessionBlock,
  EasterEgg,
  ProposalOption,
  TimelineItem,
} from "@/types/story";

export const storyMeta = {
  title: "Our Timeline -> My Lessons -> Our Future",
  acts: ["How We Started", "My Confession", "The Question"],
  nextChapterPath: "/next-chapter",
  intro: {
    heading: "Hey babe...",
    subheading:
      "This isn’t just an apology. It’s accountability. It’s growth. It’s me choosing you with intention.",
    ctaLabel: "Start Our Story",
  },
  proposalPrompt: "Will you be my girlfriend?",
  proposalOpenLabel: "Open",
} as const;

export const timelineItems: TimelineItem[] = [
  {
    year: "17 April 2022",
    title: "The Day My Life Shifted",
    body:
      "April 17th, 2022 wasn’t loud or dramatic. But it was the day I met someone who would eventually hold a mirror to me. You came into my life gently — and somehow became the most important part of it.",
    media: {
      type: "image",
      src: "/images/anime-style/2022-first-meet.png",
      alt: "Anime-style illustration of the day we met on April 17, 2022",
    },
  },
  {
    year: "2022 - 2023",
    title: "Safe With You",
    body:
      "We built something real. Laughter. Late talks. Comfort. You became my safe place before I even understood what that meant. Even when life pulled us in different directions, there was always an invisible thread tying us back together.",
    media: {
      type: "image",
      src: "/images/anime-style/best-friends-era.png",
      alt: "Anime-style illustration representing our closeness and best friend era",
    },
  },
  {
    year: "2023 - 2024",
    title: "Where I Failed You",
    body:
      "This is the part I can’t soften. I cheated. More than once. Not because you lacked anything — but because I lacked maturity, discipline, and depth. I broke your trust. I disrespected what we had. And I hurt someone who only ever loved me sincerely.",
    media: {
      type: "image",
      src: "/images/anime-style/broken-trust.png",
      alt: "Anime-style image symbolizing broken trust and emotional distance",
    },
  },
  {
    year: "2024 - 2025",
    title: "Doing The Work For Real",
    body:
      "I realized love isn’t just feelings — it’s responsibility. It’s discipline. It’s protection. I stopped making excuses. I confronted my ego. I chose honesty even when it made me uncomfortable. Not to impress you — but to become someone worthy of you.",
    media: {
      type: "image",
      src: "/images/anime-style/rebuilding-trust.png",
      alt: "Anime-style illustration symbolizing growth, rebuilding trust, and emotional maturity",
    },
  },
  {
    year: "Now",
    title: "Choosing You Intentionally",
    body:
      "I’m not asking you to erase the past. I’m asking you to look at the man standing in front of you now. A man who understands that love must be guarded. A man who knows your heart is sacred. A man choosing you — not casually, not emotionally, but intentionally.",
    media: {
      type: "image",
      src: "/images/anime-style/choosing-you.png",
      alt: "Anime-style illustration of us standing together stronger, healed, and aligned",
    },
  },
];

export const confessionBlocks: ConfessionBlock[] = [
  {
    order: 1,
    text:
      "I need to say this without hiding behind excuses: I cheated in 2023–2024. I hurt you. I broke your trust. And that is fully on me.",
  },
  {
    order: 2,
    text:
      "You didn’t deserve confusion. You didn’t deserve insecurity. You didn’t deserve to question your worth because of my choices.",
  },
  {
    order: 3,
    text:
      "I’ve learned that trust isn’t rebuilt through promises — it’s rebuilt through patterns. Through consistency. Through quiet integrity when no one is watching.",
  },
  {
    order: 4,
    text:
      "I’m still growing. But I’m no longer running from growth. I’m becoming a man who protects what he loves instead of risking it.",
  },
  {
    order: 5,
    text:
      "So when I ask you to be mine, it’s not from emotion alone. It’s from intention. From accountability. From a place of readiness.",
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
        "The moment I realized you weren’t replaceable wasn’t loud — it was quiet and terrifying.",
        "That conversation where I saw the hurt in your eyes changed me.",
        "The day I understood love means responsibility — not just emotion.",
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
      note:
        "If you typed your name, it means you’re still here. And I don’t take that lightly. Staying after being hurt takes strength. I see it. I respect it. I cherish it.",
    },
  },
  {
    id: "memory-wall",
    triggerType: "hover",
    triggerValue: "memory-note",
    responseType: "note",
    payload: {
      notes: [
        "The night we talked until everything felt honest again…",
        "When you laughed and I realized peace feels like you…",
        "The moment I knew I couldn’t keep being careless with something this real…",
      ],
    },
  },
  {
    id: "doofus-apology",
    triggerType: "click",
    triggerValue: "apology-button",
    responseType: "audio",
    payload: {
      text:
        "I’m sorry for what I did in 2023–2024. I’m sorry for the insecurity I caused. I’m sorry for making you feel unsafe in something that was supposed to protect you. I’m committed to being better — consistently, not occasionally.",
      audioSrc: "/audio/doofus-apology.mp3",
    },
  },
];
