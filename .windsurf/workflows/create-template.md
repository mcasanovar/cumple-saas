---
description: Guía paso a paso para crear una nueva plantilla (template) de invitación en CumpleSaaS.
---

Este workflow asegura que una nueva plantilla sea correctamente integrada en el sistema, desde la definición de tipos hasta su visualización en el dashboard.

### 1. Definir el nuevo ID de Plantilla
Modifica `src/lib/types/template.ts` para agregar el nuevo ID al union type `TemplateId`.
// turbo
1. Abre `src/lib/types/template.ts` y añade el ID (ej: `"galaxy-explorer"`).

### 2. Crear la Definición de la Plantilla
Crea una nueva carpeta y el archivo de definición.
// turbo
1. Crea el directorio `src/lib/templates/[nuevo-id]`.
2. Crea `src/lib/templates/[nuevo-id]/template.ts` siguiendo la estructura de `TemplateDefinition`. 
   *Usa como referencia `src/lib/templates/safari-adventure/template.ts`.*

### 3. Registrar la Plantilla
Informa al sistema sobre la existencia de la nueva plantilla.
// turbo
1. En `src/lib/templates/registry.ts`, importa la nueva definición.
2. Añádela al objeto `TEMPLATE_REGISTRY`.

### 4. Configurar el Tema Visual
Verifica que el `theme` asignado en la definición exista.
// turbo
1. Revisa `src/config/themes.ts`.
2. Si el `ThemeToken` es nuevo, agrégalo a `ThemeToken` en `src/lib/types/invitation.ts` y define su configuración en `themes.ts`.

### 5. Habilitar en el Selector de Creación
Haz que la plantilla sea seleccionable por el usuario.
// turbo
1. Abre `src/components/features/invitation/creation/constants.ts`.
2. Añade un nuevo objeto al array `AVAILABLE_TEMPLATES` con el `id`, `name`, `theme`, `emoji` y `description`.

### 6. Crear la Vista de la Intro
La intro es la primera pantalla animada que ve el invitado. Cada tema tiene su propia disposición y animaciones.
// turbo
1. Abre `src/hooks/useThemeDetection.ts` y añade la propiedad de detección para el nuevo tema (ej: `isGalaxyTheme: themeToken === "galaxy"`).
2. Crea el componente de vista en `src/components/features/invitation/intro/components/IntroView/Intro[Nombre]View.tsx`.
   *Usa `IntroSafariView.tsx` como referencia para la estructura de Framer Motion.*
3. En `src/components/features/invitation/intro/components/IntroView/IntroView.tsx`, importa tu nueva vista y añádela a la lógica condicional de renderizado.

### 7. Personalizar Componentes de Intro (Opcional)
Si el tema requiere elementos visuales únicos (mascotas, fondos especiales, decoraciones).
// turbo
1. Crea nuevos componentes en subcarpetas de `src/components/features/invitation/intro/components/` (ej: `IntroGalaxyBackground`, `IntroRocketMascot`).
2. Intégralos en tu `Intro[Nombre]View.tsx`.

### 8. Verificación
// turbo
1. Ejecuta el entorno de desarrollo.
2. Crea una nueva invitación con la plantilla.
3. Verifica que la Intro se vea correctamente y que el botón de "Ver invitación" funcione.
