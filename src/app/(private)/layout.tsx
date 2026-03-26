import { syncUserWithDb } from "@/lib/auth-sync";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  // Sync Clerk user with our database on every private route access
  await syncUserWithDb();

  return <>{children}</>;
}
