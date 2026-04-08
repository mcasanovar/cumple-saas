import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { resend } from "./resend";
import WelcomeEmail from "@/emails/WelcomeEmail";

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
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || null;

    // Upsert user in our database
    console.log(`Syncing user: ${clerkId} (${email})`);

    // Intentar encontrar al usuario por clerkId primero
    let dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (dbUser) {
      // Actualizar si existe
      dbUser = await prisma.user.update({
        where: { clerkId },
        data: { email, name },
      });
    } else {
      // Si no existe por clerkId, buscar por email para evitar P2002
      const existingUserByEmail = email
        ? await prisma.user.findUnique({ where: { email } })
        : null;

      if (existingUserByEmail) {
        // Vincular clerkId al usuario existente por email
        console.log(`Linking existing user ${existingUserByEmail.id} with new clerkId ${clerkId}`);
        dbUser = await prisma.user.update({
          where: { id: existingUserByEmail.id },
          data: { clerkId, name },
        });
      } else {
        // Crear nuevo usuario si no existe de ninguna forma
        dbUser = await prisma.user.create({
          data: { clerkId, email, name },
        });

        // ENVIAR CORREO DE BIENVENIDA SOLO CUANDO SE CREA
        if (email) {
          try {
            await resend.emails.send({
              from: "nvitame.com <hola@nvitame.com>",
              to: email,
              subject: "¡Bienvenido a nvitame! 🎂",
              react: WelcomeEmail({ userName: name || undefined }),
            });
            console.log(`Welcome email sent to ${email}`);
          } catch (mailError) {
            console.error("Error sending welcome email:", mailError);
          }
        }
      }
    }

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
