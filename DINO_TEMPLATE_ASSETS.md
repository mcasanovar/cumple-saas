# Assets Necesarios para Template Dinosaurios

## 🎨 Ilustraciones Requeridas

### Ilustración Principal
**Archivo:** `/public/illustrations/dino-trex.svg`

**Descripción:** Ilustración de T-Rex similar al diseño proporcionado
- T-Rex en primer plano (lado izquierdo)
- Colores: Verde oliva (#6B7A5E), verde bosque (#4A6741)
- Boca abierta mostrando dientes
- Expresión amigable pero imponente
- Estilo: Flat design, amigable para niños

### Elementos Decorativos

**Hojas Tropicales:**
- Hojas de palma
- Helechos
- Colores: Verdes variados (#84cc16, #65a30d, #4d7c0f)

**Texturas y Patrones:**
- Huellas de dinosaurio (iconos pequeños)
- Marcas de garras/rasguños
- Cintas amarillas "CAUTION" (#ffd700)

## 🎯 Especificaciones de Diseño

### Paleta de Colores Implementada

```css
/* Primarios */
--dino-green-lime: #84cc16
--dino-green-forest: #65a30d
--dino-green-dark: #4d7c0f

/* Secundarios */
--dino-olive: #6B7A5E
--dino-olive-dark: #4A6741
--dino-brown: #8B7355

/* Acentos */
--dino-yellow: #ffd700
--dino-yellow-light: #fbbf24

/* Fondos */
--dino-beige: #f5f1e8
--dino-beige-dark: #e8e4d8
```

### Tipografía
- **Heading:** Baloo 2 (bold para nombre)
- **Body:** Baloo 2 (regular para detalles)

### Elementos Visuales del Diseño Original

1. **Cintas CAUTION:**
   - Superior e inferior
   - Color amarillo (#ffd700)
   - Texto repetido "CAUTION"
   - Estilo: Cinta de precaución

2. **Frame/Marco:**
   - Borde con gradiente verde oliva
   - Fondo beige/crema
   - Sombra sutil verde

3. **Decoraciones:**
   - Huellas de dinosaurio dispersas
   - Marcas de garras en esquinas
   - Hojas tropicales en bordes

## 📝 Textos del Template

Según `@/lib/templates/dino-party/template.ts`:

```typescript
intro: {
  celebrantHeadline: "TE INVITO A MI FIESTA",
  celebrantSubtitle: "Un día jurásico para",
  celebrantTagline: "¡Ven a rugir con nosotros!",
  hintHeadline: "Toca para descubrir la aventura",
  buttonLabel: "¡NO FALTES!",
}
```

## 🔗 URLs de Prueba

Para visualizar el template implementado:

```
http://localhost:3000/invitacion/7c9e6679-7425-40de-944b-e07fc1f90ae7
```

## ✅ Estado Actual

- ✅ Tema configurado en `config/themes.ts`
- ✅ Template definition creado
- ✅ Registrado en template registry
- ✅ Disponible en flujo de creación
- ✅ Invitación de prueba creada
- ⏳ **Pendiente:** Ilustraciones y assets visuales

## 🎨 Próximos Pasos

1. **Crear/Obtener Ilustración T-Rex**
   - Puede ser SVG o PNG de alta calidad
   - Dimensiones sugeridas: 800x800px mínimo
   - Ubicación: `/public/illustrations/dino-trex.svg`

2. **Elementos Decorativos Opcionales**
   - Hojas tropicales SVG
   - Iconos de huellas
   - Texturas de fondo

3. **Verificación Visual**
   - Comparar con diseño original
   - Ajustar colores si es necesario
   - Refinar animaciones

## 💡 Notas de Implementación

- Los componentes intro existentes funcionan sin cambios
- Solo la configuración de tema determina el estilo visual
- El sistema de plantillas permite fácil adición de nuevos temas
- Mantiene estructura y layout de intro original

---

**Última actualización:** Marzo 2026
