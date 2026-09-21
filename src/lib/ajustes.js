/* Interruptores del sitio.
   ------------------------------------------------------------ */

/* Los enlaces que sacan al visitante fuera: Behance, Medium, LinkedIn y el
   producto del cliente. Con esto en false no se pintan, pero el contenido que
   los acompañaba se queda -las estadísticas de Behance, la nota del portal-,
   porque ahí es donde está la prueba de que el trabajo existe. Donde había
   una puerta de salida ahora hay una interna: el contacto o el caso completo.

   Se deja como un solo interruptor para poder volver a encenderlos sin tener
   que buscar los ocho sitios donde estaban. */
export const salidasExternas = false;

/* La píldora que hay encima del titular de la portada: «Barcelona · Diseñador
   de Producto Digital (UX/UI)». Con esto en false no se pinta y el titular
   sube a ocupar su sitio; el estilo y la animación del borde se quedan en
   styles.css, así que volver a encenderla es cambiar esta palabra. */
export const estadoHero = false;

/* El retrato con su tarjeta («Marc Amorós · El diseño como puente entre el
   usuario y el producto») que iba junto a las cifras de la portada. Con esto en
   false no se pinta y las cuatro cifras pasan a ser toda la escena; el retrato
   vive ahora en «Sobre mí». Los estilos y la animación de entrada se quedan en
   styles.css, así que volver a encenderlo es cambiar esta palabra. */
export const retratoHero = false;

/* Los dos botones de la portada, «Ver portafolio» y «Contactar». Con esto en
   false no se pintan; el camino sigue abierto por el menú, el botón «Hablemos»
   y el botón flotante de contacto. El estilo de los botones en hoja
   (.btn--hoja) se queda en styles.css: volver a encenderlos es cambiar esta
   palabra. */
export const botonesHero = false;

/* «Sobre mí» en su versión completa. Con esto en false (como está ahora) la
   sección se queda en lo esencial: el retrato, el título, la presentación, «Cómo
   trabajo», las tres áreas de trabajo y una línea con herramientas y
   metodologías. Con true vuelve lo que se ha quitado: la nota sobre documentar
   el proceso, «Proyectos destacados» con su enlace a cada caso, y las
   herramientas y metodologías en píldoras. Los estilos se quedan en styles.css,
   así que volver a encenderlo es cambiar esta palabra. */
export const sobreMiCompleto = false;
