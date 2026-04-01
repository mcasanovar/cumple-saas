import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

/**
 * Synchronizes the current Clerk user with our PostgreSQL database.
 * This should be called in a Server Component within a protected route.
 */
export async function syncUserWithDb() {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const clerkId = user.id;
    const email = user.emailAddresses[0]?.emailAddress;
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || null;

    // Upsert user in our database
    console.log(`Syncing user: ${clerkId} (${email})`);

    const dbUser = await prisma.user.upsert({
      where: { clerkId },
      update: {
        email,
        name,
      },
      create: {
        clerkId,
        email,
        name,
      },
    });

    console.log(`User synced successfully: ${dbUser.id}`);
    return dbUser;
  } catch (error) {
    console.error("Error syncing user with database:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);
    }
    return null;
  }
}
