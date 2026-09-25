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
     Por defecto la web siempre es clara (lo fija el script is:inline del
     <head>, antes de pintar, pase lo que pase en el sistema); el botón
     cambia a oscura y lo recuerda para la próxima visita. */
  var toggle = document.getElementById('theme-toggle');
  var metaTema = document.getElementById('meta-tema');

  function currentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('tema', next); } catch (e) {}
      if (metaTema) metaTema.content = next === 'dark' ? '#000000' : '#ffffff';
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

  /* Ver la nota junto a [data-desplazando] en styles.css: en iOS, repintar
     el cristal de la barra en cada fotograma de la inercia del scroll (la
     que sigue cuando ya se ha soltado el dedo) es lo que hace que se sienta
     descontrolado. Va en su propio listener, aparte del de arriba, para no
     marcarlo también en la llamada de inicio: solo cuenta el scroll de
     verdad. Se quita a los 150ms sin scroll nuevo. */
  if (nav) {
    var quietoTras = null;
    window.addEventListener('scroll', function () {
      nav.dataset.desplazando = 'true';
      clearTimeout(quietoTras);
      quietoTras = setTimeout(function () { nav.dataset.desplazando = 'false'; }, 150);
    }, { passive: true });
  }

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
  var cabecera = document.getElementById('nav');

  /* Con el panel abierto, todo lo que no es la cabecera queda tapado por el
     fondo difuminado: sin esto, tabulando después del último enlace («cerrar
     menú» incluido) el foco se escapaba a lo que hay detrás —por ejemplo el
     «‹ Portafolio» de la ficha—, invisible bajo la capa. inert lo saca del
     foco y del lector de pantalla mientras el menú está abierto, igual que ya
     hace el vídeo ampliado en las fichas (ver aislar() en caso.js). */
  var fondoAislado = [];
  function aislarFondo() {
    Array.prototype.forEach.call(document.body.children, function (nodo) {
      if (nodo !== cabecera && nodo !== fondoMenu && !nodo.inert) {
        nodo.inert = true;
        fondoAislado.push(nodo);
      }
    });
  }
  function liberarFondo() {
    fondoAislado.forEach(function (nodo) { nodo.inert = false; });
    fondoAislado = [];
  }

  function closePanel() {
    if (!burger || !panel) return;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    panel.dataset.abierto = 'false';
    if (fondoMenu) fondoMenu.dataset.abierto = 'false';
    document.documentElement.classList.remove('sin-scroll');
    liberarFondo();
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
      if (open) liberarFondo(); else aislarFondo();
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) closePanel();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });

    window.matchMedia('(min-width: 48rem)').addEventListener('change', closePanel);
  }

  /* ---------- Revelado progresivo al entrar en pantalla ----------
     Cada .rise aparece al llegar a él (.is-in). Antes, a los grupos se les
     reparten las piezas para que no entren de un bloque: la etiqueta, el
     titular palabra a palabra y lo demás escalonado. Aquí solo se marca qué
     pieza es cada cosa y cuándo le toca (--d); cómo se mueve lo dice el CSS
     (sección 11 de styles.css). */
  var revealables = document.querySelectorAll('.rise');

  var PASO_PALABRA = 38;  // ms entre palabra y palabra del titular
  var PASO_PIEZA = 80;    // ms entre pieza y pieza de un grupo (--mov-paso en tokens.css)
  var MAX_PIEZAS = 6;     // de la sexta en adelante, todas a la vez: nadie espera tanto

  /* Lo que main.js anima con Motion entra igual que lo que anima el CSS: el
     mismo tiempo (--dur-entrada), la misma curva (--ease-emphasized-decel) y
     la misma subida (--mov-subida). */
  var ENTRADA = { duration: 0.76, ease: [0.05, 0.7, 0.1, 1] };
  var SUBIDA = 'translateY(24px)';

  /* La fila de entradas. Lo que aparece a la vez no arranca a la vez: cada
     bloque espera su turno, en el orden de la página, hasta que el anterior
     ha empezado a colocar sus piezas. Así una sección se lee de arriba abajo
     (primero el titular, luego el cuerpo) y no se mueve todo a la vez. Nadie
     espera más de ESPERA_MAX: bajando deprisa, lo que ya está en pantalla no
     puede quedarse en blanco. Devuelve cuántos ms le toca esperar a quien
     llega; «largo» es cuánto tarda él en dejar paso al siguiente. */
  var ESPERA_MAX = 600;
  var HUECO = 120;
  var libreDesde = 0;
  function turno(largo) {
    var ahora = performance.now();
    var empieza = Math.min(Math.max(ahora, libreDesde), ahora + ESPERA_MAX);
    libreDesde = empieza + Math.max(HUECO, largo || 0);
    return Math.round(empieza - ahora);
  }

  /* Lo que anima Motion dentro de un bloque .rise (los puestos, los pasos
     del método, los idiomas) no se vigila por su cuenta: entra con su
     bloque, cuando a este le toca, y recibe el retraso que le ha dado la
     fila. Si no hay bloque o ya ha entrado, arranca ya. */
  function alEntrar(el, fn) {
    var bloque = el.closest('.rise');
    if (!bloque || bloque.classList.contains('is-in') ||
        reduceMotion || !('IntersectionObserver' in window)) { fn(0); return; }
    (bloque.__alEntrar = bloque.__alEntrar || []).push(fn);
  }

  function retrasar(el, ms) { el.style.setProperty('--d', Math.round(ms) + 'ms'); }

  function hijos(el) { return el ? Array.prototype.slice.call(el.children) : []; }

  /* Las piezas de un grupo, una detrás de otra a partir de «desde». Devuelve
     cuándo empieza la última. */
  function escalonar(piezas, desde) {
    var t = desde;
    piezas.forEach(function (pieza, i) {
      t = desde + Math.min(i, MAX_PIEZAS) * PASO_PIEZA;
      pieza.classList.add('escalon');
      retrasar(pieza, t);
    });
    return t;
  }

  /* Parte el titular en palabras para que suban una a una. Cada palabra va en
     un <span> en bloque en línea (el texto se sigue partiendo en renglones por
     los espacios, que se quedan fuera). Lo que ya viene envuelto en otra
     etiqueta —«puente», con su trazo— entra entero, como una palabra más; si
     lleva varias palabras, se parte por dentro. Para los lectores de pantalla
     el titular se sigue leyendo de un tirón: el texto completo va en su
     aria-label y los trozos se ocultan. Devuelve cuándo acaba de empezar. */
  function partirEnPalabras(titulo, desde) {
    var n = 0;
    var texto = titulo.textContent.replace(/\s+/g, ' ').trim();

    function palabra(contenido) {
      var span = document.createElement('span');
      span.className = 'palabra';
      span.setAttribute('aria-hidden', 'true');
      retrasar(span, desde + n * PASO_PALABRA);
      n++;
      if (typeof contenido === 'string') span.textContent = contenido;
      else span.appendChild(contenido);
      return span;
    }

    function partir(nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (hijo) {
        if (hijo.nodeType === 3) {
          var frag = document.createDocumentFragment();
          hijo.textContent.split(/(\s+)/).forEach(function (trozo) {
            if (!trozo) return;
            frag.appendChild(/^\s+$/.test(trozo) ? document.createTextNode(trozo) : palabra(trozo));
          });
          nodo.replaceChild(frag, hijo);
        } else if (hijo.nodeType === 1 && hijo.tagName !== 'BR') {
          if (/\S\s+\S/.test(hijo.textContent)) {
            partir(hijo);
          } else {
            var sitio = document.createComment('');
            nodo.replaceChild(sitio, hijo);
            nodo.replaceChild(palabra(hijo), sitio);
          }
        }
      });
    }

    partir(titulo);
    titulo.setAttribute('aria-label', texto);
    return desde + n * PASO_PALABRA;
  }

  /* Una cabecera: la etiqueta se escribe, el titular sube palabra a palabra y
     lo demás (la entradilla, el retrato…) llega detrás. */
  function revelarCabecera(el) {
    var t = 0;
    var etiqueta = el.querySelector(':scope > .eyebrow');
    var titulo = el.querySelector(':scope > h2');
    if (etiqueta) {
      var texto = document.createElement('span');
      texto.className = 'eyebrow__txt';
      while (etiqueta.firstChild) texto.appendChild(etiqueta.firstChild);
      etiqueta.appendChild(texto);
      retrasar(texto, 0);
      t = 140;
    }
    if (titulo) t = partirEnPalabras(titulo, t) + 120;
    return escalonar(hijos(el).filter(function (h) { return h !== etiqueta && h !== titulo; }), t);
  }

  /* Un capítulo de una ficha: su número, el titular por palabras y luego los
     párrafos, los datos de la ficha y las cifras. Las láminas no: son .rise
     por su cuenta y se destapan al llegar a cada una. */
  function revelarCapitulo(el) {
    var t = 0;
    var numero = el.querySelector(':scope > .bloque__head > .bloque__n');
    var titulo = el.querySelector(':scope > .bloque__head > .bloque__t');
    if (numero) { numero.classList.add('escalon'); retrasar(numero, 0); t = 90; }
    if (titulo) t = partirEnPalabras(titulo, t) + 120;
    var piezas = [];
    ['.bloque__texto', '.ficha', '.cifras'].forEach(function (sel) {
      piezas = piezas.concat(hijos(el.querySelector(':scope > ' + sel)));
    });
    return escalonar(piezas, t);
  }

  /* Reparte las piezas y apunta en el bloque cuánto tarda en colocarlas
     (__largo): es lo que el siguiente de la fila le deja. */
  function coreografiar(el) {
    var largo = -1;
    if (el.matches('.section-head')) largo = revelarCabecera(el);
    else if (el.matches('.contact') && el.querySelector('.contact__inner')) largo = revelarCabecera(el.querySelector('.contact__inner'));
    else if (el.matches('.bloque')) largo = revelarCapitulo(el);
    else if (el.matches('.articles, .about__body')) largo = escalonar(hijos(el), 0);
    else if (el.matches('.carrusel') && el.querySelector('.carrusel__pista')) largo = escalonar(hijos(el.querySelector('.carrusel__pista')), 0);
    if (largo < 0) return;
    el.classList.add('rise--grupo');
    el.__largo = largo;
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    /* Si algo del reparto falla, el bloque entra entero como siempre: un error
       aquí no puede dejar el contenido oculto. */
    revealables.forEach(function (el) {
      try { coreografiar(el); } catch (e) { el.classList.remove('rise--grupo'); }
    });
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        /* Su turno en la fila sustituye al retraso que traía escrito. */
        var espera = turno(entry.target.__largo);
        entry.target.style.setProperty('--delay', espera + 'ms');
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
        (entry.target.__alEntrar || []).forEach(function (fn) { fn(espera); });
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

  /* La tarjeta no salta a cada movimiento del ratón: persigue su inclinación
     y su elevación (--tz, de 0 a 1) fotograma a fotograma, siempre con la
     misma suavidad, y al salir vuelve a su sitio igual. Antes cada movimiento
     reiniciaba una transición de CSS y la tarjeta iba a tirones. */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.work[data-tilt]').forEach(function (card) {
      var meta = { rx: 0, ry: 0, tz: 0 };
      var ahora = { rx: 0, ry: 0, tz: 0 };
      var ultimo = 0;
      var corriendo = false;

      function paso(t) {
        /* Seguimiento por tiempo y no por fotograma: igual en 60 que en 120 Hz. */
        var k = 1 - Math.exp(-Math.min(64, t - (ultimo || t)) / 90);
        ultimo = t;
        var quieto = true;
        ['rx', 'ry', 'tz'].forEach(function (c) {
          var d = meta[c] - ahora[c];
          if (Math.abs(d) > 0.005) { ahora[c] += d * k; quieto = false; } else { ahora[c] = meta[c]; }
        });
        card.style.setProperty('--rx', ahora.rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', ahora.ry.toFixed(2) + 'deg');
        card.style.setProperty('--tz', ahora.tz.toFixed(3));
        if (quieto) { corriendo = false; ultimo = 0; return; }
        requestAnimationFrame(paso);
      }
      function pedir() {
        if (corriendo) return;
        corriendo = true;
        requestAnimationFrame(paso);
      }

      card.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = card.getBoundingClientRect();
        meta.ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        meta.rx = (0.5 - (e.clientY - r.top) / r.height) * 5;
        meta.tz = 1;
        pedir();
      });
      card.addEventListener('pointerleave', function () {
        meta.rx = 0;
        meta.ry = 0;
        meta.tz = 0;
        pedir();
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

      /* Con el scroll entran con su bloque, justo detrás de las pestañas; al
         elegir la pestaña, entran ya, porque responden a un clic. */
      function entrar(retraso) {
        if (entrado || !pista.offsetParent) return;
        entrado = true;
        motion.animate(puestos,
          { opacity: [0, 1], transform: [SUBIDA, 'none'] },
          { delay: motion.stagger(PASO_PIEZA / 1000, { startDelay: (retraso || 0) / 1000 }),
            duration: ENTRADA.duration, ease: ENTRADA.ease });
      }

      puestos.forEach(function (puesto) { puesto.style.opacity = '0'; });
      alEntrar(pista, function (espera) { entrar(espera + 160); });
      pista.__entrar = function () { entrar(0); };

      /* Las etiquetas caen escalonadas al abrir un puesto. Este oyente va
         después del que cambia aria-expanded, así que ya está actualizado. */
      pista.addEventListener('click', function (e) {
        var cabecera = e.target.closest('.job__head');
        if (!cabecera || cabecera.getAttribute('aria-expanded') !== 'true') return;
        var chips = cabecera.closest('.job').querySelectorAll('.job__fold .chip');
        if (!chips.length) return;
        /* Caen mientras se abre el pliegue, con su misma curva. */
        motion.animate(chips,
          { opacity: [0, 1], transform: ['translateY(8px)', 'none'] },
          { delay: motion.stagger(0.035, { startDelay: 0.12 }), duration: 0.4, ease: [0.2, 0, 0, 1] });
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
      var dibujarTrazo = function (retraso) {
        if (trazado || !titulo.offsetParent) return;
        trazado = true;
        motion.animate(trazo, { '--trazo': [0, 1] },
          { duration: 0.65, delay: retraso, ease: [0.2, 0, 0, 1] });
      };
      /* Con el titular entrando palabra a palabra, el trazo se dibuja justo
         cuando «puente» acaba de llegar a su sitio, sea cuando sea. */
      var palabraPuente = trazo.closest('.palabra');
      if (palabraPuente) {
        palabraPuente.addEventListener('animationend', function (e) {
          if (e.target === palabraPuente) dibujarTrazo(0.05);
        });
      } else {
        motion.inView(titulo, function () { dibujarTrazo(0.25); }, { amount: 0.6 });
      }
    }
    pasos.forEach(function (paso) {
      paso.style.opacity = '0';
      paso.style.setProperty('--rail', '0');
    });

    alEntrar(sobreMi, function (espera) {
      if (visto || !sobreMi.offsetParent) return;
      visto = true;

      if (pasos.length) {
        /* Detrás de la pieza que los contiene (el bloque «Cómo trabajo», que
           entra escalonado con los párrafos); cada raíl crece cuando su paso
           ya está llegando. */
        var pieza = pasos[0].closest('.escalon');
        var dPieza = pieza ? parseFloat(pieza.style.getPropertyValue('--d')) || 0 : 0;
        espera = (espera + dPieza + 200) / 1000;
        motion.animate(pasos,
          { opacity: [0, 1], transform: [SUBIDA, 'none'] },
          { delay: motion.stagger(PASO_PIEZA / 1000, { startDelay: espera }),
            duration: ENTRADA.duration, ease: ENTRADA.ease });
        motion.animate(pasos, { '--rail': [0, 1] },
          { delay: motion.stagger(PASO_PIEZA / 1000, { startDelay: espera + 0.2 }),
            duration: ENTRADA.duration, ease: ENTRADA.ease });
      }
    });
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
      function entrar(retraso) {
        if (entrado || !lista.offsetParent) return;
        entrado = true;
        var espera = (retraso || 0) / 1000;
        var paso = PASO_PIEZA / 1000;
        motion.animate(filas,
          { opacity: [0, 1], transform: [SUBIDA, 'none'] },
          { delay: motion.stagger(paso, { startDelay: espera }),
            duration: ENTRADA.duration, ease: ENTRADA.ease });
        filas.forEach(function (fila, i) {
          var relleno = fila.querySelector('.lang__fill');
          if (!relleno) return;
          var pct = relleno.style.getPropertyValue('--pct') || '0%';
          motion.animate(relleno,
            { inlineSize: ['0%', pct] },
            { delay: espera + paso * i + 0.2, duration: ENTRADA.duration * 1.2, ease: ENTRADA.ease });
        });
      }

      filas.forEach(function (fila) { fila.style.opacity = '0'; });
      alEntrar(lista, function (espera) { entrar(espera + 160); });
      lista.__entrar = function () { entrar(0); };
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
   La entrada del arte: la pluma dibuja la «M»
   ------------------------------------------------------------
   Antes de salir en volumen, la letra se dibuja delante de ti: la pluma de
   Marc recorre su contorno, el trazo avanza con ella y cada punto de anclaje
   aparece cuando la pluma pasa por encima. Al cerrar el trazado, el relleno
   se derrama desde ese punto y la letra saca su fondo. Luego la medida de la
   selección cuenta hasta su valor, como cuando se arrastra un asa.
   Aquí va lo que el CSS no puede hacer solo (seguir el trazado, hacer crecer
   el recorte del relleno, contar); el resto lo hace styles.css con los mismos
   tiempos: si cambias unos, cambia los otros.
   Arranca cuando la portada empieza su entrada (.overture) y la composición
   está en pantalla; hasta entonces queda en pausa, sin nada a la vista. Sin
   JS o con menos movimiento se ve la letra terminada, como siempre.
   ============================================================ */
(function () {
  'use strict';

  var hero = document.getElementById('inicio');
  var arte = document.querySelector('[data-arte]');
  var dibujo = arte && arte.querySelector('.arte');
  if (!hero || !dibujo) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var trazo = dibujo.querySelector('.arte__trazo');
  var pluma = dibujo.querySelector('.arte__pluma');
  var inunda = dibujo.querySelector('.arte__inunda');
  var etiqueta = dibujo.querySelector('.arte__medida text');
  var nodos = Array.prototype.slice.call(dibujo.querySelectorAll('.arte__nodo'));
  if (!trazo || !pluma || !inunda || !trazo.getTotalLength) return;

  /* La letra se dibuja en su propio sistema; la pluma, en el del conjunto. Es el
     mismo translate + scale que lleva la letra en el HTML. */
  var OX = 38.2;
  var OY = 122.9;
  var ESCALA = 0.90909;

  /* Los tiempos, en ms desde que arranca la entrada. */
  var TRAZO_EMPIEZA = 800;
  var TRAZO_DURA = 1700;
  var RELLENO_EMPIEZA = 2500;
  var RELLENO_DURA = 700;
  var MEDIDA_EMPIEZA = 3700;   // la etiqueta sale a los 3,65 s
  var MEDIDA_DURA = 950;
  var FIN = MEDIDA_EMPIEZA + MEDIDA_DURA;
  /* Cuándo acaba el brillo de la entrada: hasta entonces el cursor no lo relanza. */
  var FIN_BRILLO = 5600;

  var largo = trazo.getTotalLength();
  var radio = parseFloat(inunda.getAttribute('r')) || 820;
  var marcas = nodos.map(function (n) { return parseFloat(n.getAttribute('data-l')) || 0; });
  var puestos = 0;

  var medidaFinal = etiqueta ? etiqueta.textContent : '';
  var cifras = medidaFinal.match(/(\d+)\s*×\s*(\d+)/);
  var ancho = cifras ? parseInt(cifras[1], 10) : 0;
  var alto = cifras ? parseInt(cifras[2], 10) : 0;

  /* Punto de partida: la entrada puesta pero parada, nada dibujado, nada
     relleno y la medida a cero. */
  arte.classList.add('arte--entra', 'arte--pausa');
  trazo.style.strokeDasharray = largo + ' ' + largo;
  trazo.style.strokeDashoffset = largo;
  inunda.setAttribute('r', '0');
  if (cifras) etiqueta.textContent = '0 × 0';

  function limitar(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
  /* La pluma arranca, corre y frena al cerrar, como una mano. */
  function suave(k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function sale(k) { return 1 - Math.pow(1 - k, 3); }

  function dibujar(p) {
    var punto = trazo.getPointAtLength(largo * p);
    pluma.setAttribute('transform', 'translate(' +
      (OX + punto.x * ESCALA).toFixed(2) + ' ' + (OY + punto.y * ESCALA).toFixed(2) + ')');
    trazo.style.strokeDashoffset = (largo * (1 - p)).toFixed(2);
    while (puestos < nodos.length && marcas[puestos] <= p) {
      nodos[puestos].classList.add('arte__nodo--puesto');
      puestos++;
    }
  }

  function medir(k) {
    if (!cifras) return;
    etiqueta.textContent = k >= 1 ? medidaFinal
      : Math.round(ancho * k) + ' × ' + Math.round(alto * k);
  }

  var inicio = 0;
  function paso() {
    /* Todo sale del reloj, no de contar fotogramas: si la pestaña estaba en
       segundo plano, al volver la entrada está donde tiene que estar. */
    var t = performance.now() - inicio;
    if (t >= TRAZO_EMPIEZA) dibujar(suave(limitar((t - TRAZO_EMPIEZA) / TRAZO_DURA)));
    inunda.setAttribute('r', (radio * sale(limitar((t - RELLENO_EMPIEZA) / RELLENO_DURA))).toFixed(1));
    if (t >= MEDIDA_EMPIEZA) medir(sale(limitar((t - MEDIDA_EMPIEZA) / MEDIDA_DURA)));
    if (t < FIN) window.requestAnimationFrame(paso);
  }

  function arrancar() {
    inicio = performance.now();
    arte.setAttribute('data-fin-entrada', String(Date.now() + FIN_BRILLO));
    arte.classList.remove('arte--pausa');
    window.requestAnimationFrame(paso);
  }

  /* Dos condiciones: que la portada haya empezado su entrada y que la
     composición se vea (al menos la mitad). */
  var portadaLista = hero.classList.contains('overture');
  var aLaVista = !('IntersectionObserver' in window);
  function quizaArrancar() {
    if (!inicio && portadaLista && aLaVista) arrancar();
  }

  if (!portadaLista) {
    var vigia = new MutationObserver(function () {
      if (!hero.classList.contains('overture')) return;
      vigia.disconnect();
      portadaLista = true;
      quizaArrancar();
    });
    vigia.observe(hero, { attributes: true, attributeFilter: ['class'] });
    /* Por si la clase nunca llega: a los 6 s arranca igual. */
    window.setTimeout(function () {
      vigia.disconnect();
      portadaLista = true;
      quizaArrancar();
    }, 6000);
  }

  if (!aLaVista) {
    var ojo = new IntersectionObserver(function (entradas) {
      if (!entradas[0].isIntersecting) return;
      ojo.disconnect();
      aLaVista = true;
      quizaArrancar();
    }, { threshold: 0.5 });
    ojo.observe(arte);
  }

  quizaArrancar();
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
      Con los mismos valores el CSS inclina el conjunto hacia tu cursor.
   2) El cursor de Marc va hacia el tuyo mientras lo tienes sobre la composición
      (--dx y --dy: cuánto se aleja de su sitio), como en un archivo compartido.
      Y el lienzo se ilumina donde estás (se mueven los círculos de la luz;
      --luz la enciende).
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
  var luces = dibujo ? dibujo.querySelectorAll('.arte__luz circle') : [];
  var VB_W = 640;
  var VB_H = 620;
  /* Dónde está el cursor de Marc en reposo (la punta de la flecha). */
  var REPOSO_X = 566;
  var REPOSO_Y = 160;
  /* El lienzo va girado -4° alrededor de (320, 335): para poner la luz bajo tu
     cursor hay que deshacer ese giro. */
  var GIRO_COS = Math.cos(4 * Math.PI / 180);
  var GIRO_SIN = Math.sin(4 * Math.PI / 180);

  /* Dónde quiere estar cada cosa (meta) y dónde está (ahora). El cursor se
     suaviza aquí una sola vez, fotograma a fotograma, y de ahí salen todas las
     capas: así el conjunto se mueve como una pieza. Cada valor alcanza su meta
     con su constante de tiempo (TAU, en ms): el conjunto, todo con la misma;
     el cursor de Marc, algo más tarde, a propósito; la luz, pegada a ti. */
  var meta = { px: 0, py: 0, dx: 0, dy: 0, lx: 320, ly: 335, alza: 0 };
  var ahora = { px: 0, py: 0, dx: 0, dy: 0, lx: 320, ly: 335, alza: 0 };
  var TAU = { px: 160, py: 160, dx: 260, dy: 260, lx: 70, ly: 70, alza: 200 };
  var UMBRAL = { px: 0.001, py: 0.001, dx: 0.1, dy: 0.1, lx: 0.2, ly: 0.2, alza: 0.002 };
  /* Cuánto más sale la letra de su lienzo con el cursor encima. */
  var ALZA = 0.45;
  var luz = 0;
  var corriendo = false;
  var ultimo = 0;
  var ultimoBrillo = 0;

  function pintar() {
    arte.style.setProperty('--px', ahora.px.toFixed(3));
    arte.style.setProperty('--py', ahora.py.toFixed(3));
    arte.style.setProperty('--dx', ahora.dx.toFixed(1));
    arte.style.setProperty('--dy', ahora.dy.toFixed(1));
    arte.style.setProperty('--alza', (1 + ahora.alza * ALZA).toFixed(3));
    arte.style.setProperty('--luz', luz);
    var ox = ahora.lx - 320;
    var oy = ahora.ly - 335;
    var cx = (320 + ox * GIRO_COS - oy * GIRO_SIN).toFixed(1);
    var cy = (335 + ox * GIRO_SIN + oy * GIRO_COS).toFixed(1);
    for (var i = 0; i < luces.length; i++) {
      luces[i].setAttribute('cx', cx);
      luces[i].setAttribute('cy', cy);
    }
  }
  function paso(t) {
    /* Por tiempo y no por fotograma: igual en 60 que en 120 Hz. */
    var dt = Math.min(64, t - (ultimo || t));
    ultimo = t;
    var quieto = true;
    for (var c in meta) {
      var d = meta[c] - ahora[c];
      if (Math.abs(d) > UMBRAL[c]) {
        ahora[c] += d * (1 - Math.exp(-dt / TAU[c]));
        quieto = false;
      } else {
        ahora[c] = meta[c];
      }
    }
    pintar();
    if (quieto) { corriendo = false; ultimo = 0; return; }
    window.requestAnimationFrame(paso);
  }
  function pedir() {
    if (corriendo) return;
    corriendo = true;
    window.requestAnimationFrame(paso);
  }
  function limitar(v, min, max) { return Math.min(max, Math.max(min, v)); }

  hero.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = hero.getBoundingClientRect();
    meta.px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    meta.py = ((e.clientY - r.top) / r.height - 0.5) * 2;

    /* El cursor de Marc solo sigue al tuyo si lo tienes sobre la composición
       (o justo al lado); lejos, vuelve a su sitio. Se coloca un poco por
       detrás y por debajo del tuyo, para no taparlo. */
    if (dibujo) {
      var d = dibujo.getBoundingClientRect();
      var sx = (e.clientX - d.left) / d.width * VB_W;
      var sy = (e.clientY - d.top) / d.height * VB_H;
      if (sx > -70 && sx < VB_W + 70 && sy > -70 && sy < VB_H + 70) {
        meta.dx = limitar(sx + 26, 40, 556) - REPOSO_X;
        meta.dy = limitar(sy + 18, 60, 566) - REPOSO_Y;
        /* La luz aparece donde estás, sin cruzar el lienzo desde el sitio
           donde se apagó. */
        if (!luz) { ahora.lx = sx; ahora.ly = sy; }
        meta.lx = sx;
        meta.ly = sy;
        meta.alza = 1;
        luz = 1;
      } else {
        meta.dx = 0;
        meta.dy = 0;
        meta.alza = 0;
        luz = 0;
      }
    }
    pedir();
  }, { passive: true });

  hero.addEventListener('pointerleave', function () {
    meta.px = 0;
    meta.py = 0;
    meta.dx = 0;
    meta.dy = 0;
    meta.alza = 0;
    luz = 0;
    pedir();
  });

  /* El brillo: se relanza quitando y poniendo la clase, con una lectura del
     layout entre medias para que el navegador vea el cambio. No más de una vez
     cada cinco segundos, para que sea un detalle y no un tic. */
  if (dibujo) {
    arte.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'touch') return;
      var ahora = Date.now();
      /* Ni encima del brillo de la entrada (main.js apunta cuándo acaba) ni
         antes de que la letra esté hecha. */
      var finEntrada = parseInt(arte.getAttribute('data-fin-entrada'), 10) || 0;
      if (arte.classList.contains('arte--pausa') || ahora < finEntrada) return;
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
