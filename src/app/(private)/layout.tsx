import { redirect } from "next/navigation";
import { syncUserWithDb } from "@/lib/auth-sync";

export const dynamic = "force-dynamic";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  // Sync Clerk user with our database on every private route access
  const dbUser = await syncUserWithDb();

  // If sync fails (Clerk user doesn't exist or DB sync failed)
  if (!dbUser) {
    console.error("PrivateLayout: syncUserWithDb returned null. Possible DB connection issue.");

    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Algo salió mal</h1>
        <p className="mb-6 text-gray-600">
          No pudimos conectar con tu cuenta en nuestra base de datos.
          Esto suele ser un problema temporal de conexión.
        </p>
        <div className="flex gap-4">
          <a
            href="/dashboard/invitaciones"
            className="rounded-lg bg-[#E63946] px-4 py-2 text-white hover:bg-[#D62839]"
          >
            Reintentar acceso
          </a>
          <a
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
