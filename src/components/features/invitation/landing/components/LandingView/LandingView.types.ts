import type { LandingContent } from "../../hooks/useLandingContent";

export type LandingViewProps = LandingContent & {
  invitationId: string;
  isPreview?: boolean;
  isEventPast?: boolean;
};
