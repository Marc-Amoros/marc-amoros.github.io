/* Textos alternativos de las imagenes de los articulos.
   ============================================================
   Cada clave es el nombre de archivo de la imagen; el valor, lo que un lector
   de pantalla leera en su lugar. Los usa src/lib/articulo.js al compilar.

   COMO RELLENARLO
   - Describe lo que la imagen ENSENA, no como se llama. El pie ya la nombra.
     mal:  "Diagrama de flujo."
     bien: "Diagrama de flujo con tres ramas: avisar a una ambulancia,
            denunciar un robo y bloquear la tarjeta."
   - Entre 1 y 2 frases. Si la imagen tiene datos, di el dato, no "un grafico".
   - Si una imagen es de verdad decorativa (una foto de recurso, un adorno),
     ponle "__decorativa__": se queda con alt="" y deja de contar como pendiente.

   URGENTES: las marcadas con «SIN PIE» son las unicas que ahora mismo son
   INVISIBLES para un lector de pantalla. Las demas al menos tienen pie.
   ============================================================ */

export const ALT = {

  /* ==================================================================
     awkward-good - Case study: Design Sprint contra el racismo
     ================================================================== */

  /* (antes del primer apartado)
     pie: «AWKWARD?GOOD Plataforma multicultural (desktop).» */
  "1*ja2Ird9At37NN5u8shzixA.png": "Portátil con la portada de escritorio de Awkward?Good: menú oscuro, fondo amarillo, un rostro hecho de cuatro fotos y el lema sobre desmontar prejuicios.",

  /* (antes del primer apartado)
     pie: «AWKWARD?GOOD Plataforma multicultural (mobile).» */
  "1*IhMOvY_G19Y0Grh76af_Bw.png": "Seis móviles con las pantallas finales: portada, evento sobre racismo, artículo de fotografía, entrevista en vídeo con chat y agenda de eventos.",

  /* DESIGN SPRINT
     pie: «Design Sprint» */
  "1*eRbrHDV4HSAm2W-JEK_3XQ.png": "Dibujo a mano de la semana de un Design Sprint: lunes, mapear; martes, esbozar; miércoles, decidir; jueves, prototipar; viernes, testear.",

  /* DÍA 1: ELEGIR UNA META
     pie: «16 Sprint questions.» */
  "1*3wErl_APoyZrhIkaXfSDyA.png": "Dieciséis notas amarillas con las preguntas del sprint sobre inmigración: burocracia, idioma, vivienda, ONG y empleo.",

  /* DÍA 1: ELEGIR UNA META
     pie: «Mi Customer journey.» */
  "1*zLcu0zMRTwVeheliwyP3xg.png": "Mapa del viaje de Hafid, inmigrante que busca vivienda: la emoción baja sin casa y sube al contactar con una ONG y conseguir un sitio.",

  /* DÍA 1: ELEGIR UNA META
     pie: «Votación final de la Sprint questions.» */
  "1*aW-Sj44xzH50KNIzFfV7FA.png": "Votación de preguntas bajo «Mejorar la visión positiva de la inmigración», en tres columnas, con puntos de voto y dos preguntas destacadas con estrella.",

  /* DÍA 3: ELEGIR LA MEJOR IDEA
     pie: «Wireframe ganador.» */
  "1*aSCbQ3Sjzxv39qyHoJXl8A.png": "Bocetos de las ideas ganadoras: «Conectar culturas» (calendario, idiomas, comida) y «Awkward? Good» (buen aliado, entrevistas, mitos).",

  /* DÍA 3: ELEGIR LA MEJOR IDEA
     pie: «Storyboard de la Plataforma.» */
  "1*SMd798XnqL-HTtThy68jHA.png": "Storyboard hecho con notas amarillas y bocetos a mano: banner, home, calendario, en directo, entrevista, comentarios y tienda del artista.",

  /* DÍA 4: PROTOTIPADO
     pie: «Prototipo FIGMA AWAKWARD?GOOD» */
  "1*jZxd749qlqkUu9MHAufgVw.png": "Archivo de Figma de Awkward?Good: decenas de pantallas de escritorio y móvil en el lienzo, con capas y estilos de texto a los lados.",

  /* DÍA 4: PROTOTIPADO
     pie: «INVISION AWAKWARD?GOOD» */
  "1*rtdWKNYl1lztCOfTTFXoEA.png": "Prototipo en InVision: cuadrícula con las pantallas de Awkward?Good (portada, vídeos, agenda, artículos) y los conjuntos a la izquierda.",

  /* DÍA 5: TESTEAR EL PROTOTIPO
     pie: «Parrilla de resultado» */
  "1*EtRtrFQBYejtI-JgKxoPEQ.png": "Tabla del test: nueve tareas y cinco usuarios; casi todo «ok/fluido» y, en rojo, el acceso por el banner en los cinco.",

  /* DÍA 5: TESTEAR EL PROTOTIPO
     pie: «Parrilla de conclusiones.» */
  "1*JD9MffobfqaeGbwymPiHOQ.png": "Notas verdes y rojas del test por tarea y usuario: el banner no se entiende, los corazones deberían ir rellenos y falta organizar por categorías.",

  /* FUTURIBLES
     pie: «Banner» */
  "1*OdegLKRnxkrp65UKCSBL0g.png": "Captura de la web de la NBA con un banner vertical de Awkward?Good a la derecha del archivo de noticias.",

  /* FUTURIBLES
     pie: «Botón me gusta.» */
  "1*81_CJnXZc-XtAy-HzFymkg.png": "Dos corazones amarillos sobre fondo oscuro para el botón de «me gusta»: uno de contorno y otro relleno.",

  /* FUTURIBLES
     pie: «Mejora del logo.» */
  "1*pNZlB9PvUuzb-sUSgVSs2w.png": "Dos versiones del logotipo de Awkward?Good en amarillo: una línea sola y otra con «Plataforma multicultural».",

  /* FUTURIBLES
     pie: «Footer.» */
  "1*UKNimM91Rj4VjLJDUt3Feg.png": "Pie de página amarillo con logotipo, «Sobre nosotros», correo de contacto, iconos de redes y copyright de 2020.",

  /* FUTURIBLES
     pie: «Sección de categorías.» */
  "1*JK7Nk8ibPjJ6mhAfsstKng.png": "Cabecera de la web con el desplegable de Categorías abierto: Noticias, Arte, Multirracial, Cambio social, Activismo y Música.",

  /* FUTURIBLES
     pie compartido: «Sección de interés de la Home.» */
  "1*HUQ31Oz4p-YfcS0gYBRCEQ.png":
    "Selector de intereses sobre fondo amarillo titulado «¿Te interesa?», con nueve etiquetas: fotografía, colectivos, cambio social, activismo, música, multirracial, LGTBIQ, arte y noticias; colectivos y música aparecen marcadas.",

  /* FUTURIBLES
     pie compartido: «Sección de interés de la Home.» */
  "1*OgvpVh03ZlGdB3l3-jBe_A.png": "Sección de intereses de la home sobre amarillo: nueve etiquetas subrayadas y el botón «Adelante».",

  /* FUTURIBLES
     pie: «Estilo tipográfico.» */
  "1*QsHch1kSx4DTOHlnlBvhjA.png": "Lista de estilos de texto de Figma: título secundario, texto, menú, texto footer, texto chat y texto noticias grandes.",

  /* FUTURIBLES
     pie: «Agenda más clara.» */
  "1*Gd21y9UORnadPJKDm4N_tg.png": "Agenda de eventos en directo de julio de 2020: un calendario y dos eventos con hora, cada uno con su corazón de favorito.",

  /* FUTURIBLES
     pie: «Parte de registro mejorado.» */
  "1*MNjsiyNf-NBjJLTUvLj0nA.png": "Registro en dos versiones: la ventana «Crea tu cuenta» sobre la web y la versión mejorada a pantalla dividida, con Facebook, Google o correo.",

  /* ==================================================================
     escudia-1 - Comunicación en caso de robo para personas sordas (1/2)
     ================================================================== */

  /* (antes del primer apartado)
     pie compartido: «Arriba, la cantidad de personas no oyentes que hablan lenguaje de signos en Europa. Abajo, la cantidad de personas no oyentes que hay en Cataluña.» */
  "articulo-mapa-europa.webp":
    "Mapa de Europa con las personas sordas que usan lengua de signos en cada país, según la OMS: 300.000 en Francia, 200.000 en Alemania, 120.000 en Rusia, 100.000 en España, 77.000 en Reino Unido y 60.000 en Portugal. El 5,3 % de la población mundial, 360 millones de personas, tiene pérdida auditiva.",

  /* (antes del primer apartado)
     pie compartido: «Arriba, la cantidad de personas no oyentes que hablan lenguaje de signos en Europa. Abajo, la cantidad de personas no oyentes que hay en Cataluña.» */
  "1*ci614ChqPmBOh9m8qm0BFQ.png": "Mapa de Cataluña: 32.315 personas no oyentes en total y 11.397 en el Barcelonés, destacado en azul.",

  /* DESIGN THINKING
     pie: «Design Thinking y Double diamond.» */
  "1*1u6346-5zizItpPBMDJL7A.png": "Doble diamante del Design Thinking: entender el problema (empatizar y definir) y descubrir la solución (idear, prototipar y evaluar), con flecha de iterar.",

  /* EMPATIZAR
     pie: «Research Questions» */
  "1*CNJwVhlPT-e6SAobg8kOVg.png": "Preguntas de investigación en notas sobre una foto de una oreja, y tres círculos solapados: Usuario, Producto y Competencia.",

  /* DESCUBRIR
     pie compartido: «Netnografía de APPS investigadas.» */
  "1*4pwv2FzpcKAGDvlLm5dABg.png":
    "Netnografía de la app AlertCops, puntuada con 4,1 estrellas: sus reseñas agrupadas por queja en columnas —se lanza la alerta y no pasa nada, problemas para entrar, se cuelga, respuesta automática generalizada, demasiados pasos intermedios y el botón SOS no se activa sin cobertura—.",

  /* DESCUBRIR
     pie compartido: «Netnografía de APPS investigadas.» */
  "1*VKz0ulSec9qNqSm4kbFQxQ.png":
    "Netnografía de la app 112: sus reseñas de una estrella agrupadas en tres quejas —mucho consumo de batería, demasiadas opciones y problemas para entrar—.",

  /* DESCUBRIR
     pie compartido: «Netnografía de APPS investigadas.» */
  "1*Zu53_My7q8eGpZSOYNjvRw.png": "Netnografía de Svisual, la app de videointerpretación en lengua de signos: reseñas de una estrella agrupadas por queja en cuatro columnas.",

  /* DESCUBRIR
     pie: «Benchmark» */
  "1*UlDvh_A3MfH78Njvb_J0Og.png": "Benchmark de Svisual, AlertCops y 112 en nueve criterios, cada uno con marca verde, aviso amarillo o aspa roja.",

  /* DESCUBRIR
     pie: «Focus Group.» */
  "1*9a4xbRBjjRiRLN0uZXm0bQ.png": "Fotografía del focus group: personas sentadas en una mesa de terraza con un portátil abierto, varias con mascarilla.",

  /* DESCUBRIR
     pie compartido: «Persona y mapa de empatía de Beatriz.» */
  "1*HYxz5Z_WA0pWO6vTAqY2kA.png":
    "Ficha de la persona Beatriz, 17 años, arquetipo Explorer: estudiante de FP de peluquería en Barcelona, sorda profunda, que se comunica en lengua de signos. Recoge biografía, objetivos, frustraciones, motivaciones, uso de tecnología y rasgos de personalidad.",

  /* DESCUBRIR
     pie compartido: «Persona y mapa de empatía de Beatriz.» */
  "1*pA8SoYjVfnP2US-WzTtOsQ.png": "Mapa de empatía de Beatriz con su foto: se siente indefensa de noche, con audífonos oye golpes pero no ruidos normales y el tótem SOS del metro no le sirve.",

  /* DESCUBRIR
     pie compartido: «Persona y mapa de empatía de Pablo.» */
  "1*2bg2ZLKysQ-wYUK_pY2WBg.png":
    "Ficha de la persona Pablo, 35 años, arquetipo Caregiver: mozo de almacén en Barcelona con problemas de audición, que se comunica con su pareja en lengua de signos y vía oral. Recoge biografía, objetivos, frustraciones, motivaciones, uso de tecnología y rasgos de personalidad.",

  /* DESCUBRIR
     pie compartido: «Persona y mapa de empatía de Pablo.» */
  "1*WLPYyK9m_YkW5yl_YSn9nQ.png": "Mapa de empatía de Pablo con su foto: quiere tener un hijo con Laura, teme no poder comunicarse en un problema y ve gente pendiente del móvil.",

  /* DESCUBRIR
     pie: «Escenario de Beatriz.» */
  "1*3XX8_rc_B_MURkDWZXu9Dg.png": "Escenario de Beatriz, de 17 años, en cinco viñetas: sale con sus amigos, vuelve con el metro cerrado y poca batería y pide un taxi.",

  /* DESCUBRIR
     pie: «Escenario de Pablo.» */
  "1*uCFmML9jfUnfJlKMkVpcyA.png": "Escenario de Pablo, de 35 años, en cinco viñetas: le roban la cartera y el móvil, la policía no tiene intérprete y pide ayuda a su pareja.",

  /* DESCUBRIR
     pie: «User Journey Beatriz.» */
  "1*wgyAT21VI_-78DXfIZQMtw.png": "User journey de Beatriz, de 17 años: cinco etapas con su curva de emociones, que cae al encontrar el metro cerrado, y sus puntos de dolor y mejoras.",

  /* DESCUBRIR
     pie: «User Journey Pablo.» */
  "1*xUmR0RyVqUqCQ6yfDxjSOg.png": "User journey de Pablo, de 35 años: cinco etapas con su curva de emociones, hundida tras el robo, y sus puntos de dolor y mejoras.",

  /* DEFINIR
     pie: «HMW seleccionadas.» */
  "1*ITfagh6h-VZdY0TcAnyhxQ.png": "Nueve notas amarillas con preguntas «¿Cómo podríamos…?» sobre la comunicación de las personas no oyentes; cuatro llevan un punto rojo.",

  /* PROPUESTA DE VALOR
     pie: «Proceso de HMW a propuesta de valor.» */
  "1*UqlkZQFfj33ud-pmAKqk-g.png": "De las ideas seleccionadas a la propuesta de valor: aprovechar los tótems INFO y SOS del metro con pantalla táctil, chip o código.",

  /* ==================================================================
     escudia-2 - Comunicación en caso de robo para personas sordas (2/2)
     ================================================================== */

  /* (antes del primer apartado)
     pie: «3 vistas del proyecto.» */
  "articulo-3-vistas.webp": "Tres pantallas del tótem de Escudia: el logotipo, la elección de perfil y «Pedro, ¿qué te ha pasado?» con tres botones, junto a la ilustración de un hombre.",

  /* STORYBOARD
     pie: «Storyboard.» */
  "1*VCqvwgOY4wYMM6fBf0AsvQ.png": "Storyboard de ocho viñetas en una parada de autobús: a Pablo le roban, usa el tótem SOS, denuncia el robo, bloquea la tarjeta y entrega el papel a la policía.",

  /* MOSCOW
     pie: «Cuadro de Moscow» */
  "1*XMuScWLfd9Xr7nk55YDAGQ.png": "Cuadro MoSCoW con notas amarillas: lo que el tótem debe tener, debería, podría y no tendrá (chatbot, forma de pago, teléfono).",

  /* DIAGRAMA DE FLUJO
     pie: «Diagrama de flujo.» */
  "articulo-diagrama-flujo.webp": "Diagrama de flujo de un usuario no oyente al que han robado, con tres recorridos: pedir ambulancia, denunciar el robo y bloquear la tarjeta.",

  /* WIREFRAMES Y ARQUITECTURA DE LA INFORMACIÓN
     pie compartido: «Arquitectura de la información y croquis interactivo con wireframes de baja fidelidad.» */
  "articulo-arquitectura-info.webp":
    "Árbol de arquitectura de la información: desde Inicio se separan discapacidad visual, oral y auditiva; la auditiva entra con chip o con código y abre tres caminos —denunciar robo, pedir ambulancia y bloquear tarjeta—. El de denuncia se divide en hurto, con fuerza y con intimidación, y los tres acaban en visualizar la denuncia e imprimirla.",

  /* WIREFRAMES Y ARQUITECTURA DE LA INFORMACIÓN
     pie compartido: «Arquitectura de la información y croquis interactivo con wireframes de baja fidelidad.» */
  "1*_-djR7m1mPJDIJmrcZUBXA.gif": "Croquis a mano de la pantalla de inicio: «Pablo, ¿en qué te puedo ayudar?» y tres botones con icono, uno resaltado en azul.",

  /* WIREFRAMES Y ARQUITECTURA DE LA INFORMACIÓN
     pie: «Ejemplo 4 wireframe digital de media calidad.» */
  "articulo-wireframes.webp": "Cuatro wireframes en gris del tótem: elegir perfil, introducir un código, elegir entre chip o código y marcar qué te han robado.",

  /* MOODBOARD
     pie: «Moodboard.» */
  "1*eFwt_1FiVOksWWpKYpjqxQ.png": "Moodboard en collage: tótems, llaveros de proximidad, los tres monos, un apretón de manos hecho de palabras y el logotipo de los Mossos d'Esquadra.",

  /* GUÍA DE ESTILO
     pie: «Guía de estilo.» */
  "articulo-guia-estilo.webp": "Guía de estilo del tótem: paleta roja y azul de los Mossos d'Esquadra, logotipo, iconografía, tipografía Open Sans y tres botones.",

  /* PANTALLAS FINALES Y PROTOTIPO
     pie: «4 vistas de las pantallas finales con explicación.» */
  "articulo-vistas-finales.webp": "Vistas finales anotadas del tótem: perfil con intérprete de signos, chip o código, descripción del ladrón con iconos y denuncia para imprimir.",

  /* TEST DE USUARIO
     pie: «Test en directo con un usuario con discapacidad auditiva.» */
  "1*S723Ft1gDuKSxXShbTWqcQ.png": "Fotografía de un test en directo: una persona con la mascarilla bajada prueba el prototipo en un portátil en un café.",

  /* TEST DE USUARIO
     pie: «Resultado de los test de usuario con comentarios.» */
  "07-test-usuarios.webp": "Tabla con el test de cinco participantes en cuatro tareas: casi todo «muy fácil» o «fácil», con sugerencias como acortar el formulario.",

  /* TEST DE USUARIO
     pie: «Mejoras que debía hacer en la APP.» */
  "1*pQhRd6VJRqTX-mu94hpKUA.png": "Seis recuadros azules con mejoras: opciones previas al llamar a la ambulancia, acceso para extranjeros, más discapacidades y más avatares.",

  /* FUTURIBLES
     pie: «Futuribles.» */
  "1*pBkJ5GGnKRbjI31e7phUXA.png": "Tres recuadros azules con usos futuros: paradas de metro y autobús, comisarías y otros cuerpos policiales de España y Europa.",

  /* ==================================================================
     teatro-1 - Artes escénicas en un entorno digital (1/2)
     ================================================================== */

  /* (antes del primer apartado)
     pie: «Representación de la metodología Design Thinking.» */
  "1*m5JGQoySct6-9CeeQuR1_Q.png": "Ilustración en negro y naranja de las fases del Design Thinking: dos perfiles, una lista de tareas, un engranaje, un móvil y otro engranaje.",

  /* DESIGN THINKING
     >>> SIN PIE - URGENTE <<< */
  "1*M_ex7jYWD85yG5-bX0KORA.png":
    "Diapositiva de la metodología Design Thinking con sus cinco fases en hexágonos de colores: empatizar, definir, idear, prototipar y evaluar.",

  /* EMPATIZAR
     pie: «Research questions.» */
  "1*N70pyEvnntkMMDGRJaAHmg.png": "Notas con las preguntas de investigación sobre el teatro y tres círculos solapados: Usuario, Producto y Competencia.",

  /* EMPATIZAR
     pie: «Tabla realizada por mi compañera Gloria.» */
  "1*Ph5EzALlmx5vygKhSJ8zUg.png": "Tabla comparativa de cinco teatros según entradas, precios, medidas covid, financiación, promociones, contenido y redes sociales.",

  /* EMPATIZAR
     pie: «Proceso de etnografía.» */
  "1*U57GSfAK2UT0fRzMuGdUqQ.png": "Capturas de las reseñas de Google de tres teatros: La Villarroel, Teatre Poliorama y Teatreneu.",

  /* EMPATIZAR
     pie: «Entrevista mediante remoto.» */
  "1*3Ci7s3_qbp0C8BPxD9EFsg.png": "Captura de la entrevista por videollamada: una mujer de pelo corto y rizado ocupa casi toda la pantalla.",

  /* EMPATIZAR
     pie: «Infograma sobre la encuesta de hábitos y gustos en el teatro» */
  "1*TmGs-Qlle1XhBOcA3ozrYw.png": "Infografía de la encuesta: gustan la comedia (34 %) y el musical (23 %); se va por la historia (58,41 %) y no se va por el precio (54,89 %).",

  /* EMPATIZAR
     >>> SIN PIE - URGENTE <<< */
  "1*_4IiICVZmb_g4UguJJVbqQ.png":
    "Entrevista por videollamada a Sergi Estebanell, artista de impacto, rodeada de sus frases recogidas en burbujas: «el arte es sanador», «los límites me ayudan a crear», «si no sientes pasión por lo que haces, no lo hagas» o «me produce una felicidad extrema el contacto con los demás».",

  /* PERSONA
     pie: «Usuario creado por mí.» */
  "1*au76Xk9lGaceEFX7A91WkA.png": "Ficha de la persona María Carmen, de 55 años, cajera en Barcelona, con biografía, objetivos, frustraciones, personalidad y marcas.",

  /* PERSONA
     pie: «Mapa empatía de María Carmen.» */
  "1*m2ogufKfeeKM7YhpjtDMoQ.png": "Mapa de empatía de María Carmen con su foto: teme que su hijo Juan se decepcione, oye boleros y habla con orgullo de él.",

  /* PERSONA
     pie: «User Jouney de María Carmen» */
  "1*6kY_mbjykau6YZF2qzUWBA.png": "User journey de María Carmen y Antonio en una función: la curva de emociones cae con la sala poco iluminada, el descanso sin canapés y la salida.",

  /* DEFINIR
     pie: «Insights que salieron de María Carmen después de hacer el User Jouney.» */
  "1*5CCwhdKidL-znDIGazOkMA.png": "Tres columnas de insights: María Carmen nota el rótulo poco iluminado, Antonio sufre las butacas y el descanso, y Raúl no encuentra horarios.",

  /* DEFINIR
     pie: «Priorización de Insights» */
  "1*6Bqv1FMzdS5R6jyvMYj_mw.png": "Matriz de satisfacción e importancia con notas azules numeradas y notas amarillas de «¿Cómo podemos…?» en la zona de mucha importancia.",

  /* ==================================================================
     teatro-2 - Artes escénicas en un entorno digital (2/2)
     ================================================================== */

  /* (antes del primer apartado)
     >>> SIN PIE - URGENTE <<< */
  "1*e70_VZRRs_oCHEJ02zHPgg.jpeg":
    "__decorativa__",

  /* IDEACIÓN
     pie: «Matriz 2x2» */
  "1*AjLt-zN4qCm-Or56NCa7Qw.png": "Matriz 2×2 de ideas, de innovadora a tradicional y de imposible a posible, con notas amarillas y los retos del proyecto a la izquierda.",

  /* IDEACIÓN
     pie: «Propuesta de valor.» */
  "1*aaIG_CPp-7P_uuvwcATuFw.png": "Propuesta de valor: un teatro interactivo, presencial o en streaming, donde el público decide el rumbo de la obra votando.",

  /* IDEACIÓN
     pie: «Storyboard TIPS.» */
  "1*fKSyzFK0t9YVjlprpUnASw.png": "Storyboard a lápiz en ocho viñetas: alguien descubre el teatro inmersivo, vota el desenlace de Romeo y Julieta y vuelve una semana después.",

  /* IDEACIÓN
     pie: «Moodboard TIPS.» */
  "1*5ehXlYUdGolJoWIkYUp56Q.png": "Moodboard de TIPS: webs de Discovery Channel en negro y morado, entradas de colores, un cartel de festival y una paleta de morados, rosas y naranjas.",

  /* IDEACIÓN
     pie: «Diagrama de flujo.» */
  "1*TFNNpJIXt270utAD7iB-9Q.png": "Diagrama de flujo en blanco sobre negro: buscar la obra, elegir streaming o sala, comprar la entrada, votar durante la función y ver el final elegido.",

  /* IDEACIÓN
     pie: «Diseño de la estructura.» */
  "1*7Tc_GreywiqCpTOmLHxeow.png": "Arquitectura de la información: de la Home salen Obra, Programa, ¿Cómo votamos?, Votaciones, La revista y El teatro, con sus subapartados.",

  /* IDEACIÓN
     pie: «Presentación del logo TIPS en una tableta.» */
  "1*MKI5HLvmWXIViTx22E55Mg.png": "Tableta con el logotipo de TIPS Teatro: una huella dactilar de arcos morados, grises y blancos y las palabras «TIPS» y «Teatro».",

  /* IDEACIÓN
     pie: «Guía de estilo TIPS.» */
  "1*fiwD2seVrSLbUC5mQCKJvg.png": "Guía de estilo de TIPS: logotipo, paleta de morados, grises y amarillos, tipografías Yeseva One y Open Sans e iconos blancos.",

  /* PROTOTIPADO
     pie: «Algunos wireframe TIPS digitalizado con Figma en blanco y negro.» */
  "1*i97luOJga2nkMCMKfekqMQ.png": "Wireframes en gris de la web: home con cuenta atrás, votaciones con gráficos, ficha de la obra, programa, pantalla Sí/No y reparto.",

  /* TESTING
     pie: «Resultado de los 4 usuarios.» */
  "1*_iglXGLacNOpp1zBKMZMsA.png": "Tabla con el test de cuatro usuarios en siete tareas, casi todas en verde, con sugerencias y comentarios positivos debajo.",

  /* ITERAR
     >>> SIN PIE - URGENTE <<< */
  "1*iE3DlkjJiDBru9vZpBIqyA.png":
    "Pantalla del programa de TIPS Teatro después de iterar: tres tarjetas de obra —Anastasia, Pecados Imperdonables y Gran Reserva— con su cartel, la fecha de estreno, una sinopsis breve y un enlace de «ver más».",

  /* ITERAR
     pie: «Mejora la información sobre futuras obras colocando el reparto, ya que es un factor de decisión importante.» */
  "1*C5bGStHz1dEs9I2Q05bq3Q.png": "Ficha de «Pecados imperdonables» en la web de TIPS: foto de siete personajes, sinopsis, duración de 1 h 40, estreno el 24/10/2020 y reparto.",

  /* ITERAR
     pie: «Colocar en scroll a 1 columna la explicación de cómo poder votar y también mejorar la visibilidad y la ubicación de las cámaras en el mapa del teatro.» */
  "1*SaVRzltIxgDgKlRGA6gelA.png": "Página «¿Cómo votamos?» con las cuatro fases de una votación y la vista de cámaras del teatro con cuatro botones de cámara.",

  /* ITERAR
     pie: «Marcar la situación de dónde estamos en el mapa y hacer los iconos más grandes.» */
  "1*a8qvodeeh-FzJYEetlE-hA.png": "Mapa del teatro con escenario, platea, club y anfiteatro; la platea A resaltada con «Usted se encuentra aquí» y la leyenda de servicios y salidas.",
};

/* Imagenes: 83 - de ellas 11 sin pie (las urgentes). */
