"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { UserInvitationData } from "@/lib/types/template";
import type { InvitationRenderConfig, ThemeToken } from "@/lib/types/invitation";
import { InvitationExperience } from "@/components/features/invitation/InvitationExperience";
import { themes } from "@/config/themes";

// X Icon SVG
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

type TemplatePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  invitationData: UserInvitationData | null;
};

// Helper function to convert UserInvitationData to InvitationRenderConfig
// Same process as used in preview/page.tsx
function mapUserInvitationToRenderConfig(
  userInvitation: UserInvitationData
): InvitationRenderConfig {
  // Determine theme based on templateId
  const templateId = userInvitation.templateId;
  let themeToken: ThemeToken = "safari";

  if (templateId.includes("princess")) themeToken = "princesa";
  else if (templateId.includes("dino")) themeToken = "dinosaurios";
  else if (templateId.includes("k-pop")) themeToken = "k-pop";
  else if (templateId.includes("safari")) themeToken = "safari";

  const theme = themes[themeToken];

  return {
    invitationId: userInvitation.id,
    templateId: userInvitation.templateId,
    slug: userInvitation.slug,
    theme: themeToken,
    metaTitle: userInvitation.metaTitle,
    metaDescription: userInvitation.metaDescription,

    hero: {
      headline: userInvitation.celebrantName,
      subheadline: `Cumple ${userInvitation.age} años`,
      featuredIllustration: userInvitation.gallery?.[0]?.imageUrl || "/vercel.svg",
    },

    event: {
      celebrantName: userInvitation.celebrantName,
      age: userInvitation.age,
      date: userInvitation.date,
      time: userInvitation.time,
      venueName: userInvitation.venueName,
      venueAddress: userInvitation.venueAddress,
      googleMapsUrl: userInvitation.googleMapsUrl,
      coordinates: userInvitation.coordinates,
      venueImageUrl: userInvitation.gallery?.[0]?.imageUrl || "/vercel.svg",
      celebrantDescription: userInvitation.celebrantDescription,
      invitationMessage: theme?.defaultMessages?.invitationMessage ?? "¡Te invitamos a celebrar con nosotros!",
      closingMessage: theme?.defaultMessages?.closingMessage ?? "¡No faltes!",
    },

    gallery: userInvitation.gallery?.map((img, i) => ({
      id: img.id || `img-${i}`,
      imageUrl: img.imageUrl,
      caption: img.caption || `Imagen ${i + 1}`,
    })) || [],

    features: [],

    countdown: {
      targetDateISO: userInvitation.targetDateISO || new Date().toISOString(),
    },

    intro: {
      celebrantHeadline: userInvitation.celebrantName,
      celebrantSubtitle: `Cumple ${userInvitation.age} años`,
      celebrantTagline: userInvitation.celebrantDescription,
      hintHeadline: "Tenemos una noticia...",
      buttonLabel: "presiona",
      celebrateNameClass: "",
      detailLeft: userInvitation.introOverrides?.detailLeft ?? {
        title: userInvitation.date.split(",")[0]?.toUpperCase() || "EVENTO",
        subtitle: userInvitation.date.split(",")[1]?.trim().toUpperCase() || userInvitation.date.toUpperCase(),
        helper: "EVENTO ESPECIAL",
      },
      detailRight: userInvitation.introOverrides?.detailRight ?? {
        title: userInvitation.time.toUpperCase(),
        subtitle: userInvitation.venueName.toUpperCase(),
        helper: userInvitation.venueAddress?.toUpperCase(),
      },
    },
  };
}

export function TemplatePreviewModal({
  isOpen,
  onClose,
  invitationData,
}: TemplatePreviewModalProps) {
  const renderConfig = useMemo(() => {
    if (!invitationData) return null;
    return mapUserInvitationToRenderConfig(invitationData);
  }, [invitationData]);

  if (!invitationData || !renderConfig) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container - 85% width and height */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[85vw] h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:bg-white hover:scale-110"
              >
                <XIcon className="h-6 w-6" />
              </button>

              {/* Preview Badge */}
              <div className="absolute left-4 top-4 z-[100]">
                <div className="rounded-full bg-black/80 px-4 py-2 text-xs font-bold text-white backdrop-blur-md border border-white/20">
                  PREVIEW DE PLANTILLA
                </div>
              </div>

              {/* InvitationExperience Container */}
              <div className="w-full h-full overflow-hidden rounded-[2rem]">
                <InvitationExperience invitation={renderConfig} isPreview />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
