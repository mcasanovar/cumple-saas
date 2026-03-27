import { redirect } from "next/navigation";
import { syncUserWithDb } from "@/lib/auth-sync";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  // Sync Clerk user with our database on every private route access
  const dbUser = await syncUserWithDb();

  // If sync fails (Clerk user doesn't exist or DB sync failed), 
  // redirect to landing to prevent unauthorized dashboard access.
  if (!dbUser) {
    redirect("/");
  }

  return <>{children}</>;
}
