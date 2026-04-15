import type { TemplateId } from "@/lib/types/template";

import type { TemplateOption } from "./types";

export const AVAILABLE_TEMPLATES: TemplateOption[] = [
  {
    id: "safari-adventure" as TemplateId,
    name: "Safari Adventure",
    theme: "safari",
    emoji: "🦁",
    description: "Una aventura salvaje llena de animales y diversión",
  },
  {
    id: "princess-dreams" as TemplateId,
    name: "Princess Dreams",
    theme: "princesa",
    emoji: "👑",
    description: "Un reino mágico de princesas y castillos",
    previewImage: "/elsa-frozen.png",
  },
  {
    id: "dino-party" as TemplateId,
    name: "Dino Party",
    theme: "dinosaurios",
    emoji: "🦖",
    description: "Viaja al pasado con dinosaurios gigantes",
  },
  {
    id: "k-pop" as TemplateId,
    name: "K-Pop Stars",
    theme: "k-pop",
    emoji: "🎤",
    description: "Para la próxima gran estrella de la música",
    previewImage: "/k-pop.png",
  },
  {
    id: "avengers-hero" as TemplateId,
    name: "Avengers Hero",
    theme: "avengers",
    emoji: "🦸",
    description: "Una celebración épica digna de los héroes más poderosos",
    previewImage: "/avengers-preview.png",
  },
];

export const CREATION_STEPS = [
  { id: "template", label: "Plantilla", number: 1 },
  { id: "event-info", label: "Información", number: 2 },
  { id: "images", label: "Imágenes", number: 3 },
] as const;

export const PRICE_CLP = 5990;

export const ALLOWED_IMAGE_FORMATS = [".jpeg", ".jpg", ".png"] as const;
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"] as const;
export const ACCEPTED_IMAGE_TYPES = ".jpeg,.jpg,.png";

export const EVENT_ICON_SETS = [
  {
    label: "Celebración",
    prefix: "pi",
    icons: [
      "PiCakeBold", "PiConfettiBold", "PiBalloonBold", "PiGiftBold",
      "PiSparkleBold", "PiCrownBold", "PiBalloonLight", "PiFireBold", "PiBalloonDuotone", "LuPartyPopper"
    ],
  },
  {
    label: "Música",
    prefix: "fa",
    icons: [
      "FaGuitar", "FaDrum", "FaMicrophone", "FaMusic", "FaHeadphones",
      "FaCompactDisc", "FaRecordVinyl", "FaHeadphonesAlt", "PiMusicNotesBold"
    ],
  },
  {
    label: "Juegos",
    prefix: "gi",
    icons: [
      "GiGamepad", "GiConsoleController", "GiDiceTwentyFacesOne", "GiPerspectiveDiceSixFacesRandom",
      "GiCardRandom", "GiBowlingStrike", "GiBasketballBall", "GiSoccerBall", "GiTennisRacket",
      "GiCardboardBox"
    ],
  },
  {
    label: "Comida",
    prefix: "tb",
    icons: [
      "TbBurger", "TbPizza", "TbIceCream", "TbCake", "TbCoffee", "TbCup", "TbBottle",
      "TbBread", "TbSoup", "TbMeat"
    ],
  },
  {
    label: "Arte y hobbies",
    prefix: "lu",
    icons: [
      "LuPalette", "LuPenLine", "LuScissors", "LuBrush",
      "LuShapes", "LuSparkles", "LuStar", "LuSunMedium"
    ],
  },
  {
    label: "Bebé y Bautizo",
    prefix: "pi",
    icons: [
      "PiBabyBold", "PiHandsPrayingBold", "PiCrossBold", "PiBirdBold",
      "FaChild", "FaBaby", "GiAngelWings"
    ],
  },
  {
    label: "Matrimonio",
    prefix: "pi",
    icons: [
      "PiHeartBold", "PiChurchBold", "PiWineBold", "PiChampagneBold",
      "GiEngagementRing", "LuChurch"
    ],
  },
] as const;

export const EVENT_ICON_LIST = EVENT_ICON_SETS.flatMap((set) => set.icons);
