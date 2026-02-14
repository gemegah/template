export type AnalyticsEvent = {
  name:
    | "story_start"
    | "proposal_open"
    | "proposal_option_selected"
    | "celebration_shown"
    | "next_chapter_opened";
  timestamp: string;
  route: "/" | "/next-chapter";
  optionId?: "yes" | "of-course" | "try-again";
};

export function trackEvent(event: AnalyticsEvent) {
  // Placeholder for provider integration in later phases.
  console.info("[analytics]", event);
}
