/* ============================================================
   lectura.js — comportamiento del artículo
   ------------------------------------------------------------
   El texto y el menú los escribe Astro al compilar. Aquí queda
   solo lo que depende de la ventana: cuánto queda por leer y qué
   apartado tienes delante.
   ============================================================ */
(function () {
  'use strict';

  var post = document.getElementById('post');
  if (!post) return;

  var cuerpo = post.querySelector('.post__cuerpo');
  var menu = post.querySelector('.menu');
  var tirador = menu && menu.querySelector('.menu__tirador');
  var panel = menu && menu.querySelector('.menu__panel');

  /* Los minutos declarados por el propio artículo: el HTML ya los trae
     escritos, así que se leen de ahí en vez de repetirlos aquí. */
  var cifraPanel = post.querySelector('.menu__n strong');
  var cifraAnillo = post.querySelector('.menu__cifra');
  var totalMin = cifraAnillo ? parseInt(cifraAnillo.textContent, 10) : 0;
  var sufijo = cifraPanel && cifraPanel.nextSibling;

  /* Abrir y cerrar el menú, el raíl y su tramo de acento son los mismos que
     en las fichas y los lleva main.js. Aquí, al abrirlo en estrecho, el panel
     enseña el apartado en el que estás (main.js ya ha cambiado data-abierto:
     su oyente va antes que este). */
  if (tirador && panel) {
    tirador.addEventListener('click', function () {
      if (menu.dataset.abierto !== 'true') return;
      var activo = panel.querySelector('.indice__a[aria-current="true"]');
      if (activo) window.requestAnimationFrame(function () { seguirEnPanel(activo); });
    });
  }

  /* ---------- Apartado activo ---------- */
  var lista = post.querySelector('.indice__lista');
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

  /* Si la lista no cabe entera en el panel, el apartado activo no se sale
     de la vista: el panel se desplaza lo justo para enseñarlo. */
  function seguirEnPanel(a) {
    if (!panel || panel.scrollHeight <= panel.clientHeight + 1) return;
    var p = panel.getBoundingClientRect();
    var r = a.getBoundingClientRect();
    if (r.top >= p.top && r.bottom <= p.bottom) return;
    panel.scrollTo({
      top: panel.scrollTop + (r.top - p.top) - p.height / 3,
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

  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
  window.addEventListener('resize', actualizar);
})();
