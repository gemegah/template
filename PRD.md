# Product Requirements Document (PRD)

## 1. Document Control
- Title: Our Timeline -> Our Choice -> Our Future
- Version: v1.0
- Owner: Product + Engineering
- Date: February 12, 2026
- Status: Approved for Implementation

## 2. Product Vision
This product is a personal, cinematic web experience that guides one recipient through a three-act emotional story ending in a proposal moment, then unlocks a second-day commitment page. The core narrative arc is "Our Timeline -> Our Choice -> Our Future," delivered through soft gradients, intentional motion, and intimate copy that feels handcrafted rather than generic.

### Experience Principles
- Intimate: The experience should feel personal and emotionally direct.
- Cinematic: Sections should transition like scenes in a short film.
- Soft-motion: Motion should be gentle, meaningful, and never aggressive.
- Personal: Content should preserve memories, shared references, and emotional continuity.

## 3. Goals and Non-Goals
### Goals
- Deliver emotional storytelling across a clear 3-act structure.
- Achieve successful completion of the proposal interaction.
- Create memorable moments via celebration and easter eggs.
- Maintain equal quality across mobile and desktop browsing contexts.

### Non-Goals
- Authentication or account system.
- CMS backend or content admin tools.
- Social sharing and virality mechanics.
- Server-side persistence of relationship state.

## 4. Target Users and Context
### Primary Sender Persona
- A single creator curating a private, personal narrative for one specific recipient.
- Values emotional expression over feature complexity.

### Primary Recipient Persona
- One intended partner receiving the experience through a private link.
- Consumes content on mobile or desktop, with likely touch-first interaction on phone.

### Usage Context
- Shared via private URL.
- Must work reliably on modern mobile and desktop browsers.
- Consumption environment may include variable network and device performance.

## 5. Scope (v1 In-Scope)
- Opening landing screen with emotional hook and primary CTA.
- Act I timeline section with memory cards and optional media.
- Act II confession section with typewriter-style reveal and centered focus card.
- Act III question flow with modal and celebratory response path.
- Day-two page at `/next-chapter` with sincere, lower-playfulness tone.
- Easter eggs:
  - Hidden star-trigger messages.
  - Name-trigger bonus love note behavior.
  - Memory wall floating notes.
  - "Doofus Apology" interaction.

## 6. Out of Scope (v1)
- Multi-user support.
- Database or cloud content persistence.
- Localization/multi-language support.
- Admin panel.
- Analytics dashboard UI (event emit only).

## 7. User Journey and Information Architecture
### Route Map
- `/`: Main story experience (Act I, Act II, Act III).
- `/next-chapter`: Day-two commitment experience.
- Hidden interaction path: Name-triggered secret response (inline overlay or hidden section; no dedicated public nav).

### Journey States
1. Entry
- User lands on `/` and sees intro copy + `Start Our Story` CTA.

2. Progression Through Story
- User advances into Act I timeline, then Act II confession, then Act III proposal prompt.

3. Question Interaction
- User taps/clicks `Open` to launch proposal modal.
- User selects one of three allowed options (`Yes`, `Of course`, `Try Again`).
- `Try Again` loops interaction without dead-end rejection state.

4. Completion
- Celebration sequence appears (confetti/hearts/sound if enabled).
- UI surfaces route to `/next-chapter`.

5. Day-Two Follow-up
- User opens `/next-chapter` and views more sincere commitment question.

## 8. Functional Requirements
- FR-01: System SHALL render a full-screen landing hero with introductory copy and primary CTA.
- FR-02: Clicking/tapping `Start Our Story` SHALL move focus/viewport into Act I.
- FR-03: Act I SHALL present at least three timeline items (2020, 2021-2024, late 2025).
- FR-04: Timeline cards SHALL support optional media (image/screenshot/photo) and text.
- FR-05: Media marked sensitive SHALL support blur treatment.
- FR-06: Act II SHALL render confession content in a prominent centered card.
- FR-07: Act II SHALL support typewriter-style reveal with a reduced-motion fallback.
- FR-08: Act III SHALL present an `Open` CTA to trigger proposal interaction.
- FR-09: `Open` SHALL launch a modal/dialog with question copy.
- FR-10: Proposal options SHALL be exactly three in v1: `Yes`, `Of course`, `Try Again`.
- FR-11: Selecting `Yes` SHALL trigger celebration state.
- FR-12: Selecting `Of course` SHALL trigger celebration state.
- FR-13: Selecting `Try Again` SHALL re-open/replay the question flow and remain non-terminal.
- FR-14: System SHALL NOT present a negative reject button in Act III.
- FR-15: Celebration state SHALL support confetti and heart animations.
- FR-16: Celebration state SHALL optionally play a sound effect when media autoplay policies allow or after user gesture.
- FR-17: After celebration, UI SHALL provide navigation to `/next-chapter`.
- FR-18: `/next-chapter` SHALL render the day-two commitment message and question.
- FR-19: Hidden star interactions SHALL reveal inside-joke micro-messages.
- FR-20: Name-trigger input behavior SHALL reveal a bonus love note.
- FR-21: Memory wall SHALL display floating memory-note content blocks.
- FR-22: Doofus apology interaction SHALL display/play apology response.
- FR-23: All major interactions SHALL be operable via touch, mouse, and keyboard.
- FR-24: System SHALL emit analytics events for key milestones.

## 9. Content Requirements
### Content Model
- Timeline items.
- Confession blocks.
- Proposal prompts and options.
- Easter egg definitions and responses.

### Media Rules
- Every media asset MUST include descriptive `alt` text.
- Media load failures MUST show graceful fallback placeholders.
- Sensitive screenshots SHOULD be blurred by default.
- Long text MUST preserve readability on both mobile and desktop widths.

## 10. Visual and Interaction Requirements
### Color System
- Use soft warm gradients; avoid flat single-color sections as primary backgrounds.
- Preferred palette family: blush pink, rose gold, soft peach, cream white, light lavender.

### Typography
- Heading style: handwritten/script family.
- Body style: clean sans-serif family.
- Maintain clear contrast and hierarchy for long-form text.

### Motion Rules
- Motion SHOULD reinforce narrative transitions and emotional pacing.
- Use subtle fade/translate/scale transitions; avoid abrupt motion spikes.
- Cap particle counts and animation layers to prevent performance regressions.

### Responsive Behavior
- Mobile and desktop quality are equal priority.
- Layout MUST avoid horizontal scrolling at common viewport sizes.
- Tap targets MUST remain usable on small screens.

## 11. Accessibility Requirements
- MUST respect `prefers-reduced-motion` and provide functional alternatives.
- Modal/dialog MUST trap focus while open and restore focus on close.
- Keyboard navigation MUST support all interactive controls.
- Interactive targets MUST meet minimum 44x44 CSS pixels where practical.
- Semantic structure MUST include meaningful headings/landmarks.
- Text over gradients MUST maintain accessible contrast.

## 12. Performance Requirements
- Optimize media assets (compression, modern formats where possible).
- Lazy-load non-critical assets and defer non-essential effects.
- Prefer transform/opacity animations for smoother rendering.
- Avoid long main-thread blocking tasks during core flow.
- Requirement: no perceptible jank on common mobile devices under typical network conditions.

## 13. Technical Requirements and Constraints
- Frontend stack: Next.js + Framer Motion.
- App MUST be componentized and data-driven (content model separated from UI components).
- Routing MUST include `/` and `/next-chapter`.
- No backend dependency required for v1 journey completion.
- Instrumentation hooks MUST be included for key interaction events.

### Public Interfaces / Types
```ts
type TimelineItem = {
  year: string;
  title: string;
  body: string;
  media?: {
    type: 'image' | 'screenshot' | 'photo';
    src: string;
    alt: string;
    sensitive?: boolean;
  };
};

type ConfessionBlock = {
  order: number;
  text: string;
};

type ProposalOption = {
  id: 'yes' | 'of-course' | 'try-again';
  label: string;
  outcome: 'celebrate' | 'loop';
};

type EasterEgg = {
  id: string;
  triggerType: 'click' | 'input' | 'hover' | 'sequence';
  triggerValue: string;
  responseType: 'message' | 'audio' | 'overlay' | 'note';
  payload: Record<string, unknown>;
};
```

### UI State Contracts
- `proposalState`: `idle | open | answered`
- `celebrationState`: `off | active | completed`
- `typewriterState`: `idle | running | done | skipped`
- `unlockState`: `locked | unlocked`

### Event Contract
Each emitted event MUST include:
- `timestamp` (ISO 8601 string)
- `route` (`/` or `/next-chapter`)
- `optionId` (for proposal choice events only)

## 14. Analytics and Success Metrics
### Required Events
- `story_start`
- `proposal_open`
- `proposal_option_selected`
- `celebration_shown`
- `next_chapter_opened`

### Success KPIs
- Story completion rate (landing to celebration).
- Proposal interaction rate (opens modal / starts story).
- Next chapter continuation rate (visits `/next-chapter` after celebration).
- Drop-off points between acts.

## 15. Acceptance Criteria
- AC-01: User can complete full Act I -> Act II -> Act III flow on mobile.
- AC-02: User can complete same flow on desktop without layout breakage.
- AC-03: Proposal modal opens and closes correctly via touch, mouse, and keyboard.
- AC-04: All proposal options resolve to valid behavior; no dead-end state.
- AC-05: Celebration renders without blocking progression.
- AC-06: `/next-chapter` is accessible both directly and from guided flow.
- AC-07: Easter eggs trigger correctly and do not interrupt main progression.
- AC-08: Reduced-motion mode preserves usability and readability.
- AC-09: Missing media cases degrade gracefully with fallbacks.

### Device/Browser Matrix (minimum)
- iOS Safari (recent 2 major versions).
- Android Chrome (recent 2 major versions).
- Desktop Chrome, Edge, Safari, Firefox (recent versions).

## 16. QA Plan
- Functional QA: Validate all FR-01 to FR-24 behaviors.
- Responsive QA: Verify mobile and desktop parity for layout and interaction.
- Accessibility QA: Keyboard path, focus order, dialog behavior, reduced motion.
- Performance QA: Measure interaction smoothness and media-load impact.
- Resilience QA: Validate missing media, delayed network, and audio policy constraints.

## 17. Risks and Mitigations
- Risk: Over-animation harms clarity/performance.
  - Mitigation: Cap animation intensity, enforce reduced-motion fallback, performance checks.
- Risk: Emotional copy readability drops over gradients.
  - Mitigation: Contrast overlays, spacing, max line length, typography hierarchy.
- Risk: Tone mismatch between playful and sincere sections.
  - Mitigation: Define explicit visual/motion shift between Act III and `/next-chapter`.
- Risk: Interaction confusion in proposal loop.
  - Mitigation: Clear feedback states and deterministic CTA outcomes.

## 18. Launch Plan
1. Content Lock
- Finalize timeline, confession copy, proposal copy, and easter egg messages.

2. Implementation
- Build routes, components, state flows, interactions, and instrumentation.

3. QA
- Execute functional, responsive, accessibility, and performance checks.

4. Final Polish
- Tune animations, typography, and microcopy.

5. Launch
- Deploy production build and verify analytics event flow.

## 19. Open Questions
None at this time.

## Assumptions and Defaults
- Source of truth for this PRD is `guidelines.md` in current repo.
- Scope is full experience in v1.
- Delivery target is mobile + desktop equal quality.
- PRD style is Product + Tech PRD.
- No backend persistence is required; client-side state is acceptable.
