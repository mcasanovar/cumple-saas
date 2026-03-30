import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  PiCakeBold,
  PiConfettiBold,
  PiBalloonBold,
  PiGiftBold,
  PiSparkleBold,
  PiCrownBold,
  PiBalloonLight,
  PiFireBold,
  PiBalloonDuotone,
  PiBabyBold,
  PiHandsPrayingBold,
  PiCrossBold,
  PiBirdBold,
  PiHeartBold,
  PiChurchBold,
  PiWineBold,
  PiChampagneBold,
  PiHouseBold,
  PiMapPinBold,
  PiCalendarBold,
  PiClockBold,
  PiMusicNotesBold,
} from "react-icons/pi";
import {
  FaGuitar,
  FaDrum,
  FaMicrophone,
  FaMusic,
  FaHeadphones,
  FaCompactDisc,
  FaRecordVinyl,
  FaHeadphonesAlt,
  FaChild,
  FaBaby,
} from "react-icons/fa";
import {
  GiGamepad,
  GiConsoleController,
  GiDiceTwentyFacesOne,
  GiPerspectiveDiceSixFacesRandom,
  GiCardRandom,
  GiBowlingStrike,
  GiBasketballBall,
  GiSoccerBall,
  GiTennisRacket,
  GiCardboardBox,
  GiEngagementRing,
  GiAngelWings,
} from "react-icons/gi";
import {
  TbBurger,
  TbPizza,
  TbIceCream,
  TbCake,
  TbCoffee,
  TbCup,
  TbBottle,
  TbBread,
  TbSoup,
  TbMeat,
} from "react-icons/tb";
import {
  LuPalette,
  LuPenLine,
  LuScissors,
  LuBrush,
  LuShapes,
  LuSparkles,
  LuStar,
  LuPartyPopper,
  LuSunMedium,
  LuChurch,
} from "react-icons/lu";

const ICON_MAP: Record<string, IconType> = {
  PiCakeBold,
  PiConfettiBold,
  PiBalloonBold,
  PiGiftBold,
  PiSparkleBold,
  PiCrownBold,
  PiBalloonLight,
  PiFireBold,
  PiBalloonDuotone,
  PiBabyBold,
  PiHandsPrayingBold,
  PiCrossBold,
  PiBirdBold,
  PiHeartBold,
  PiChurchBold,
  PiWineBold,
  PiChampagneBold,
  PiHouseBold,
  PiMapPinBold,
  PiCalendarBold,
  PiClockBold,
  PiMusicNotesBold,
  FaGuitar,
  FaDrum,
  FaMicrophone,
  FaMusic,
  FaHeadphones,
  FaCompactDisc,
  FaRecordVinyl,
  FaHeadphonesAlt,
  FaChild,
  FaBaby,
  GiGamepad,
  GiConsoleController,
  GiDiceTwentyFacesOne,
  GiPerspectiveDiceSixFacesRandom,
  GiCardRandom,
  GiBowlingStrike,
  GiBasketballBall,
  GiSoccerBall,
  GiTennisRacket,
  GiCardboardBox,
  GiEngagementRing,
  GiAngelWings,
  TbBurger,
  TbPizza,
  TbIceCream,
  TbCake,
  TbCoffee,
  TbCup,
  TbBottle,
  TbBread,
  TbSoup,
  TbMeat,
  LuPalette,
  LuPenLine,
  LuScissors,
  LuBrush,
  LuShapes,
  LuSparkles,
  LuStar,
  LuPartyPopper,
  LuSunMedium,
  LuChurch,
};

const ICON_COLORS: Record<string, string> = {
  // Celebración
  PiCakeBold: "#BE185D", // pink-700
  PiConfettiBold: "#A16207", // yellow-700
  PiBalloonBold: "#B91C1C", // red-700
  PiGiftBold: "#6D28D9", // violet-700
  PiSparkleBold: "#0E7490", // cyan-700
  PiCrownBold: "#B45309", // amber-700
  PiBalloonLight: "#1D4ED8", // blue-700
  PiFireBold: "#B91C1C", // red-700
  PiBalloonDuotone: "#A21CAF", // fuchsia-700
  // Música
  FaGuitar: "#78350F", // amber-900
  FaDrum: "#7F1D1D", // red-900
  FaMicrophone: "#374151", // gray-700
  FaMusic: "#4338CA", // indigo-700
  FaHeadphones: "#111827", // gray-900
  FaCompactDisc: "#4338CA", // indigo-700
  FaRecordVinyl: "#000000", // black
  FaHeadphonesAlt: "#1F2937", // gray-800
  PiMusicNotesBold: "#4338CA", // indigo-700
  // Juegos
  GiGamepad: "#1D4ED8", // blue-700
  GiConsoleController: "#1E3A8A", // blue-900
  GiDiceTwentyFacesOne: "#9F1239", // rose-800
  GiPerspectiveDiceSixFacesRandom: "#166534", // green-800
  GiCardRandom: "#991B1B", // red-800
  GiBowlingStrike: "#1E3A8A", // blue-900
  GiBasketballBall: "#9A3412", // orange-800
  GiSoccerBall: "#000000", // black
  GiTennisRacket: "#15803D", // green-700
  GiCardboardBox: "#713F12", // amber-900
  // Comida
  TbBurger: "#78350F", // amber-900
  TbPizza: "#B91C1C", // red-700
  TbIceCream: "#BE185D", // pink-700
  TbCake: "#BE185D", // pink-700
  TbCoffee: "#451A03", // amber-950
  TbCup: "#1D4ED8", // blue-700
  TbBottle: "#064E3B", // emerald-900
  TbBread: "#92400E", // amber-800
  TbSoup: "#3F6212", // lime-800
  TbMeat: "#7F1D1D", // red-900
  // Arte
  LuPalette: "#A21CAF", // fuchsia-700
  LuPenLine: "#1D4ED8", // blue-700
  LuScissors: "#374151", // gray-700
  LuBrush: "#6D28D9", // violet-700
  LuShapes: "#065F46", // emerald-800
  LuSparkles: "#A16207", // yellow-700
  LuStar: "#A16207", // yellow-700
  LuPartyPopper: "#C2410C", // orange-700
  LuSunMedium: "#B45309", // amber-700
  // Bautizo / Bebé
  PiBabyBold: "#1D4ED8", // blue-700
  PiHandsPrayingBold: "#78350F", // amber-900
  PiCrossBold: "#78350F", // amber-900
  PiBirdBold: "#334155", // slate-700
  FaChild: "#065F46", // emerald-800
  FaBaby: "#BE185D", // pink-700
  GiAngelWings: "#334155", // slate-700
  // Matrimonio
  PiHeartBold: "#B91C1C", // red-700
  PiChurchBold: "#1E293B", // slate-800
  PiWineBold: "#7F1D1D", // red-900
  PiChampagneBold: "#854D0E", // yellow-800
  GiEngagementRing: "#A16207", // yellow-700
  LuChurch: "#1E293B", // slate-800
  // Meta
  PiHouseBold: "#111827",
  PiMapPinBold: "#B91C1C",
  PiCalendarBold: "#1D4ED8",
  PiClockBold: "#374151",
};

export type IconRendererProps = {
  icon?: string | null;
  className?: string;
  fallback?: string;
  style?: CSSProperties;
  title?: string;
};

export function IconRenderer({
  icon,
  className,
  fallback = "\u{1F389}",
  style,
  title,
}: IconRendererProps) {
  const normalizedIcon = icon?.trim();
  const IconComponent = normalizedIcon ? ICON_MAP[normalizedIcon] : undefined;
  const defaultColor = normalizedIcon ? ICON_COLORS[normalizedIcon] : undefined;

  if (IconComponent) {
    return (
      <IconComponent
        className={className}
        title={title}
        aria-hidden={!title}
        style={{ color: defaultColor, ...style }}
      />
    );
  }

  return (
    <span className={className} title={title} aria-hidden={!title} style={style}>
      {normalizedIcon || fallback}
    </span>
  );
}
