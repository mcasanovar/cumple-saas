# Sistema de Plantillas - CumpleSaaS

## 📋 Descripción

El sistema de plantillas separa la **definición estática de plantillas** (código) de los **datos dinámicos del usuario** (base de datos), permitiendo:

- ✅ Reutilización de plantillas entre múltiples usuarios
- ✅ Fácil adición de nuevas plantillas
- ✅ Separación clara de responsabilidades
- ✅ Type-safety completo con TypeScript
- ✅ URLs únicas por invitación: `/invitacion/{slug}/{invitationId}`

## 🏗️ Arquitectura

### Estructura de Archivos

```
src/
├── lib/
│   ├── types/
│   │   ├── template.ts          # Tipos: TemplateDefinition, UserInvitationData
│   │   └── invitation.ts        # Tipo: InvitationRenderConfig
│   └── templates/
│       ├── index.ts             # Exports públicos
│       ├── registry.ts          # Registro de plantillas
│       ├── utils.ts             # mergeTemplateWithUserData()
│       └── safari-adventure/
│           └── template.ts      # Definición de plantilla Safari
│
├── data/
│   └── invitations.ts           # Mock data con UserInvitationData
│
└── app/(public)/
    └── invitacion/[slug]/[invitationId]/
        └── page.tsx             # Ruta pública con ambos parámetros
```

## 🎯 Conceptos Clave

### 1. TemplateDefinition (Código - Estático)

Define la estructura visual y textos predefinidos de una plantilla:

```typescript
{
  id: "safari-adventure",
  name: "Safari Adventure",
  theme: "safari",
  category: "animals",
  hero: { headline, subheadline, illustration },
  intro: { textos predefinidos },
  defaultMessages: { invitationMessage, closingMessage }
}
```

**Ubicación:** `src/lib/templates/{template-id}/template.ts`

### 2. UserInvitationData (Base de Datos - Dinámico)

Datos específicos del usuario para su invitación:

```typescript
{
  id: "550e8400-e29b-41d4-a716-446655440000", // UUID v4 para seguridad
  userId: "user_456",            // Dueño
  templateId: "safari-adventure", // Referencia a plantilla
  slug: "emiliano-safari-2",     // URL amigable
  celebrantName: "Emiliano",
  age: 3,
  date, time, venue, coordinates,
  gallery: [imágenes],
  targetDateISO,
  introOverrides: { ... }        // Opcional: override de textos
}
```

**Ubicación:** Base de datos (mock en `src/data/invitations.ts`)

### 3. InvitationRenderConfig (Runtime - Merged)

Resultado de combinar Template + UserData para renderizar:

```typescript
const renderConfig = mergeTemplateWithUserData(userData);
// Contiene todo lo necesario para renderizar la invitación
```

## 🔄 Flujo de Datos

```
1. Usuario accede: /invitacion/550e8400-e29b-41d4-a716-446655440000
                                  ↓
                            UUID único y seguro
                                   
2. Server busca:   getInvitationById(invitationId)
                                  ↓
4. Merge:          mergeTemplateWithUserData(userData)
                                  ↓
5. Renderiza:      <InvitationExperience config={renderConfig} />
```

## ➕ Agregar Nueva Plantilla

### Paso 1: Definir el tipo en `template.ts`

```typescript
// src/lib/types/template.ts
export type TemplateId =
  | "safari-adventure"
  | "princess-dreams"
  | "nueva-plantilla";  // ← Agregar aquí
```

### Paso 2: Crear carpeta y definición

```bash
mkdir src/lib/templates/nueva-plantilla
```

```typescript
// src/lib/templates/nueva-plantilla/template.ts
import type { TemplateDefinition } from "@/lib/types/template";

export const nuevaPlantillaTemplate: TemplateDefinition = {
  id: "nueva-plantilla",
  name: "Nueva Plantilla",
  description: "Descripción de la plantilla",
  theme: "safari", // o el theme que corresponda
  category: "fantasy",
  
  hero: {
    headline: "Texto del hero",
    subheadline: "Subtítulo",
    featuredIllustration: "/illustrations/nueva.svg",
  },
  
  intro: {
    celebrantHeadline: "¡Celebremos!",
    celebrantSubtitle: "Un día especial",
    celebrantTagline: "Te esperamos",
    hintHeadline: "Toca para ver",
    buttonLabel: "Ver invitación",
  },
  
  defaultMessages: {
    invitationMessage: "Mensaje de invitación...",
    closingMessage: "¡Nos vemos!",
  },
};
```

### Paso 3: Registrar en registry

```typescript
// src/lib/templates/registry.ts
import { nuevaPlantillaTemplate } from "./nueva-plantilla/template";

const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition | null> = {
  "safari-adventure": safariAdventureTemplate,
  "nueva-plantilla": nuevaPlantillaTemplate,  // ← Agregar aquí
  // ...
};
```

### Paso 4: Agregar al selector de creación

```typescript
// src/components/features/invitation/creation/constants.ts
export const AVAILABLE_TEMPLATES: TemplateOption[] = [
  // ... templates existentes
  {
    id: "nueva-plantilla" as TemplateId,
    name: "Nueva Plantilla",
    theme: "safari",
    emoji: "🎨",
    description: "Descripción para el usuario",
  },
];
```

¡Listo! La nueva plantilla ya está disponible para que los usuarios la seleccionen.

## 🔗 URLs Públicas

### Formato Actual (solo UUID)

```
https://invitame.io/invitacion/{invitationId}
                                  ↓
                            UUID v4 único
                                   
Ejemplo: /invitacion/550e8400-e29b-41d4-a716-446655440000
```

**Beneficios:**
- ✅ URLs únicas garantizadas (UUID v4)
- ✅ Máxima seguridad (imposible de adivinar)
- ✅ URLs más cortas y limpias
- ✅ No hay colisiones posibles

## 💾 Datos en Base de Datos

Cuando implementes la BD, solo necesitas guardar `UserInvitationData`:

```sql
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- UUID v4 automático
  user_id VARCHAR NOT NULL,
  template_id VARCHAR NOT NULL,     -- safari-adventure
  slug VARCHAR NOT NULL,
  meta_title VARCHAR,
  meta_description TEXT,
  celebrant_name VARCHAR,
  age INTEGER,
  event_date VARCHAR,
  event_time VARCHAR,
  venue_name VARCHAR,
  venue_address VARCHAR,
  coordinates_lat DECIMAL,
  coordinates_lng DECIMAL,
  celebrant_description TEXT,
  gallery JSONB,                    -- Array de imágenes
  target_date_iso TIMESTAMP,
  intro_overrides JSONB,            -- Opcional
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  
  INDEX(slug, id),                  -- Para búsqueda rápida
  INDEX(user_id)
);
```

## 🎨 Personalización

Los usuarios pueden personalizar ciertos aspectos mediante `introOverrides`:

```typescript
{
  introOverrides: {
    detailLeft: {
      title: "Sábado",
      subtitle: "02 ABRIL",
      helper: "Evento especial"
    },
    detailRight: {
      title: "3 PM",
      subtitle: "Altovalsol",
      helper: "Casa de Caro"
    }
  }
}
```

Esto permite mantener la plantilla base pero personalizar detalles específicos.

## � Generación de UUIDs

Para crear nuevas invitaciones, usa UUID v4:

```typescript
import { v4 as uuidv4 } from 'uuid';

// En tu Server Action o API
const newInvitation: UserInvitationData = {
  id: uuidv4(), // Genera: "550e8400-e29b-41d4-a716-446655440000"
  userId: currentUser.id,
  templateId: selectedTemplateId,
  slug: generateSlug(celebrantName, templateId),
  // ... resto de datos
};
```

**Beneficios de UUID v4:**
- ✅ Imposible de adivinar (seguridad)
- ✅ No revela información sobre el usuario
- ✅ Único globalmente sin coordinación
- ✅ 128 bits de entropía

## � Próximos Pasos

1. **Implementar más plantillas:** Princess Dreams, Dino Party, etc.
2. **Conectar con BD real:** Reemplazar mock data
3. **Sistema de preview:** Mostrar preview en tiempo real al crear
4. **Customización avanzada:** Permitir más overrides
5. **Versionado de plantillas:** Para actualizaciones sin romper invitaciones existentes

## 📚 Funciones Útiles

### Gestión de Plantillas

```typescript
// Obtener plantilla por ID
import { getTemplateById } from "@/lib/templates";
const template = getTemplateById("safari-adventure");

// Obtener todas las plantillas disponibles
import { getAllTemplates } from "@/lib/templates";
const templates = getAllTemplates();

// Obtener plantillas por categoría
import { getTemplatesByCategory } from "@/lib/templates";
const animalTemplates = getTemplatesByCategory("animals");

// Verificar si una plantilla está disponible
import { isTemplateAvailable } from "@/lib/templates";
if (isTemplateAvailable("princess-dreams")) { ... }

// Merge de template + user data
import { mergeTemplateWithUserData } from "@/lib/templates";
const renderConfig = mergeTemplateWithUserData(userData);
```

### Generación de IDs Seguros

```typescript
// Generar nuevo ID de invitación (UUID v4)
import { generateInvitationId } from "@/lib/utils/generateInvitationId";
const newId = generateInvitationId();
// "550e8400-e29b-41d4-a716-446655440000"

// Validar ID de invitación
import { isValidInvitationId } from "@/lib/utils/generateInvitationId";
if (isValidInvitationId(invitationId)) {
  // ID válido, proceder
}
```

---

**Última actualización:** Marzo 2026
