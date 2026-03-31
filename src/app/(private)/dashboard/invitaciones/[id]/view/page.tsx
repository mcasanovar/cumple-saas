import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

interface InvitationViewPageProps {
  params: Promise<{ id: string }>;
}

async function getInvitation(id: string, userId: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: {
      purchase: true,
      user: true,
    },
  });

  if (!invitation) return null;
  if (invitation.user.clerkId !== userId) return null;

  return invitation;
}

export default async function InvitationViewPage({ params }: InvitationViewPageProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const invitation = await getInvitation(id, userId);

  if (!invitation) {
    notFound();
  }

  // Parse config data
  const config = invitation.config as any;

  // Usar la URL guardada en la base de datos o construir una por defecto si no existe
  const shareableUrl = invitation.url_ext_invitation ||
    (invitation.id ? `${process.env.NEXT_PUBLIC_BASE_URL || ""}/invitacion/${invitation.id}` : null);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/dashboard/invitaciones"
              className="flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-gray-900 sm:gap-2 sm:text-base"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Volver</span>
            </Link>
            <h1 className="text-base font-bold text-gray-900 sm:text-xl">Detalles</h1>
          </div>

          {invitation.isPaid && (
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              PAGADO
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        {/* Shareable Link Section */}
        {shareableUrl && (
          <div className="mb-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4 shadow-sm sm:mb-8 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500 text-white shadow-lg sm:h-14 sm:w-14">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Link para compartir</h2>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Comparte este link con tus invitados para que vean la invitación
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={shareableUrl}
                    readOnly
                    className="flex-1 rounded-xl border border-purple-200 bg-white px-4 py-3 text-xs font-mono text-gray-700 shadow-inner focus:outline-none sm:text-sm"
                  />
                  <Link
                    href={shareableUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-purple-700 active:scale-95"
                  >
                    <span>Ver invitación</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Celebrant Info */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-lg">🎂</span>
                Información del festejado
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-lg font-semibold text-gray-900">{invitation.celebrantName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Edad que cumple</p>
                  <p className="text-lg font-semibold text-gray-900">{invitation.celebrantAge} años</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Descripción</p>
                  <p className="text-gray-900">{config.celebrantDescription || "Sin descripción"}</p>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-lg">📅</span>
                Detalles del evento
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha</p>
                  <p className="font-semibold text-gray-900">
                    {invitation.eventDate.toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hora</p>
                  <p className="font-semibold text-gray-900">{invitation.eventTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Lugar</p>
                  <p className="font-semibold text-gray-900">{invitation.venueName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Dirección</p>
                  <p className="font-semibold text-gray-900">{config.venueAddress || "Sin dirección"}</p>
                </div>
              </div>
            </div>

            {/* Gallery Preview */}
            {invitation.celebrantImages && Array.isArray(invitation.celebrantImages) && invitation.celebrantImages.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-lg">🖼️</span>
                  Galería de fotos
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {invitation.celebrantImages
                    .filter((img): img is string => typeof img === "string")
                    .map((img, i) => (
                      <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
                        <img
                          src={img}
                          alt={`Foto ${i + 1}`}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Acciones</h3>
              <div className="space-y-3">
                {shareableUrl && (
                  <Link
                    href={shareableUrl}
                    target="_blank"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white transition hover:shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Ver como invitado
                  </Link>
                )}
                <Link
                  href="/dashboard/invitaciones"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Mis invitaciones
                </Link>
              </div>
            </div>

            {/* Purchase Info */}
            {invitation.purchase && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Información de compra</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estado</span>
                    <span className="font-medium text-green-600">{invitation.purchase.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monto</span>
                    <span className="font-medium">${invitation.purchase.amount.toLocaleString("es-CL")} {invitation.purchase.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fecha</span>
                    <span className="font-medium">
                      {invitation.purchase.createdAt.toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  {invitation.purchase.externalReference && (
                    <div className="pt-2">
                      <span className="text-gray-500">Referencia:</span>
                      <p className="mt-1 break-all font-mono text-xs text-gray-600">
                        {invitation.purchase.externalReference}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Template Info */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Plantilla</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                  🎨
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{invitation.templateId}</p>
                  <p className="text-sm text-gray-500">ID de plantilla</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
