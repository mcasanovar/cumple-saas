# AGENTS.md - Guía para Agentes de IA

> **Propósito**: Este documento proporciona instrucciones precisas y accionables para que agentes de IA trabajen consistentemente en el proyecto CumpleSaaS.

---

## 🚀 Decisiones Rápidas (Consulta Primero)

### ¿Dónde creo un nuevo componente?

```
¿Es reutilizable entre features? 
  ├─ SÍ → components/shared/[dominio]/[ComponentName]/
  └─ NO → ¿Es parte de qué feature?
         ├─ intro → components/features/invitation/intro/components/[ComponentName]/
         └─ landing → components/features/invitation/landing/components/[ComponentName]/
```

### ¿Qué tipo de componente creo?

```
¿Maneja estado o lógica de negocio?
  ├─ SÍ → Container Component (usa hooks, pasa props a View)
  │        Ejemplo: InvitationIntro.tsx
  └─ NO → Presentational Component (solo recibe props y renderiza)
           Ejemplo: IntroView.tsx
```

### ¿Dónde va mi lógica?

```
¿Qué tipo de lógica es?
  ├─ Transformación de datos → hooks/useFeatureName.ts
  ├─ Validación de formulario → Server Action con Zod
  ├─ Constantes → constants.ts en el feature
  ├─ Variantes de animación → variants.ts en el feature
  └─ Tipos compartidos → lib/types/invitation.ts
```

### ¿Necesito "use client"?

```
¿El componente usa alguno de estos?
  ├─ useState, useEffect, useCallback → SÍ, agregar "use client"
  ├─ Framer Motion (motion.*) → SÍ, agregar "use client"
  ├─ Event handlers (onClick, onChange) → SÍ, agregar "use client"
  └─ Solo renderiza props → NO, mantener Server Component
```

### ¿Cómo nombro mi archivo?

```
Tipo de archivo:
  ├─ Componente → PascalCase.tsx (IntroView.tsx)
  ├─ Hook → camelCase.ts con prefijo 'use' (useIntroContent.ts)
  ├─ Tipo → PascalCase.ts o dentro de *.types.ts
  ├─ Constante → camelCase.ts (constants.ts)
  └─ Utilidad → camelCase.ts (formatDate.ts)
```

---

## 1. Descripción del Proyecto

**CumpleSaaS** es una plataforma SaaS para crear invitaciones digitales premium de cumpleaños infantiles. El proyecto genera experiencias inmersivas con animaciones fluidas, transiciones interactivas y confirmación de asistencia (RSVP) integrada.

### Características principales:
- Invitaciones públicas generadas estáticamente por slug (`/invitacion/[slug]`)
- Intro animada con transición "reveal" hacia landing principal
- Tematización dinámica (safari, princesa, dinosaurios, etc.)
- Sistema RSVP con Server Actions y validación con Zod
- Optimización para SEO y performance (SSG + ISR)

### Propósito:
Proporcionar una base escalable para un SaaS multi-tenant donde organizadores puedan crear, personalizar y gestionar invitaciones digitales con confirmación de asistencia en tiempo real.

---

## 2. Stack Tecnológico

### Core Framework:
- **Next.js 16.1.6** (App Router, Turbopack)
- **React 19.2.3** con React Server Components
- **TypeScript 5** (modo strict)

### Styling:
- **Tailwind CSS v4** (PostCSS plugin)
- **Framer Motion 12.36.0** para animaciones

### Validación y Datos:
- **Zod 4.3.6** para validación de schemas
- **Leaflet 1.9.4** para mapas interactivos

### Tooling:
- **ESLint 9** con configuración Next.js
- **PostCSS** con plugin Tailwind
- **Google Fonts** (Baloo 2) para tipografía infantil

### Deployment:
- Optimizado para Vercel/Netlify
- Static Site Generation (SSG) con `generateStaticParams`
- Server Actions para mutaciones

---

## 3. Arquitectura del Proyecto

```
web/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Grupo de rutas públicas
│   │   │   └── invitacion/[slug]/    # Páginas dinámicas de invitación
│   │   │       ├── page.tsx          # Página principal (SSG)
│   │   │       └── actions.ts        # Server Actions para RSVP
│   │   ├── layout.tsx                # Layout raíz con metadata
│   │   ├── page.tsx                  # Landing marketing
│   │   └── globals.css               # Estilos globales + Tailwind
│   │
│   ├── components/
│   │   ├── features/                 # Componentes específicos de features
│   │   │   └── invitation/
│   │   │       ├── InvitationExperience.tsx  # Orquestador principal
│   │   │       ├── intro/            # Feature: Intro animada
│   │   │       │   ├── InvitationIntro.tsx   # Container
│   │   │       │   ├── hooks/        # Lógica de negocio
│   │   │       │   │   └── useIntroContent.ts
│   │   │       │   ├── components/   # Subcomponentes presentacionales
│   │   │       │   │   ├── IntroView/
│   │   │       │   │   ├── IntroCallToAction/
│   │   │       │   │   ├── IntroCelebrationBanner/
│   │   │       │   │   ├── IntroDetailColumn/
│   │   │       │   │   ├── IntroMonsterMascot/
│   │   │       │   │   ├── IntroSceneBackground/
│   │   │       │   │   └── IntroTransition/
│   │   │       │   ├── constants.ts  # Constantes del feature
│   │   │       │   ├── variants.ts   # Variantes de animación
│   │   │       │   └── utils/        # Utilidades específicas
│   │   │       │
│   │   │       └── landing/          # Feature: Landing principal
│   │   │           ├── InvitationLanding.tsx  # Container
│   │   │           ├── hooks/
│   │   │           │   └── useLandingContent.ts
│   │   │           └── components/
│   │   │               ├── LandingView/
│   │   │               ├── CountdownTimer/
│   │   │               ├── EventLocationMap/
│   │   │               └── RSVPForm/
│   │   │
│   │   └── shared/                   # Componentes reutilizables
│   │       └── invitation/
│   │           ├── decorative-background/
│   │           └── scene-background/
│   │
│   ├── config/
│   │   └── themes.ts                 # Configuración de temas visuales
│   │
│   ├── data/
│   │   └── invitations.ts            # Mock data + helpers de búsqueda
│   │
│   ├── lib/
│   │   └── types/
│   │       └── invitation.ts         # Tipos TypeScript centralizados
│   │
│   └── types/                        # Tipos globales adicionales
│
├── public/                           # Assets estáticos
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── next.config.ts
└── postcss.config.mjs
```

### Responsabilidades por directorio:

- **`app/`**: Rutas, layouts, metadata y Server Actions
- **`components/features/`**: Componentes específicos de funcionalidades (invitation)
- **`components/shared/`**: Componentes reutilizables entre features
- **`config/`**: Configuraciones estáticas (temas, constantes)
- **`data/`**: Mock data y funciones de acceso a datos
- **`lib/types/`**: Definiciones TypeScript compartidas
- **`public/`**: Imágenes, ilustraciones, texturas

---

## 4. Convenciones de Código

### TypeScript:
- **Modo strict activado** en `tsconfig.json`
- Uso de `type` para tipos simples y `interface` para objetos extensibles
- Exports con nombre (evitar default exports excepto en páginas Next.js)
- Path alias `@/*` apunta a `./src/*`

### Naming Conventions (OBLIGATORIO):

#### ✅ Archivos - Ejemplos Correctos:
```
✓ IntroView.tsx           (Componente)
✓ useIntroContent.ts      (Hook)
✓ formatDate.ts           (Utilidad)
✓ InvitationConfig.ts     (Tipo exportado)
✓ constants.ts            (Archivo de constantes)
✓ variants.ts             (Variantes de animación)
```

#### ❌ Archivos - Ejemplos Incorrectos:
```
✗ introView.tsx           (debe ser PascalCase)
✗ UseIntroContent.ts      (debe ser camelCase)
✗ Constants.ts            (debe ser camelCase)
✗ intro-view.tsx          (no usar kebab-case)
```

#### ✅ Código - Ejemplos Correctos:
```typescript
// Componentes
export function InvitationExperience() { }

// Funciones y hooks
export function useIntroContent() { }
export function getInvitationBySlug() { }

// Constantes
const FALLBACK_SCENE = { };
const DEFAULT_TEXTURE = "/textures/watercolor.png";

// Variables
const invitation = getInvitationBySlug(slug);
const isTransitioning = false;

// Tipos
type InvitationConfig = { };
interface ThemeConfig { }
```

### Organización de Imports (ORDEN OBLIGATORIO):

```typescript
// ✅ CORRECTO - Orden estricto:

// 1. React/Next.js (siempre primero)
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// 2. Librerías externas (alfabético)
import { motion } from "framer-motion";
import { z } from "zod";

// 3. Imports internos con @/ (tipos primero, luego implementaciones)
import type { InvitationConfig } from "@/lib/types/invitation";
import { themes } from "@/config/themes";
import { getInvitationBySlug } from "@/data/invitations";

// 4. Imports relativos (tipos primero, luego implementaciones)
import type { IntroContent } from "./hooks/useIntroContent";
import { useIntroContent } from "./hooks/useIntroContent";
import { IntroView } from "./components/IntroView";
```

```typescript
// ❌ INCORRECTO - Orden mezclado:
import { IntroView } from "./components/IntroView";
import { motion } from "framer-motion";
import { useState } from "react"; // React debe ir primero
import { themes } from "@/config/themes";
```

### Estructura de Archivos (PLANTILLAS OBLIGATORIAS):

#### Plantilla: Container Component
```typescript
"use client";

import { useCallback } from "react";
import type { InvitationConfig, ThemeConfig } from "@/lib/types/invitation";
import { useFeatureContent } from "./hooks/useFeatureContent";
import { FeatureView } from "./components/FeatureView";

type FeatureContainerProps = {
  invitation: InvitationConfig;
  theme: ThemeConfig;
  onAction?: () => void;
};

export function FeatureContainer({
  invitation,
  theme,
  onAction,
}: FeatureContainerProps) {
  const content = useFeatureContent(invitation, theme);
  
  const handleAction = useCallback(() => {
    // Lógica de negocio
    onAction?.();
  }, [onAction]);

  return <FeatureView {...content} onAction={handleAction} />;
}
```

#### Plantilla: Presentational Component
```typescript
"use client";

import { motion } from "framer-motion";
import type { FeatureContent } from "../../hooks/useFeatureContent";

export type FeatureViewProps = FeatureContent & {
  onAction: () => void;
};

export function FeatureView({
  title,
  description,
  onAction,
}: FeatureViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={onAction}>Action</button>
    </motion.div>
  );
}
```

#### Plantilla: Custom Hook
```typescript
import { useMemo } from "react";
import type { InvitationConfig, ThemeConfig } from "@/lib/types/invitation";

export type FeatureContent = {
  title: string;
  description: string;
  // ... más propiedades derivadas
};

export function useFeatureContent(
  invitation: InvitationConfig,
  theme: ThemeConfig
): FeatureContent {
  return useMemo(() => {
    // Transformar datos
    const title = invitation.hero.headline;
    const description = invitation.event.invitationMessage;
    
    return {
      title,
      description,
    };
  }, [invitation, theme]);
}
```

#### Plantilla: Server Action
```typescript
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionState } from "@/lib/types/invitation";

const actionSchema = z.object({
  slug: z.string().min(1),
  field: z.string().min(2),
});

export async function performAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = actionSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos";
    return { status: "error", message: firstError };
  }

  // Persistir datos
  // TODO: Conectar con base de datos

  revalidatePath(`/invitacion/${parsed.data.slug}`);

  return {
    status: "success",
    message: "Acción completada exitosamente",
  };
}
```

#### Hooks personalizados:
```typescript
import { useMemo } from "react";
import type { ... } from "@/lib/types/...";

export type HookReturnType = {
  ...
};

export function useCustomHook(params): HookReturnType {
  return useMemo(() => {
    // Lógica
    return { ... };
  }, [dependencies]);
}
```

### Directiva "use client":
- Usar **solo cuando sea necesario** (hooks, eventos, animaciones)
- Server Components por defecto (mejor performance)
- Componentes de layout y páginas son Server Components

---

## 5. Arquitectura de Componentes

### Patrón Container/Presentational:

El proyecto sigue estrictamente el patrón **Container/Presentational** para separar lógica de presentación:

#### Container Components:
- Manejan estado y lógica de negocio
- Consumen hooks personalizados
- Pasan props a componentes presentacionales
- Ejemplos: `InvitationIntro.tsx`, `InvitationLanding.tsx`

#### Presentational Components:
- Reciben props y renderizan UI
- No manejan estado complejo (solo UI state local)
- Altamente reutilizables
- Ejemplos: `IntroView.tsx`, `LandingView.tsx`

### Estructura de Features:

Cada feature sigue esta estructura:
```
feature/
├── FeatureName.tsx          # Container principal
├── hooks/                   # Custom hooks (lógica)
│   └── useFeatureLogic.ts
├── components/              # Subcomponentes
│   ├── FeatureView/         # Componente presentacional principal
│   │   ├── FeatureView.tsx
│   │   ├── FeatureView.types.ts
│   │   └── index.ts
│   └── SubComponent/
├── constants.ts             # Constantes del feature
├── variants.ts              # Variantes de animación
└── utils/                   # Utilidades específicas
```

### Index Files:
Cada carpeta de componente tiene un `index.ts` para exports limpios:
```typescript
export { ComponentName } from "./ComponentName";
export type { ComponentProps } from "./ComponentName.types";
```

### Composición de Componentes:
- Preferir composición sobre herencia
- Usar children props para flexibilidad
- Extraer subcomponentes cuando la lógica es reutilizable

---

## 6. Capa de Datos y Servicios

### Datos Estáticos (Mock):
- **Ubicación**: `src/data/invitations.ts`
- Array de configuraciones de invitaciones
- Funciones helper: `getInvitationBySlug()`, `getAllInvitationSlugs()`

### Server Actions:
- **Ubicación**: `src/app/(public)/invitacion/[slug]/actions.ts`
- Directiva `"use server"` al inicio del archivo
- Validación con Zod schemas
- Retornan tipos discriminados (`RSVPActionState`)
- Usan `revalidatePath()` para ISR

#### Ejemplo de Server Action:
```typescript
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({ ... });

export async function submitRSVP(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = schema.safeParse(...);
  
  if (!parsed.success) {
    return { status: "error", message: "..." };
  }
  
  // Persistir datos (actualmente in-memory)
  // TODO: Reemplazar con Supabase/DB
  
  revalidatePath(`/invitacion/${slug}`);
  
  return { status: "success", message: "..." };
}
```

### Configuración de Temas:
- **Ubicación**: `src/config/themes.ts`
- Record de temas indexados por `ThemeToken`
- Cada tema incluye: gradientes, decoraciones, tipografía, escenas

### Tipos Centralizados:
- **Ubicación**: `src/lib/types/invitation.ts`
- Todos los tipos relacionados con invitaciones
- Tipos discriminados para estados (ej: `RSVPActionState`)

---

## 7. Manejo de Estado

### Estado Local:
- **useState** para estado de componente simple
- **useReducer** para estado complejo (no usado actualmente)

### Estado Derivado:
- **useMemo** para cálculos costosos
- Hooks personalizados encapsulan lógica de transformación

### Estado de Formularios:
- **useActionState** (React 19) para Server Actions
- **useFormStatus** para estado de envío
- Validación en servidor con Zod

### Estado de Animaciones:
- **Framer Motion** maneja estado de animaciones
- Variantes definidas en archivos separados (`variants.ts`)
- Estados de fase: `"intro" | "transition" | "landing"`

### Ejemplo de Manejo de Estado:
```typescript
// InvitationExperience.tsx
const [phase, setPhase] = useState<ExperiencePhase>("intro");
const [isTransitioning, setIsTransitioning] = useState(false);

const handleRevealLanding = useCallback(() => {
  if (phase !== "intro") return;
  setIsTransitioning(true);
  setPhase("transition");
}, [phase]);

useEffect(() => {
  if (phase === "transition") {
    const timeout = setTimeout(() => {
      setPhase("landing");
      setIsTransitioning(false);
    }, 900);
    return () => clearTimeout(timeout);
  }
}, [phase]);
```

---

## 8. Estrategia de Testing

### Estado Actual:
- **No hay tests implementados** en el proyecto
- No hay configuración de Jest, Vitest o Testing Library
- No hay archivos `*.test.ts` o `*.spec.ts` en `src/`

### Recomendaciones para Implementar:
Si se requiere testing en el futuro:
- Usar **Vitest** (compatible con Vite/Turbopack)
- **React Testing Library** para componentes
- **MSW** para mocking de Server Actions
- Tests unitarios para hooks y utilidades
- Tests de integración para flujos completos

---

## 9. Guía de Desarrollo para Agentes de IA

### CHECKLIST OBLIGATORIO - Antes de Cualquier Cambio:

```
□ Leí los archivos relacionados al cambio
□ Entendí el patrón Container/Presentational usado
□ Verifiqué la ubicación correcta según árbol de decisión
□ Confirmé el naming según convenciones
□ Revisé imports existentes en archivos similares
□ Identifiqué si necesito "use client" o no
□ Verifiqué tipos en lib/types/invitation.ts
```

### PROCESO PASO A PASO - Agregar Nuevo Componente:

#### Paso 1: Determinar Ubicación
```
1. ¿Es reutilizable entre features?
   → SÍ: components/shared/[dominio]/
   → NO: components/features/invitation/[intro|landing]/components/

2. ¿Es un Container o Presentational?
   → Container: Archivo principal del feature (ej: InvitationIntro.tsx)
   → Presentational: Dentro de components/ (ej: IntroView/)
```

#### Paso 2: Crear Estructura de Archivos
```bash
# Para componente presentacional:
components/features/invitation/intro/components/NewComponent/
├── NewComponent.tsx       # Componente principal
├── NewComponent.types.ts  # Tipos (si son complejos)
└── index.ts              # Export limpio

# Contenido de index.ts:
export { NewComponent } from "./NewComponent";
export type { NewComponentProps } from "./NewComponent";
```

#### Paso 3: Implementar Componente
```typescript
// 1. Copiar plantilla apropiada (Container o Presentational)
// 2. Ajustar imports según orden obligatorio
// 3. Definir tipos de props
// 4. Implementar lógica/renderizado
// 5. Exportar con nombre (no default)
```

#### Paso 4: Integrar en Parent
```typescript
// En el componente padre:
import { NewComponent } from "./components/NewComponent";

// Usar en JSX:
<NewComponent prop1={value1} prop2={value2} />
```

#### Paso 5: Verificar
```bash
npm run build  # Debe compilar sin errores
npm run lint   # Debe pasar sin warnings
```

### PROCESO PASO A PASO - Agregar Custom Hook:

#### Paso 1: Crear Archivo
```
components/features/invitation/[feature]/hooks/useFeatureName.ts
```

#### Paso 2: Implementar Hook
```typescript
import { useMemo } from "react";
import type { ... } from "@/lib/types/invitation";

// 1. Definir tipo de retorno
export type FeatureContent = {
  // propiedades derivadas
};

// 2. Implementar hook con useMemo
export function useFeatureName(params): FeatureContent {
  return useMemo(() => {
    // Transformación de datos
    return { ... };
  }, [dependencies]);
}
```

#### Paso 3: Usar en Container
```typescript
import { useFeatureName } from "./hooks/useFeatureName";

export function FeatureContainer(props) {
  const content = useFeatureName(props.data);
  return <FeatureView {...content} />;
}
```

### PROCESO PASO A PASO - Agregar Server Action:

#### Paso 1: Ubicación Correcta
```
app/(public)/invitacion/[slug]/actions.ts
```

#### Paso 2: Implementar con Plantilla
```typescript
"use server"; // OBLIGATORIO al inicio

import { z } from "zod";
import { revalidatePath } from "next/cache";

// 1. Definir schema de validación
const schema = z.object({ ... });

// 2. Implementar action
export async function actionName(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Validar
  const parsed = schema.safeParse(...);
  if (!parsed.success) {
    return { status: "error", message: "..." };
  }
  
  // Persistir (mock por ahora)
  // TODO: Conectar con DB
  
  // Revalidar
  revalidatePath("/ruta");
  
  return { status: "success", message: "..." };
}
```

### Flujo de Trabajo Recomendado:

#### Al agregar un nuevo componente:
1. Determinar si es `feature` o `shared`
2. Crear carpeta con nombre del componente
3. Crear archivos: `ComponentName.tsx`, `index.ts`
4. Si tiene tipos complejos: `ComponentName.types.ts`
5. Exportar desde `index.ts`

#### Al agregar un nuevo feature:
1. Crear estructura en `components/features/`
2. Crear Container component
3. Crear hook personalizado en `hooks/`
4. Crear componentes presentacionales en `components/`
5. Agregar constantes en `constants.ts` si aplica
6. Agregar tipos en `lib/types/` si son compartidos

#### Al modificar Server Actions:
1. Mantener validación con Zod
2. Retornar tipos discriminados
3. Usar `revalidatePath()` cuando sea necesario
4. Manejar errores explícitamente

#### Al trabajar con animaciones:
1. Usar Framer Motion existente
2. Definir variantes en archivos separados
3. Usar constantes para easing curves
4. Respetar duraciones y delays existentes

### Verificación de Cambios:
Antes de completar una tarea:
- Ejecutar `npm run build` para verificar TypeScript
- Ejecutar `npm run lint` para verificar ESLint
- Revisar que no haya imports rotos
- Verificar que los tipos sean correctos

---

## 10. Restricciones para Agentes de IA

### ❌ PROHIBIDO - Acciones que NUNCA Debes Hacer:

#### 1. Dependencias
```
❌ NO agregar: npm install nueva-libreria
✓ SÍ usar: Dependencias existentes en package.json

Dependencias permitidas:
- React, Next.js (ya instalado)
- Framer Motion (animaciones)
- Zod (validación)
- Leaflet (mapas)
- Tailwind CSS (estilos)

⚠️ Si necesitas algo más, PREGUNTA primero al usuario.
```

#### 2. Refactorización
```
❌ NO hacer sin solicitud:
- Cambiar arquitectura Container/Presentational
- Renombrar múltiples componentes
- Mover archivos entre carpetas
- Cambiar estructura de tipos
- Reorganizar imports masivamente

✓ SÍ hacer:
- Seguir patrones existentes
- Agregar nuevos componentes en ubicación correcta
- Mantener consistencia con código existente
```

#### 3. Tipos y Contratos
```
❌ NO hacer:
- Cambiar tipos en lib/types/invitation.ts sin verificar uso
- Modificar schemas de Zod en Server Actions
- Inventar nuevos tipos sin necesidad
- Eliminar propiedades de interfaces existentes

✓ SÍ hacer:
- Extender tipos existentes con nuevas propiedades
- Usar tipos existentes cuando sea posible
- Verificar todas las referencias antes de cambiar tipos
```

#### 4. Eliminación de Código
```
❌ NO eliminar sin verificar:
1. Buscar todas las referencias: grep -r "ComponentName" src/
2. Verificar imports: grep -r "from.*ComponentName" src/
3. Revisar tipos relacionados
4. Confirmar que no hay dependencias

✓ SÍ hacer:
- Comentar código obsoleto con // TODO: Remove
- Documentar por qué se elimina
- Verificar que build pasa después de eliminar
```

#### 5. Configuraciones
```
❌ NO modificar estos archivos:
- tsconfig.json (TypeScript config)
- next.config.ts (Next.js config)
- eslint.config.mjs (ESLint rules)
- postcss.config.mjs (PostCSS/Tailwind)
- globals.css (estilos base)

✓ SÍ hacer:
- Usar configuraciones existentes
- Agregar estilos en componentes con Tailwind
- Respetar path alias @/*
```

#### 6. Testing
```
❌ NO agregar:
- Jest, Vitest, Testing Library
- Archivos *.test.ts o *.spec.ts
- Configuración de testing

⚠️ El proyecto NO tiene estrategia de testing.
   Si se requiere, PREGUNTA primero al usuario.
```

#### 7. Estilos Globales
```
❌ NO modificar:
- Variables CSS en globals.css
- Estilos del body
- Configuración de Tailwind

✓ SÍ hacer:
- Usar clases de Tailwind en componentes
- Usar inline styles para casos específicos
- Usar Framer Motion para animaciones
```

### ⚠️ ANTES DE HACER ALGO DUDOSO:

```
¿Estoy a punto de...?
  ├─ Agregar dependencia → DETENER, preguntar al usuario
  ├─ Cambiar arquitectura → DETENER, preguntar al usuario
  ├─ Modificar tipos globales → VERIFICAR referencias primero
  ├─ Eliminar código → VERIFICAR dependencias primero
  ├─ Cambiar configuración → DETENER, preguntar al usuario
  └─ Agregar testing → DETENER, preguntar al usuario
```

### Casos Especiales:

#### Al trabajar con temas:
- Los temas en `config/themes.ts` tienen estructura específica
- No modificar estructura de `ThemeConfig` sin actualizar todos los temas
- Respetar paletas de colores existentes

#### Al trabajar con tipos:
- Tipos en `lib/types/invitation.ts` son la fuente de verdad
- No duplicar tipos, importar desde ubicación central
- Mantener tipos discriminados para estados

#### Al trabajar con animaciones:
```
✓ Usar Framer Motion (ya instalado)
✓ Definir variantes en variants.ts del feature
✓ Usar constantes para easing curves
✓ Respetar duraciones existentes (0.6s - 1.2s típicamente)

❌ NO cambiar:
- Duraciones sin probar experiencia completa
- Easing curves establecidas
- Estructura de variantes existentes
```

---

## 11. Principios de Performance y Mantenibilidad

### Performance:

1. **Static Site Generation (SSG)**
   - Páginas de invitación se generan en build time
   - Usar `generateStaticParams` para rutas dinámicas
   - Aprovechar caching de Vercel/Netlify

2. **Optimización de Imágenes**
   - Usar `next/image` para optimización automática
   - Lazy loading por defecto
   - Especificar width/height para evitar layout shift

3. **Code Splitting**
   - Componentes pesados con `dynamic()` si es necesario
   - Framer Motion ya hace tree-shaking automático
   - Evitar imports masivos innecesarios

4. **Server Components**
   - Usar Server Components por defecto
   - Solo agregar "use client" cuando sea necesario
   - Reducir JavaScript enviado al cliente

### Mantenibilidad:

1. **Separación de Responsabilidades**
   - Lógica en hooks, presentación en componentes
   - Tipos centralizados en `lib/types/`
   - Configuración separada de implementación

2. **Documentación en Código**
   - Tipos TypeScript son documentación viva
   - Nombres descriptivos sobre comentarios
   - Comentarios solo para lógica compleja

3. **Escalabilidad**
   - Estructura preparada para multi-tenant
   - Mock data fácil de reemplazar con DB real
   - Server Actions listos para backend persistente

4. **Convenciones Consistentes**
   - Mismo patrón en todos los features
   - Estructura predecible facilita navegación
   - Naming consistente reduce fricción cognitiva

### Buenas Prácticas Observadas:

- **Uso de `useMemo`** para cálculos derivados costosos
- **Uso de `useCallback`** para funciones pasadas como props
- **Cleanup de efectos** con return en `useEffect`
- **Validación en servidor** con Zod antes de persistir
- **Tipos discriminados** para estados con múltiples variantes
- **Exports con nombre** para mejor tree-shaking
- **Path alias `@/`** para imports limpios y relocalizables

---

## 12. Notas Adicionales

### Migración Futura:
El proyecto está preparado para:
- Conectar con Supabase u otra base de datos
- Implementar autenticación (NextAuth/Auth.js)
- Agregar panel de administración
- Implementar multi-tenancy

### Assets Pendientes:
- Ilustraciones temáticas en `public/`
- Texturas de fondo personalizadas
- Imágenes de venues reales

### Consideraciones de Diseño:
- **Tipografía**: Baloo 2 para estética infantil amigable
- **Colores**: Paletas vibrantes por tema
- **Animaciones**: Fluidas pero no excesivas (UX > efectos)
- **Responsive**: Mobile-first con breakpoints Tailwind

### Contexto de Desarrollo:
- Proyecto en fase inicial (MVP)
- Prioridad: experiencia de usuario fluida
- Arquitectura preparada para escalar
- Mock data temporal, backend pendiente

### Creación de Nuevos Templates:

Cuando necesites crear un nuevo template (ej: princess, superhero, etc.), sigue este flujo:

#### 1. Estructura de Rutas:
```
Las invitaciones se acceden mediante: /invitacion/{invitation_id}
- El {invitation_id} es el slug único de cada invitación (ej: "maria-princess-party")
- La ruta está definida en: app/(public)/invitacion/[slug]/page.tsx
- El slug se mapea a una invitación en data/invitations.ts
- Cada invitación tiene un templateId que determina su tema visual
```

#### 2. Pasos para Crear un Template:

**A. Configuración del Tema** (`config/themes.ts`):
```typescript
// Agregar nuevo tema al objeto themes
princesa: {
  name: "Reino Encantado",
  primaryGradient: "...",
  accentGradient: "...",
  accentColor: "...",
  backgroundPattern: "...",
  floatingDecorations: [...],
  typography: { heading: kidsFont, body: kidsFont },
  introScene: {
    backgroundGradient: "...",
    overlayGradient: "...",
    textureOpacity: 0.3,
    frame: { ... },
    bannerColors: [...],
    decorations: [...],
    ambientBalloons: [...],
    balloonClusters: [...],
    monogram: { ... },
    hint: { ... }
  }
}
```

**B. Template Definition** (`lib/templates/{template-name}/template.ts`):
```typescript
export const princessPartyTemplate: TemplateDefinition = {
  id: "princess-party",
  name: "Princess Party",
  description: "...",
  theme: "princesa",  // Debe coincidir con key en themes.ts
  category: "fantasy",
  hero: { ... },
  intro: { ... },
  defaultMessages: { ... }
};
```

**C. Registro del Template**:
- Agregar en `lib/templates/registry.ts`
- Exportar en `lib/templates/index.ts`

**D. Theme Detection** (`hooks/useThemeDetection.ts`):
```typescript
export type ThemeDetection = {
  isDinoTheme: boolean;
  isSafariTheme: boolean;
  isPrincessTheme: boolean;  // Agregar nuevo
};

export function useThemeDetection(themeToken?: ThemeToken): ThemeDetection {
  return useMemo(() => {
    return {
      isDinoTheme: themeToken === "dinosaurios",
      isSafariTheme: themeToken === "safari",
      isPrincessTheme: themeToken === "princesa",  // Agregar nuevo
    };
  }, [themeToken]);
}
```

**E. Componentes de Background**:

Para Intro:
```
components/features/invitation/intro/components/Intro{Theme}Background/
  └── Intro{Theme}Background.tsx
```

Para Landing:
```
components/features/invitation/landing/components/Landing{Theme}Background/
  └── Landing{Theme}Background.tsx
```

**F. Integración en Vistas**:

En `IntroView.tsx`:
```typescript
{isDinoTheme ? (
  <>
    <IntroCrackedBackground />
    <IntroCautionStripes />
  </>
) : isPrincessTheme ? (
  <IntroPrincessBackground />
) : (
  <IntroSceneBackground scene={scene} isTransitioning={isTransitioning} />
)}
```

En `LandingView.tsx`:
```typescript
<SceneBackground scene={scene} showConfettiDots={!isDinoTheme && !isPrincessTheme} />
{isDinoTheme && <LandingDinoBackground />}
{isPrincessTheme && <LandingPrincessBackground />}
```

**G. Invitación de Prueba** (`data/invitations.ts`):
```typescript
{
  id: "unique-slug",
  templateId: "princess-party",
  celebrant: { ... },
  event: { ... },
  venue: { ... },
  // ... resto de configuración
}
```

#### 3. Assets Requeridos:
- Imágenes en `public/` (ej: princess_castle.jpeg, princess.jpeg)
- SVG decorativos inline en componentes de background
- Texturas opcionales en `public/textures/`

#### 4. Verificación:
```bash
# Compilar proyecto
npm run build

# Acceder a la invitación
http://localhost:3000/invitacion/{invitationId}
```

---

## 📋 CHECKLIST FINAL - Antes de Completar Cualquier Tarea

### ✅ Verificación de Código:
```
□ El código compila sin errores: npm run build
□ ESLint pasa sin warnings: npm run lint
□ Todos los imports están correctos
□ Los tipos TypeScript son correctos
□ No hay código comentado innecesario
□ Seguí las plantillas de código apropiadas
```

### ✅ Verificación de Arquitectura:
```
□ El componente está en la ubicación correcta
□ Seguí el patrón Container/Presentational
□ Los nombres de archivos siguen convenciones
□ Los imports están en el orden correcto
□ Usé "use client" solo cuando fue necesario
□ Exporté con nombre (no default)
```

### ✅ Verificación de Consistencia:
```
□ El código es consistente con archivos similares
□ Usé tipos existentes de lib/types/invitation.ts
□ No modifiqué configuraciones sin razón
□ No agregué dependencias nuevas
□ No refactoricé código sin solicitud
```

### ✅ Verificación de Funcionalidad:
```
□ El componente renderiza correctamente
□ Las animaciones funcionan como se espera
□ Los formularios validan correctamente
□ Los Server Actions retornan tipos correctos
□ No hay errores en consola del navegador
```

---

## 🎯 Resumen Ejecutivo para Agentes

### SIEMPRE Hacer:
```
✓ Leer archivos relacionados ANTES de editar
✓ Usar árboles de decisión para ubicación de archivos
✓ Copiar plantillas de código apropiadas
✓ Seguir orden de imports obligatorio
✓ Verificar con npm run build antes de completar
✓ Mantener Server Components por defecto
✓ Usar tipos existentes de lib/types/
✓ Seguir patrón Container/Presentational
```

### NUNCA Hacer:
```
✗ Agregar dependencias sin preguntar
✗ Refactorizar sin solicitud explícita
✗ Modificar configuraciones (tsconfig, next.config, etc.)
✗ Cambiar tipos globales sin verificar referencias
✗ Eliminar código sin verificar dependencias
✗ Agregar testing sin consultar
✗ Modificar globals.css
✗ Usar default exports (excepto páginas Next.js)
```

### Valores del Proyecto:
```
1. Código limpio y mantenible
2. Performance y SEO
3. Experiencia de usuario fluida
4. Arquitectura escalable
5. Convenciones consistentes
6. TypeScript strict
7. Separación de responsabilidades
8. Componentes reutilizables
```

### Flujo de Trabajo Ideal:
```
1. Leer solicitud del usuario
2. Consultar árbol de decisión apropiado
3. Leer archivos relacionados existentes
4. Copiar plantilla de código apropiada
5. Implementar cambio siguiendo convenciones
6. Verificar con checklist
7. Ejecutar npm run build
8. Confirmar que todo funciona
```

### Cuando Tengas Dudas:
```
¿No estás seguro de algo?
  ├─ Ubicación de archivo → Consultar árbol de decisión
  ├─ Naming → Consultar sección de convenciones
  ├─ Estructura → Consultar plantillas de código
  ├─ Imports → Consultar orden obligatorio
  ├─ Tipos → Revisar lib/types/invitation.ts
  └─ Cualquier otra cosa → PREGUNTAR al usuario
```

---

## 🚨 Reglas de Oro (Memoriza Esto)

1. **"use client" solo cuando sea necesario** (hooks, eventos, Framer Motion)
2. **Tipos primero en imports** (import type antes de import)
3. **Exports con nombre** (export function, no export default)
4. **Container/Presentational** (lógica separada de presentación)
5. **Verificar antes de eliminar** (grep -r para buscar referencias)
6. **Preguntar antes de agregar** (dependencias, testing, configs)
7. **Seguir patrones existentes** (no inventar nuevos patrones)
8. **Build debe pasar** (npm run build antes de completar)

---

**Este documento es tu fuente de verdad. Consúltalo frecuentemente.**
