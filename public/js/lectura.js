/* ============================================================
   lectura.js — comportamiento del artículo
   ------------------------------------------------------------
   El texto y el menú los escribe Astro al compilar. Aquí queda
   solo lo que depende de la ventana: cuánto queda por leer, qué
   apartado tienes delante y dónde se pone la marca del raíl.
   ============================================================ */
(function () {
  'use strict';

  var post = document.getElementById('post');
  if (!post) return;

  var cuerpo = post.querySelector('.post__cuerpo');
  var menu = post.querySelector('.menu');
  var tirador = menu && menu.querySelector('.menu__tirador');
  var panel = menu && menu.querySelector('.menu__panel');
  var esRail = window.matchMedia('(min-width: 64rem)');

  /* Los minutos declarados por el propio artículo: el HTML ya los trae
     escritos, así que se leen de ahí en vez de repetirlos aquí. */
  var cifraPanel = post.querySelector('.menu__n strong');
  var cifraAnillo = post.querySelector('.menu__cifra');
  var totalMin = cifraAnillo ? parseInt(cifraAnillo.textContent, 10) : 0;
  var sufijo = cifraPanel && cifraPanel.nextSibling;

  /* ---------- Abrir y cerrar (solo en estrecho) ---------- */
  if (menu && tirador && panel) {
    var abrir = function (v) {
      menu.dataset.abierto = v ? 'true' : 'false';
      tirador.setAttribute('aria-expanded', v ? 'true' : 'false');
      var activo = v && panel.querySelector('.indice__a[aria-current="true"]');
      if (activo) window.requestAnimationFrame(function () { seguirEnPanel(activo); });
    };

    tirador.addEventListener('click', function () {
      abrir(menu.dataset.abierto !== 'true');
    });

    document.addEventListener('click', function (e) {
      if (esRail.matches) return;
      if (menu.dataset.abierto === 'true' && !menu.contains(e.target)) abrir(false);
    });

    document.addEventListener('keydown', function (e) {
      if (esRail.matches) return;
      if (e.key === 'Escape' && menu.dataset.abierto === 'true') {
        abrir(false);
        tirador.focus();
      }
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a') && !esRail.matches) abrir(false);
    });

    if (esRail.addEventListener) {
      esRail.addEventListener('change', function () { abrir(false); });
    }
  }

  /* ---------- Apartado activo ---------- */
  var lista = post.querySelector('.indice__lista');
  var indice = post.querySelector('.indice');
  var marca = post.querySelector('.indice__marca');
  var barra = post.querySelector('.menu__barra-i');

  var enlaces = {};
  var titulares = [];

  if (lista) {
    lista.querySelectorAll('.indice__a').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var h = document.getElementById(id);
      if (!h) return;
      enlaces[id] = a;
      titulares.push(h);
    });
  }

  function limitesDelRail() {
    var puntos = lista ? lista.querySelectorAll('.indice__a') : [];
    if (!puntos.length) return null;
    var centro = parseFloat(
      window.getComputedStyle(puntos[0], '::before').getPropertyValue('inset-block-start'));
    if (isNaN(centro)) return null;
    centro += 4;                                   /* el punto mide 8px */
    return {
      centro: centro,
      alto: puntos[0].offsetTop + centro,
      bajo: puntos[puntos.length - 1].offsetTop + centro
    };
  }

  function ajustaRail() {
    var lim = limitesDelRail();
    if (!lim || !lista) return;
    lista.style.setProperty('--rail-a', lim.alto + 'px');
    lista.style.setProperty('--rail-h', (lim.bajo - lim.alto) + 'px');
  }

  /* El tramo de acento va del primer punto al punto del apartado en el que
     estás, no de borde a borde de su caja: así los dos extremos caen siempre
     sobre un circulito y no en el hueco entre dos, que con los títulos de
     varias líneas quedaba a la deriva. */
  function situarMarca(a) {
    if (!marca || !a || !a.offsetHeight) return;
    var lim = limitesDelRail();
    if (!lim) return;
    var fin = Math.min(Math.max(a.offsetTop + lim.centro, lim.alto), lim.bajo);
    marca.style.setProperty('--marca-y', lim.alto + 'px');
    marca.style.setProperty('--marca-h', (fin - lim.alto) + 'px');
    if (indice) indice.dataset.marca = 'on';
  }

  /* Si la lista no cabe entera en el panel, el apartado activo no se sale
     de la vista: el panel se desplaza lo justo para enseñarlo. */
  var panelLectura = post.querySelector('.menu__panel');
  function seguirEnPanel(a) {
    if (!panelLectura || panelLectura.scrollHeight <= panelLectura.clientHeight + 1) return;
    var p = panelLectura.getBoundingClientRect();
    var r = a.getBoundingClientRect();
    if (r.top >= p.top && r.bottom <= p.bottom) return;
    panelLectura.scrollTo({
      top: panelLectura.scrollTop + (r.top - p.top) - p.height / 3,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }

  /* Los titulares son elementos finos: vigilarlos con IntersectionObserver
     deja el menú sin marcar en cuanto saltas o desplazas rápido. Con la
     posición basta: el apartado activo es el último que ya ha pasado. */
  function marcarApartado() {
    if (!titulares.length) return;
    var limite = window.innerHeight * 0.28;
    var actual = null;
    titulares.forEach(function (h) {
      if (h.getBoundingClientRect().top <= limite) actual = h;
    });

    if (!actual) {
      Object.keys(enlaces).forEach(function (id) {
        enlaces[id].removeAttribute('aria-current');
      });
      if (indice) indice.dataset.marca = 'off';
      return;
    }

    var a = enlaces[actual.id];
    if (a && a.getAttribute('aria-current') !== 'true') {
      Object.keys(enlaces).forEach(function (id) {
        enlaces[id].removeAttribute('aria-current');
      });
      a.setAttribute('aria-current', 'true');
      seguirEnPanel(a);
    }
    situarMarca(a);
  }

  /* ---------- Cuánto queda ---------- */
  var pendiente = false;

  function actualizar() {
    if (pendiente || !cuerpo) return;
    pendiente = true;
    window.requestAnimationFrame(function () {
      var caja = cuerpo.getBoundingClientRect();
      var recorrido = cuerpo.offsetHeight - window.innerHeight;
      var leido = recorrido > 0
        ? Math.min(1, Math.max(0, -caja.top / recorrido))
        : (caja.top < 0 ? 1 : 0);

      if (barra) barra.style.transform = 'scaleX(' + leido.toFixed(4) + ')';

      var quedan = Math.ceil(totalMin * (1 - leido));
      if (cifraAnillo) cifraAnillo.textContent = String(quedan);
      if (cifraPanel) {
        if (quedan > 0) {
          cifraPanel.textContent = quedan + ' min';
          if (sufijo) sufijo.textContent = ' por delante';
        } else {
          cifraPanel.textContent = 'Final';
          if (sufijo) sufijo.textContent = ' del artículo';
        }
      }

      marcarApartado();
      pendiente = false;
    });
  }

  ajustaRail();
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
  window.addEventListener('resize', function () { ajustaRail(); actualizar(); });
})();
