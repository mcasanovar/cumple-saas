# AGENTS.md - Guía para Agentes de IA

> **Propósito**: Instrucciones precisas para que agentes de IA trabajen consistentemente en CumpleSaaS.
> **Última actualización**: Abril 2026

---

## � Índice

1. [Descripción del Proyecto](#1-descripción-del-proyecto)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Modelos de Datos](#4-modelos-de-datos)
5. [Decisiones Rápidas](#5-decisiones-rápidas)
6. [Server Actions y API Routes](#6-server-actions-y-api-routes)
7. [Sistema de Templates](#7-sistema-de-templates)
8. [Agentes del Sistema](#8-agentes-del-sistema)
9. [Flujos de Datos](#9-flujos-de-datos)
10. [Restricciones](#10-restricciones-y-prohibiciones)

---

## 1. Descripción del Proyecto

**CumpleSaaS** es una plataforma SaaS para crear invitaciones digitales premium de cumpleaños infantiles con animaciones, RSVP y panel de gestión.

### Flujo Principal

```
Registro (Clerk) → Dashboard → Creación (4 pasos) → Pago (MP) → Publicación → RSVP
```

1. **Autenticación**: Clerk + sincronización con tabla `User` en Supabase/Prisma
2. **Creación**: Flujo multi-paso: Template → Info Evento → Imágenes → Preview
3. **Pago**: Mercado Pago (CLP $5.990) con webhooks
4. **Publicación**: URL única `/invitacion/[invitationId]` con intro animada
5. **Gestión**: Dashboard con lista de invitaciones y RSVPs

### Características Clave

- **4 Templates activos**: Safari, Princess, Dino, K-Pop
- **Imágenes en Cloudinary**: 3 fotos del festejado + 1 del venue
- **Mapas con Leaflet**: Ubicación interactiva del evento
- **Animaciones Framer Motion**: Intro y transiciones premium
- **RSVP público**: Confirmación sin autenticación

---

## 2. Stack Tecnológico

### Core Framework
- **Next.js 16.1.6** (App Router, Server Actions, Turbopack)
- **React 19.2.3** (RSC, `useActionState`)
- **TypeScript 5** (modo `strict`)

### Backend y Base de Datos
- **Supabase**: PostgreSQL + session management
- **Prisma 6.19.2**: ORM con `@prisma/adapter-pg`
- **Clerk 7.0.5**: Autenticación

### Servicios Externos
- **Mercado Pago 2.12.0**: Pagos (CLP)
- **Cloudinary 2.9.0**: Imágenes
- **Leaflet 1.9.4**: Mapas

### Styling y Animaciones
- **Tailwind CSS v4**: Utility-first
- **Framer Motion 12.36.0**: Animaciones

### Validación
- **Zod 4.3.6**: Schemas

---

## 3. Arquitectura del Proyecto

```
web/
├── src/
│   ├── app/
│   │   ├── (private)/                    # Rutas protegidas
│   │   │   ├── layout.tsx                # Sync Clerk → DB
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx            # Sidebar + UserButton
│   │   │       ├── invitaciones/
│   │   │       │   ├── page.tsx          # Lista invitaciones
│   │   │       │   ├── actions.ts        # deleteInvitation, getRSVPs
│   │   │       │   ├── [id]/             # Detalle
│   │   │       │   └── nueva/
│   │   │       │       ├── page.tsx      # Flujo creación
│   │   │       │       └── actions.ts    # save, upload, payment
│   │   │       └── pago/
│   │   │           ├── procesando/       # Polling estado
│   │   │           ├── exitoso/          # Confirmación
│   │   │           ├── pendiente/
│   │   │           └── fallido/
│   │   │
│   │   ├── (public)/
│   │   │   └── invitacion/
│   │   │       ├── [invitationId]/       # Página pública (SSG)
│   │   │       │   └── intro/            # Intro animada
│   │   │       └── preview/              # Preview localStorage
│   │   │
│   │   └── api/
│   │       ├── payments/[invitationId]/status/  # GET estado pago
│   │       └── webhook/mercadopago/             # POST webhook MP
│   │
│   ├── components/
│   │   ├── features/
│   │   │   ├── dashboard/                # InvitationsListView, RSVPListView
│   │   │   ├── invitation/
│   │   │   │   ├── creation/             # InvitationCreation + 4 steps
│   │   │   │   ├── intro/                # IntroPage + 13 componentes
│   │   │   │   └── landing/              # Landing + RSVP + Countdown
│   │   │   └── marketing-landing/
│   │   └── shared/                       # confetti, map-view, icons
│   │
│   ├── config/themes.ts                  # 7 temas visuales
│   ├── data/invitations.ts               # getInvitationById
│   ├── hooks/                            # useIsMobile, useThemeDetection
│   │
│   ├── lib/
│   │   ├── auth-sync.ts                  # syncUserWithDb()
│   │   ├── cloudinary.ts                 # Cliente
│   │   ├── mercadopago.ts                # mercadopagoClient
│   │   ├── prisma.ts                     # Singleton
│   │   ├── templates/                    # registry, utils, 4 templates
│   │   └── types/                        # invitation, payment, rsvp, template
│   │
│   ├── middleware.ts                     # Clerk + Supabase session
│   └── utils/supabase/                   # client, server, middleware
│
├── prisma/schema.prisma                  # User, Invitation, RSVP, Purchase
└── public/                               # Assets
```

### Responsabilidades por Directorio

- **`app/(private)`**: Rutas protegidas por Clerk middleware
- **`app/(public)`**: Rutas públicas (invitaciones, marketing)
- **`app/api`**: Webhooks y endpoints REST
- **`components/features`**: Componentes por dominio
- **`lib`**: Lógica de negocio y clientes de servicios
- **`lib/templates`**: Sistema de plantillas
- **`utils/supabase`**: Clientes Supabase (cliente, servidor, middleware)

---

## 4. Modelos de Datos

### Schema de Prisma

```prisma
model User {
  id          String       @id @default(cuid())
  clerkId     String       @unique
  email       String?      @unique
  name        String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  invitations Invitation[]
}

model Invitation {
  id                 String    @id @default(uuid())
  slug               String?   @unique
  templateId         String                    # safari-adventure, princess-dreams, etc.
  celebrantName      String
  celebrantAge       Int
  eventDate          DateTime
  eventTime          String
  venueName          String
  config             Json                      # Datos completos del formulario
  isPaid             Boolean   @default(false)
  status             String    @default("draft")  # draft | published
  userId             String
  currentStep        String?                   # template | event-info | images | preview
  celebrantImages    Json?                     # Array de URLs Cloudinary
  venueImage         String?
  isDelete           Boolean?  @default(false) # Soft delete
  url_ext_invitation String?   @default("")    # URL pública final
  user               User      @relation(...)
  purchase           Purchase?
  rsvps              RSVP[]
}

model RSVP {
  id           String     @id @default(cuid())
  invitationId String
  name         String
  email        String?
  willAttend   Boolean
  guestCount   Int        @default(0)
  guestNames   Json?                          # Array de nombres
  createdAt    DateTime   @default(now())
  invitation   Invitation @relation(...)
}

model Purchase {
  id                String     @id @default(cuid())
  invitationId      String     @unique
  externalReference String?    @unique        # UUID para MP
  paymentId         String?                   # ID de pago de MP
  status            String     @default("pending")  # pending | approved | rejected
  amount            Int                       # En CLP
  currency          String     @default("CLP")
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
  invitation        Invitation @relation(...)
}
```

### Tipos TypeScript Clave

```typescript
// lib/types/template.ts
type TemplateId = "safari-adventure" | "princess-dreams" | "dino-party" | "space-explorer" | "unicorn-magic" | "k-pop";
type CreationStep = "template" | "event-info" | "images" | "preview";

// lib/types/invitation.ts
type ThemeToken = "safari" | "princesa" | "dinosaurios" | "ositos" | "cielo" | "bosque" | "k-pop";
```

---

## 5. Decisiones Rápidas

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

## 6. Server Actions y API Routes

### Server Actions Existentes

| Archivo | Función | Propósito |
|---------|---------|-----------|
| `dashboard/invitaciones/actions.ts` | `deleteInvitation` | Soft delete de invitación |
| `dashboard/invitaciones/actions.ts` | `getRSVPsByInvitation` | Obtener RSVPs de una invitación |
| `dashboard/invitaciones/nueva/actions.ts` | `createPaymentPreference` | Crear preferencia de pago en MP |
| `dashboard/invitaciones/nueva/actions.ts` | `uploadImageAction` | Subir imagen a Cloudinary |
| `dashboard/invitaciones/nueva/actions.ts` | `publishInvitationAction` | Publicar invitación tras pago |
| `dashboard/invitaciones/nueva/actions.ts` | `saveInvitationProgress` | Guardar progreso del flujo |

### API Routes Existentes

| Ruta | Método | Propósito |
|------|--------|-----------|
| `/api/payments/[invitationId]/status` | GET | Consultar estado de pago (polling) |
| `/api/webhook/mercadopago` | POST | Recibir notificaciones de MP |

### Patrón de Server Action

```typescript
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({ /* validación */ });

export async function myAction(formData: FormData): Promise<ActionResult> {
  // 1. Autenticación
  const { userId: clerkId } = await auth();
  if (!clerkId) return { status: "error", message: "No autorizado" };

  // 2. Validación con Zod
  const parsed = schema.safeParse(/* ... */);
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };

  // 3. Autorización (verificar ownership)
  const user = await prisma.user.findUnique({ where: { clerkId } });

  // 4. Lógica de negocio
  // ...

  // 5. Revalidación si es necesario
  revalidatePath("/dashboard/invitaciones");

  return { status: "success", data: /* ... */ };
}
```

---

## 7. Sistema de Templates

### Templates Disponibles

| ID | Nombre | Tema | Estado |
|----|--------|------|--------|
| `safari-adventure` | Safari Adventure | safari | ✅ Activo |
| `princess-dreams` | Princess Dreams | princesa | ✅ Activo |
| `dino-party` | Dino Party | dinosaurios | ✅ Activo |
| `k-pop` | K-Pop Stars | k-pop | ✅ Activo |
| `space-explorer` | Space Explorer | - | ⏳ Pendiente |
| `unicorn-magic` | Unicorn Magic | - | ⏳ Pendiente |

### Temas Visuales (config/themes.ts)

| ThemeToken | Nombre | Tiene IntroScene |
|------------|--------|------------------|
| `safari` | Safari Dreams | ✅ |
| `princesa` | Reino Encantado | ✅ |
| `dinosaurios` | Valle Jurásico | ✅ |
| `k-pop` | K-Pop Stars | ✅ |
| `ositos` | Abrazo de Ositos | ❌ |
| `cielo` | Cielos Mágicos | ❌ |
| `bosque` | Bosque Encantado | ❌ |

### Flujo de Renderizado

```
UserInvitationData (DB) → mergeTemplateWithUserData() → InvitationRenderConfig
                                    ↓
                          getTemplateById() + themes[theme]
                                    ↓
                    IntroPage (intro) → InvitationLandingPage (landing)
```

---

## 8. Agentes del Sistema

### Agente: `AuthAgent`

- **Objetivo**: Gestionar autenticación y sincronización de usuarios
- **Responsabilidades**: Autenticar con Clerk, sincronizar Clerk → Supabase
- **Inputs**: Tokens de Clerk, peticiones de login
- **Outputs**: Sesiones, registro `User` en BD
- **Herramientas**: `@clerk/nextjs`, `lib/auth-sync.ts`, `utils/supabase/`
- **Restricciones**: Nunca exponer tokens al cliente, siempre verificar `clerkId`

### Agente: `DatabaseAgent`

- **Objetivo**: Interactuar con PostgreSQL de forma segura
- **Responsabilidades**: Ejecutar queries via Prisma, validar ownership
- **Inputs**: Datos validados con Zod, `userId` para autorización
- **Outputs**: Datos de BD, resultados de mutaciones
- **Herramientas**: `lib/prisma.ts` (singleton)
- **Restricciones**: Solo en Server Actions o API routes, filtrar siempre por `userId`

### Agente: `PaymentAgent`

- **Objetivo**: Procesar pagos y activar invitaciones
- **Responsabilidades**: Crear preferencias MP, procesar webhooks, activar invitaciones
- **Inputs**: `invitationId`, datos de usuario, notificaciones MP
- **Outputs**: URL de checkout, estado de pago, invitación publicada
- **Herramientas**: `lib/mercadopago.ts`, `/api/webhook/mercadopago`
- **Restricciones**: Operaciones idempotentes, nunca confiar en datos del cliente

### Agente: `StorageAgent`

- **Objetivo**: Gestionar carga y entrega de imágenes
- **Responsabilidades**: Validar formato, subir a Cloudinary
- **Inputs**: `FormData` con archivo, `userId`
- **Outputs**: URL de imagen en Cloudinary
- **Herramientas**: `lib/cloudinary.ts`, `uploadImageAction`
- **Restricciones**: Solo .jpeg, .jpg, .png; organizar por `userId`

### Agente: `TemplateAgent`

- **Objetivo**: Gestionar sistema de plantillas y temas
- **Responsabilidades**: Proveer definiciones, mergear datos con template
- **Inputs**: `templateId`, `UserInvitationData`
- **Outputs**: `TemplateDefinition`, `InvitationRenderConfig`
- **Herramientas**: `lib/templates/registry.ts`, `config/themes.ts`
- **Restricciones**: Validar que template existe antes de usar

### Agente: `RSVPAgent`

- **Objetivo**: Gestionar confirmaciones de asistencia
- **Responsabilidades**: Recibir confirmaciones, almacenar RSVPs
- **Inputs**: Datos del formulario RSVP, `invitationId`
- **Outputs**: Registro RSVP, lista de confirmaciones
- **Herramientas**: `RSVPForm`, `getRSVPsByInvitation`
- **Restricciones**: No requerir auth para invitados

---

## 9. Flujos de Datos

### Mapa de Interacciones entre Agentes

```
                         AuthAgent
                            │
                            │ userId
                            ▼
StorageAgent ◀────▶ DatabaseAgent ◀────▶ PaymentAgent
     │                    │                    │
     │                    ▼                    │
     │             TemplateAgent               │
     │                    │                    │
     └──────────▶   RSVPAgent   ◀──────────────┘
```

### Flujo de Creación

```
InvitationCreation.tsx (Client)
        │
        ├── useCreationFlow() → estado local + localStorage
        │
        ├── TemplateStep → selección de template
        ├── EventInfoStep → datos del evento + mapa
        ├── ImagesStep → uploadImageAction() → Cloudinary
        └── PreviewStep → createPaymentPreference() → MercadoPago
                │
                ▼
        /pago/procesando (polling) → webhook → /pago/exitoso
```

### Flujo de Pago

```
createPaymentPreference() → MercadoPago Checkout
        │
        ▼
/api/webhook/mercadopago (POST)
        │
        ├── status: approved → Purchase.update + Invitation.isPaid = true
        ├── status: pending → Purchase.update
        └── status: rejected → Purchase.update
```

---

## 10. Restricciones y Prohibiciones

### ❌ PROHIBIDO

- **NO instalar nuevas dependencias** sin aprobación
- **NO modificar archivos de configuración raíz** (`next.config.ts`, `tsconfig.json`, `postcss.config.mjs`)
- **NO instanciar clientes de servicios directamente** - Usar helpers de `lib/`
- **NO escribir lógica de BD fuera de Server Actions o API routes**
- **NO cambiar la arquitectura fundamental** sin discutirlo
- **NO deshabilitar reglas de ESLint** sin justificación
- **NO exponer secretos o tokens al cliente**

### ⚠️ PRECAUCIÓN - Requiere Revisión

- Modificar `lib/auth-sync.ts` (sincronización crítica)
- Modificar `/api/webhook/mercadopago` (seguridad de pagos)
- Modificar schema de Prisma (requiere migración)
- Agregar nuevos templates (múltiples archivos afectados)

### ✅ PERMITIDO

- Crear nuevos componentes siguiendo la estructura
- Agregar Server Actions en archivos `actions.ts` existentes
- Modificar estilos con Tailwind
- Agregar animaciones con Framer Motion
- Crear nuevos hooks en `hooks/`
- Agregar tipos en `lib/types/`

