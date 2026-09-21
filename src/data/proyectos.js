/* Los 12 casos de estudio. Antes esto colgaba de window.PROYECTOS y lo leía
   el navegador; ahora lo lee Astro al compilar y el HTML sale ya hecho. */
export const PROYECTOS = [
 {
  "slug": "portal-estadistico-notariado",
  "titulo": "Portal Estadístico del Notariado",
  "claim": "El precio real de la vivienda, no el anunciado",
  "resumen": "Portal público del Consejo General del Notariado que abre a cualquiera el precio al que se firman de verdad las compraventas: mapa, estadísticas y utilidades para decidir con datos.",
  "descripcion": "Portal público del Notariado con el precio al que se firman de verdad las compraventas: mapa, estadísticas y utilidades para decidir con datos.",
  "tipo": "Producto en producción · Sector notarial",
  "metodologia": "Diseño de producto y sistema de diseño",
  "duracion": "2 años",
  "rol": "UX/UI",
  "equipo": "UX/UI, junto a analistas y desarrollo",
  "herramientas": [
   "Figma"
  ],
  "reto": [
   "Cuando buscas piso solo ves un precio: el que pide el vendedor. El precio al que se cierra de verdad, el de la escritura, existe y está en las notarías, pero no llegaba a quien tenía que decidir. El encargo que llegó al equipo de UX/UI era convertir ese dato en un producto público, gratuito y que no pidiera nada a cambio.",
   "La materia prima no ayudaba: estadística inmobiliaria oficial con capas nacional, provincial, municipal y por código postal, tipos de finca, tipos de construcción y series mensuales. Para un profesional eso es su día a día; para alguien que compra su primera casa es un muro. Aquí diseñar era, sobre todo, decidir qué se enseña primero y qué espera un nivel más abajo.",
   "Y había un límite que no se negocia: el dato es agregado y anónimo por obligación. La interfaz tenía que dejar claro que muestra la media de una zona y no la operación de la casa de al lado, sin convertirse en un muro de advertencias que nadie lee."
  ],
  "investigacion": [
   "En la misma web conviven dos personas muy distintas. El particular entra una vez, con una pregunta concreta, y quiere una cifra que entienda. El profesional vuelve cada semana y quiere filtrar, comparar zonas y ver la serie completa. Diseñar solo para uno rompía al otro, así que planteamos las dos rutas sobre la misma pantalla en vez de partir el producto en dos.",
   "De ahí salió la decisión que ordena todo lo demás: la consulta empieza en un mapa. Nadie sabe decir «código postal 08015», pero todo el mundo sabe señalar dónde vive o dónde quiere vivir. El territorio es la entrada natural y el formulario, la de después.",
   "El segundo hallazgo fue de lenguaje. Euros por metro cuadrado, tipo de finca, tasa de esfuerzo, años de renta necesaria: cada término es una barrera pequeña que suma. Buena parte del trabajo de interfaz consistió en explicarlos justo donde aparecen, y no en una página de ayuda que nadie abre."
  ],
  "solucion": [
   "La consulta arranca en el mapa: buscas por provincia, municipio o código postal y, si lo que te interesa no cabe en el buscador, dibujas tu propia zona a mano. El mapa se colorea por precio y la leyenda hace dos trabajos a la vez, escala de lectura y control de filtrado.",
   "Los datos llegan por capas. Primero la cifra que resuelve la pregunta de la mayoría, el precio medio por metro cuadrado de esa zona. Después, para quien lo necesita, el panel completo: evolución mensual, vivienda nueva frente a segunda mano, superficie media, número de compraventas e indicadores del comprador.",
   "El panel entero se monta con una sola pieza repetida, la tarjeta de indicador. Lleva su definición a un clic, la cifra con su tendencia, el periodo del que habla siempre visible y un conmutador para verla como gráfico o como tabla, porque no todo el mundo lee un dato igual. Un componente resuelto una vez y reutilizado en toda la pantalla.",
   "Antes de entrar en las estadísticas colocamos una confirmación que repite en una frase qué filtros llevas puestos. Es el punto donde más se equivoca la gente, y sale más barato preguntarlo que dejar que alguien saque conclusiones de una selección que no era la suya.",
   "Alrededor del mapa están las utilidades que convierten el dato en decisión: calculadora de hipoteca, tasa de esfuerzo, buscador de notario y guías de trámites y documentación. Y un área privada donde guardar búsquedas y recuperar consultas anteriores."
  ],
  "resultados": [
   "El portal está publicado y en uso: es gratuito, se actualiza cada mes y cada consulta trabaja con los últimos doce meses de compraventas firmadas.",
   "La navegación se resolvió con una barra fija de cinco destinos (Inicio, Mapa, Utilidades, Actualidad y Área privada) que se comporta igual en móvil y en escritorio. Y el mapa recibe a quien llega por primera vez con un tutorial de menos de un minuto que puede saltarse cuando quiera.",
   "Por debajo está el sistema de diseño que mantiene el equipo: componentes, patrones y estilos compartidos entre productos, para que el portal, las herramientas internas y las comunicaciones se reconozcan como la misma casa. Es la parte que no se ve y la que hace que la siguiente pantalla no empiece de cero."
  ],
  "destacados": [
   {
    "n": "4",
    "l": "niveles: nacional, provincia, municipio y código postal"
   },
   {
    "n": "12",
    "l": "meses de datos en cada consulta"
   },
   {
    "n": "5",
    "l": "destinos en la navegación principal"
   }
  ],
  "fecha": "2025-10-24",
  "sitio": "https://penotariado.com/inmobiliario/home",
  "sitioTexto": "Abrir el portal",
  "sitioNota": "Producto público y en producción del Consejo General del Notariado, con el soporte técnico del Centro Tecnológico del Notariado. Las láminas de esta ficha son esquemas propios: reconstruyen las decisiones de diseño, no son capturas del portal.",
  "forzarSitio": true,
  "tags": [
   "producto digital",
   "datos y estadística",
   "mapa interactivo",
   "sistema de diseño",
   "sector público",
   "responsive"
  ],
  "galeria": [
   {
    "src": "assets/pen/01-dos-precios.svg",
    "w": 1200,
    "h": 750,
    "alt": "Esquema de dos precios: el anunciado por el vendedor y el de escritura, que es el que se paga; el dato es agregado y anónimo.",
    "pie": "El punto de partida: el precio anunciado se ve en todas partes, el de la escritura no llegaba a nadie. Y el dato solo puede publicarse agregado."
   },
   {
    "src": "assets/pen/02-dos-usuarios.svg",
    "w": 1200,
    "h": 808,
    "alt": "Dos usuarios del portal: quien compra su casa y empieza en el mapa, y quien trabaja con el dato y necesita tablas y detalle a un clic.",
    "pie": "Los dos perfiles que comparten la web y la decisión que sale de ahí: empezar por el mapa y dejar el detalle a un clic."
   },
   {
    "src": "assets/pen/03-mapa-anotado.svg",
    "w": 1200,
    "h": 750,
    "alt": "Mapa anotado con cinco zonas: buscar o filtrar, leyenda de precio, cifra del precio medio, dibujar tu área y más estadísticas.",
    "pie": "La pantalla de mapa con las decisiones anotadas: buscar, la leyenda que también filtra, la cifra primero, dibujar tu área y la segunda capa de estadísticas."
   },
   {
    "src": "assets/pen/04-tarjeta-indicador.svg",
    "w": 1200,
    "h": 968,
    "alt": "Tarjeta de indicador con definición, cifra y tendencia, periodo y selector gráfico o tabla, repetida en las cinco estadísticas del panel.",
    "pie": "Las cuatro decisiones de la tarjeta de indicador y las cinco estadísticas del panel que la reutilizan tal cual."
   }
  ],
  "portada": "assets/pen/portada-mockup.webp",
  "portadaAlt": "Un monitor sobre un escritorio muestra el Portal Estadístico del Notariado: un mapa de España en tonos naranjas."
 },
 {
  "slug": "portal-notarial-ciudadano",
  "titulo": "Portal Notarial del Ciudadano",
  "claim": "Un trámite legal que se entiende sin ser jurista",
  "resumen": "El Portal Notarial donde cualquier persona gestiona sus documentos y trámites notariales desde cualquier dispositivo: copias electrónicas de sus escrituras, solicitud de actos jurídicos y cita con la notaría más cercana.",
  "descripcion": "El Portal Notarial donde cualquier persona gestiona sus trámites desde cualquier dispositivo: copias electrónicas, actos jurídicos y cita en notaría.",
  "tipo": "Producto en producción · Sector notarial",
  "metodologia": "Agile",
  "duracion": "4 años",
  "rol": "UX/UI",
  "equipo": "UX/UI, junto a negocio, asesoría jurídica y desarrollo",
  "herramientas": [
   "Figma"
  ],
  "reto": [
   "Hasta hace poco, cualquier gestión notarial en España pasaba por el mostrador: ir a la notaría, llevar papeles y volver a por ellos. Cuando la ley abrió la puerta a tramitar actos jurídicos por medios telemáticos, el Consejo General del Notariado necesitaba el sitio donde eso pudiera ocurrir de verdad: un portal público en el que un ciudadano o una empresa hicieran sus gestiones con su notario sin pisar la notaría, y sin perder por el camino la seguridad jurídica, que es lo único que hace que un documento notarial valga algo.",
   "La dificultad de partida no era técnica sino de idioma. Copia autorizada, legitimación de firma, otorgante, protocolo: cada término del mundo notarial es preciso por ley y opaco para quien lo lee por primera vez. No se podían sustituir por sinónimos amables, porque tienen valor jurídico, así que había que diseñar alrededor de ellos.",
   "Y hay un condicionante que ordena todo lo demás: aquí se firma. Registrarse no basta. Para la mayoría de los trámites la ley exige además acreditar quién eres (con Cl@ve PIN, con un certificado electrónico cualificado o presentándote en cualquier notaría), de modo que la cuenta nace a medias y se termina de abrir fuera de la pantalla. Ese es el verdadero problema de diseño: hacer visible un estado jurídico que no se ve, y convertir una espera en un siguiente paso."
  ],
  "investigacion": [
   "Trabajamos con tres arquetipos, porque las tres maneras de llegar piden cosas distintas. El ciudadano ocasional viene a resolver algo concreto (una copia de su escritura, un poder) y no tiene por qué aprender vocabulario jurídico para conseguirlo. El emprendedor y la empresa vuelven a menudo y con prisa: constituir una sociedad, levantar un acta, y lo que necesitan es que el camino sea corto. Y está el usuario sénior, que en un producto de testamentos y herencias no es una minoría: necesita una vía guiada, texto legible y una forma de identificarse que no dependa de tener un certificado instalado.",
   "Al portal se llega, además, con dos vocabularios. Hay quien viene con el nombre del trámite aprendido, casi siempre porque se lo ha dicho la notaría, y hay quien viene con un hecho de su vida y ninguna palabra técnica: he heredado, vendo el piso, monto una empresa. Diseñamos las dos entradas en la misma pantalla en lugar de obligar a todo el mundo a hablar en jurídico.",
   "El hallazgo que cambió el planteamiento entero fue la frecuencia de uso. Una persona entra aquí una vez cada varios años, así que no acumula memoria del producto y cada visita es una primera visita. Eso descarta cualquier atajo que dependa de recordar dónde estaba algo y obliga a que cada pantalla se explique sola.",
   "Y lo digital no sustituye a la notaría, la prepara. Casi ningún trámite termina en la pantalla: el testamento se redacta a distancia y se firma delante del notario. Encima, el calendario no lo pone el usuario, lo pone la ley: en el préstamo hipotecario hay diez días hábiles para pedir cita desde que el notario revisa la documentación del banco. Un plazo así no es un detalle de redacción; si no aparece donde el usuario está mirando, el trámite se cae sin que nadie lo toque."
  ],
  "solucion": [
   "El inicio se organizó por lo que la gente quiere hacer y no por cómo se estructura la institución. Tres puertas: gestionar los trámites que ya has empezado, consultar las copias electrónicas de tus escrituras y pedir cita en una notaría. Cada una nombrada con un verbo y con una frase debajo que dice qué hay detrás.",
   "El acceso se partió en dos actos en lugar de uno. Registrarse cuesta un formulario y deja usar el portal desde el primer minuto; acreditar la identidad viene después, cuando el trámite lo pide, y admite tres caminos según con qué se sienta cómodo cada uno: Cl@ve PIN, certificado electrónico cualificado o pasarse por una notaría, que es gratis y resuelve al usuario que no quiere instalar nada. Así nadie se topa con el requisito legal antes de haber visto para qué sirve el sitio.",
   "Ese estado a medias se cuenta en tres sitios a la vez: una etiqueta en el perfil que dice si tu documento está validado, un aviso en el escritorio que recuerda qué trámites lo exigen y el propio menú, donde lo que aún no puedes hacer se ve apagado en lugar de desaparecer. Ver la puerta cerrada explica el sistema; esconderla, no.",
   "El vocabulario notarial se traduce donde aparece. Cada término lleva su explicación en lenguaje corriente pegada al campo o al botón, nunca en un glosario aparte, porque una página de ayuda solo la abre quien ya sabe que necesita ayuda. Y una tarea se dejó deliberadamente fuera del muro: comprobar que una copia electrónica es auténtica se resuelve con el código que trae el propio documento, sin cuenta y sin acreditación, porque quien llega ahí no viene a ser usuario del portal, viene a mirar un papel y marcharse tranquilo.",
   "En España rige la libre elección de notario, y esa ley se convirtió en pantalla: un buscador por municipio o código postal, con el teléfono, el correo y el mapa dentro del propio resultado, y una estrella para guardar a los habituales, porque a la misma notaría se vuelve. Elegir deja de ser un privilegio que hay que saber que existe y pasa a ser el primer paso visible de la cita.",
   "Cada trámite se monta con la misma plantilla: qué es y para qué sirve, un botón para empezar, un panel que promete lo mismo en todos (seguir la solicitud, saber en qué estado está, llegar hasta la firma y guardar lo ya firmado) y el proceso partido en pasos, con el reparto claro entre lo que haces tú, lo que hace el notario y lo que sigue exigiendo ir a la notaría. Aprendida una vez, sirve para el testamento, para la sociedad y para la hipoteca.",
   "Los estados se dibujan, no se cuentan. Las citas viven en un calendario con una leyenda corta (confirmada, pendiente de que la confirme el notario, rechazada, caducada) y cada trámite lleva el suyo con lo que se espera de ti y para cuándo. Las respuestas tampoco se van al correo personal: aterrizan en una bandeja dentro del portal, con aviso al entrar y filtros por trámite, estado y tema. En un producto que se usa una vez cada varios años, tener el hilo entero en un sitio es lo que sustituye a la memoria.",
   "El móvil no es una reducción del escritorio, porque el trámite empieza muchas veces ahí. Se diseñó para leer un documento largo en una pantalla estrecha, guardarlo, seguir el expediente y entrar a la videoconferencia con el notario; el mismo portal responde en el navegador y hay además aplicación de iOS y Android para quien la prefiere.",
   "Por debajo, un sistema de diseño compartido con el resto de productos del Notariado: azul institucional para el marco, verde reservado a la acción que confirma y neutros cálidos para las zonas de lectura larga. La accesibilidad no era aquí una aspiración sino una obligación, porque el sector público español tiene que cumplir el nivel AA de las WCAG 2.1, y eso baja a decisiones concretas: contraste, jerarquía tipográfica, foco visible, todo alcanzable con el teclado y cada estado de trámite anunciado por el lector de pantalla. El portal funciona además en los cuatro idiomas del Estado y en cuatro más, así que las etiquetas se dimensionan por la cadena más larga de las ocho y no por la castellana."
  ],
  "resultados": [
   "El portal está publicado y en uso. Es gratuito, funciona en el navegador y como aplicación de móvil, está disponible en ocho idiomas y mantiene atención telefónica para quien prefiere resolverlo hablando.",
   "Los trámites que antes obligaban a una visita solo para preguntar se inician y se siguen desde casa, y el desplazamiento a la notaría queda para lo que de verdad exige presencia, que es la firma. Para quien vive lejos de una notaría, o le cuesta desplazarse, eso no es comodidad: es acceso.",
   "El acceso escalonado hizo lo suyo por su lado. Separar el registro de la acreditación quita del camino el trámite más caro justo cuando el usuario todavía no sabe si le compensa, y lo devuelve más tarde, cuando ya tiene un motivo para completarlo.",
   "Y queda el sistema de diseño que mantiene el equipo. Es lo que hace que este portal y el estadístico se reconozcan como la misma casa y que la siguiente pantalla no empiece de cero."
  ],
  "destacados": [
   {
    "n": "8",
    "l": "idiomas disponibles en el portal"
   },
   {
    "n": "3",
    "l": "vías para acreditar la identidad: Cl@ve, certificado o notaría"
   },
   {
    "n": "AA",
    "l": "nivel WCAG 2.1 exigido al sector público"
   }
  ],
  "fecha": "2022-03-02",
  "sitio": "https://www.portalnotarial.es/portal/web/guest/portal-notarial-del-ciudadano",
  "sitioTexto": "Abrir el portal",
  "sitioNota": "Producto público y en producción del Consejo General del Notariado, con el soporte técnico del Centro Tecnológico del Notariado. Las láminas de esta ficha son esquemas propios: reconstruyen las decisiones de diseño, no son capturas del portal.",
  "forzarSitio": true,
  "proyectoRelacionado": { "slug": "portal-estadistico-notariado", "texto": "Ver el Portal Estadístico del Notariado" },
  "tags": [
   "producto digital",
   "administración electrónica",
   "identidad verificada",
   "sistema de diseño",
   "sector público",
   "accesibilidad",
   "multiidioma"
  ],
  "galeria": [
   {
    "src": "assets/pnc/01-vocabulario.svg",
    "w": 1200,
    "h": 750,
    "bloque": "reto",
    "alt": "Cuatro términos notariales con su explicación: copia autorizada, legitimación de firma, otorgante y protocolo.",
    "pie": "El muro de entrada es el idioma: el término legal se mantiene porque tiene valor jurídico y la traducción se añade justo al lado."
   },
   {
    "src": "assets/pnc/02-dos-entradas.svg",
    "w": 1200,
    "h": 750,
    "bloque": "investigacion",
    "alt": "Dos entradas al mismo trámite: quien sabe el nombre técnico y quien solo sabe qué le ha pasado («he heredado un piso»).",
    "pie": "Unos llegan con el nombre técnico del trámite y otros con lo que les ha pasado: «vendo mi casa», «he heredado un piso»."
   },
   {
    "src": "assets/pnc/03-acceso-dos-actos.svg",
    "w": 1200,
    "h": 888,
    "bloque": "solucion",
    "ancho": true,
    "alt": "La cuenta en dos actos: registrarse con un formulario al llegar y acreditar la identidad con Cl@ve, certificado o notaría cuando el trámite lo pide.",
    "pie": "Registrarse no basta: para la mayoría de los trámites la ley exige además acreditar quién eres. Partir el acceso en dos actos deja usar el portal desde el primer minuto y guarda el requisito caro para cuando ya hay un motivo para completarlo."
   },
   {
    "src": "assets/pnc/04-reparto-tramite.svg",
    "w": 1200,
    "h": 804,
    "bloque": "solucion",
    "ancho": true,
    "alt": "Préstamo hipotecario en cuatro pasos según quién actúa: tú desde casa, el notario y la notaría; diez días hábiles por ley para pedir cita.",
    "pie": "Casi ningún trámite termina en la pantalla: lo digital no sustituye a la notaría, la prepara. El diseño reparte cada paso y avisa de lo que todavía exige presencia."
   },
   {
    "src": "assets/pnc/05-cuatro-canales.svg",
    "w": 1200,
    "h": 544,
    "bloque": "resultados",
    "alt": "Cuatro maneras de llegar al portal, en ocho idiomas: gratuito, navegador, app iOS y Android y atención telefónica.",
    "pie": "Las cuatro vías de entrada al portal, con la atención telefónica al mismo nivel que la aplicación."
   }
  ],
  "portada": "assets/pnc/portada-mockup.webp",
  "portadaAlt": "Un portátil muestra la página de inicio del Portal Notarial del Ciudadano, con fondo azul y capturas del portal."
 },
 {
  "slug": "cupra-born",
  "titulo": "CUPRA Born",
  "video": {
   "src": "assets/cupra-born/presentacion.mp4",
   "poster": "assets/cupra-born/presentacion-poster.webp",
   "titulo": "New CUPRA Born World Premiere",
   "autor": "CUPRA Official",
   "nota": "Presentación oficial del coche, publicada por CUPRA. No es material del proyecto: la interfaz del vehículo está bajo acuerdo de confidencialidad."
  },
  "claim": "Diseñar el orden en que se mira",
  "resumen": "Cuadro de instrumentos, infotainment y head-up display del primer CUPRA 100 % eléctrico: una interfaz que tiene que informar sin robarle la vista a la carretera.",
  "tipo": "Proyecto profesional · Automoción",
  "metodologia": "Agile",
  "duracion": "8 meses",
  "rol": "UX/UI (HMI)",
  "equipo": "UX/UI (HMI), junto a ingeniería de software",
  "herramientas": [
   "Pack Adobe",
   "Sketch"
  ],
  "reto": [
   "El Born fue el primer CUPRA 100 % eléctrico, y un eléctrico no cuenta lo mismo que un térmico. Desaparecen las revoluciones y el depósito, y aparecen la autonomía real, la carga, la regeneración y la pregunta de siempre: ¿llego? Todo eso tenía que caber en un cuadro que se mira de reojo.",
   "En EDAG me tocó diseñar esa interfaz para SEAT CUPRA: el cuadro de instrumentos, el infotainment central y el head-up display. Tres pantallas que el conductor percibe como una sola cosa y que además tienen que sonar a la marca sin volverse decorativas.",
   "La restricción que no existe en una app es la velocidad. A 120 km/h, dos segundos mirando una pantalla son casi setenta metros a ciegas. Aquí el diseño no compite por la atención: la administra."
  ],
  "investigacion": [
   "Antes que las pantallas, las reglas. En automoción hay un límite que manda por encima del gusto: una consulta debe resolverse en una mirada corta y no puede obligar a encadenar varias. Ese límite decide cuánta información cabe, de qué tamaño y en qué orden aparece.",
   "Con eso mapeé los momentos de uso (arrancar, circular, navegar y cargar) y en cada uno separé lo que tiene que estar siempre delante de lo que puede vivir un nivel más abajo. Ese reparto es el que decide qué va al head-up display, qué al cuadro y qué al infotainment.",
   "También había que entender el terreno heredado. El sistema es una base compartida dentro del grupo que cada marca particulariza, así que buena parte del trabajo fue distinguir qué era estructura común e intocable y dónde estaba el margen real para que aquello se comportara como un CUPRA."
  ],
  "solucion": [
   "Tres pantallas, tres encargos distintos. El head-up display se quedó solo con lo que no admite desviar la mirada: velocidad, límite y siguiente maniobra. El cuadro asumió el estado del coche (velocidad, energía, autonomía, modo de conducción, asistencias). Y el infotainment central recogió lo que se consulta con calma: planificar la carga, buscar destino, ajustes.",
   "La interfaz de las tres pantallas la diseñé con el Pack Adobe y Sketch. Lo difícil no era que cada una quedara bien por separado, sino que el cuadro, el infotainment y el head-up display se leyeran como una sola familia: el mismo lenguaje de iconos, de color y de tipografía, y el carácter de CUPRA sin caer en lo decorativo.",
   "En lo visual, primero el tamaño y el contraste, y el adorno después. Pocos tamaños de letra, legibles a un brazo de distancia, y la jerarquía marcada con el grosor y la posición. El color se reserva para el estado (crítico, aviso, neutro) y nunca va solo: siempre lo acompaña una forma, un icono o un sitio fijo en pantalla.",
   "Todo quedó documentado como sistema HMI: componentes, estados, rejilla, escala y reglas de uso, para que ingeniería de software implementara sin tener que reinterpretar y para que la pantalla siguiente no empezara desde cero."
  ],
  "resultados": [
   "El entregable no fue una maqueta bonita sino una especificación que otros pudieran ejecutar: flujos, pantallas, estados y las reglas que los gobiernan, revisados con ingeniería de software y con ergonomía hasta que dejaron de tener huecos.",
   "Lo que me llevé de estos meses es una manera de trabajar que sigo usando fuera del coche: definir primero el presupuesto de atención que tiene la persona y diseñar dentro de él, en vez de diseñar la pantalla y comprobar después si se puede mirar.",
   "Es un proyecto bajo acuerdo de confidencialidad, así que aquí cuento el enfoque y el método, no las pantallas finales. Las cuatro láminas son esquemas propios hechos para explicarlo."
  ],
  "destacados": [
   {
    "n": "3",
    "l": "capas: HUD, cuadro e infotainment"
   },
   {
    "n": "8",
    "l": "meses en el programa"
   },
   {
    "n": "2 s",
    "l": "el presupuesto de cada mirada"
   }
  ],
  "fecha": "2021-09-30",
  "confidencial": true,
  "tags": [
   "automoción",
   "HMI",
   "infotainment",
   "cuadro de instrumentos",
   "head-up display",
   "sistema de diseño"
  ],
  "galeria": [
   {
    "src": "assets/cupra-born/01-presupuesto-de-mirada.svg",
    "w": 1200,
    "h": 750,
    "alt": "Esquema del presupuesto de mirada: el límite es de 2 s (67 m a 120 km/h). Una mirada se lee al instante; una consulta encadenada se hace parado o por voz.",
    "pie": "El presupuesto de mirada: lo que cabe en una consulta al volante y lo que hay que mover a voz o a coche parado."
   },
   {
    "src": "assets/cupra-born/02-momentos-y-capas.svg",
    "w": 1200,
    "h": 750,
    "alt": "Cuatro momentos de conducción frente a las tres capas (head-up display, cuadro e infotainment), con la principal, la de apoyo y la excluida.",
    "pie": "Los momentos de conducción frente a las tres capas de interfaz. El reparto se decide por momento, no por pantalla."
   },
   {
    "src": "assets/cupra-born/03-wireframe-cuadro.svg",
    "w": 1200,
    "h": 750,
    "alt": "Wireframe del cuadro con cuatro zonas: 1 velocidad, 2 energía, 3 autonomía y ruta, 4 modo de conducción con el color de marca.",
    "pie": "Wireframe del cuadro con las decisiones de jerarquía anotadas: tamaño para lo que más se consulta, color solo para el estado."
   },
   {
    "src": "assets/cupra-born/04-sistema-hmi.svg",
    "w": 1200,
    "h": 750,
    "alt": "Piezas del sistema HMI: escala de tres niveles, color por estado (crítico, aviso, neutro) y cuatro estados de componente.",
    "pie": "Las piezas del sistema HMI que se entregaron a ingeniería: escala, color por estado y estados de componente."
   }
  ],
  "portada": "assets/cupra-born/portada-mockup.webp",
  "portadaAlt": "Interior de un CUPRA Born de noche: volante, cuadro digital y pantalla central de infotainment."
 },
 {
  "slug": "besmie",
  "id": 128425799,
  "titulo": "Besmie",
  "claim": "A community of trusted, real and verified people",
  "resumen": "App para encontrar con quién compartir piso a partir de la afinidad real entre personas, no solo del precio del alquiler.",
  "tipo": "Proyecto final de máster",
  "metodologia": "Design Thinking y UX Research",
  "rol": "UX/UI",
  "equipo": "Proyecto final de máster (Digital Minds, Barreira arte+diseño)",
  "herramientas": [
   "Figma"
  ],
  "reto": [
   "Buscar piso compartido se resuelve casi siempre por precio y ubicación. Lo que hace que una convivencia funcione (los horarios, la limpieza, si se fuma, si entran visitas, si hay mascotas) aparece cuando ya has firmado.",
   "El reto era diseñar un producto que pusiera esa afinidad por delante del anuncio: encontrar antes a la persona y después la habitación."
  ],
  "investigacion": [
   "Trabajé el caso con el doble diamante: entrevistas, mapa de empatía y user journey de personas que habían buscado piso compartido en el último año.",
   "Dos hallazgos marcaron el producto. El primero, que la desconfianza es la mayor fricción: nadie sabe quién hay al otro lado del anuncio. El segundo, que la gente ya intenta filtrar por afinidad, pero lo hace a mano, leyendo descripciones libres."
  ],
  "solucion": [
   "Besmie es una comunidad de perfiles verificados. La verificación es progresiva y visible: cada nivel (teléfono, identidad, referencias) desbloquea confianza y se muestra en el propio perfil, así que la persona sabe con quién habla antes de escribir.",
   "Sobre esa base, el emparejamiento se hace por puntos en común: etiquetas de convivencia (Foodie, Party lover, Armchair & books, LGBTQI+ friendly, Messy, Calm) que se declaran una vez y luego ordenan la lista de Explore. El resultado no es un tablón de anuncios sino un amigo que sabe por dónde empezar a buscar.",
   "La identidad visual acompaña: paleta violeta y menta, tipografía Spartan y un tono desenfadado, porque el momento de buscar piso ya es bastante tenso."
  ],
  "resultados": [
   "El proyecto se entregó como trabajo final del Máster Digital Minds en Design Thinking y UX/UI, con las pantallas del recorrido completo: el alta, la verificación por niveles, la exploración con filtros de afinidad, el chat y el perfil.",
   "La guía de estilo quedó documentada como sistema: colores primarios, secundarios, de acento, contextuales y de marca, más una escala tipográfica de cinco niveles."
  ],
  "destacados": [
   {
    "n": "3",
    "l": "niveles de verificación"
   },
   {
    "n": "5",
    "l": "niveles tipográficos en la guía"
   },
   {
    "n": "6",
    "l": "etiquetas de convivencia"
   }
  ],
  "fecha": "2021-09-30",
  "stats": {
   "vistas": 141,
   "aplausos": 7
  },
  "behance": "https://www.behance.net/gallery/128425799/Besmie_Final-Project-Master-Degree",
  "tags": [
   "app design",
   "Design Thinking",
   "Figma",
   "product",
   "UI",
   "user experience"
  ],
  "galeria": [
   {
    "src": "assets/besmie/01-problema.webp",
    "w": 1683,
    "h": 616,
    "alt": "Lámina «The problem», en inglés: los precios altos hacen que más adultos compartan piso; el 39 % de los pisos compartidos son de personas de 25 a 39 años.",
    "pie": "El punto de partida: compartir piso ya no es solo cosa de estudiantes. El 39 % de los pisos compartidos los ocupan personas de 25 a 39 años, muchas veces porque el alquiler en solitario no sale a cuenta."
   },
   {
    "src": "assets/besmie/02-objetivo.webp",
    "w": 1683,
    "h": 1007,
    "alt": "Lámina «The objective», en inglés: atacar el problema de la convivencia, con tres objetivos y la pantalla de búsqueda de la app.",
    "pie": "El objetivo no era abaratar el piso, sino atacar el otro lado del problema: la convivencia. De ahí salieron los tres objetivos que ordenan el producto."
   },
   {
    "src": "assets/besmie/03-personas.webp",
    "w": 1683,
    "h": 645,
    "alt": "Seis protopersonas con foto, nombre y ocupación; Laura pasó a ser la persona de referencia tras las entrevistas.",
    "pie": "Seis protopersonas a partir de las entrevistas; Laura se convirtió en la persona de referencia del producto tras el mapa de empatía."
   },
   {
    "src": "assets/besmie/04-validacion.webp",
    "w": 1683,
    "h": 883,
    "alt": "Resultado de las entrevistas, en inglés: el 90 % prefiere compartir con buena gente aunque el piso no sea bueno; el 8 %, lo contrario; el 2 %, no sabe.",
    "pie": "Validación del problema: el 90 % prefiere compartir piso con buena gente aunque la vivienda no sea perfecta, antes que al revés."
   },
   {
    "src": "assets/besmie/05-pantallas.webp",
    "w": 1683,
    "h": 1169,
    "alt": "Tres wireframes de móvil: el listado «Explore» de perfiles, los filtros de convivencia y una conversación de chat.",
    "pie": "Las tres pantallas que sostienen el producto: el listado ordenado por nivel de verificación y puntos en común, los filtros de convivencia y el chat."
   },
   {
    "src": "assets/besmie/06-lookfeel.webp",
    "w": 1683,
    "h": 892,
    "alt": "Moodboard de la línea gráfica: apps de colores planos, pegatinas con caritas sonrientes, «Home sweet home» y «Welcome! Now you are a BESMIE pal».",
    "pie": "El moodboard que fija el tono: desenfadado y de colores planos, porque buscar piso ya es un momento bastante tenso de por sí."
   },
   {
    "src": "assets/besmie/07-guia.webp",
    "w": 1683,
    "h": 1140,
    "alt": "Guía de estilo: paletas de morados, beiges, grises, rosa, verde y amarillo, y la tipografía Spartan en cuatro niveles.",
    "pie": "La guía de estilo documentada como sistema: colores primarios, secundarios, de acento, de marca y contextuales, más la escala tipográfica en Spartan."
   },
   {
    "src": "assets/besmie/08-besmie.webp",
    "w": 1683,
    "h": 1646,
    "alt": "Pantallas finales en Android: verificación de la cuenta, listado «Explore» con perfiles y el lema «A community of trusted, real and verified people».",
    "pie": "El producto acabado: la verificación por niveles y el listado de Explore con las etiquetas de convivencia y los puntos en común de cada persona."
   }
  ],
  "portada": "assets/besmie/portada-mockup.webp",
  "portadaAlt": "Dos móviles sobre fondo lila con la pantalla de inicio de Besmie y el listado «Explore» de perfiles."
 },
 {
  "slug": "de-barrio",
  "id": 124509419,
  "titulo": "De Barrio",
  "claim": "A better way to shop in the neighborhood markets",
  "resumen": "Marketplace para el comercio de barrio: recuperar el mercado de proximidad con la comodidad de comprar desde el móvil.",
  "tipo": "Case study en equipo",
  "metodologia": "UX Research y diseño de producto",
  "rol": "UI Research and Design · Dirección de arte y supervisión",
  "equipo": "UI Team 08E, con Giovanni Turco (UI Research and Design, Project manager)",
  "herramientas": [
   "Figma",
   "Photoshop",
   "Notion"
  ],
  "reto": [
   "La vida urbana, los centros comerciales y la comida industrial han ido alejando a las nuevas generaciones del comercio local, hasta poner en riesgo su viabilidad. De ahí nace De Barrio."
  ],
  "investigacion": [
   "El equipo de UX pasó el testigo al de UI con la investigación hecha. A partir de ahí nos organizamos para traducir los hallazgos a producto: arquitectura de la información, flujos de compra y sistema visual."
  ],
  "solucion": [
   "Una app iOS que ordena la compra por mercados y comercios cercanos, con lista de la compra recurrente, productos habituales y fichas de producto que dicen de dónde viene cada cosa.",
   "El diseño es deliberadamente humano y ético: fotografía real de producto, lenguaje cercano y ninguna presión comercial. Nada de cuentas atrás ni de descuentos falsos."
  ],
  "resultados": [
   "El caso se entregó con prototipos navegables en Figma y con un sistema de componentes reutilizable para el resto de pantallas. El recorrido principal de compra se puede probar en esta misma ficha."
  ],
  "prototipo": {
   "url": "https://www.figma.com/proto/ekmEf4QH5kVL450zJvcis9/08E-DeBarrio-Giovanni-Marc?node-id=1649-34185&p=f&scaling=scale-down&content-scaling=fixed&page-id=1595%3A3&starting-point-node-id=2210%3A37571",
   "titulo": "Prototipo navegable de De Barrio",
   "nota": "El recorrido completo de la compra, tal y como se entregó: entrada, búsqueda por mercados, ficha de comercio, ficha de producto y cesta. Se navega aquí mismo, pulsando las zonas activas de cada pantalla."
  },
  "destacados": [
   {
    "n": "Figma",
    "l": "prototipo navegable en la propia ficha"
   },
   {
    "n": "iOS",
    "l": "plataforma de destino"
   },
   {
    "n": "2",
    "l": "equipos encadenados (UX → UI)"
   }
  ],
  "fecha": "2021-08-04",
  "stats": {
   "vistas": 92,
   "aplausos": 8
  },
  "behance": "https://www.behance.net/gallery/124509419/De-Barrio-Trusted-Shops-around-you",
  "tags": [
   "Case study",
   "E-commerce",
   "Figma",
   "Interface",
   "iOS",
   "mobile"
  ],
  "galeria": [
   {
    "src": "assets/de-barrio/01-portada.webp",
    "alt": "Portada del caso De Barrio: a la izquierda, la fachada blanca de una tienda de barrio con la puerta abierta; a la derecha, el logotipo con un toldo a rayas, el nombre «De Barrio», el lema «Trusted Shops around you» y la etiqueta «UI Project».",
    "bloque": "reto",
    "w": 1600,
    "h": 766,
    "pie": ""
   },
   {
    "src": "assets/de-barrio/02-mercados.webp",
    "alt": "Presentación de De Barrio, con los textos en inglés: la idea de una mejor forma de comprar en los mercados de barrio, móviles con la bienvenida y los listados de comercios y productos, el equipo de UI con sus roles, el software usado y el enfoque de diseño humano y ético.",
    "bloque": "reto",
    "w": 1600,
    "h": 2454,
    "unir": true,
    "pie": ""
   },
   {
    "src": "assets/de-barrio/03-principios.webp",
    "alt": "Los tres principios de diseño de la app, cada uno con su icono y una frase en inglés: «Supportive», «Efficient» y «Friendly». Debajo, dos fotos: un tendero en su comercio y un mercado callejero con gente comprando.",
    "bloque": "investigacion",
    "w": 1600,
    "h": 1485,
    "pie": ""
   },
   {
    "src": "assets/de-barrio/04-design-system.webp",
    "alt": "Sistema de diseño de la app, en inglés: se creó con la metodología Atomic Design sobre una cuadrícula de 8 px, con márgenes de 16 px, 4 columnas y filas de 8 px, mezclando las directrices de Apple y de Material Design. Acompaña una ilustración a línea.",
    "bloque": "investigacion",
    "w": 1600,
    "h": 428,
    "unir": true,
    "pie": ""
   },
   {
    "src": "assets/de-barrio/05-prototipo.webp",
    "alt": "Tablero del prototipo, en inglés: una cuadrícula inclinada de pantallas de la app (comercios destacados y productos de temporada) junto al texto «A design that accompanies the user», y la invitación a probar el prototipo animado en Figma con su primer flujo de tareas, «Search quickly».",
    "bloque": "solucion",
    "w": 1600,
    "h": 1288,
    "pie": ""
   },
   {
    "src": "assets/de-barrio/06-flow-2.webp",
    "alt": "Segundo flujo del prototipo, «Add to cart», en inglés: buscar unos plátanos ecológicos de Canarias por categorías o con el buscador, añadirlos al carrito y quitarlos de él.",
    "w": 1600,
    "h": 288,
    "unir": true,
    "bloque": "solucion",
    "pie": ""
   },
   {
    "src": "assets/de-barrio/07-flow-3.webp",
    "alt": "Tercer flujo del prototipo, rotulado también «Add to cart», en inglés: buscar el comercio Frutas Omar, encontrar los plátanos ecológicos de Canarias, añadirlos a la lista «Vegetarian», pasar todos sus productos al carrito y revisarlo.",
    "w": 1600,
    "h": 425,
    "bloque": "resultados",
    "pie": ""
   }
  ],
  "portada": "assets/de-barrio/portada-mockup.webp",
  "portadaAlt": "Una mano sostiene un móvil con la app De Barrio: comercios destacados y productos de temporada."
 },
 {
  "slug": "galactic-records",
  "id": 119899631,
  "titulo": "Galactic Records",
  "claim": "GRecords New Talents ’20 Awards",
  "resumen": "Identidad y app para el concurso y festival anual de talentos musicales emergentes de la productora Galactic Records.",
  "tipo": "Design Sprint en pareja",
  "metodologia": "Design Sprint",
  "duracion": "5 días",
  "rol": "Product management, dirección de arte y UX/UI",
  "equipo": "Con Giovanni Turco (UX/UI)",
  "herramientas": [
   "Illustrator",
   "Photoshop",
   "Figma"
  ],
  "reto": [
   "La productora musical Galactic Records volvía a lanzar su concurso y festival anual de talentos emergentes. Tras unas primeras votaciones se elegirían los 20 artistas que actuarían en directo en el festival, donde un jurado profesional escogería al ganador: la producción y promoción de tres videoclips.",
   "El encargo tenía dos partes: diseñar el nuevo logo y definir los estilos tipográficos y la paleta de color de la app, y hacer una propuesta de diseño de la app del concurso y del festival, teniendo en cuenta que Galactic Records quería renovar su imagen para ampliar target y número de seguidores."
  ],
  "investigacion": [
   "Definimos el reto con Sprint Questions, reconvertimos las más destacadas en How Might We y las clasificamos en tres categorías: usuario, artista y promoción. Con las HMW más relevantes montamos un user journey para localizar puntos de mejora.",
   "Perfilamos tres targets reales: Nacho (25, camarero, música independiente y deporte), Carlos (26, developer y batería que quiere subirse a un escenario) y María (31, RRHH, melómana que quiere apoyar a artistas emergentes sin salir de casa)."
  ],
  "solucion": [
   "Para afianzar a los seguidores ya aficionados al evento y acercarlo a un target más joven, la propuesta añade un servicio de mailing list y da la posibilidad de asignar tres votos, junto con la de ganar dos entradas por cada voto asignado.",
   "La identidad se rehizo entera: logo, tipografía de titulares con carácter de cartel de concierto y una paleta violeta que funciona igual en la app y en el material del festival."
  ],
  "resultados": [
   "Cinco días de sprint, de la definición al prototipo testeado con tres usuarios, con la marca y la app entregadas a la vez."
  ],
  "destacados": [
   {
    "n": "5",
    "l": "días de Design Sprint"
   },
   {
    "n": "20",
    "l": "artistas finalistas del concurso"
   },
   {
    "n": "3",
    "l": "targets investigados"
   }
  ],
  "fecha": "2021-08-10",
  "stats": {
   "vistas": 86,
   "aplausos": 6
  },
  "behance": "https://www.behance.net/gallery/119899631/GALACTIC-REDCORDS-Metodologia-Design-Sprint",
  "tags": [
   "Design Sprint",
   "Figma",
   "graphic design",
   "mobile",
   "UI",
   "UI design"
  ],
  "galeria": [
   {
    "src": "assets/galactic-records/01-portada.webp",
    "alt": "Portada del caso Galactic Records: el logotipo (un casco de astronauta en píxeles con «I ♥ MUSIC») y el texto «Metodología Design Sprint.» sobre un mosaico oscuro de pantallas de la app en tonos violeta, con la firma «Case Study, Marc Amorós».",
    "bloque": "reto",
    "w": 1600,
    "h": 896,
    "pie": ""
   },
   {
    "src": "assets/galactic-records/02-briefing.webp",
    "alt": "Ficha del proyecto (Galactic Records, Design Sprint, 5 días; Illustrator, Photoshop y Figma), briefing del concurso «GRecords New Talents '20 Awards», tres perfiles objetivo (Nacho, Carlos y Maria) y la solución: votación con lista de correo, estética vaporwave de los 90 y una página para cada artista.",
    "bloque": "reto",
    "w": 1600,
    "h": 2393,
    "pie": ""
   },
   {
    "src": "assets/galactic-records/03-metodologia.webp",
    "alt": "Las cinco fases de la metodología Design Sprint —Definir, Idear, Decidir, Prototipar y Testear—, cada una con su explicación e ilustración, y debajo el mapa de la arquitectura de la información: Home, menú hamburguesa y las secciones Festival, Artistas, Evento y Noticias con sus apartados.",
    "bloque": "investigacion",
    "w": 1600,
    "h": 4456,
    "pie": ""
   },
   {
    "src": "assets/galactic-records/06-sprint-guia-prototipo.webp",
    "alt": "Material del sprint: pizarras de Sprint Questions y HMW, tres User Journeys (Nacho, Carlos y Maria), la guía de estilo (paleta violeta y grises, colores semánticos, nuevo logotipo y tipografías 8 Bit Operator JVE y Roboto) y las pantallas de la app: splash, registro y onboarding de votante y de artista.",
    "bloque": "solucion",
    "w": 1600,
    "h": 6336,
    "pie": ""
   },
   {
    "src": "assets/galactic-records/04-persona-carlos.webp",
    "alt": "Escenario de Carlos, junto a su foto: guitarrista de un grupo que quiere participar en el concurso de Galactic Records y encargado de registrarlo, para lo que tiene que rellenar la ficha de artista y consultar las condiciones.",
    "bloque": "investigacion",
    "w": 1600,
    "h": 337,
    "pie": ""
   },
   {
    "src": "assets/galactic-records/05-persona-maria.webp",
    "alt": "Escenario de Maria, junto a su foto: su amiga Toña, vocalista del grupo Peaches, se presenta al concurso; Maria ya ha votado el vídeo y quiere apoyar a la banda comprando merchandising.",
    "bloque": "investigacion",
    "unir": true,
    "w": 1600,
    "h": 337,
    "pie": ""
   }
  ],
  "clips": [
   {
    "tras": "assets/galactic-records/06-sprint-guia-prototipo.webp",
    "tipo": "figma",
    "url": "https://www.figma.com/proto/nlGT6TmSssklZuQIm1lzLA/galactic-records?node-id=1442-106&p=f&viewport=-6763%2C-6177%2C0.37&t=fiHAQm1dpnJ3Ep7v-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1442%3A106&show-proto-sidebar=1&page-id=1012%3A45",
    "titulo": "Prototipo navegable de Galactic Records"
   }
  ],
  "portada": "assets/galactic-records/portada-mockup.webp",
  "portadaAlt": "Logotipo de Galactic Records, con un casco de astronauta de píxeles, y el texto «Metodología Design Sprint»."
 },
 {
  "slug": "daily-ui",
  "id": 113280363,
  "titulo": "Daily UI",
  "claim": "Tres retos de interfaz, tres marcas",
  "resumen": "Serie de retos Daily UI resueltos en febrero de 2021: registro de SEAT Competición, pasarela de pago de Air Jordan y home de Mercedes-Benz Clase G.",
  "tipo": "Serie de retos de UI",
  "metodologia": "Daily UI Challenge",
  "rol": "Diseño visual y UI",
  "equipo": "Individual",
  "herramientas": [
   "Figma",
   "Photoshop",
   "Illustrator"
  ],
  "reto": [
   "Daily UI es un reto clásico: cada entrega es una pantalla concreta que hay que resolver dentro del lenguaje de una marca real, con las restricciones que eso impone."
  ],
  "investigacion": [
   "Elegí tres marcas con lenguajes visuales muy distintos para forzar registros diferentes: la deportividad de SEAT Competición, la cultura sneaker de Air Jordan y el todoterreno de la Clase G."
  ],
  "solucion": [
   "Daily UI 001: página de registro y modal para SEAT Competición / CUPRA.",
   "Daily UI 002: formulario y plataforma de pago para Air Jordan.",
   "Daily UI 003: home web del Mercedes-Benz Clase G, con el registro 4x4 y off-road."
  ],
  "resultados": [
   "Tres ejercicios cortos que sirvieron para practicar sistemas visuales ajenos sin la red del proyecto largo."
  ],
  "destacados": [
   {
    "n": "3",
    "l": "retos entregados"
   },
   {
    "n": "3",
    "l": "marcas distintas"
   },
   {
    "n": "feb 2021",
    "l": "un mes de entregas cortas"
   }
  ],
  "fecha": "2021-02-10",
  "stats": {
   "vistas": 58,
   "aplausos": 7
  },
  "behance": "https://www.behance.net/gallery/113280363/Daily-UI-003",
  "tags": [
   "4x4",
   "Daily UI",
   "Diseño web",
   "home",
   "Mercedes-Benz Clase G",
   "Off-road"
  ],
  "galeria": [
   {
    "src": "assets/daily-ui/01-seat-competicion.webp",
    "alt": "Reto Daily UI 001 (registro): tres móviles sobre fondo de fibra de carbono con la página del nuevo CUPRA León Competición, el formulario para apuntarse a probarlo (nombre, apellidos, correo y teléfono) y la pantalla de confirmación «¡Enhorabuena!».",
    "bloque": "solucion",
    "w": 1600,
    "h": 1213,
    "pie": ""
   },
   {
    "src": "assets/daily-ui/02-air-jordan.webp",
    "alt": "Reto Daily UI 002 (pago con tarjeta): pantallas de móvil de una tienda de zapatillas Air Jordan con la ficha del producto y las tallas, la elección del método de pago (PayPal, tarjeta de crédito o Visa) y los formularios con los datos del cliente y de la tarjeta.",
    "bloque": "solucion",
    "w": 1600,
    "h": 1329,
    "pie": ""
   },
   {
    "src": "assets/daily-ui/03-mercedes-clase-g.webp",
    "alt": "Reto Daily UI 003 (página de destino): la home de Mercedes-Benz en un portátil, con un G 550 4x4² verde sobre terreno de montaña, el título «características OFFROAD» y el botón «Ver en acción».",
    "bloque": "solucion",
    "w": 1600,
    "h": 1310,
    "pie": ""
   }
  ],
  "portada": "assets/daily-ui/portada-mockup.webp",
  "portadaAlt": "Un portátil con la web de Mercedes-Benz y un G 550 4x4² verde en la montaña, bajo el rótulo «Daily UI 003»."
 },
 {
  "slug": "escudia",
  "id": 110683043,
  "titulo": "Escudia · Protección Civil",
  "claim": "Pedir ayuda sin tener que hablar",
  "resumen": "Tótem y app de Protección Civil para que una persona sorda pueda denunciar un robo, pedir una ambulancia o bloquear su tarjeta sin depender de un intérprete.",
  "tipo": "Case study individual",
  "metodologia": "Design Thinking",
  "rol": "UX/UI completo",
  "equipo": "Individual",
  "herramientas": [
   "Figma",
   "Illustrator",
   "Photoshop"
  ],
  "reto": [
   "Una persona no oyente que sufre un robo en la calle se encuentra con un problema anterior al robo: no puede explicar lo que ha pasado. Su vía de comunicación son los móviles (a través de apps) o un intérprete, y ninguna de las dos está disponible en el momento de la urgencia.",
   "Desde la psicolingüística, además, las personas no oyentes tienen serias dificultades para encontrar significado en los textos: no basta con poner un formulario escrito. Como me dijo una de las personas entrevistadas, se sienten en una red invisible de la que no pueden escapar; esa red se llama comunicación."
  ],
  "investigacion": [
   "El caso se trabajó con Design Thinking, en sus cinco fases: empatizar, definir, idear, prototipar y testear, documentado paso a paso en dos artículos publicados en Medium.",
   "Construí persona, mapa de empatía, escenario y user journey a partir de Beatriz, 17 años, no oyente con un grado severo, que se comunica con lengua de signos y con apps en el móvil. Sus frustraciones marcaron el diseño: incluso con audífonos, no oye las señales acústicas que avisan de la próxima parada y oye los gritos, pero no entiende a quien le habla.",
   "El objetivo quedó fijado ahí: dar auxilio y facilitar la comunicación de las personas no oyentes para que tengan el mismo grado de autonomía que el resto de la sociedad."
  ],
  "solucion": [
   "Escudia es una aplicación para personas con discapacidad oral, visual y auditiva que permite tres cosas concretas: presentar una denuncia ante los Mossos d'Esquadra en caso de robo, pedir una ambulancia al SEM en caso de emergencia médica y bloquear una tarjeta de crédito o débito sin tener que ir o llamar a la entidad bancaria.",
   "Los tótems de Protección Civil se colocarían en todas las paradas de autobús, en el metro y en las comisarías de los Mossos d'Esquadra de Barcelona, de forma que la ayuda esté donde ocurre el problema.",
   "La interfaz se apoya en pictogramas y en un lenguaje visual antes que en el texto, precisamente por la barrera de comprensión lectora que la investigación había detectado."
  ],
  "resultados": [
   "Es el proyecto con más recorrido de mi portafolio en Behance y el que documenté con más detalle: dos artículos en Medium recogen el proceso completo, de la investigación al testing."
  ],
  "destacados": [
   {
    "n": "3",
    "l": "gestiones críticas sin hablar"
   },
   {
    "n": "2",
    "l": "artículos con el proceso completo"
   },
   {
    "n": "5",
    "l": "fases de Design Thinking"
   }
  ],
  "fecha": "2021-01-07",
  "stats": {
   "vistas": 152,
   "aplausos": 16
  },
  "behance": "https://www.behance.net/gallery/110683043/ESCUDIA-PROTECCION-CIVIL-(case-study-)",
  "tags": [
   "Case study",
   "design",
   "Design Thinking",
   "graphic design",
   "personas no oyentes",
   "portafolio"
  ],
  "galeria": [
   {
    "src": "assets/escudia/01-pregunta.webp",
    "alt": "Tablero de apertura de Escudia: la pregunta del reto («¿Cómo podemos facilitar la comunicación a las personas con discapacidad auditiva en caso de robo?»), la pantalla del tótem para elegir perfil (visual, oral o auditiva) y los datos del proyecto: diez días laborales, proyecto individual.",
    "bloque": "reto",
    "w": 1600,
    "h": 2439,
    "pie": ""
   },
   {
    "unir": true,
    "src": "assets/escudia/02-que-es.webp",
    "alt": "Qué es Escudia Protección Civil: un tótem y una app para personas con discapacidad auditiva, visual u oral que permiten denunciar un robo a los Mossos d'Esquadra, pedir una ambulancia al SEM y bloquear tarjetas; con la imagen del tótem, el objetivo y las preguntas de las que nace el proyecto.",
    "bloque": "reto",
    "w": 1600,
    "h": 2964,
    "pie": ""
   },
   {
    "src": "assets/escudia/03-metodologia.webp",
    "alt": "Las cinco fases del Design Thinking (Empatizar, Definir, Idear, Prototipar y Testear) y, debajo, el trabajo de empatía con dos usuarios, Beatriz (17 años) y Pablo (35 años): persona, mapa de empatía, escenario y user journey de cada uno.",
    "bloque": "investigacion",
    "w": 1600,
    "h": 3416,
    "pie": ""
   },
   {
    "unir": true,
    "src": "assets/escudia/04-flujo-arquitectura.webp",
    "alt": "Diagrama de flujo de un usuario no oyente al que le han robado la cartera y el móvil, con tres recorridos (pedir una ambulancia, denunciar el robo y bloquear la tarjeta), y debajo la arquitectura de la información: perfil de discapacidad, acceso con chip o código y las tres acciones con sus pasos.",
    "bloque": "investigacion",
    "w": 1600,
    "h": 4497,
    "pie": ""
   },
   {
    "src": "assets/escudia/05-wireframes-estilo.webp",
    "alt": "Wireframes en gris del tótem (elegir perfil, introducir un código, elegir entre chip o código y marcar qué te han robado, con un hueco para el intérprete) y guía de estilo: paleta sacada de la identidad de los Mossos d'Esquadra, logotipo, iconografía, tipografía Open Sans y botones.",
    "bloque": "solucion",
    "w": 1600,
    "h": 3294,
    "pie": ""
   },
   {
    "unir": true,
    "src": "assets/escudia/06-vistas-finales.webp",
    "alt": "Vistas finales anotadas del tótem: selección de perfil con un vídeo de intérprete de lengua de signos, acceso con chip o código, formulario visual para describir al ladrón, qué te han robado y resumen de la denuncia con avatar del ladrón, datos personales y ubicación por GPS.",
    "bloque": "solucion",
    "w": 1600,
    "h": 4359,
    "pie": ""
   },
   {
    "src": "assets/escudia/07-test-usuarios.webp",
    "w": 1596,
    "h": 1424,
    "bloque": "resultados",
    "alt": "Tabla con el test de cinco participantes en cuatro tareas: casi todo «muy fácil» o «fácil», con sugerencias como acortar el formulario.",
    "pie": "Resultado de la prueba de usuario con comentarios."
   }
  ],
  "clips": [
   {
    "tras": "assets/escudia/01-pregunta.webp",
    "src": "assets/escudia/corto-sordo.mp4",
    "poster": "assets/escudia/corto-sordo.webp",
    "w": 1280,
    "h": 720,
    "titulo": "Cortometraje sobre una persona sorda que sufre un robo",
    "subtitulos": "assets/escudia/corto-sordo.es.vtt",
    "credito": { "texto": "«CORTO SORDO», de Santiago Marino" }
   },
   {
    "tras": "assets/escudia/06-vistas-finales.webp",
    "tipo": "figma",
    "url": "https://www.figma.com/proto/KoOR7LK7QIQ0SxboewXl9J/neoland-escudia?node-id=426-48&p=f&t=dK0cg3i01T4FgwKR-1&scaling=contain&content-scaling=fixed&starting-point-node-id=426%3A48&show-proto-sidebar=1&page-id=0%3A1",
    "titulo": "Prototipo navegable del tótem Escudia"
   }
  ],
  "portada": "assets/escudia/portada-mockup.webp",
  "portadaAlt": "Un tótem con pantalla táctil: «Pedro, ¿qué te ha pasado?» y los botones Denunciar robo, Pedir ambulancia y Bloquear tarjeta."
 },
 {
  "slug": "agrolocker",
  "id": 111430907,
  "titulo": "Agrolocker",
  "claim": "Del productor local a una taquilla refrigerada de tu barrio",
  "resumen": "Marketplace de km 0 con entrega en taquillas refrigeradas: distribución de última milla para el producto agroalimentario local.",
  "tipo": "Design Sprint en grupo",
  "metodologia": "Design Sprint",
  "duracion": "1 mes (4 semanas)",
  "rol": "UI y branding",
  "equipo": "Proyecto en grupo · 4 personas",
  "herramientas": [
   "Marvel",
   "InVision",
   "Illustrator",
   "Photoshop",
   "Figma"
  ],
  "reto": [
   "El briefing venía de Andalucía Agrotech Digital Innovation Hub: encontrar la mejor solución tecnológica para mitigar los problemas que la pandemia agravó en la cadena de suministro agroalimentaria.",
   "La propuesta tenía que sostenerse sobre cuatro pilares: seguridad e higiene, sostenibilidad, corresponsabilidad entre los actores y economía circular, empoderando por igual a productores y consumidores."
  ],
  "investigacion": [
   "Trabajamos el reto con Design Sprint durante cuatro semanas, en grupo de cuatro personas, con mi parte centrada en la identidad y la capa visual del producto."
  ],
  "solucion": [
   "Agrotech Lockers conecta a los productores locales con quien busca producto ecológico de calidad, promoviendo el comercio sostenible de km 0.",
   "Los productores ofrecen su producto en una misma plataforma marketplace, lo que facilita la venta directa al consumidor sin intermediarios.",
   "La entrega es la clave: todos los pedidos se dejan en taquillas refrigeradas que conservan el producto fresco hasta que el usuario lo recoge. Eso da flexibilidad al comprador y también al repartidor, que deja de depender de que haya alguien en casa."
  ],
  "resultados": [
   "La entrega incluye la identidad de marca completa y dos prototipos navegables en Figma con el recorrido de compra y de recogida en taquilla."
  ],
  "destacados": [
   {
    "n": "4",
    "l": "semanas de sprint"
   },
   {
    "n": "4",
    "l": "personas en el equipo"
   },
   {
    "n": "km 0",
    "l": "foco del marketplace"
   }
  ],
  "fecha": "2021-01-15",
  "stats": {
   "vistas": 154,
   "aplausos": 11
  },
  "behance": "https://www.behance.net/gallery/111430907/AGROLOCKER",
  "tags": [
   "app",
   "Design Sprint",
   "digital",
   "graphic design",
   "Marketplace",
   "mobile"
  ],
  "galeria": [
   {
    "src": "assets/agrolocker/01-portada-app.webp",
    "alt": "Portada de Agrolocker sobre hojas de albahaca: la etiqueta «Proyecto finalista», el lema «La solución DIGITAL y distribución de última MILLA» y tres móviles con la bienvenida, los productores recomendados de Sevilla y la ficha de una cesta de verduras de temporada.",
    "bloque": "solucion",
    "w": 1600,
    "h": 948,
    "pie": ""
   },
   {
    "src": "assets/agrolocker/02-proceso.webp",
    "alt": "Tablero del proceso de Agrolocker: datos del proyecto (Design Sprint, cuatro semanas, grupo de cuatro personas), reto y solución, diagramas de flujo de la compra, el inicio de sesión y la recogida en taquilla, wireframes, guía de estilo (Lato, verdes y magenta, iconos) y vistas finales.",
    "bloque": "investigacion",
    "w": 1600,
    "h": 13928,
    "pie": ""
   }
  ],
  "portada": "assets/agrolocker/portada-mockup.webp",
  "portadaAlt": "Un móvil con la bienvenida de Agrolocker junto a hojas de albahaca y el lema «La solución digital y distribución de última milla»."
 },
 {
  "slug": "bmw",
  "id": 111294767,
  "titulo": "BMW · Log in & Sign Up",
  "claim": "El acceso, resuelto hasta el último caso",
  "resumen": "Case study del flujo de acceso y registro de BMW en móvil, incluida la recuperación de contraseña por SMS y por correo.",
  "tipo": "Case study individual",
  "metodologia": "Diagrama de flujo, wireframes y UI",
  "duracion": "48 h (2 días)",
  "rol": "UX/UI completo",
  "equipo": "Individual",
  "herramientas": [
   "Figma",
   "Illustrator",
   "Photoshop"
  ],
  "reto": [
   "El acceso es la pantalla que más gente ve y la que menos cariño suele recibir. Aquí el ejercicio era el contrario: coger el log in y el sign up de una marca con un lenguaje visual muy definido y resolver el flujo completo, no solo la pantalla feliz."
  ],
  "investigacion": [
   "Empecé por el diagrama de flujo del usuario que quiere acceder a la página de BMW desde el móvil, con todas las bifurcaciones: si está registrado o no, si recuerda la contraseña o no, y si quiere recuperarla por móvil o por correo electrónico.",
   "Ese diagrama es el que fija cuántas pantallas hacen falta y evita descubrir un callejón sin salida a mitad del diseño visual."
  ],
  "solucion": [
   "Sobre el flujo monté los wireframes de las cinco pantallas del recorrido: inicio de sesión con usuario y contraseña, selección de cuenta para entrar con Google o Facebook, recuperación de contraseña con teléfono o correo, introducción del código de cuatro dígitos y alta de cuenta nueva.",
   "Después se vistieron con el lenguaje de BMW: gris, tipografía institucional y el logo como única imagen, con los textos legales de privacidad presentes desde el wireframe y no añadidos al final."
  ],
  "resultados": [
   "El prototipo navegable en Figma recorre el flujo entero, incluidos los caminos de error: ninguna bifurcación del diagrama se quedó sin pantalla."
  ],
  "destacados": [
   {
    "n": "5",
    "l": "pantallas del flujo"
   },
   {
    "n": "2",
    "l": "vías de recuperación de contraseña"
   },
   {
    "n": "0",
    "l": "bifurcaciones del flujo sin resolver"
   }
  ],
  "fecha": "2021-01-13",
  "stats": {
   "vistas": 128,
   "aplausos": 12
  },
  "behance": "https://www.behance.net/gallery/111294767/BMW-Log-in-Sign-Up-(case-study)",
  "tags": [
   "BMW",
   "coches",
   "design",
   "graphic design",
   "Log in",
   "mobile"
  ],
  "galeria": [
   {
    "src": "assets/bmw/01-reto.webp",
    "alt": "Portada y planteamiento de «Log in & Sign up» de BMW: datos del proyecto (48 horas, proyecto individual), el reto —un acceso y registro de estilo libre aprovechando el cambio de imagen de BMW, con su logotipo de 1997 y el de 2020— y el objetivo de reflejar la unión de la marca con la energía eléctrica.",
    "bloque": "reto",
    "w": 2000,
    "h": 3421,
    "pie": ""
   },
   {
    "src": "assets/bmw/02-investigacion.webp",
    "alt": "Diagrama de flujo del usuario que quiere entrar en la web de BMW desde el móvil: si está registrado inicia sesión y, si no recuerda la contraseña, puede recuperarla por mensaje al móvil o por correo electrónico y fijar una nueva antes de entrar; si no lo está, se registra.",
    "bloque": "investigacion",
    "w": 2000,
    "h": 3032,
    "pie": ""
   },
   {
    "src": "assets/bmw/03-wireframes.webp",
    "alt": "Wireframes en gris del acceso de BMW: inicio de sesión con usuario, contraseña y botones de Google y Facebook, elegir cuenta, recuperar la contraseña por móvil o correo, introducir un código de cuatro dígitos y el formulario de registro; al final, una foto de un BMW enchufado a un punto de carga.",
    "bloque": "solucion",
    "w": 2000,
    "h": 4117,
    "pie": ""
   },
   {
    "unir": true,
    "src": "assets/bmw/04-guia-estilo.webp",
    "alt": "Guía de estilo del acceso de BMW: paleta de azules, blancos y grises con un rojo de aviso, tipografía Helvetica en regular y negrita con sus tamaños (32, 24, 16 y 12), iconografía y las dos versiones del logotipo de BMW, en gris y en azul.",
    "bloque": "solucion",
    "w": 2000,
    "h": 1307,
    "pie": ""
   },
   {
    "unir": true,
    "src": "assets/bmw/05-vistas-finales.webp",
    "alt": "Vistas finales del acceso de BMW: un mapa general de todas las pantallas y, debajo, los móviles del flujo completo —inicio, inicio de sesión, recuperación de la contraseña, mensaje y correo de confirmación, nueva contraseña y aviso de cookies— junto a fotos de coches BMW.",
    "bloque": "solucion",
    "w": 2000,
    "h": 5902,
    "pie": ""
   }
  ],
  "clips": [
   {
    "tras": "assets/bmw/05-vistas-finales.webp",
    "tipo": "figma",
    "url": "https://www.figma.com/proto/to8QQckTWXJierBeJw825p/BMW?node-id=81-0&page-id=0%3A1&t=BtFfyujILSYskJo5-1",
    "titulo": "Prototipo navegable de BMW · Log in & Sign Up"
   }
  ],
  "portada": "assets/bmw/portada-mockup.webp",
  "portadaAlt": "Un móvil con el inicio de sesión de BMW en modo oscuro, con usuario, contraseña y acceso con Google y Facebook."
 },
 {
  "slug": "teatro-tips",
  "id": 105170739,
  "titulo": "Teatro TIPS",
  "claim": "Teatro interactivo, en directo y en streaming",
  "resumen": "Cómo ayudar a un sector tan físico como el de las artes escénicas en un entorno digital: una obra cuyo guion decide el público.",
  "tipo": "Reto de Neoland en equipo",
  "metodologia": "Design Thinking",
  "duracion": "10 días laborables (2 semanas)",
  "rol": "UX en equipo · dirección de arte en UI",
  "equipo": "Trabajo en equipo (Neoland, en remoto)",
  "herramientas": [
   "Marvel",
   "InVision",
   "Illustrator",
   "After Effects",
   "Photoshop",
   "Figma"
  ],
  "reto": [
   "¿Cómo podemos ayudar a un sector tan físico como el de las artes escénicas en un entorno digital?",
   "El reto llegó en plena pandemia, con los teatros cerrados o a aforo reducido y un sector que vive precisamente de lo que no se puede grabar: estar allí."
  ],
  "investigacion": [
   "Lo trabajamos en equipo con Design Thinking a lo largo de dos semanas, documentando cada fase en dos artículos publicados en Medium.",
   "La conclusión de la fase de investigación fue que el streaming, tal y como se estaba haciendo, solo empeoraba la versión presencial: era la misma obra, peor vista. Había que darle al formato digital algo que el presencial no tuviera."
  ],
  "solucion": [
   "TIPS Teatro es un teatro interactivo que permite a los usuarios, tanto presenciales como en streaming, interactuar con la obra desde una base como el guion: pueden tomar las riendas de la evolución de la obra y de los personajes mediante un sistema de votación y elección entre distintas alternativas.",
   "El resultado es que la función en directo y la retransmitida dejan de competir: quien está en la sala y quien está en casa votan lo mismo y la obra cambia para los dos a la vez."
  ],
  "resultados": [
   "El proceso completo, de la empatía al testing, está publicado en dos artículos que siguen siendo los más leídos de mi Medium."
  ],
  "destacados": [
   {
    "n": "10",
    "l": "días laborables"
   },
   {
    "n": "2",
    "l": "públicos, una misma función"
   },
   {
    "n": "2",
    "l": "artículos con el proceso"
   }
  ],
  "fecha": "2020-10-02",
  "stats": {
   "vistas": 73,
   "aplausos": 11
  },
  "behance": "https://www.behance.net/gallery/105170739/DESIGN-THINKING-Mejorar-la-experiencia-en-el-teatro",
  "tags": [
   "Design Thinking",
   "Neoland",
   "Prototyping",
   "teatro",
   "UI design",
   "UX design"
  ],
  "galeria": [
   {
    "src": "assets/teatro-tips/01-portada.webp",
    "alt": "Portada del caso Teatro TIPS: sobre un telón negro, el logotipo, la etiqueta «UX/UI Design» y el lema «Bienvenidos al teatro TIPS, disfrutad de la obra», con dos imágenes de la web: en directo, en las pantallas de las butacas de una sala, y en streaming, en un ordenador.",
    "w": 1600,
    "h": 1146,
    "pie": ""
   },
   {
    "src": "assets/teatro-tips/02-proceso.webp",
    "alt": "Tablero del proceso de Teatro TIPS, sobre fondo negro: datos del proyecto, briefing y solución, fases del Design Thinking, diagrama de flujo del espectador (en la sala o en streaming), arquitectura de la información, wireframes, moodboard, guía de estilo (violeta y amarillo; Yeseva One y Open Sans) y cómo funciona la votación.",
    "w": 1600,
    "h": 12169,
    "pie": ""
   },
   {
    "src": "assets/teatro-tips/03-vistas-app.webp",
    "alt": "Vistas de la aplicación en pantallas de tableta con fondo oscuro: la ficha de la obra «Tres sombreros de copa» y su reparto, el programa de estrenos, un artículo de la revista, el mapa de la sala con la vista de cámaras y la pantalla de votación con resultados en gráficos.",
    "w": 1600,
    "h": 3208,
    "pie": ""
   }
  ],
  "portada": "assets/teatro-tips/portada-mockup.webp",
  "portadaAlt": "Logotipo de TIPS Teatro con el mensaje de bienvenida y dos pantallas: «Ver en directo» y «Ver en streaming»."
 },
 {
  "slug": "awkward-good",
  "id": 105151443,
  "titulo": "Awkward?Good",
  "claim": "Rompe con los prejuicios",
  "resumen": "Plataforma multicultural nacida del movimiento Black Lives Matter: conocer perfiles de otras culturas a través del arte, la música y el activismo.",
  "tipo": "Design Sprint en equipo",
  "metodologia": "Design Sprint",
  "duracion": "5 días",
  "rol": "UX en equipo · dirección de arte en UI",
  "equipo": "Trabajo en equipo (Neoland)",
  "herramientas": [
   "Marvel",
   "Illustrator",
   "After Effects",
   "Photoshop",
   "Figma"
  ],
  "reto": [
   "¿Cómo contribuir con la tecnología a luchar contra la discriminación racial?",
   "Uno de los mayores retos de las sociedades actuales es la gestión de una realidad multicultural creciente. Seguimos considerando la diversidad cultural como algo extraño y ajeno a nosotros, y hace falta replantear las iniciativas que se están haciendo, porque menos racismo sigue siendo racismo."
  ],
  "investigacion": [
   "Cinco días de Design Sprint con la estructura de Jake Knapp: día 1 elegir una meta con Sprint Questions y HMW y crear un mapa; día 2 esbozar soluciones con crazy eights; día 3 elegir por votación silenciosa, supervoto y storyboard; día 4 prototipar; día 5 testear con cinco usuarios y mapa de calor."
  ],
  "solucion": [
   "Awkward?Good es una plataforma en constante crecimiento, nacida del movimiento Black Lives Matter. El objetivo es crear una comunidad donde se puedan conocer perfiles de diversas culturas, razas, religiones y orientaciones sexuales a través de intereses universales como el arte, la fotografía, el activismo, la música y la literatura.",
   "La dirección de arte se apoya en fotografía documental en blanco y negro con un amarillo señal como único color: el lenguaje del cartel de protesta llevado a la interfaz."
  ],
  "resultados": [
   "El prototipo se testeó con cinco usuarios el quinto día del sprint, con mapa de calor. El caso completo está publicado también en Medium."
  ],
  "destacados": [
   {
    "n": "5",
    "l": "días de sprint"
   },
   {
    "n": "5",
    "l": "usuarios en el test"
   },
   {
    "n": "2",
    "l": "versiones: escritorio y móvil"
   }
  ],
  "fecha": "2020-09-29",
  "stats": {
   "vistas": 94,
   "aplausos": 12
  },
  "behance": "https://www.behance.net/gallery/105151443/Design-Sprint-contra-el-racismo",
  "tags": [
   "Design Sprint",
   "UX/UI",
   "Branding",
   "Dirección de arte",
   "Black Lives Matter"
  ],
  "galeria": [
   {
    "src": "assets/awkward-good/01-escritorio.webp",
    "alt": "Tablero de escritorio de Awkward?Good, en negro y amarillo sobre fotografías de manifestaciones de Black Lives Matter: el lema «Rompe con los prejuicios», datos del proyecto, briefing y solución, los cinco días del Design Sprint, la arquitectura de la información, la guía de estilo (Montserrat y Roboto) y las vistas finales de la web.",
    "w": 1600,
    "h": 13284,
    "pie": ""
   },
   {
    "src": "assets/awkward-good/02-movil.webp",
    "alt": "Vistas finales de Awkward?Good en móvil: la portada amarilla, la agenda de eventos en directo con calendario, artículos de fotografía, el «Perfil del día», una entrevista en directo con chat y contenidos recomendados, en seis teléfonos y en pantallas ampliadas.",
    "bloque": "solucion",
    "w": 1600,
    "h": 8028,
    "pie": ""
   }
  ],
  "clips": [
   {
    "tras": "assets/awkward-good/01-escritorio.webp",
    "fondo": "#000",
    "src": "assets/awkward-good/prototipo-escritorio.mp4",
    "poster": "assets/awkward-good/prototipo-escritorio.webp",
    "w": 1600,
    "h": 888,
    "titulo": "Vídeo del prototipo de escritorio",
    "pie": ""
   }
  ],
  "portada": "assets/awkward-good/portada-mockup.webp",
  "portadaAlt": "Un portátil con la web amarilla de Awkward?Good sobre una foto en blanco y negro de una manifestación y el lema «Rompe con los prejuicios»."
 }
];
