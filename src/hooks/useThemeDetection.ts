import { useMemo } from "react";
import type { ThemeToken } from "@/lib/types/invitation";

export type ThemeDetection = {
  isDinoTheme: boolean;
  isSafariTheme: boolean;
  isPrincessTheme: boolean;
};

export function useThemeDetection(themeToken?: ThemeToken): ThemeDetection {
  return useMemo(() => {
    return {
      isDinoTheme: themeToken === "dinosaurios",
      isSafariTheme: themeToken === "safari",
      isPrincessTheme: themeToken === "princesa",
    };
  }, [themeToken]);
}
