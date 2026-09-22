/* ============================================================
   main.js — comportamiento de la interfaz
   Sin dependencias. La página funciona entera sin este archivo;
   esto solo añade tema, menú, revelado y navegación activa.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Año del pie ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Tema claro / oscuro ----------
     Sin elección guardada mandan las preferencias del sistema;
     el botón fija la elección y la recuerda. */
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('tema', next); } catch (e) {}
      toggle.setAttribute('aria-label',
        next === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }

  /* ---------- Barra translúcida al hacer scroll ---------- */
  var nav = document.getElementById('nav');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      if (nav) {
        nav.dataset.scrolled = String(window.scrollY > 8);
        /* Progreso de lectura para la línea inferior de la barra. */
        var recorrido = document.documentElement.scrollHeight - window.innerHeight;
        nav.style.setProperty('--progreso', recorrido > 0
          ? String(Math.min(1, Math.max(0, window.scrollY / recorrido)))
          : '0');
      }
      ticking = false;
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Píldora que recorre la navegación ----------
     Un solo elemento que se mueve entre los enlaces: sigue al puntero y al
     foco, y cuando los sueltas vuelve a la sección en la que estás. Debajo
     de 48rem la lista está oculta y la píldora simplemente no aparece. */
  var navNav = document.querySelector('.nav__nav');
  var navList = navNav && navNav.querySelector('.nav__list');

  if (navNav && navList) {
    var spot = document.createElement('span');
    spot.className = 'nav__spot';
    spot.setAttribute('aria-hidden', 'true');
    navNav.insertBefore(spot, navList);

    var situar = function (link) {
      if (!link || !link.offsetWidth) {
        navNav.dataset.spot = 'off';
        return;
      }
      spot.style.setProperty('--spot-x', link.offsetLeft + 'px');
      spot.style.setProperty('--spot-w', link.offsetWidth + 'px');
      navNav.dataset.spot = 'on';
    };

    var reposar = function () {
      situar(navList.querySelector('.nav__link[aria-current="true"]'));
    };

    navList.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('mouseenter', function () { situar(link); });
      link.addEventListener('focus', function () { situar(link); });
    });
    navNav.addEventListener('mouseleave', reposar);
    navNav.addEventListener('focusout', reposar);

    /* El scrollspy marca aria-current; la píldora lo sigue sin acoplarse a él. */
    if ('MutationObserver' in window) {
      new MutationObserver(reposar).observe(navList, {
        subtree: true, attributes: true, attributeFilter: ['aria-current']
      });
    }

    window.addEventListener('resize', reposar);
    reposar();
  }

  /* ---------- Menú de móvil ---------- */
  var burger = document.getElementById('nav-burger');
  var panel = document.getElementById('nav-panel');
  var fondoMenu = document.getElementById('nav-backdrop');

  function closePanel() {
    if (!burger || !panel) return;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    panel.dataset.abierto = 'false';
    if (fondoMenu) fondoMenu.dataset.abierto = 'false';
    document.documentElement.classList.remove('sin-scroll');
  }

  if (burger && panel) {
    /* Sin JavaScript el botón no responde y el panel se queda oculto (el
       «hidden» que trae del HTML); en cuanto esto se ejecuta, se quita y pasa
       a mandar data-abierto, que es lo que anima la apertura y el cierre. */
    panel.hidden = false;
    panel.dataset.abierto = 'false';
    if (fondoMenu) {
      fondoMenu.hidden = false;
      fondoMenu.dataset.abierto = 'false';
      fondoMenu.addEventListener('click', closePanel);
    }

    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
      panel.dataset.abierto = String(!open);
      if (fondoMenu) fondoMenu.dataset.abierto = String(!open);
      /* Como el panel es fijo pero no cubre siempre toda la altura, en
         iOS un gesto que empieza sobre él a veces se cuela y mueve la
         página de detrás en vez de quedarse quieto: por eso, igual que
         al ampliar un vídeo, mientras está abierto se bloquea el scroll
         del documento entero. */
      document.documentElement.classList.toggle('sin-scroll', !open);
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) closePanel();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });

    window.matchMedia('(min-width: 48rem)').addEventListener('change', closePanel);
  }

  /* ---------- Revelado progresivo al entrar en pantalla ---------- */
  var revealables = document.querySelectorAll('.rise');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
       /* Umbral 0: un bloque más alto que la ventana nunca podría enseñar un
          porcentaje de sí mismo y se quedaba invisible para siempre. */
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Enlace activo en la navegación ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var links = {};
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href.charAt(0) === '#') links[href.slice(1)] = link;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Portadas: si una imagen remota no carga,
       la tarjeta se queda con el color dominante del proyecto ---------- */
  document.querySelectorAll('.work__media img').forEach(function (img) {
    img.addEventListener('error', function () { img.dataset.failed = 'true'; });
    if (img.complete && img.naturalWidth === 0) img.dataset.failed = 'true';
  });

  /* ============================================================
     Capa Material: ripple, capa de estado y foco que sigue al puntero
     ============================================================ */

  /* Ripple en botones, pestañas y FAB. Se inserta un <span> con el
     tamaño y la posición del punto pulsado y se borra al terminar. */
  if (!reduceMotion) {
    document.addEventListener('pointerdown', function (e) {
      var host = e.target.closest('.btn, .tab, .fab');
      if (!host) return;
      var r = host.getBoundingClientRect();
      var d = Math.max(r.width, r.height) * 2.2;
      var span = document.createElement('span');
      span.className = 'ripple';
      span.style.setProperty('--x', (e.clientX - r.left) + 'px');
      span.style.setProperty('--y', (e.clientY - r.top) + 'px');
      span.style.setProperty('--d', d + 'px');
      host.appendChild(span);
      span.addEventListener('animationend', function () { span.remove(); });
    });
  }

  /* Foco e inclinación 3D de las tarjetas de proyecto.
     Solo con ratón: en táctil no hay puntero que seguir. */
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.work[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((px - 0.5) * 5).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 5).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- Carrusel del portafolio ----------
     La pista es un scroller nativo con scroll-snap: el gesto táctil, el
     trackpad y la rueda ya funcionan sin esto, y como cada tarjeta es una
     parada obligatoria (scroll-snap-stop), un gesto pasa de una en una. Aquí
     solo se añaden las flechas, los puntos y el teclado, que avanzan igual:
     una tarjeta por paso. */
  document.querySelectorAll('[data-carrusel]').forEach(function (carrusel) {
    var pista = carrusel.querySelector('[data-pista]');
    var puntos = carrusel.querySelector('[data-puntos]');
    var flechas = carrusel.querySelectorAll('[data-ir]');
    if (!pista) return;

    var tarjetas = Array.prototype.slice.call(pista.children);
    if (!tarjetas.length) return;

    /* Cada parada es el scrollLeft que deja una tarjeta pegada al margen de la
       página. Las últimas tarjetas no pueden llegar a ese punto porque la pista
       se acaba antes: se quedan en el tope y solo cuenta la primera de ellas. */
    var paradas = [];
    var holgura = 2;
    var firma = '';
    var destino = null;      // parada a la que va un desplazamiento en curso
    var reposo = 0;

    function medir() {
      var maximo = Math.max(0, Math.round(pista.scrollWidth - pista.clientWidth));
      var izquierda = pista.getBoundingClientRect().left;
      var relleno = parseFloat(getComputedStyle(pista).scrollPaddingLeft) || 0;
      var hueco = parseFloat(getComputedStyle(pista).columnGap) || 0;
      var ancho = tarjetas[0].getBoundingClientRect().width;
      /* El snap puede dejar la pista unos píxeles antes del final; con este
         margen el último tramo cuenta como final y la flecha se apaga. */
      holgura = hueco + 4;
      /* Dos paradas a menos de un tercio de tarjeta son la misma: pasa cuando
         las últimas tarjetas se quedan en el tope de la pista. */
      var minimo = (ancho + hueco) / 3;

      paradas = [];
      tarjetas.forEach(function (t, i) {
        var x = t.getBoundingClientRect().left - izquierda + pista.scrollLeft - relleno;
        x = Math.min(Math.max(0, Math.round(x)), maximo);
        if (!paradas.length || x - paradas[paradas.length - 1].x > minimo) paradas.push({ x: x, tarjeta: i });
      });
      pintarPuntos();
      actualizar();
    }

    function pintarPuntos() {
      if (!puntos) return;
      var nueva = paradas.map(function (p) { return p.tarjeta; }).join(',');
      if (nueva === firma) return;
      firma = nueva;
      puntos.textContent = '';
      paradas.forEach(function (p, i) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'carrusel__punto';
        b.dataset.parada = String(i);
        b.setAttribute('aria-label', 'Ir al proyecto ' + (p.tarjeta + 1) + ' de ' + tarjetas.length);
        li.appendChild(b);
        puntos.appendChild(li);
      });
    }

    function alFinal() {
      return pista.scrollLeft >= pista.scrollWidth - pista.clientWidth - holgura;
    }

    function paradaActual() {
      if (alFinal()) return paradas.length - 1;
      var mejor = 0;
      var distancia = Infinity;
      paradas.forEach(function (p, i) {
        var d = Math.abs(p.x - pista.scrollLeft);
        if (d < distancia) { distancia = d; mejor = i; }
      });
      return mejor;
    }

    function actualizar() {
      var actual = paradaActual();

      flechas.forEach(function (b) {
        b.disabled = Number(b.dataset.ir) < 0 ? pista.scrollLeft <= 1 : alFinal();
      });

      if (!puntos) return;
      Array.prototype.forEach.call(puntos.querySelectorAll('.carrusel__punto'),
        function (b, i) { b.setAttribute('aria-current', String(i === actual)); });
    }

    function irA(i) {
      i = Math.max(0, Math.min(paradas.length - 1, i));
      destino = i;
      /* Mientras dura el desplazamiento la parada actual todavía es la de
         salida: un segundo clic seguido cuenta desde el destino, no desde ahí. */
      clearTimeout(reposo);
      reposo = setTimeout(function () { destino = null; }, 700);
      pista.scrollTo({ left: paradas[i].x, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    function paso(dir) {
      irA((destino !== null ? destino : paradaActual()) + dir);
    }

    flechas.forEach(function (b) {
      b.addEventListener('click', function () { paso(Number(b.dataset.ir)); });
    });

    if (puntos) {
      puntos.addEventListener('click', function (e) {
        var b = e.target.closest('.carrusel__punto');
        if (!b) return;
        irA(Number(b.dataset.parada));
      });
    }

    pista.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      paso(e.key === 'ArrowRight' ? 1 : -1);
    });

    var esperando = false;
    pista.addEventListener('scroll', function () {
      clearTimeout(reposo);
      reposo = setTimeout(function () { destino = null; }, 160);
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(function () { actualizar(); esperando = false; });
    }, { passive: true });

    if ('ResizeObserver' in window) new ResizeObserver(medir).observe(pista);
    else window.addEventListener('resize', medir);

    medir();
  });

  /* ============================================================
     Obertura del hero: el titular sube por líneas y el retrato
     entra desenfocado. Se lanza en cuanto el navegador ha pintado.
     ============================================================ */
  var hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('overture'); });
    });
  }

  /* ============================================================
     Pestañas de trayectoria (patrón de Material)
     ============================================================ */
  var tablist = document.querySelector('.tabs');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('.tab'));
    var indicator = tablist.querySelector('.tabs__indicator');

    function moveIndicator(tab) {
      if (!indicator) return;
      indicator.style.inlineSize = tab.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
    }

    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      moveIndicator(tab);
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var next = tabs[(i + d + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });

    function recolocar() {
      moveIndicator(tablist.querySelector('[aria-selected="true"]') || tabs[0]);
    }
    recolocar();
    window.addEventListener('resize', recolocar);

    // Si la página se abre en una pestaña de fondo, el ancho de los botones
    // todavía no existe cuando medimos. El observer recoloca el indicador en
    // cuanto la barra tiene un tamaño real.
    if ('ResizeObserver' in window) new ResizeObserver(recolocar).observe(tablist);
  }

  /* ============================================================
     Trayectoria plegable: cada puesto abre y cierra su descripción
     ------------------------------------------------------------
     El estado inicial viene escrito en el HTML: todos los puestos
     plegados, así que la lista ya se pinta plegada aunque este
     archivo tarde en llegar. Aquí solo se invierte el
     aria-expanded; de la altura se encarga el CSS.

     Es un acordeón exclusivo: solo un puesto abierto a la vez dentro
     de su misma lista (Experiencia, Formación e Idiomas son listas
     independientes, así que abrir uno en una pestaña no afecta a las
     otras). Al abrir uno se cierran los demás de su .track__list. */
  document.querySelectorAll('.job__head').forEach(function (cabecera) {
    cabecera.addEventListener('click', function () {
      var abierto = cabecera.getAttribute('aria-expanded') === 'true';
      if (!abierto) {
        var lista = cabecera.closest('.track__list');
        if (lista) {
          lista.querySelectorAll('.job__head[aria-expanded="true"]').forEach(function (otra) {
            if (otra !== cabecera) otra.setAttribute('aria-expanded', 'false');
          });
        }
      }
      cabecera.setAttribute('aria-expanded', String(!abierto));
    });
  });

  /* ============================================================
     Trayectoria animada con Motion
     ------------------------------------------------------------
     Dos cosas, y las dos acompañan a lo que hace el usuario: los
     puestos entran escalonados al asomar la sección, y las
     etiquetas caen una detrás de otra al desplegar un puesto.

     De marcar la etapa abierta —el punto y la línea en acento— se
     encarga el CSS, que ya sabe cuál está abierta sin tener que
     preguntárselo a nadie.

     Es una mejora opcional: si motion.js no llega, o si se pide
     menos movimiento, no se monta nada y la sección se queda como
     estaba, con todo a la vista y el acordeón funcionando.
     ============================================================ */
  var motion = window.Motion;
  var pistas = Array.prototype.slice.call(document.querySelectorAll('.track'));

  if (motion && pistas.length && !reduceMotion) {
    pistas.forEach(function (pista) {
      var puestos = Array.prototype.slice.call(pista.querySelectorAll('.job'));
      if (!puestos.length) return;

      /* En una pestaña oculta inView no llega a dispararse, así que la
         entrada se lanza también al cambiar de pestaña. */
      var entrado = false;

      function entrar() {
        if (entrado || !pista.offsetParent) return;
        entrado = true;
        motion.animate(puestos,
          { opacity: [0, 1], transform: ['translateY(16px)', 'none'] },
          { delay: motion.stagger(0.07), duration: 0.55, ease: [0.2, 0, 0, 1] });
      }

      puestos.forEach(function (puesto) { puesto.style.opacity = '0'; });
      motion.inView(pista, entrar, { amount: 0.1 });
      pista.__entrar = entrar;

      /* Las etiquetas caen escalonadas al abrir un puesto. Este oyente va
         después del que cambia aria-expanded, así que ya está actualizado. */
      pista.addEventListener('click', function (e) {
        var cabecera = e.target.closest('.job__head');
        if (!cabecera || cabecera.getAttribute('aria-expanded') !== 'true') return;
        var chips = cabecera.closest('.job').querySelectorAll('.job__fold .chip');
        if (!chips.length) return;
        motion.animate(chips,
          { opacity: [0, 1], transform: ['translateY(8px)', 'none'] },
          { delay: motion.stagger(0.035, { startDelay: 0.12 }), duration: 0.4 });
      });
    });

    document.querySelectorAll('.tab').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var panel = document.getElementById(boton.getAttribute('aria-controls'));
        var pista = panel && panel.querySelector('.track');
        if (pista && pista.__entrar) pista.__entrar();
      });
    });
  }


  /* ============================================================
     Sobre mí: el trazo del título y los pasos del método
     ------------------------------------------------------------
     Dos gestos, los dos con sentido: el trazo bajo «puente» se
     dibuja de izquierda a derecha, que es lo que la frase dice; y
     los tres pasos entran en orden, con su raíl creciendo detrás,
     porque son una secuencia y no una lista suelta.

     Igual que el resto: si Motion no llega o se pide menos
     movimiento, no se monta nada y todo queda ya pintado, que es
     el estado por defecto del CSS.
     ============================================================ */
  var sobreMi = document.querySelector('#sobre-mi .about__body');

  if (motion && sobreMi && !reduceMotion) {
    /* «puente» está en el título, que en móvil queda lejos del cuerpo (el
       retrato va en medio): el trazo se dibuja cuando asoma el título, y los
       pasos cuando asoma el cuerpo. */
    var titulo = document.getElementById('sobre-mi-titulo');
    var trazo = titulo && titulo.querySelector('.lema__puente');
    var pasos = Array.prototype.slice.call(sobreMi.querySelectorAll('.metodo__lista li'));
    var visto = false;
    var trazado = false;

    if (trazo) {
      trazo.style.setProperty('--trazo', '0');
      motion.inView(titulo, function () {
        if (trazado || !titulo.offsetParent) return;
        trazado = true;
        motion.animate(trazo, { '--trazo': [0, 1] },
          { duration: 0.65, delay: 0.25, ease: [0.2, 0, 0, 1] });
      }, { amount: 0.6 });
    }
    pasos.forEach(function (paso) {
      paso.style.opacity = '0';
      paso.style.setProperty('--rail', '0');
    });

    motion.inView(sobreMi, function () {
      if (visto || !sobreMi.offsetParent) return;
      visto = true;

      if (pasos.length) {
        motion.animate(pasos,
          { opacity: [0, 1], transform: ['translateY(10px)', 'none'] },
          { delay: motion.stagger(0.12, { startDelay: 0.35 }), duration: 0.45, ease: [0.2, 0, 0, 1] });
        motion.animate(pasos, { '--rail': [0, 1] },
          { delay: motion.stagger(0.12, { startDelay: 0.45 }), duration: 0.4, ease: [0.2, 0, 0, 1] });
      }
    }, { amount: 0.2 });
  }


  /* ============================================================
     Raíl de la línea de tiempo: se dibuja al entrar
     ============================================================ */
  var dibujables = document.querySelectorAll('.track');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    dibujables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var drawObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    dibujables.forEach(function (el) { drawObserver.observe(el); });
  }

  /* ============================================================
     Idiomas: las filas entran una detrás de otra y cada barra se
     llena justo después de aparecer su fila, en vez de que las
     cuatro salten de golpe a la vez.
     ------------------------------------------------------------
     Misma lógica que la trayectoria: la pestaña de Idiomas empieza
     oculta, así que la animación se lanza también al seleccionarla
     (el guardián __entrar evita repetirla si ya se lanzó al hacer
     scroll). Sin Motion, o pidiendo menos movimiento, cada barra
     salta a su ancho final de golpe, como antes.
     ============================================================ */
  var listasIdiomas = Array.prototype.slice.call(document.querySelectorAll('.langs'));

  if (motion && listasIdiomas.length && !reduceMotion) {
    listasIdiomas.forEach(function (lista) {
      var filas = Array.prototype.slice.call(lista.children);
      if (!filas.length) return;

      var entrado = false;
      function entrar() {
        if (entrado || !lista.offsetParent) return;
        entrado = true;
        motion.animate(filas,
          { opacity: [0, 1], transform: ['translateY(10px)', 'none'] },
          { delay: motion.stagger(0.09), duration: 0.5, ease: [0.2, 0, 0, 1] });
        filas.forEach(function (fila, i) {
          var relleno = fila.querySelector('.lang__fill');
          if (!relleno) return;
          var pct = relleno.style.getPropertyValue('--pct') || '0%';
          motion.animate(relleno,
            { inlineSize: ['0%', pct] },
            { delay: 0.09 * i + 0.2, duration: 0.85, ease: [0.16, 1, 0.3, 1] });
        });
      }

      filas.forEach(function (fila) { fila.style.opacity = '0'; });
      motion.inView(lista, entrar, { amount: 0.25 });
      lista.__entrar = entrar;
    });

    document.querySelectorAll('.tab').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var panel = document.getElementById(boton.getAttribute('aria-controls'));
        var lista = panel && panel.querySelector('.langs');
        if (lista && lista.__entrar) lista.__entrar();
      });
    });
  } else {
    listasIdiomas.forEach(function (lista) { lista.classList.add('is-in'); });
  }

  /* ============================================================
     Contadores del hero: cuentan hasta su valor una sola vez
     ============================================================ */
  var contadores = document.querySelectorAll('[data-count]');
  if (!reduceMotion && contadores.length) {
    contadores.forEach(function (el) {
      var fin = parseInt(el.dataset.count, 10);
      if (isNaN(fin)) return;
      var inicio = null;
      el.textContent = '0';
      function paso(t) {
        if (inicio === null) inicio = t;
        var p = Math.min((t - inicio) / 900, 1);
        // easing «emphasized decelerate»: rápido al principio, se posa al final
        el.textContent = String(Math.round(fin * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(paso);
      }
      setTimeout(function () { requestAnimationFrame(paso); }, 600);
    });
  }

  /* ============================================================
     Malla de puntos del hero

     El adorno de la portada, hecho con color plano: un retículo de puntos
     del color de los bordes que respira muy despacio, y que se enciende en
     el acento allí donde está el cursor. Sin degradados: cada punto es un
     color liso y la profundidad la dan el tamaño y la opacidad.

     - Lee los colores de los tokens, así que sigue al tema sin duplicarlos.
     - Solo dibuja mientras el hero está en pantalla.
     - Con `prefers-reduced-motion` pinta un fotograma fijo y se detiene.
     ============================================================ */
  var malla = document.getElementById('malla');
  if (malla && malla.getContext) {
    (function mallaDePuntos() {
      var ctx = malla.getContext('2d');
      var hero = malla.parentElement;
      var PASO = 26;         // separación del retículo, en px CSS
      var RADIO_RATON = 150; // alcance del cursor, en px CSS
      var MARGEN = 18;       // aire libre alrededor de cada bloque de texto
      var PLUMA = 80;        // en cuántos px pasa de apagado a encendido
      var zonas = [];        // cajas de texto que la malla no debe pisar
      var ancho = 0, alto = 0;
      var raton = { x: -9999, y: -9999, dx: -9999, dy: -9999 };
      var visible = true;
      var animando = false;
      // Los dos extremos del degradado del retículo: el secundario en una
      // esquina, el acento en la otra. Cada punto es un color liso; el
      // degradado aparece al recorrer el campo entero.
      var frio = [71, 57, 96];      // --color-accent-2
      var acento = [90, 19, 210];   // --color-accent

      function aRGB(valor) {
        var v = (valor || '').trim();
        var m = v.match(/^#([0-9a-f]{6})$/i);
        if (m) {
          var n = parseInt(m[1], 16);
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
        }
        m = v.match(/(\d+(?:\.\d+)?)/g);
        if (m && m.length >= 3) return [+m[0], +m[1], +m[2]];
        return null;
      }

      function leerColores() {
        var cs = getComputedStyle(document.documentElement);
        frio = aRGB(cs.getPropertyValue('--color-accent-2')) || frio;
        acento = aRGB(cs.getPropertyValue('--color-accent')) || acento;
      }

      // Mezcla lineal entre los dos extremos del degradado.
      function mezclar(a, b, t) {
        return [
          Math.round(a[0] + (b[0] - a[0]) * t),
          Math.round(a[1] + (b[1] - a[1]) * t),
          Math.round(a[2] + (b[2] - a[2]) * t)
        ];
      }

      function medir() {
        var r = hero.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        ancho = Math.round(r.width);
        alto = Math.round(r.height);
        malla.width = Math.round(ancho * dpr);
        malla.height = Math.round(alto * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Nada de adivinar dónde cae el texto: se miden los bloques reales y
        // la malla se aparta de ellos. Así el hueco se ajusta solo a cualquier
        // ancho de pantalla y a cualquier longitud de titular.
        zonas = [];
        hero.querySelectorAll('.hero__status, .hero__title, .hero__sub, .hero__actions, .hero__arte')
          .forEach(function (el) {
            var c = el.getBoundingClientRect();
            zonas.push({
              x0: c.left - r.left - MARGEN,
              y0: c.top - r.top - MARGEN,
              x1: c.right - r.left + MARGEN,
              y1: c.bottom - r.top + MARGEN
            });
          });

        // Asignar el ancho del lienzo lo borra. Mientras el bucle anima, el
        // siguiente fotograma lo rellena; sin bucle (movimiento reducido, o el
        // hero fuera de pantalla) hay que repintar aquí o se queda en blanco.
        if (!animando) pintar(0);
      }

      // 0 dentro de un bloque de texto, 1 a partir de PLUMA px de distancia.
      function libre(x, y) {
        var min = 1;
        for (var i = 0; i < zonas.length; i++) {
          var z = zonas[i];
          var dx = x < z.x0 ? z.x0 - x : (x > z.x1 ? x - z.x1 : 0);
          var dy = y < z.y0 ? z.y0 - y : (y > z.y1 ? y - z.y1 : 0);
          if (dx === 0 && dy === 0) return 0;
          var d = Math.sqrt(dx * dx + dy * dy) / PLUMA;
          if (d < min) min = d;
          if (min <= 0) return 0;
        }
        return min >= 1 ? 1 : min * min * (3 - 2 * min);  // suavizado
      }

      function pintar(t) {
        ctx.clearRect(0, 0, ancho, alto);
        // El cursor persigue su posición real con retardo: el encendido
        // se arrastra un poco detrás del puntero y resulta más orgánico.
        raton.dx += (raton.x - raton.dx) * 0.12;
        raton.dy += (raton.y - raton.dy) * 0.12;

        for (var y = PASO / 2; y < alto; y += PASO) {
          // Se disuelve hacia abajo, donde están el retrato y las cifras.
          var caidaY = 1 - Math.pow(y / alto, 1.2);
          if (caidaY <= 0.02) continue;

          for (var x = PASO / 2; x < ancho; x += PASO) {
            // La malla pesa algo más en los márgenes, para que enmarque.
            var lejos = Math.abs(x - ancho / 2) / (ancho / 2);
            var caidaX = 0.5 + 0.5 * Math.pow(lejos, 1.4);
            var peso = caidaY * caidaX * libre(x, y);
            if (peso <= 0.02) continue;

            // Onda diagonal lentísima: el retículo respira aunque no haya ratón.
            var onda = 0.5 + 0.5 * Math.sin((x + y) * 0.012 + t * 0.00035);

            // El degradado recorre el campo en diagonal, del secundario al
            // acento, y la onda lo desplaza un poco para que respire. No es
            // solo cambio de color: hacia el acento los puntos también
            // crecen y ganan opacidad, que es lo que se lee como degradado.
            var mezcla = (x / ancho) * 0.55 + (y / alto) * 0.45;
            mezcla = Math.max(0, Math.min(1, mezcla + (onda - 0.5) * 0.22));
            var color = mezclar(frio, acento, mezcla);

            var radio = 0.65 + onda * 0.7 + mezcla * 0.45;
            var alfa = (0.22 + onda * 0.26) * (0.5 + mezcla * 0.85) * peso;

            var dx = x - raton.dx;
            var dy = y - raton.dy;
            var d2 = dx * dx + dy * dy;
            if (d2 < RADIO_RATON * RADIO_RATON) {
              var cerca = 1 - Math.sqrt(d2) / RADIO_RATON;
              cerca *= cerca;
              radio += cerca * 2.1;
              alfa = Math.min(1, alfa + cerca * 0.75);
              color = acento;
            }

            ctx.beginPath();
            ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alfa.toFixed(3) + ')';
            ctx.arc(x, y, radio, 0, 6.2832);
            ctx.fill();
          }
        }
      }

      function bucle(t) {
        if (!animando) return;
        pintar(t);
        requestAnimationFrame(bucle);
      }

      function arrancar() {
        if (animando || reduceMotion) return;
        animando = true;
        requestAnimationFrame(bucle);
      }

      function parar() { animando = false; }

      leerColores();
      medir();

      // El texto del hero entra con una traslación y la tipografía puede
      // cargar después: hasta entonces las cajas medidas no son las buenas.
      setTimeout(medir, 1400);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);

      // Esto va antes de salir con movimiento reducido: el fotograma fijo tiene
      // que seguir el ancho de la ventana y los colores del tema, o se queda
      // como estaba al cargar.
      window.addEventListener('resize', function () { medir(); pintar(performance.now()); });

      // El interruptor de tema cambia los tokens: hay que releerlos y, si el
      // lienzo está quieto, volver a pintarlo con los colores nuevos.
      var alCambiarTema = function () { leerColores(); if (!animando) pintar(0); };
      new MutationObserver(alCambiarTema).observe(document.documentElement, {
        attributes: true, attributeFilter: ['data-theme']
      });
      if (window.matchMedia) {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        if (mq.addEventListener) mq.addEventListener('change', alCambiarTema);
      }

      if (reduceMotion) return;   // un fotograma fijo y nada más

      if (finePointer) {
        hero.addEventListener('pointermove', function (e) {
          var r = hero.getBoundingClientRect();
          raton.x = e.clientX - r.left;
          raton.y = e.clientY - r.top;
          if (raton.dx < -1000) { raton.dx = raton.x; raton.dy = raton.y; }
        });
        hero.addEventListener('pointerleave', function () {
          raton.x = -9999; raton.y = -9999;
        });
      }

      // Fuera de pantalla no se dibuja nada.
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entradas) {
          visible = entradas[0].isIntersecting;
          if (visible) arrancar(); else parar();
        }, { threshold: 0 }).observe(hero);
      } else {
        arrancar();
      }
    }());
  }

  /* ============================================================
     Copiar el correo: para quien no tiene un programa de correo
     que abra el mailto (Gmail u Outlook en el navegador)
     ============================================================ */
  document.querySelectorAll('.copiar-mail').forEach(function (boton) {
    var texto = boton.querySelector('.copiar-mail__texto');
    var original = texto.textContent;
    var espera;
    function copiar(valor) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(valor).catch(function () { return copiarViejo(valor); });
      }
      return copiarViejo(valor);
    }
    function copiarViejo(valor) {
      return new Promise(function (ok, ko) {
        var campo = document.createElement('textarea');
        campo.value = valor;
        campo.setAttribute('readonly', '');
        campo.style.position = 'fixed';
        campo.style.opacity = '0';
        document.body.appendChild(campo);
        campo.select();
        var hecho = document.execCommand('copy');
        campo.remove();
        if (hecho) ok(); else ko();
      });
    }
    boton.addEventListener('click', function () {
      copiar(boton.dataset.copiar).then(function () {
        boton.dataset.copiado = 'true';
        texto.textContent = 'Copiado';
      }, function () {
        texto.textContent = boton.dataset.copiar;
      });
      clearTimeout(espera);
      espera = setTimeout(function () {
        boton.dataset.copiado = 'false';
        texto.textContent = original;
      }, 2000);
    });
  });

  /* ============================================================
     Botón flotante: aparece al pasar el hero
     ============================================================ */
  var fab = document.getElementById('fab');
  if (fab) {
    var contacto = document.getElementById('contacto');
    /* En la portada baja a la sección; en fichas y artículos abre ese mismo
       bloque en una modal, sin sacar a nadie de lo que estaba leyendo. */
    var modal = document.getElementById('contacto-modal');
    if (modal) {
      fab.setAttribute('aria-haspopup', 'dialog');
      modal.querySelector('.contacto-modal__cerrar').addEventListener('click', function () { modal.close(); });
      modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
      modal.addEventListener('close', function () { fab.focus(); });
      /* Esc ya cierra el <dialog> nativo, pero Chrome lo ignora si la modal se
         abrió sin gesto reciente; así cierra siempre. */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.open) modal.close();
      });
    }
    fab.addEventListener('click', function () {
      if (contacto) contacto.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      else if (modal && modal.showModal) modal.showModal();
      else {
        var hablemos = document.querySelector('a[href$="#contacto"]');
        window.location.href = hablemos ? hablemos.href : '/#contacto';
      }
    });

    var fabTicking = false;
    function fabScroll() {
      if (fabTicking) return;
      fabTicking = true;
      requestAnimationFrame(function () {
        var cerca = contacto
          ? contacto.getBoundingClientRect().top < window.innerHeight * 1.2
          : false;
        fab.dataset.visible = String(window.scrollY > window.innerHeight * 0.75 && !cerca);
        fabTicking = false;
      });
    }
    fabScroll();
    window.addEventListener('scroll', fabScroll, { passive: true });
  }
})();

/* ============================================================
   Lo que flota se detiene sobre el pie
   ------------------------------------------------------------
   El menú lateral de artículos y fichas y el botón «Hablemos» son fijos:
   flotan sobre la ventana y no saben dónde termina la página, así que al
   llegar al final el pie les quedaba debajo. Aquí se mide cuánto pie se ve y
   se le pasa al CSS: en pantalla ancha el panel del menú se acorta hasta
   quedar justo encima; el botón del menú en pantalla pequeña y «Hablemos» se
   levantan. Depende del alto de la ventana y del número de apartados, por
   eso fallaba solo en algunas resoluciones.
   ============================================================ */
(function () {
  'use strict';

  var pie = document.querySelector('.footer');
  var menu = document.querySelector('.menu');
  var panel = menu && menu.querySelector('.menu__panel');
  var fab = document.getElementById('fab');
  if (!pie || (!menu && !fab)) return;

  var AIRE = 16;      // px de aire entre lo que flota y el pie
  var MINIMO = 112;   // px: por debajo de esto un panel ya no sirve
  var esRail = window.matchMedia('(min-width: 64rem)');
  var pendiente = false;

  /* Con el panel más corto no cabe todo. Al llegar al pie lo que importa es el
     final —los últimos apartados y lo que queda de lectura—, así que el panel
     se alinea por abajo y solo sube si con eso se sale el apartado activo. Sin
     animar, porque esto se recalcula en cada fotograma del scroll. */
  function verActivo() {
    if (panel.scrollHeight <= panel.clientHeight + 1) return;
    panel.scrollTop = panel.scrollHeight - panel.clientHeight;
    var a = panel.querySelector('.indice__a[aria-current="true"]');
    if (!a) return;
    var p = panel.getBoundingClientRect();
    var r = a.getBoundingClientRect();
    if (r.top < p.top) panel.scrollTop -= p.top - r.top + 8;
  }

  function ajustar() {
    pendiente = false;
    var topePie = pie.getBoundingClientRect().top;
    var visible = window.innerHeight - topePie;          // píxeles de pie a la vista
    var sube = visible > 0 ? (visible + AIRE).toFixed(1) + 'px' : '';

    /* «Hablemos» va anclado abajo a la derecha: se sube lo que el pie tapa. */
    if (fab) {
      if (sube) fab.style.setProperty('--alza', sube);
      else fab.style.removeProperty('--alza');
    }
    if (!menu) return;

    if (visible <= 0) {
      menu.style.removeProperty('--alza');
      menu.style.removeProperty('--libre');
      return;
    }
    if (esRail.matches) {
      /* Panel anclado arriba: su borde superior no se mueve, así que el alto
         que le queda es lo que hay hasta el pie. */
      menu.style.removeProperty('--alza');
      var libre = topePie - AIRE - panel.getBoundingClientRect().top;
      menu.style.setProperty('--libre', Math.max(libre, MINIMO).toFixed(1) + 'px');
      verActivo();
    } else {
      /* Botón anclado abajo: se sube igual que «Hablemos». */
      menu.style.removeProperty('--libre');
      menu.style.setProperty('--alza', sube);
    }
  }

  function pedir() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(ajustar);
  }

  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir);
  window.addEventListener('load', pedir);
  if (esRail.addEventListener) esRail.addEventListener('change', pedir);
  ajustar();
})();

/* ============================================================
   El arte de la portada responde al cursor
   ------------------------------------------------------------
   Tres cosas, todas con el cursor y ninguna necesaria para entender la página:
   1) Paralaje. La «M» y sus figuras son capas (.arte__capa) que se desplazan un
      poco con el cursor, cada una a su ritmo, para que la composición tenga
      profundidad. Aquí solo se mide dónde está el cursor dentro del hero y se
      escribe como --px y --py (de -1 a 1) en .hero__arte; cuánto se mueve cada
      capa lo decide el CSS. También de ahí sale hacia dónde cae el fondo de la
      letra en 3D.
   2) El cursor de Marc va hacia el tuyo mientras lo tienes sobre la composición
      (--dx y --dy: cuánto se aleja de su sitio), como en un archivo compartido.
   3) Cada vez que tu cursor entra, el brillo vuelve a cruzar la letra.
   Sin cursor (táctil) o con movimiento reducido no hace nada.
   ============================================================ */
(function () {
  'use strict';

  var arte = document.querySelector('[data-arte]');
  var hero = document.getElementById('inicio');
  if (!arte || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var dibujo = arte.querySelector('.arte');
  var VB_W = 640;
  var VB_H = 620;
  /* Dónde está el cursor de Marc en reposo (la punta de la flecha). */
  var REPOSO_X = 566;
  var REPOSO_Y = 160;

  var px = 0;
  var py = 0;
  var dx = 0;
  var dy = 0;
  var pendiente = false;
  /* Cuenta desde la carga: el brillo de la entrada (2,7 s) no lo pisa el del cursor. */
  var ultimoBrillo = Date.now();

  function pintar() {
    pendiente = false;
    arte.style.setProperty('--px', px.toFixed(3));
    arte.style.setProperty('--py', py.toFixed(3));
    arte.style.setProperty('--dx', dx.toFixed(1));
    arte.style.setProperty('--dy', dy.toFixed(1));
  }
  function pedir() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(pintar);
  }
  function limitar(v, min, max) { return Math.min(max, Math.max(min, v)); }

  hero.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = hero.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    py = ((e.clientY - r.top) / r.height - 0.5) * 2;

    /* El cursor de Marc solo sigue al tuyo si lo tienes sobre la composición
       (o justo al lado); lejos, vuelve a su sitio. Se coloca un poco por
       detrás y por debajo del tuyo, para no taparlo. */
    if (dibujo) {
      var d = dibujo.getBoundingClientRect();
      var sx = (e.clientX - d.left) / d.width * VB_W;
      var sy = (e.clientY - d.top) / d.height * VB_H;
      if (sx > -70 && sx < VB_W + 70 && sy > -70 && sy < VB_H + 70) {
        dx = limitar(sx + 26, 40, 556) - REPOSO_X;
        dy = limitar(sy + 18, 60, 566) - REPOSO_Y;
      } else {
        dx = 0;
        dy = 0;
      }
    }
    pedir();
  }, { passive: true });

  hero.addEventListener('pointerleave', function () {
    px = 0;
    py = 0;
    dx = 0;
    dy = 0;
    pedir();
  });

  /* El brillo: se relanza quitando y poniendo la clase, con una lectura del
     layout entre medias para que el navegador vea el cambio. No más de una vez
     cada cinco segundos, para que sea un detalle y no un tic. */
  if (dibujo) {
    arte.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'touch') return;
      var ahora = Date.now();
      if (ahora - ultimoBrillo < 5000) return;
      ultimoBrillo = ahora;
      dibujo.classList.remove('arte--brilla');
      void dibujo.getBoundingClientRect();
      dibujo.classList.add('arte--brilla');
    });
    dibujo.addEventListener('animationend', function (e) {
      if (e.animationName === 'arte-brillo-2') dibujo.classList.remove('arte--brilla');
    });
  }
})();

/* ============================================================
   La medida de la selección cuenta hasta su valor
   ------------------------------------------------------------
   La etiqueta «480 × 364» de la caja de selección sale en la entrada y sus
   números suben desde cero, como cuando se arrastra un asa. Empieza cuando el
   hero recibe .overture (la etiqueta aparece a los 2,1 s). Sin JS o con menos
   movimiento se queda con su valor final, que es el que trae el HTML.
   ============================================================ */
(function () {
  'use strict';

  var etiqueta = document.querySelector('.arte__medida text');
  var hero = document.getElementById('inicio');
  if (!etiqueta || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var final = etiqueta.textContent;
  var cifras = final.match(/(\d+)\s*×\s*(\d+)/);
  if (!cifras) return;
  var ancho = parseInt(cifras[1], 10);
  var alto = parseInt(cifras[2], 10);

  etiqueta.textContent = '0 × 0';

  var contado = false;
  function contar() {
    if (contado) return;
    contado = true;
    var inicio = null;
    var duracion = 950;
    function paso(t) {
      if (inicio === null) inicio = t;
      var k = Math.min(1, (t - inicio) / duracion);
      var e = 1 - Math.pow(1 - k, 3);
      etiqueta.textContent = Math.round(ancho * e) + ' × ' + Math.round(alto * e);
      if (k < 1) window.requestAnimationFrame(paso);
      else etiqueta.textContent = final;
    }
    window.requestAnimationFrame(paso);
  }

  function arrancar() { window.setTimeout(contar, 2150); }
  if (hero.classList.contains('overture')) {
    arrancar();
  } else {
    var vigia = new MutationObserver(function () {
      if (hero.classList.contains('overture')) { vigia.disconnect(); arrancar(); }
    });
    vigia.observe(hero, { attributes: true, attributeFilter: ['class'] });
    /* Por si la clase nunca llega: a los 6 s se deja el valor final. */
    window.setTimeout(function () { vigia.disconnect(); contar(); }, 6000);
  }
})();
