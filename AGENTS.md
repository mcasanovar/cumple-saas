# AGENTS.md - Guía para Agentes de IA

> **Propósito**: Este documento proporciona instrucciones precisas y accionables para que agentes de IA trabajen consistentemente en el proyecto CumpleSaaS, asegurando calidad, consistencia y alineariento con la arquitectura actual.

---

## 🚀 Decisiones Rápidas (Consulta Primero)

### ¿Dónde creo un nuevo componente?

```
¿Es reutilizable entre features? 
  ├─ SÍ → components/shared/[dominio]/[ComponentName]/
  └─ NO → ¿Es parte de qué feature?
         ├─ Public Invitation → components/features/invitation/[intro|landing]/components/
         ├─ Invitation Creation → components/features/invitation/creation/components/
         ├─ Dashboard → components/features/dashboard/components/
         └─ Marketing → components/features/marketing-landing/components/
```

### ¿Qué tipo de componente creo?

```
¿Maneja estado o lógica de negocio (data fetching, mutaciones)?
  ├─ SÍ → Container Component (usa hooks, Server Actions, pasa datos a View)
  │        Ej: InvitationCreation.tsx, DashboardHome.tsx
  └─ NO → Presentational Component (solo recibe props y renderiza UI)
           Ej: CreationStep.tsx, InvitationCard.tsx
```

### ¿Dónde va mi lógica?

```
¿Qué tipo de lógica es?
  ├─ Data Fetching/Mutations (Cliente) → hooks/useFeatureName.ts (usando Supabase client)
  ├─ Data Fetching/Mutations (Servidor) → Server Action en `actions.ts` del feature
  ├─ Validación de Formularios → Server Action con Zod
  ├─ Transformación de Datos (UI) → hooks/useFeatureContent.ts
  ├─ Constantes de Feature → `constants.ts` en el directorio del feature
  ├─ Variantes de Animación → `variants.ts` en el directorio del feature
  ├─ Tipos Compartidos → `lib/types/[dominio].ts`
  └─ Lógica de Autenticación → `lib/auth-sync.ts` o hooks de Clerk/Supabase
```

### ¿Necesito "use client"?

```
¿El componente usa alguno de estos?
  ├─ Hooks (useState, useEffect, etc.) → SÍ, agregar "use client"
  ├─ Framer Motion (motion.*) → SÍ, agregar "use client"
  ├─ Event Handlers (onClick, onChange) → SÍ, agregar "use client"
  ├─ APIs de Browser (localStorage) → SÍ, agregar "use client"
  └─ Solo renderiza props o es Server Component → NO, mantener como Server Component
```

---

## 1. Descripción del Proyecto

**CumpleSaaS** es una plataforma SaaS para crear y gestionar invitaciones digitales premium de cumpleaños infantiles. El sistema permite a los usuarios registrados diseñar, personalizar, pagar y publicar invitaciones inmersivas con animaciones, confirmación de asistencia (RSVP) y un panel de control para su gestión.

### Flujo Principal de Usuario:

1.  **Autenticación**: El usuario se registra/inicia sesión con **Clerk**. La sesión se sincroniza con una tabla `User` en **Supabase**.
2.  **Creación**: Desde el Dashboard (`/dashboard`), el usuario inicia un flujo de creación de invitaciones multi-paso.
3.  **Personalización**: Elige una plantilla, completa detalles del evento y sube imágenes a **Cloudinary**.
4.  **Pago**: Realiza el pago a través de **Mercado Pago** para activar la invitación.
5.  **Publicación**: Una vez pagada, la invitación se publica en una URL única (`/invitacion/[slug]`).
6.  **Gestión**: El usuario puede ver sus invitaciones y los RSVP recibidos en su dashboard.

### Características Clave:

- **Autenticación y Gestión de Usuarios**: Integrado con Clerk y Supabase.
- **Flujo de Creación Guiado**: Experiencia de usuario paso a paso para crear invitaciones.
- **Dashboard de Usuario**: Panel central para gestionar invitaciones y ver confirmaciones.
- **Integración de Pagos**: Conexión con Mercado Pago para procesar la activación de invitaciones.
- **Gestión de Imágenes**: Carga y optimización de imágenes a través de Cloudinary.
- **Invitaciones Públicas Optimizadas**: Páginas generadas estáticamente (SSG) con animaciones y RSVP.
- **Tematización Dinámica**: Múltiples plantillas visuales (safari, princesa, etc.).

---

## 2. Stack Tecnológico

### Core Framework:
- **Next.js 16.1.6** (App Router, Server Actions, Turbopack)
- **React 19.2.3** (React Server Components, `useActionState`)
- **TypeScript 5** (modo `strict`)

### Backend y Base de Datos:
- **Supabase**: Como base de datos PostgreSQL y para sincronización de usuarios.
- **Prisma**: ORM para interactuar con la base de datos de Supabase.
- **Clerk**: Para autenticación y gestión de usuarios.

### Servicios Externos:
- **Mercado Pago**: Pasarela de pagos para Latinoamérica.
- **Cloudinary**: Almacenamiento, optimización y entrega de imágenes.

### Styling y Animaciones:
- **Tailwind CSS v4**: Framework de CSS utility-first.
- **Framer Motion 12.36.0**: Para animaciones complejas y transiciones de página.

### Validación y Datos:
- **Zod 4.3.6**: Validación de schemas para Server Actions y formularios.
- **Leaflet 1.9.4**: Para mapas interactivos en las invitaciones.

---

## 3. Arquitectura del Proyecto

```
web/
├── src/
│   ├── app/
│   │   ├── (private)/                # Rutas protegidas por autenticación
│   │   │   └── dashboard/
│   │   │       ├── invitaciones/
│   │   │       │   ├── crear/        # Flujo de creación de invitaciones
│   │   │       │   └── [id]/         # Vista de detalle de invitación
│   │   │       └── layout.tsx        # Layout del dashboard
│   │   │
│   │   ├── (public)/                 # Rutas públicas
│   │   │   ├── invitacion/[slug]/    # Página pública de la invitación (SSG)
│   │   │   └── page.tsx              # Landing de marketing
│   │   │
│   │   ├── api/
│   │   │   └── webhook/mercadopago/  # Webhook para confirmar pagos
│   │   │
│   │   └── layout.tsx                # Layout raíz (con providers de Clerk y Supabase)
│   │
│   ├── components/
│   │   ├── features/
│   │   │   ├── dashboard/            # Componentes para el panel de usuario
│   │   │   ├── invitation/           # Componentes para la experiencia pública y creación
│   │   │   └── marketing-landing/    # Componentes para la página de marketing
│   │   │
│   │   └── shared/                   # Componentes reutilizables (botones, inputs, etc.)
│   │
│   ├── config/                     # Configuraciones estáticas
│   │   └── themes.ts
│   │
│   ├── lib/                        # Lógica de negocio y clientes de servicios
│   │   ├── auth-sync.ts            # Sincronización entre Clerk y Supabase
│   │   ├── cloudinary.ts           # Cliente y helpers para Cloudinary
│   │   ├── mercadopago.ts          # Cliente y helpers para Mercado Pago
│   │   ├── prisma.ts               # Instancia global de Prisma Client
│   │   └── types/                  # Definiciones de tipos compartidas
│   │
│   ├── utils/                      # Utilidades generales
│   │   └── supabase/               # Clientes de Supabase (servidor, cliente, middleware)
│
├── prisma/
│   └── schema.prisma             # Schema de la base de datos
│
├── public/                       # Assets estáticos
└── package.json                  # Dependencias y scripts
```

### Responsabilidades por Directorio:

- **`app/(private)`**: Contiene todas las rutas que requieren que el usuario esté autenticado. Protegido por el middleware de Clerk.
- **`app/(public)`**: Rutas accesibles para cualquier visitante.
- **`app/api`**: Endpoints de API, como webhooks para servicios externos.
- **`components/features`**: Componentes de alto nivel que definen una funcionalidad específica (ej: `DashboardHome`, `InvitationCreationFlow`).
- **`lib`**: El corazón de la lógica de negocio. Contiene la configuración y los adaptadores para todos los servicios externos.
- **`utils/supabase`**: Encapsula la creación de clientes de Supabase para diferentes contextos (cliente, servidor, middleware), una práctica clave para interactuar con el servicio.

---

## 4. Guía de Desarrollo para Agentes de IA

### CHECKLIST OBLIGATORIO - Antes de Cualquier Cambio:

```
□ Leí los archivos relacionados con mi tarea (componentes, hooks, actions).
□ Entendí el patrón Container/Presentational y la separación de lógica.
□ Verifiqué la ubicación correcta para mi nuevo archivo según el árbol de decisión.
□ Confirmé que el naming de mi archivo y mis variables sigue las convenciones.
□ Revisé si existe un hook o utilidad en `lib/` o `hooks/` que ya resuelva parte de mi problema.
□ Identifiqué si el componente debe ser Client (`"use client"`) o Server Component.
□ Verifiqué los tipos relevantes en `lib/types/` antes de crear uno nuevo.
```

### PROCESO PASO A PASO - Agregar una Feature en el Dashboard

**Escenario**: Agregar una nueva sección en el dashboard que muestra estadísticas de RSVP.

1.  **Crear el Server Action para obtener datos**:
    - En una nueva carpeta `app/(private)/dashboard/actions.ts`, crea una función `getRSVPStats`.
    - Usa el cliente de Supabase (`utils/supabase/server.ts`) para consultar la base de datos.
    - La función debe ser segura, verificando el `userId` de la sesión de Clerk.

2.  **Crear el Container Component**:
    - Crea `components/features/dashboard/RSVPStats.tsx`.
    - Este será un **Server Component** que llama directamente a `getRSVPStats()`.

3.  **Crear el Presentational Component**:
    - Crea `components/features/dashboard/components/RSVPStatsView.tsx`.
    - Este componente recibe los datos de estadísticas como props y los renderiza.
    - Probablemente será un Client Component (`"use client"`) si incluye gráficos interactivos o filtros.

4.  **Integrar en la página del Dashboard**:
    - En `app/(private)/dashboard/page.tsx`, importa y renderiza `<RSVPStats />`.

### PROCESO PASO A PASO - Modificar el Flujo de Creación

**Escenario**: Añadir un nuevo paso para configurar un código QR en la invitación.

1.  **Actualizar el estado del flujo**:
    - En `components/features/invitation/creation/hooks/useCreationFlow.ts`, añade el nuevo paso al gestor de estado (probablemente un `useState` o `useReducer`).

2.  **Crear el componente del nuevo paso**:
    - Crea `components/features/invitation/creation/components/QRCodeStep.tsx`.
    - Implementa el formulario para este paso. Si requiere lógica compleja, crea un hook `useQRCodeStep.ts`.

3.  **Crear el Server Action para guardar los datos**:
    - En `app/(private)/dashboard/invitaciones/crear/actions.ts`, añade una nueva función `saveQRCodeConfig`.
    - Usa Zod para validar los datos del formulario.
    - Usa Prisma para actualizar el campo `config` en el modelo `Invitation`.

4.  **Integrar en el componente principal del flujo**:
    - En `components/features/invitation/creation/CreationFlow.tsx`, renderiza `QRCodeStep` condicionalmente según el paso actual.

### ❌ PROHIBIDO - Acciones que NUNCA Debes Hacer:

- **NO instalar nuevas dependencias** sin aprobación. Usa lo que está en `package.json`.
- **NO modificar archivos de configuración raíz** (`next.config.ts`, `tsconfig.json`, `postcss.config.mjs`) sin una razón explícita y aprobación.
- **NO instanciar clientes de servicios directamente**. Usa los helpers proporcionados en `lib/` (ej: `lib/prisma.ts`, `utils/supabase/client.ts`).
- **NO escribir lógica de acceso a BD fuera de los Server Actions o API routes**. Mantén la seguridad y la lógica centralizada.
- **NO cambiar la arquitectura fundamental** (Container/Presentational, ubicación de Server Actions) sin discutirlo.
- **NO deshabilitar reglas de ESLint** sin una justificación válida.

---

## 5. Servicios y Agentes Externos

Esta sección documenta cómo el sistema interactúa con servicios clave y define las responsabilidades de los agentes de IA que trabajan en ellos.

### Agente: `DatabaseAgent`

-   **Responsabilidad**: Interactuar con la base de datos PostgreSQL a través de Prisma.
-   **Entradas**: Schemas de Zod validados, `userId` para autorización.
-   **Salidas**: Datos de la base de datos o resultados de mutaciones.
-   **Herramientas**: `lib/prisma.ts`.
-   **Restricciones**: **Siempre** debe operar dentro de un Server Action o una API route. **Nunca** exponer el cliente de Prisma al lado del cliente. Todas las consultas deben filtrar por `userId` para asegurar la tenencia de datos.

### Agente: `AuthAgent`

-   **Responsabilidad**: Gestionar la autenticación de usuarios y la sincronización de datos entre Clerk y Supabase.
-   **Entradas**: Peticiones de inicio de sesión/registro, webhooks de Clerk.
-   **Salidas**: Sesiones de usuario, datos de usuario sincronizados en la BD.
-   **Herramientas**: `@clerk/nextjs`, `utils/supabase/server.ts`, `lib/auth-sync.ts`.
-   **Restricciones**: La lógica de sincronización es crítica. Modificar `lib/auth-sync.ts` requiere una revisión cuidadosa para evitar inconsistencias de datos.

### Agente: `PaymentAgent`

-   **Responsabilidad**: Crear preferencias de pago, procesar pagos y confirmar transacciones.
-   **Entradas**: `invitationId`, monto, datos del usuario.
-   **Salidas**: URL de checkout, estado de pago actualizado en la BD.
-   **Herramientas**: `lib/mercadopago.ts`, `app/api/webhook/mercadopago/route.ts`.
-   **Restricciones**: El webhook es un punto crítico de seguridad. Debe validar la firma de Mercado Pago y manejar los estados de pago de forma idempotente.

### Agente: `StorageAgent`

-   **Responsabilidad**: Gestionar la carga, optimización y entrega de imágenes.
-   **Entradas**: Archivos de imagen (`FormData`), `invitationId`.
-   **Salidas**: URLs de imágenes optimizadas, actualización de la invitación en la BD.
-   **Herramientas**: `lib/cloudinary.ts`, Server Actions para la carga.
-   **Restricciones**: Las cargas deben estar asociadas a un usuario autenticado y a una invitación específica. Se deben manejar los límites de tamaño y formato en el Server Action.
