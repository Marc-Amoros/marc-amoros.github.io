# Base de diseño web — Principios, tokens y estructura

> Documento vivo · v1.0 · jul 2026
> Agnóstico de stack: válido para cualquier framework, builder o HTML plano. Pégalo en cada proyecto nuevo y ve mejorándolo. Pensado para rendimiento, accesibilidad y control total (CSS fluido, intrínseco, propiedades lógicas).

---

## 1. Los 10 principios (resumen operativo)

1. **Accesibilidad primero**: nunca toques `html { font-size }`. Nada de escalar la raíz con `vw` ni media queries. La fluidez vive en los tokens, no en la raíz (no rompe zoom ni la preferencia de tamaño del usuario).
2. **Tipografía fluida** con `clamp()` en `rem` (método Utopia). Término preferido = `rem + vw` (nunca `vw` puro).
3. **Espaciado** = escala semántica fluida, nunca números sueltos. Token siempre (`spacing-s`, `spacing-l`…), nunca un valor arbitrario metido a mano.
4. **Dimensiones de componente** separadas del espaciado: anchos/altos a medida en `:root` con nombre propio (`--measure`, `--container-max`), no en la escala de espaciado.
5. **Propiedades lógicas** (RTL-ready): `ms/me/ps/pe`, `border-s/e`, `text-start/end`, `inset-inline`. Idéntico en LTR, listo para RTL.
6. **Estructura Section + Container**: la sección aplica el respiro vertical y lateral; el container solo limita el ancho y centra. Ver §3.
7. **Layout según el caso**: media queries para el shell de página · grids con nº de columnas intencional → breakpoints fijos, no auto-fit · cantidad desconocida de ítems → grid intrínseco (auto-fit) · componente reutilizable a anchos variables → container queries.
8. **Tokens de color en dos capas**: primitivos (paleta cruda) + semánticos (`bg`, `text`, `border`, `accent`…). Los componentes solo consumen los semánticos.
9. **Puente Figma**: mismos nombres en Figma Variables y en CSS. Mapea nombres, nunca copies píxeles sueltos.
10. **Verifica antes de cerrar** (ver §8).

---

## 2. Tokens: fuente única de verdad

Todo el sistema vive en un único archivo de variables CSS. Nada de valores sueltos repartidos por los componentes.

```css
/* tokens.css — cárgalo antes que nada */
:root {

  /* ================= TIPOGRAFÍA ================= */
  --font-sans: "Tu-Fuente", system-ui, sans-serif; /* cámbiala por proyecto, autoalojada */

  /* Escala fluida (Utopia, anclas 320→1240px, ratio 1.2→1.25) */
  --text-2xs:  clamp(0.694rem, 0.686rem + 0.044vw, 0.720rem); /* ~11 → 11.5 */
  --text-xs:   clamp(0.833rem, 0.810rem + 0.116vw, 0.900rem); /* ~13 → 14.4 */
  --text-base: clamp(1.000rem, 0.957rem + 0.217vw, 1.125rem); /*  16 → 18   */
  --text-lg:   clamp(1.200rem, 1.128rem + 0.359vw, 1.406rem); /* ~19 → 22.5 */
  --text-xl:   clamp(1.440rem, 1.329rem + 0.553vw, 1.758rem); /* ~23 → 28   */
  --text-2xl:  clamp(1.728rem, 1.565rem + 0.816vw, 2.197rem); /* ~28 → 35   */
  --text-3xl:  clamp(2.074rem, 1.840rem + 1.170vw, 2.747rem); /* ~33 → 44   */
  --text-4xl:  clamp(2.488rem, 2.160rem + 1.643vw, 3.433rem); /* ~40 → 55   */

  --leading-tight:  1.1;
  --leading-snug:   1.25;
  --leading-normal: 1.6;

  /* ================= ESPACIADO (misma técnica) ================= */
  --spacing-3xs: clamp(0.250rem, 0.239rem + 0.054vw, 0.281rem); /*  4 → 4.5  */
  --spacing-2xs: clamp(0.500rem, 0.478rem + 0.109vw, 0.563rem); /*  8 → 9    */
  --spacing-xs:  clamp(0.750rem, 0.717rem + 0.163vw, 0.844rem); /* 12 → 13.5 */
  --spacing-s:   clamp(1.000rem, 0.957rem + 0.217vw, 1.125rem); /* 16 → 18   */
  --spacing-m:   clamp(1.500rem, 1.435rem + 0.326vw, 1.688rem); /* 24 → 27   */
  --spacing-l:   clamp(2.000rem, 1.913rem + 0.435vw, 2.250rem); /* 32 → 36   */
  --spacing-xl:  clamp(3.000rem, 2.870rem + 0.652vw, 3.375rem); /* 48 → 54   */
  --spacing-2xl: clamp(4.000rem, 3.826rem + 0.870vw, 4.500rem); /* 64 → 72   */
  --spacing-3xl: clamp(6.000rem, 5.739rem + 1.304vw, 6.750rem); /* 96 → 108  */

  /* ================= DIMENSIONES DE COMPONENTE ================= */
  /* Fuera de la escala de espaciado (principio 4) */
  --measure:        65ch;  /* ancho de línea de lectura óptimo */
  --container-max:  90rem; /* 1440px @ raíz 16px */
  --section-block:  12vh;  /* respiro vertical de cada sección */
  --section-inline: 8vw;   /* respiro lateral de cada sección */

  /* ================= COLOR — capa 1: primitivos ================= */
  /* Paleta cruda, sustitúyela por la del proyecto */
  --color-neutral-0:   #ffffff;
  --color-neutral-50:  #f7f7f8;
  --color-neutral-100: #eceef0;
  --color-neutral-300: #c7cbd1;
  --color-neutral-500: #7b8290;
  --color-neutral-700: #3a3f47;
  --color-neutral-900: #16181c;

  --color-brand-500: #2563eb;
  --color-brand-600: #1d4ed8;

  --color-success-500: #16a34a;
  --color-danger-500:  #dc2626;
  --color-warning-500: #d97706;

  /* ================= COLOR — capa 2: semánticos ================= */
  /* Lo único que se consume dentro de componentes */
  --color-bg:           var(--color-neutral-0);
  --color-surface:      var(--color-neutral-50);
  --color-text:         var(--color-neutral-900);
  --color-text-muted:   var(--color-neutral-500);
  --color-border:       var(--color-neutral-100);
  --color-accent:       var(--color-brand-500);
  --color-accent-hover: var(--color-brand-600);
  --color-on-accent:    var(--color-neutral-0);
  --color-focus-ring:   var(--color-brand-500);
}

/* Modo oscuro: remapea solo la capa semántica, los primitivos no cambian */
[data-theme="dark"] {
  --color-bg:         var(--color-neutral-900);
  --color-surface:    var(--color-neutral-700);
  --color-text:       var(--color-neutral-0);
  --color-text-muted: var(--color-neutral-300);
  --color-border:     var(--color-neutral-700);
}
```

> Si usas alguna herramienta de utilidades CSS, conecta sus utilidades a estos mismos tokens en vez de duplicar la escala. Si no usas ninguna, las clases del §4 son suficientes por sí solas.

---

## 3. Estructura Section + Container

Patrón fijo para toda página: cada bloque es una `section` de ancho completo con su propio respiro; dentro, un `container` limita el ancho de lectura y centra.

```css
.section {
  padding-block:  var(--section-block);   /* 12vh arriba y abajo */
  padding-inline: var(--section-inline);  /* 8vw a los lados */
}

.container {
  max-inline-size: var(--container-max);  /* 1440px */
  margin-inline: auto;
}
```

```html
<section class="section">
  <div class="container">
    <h2>Título</h2>
    <p class="measure">Texto a ancho de lectura cómodo…</p>
    <div class="auto-grid">…tarjetas…</div>
  </div>
</section>
```

- El **padding lateral (8vw) vive en la section**, no en el container: así el fondo de la sección (color, imagen) puede ser full-bleed si hace falta, y el contenido respeta el margen igual.
- El **container solo limita ancho y centra**; no añade padding propio, ya lo puso la section.
- Si una sección necesita menos aire (ej. una franja de aviso), usa un modificador puntual en vez de tocar el token global:

```css
.section--tight { padding-block: var(--spacing-l); }
```

> Si en pantallas muy bajas (móvil en horizontal) el `12vh` se siente excesivo, acótalo con `clamp()` siguiendo la misma lógica fluida del resto del sistema: `padding-block: clamp(2.5rem, 12vh, 6rem);`

---

## 4. Utilidades reutilizables

Clases mínimas, sin depender de ninguna herramienta externa.

```css
/* Ancho de lectura para bloques de texto */
.measure {
  max-inline-size: var(--measure);
}

/* Flow vertical: separa hijos con un solo token */
.flow > * + * {
  margin-block-start: var(--flow-space, var(--spacing-m));
}

/* Grid intrínseco: N → 1 columna sin media queries.
   min(100%, …) evita desbordes en móvil. */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--auto-grid-min, 20rem)), 1fr));
  gap: var(--spacing-m);
}

/* Respeta la preferencia de movimiento reducido en TODO (red de seguridad) */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Base tipográfica */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}
h1 { font-size: var(--text-4xl); line-height: var(--leading-tight); }
h2 { font-size: var(--text-2xl); line-height: var(--leading-snug); }
h3 { font-size: var(--text-xl); line-height: var(--leading-snug); }
h1, h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
```

---

## 5. Propiedades lógicas — chuleta rápida

| Física (evitar) | Lógica (usar) |
|---|---|
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` (`ms-*` / `me-*`) |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` (`ps-*` / `pe-*`) |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |
| `text-align: left / right` | `text-align: start / end` |
| `left` / `right` (posicionado) | `inset-inline-start` / `inset-inline-end` |
| `width` en contenedor centrado | `max-inline-size` + `margin-inline: auto` |

---

## 6. Layout — qué patrón usar según el caso

| Caso | Patrón |
|---|---|
| Shell de página (header, sidebar, footer) | Media queries clásicas |
| Grid con nº de columnas intencional (hero, showcase) | Breakpoints fijos (`grid-template-columns` por breakpoint) — **no** auto-fit |
| Contenido de cantidad desconocida (tarjetas, listados) | `repeat(auto-fit, minmax(min(100%, Xrem), 1fr))` |
| Componente reutilizado a anchos variables (sidebar/full) | Container queries |

---

## 7. Puente Figma → CSS

Mismo nombre en Figma Variables y en el token CSS. Mapea nombres, nunca copies píxeles sueltos al markup.

| Figma Variable | Token CSS |
|---|---|
| `Type/56` | `--text-3xl` |
| `Space/m` | `--spacing-m` |
| `Color/Neutral/900` | `--color-neutral-900` |
| `Color/Accent/500` | `--color-accent` |

---

## 8. Checklist de verificación (antes de cerrar)

- [ ] Sin **scroll horizontal** en 390 / 768 / 1440.
- [ ] **Zoom 200%** reflowea sin romper.
- [ ] Con la raíz a **20px**, tipografía y espaciado crecen (prueba de que todo es `rem`).
- [ ] **Contraste AA** mínimo entre `--color-text` y `--color-bg` (también en hover/focus).
- [ ] `prefers-reduced-motion`: con la preferencia activada, no hay animaciones.
- [ ] Una sola tipografía autoalojada; sin requests a CDNs externos de fuentes.
- [ ] Nombres de tokens espejo entre Figma y CSS — sin píxeles sueltos en el markup.
- [ ] La `section` aporta el respiro (12vh / 8vw); el `container` solo limita ancho y centra.

---

## Anexo — Prompt reutilizable

Pégalo al empezar cualquier web nueva, sea cual sea el stack.

```text
Vas a montar la base de estilos de una web (cualquier stack: HTML plano, un framework
o un builder). Aplica estas buenas prácticas de CSS fluido, intrínseco y accesible
desde el primer momento. Toda la config de tokens va en un único archivo de custom
properties en :root.

1. Accesibilidad primero — NUNCA toques html { font-size }. Nada de escalar la raíz
   con vw ni media queries. Déjala en la del usuario (16px). La fluidez vive en los
   tokens, no en la raíz.

2. Tipografía fluida con clamp() en rem (método Utopia). Define --text-* como
   clamp(min, rem + vw, max) — mezcla rem + vw, nunca vw puro. Anclas 320→1240px
   (usa utopia.fyi). Ej.: --text-3xl: clamp(2.0625rem, 1.56rem + 2.5vw, 3.5rem);

3. Espaciado: escala semántica fluida (misma técnica), nunca números sueltos.
   Prohibido meter valores fijos en px directamente en el markup.

4. Dimensiones de componente separadas del espaciado. Anchos/altos a medida en :root
   con nombre propio (--measure, --container-max), no en la escala de espaciado.

5. Propiedades lógicas (RTL-ready): ms/me/ps/pe, border-s/e, text-start/end,
   inset-inline, en vez de ml/mr/pl/pr/left/right.

6. Estructura Section + Container: la section aplica padding-block: 12vh y
   padding-inline: 8vw; dentro, el container centra con max-inline-size: 1440px
   (90rem) y margin-inline: auto. El container no lleva padding propio.

7. Layout según el caso: media queries para el shell · grid con nº de columnas
   intencional → breakpoints fijos, no auto-fit · cantidad desconocida →
   repeat(auto-fit, minmax(min(100%, Xrem), 1fr)) · componente reutilizable a
   anchos variables → container queries.

8. Color en dos capas: primitivos (paleta cruda) + semánticos (bg, text, border,
   accent…). Los componentes solo consumen los semánticos.

9. Puente Figma: mismos nombres en Figma Variables y CSS. Mapea nombres, nunca
   copies px.

10. Verifica antes de cerrar: sin scroll horizontal en 390/768/1440 · zoom 200%
    reflowea · con la raíz a 20px tipografía y espaciado crecen · contraste AA
    mínimo · prefers-reduced-motion respetado.
```
