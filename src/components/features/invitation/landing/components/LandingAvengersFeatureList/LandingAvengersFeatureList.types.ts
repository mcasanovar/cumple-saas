import type { LandingFeature } from "../../hooks/useLandingContent";
import type { ThemeConfig } from "@/lib/types/invitation";

export type LandingAvengersFeatureListProps = {
  featureList: LandingFeature[];
  typography: ThemeConfig["typography"];
};
