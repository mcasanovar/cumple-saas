import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { updateSession } from '@/utils/supabase/middleware'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/invitacion/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Si el usuario está autenticado y está en una ruta pública (como la landing), redirigir al dashboard
  if (userId && isPublicRoute(req) && req.nextUrl.pathname === '/') {
    const dashboardUrl = new URL('/dashboard/invitaciones', req.url)
    return Response.redirect(dashboardUrl)
  }

  if (isProtectedRoute(req)) await auth.protect()
  return await updateSession(req)
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
