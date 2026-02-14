# Implementation Tasks

## Document Metadata
- Source PRD: `PRD.md`
- Plan Type: Product + Tech execution checklist
- Scope: Full experience (main story, proposal flow, `/next-chapter`, easter eggs)
- Platforms: Mobile and desktop (equal quality)

## Status Legend
- [ ] Not started
- [~] In progress
- [x] Done
- [!] Blocked

## Phase 0: Project Setup and Baseline
### 0.1 Workspace and dependencies
- [x] Initialize Next.js app with TypeScript and App Router.
- [x] Install animation and utility dependencies (Framer Motion, optional confetti/audio helper packages).
- [x] Define scripts for `dev`, `build`, `start`, `lint`, and test commands.

### 0.2 Directory structure
- [x] Create route structure for `/` and `/next-chapter`.
- [x] Create content folder for data-driven story models.
- [x] Create components folder for shared UI primitives and act-specific sections.
- [x] Create analytics utility module.

### 0.3 Global foundations
- [x] Configure global CSS variables for gradient palette, spacing, typography, and motion tokens.
- [x] Add base responsive layout constraints for mobile and desktop parity.
- [x] Add reduced-motion global handling strategy.

Dependencies: none
PRD links: Section 10, Section 11, Section 12, Section 13

## Phase 1: Data Contracts and Content Model
### 1.1 Type and schema contracts
- [x] Define `TimelineItem` type.
- [x] Define `ConfessionBlock` type.
- [x] Define `ProposalOption` type.
- [x] Define `EasterEgg` type.
- [x] Define UI state enums/contracts (`proposalState`, `celebrationState`, `typewriterState`, `unlockState`).

### 1.2 Content source files
- [x] Create timeline data entries (2020, 2021-2024, late 2025).
- [x] Create confession block content as ordered sequence.
- [x] Create proposal question and options (`Yes`, `Of course`, `Try Again`).
- [x] Create easter egg configuration (stars, name trigger, memory wall notes, apology payload).
- [x] Annotate media metadata with `alt` and sensitivity flags.

Dependencies: Phase 0
PRD links: Section 8 (FR-03/04/05/10/19/20/21/22), Section 9, Section 13

## Phase 2: Core UI and Route Scaffolding
### 2.1 Shared components
- [x] Build section wrapper component with semantic landmarks.
- [x] Build reusable card component for story blocks.
- [x] Build CTA button component with keyboard and touch support.
- [x] Build modal/dialog shell with focus management hooks.

### 2.2 Route scaffolding
- [x] Implement `/` route shell containing the 3-act flow.
- [x] Implement `/next-chapter` route shell with serious visual tone variation.
- [x] Add in-app navigation affordance from celebration to `/next-chapter`.

Dependencies: Phase 0, Phase 1
PRD links: Section 7, Section 8 (FR-01/17/18/23), Section 11, Section 13

## Phase 3: Act Implementations
### 3.1 Landing and Act I
- [x] Implement full-screen landing intro with `Start Our Story` CTA.
- [x] Wire CTA to focus/scroll transition into Act I.
- [x] Render timeline cards from structured data.
- [x] Support optional media and blur for sensitive screenshots.

### 3.2 Act II (Confession)
- [x] Render centered confession card layout.
- [x] Implement typewriter reveal behavior.
- [x] Add reduced-motion fallback for full text reveal.

### 3.3 Act III (Proposal)
- [x] Render `Open` CTA to trigger modal.
- [x] Implement modal question copy and three required options.
- [x] Implement deterministic behaviors:
  - [x] `Yes` -> celebration
  - [x] `Of course` -> celebration
  - [x] `Try Again` -> loop/reopen flow
- [x] Ensure no negative reject button appears.

### 3.4 Celebration and unlock behavior
- [x] Trigger confetti/hearts on celebration state.
- [x] Add optional sound effect behavior gated by gesture/autoplay policy.
- [x] Surface `/next-chapter` unlock CTA after celebration.

Dependencies: Phase 1, Phase 2
PRD links: Section 8 (FR-01 to FR-18), Section 10, Section 12

## Phase 4: Day-Two Page and Easter Eggs
### 4.1 `/next-chapter` page
- [x] Implement day-two commitment copy and visual style shift (less playful, more sincere).
- [x] Ensure route can be accessed directly and via unlocked flow.

### 4.2 Easter eggs
- [!] Implement star click/tap hidden message interactions.
- [!] Implement name-trigger bonus note behavior.
- [!] Implement memory wall floating notes display.
- [!] Implement doofus apology interaction (message/audio payload).

Dependencies: Phase 2, Phase 3
PRD links: Section 5, Section 8 (FR-19 to FR-22), Section 15 (AC-06/07)

## Phase 5: Accessibility and Performance Hardening
### 5.1 Accessibility
- [x] Validate semantic heading hierarchy and landmarks.
- [x] Ensure modal focus trap and focus restore.
- [x] Ensure full keyboard path for all controls.
- [x] Verify minimum target sizes and readable text contrast over gradients.
- [x] Verify reduced-motion mode for all animated paths.

### 5.2 Performance
- [x] Compress and optimize images.
- [x] Lazy-load non-critical media.
- [x] Restrict animations to transform/opacity where possible.
- [x] Limit particle/heart counts to avoid jank.
- [~] Validate smooth behavior on common mobile devices.

Dependencies: Phase 3, Phase 4
PRD links: Section 11, Section 12, Section 15 (AC-08/09)

## Phase 6: Analytics, QA, and Launch Readiness
### 6.1 Instrumentation
- [ ] Implement event emitter wrapper with required payload fields.
- [ ] Emit `story_start`.
- [ ] Emit `proposal_open`.
- [ ] Emit `proposal_option_selected` with `optionId`.
- [ ] Emit `celebration_shown`.
- [ ] Emit `next_chapter_opened`.

### 6.2 Functional QA
- [ ] Verify full Act I -> Act II -> Act III completion on mobile.
- [ ] Verify same completion on desktop.
- [ ] Verify modal open/close and option outcomes.
- [ ] Verify celebration does not block progression.
- [ ] Verify direct and guided access to `/next-chapter`.
- [ ] Verify all easter egg triggers do not break main flow.

### 6.3 Cross-browser/device QA
- [ ] Test iOS Safari (recent 2 major versions).
- [ ] Test Android Chrome (recent 2 major versions).
- [ ] Test desktop Chrome, Edge, Safari, Firefox.

### 6.4 Release checklist
- [ ] Confirm all FR-01 through FR-24 are satisfied.
- [ ] Confirm all AC-01 through AC-09 pass.
- [ ] Freeze content and media assets.
- [ ] Build production bundle and smoke test routes.
- [ ] Launch and validate analytics event ingestion.

Dependencies: Phase 3, Phase 4, Phase 5
PRD links: Section 14, Section 15, Section 16, Section 18

## Requirement Traceability Matrix
### Functional Requirements -> Task Coverage
- FR-01, FR-02 -> Phase 3.1
- FR-03, FR-04, FR-05 -> Phase 1.2, Phase 3.1
- FR-06, FR-07 -> Phase 3.2
- FR-08, FR-09, FR-10, FR-11, FR-12, FR-13, FR-14 -> Phase 3.3
- FR-15, FR-16, FR-17 -> Phase 3.4
- FR-18 -> Phase 2.2, Phase 4.1
- FR-19, FR-20, FR-21, FR-22 -> Phase 4.2
- FR-23 -> Phase 2.1, Phase 5.1
- FR-24 -> Phase 6.1

### Acceptance Criteria -> Task Coverage
- AC-01, AC-02 -> Phase 6.2
- AC-03, AC-04 -> Phase 3.3, Phase 6.2
- AC-05 -> Phase 3.4, Phase 6.2
- AC-06 -> Phase 4.1, Phase 6.2
- AC-07 -> Phase 4.2, Phase 6.2
- AC-08 -> Phase 3.2, Phase 5.1
- AC-09 -> Phase 5.2, Phase 6.2

## Execution Order (Critical Path)
1. Phase 0 -> 1 -> 2
2. Phase 3
3. Phase 4
4. Phase 5
5. Phase 6

## Definition of Done
- [ ] All PRD functional requirements implemented and verified.
- [ ] All acceptance criteria pass on mobile and desktop.
- [ ] Accessibility and reduced-motion requirements are satisfied.
- [ ] Performance is acceptable with no perceptible interaction jank.
- [ ] Analytics events fire with required payload fields.
- [ ] Ready for launch per release checklist.
