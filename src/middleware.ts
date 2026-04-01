import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
// const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/invitacion/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth()

    // Si el usuario está autenticado y está en la raíz, redirigir al dashboard
    if (userId && req.nextUrl.pathname === '/') {
      const dashboardUrl = new URL('/dashboard/invitaciones', req.url)
      return NextResponse.redirect(dashboardUrl)
    }

    if (isProtectedRoute(req)) {
      await auth.protect()
    }

    return await updateSession(req)
  } catch (error) {
    console.error('Middleware error:', error)
    return await updateSession(req)
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
