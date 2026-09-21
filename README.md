# Portafolio de Marc Amorós

Web personal de **Marc Amorós Soler**, diseñador UX/UI y gráfico en Barcelona.
Sitio estático generado con [Astro](https://astro.build): las 12 fichas de
proyecto y los 5 artículos se escriben como HTML al compilar, no se pintan en el
navegador (19 páginas con la portada y la 404). No se envía JavaScript de Astro
al cliente; el único que va es el que está escrito a mano en `public/js/`, que
actúa sobre un HTML que llega hecho.

Peticiones a terceros: ninguna al abrir la portada ni las fichas. Los
artículos cargan sus 75 imágenes desde Medium (`cdn-images-1.medium.com`). Todo
lo demás —tipografía, láminas, vídeos, CSS y JS— se sirve desde el propio
dominio. Los vídeos (`preload="none"`) y los prototipos de Figma solo se
descargan cuando alguien los pulsa. La única librería del navegador es [Motion](https://motion.dev)
(46 KB comprimidos), copiada en `public/js/vendor/`; solo la carga la portada.

## Cómo verla

```bash
npm install      # solo la primera vez
npm run dev      # http://localhost:4321
```

Para publicarla, `npm run build` deja en `dist/` el sitio entero como ficheros
estáticos: eso es lo que se sube al hosting, sin Node ni nada más.
`npm run preview` sirve esa carpeta tal cual para probarla antes de subirla.

Node vive en `~/.local/node` (no en el sistema) y el PATH se añade desde
`~/.zprofile`. Para quitarlo: borra esa carpeta y esa línea.

## Publicar en GitHub Pages

La web se publica sola: cada vez que subes cambios a la rama `main`,
`.github/workflows/deploy.yml` la compila y la despliega. El repositorio es
`marc-amoros.github.io` (en minúsculas, como exige GitHub cuando el usuario
lleva mayúsculas), público (Pages gratis lo exige), y con
*Settings → Pages → Source* en **GitHub Actions** la web queda en
https://marc-amoros.github.io/.

Tres cosas que conviene saber:

- Las rutas de la web son absolutas (`/css/…`, `/assets/…`), así que solo
  funciona en la raíz de un dominio. Por eso el repositorio tiene que llamarse
  `usuario.github.io`: con otro nombre se serviría desde una subcarpeta y se
  vería sin estilos ni imágenes.
- `.gitignore` deja fuera los originales de la raíz. `AWARDS.mov` pesa 169 MB y
  GitHub rechaza cualquier archivo de más de 100 MB, así que no lo quites
  antes del primer commit.
- `site` (en `astro.config.mjs`) es la URL definitiva: de ella salen las
  canónicas, el sitemap y `robots.txt`. `marcamoros.com` lo sirve hoy
  Squarespace; para trasladarlo cambia `site`, crea `public/CNAME` con el
  dominio y solo entonces toca los DNS.

## Qué hay dentro

```
src/pages/index.astro            Portada: hero, sobre mí, trayectoria, portafolio, artículos, contacto
src/pages/proyecto/[slug].astro  Una ficha por proyecto   → /proyecto/SLUG/
src/pages/articulo/[slug].astro  Un artículo por entrada  → /articulo/SLUG/
src/pages/404.astro              Página de error, con la barra y el tema del sitio
src/pages/sitemap.xml.js         Mapa del sitio, escrito con los mismos datos
src/pages/robots.txt.js          robots.txt, con el sitemap en el mismo dominio que `site`
src/layouts/Base.astro           Cabeza, barra, pie, botón flotante y modal de contacto
src/components/Contacto.astro    El bloque de contacto (portada y modal de las fichas)

src/data/proyectos.js            Los 12 casos de estudio (textos + láminas)
src/data/articulos.js            Los 5 artículos de Medium, íntegros
src/data/alt-textos.js           Textos alternativos de las imágenes de los artículos
src/lib/ajustes.js               Interruptor de los enlaces que sacan del sitio
src/lib/version.js               Versión (huella) de los archivos de public/ para la caché
src/lib/fecha.js                 La fecha larga en castellano
src/lib/articulo.js              Pone id a los titulares y alt a las imágenes al compilar

public/css/tokens.css            Única fuente de verdad: color, tipografía, espaciado, elevación
public/css/styles.css            Componentes de la portada
public/css/detalle.css           Componentes de las fichas y los artículos
public/assets/fonts/             Inter variable subconjunto (woff2) + su licencia
public/assets/                   Una carpeta por proyecto (láminas WEBP y SVG) y los retratos

public/js/main.js                Tema, menú, pestañas, acordeón, revelados, ripple, malla, contacto, FAB
public/js/caso.js                Comportamiento de la ficha (menú lateral, avance, vídeo, ampliaciones)
public/js/lectura.js             Comportamiento del artículo (cuánto queda, apartado activo)
public/js/vendor/motion.js       Motion 13 (MIT): trayectoria, «sobre mí» e idiomas
public/proyecto.html             Redirige los enlaces antiguos proyecto.html?p=SLUG a la ruta nueva
public/articulo.html             Ídem para los artículos (articulo.html?a=SLUG)

.github/workflows/deploy.yml     Compila y publica la web en GitHub Pages al subir cambios a main
.gitignore                       Lo que no se sube a GitHub: originales de la raíz, node_modules y dist

dist/                            Lo que genera el build. Es lo que se sube al hosting.
_anterior/                       El sitio antes de Astro y activos que ya no se usan. Se puede borrar. No se sube a GitHub.
```

Retratos en `public/assets/`: `marc.webp` (1200×1600, el de «Sobre mí» y, si se enciende
`retratoHero`, el de la portada),
`marc.jpg` (750×1000, para los datos estructurados), `marc-560.jpg` (420×560,
foto del contacto e icono en iOS) y `marc-og.jpg` (1200×628, al compartir el
enlace).

## El sistema visual: Apple × Material

La base es `base-diseno-web.md`: tokens en `:root`, escala fluida con `clamp()`,
propiedades lógicas, patrón Section + Container y color en dos capas
(primitivos → semánticos).

### La paleta (60 / 30 / 10)

| Peso | Color | Papel en la web | Token |
|---|---|---|---|
| 60 % dominante | `#ffffff` | Fondo y aire de la página | `--color-neutral-0` |
| 30 % secundario | `#473960` | Tinta del texto y superficies oscuras | `--color-plum-500` |
| 10 % acento | `#5a13d2` | CTA, enlaces y todo lo accionable | `--color-violet-500` |

Los neutros no son grises puros: toda la rampa lleva el sesgo violeta del
secundario, para que blanco, tinta y acento se lean como una familia. En modo
oscuro el acento sube a `#9d6bff`, porque `#5a13d2` sobre negro no llega al
contraste mínimo. El fondo en oscuro es **negro puro** (`#000000`); las
superficies que se elevan sobre él sí llevan el tinte violeta (`#14101d` las
secciones hundidas, `#1c1629` las tarjetas), que es lo que da la escalera de
profundidad.

Los **primitivos** (`--color-neutral-450`, `--color-neutral-500`…) no cambian de
tema. Sirven para lo que va sobre un fondo que es blanco también en oscuro, como
el crédito de un vídeo dentro de una lámina: ahí no se usan los semánticos.

**Color plano en la interfaz.** Ni halos, ni auroras, ni texto recortado sobre
un degradado: cada superficie es un color liso de la paleta. La jerarquía la
llevan la elevación, la tipografía y el 10 % de acento. Dos excepciones, las
dos deliberadas: la viñeta del retrato (`.portrait::after`), que es tratamiento
fotográfico en negros y no color de marca, y la malla del hero, que sí recorre
un degradado del secundario al acento.

De **Apple** vienen la retícula y el aire, la barra translúcida con
`backdrop-filter`, los botones píldora de 980 px y las sombras muy difusas.

**Tipografía: Inter variable, alojada aquí mismo.** Un único archivo
(`assets/fonts/inter-var.woff2`, unos 125 KB) cubre todos los pesos de 100 a 900,
así que `--weight-*` sigue pidiendo el peso que quiera y el navegador lo
interpola; no hay una petición por peso. El subconjunto es latino ampliado
más los signos que usa el sitio (→ ↗ ● « » …) y conserva el eje óptico
`opsz`, que con `font-optical-sizing: auto` afina el trazo en los titulares
de 80 px y lo engorda en las etiquetas de 11 px. Se precarga en el `<head>`
y va con `font-display: swap`, así que el texto se lee desde el primer
frame. Detrás queda el stack del sistema como red de seguridad. Licencia SIL
OFL 1.1, junto a la fuente. La carpeta `Inter/` de la raíz es el original de
Google Fonts: no se sirve, solo está para poder rehacer el subconjunto.

De **Material Design 3** vienen:

| Elemento | Dónde está |
|---|---|
| Elevación en cinco niveles | `--elev-1` … `--elev-5` |
| Elevación **tonal** (la superficie se tiñe del acento al subir) | `--surface-1`, `--surface-2`, `--surface-3` |
| Capas de estado en hover, foco y pulsación | `--state-hover`, `--state-focus`, `--state-press` |
| Ripple al pulsar | `.ripple` + el `pointerdown` de `main.js` |
| Pestañas con indicador deslizante | `.tabs` en Trayectoria |
| Botón flotante (FAB) | `.fab`, aparece al pasar el hero |
| Curvas «emphasized» | `--ease-emphasized`, `--ease-emphasized-decel` |

## Las animaciones

- **Obertura del hero**: el titular sube línea a línea desde detrás de su
  máscara y el resto entra escalonado.
- **La «M» de la portada** (`.hero__arte` en `index.astro` y la sección «6 bis» de
  `styles.css`): una mesa de trabajo de diseño. Una «M» de módulo serif, dibujada a
  mano como un único trazado —sin fuente ni imagen, y sin costuras: la caja de
  selección coincide con la cara al píxel— sobre un lienzo girado con rejilla, con
  guías, la caja de selección y sus ocho asas, la medida («480 × 364»), el cursor
  de quien la toca con su nombre y un interruptor. Es el oficio hecho imagen:
  la letra como una pieza que se diseña. Es decoración (`aria-hidden`).
  - **Volumen.** La letra es un sólido: una cara con degradado, 16 copias detrás
    (`.arte__lado`) que forman el fondo extruido —del violeta pleno a uno más
    apagado— y su sombra difuminada. El lienzo tiene degradado, reflejo, filo claro
    y una sombra que lo eleva; detrás hay un halo de luz. Las sombras son filtros
    SVG (no CSS) porque los CSS sobre piezas sueltas de un SVG no los pintan todos
    los navegadores.
  - **Con el cursor.** Cada grupo es una capa (`.arte__capa`) que `main.js`
    desplaza un poco (`--px` y `--py`, de -1 a 1), cada una a su ritmo. De esos
    mismos números sale hacia dónde cae el fondo de la letra: si el cursor va a la
    derecha, la cara se adelanta y el fondo queda a su izquierda. El cursor de Marc
    va hacia el tuyo (`--dx` y `--dy`) mientras lo tienes sobre la composición, y
    cada vez que entras el brillo vuelve a cruzar la letra (no más de una vez cada
    cinco segundos).
  - **Entrada.** En cascada con el titular: el lienzo cae girando y el halo se
    enciende, las guías cruzan, la letra sube y saca su fondo con un pequeño
    rebote (`--prof`, un número registrado con `@property`), la caja se dibuja, las
    asas saltan una a una, la medida cuenta hasta «480 × 364», el interruptor se
    enciende, el cursor llega volando y, al final, el brillo cruza la letra. Después
    el cursor se mece despacio.
  - **Tema y accesibilidad.** Los colores salen de `--portada-arte-*`
    (`tokens.css`) y cambian con el tema. El estado base es la composición
    terminada: sin JavaScript se ve completa, con volumen y quieta, y con
    `prefers-reduced-motion` no se anima ni responde al cursor.
- **Malla de puntos** (`<canvas id="malla">` + `mallaDePuntos()` en `main.js`):
  un retículo que pesa en los márgenes y respira con una onda diagonal
  lentísima. Nunca pisa el texto: `medir()` toma las cajas reales del
  antetítulo, el titular, el párrafo y los botones, y `libre()` apaga los
  puntos dentro de ellas con 80 px de desvanecido, así que el hueco se ajusta
  solo a cualquier ancho de pantalla y a cualquier longitud de titular. Recorre un
  degradado en diagonal del secundario al acento —cada punto es un color liso, el
  degradado aparece al cruzar el campo entero— y hacia el acento los puntos
  crecen y ganan opacidad. Cerca del cursor se encienden del todo. Lee los
  colores de los tokens, así que sigue al tema; solo dibuja mientras el hero está
  en pantalla; con `prefers-reduced-motion` pinta un fotograma fijo y se
  detiene, pero sigue el ancho de la ventana y el cambio de tema.
- **Carrusel del portafolio**: la fila de proyectos es un scroller nativo con
  `scroll-snap`, así que el dedo, el trackpad y la rueda ya funcionan sin
  JavaScript; el script solo añade las flechas, los puntos y las teclas de
  dirección, y mantiene su estado. Cada tarjeta es una parada obligatoria
  (`scroll-snap-stop`) y las flechas, los puntos y las teclas avanzan de una en
  una: hay un punto por cada posición a la que se puede llegar. Caben una, dos o
  tres tarjetas en la caja de la página según el ancho, y la pista llega hasta
  el borde derecho de la ventana, así que la siguiente siempre asoma por ahí
  (las tarjetas se miden contra la caja, `100cqw`, no contra la pista). En
  móvil el número tampoco es entero a propósito. En pantallas táctiles las
  flechas desaparecen —se arrastra con el dedo y además chocarían con el botón
  flotante de contacto— y quedan solo los puntos; con ratón y una ventana
  estrecha pasan a una segunda fila. La pista lleva relleno por dentro y margen
  negativo por fuera: así la sombra de la tarjeta elevada cabe entera, con sus
  esquinas redondeadas, sin que el scroller la recorte y sin mover ni un píxel
  las tarjetas respecto al resto de la página.
- **Tarjetas del portafolio**: se inclinan levemente en 3D al pasar el cursor.
  Solo con ratón.
- **Trayectoria**: cada puesto es un acordeón que empieza plegado; el raíl de la
  línea de tiempo se dibuja al entrar en pantalla y las barras de idioma crecen
  hasta su nivel.
- **Contadores** del hero, que cuentan hasta su cifra una sola vez.
- **Transiciones de vista**: al abrir un proyecto, su portada se transforma en la
  portada de la ficha (Chrome y Safari; en el resto la navegación es normal).

Todo respeta `prefers-reduced-motion: reduce`: con esa preferencia activada no
se mueve nada.

## Cómo editar el contenido

### Un proyecto

Todo vive en `src/data/proyectos.js`. Copia un objeto de la lista y cambia:

- `slug` — lo que va en la URL (`/proyecto/besmie/`).
- `titulo`, `claim`, `resumen` (el párrafo de la cabecera de la ficha) y `tipo`.
  Si el resumen pasa de unos 160 caracteres, añade `descripcion`: es la que
  enseñan los buscadores, y Google corta lo que se pasa.
- `rol`, `equipo`, `metodologia`, `duracion` (opcional), `herramientas`.
- `reto`, `investigacion`, `solucion`, `resultados` — listas de párrafos.
- `destacados` — las tres cifras de la cabecera. Siempre tres.
- `fecha` — `AAAA-MM-DD`; sale en la ficha y en el sitemap.
- `tags` y `portada` (la imagen de la tarjeta y de la cabecera).
- `galeria` — las láminas, en orden; se reparten solas entre los cuatro bloques,
  o se fijan a uno con `bloque`. Cada una lleva `src`, `w` y `h` (los píxeles
  reales: reservan el hueco y evitan que la página salte al cargar) y **una de
  estas dos cosas**: `pie` (texto visible bajo la lámina) o `alt` (descripción
  para lectores de pantalla, sin cambiar lo que se ve). Una lámina sin ninguna
  de las dos es opaca para quien no la ve, y muchas contienen el caso entero.
  `unir: true` pega la lámina a la anterior en un mismo marco; `ancho: true`
  evita que dos láminas apaisadas se pongan en columnas cuando llevan texto
  pequeño.
- `clips` — vídeos o prototipos de Figma. `tras` los cose justo detrás de una
  lámina; `bloque` los pone al final de una sección.
- `prototipo`, `video`, `stats`, `behance` y `proyectoRelacionado` — solo en los
  que los tienen.
- `sitio`, `sitioTexto`, `sitioNota` y `forzarSitio` — para un producto público
  (ver «Los interruptores»).

Después añade su tarjeta en `src/pages/index.astro`, dentro de
`<div class="carrusel__pista">`, copiando otra y cambiando el `href`, la imagen,
los textos y el `view-transition-name` (tiene que ser `portada-` + el `slug`).
Los puntos del carrusel se generan solos a partir de las tarjetas que encuentre.
La portada escribe a mano dos cosas más que hay que actualizar: «Doce casos» y
«los nueve proyectos publicados en Behance» en el párrafo de la sección
Portafolio, y los contadores del hero (`data-count`).

Las imágenes van en WEBP, a 1600 px de ancho las láminas (2000 las de BMW),
calidad 82.

### Un artículo

`src/data/articulos.js` guarda el texto ya limpio. Para añadir uno nuevo copia un
objeto, pon su `slug`, su `proyecto` (para que aparezca en la ficha de ese caso),
su `proyectoTitulo` —el título del caso, copiado aquí para que la página del
artículo no tenga que cargar el fichero entero de proyectos—, `orden`, `titulo`,
`sub`, `fecha`, `fechaLarga`, `minutos` y el cuerpo en `html`. Después añade su
tarjeta en la sección `#articulos` de `src/pages/index.astro`.

Los `<h2>` del cuerpo son los que alimentan el menú lateral: `src/lib/articulo.js`
les pone id y los convierte en apartados. Con menos de tres no monta índice, solo
el anillo de lectura y el enlace al caso. Las imágenes que no llevan pie necesitan
su texto en `src/data/alt-textos.js`; el build avisa de las que faltan.

### Los interruptores

`src/lib/ajustes.js` tiene cinco interruptores:

- `estadoHero`: con `false` (como está ahora) no se pinta la píldora «Barcelona ·
  Diseñador de Producto Digital (UX/UI)» que iba encima del titular de la
  portada. Con `true` vuelve tal cual.
- `retratoHero`: con `false` (como está ahora) no se pinta el retrato con su
  tarjeta que iba junto a las cifras de la portada, y las cuatro cifras pasan a
  una sola fila en pantalla ancha. El retrato vive en «Sobre mí». Con `true`
  vuelve a la portada, y el de «Sobre mí» se queda.
- `botonesHero`: con `false` (como está ahora) no se pintan «Ver portafolio» y
  «Contactar» en la portada; el camino sigue abierto por el menú, «Hablemos» y el
  botón flotante. Con `true` vuelven, con sus esquinas en hoja.
- `sobreMiCompleto`: con `false` (como está ahora) «Sobre mí» se queda en lo
  esencial: el retrato con su tarjeta (nombre y oficio), el título, la presentación, «Cómo
  trabajo», las tres tarjetas de áreas de trabajo y una línea con herramientas y
  metodologías. Con `true` vuelve lo que se quitó: la nota sobre documentar el
  proceso, «Proyectos destacados» (tres filas con enlace a su caso) y las
  herramientas y metodologías en píldoras.
- `salidasExternas`: con `false` (como está ahora) no se pintan los enlaces a
  Behance, Medium ni LinkedIn, ni el del producto del cliente, pero se conserva
  el contenido que los acompañaba (las estadísticas de Behance, la nota del
  producto). Un proyecto con `forzarSitio: true` enseña su enlace al producto
  aunque el interruptor esté apagado: es lo que hacen los dos portales del
  Notariado, porque ahí el producto en producción es la prueba del trabajo.

## Accesibilidad

Lo que hay hecho, y lo que conviene no romper al tocar:

- Enlace «Saltar al contenido», foco visible en todo lo que se puede pulsar y
  orden de tabulación que sigue el de lectura. El botón flotante no recibe foco
  mientras no se ve.
- Cada lámina tiene `pie` o `alt`; los textos de las imágenes de los artículos
  viven en `src/data/alt-textos.js`.
- Las ampliaciones a pantalla completa (prototipo y vídeos) aíslan el resto de la
  página con `inert`: el foco no se escapa a lo que queda tapado y Escape cierra.
- Los puestos de la trayectoria son titulares (`<h3>`) que envuelven al botón que
  los abre, el patrón de acordeón de WAI-ARIA.
- Contraste AA en claro y oscuro, tema recordado, `prefers-reduced-motion`
  respetado y tamaños de diana de 24 px como mínimo.

## Decisiones que conviene que conozcas

**Las imágenes de los proyectos están en el propio sitio.** Ya no se sirven
desde Behance: las láminas y portadas viven en `public/assets/<proyecto>/`. Las
que sí siguen fuera son las 75 imágenes de los artículos, que apuntan a Medium.
Si Medium las retirase, el artículo mostraría un hueco; si prefieres tenerlas en
local, descárgalas a `public/assets/` y cambia las rutas en `articulos.js`.

**Los enlaces a Behance, Medium y LinkedIn están apagados** (ver «Los
interruptores»). La web se lee entera sin salir de ella.

**El contacto es un `mailto:`, no un formulario.** Una web estática no puede
enviar correo por sí sola. Si quieres un formulario de verdad, lo más rápido es
[Formspree](https://formspree.io) o Netlify Forms si la publicas en Netlify.

**Tu teléfono y tu dirección no están en la web.** Están en el CV, pero
publicarlos en una página abierta es exponerlos a cualquiera. Si los quieres, van
en el bloque de `src/components/Contacto.astro`.

**La caché no se gestiona a mano.** `src/lib/version.js` añade a cada CSS y JS un
`?v=` que sale del contenido del archivo: cambia solo cuando el archivo cambia.

**La trayectoria sale de tu CV.** El primer puesto pone «Feb 2022 - Actualmente»
porque es lo que dice el CV. Si cambia, edítalo en `src/pages/index.astro`,
dentro de `#panel-exp`.

**Los enlaces antiguos siguen funcionando.** `public/proyecto.html` y
`public/articulo.html` redirigen `?p=SLUG` y `?a=SLUG` a las rutas nuevas, para
los enlaces ya publicados en Behance o LinkedIn.

## Comprobado

A 20 de septiembre de 2026, sobre las 19 páginas compiladas:

- `html-validate` (reglas recomendadas y de accesibilidad): 0 avisos.
- 0 enlaces ni anclas rotos, 0 imágenes locales inexistentes, 0 `id` repetidos, un
  solo `<h1>` por página. Los 79 recursos externos responden.
- Sin desplazamiento horizontal a 320, 375, 768, 1280 y 1440 px.
- Contraste AA en modo claro y oscuro, en todas las páginas.
- Navegación con teclado revisada en la portada, en una ficha y en un artículo:
  todas las paradas tienen indicador de foco.
- Sin errores en consola.
