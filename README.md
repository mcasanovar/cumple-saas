## CumpleSaaS · Invitaciones digitales premium

Base inicial de un SaaS para invitaciones de cumpleaños infantiles construida con **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**.

El proyecto prioriza una experiencia pública ultra rápida (render estático) y una capa dinámica para confirmar asistencia vía **Server Actions**, preparando el terreno para integrar un backend persistente (Supabase, bases privadas, CRM, etc.).

### Características clave

- Landing pública por `slug` (`/invitacion/[slug]`) generada de forma estática.
- Intro animada con transición «reveal» hacia la landing principal.
- Tematización dinámica (safari, princesa, dinosaurios, etc.) con decoraciones flotantes.
- Componentización lista para escalar: layout, experiencia completa, countdown, formulario RSVP.
- Server Action validada con `zod` y `useFormState`, dejando un in-memory store reemplazable por tu backend.
- Página de marketing (`/`) que explica el producto y enlaza a la demo.

## Estructura de carpetas relevante

```
src/
├── app/
│   ├── (public)/
│   │   └── invitacion/[slug]/   # Landing por invitación + server actions
│   ├── globals.css              # Tailwind v4 (sin config extra) + estilos base premium
│   ├── layout.tsx               # Tipografías y metadata global
│   └── page.tsx                 # Landing marketing SaaS
├── components/
│   └── invitation/             # UI/UX modular (IntroOverlay, Landing, RSVP, Countdown…)
├── config/
│   └── themes.ts               # Tokens visuales para cada temática
├── data/
│   └── invitations.ts          # Mock de invitaciones + helpers de búsqueda
└── lib/
    └── types/invitation.ts     # Tipados para temas, RSVP, y payloads
```

## Flujo de renderizado

1. **`generateStaticParams`** produce los `slug` disponibles (mock). Cada página se pre-renderiza en build para máxima velocidad y SEO.
2. **`InvitationExperience`** controla el estado de la experiencia (`intro → transition → landing`) y aplica animaciones fluidas con Framer Motion.
3. **`DecorativeBackground`** consume el tema seleccionado para pintar gradientes, partículas y elementos flotantes.
4. **`InvitationLanding`** secciona la información del evento, countdown, gallery, CTA de mapas y formulario RSVP.
5. **`RSVPForm`** envía al **Server Action `submitRSVP`** que valida con `zod`, guarda temporalmente la respuesta (mock in-memory) y dispara `revalidatePath` para refrescar la landing.

## Estrategia estática vs dinámica

- **Contenido público estático**: Toda la landing, hero, countdown y galerías se generan en build. Esto garantiza tiempos de carga mínimos, permite edge caching y asegura SEO sólido.
- **Capa dinámica RSVP**: Confirmar asistencia implica mutaciones. Los envíos se manejan con **Server Actions**, lo que evita exponer claves en el cliente y habilita escritura en bases de datos. El ejemplo guarda en memoria como placeholder; basta reemplazar el store por tu servicio (Supabase, Postgres, Firestore, etc.).

### ¿Por qué no basta con una página 100% estática?

Una landing puramente estática no puede recibir ni persistir confirmaciones (no hay lugar para mutaciones). El formulario podría mandar datos a un servicio externo mediante `fetch`, pero perderíamos trazabilidad y control del flujo. La capa de Server Actions permite validar, auditar, proteger credenciales y conectar con un backend escalable manteniendo la velocidad del contenido estático.

### Escalado hacia un SaaS multiusuario

1. **Persistencia real**: reemplaza `submissionsStore` por una tabla en Supabase u otro backend, guardando `slug`, usuario y metadata.
2. **Multi-tenant**: almacena invitaciones por cuenta de usuario y genera rutas (`/invitacion/[organizer]/[slug]`).
3. **Panel interno**: crear un grupo de rutas privadas (`(dashboard)`) con auth para que cada organizador gestione RSVP, temas y contenido.
4. **Temas avanzados**: mover `themes` a una tabla/configurable en CMS para permitir personalización sin despliegues.

## Scripts

```bash
npm run dev    # servidor local en http://localhost:3000
npm run lint   # linting con ESLint (estrict-mode Next 16)
npm run build  # build de producción (estático + server actions)
npm run start  # servir build
```

## Próximos pasos sugeridos

- Conectar el Server Action con Supabase (REST o client) y reemplazar el mock `submissionsStore`.
- Añadir autenticación (NextAuth/Auth.js) para panel de gestión.
- Incorporar ilustraciones/medios por tema (actualmente los paths están listos para assets en `public/`).
- Automatizar emails de confirmación usando webhooks o colas al persistir RSVP.
