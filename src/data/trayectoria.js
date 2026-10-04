/* La trayectoria de la portada: experiencia, formación e idiomas.
   ------------------------------------------------------------
   Antes cada puesto estaba escrito a mano en index.astro, con su botón, su
   pliegue y sus etiquetas copiados doce veces. Ahora la portada recorre estas
   listas y el marcado sale siempre igual. El orden es el de la página: lo más
   reciente arriba.

   - puesto y lugar forman el rótulo («Diseñador UX/UI · Kubyka»). El \u00a0
     es un espacio que no parte la línea: «18 h» no se separa.
   - etiquetas es opcional: la formación no las lleva.
   - dominio es lo que se llena la barra de cada idioma, en porcentaje. */

export const EXPERIENCIA = [
  {
    "puesto": "Diseñador UX/UI",
    "lugar": "Centro Tecnológico del Notariado",
    "fechas": "Feb 2022 – actualidad",
    "texto": "Diseño y adaptación de interfaces web y móviles responsive, alineadas con la identidad corporativa. Creación y mantenimiento del sistema de diseño que unifica componentes, patrones y estilos en todos los productos. Wireframes, flujos de usuario y definición de pantallas junto a analistas y desarrolladores. Mantenimiento de la imagen de marca, newsletters, materiales de comunicación y artes finales, dentro de las políticas de seguridad de la información de la empresa.",
    "etiquetas": [
      "Sector notarial",
      "Sistema de diseño",
      "Identidad corporativa",
      "Newsletters",
      "Artes finales"
    ]
  },
  {
    "puesto": "Diseñador UX/UI",
    "lugar": "Kubyka",
    "fechas": "Ago – Nov 2021",
    "texto": "Conceptualización y diseño de interfaces web y productos digitales alineados con la estrategia de digital branding. Wireframes, user flows y prototipos interactivos para validar la usabilidad junto a los equipos de estrategia y desarrollo. Creación y mantenimiento de sistemas de diseño e identidades digitales multidispositivo, en coordinación con branding, contenidos y desarrollo técnico para traducir objetivos de negocio en productos escalables.",
    "etiquetas": [
      "Branding digital",
      "Prototipado",
      "Validación de usabilidad",
      "Producto escalable",
      "Coordinación interdepartamental"
    ]
  },
  {
    "puesto": "Diseñador UX/UI (HMI)",
    "lugar": "EDAG Engineering Spain",
    "fechas": "Feb – Sep 2021",
    "texto": "Diseño de interfaz y experiencia de usuario (UX/UI) para sistemas de infoentretenimiento (IVI) y cuadros de mando digitales de marca de automoción (SEAT CUPRA), garantizando la seguridad visual y la reducción de la carga cognitiva durante la conducción. Arquitectura de la información, wireframes, user flows y prototipos interactivos para pantallas táctiles y head-up displays (HUD). Creación de sistemas de diseño HMI y coordinación con ingeniería de software y ergonomía.",
    "etiquetas": [
      "Automoción",
      "HMI",
      "Infoentretenimiento",
      "Cuadros de mando digitales",
      "Prototipado",
      "Sistemas de diseño"
    ]
  },
  {
    "puesto": "Diseñador UX/UI y gráfico",
    "lugar": "Fundación Claror",
    "fechas": "2019 – 2020",
    "texto": "Diseño UX/UI y definición del look & feel del ecosistema digital de la fundación, web y app móvil. Wireframes, user flows y prototipos ajustados a las necesidades de los usuarios. Desarrollo y mantenimiento de la identidad visual mediante sistemas de diseño e interfaces responsive. Coordinación con marketing e IT para el soporte publicitario (banners, flyers, roll-ups y presentaciones), con coherencia gráfica en canales digitales e impresos.",
    "etiquetas": [
      "Web y App",
      "Flujos de usuario",
      "Lenguaje visual",
      "Diseño responsive",
      "Digital e Impreso"
    ]
  },
  {
    "puesto": "Visual designer y gráfico",
    "lugar": "Soria Natural",
    "fechas": "2018 – 2019",
    "texto": "Diseño UX/UI de las plataformas digitales de la compañía, web corporativa y e-commerce. Wireframes, user flows y prototipos para optimizar la navegación y la información de producto. Identidad visual corporativa aplicada tanto al entorno digital como al packaging y el etiquetado. Soporte publicitario online y offline junto a marketing y comunicación (banners, flyers, roll-ups, revistas y punto de venta), con el cumplimiento normativo del sector.",
    "etiquetas": [
      "Web y E-commerce",
      "Wireframes",
      "Consistencia de marca",
      "Packaging y etiquetado",
      "Punto de venta",
      "Publicidad"
    ]
  },
  {
    "puesto": "Diseñador UX/UI y gráfico · cofundador",
    "lugar": "Concepte 111 Disseny",
    "fechas": "2016 – 2018",
    "texto": "Cofundador de un estudio de diseño cooperativo, liderando tanto la estrategia de negocio como la ejecución creativa. Diseño y desarrollo de identidades de marca y plataformas web, garantizando soluciones visuales alineadas con las necesidades del cliente. Captación de clientes, gestión de redes sociales y organización de eventos para posicionar la cooperativa en el sector.",
    "etiquetas": [
      "Cofundación",
      "Estrategia de negocio",
      "Branding",
      "Plataformas web",
      "Captación de clientes",
      "Redes sociales",
      "Gestión de eventos"
    ]
  }
];

export const FORMACION = [
  {
    "puesto": "Curso de Hotjar (18\u00a0h)",
    "lugar": "Formadores IT",
    "fechas": "May – Jun 2026",
    "texto": "Analítica cualitativa de comportamiento con mapas de calor, grabaciones de sesión y análisis de embudo, más encuestas y widgets de feedback para completar lo que el dato numérico no explica. El complemento cualitativo a la investigación de usuarios: ver dónde se atasca alguien, no solo que se ha ido."
  },
  {
    "puesto": "Curso de Accesibilidad Web (20\u00a0h)",
    "lugar": "Formadores IT",
    "fechas": "Mar 2026",
    "texto": "Los catorce temas de las WCAG aplicados a la práctica: contenido alternativo, formularios y tablas accesibles, navegación por teclado, WAI-ARIA y JavaScript accesible, con evaluación final del cumplimiento. Base directa del trabajo de accesibilidad aplicado en el Portal Notarial del Ciudadano."
  },
  {
    "puesto": "Máster en Design Thinking y diseño UX/UI",
    "lugar": "Barreira arte+diseño",
    "fechas": "Ene – Sep 2021",
    "texto": "Especialización en el ciclo completo del diseño de producto digital: Design Thinking, investigación (UX Research), arquitectura de la información, diseño de interfaz en Figma y documentación del sistema visual. Cerrado con Besmie como proyecto final, de la investigación a la guía de estilo."
  },
  {
    "puesto": "Bootcamp UX/UI Design (432\u00a0h)",
    "lugar": "Neoland",
    "fechas": "2020",
    "texto": "Especialización en la creación de productos digitales end-to-end: UX Research, arquitectura de la información, diseño visual (UI Design), creación de sistemas de diseño y prototipado avanzado con Figma, Marvel e InVision. Realización y defensa de proyectos basados en Design Thinking, doble diamante y Design Sprint."
  },
  {
    "puesto": "Diplomatura en diseño gráfico",
    "lugar": "BAU · Centre Universitari de Disseny de Barcelona",
    "fechas": "2018 – 2021",
    "texto": "Formación práctica y teórica en el ciclo completo del diseño: creación de identidades de marca (branding), estudio avanzado de la tipografía y la composición visual, proyectos editoriales e introducción al diseño web y entornos digitales."
  },
  {
    "puesto": "Cursos online",
    "lugar": "Pack Adobe · After Effects",
    "fechas": "2015",
    "texto": "Capacitación técnica en el ecosistema Adobe: Illustrator para vectores e identidades de marca, Photoshop para retoque fotográfico y fotomontaje, InDesign para maquetación editorial y artes finales de imprenta, y After Effects para piezas de vídeo promocional."
  }
];

export const IDIOMAS = [
  {
    "idioma": "Catalán",
    "nivel": "Nativo",
    "dominio": 100
  },
  {
    "idioma": "Castellano",
    "nivel": "Nativo",
    "dominio": 100
  },
  {
    "idioma": "Inglés",
    "nivel": "B1",
    "dominio": 55
  },
  {
    "idioma": "Alemán",
    "nivel": "A2",
    "dominio": 35
  }
];
