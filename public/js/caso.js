/* ============================================================
   caso.js — comportamiento de la ficha de proyecto
   ------------------------------------------------------------
   El HTML lo escribe Astro al compilar. Aquí solo queda lo que
   no se puede saber hasta que la página está abierta: por qué
   sección vas, cuánto llevas recorrido y el vídeo a la carta.

   Antes este archivo también pintaba la ficha entera leyendo
   ?p=slug; ahora la página existe aunque esto no llegue.
   ============================================================ */
(function () {
  'use strict';

  var caso = document.getElementById('caso');
  if (!caso) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ampliaciones a pantalla completa ----------
     El prototipo y los vídeos se pueden ampliar hasta cubrir la ventana y se
     declaran modales (aria-modal). Declararlo no basta: el navegador no aísla
     el resto de la página por su cuenta, y con Tab el foco se iba a lo que
     quedaba debajo, tapado. `inert` saca del foco y del lector de pantalla
     todo lo que no es la ampliación mientras esté abierta. */
  var aislados = [];

  function aislar(marco) {
    var nodo = marco;
    while (nodo && nodo !== document.body) {
      var padre = nodo.parentNode;
      if (!padre || !padre.children) break;
      Array.prototype.forEach.call(padre.children, function (hermano) {
        if (hermano !== nodo && !hermano.inert) {
          hermano.inert = true;
          aislados.push(hermano);
        }
      });
      nodo = padre;
    }
  }

  function liberar() {
    aislados.forEach(function (nodo) { nodo.inert = false; });
    aislados = [];
  }

  /* Botón de ampliar para un marco con un <video> dentro: la modal cubre la
     ventana y una X (o Esc) devuelve la página. El vídeo no se recrea, así que
     si estaba reproduciéndose sigue igual al ampliar o al cerrar.
     `antes` (opcional) se ejecuta al pedir ampliar, por si el vídeo aún no
     está cargado. */
  var ICONO_AMPLIAR = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  var ICONO_CERRAR = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function conAmpliar(marco, antes) {
    marco.classList.add('clipvid');
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'clipvid__ampliar';
    var abierta = false;
    var pintar = function () {
      boton.setAttribute('aria-label', abierta ? 'Cerrar y volver a la página' : 'Ver el vídeo más grande');
      boton.title = abierta ? 'Cerrar' : 'Ampliar';
      boton.innerHTML = abierta ? ICONO_CERRAR : ICONO_AMPLIAR;
    };
    var conTecla = function (e) { if (e.key === 'Escape') cerrar(); };
    var abrir = function () {
      if (antes) antes();
      abierta = true;
      marco.classList.add('clipvid--modal');
      document.documentElement.classList.add('sin-scroll');
      aislar(marco);
      document.addEventListener('keydown', conTecla);
      pintar();
      boton.focus();
    };
    var cerrar = function () {
      abierta = false;
      marco.classList.remove('clipvid--modal');
      document.documentElement.classList.remove('sin-scroll');
      liberar();
      document.removeEventListener('keydown', conTecla);
      pintar();
      boton.focus();
    };
    boton.addEventListener('click', function () { if (abierta) cerrar(); else abrir(); });
    pintar();
    marco.appendChild(boton);
  }

  /* ---------- Menú lateral: abrir y cerrar ----------
     A partir de 64rem el panel vive desplegado y el tirador ni se dibuja;
     eso lo resuelve el CSS. Aquí solo hace falta el caso estrecho. */
  var menu = caso.querySelector('.menu');
  var tirador = menu && menu.querySelector('.menu__tirador');
  var panel = menu && menu.querySelector('.menu__panel');
  var esRail = window.matchMedia('(min-width: 64rem)');

  if (menu && tirador && panel) {
    var abrir = function (v) {
      menu.dataset.abierto = v ? 'true' : 'false';
      tirador.setAttribute('aria-expanded', v ? 'true' : 'false');
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

    /* Al saltar a una sección el menú estorba: en estrecho se cierra solo. */
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a') && !esRail.matches) abrir(false);
    });

    if (esRail.addEventListener) {
      esRail.addEventListener('change', function () { abrir(false); });
    }
  }

  /* ---------- Sección activa y avance ----------
     Las secciones se miran por posición y no con IntersectionObserver: son
     bloques altos y desiguales, y al saltar a un ancla ninguno está dentro de
     la banda en ese instante, así que el índice se quedaba sin marcar. La
     sección activa es la última que ya ha pasado. */
  var lista = caso.querySelector('.indice__lista');
  var indice = caso.querySelector('.indice');
  var marca = caso.querySelector('.indice__marca');
  var avance = caso.querySelector('.menu__avance');
  var barra = caso.querySelector('.menu__barra-i');
  var cifraAnillo = caso.querySelector('.menu__cifra');
  var cifraPanel = caso.querySelector('.menu__n strong');

  var enlaces = {};
  var bloques = [];

  if (lista) {
    lista.querySelectorAll('.indice__a').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var nodo = document.getElementById(id);
      if (!nodo) return;
      enlaces[id] = a;
      bloques.push({ id: id, nodo: nodo });
    });
  }

  /* El tramo de acento no puede salirse del raíl: en la primera y en la
     última entrada se recorta a la altura del punto, que es justo donde el
     raíl empieza y acaba. Sin esto asomaba un trozo de línea en el aire. */
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

  var pendiente = false;

  function actualizar() {
    if (pendiente || !bloques.length) return;
    pendiente = true;
    window.requestAnimationFrame(function () {
      var limite = window.innerHeight * 0.28;
      var actual = bloques[0];
      var posicion = 1;
      bloques.forEach(function (b, n) {
        if (b.nodo.getBoundingClientRect().top <= limite) {
          actual = b;
          posicion = n + 1;
        }
      });

      var recorrido = document.documentElement.scrollHeight - window.innerHeight;
      var leido = recorrido > 0
        ? Math.min(1, Math.max(0, window.scrollY / recorrido))
        : 0;
      if (avance) avance.style.strokeDashoffset = String(1 - leido);
      if (barra) barra.style.transform = 'scaleX(' + leido.toFixed(4) + ')';
      if (cifraAnillo) cifraAnillo.textContent = String(posicion);
      if (cifraPanel) cifraPanel.textContent = String(posicion);

      var a = enlaces[actual.id];
      if (a && a.getAttribute('aria-current') !== 'true') {
        Object.keys(enlaces).forEach(function (id) {
          enlaces[id].removeAttribute('aria-current');
        });
        a.setAttribute('aria-current', 'true');
      }
      situarMarca(a);
      pendiente = false;
    });
  }

  ajustaRail();
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
  window.addEventListener('resize', function () { ajustaRail(); actualizar(); });

  /* ---------- Vídeo a la carta ----------
     Hasta que no se pulsa aquí no hay más que la miniatura: el archivo de
     vídeo (unos 13 MB) no se descarga a quien solo viene a leer. */
  var play = caso.querySelector('.caso__play');
  if (play) {
    var cine = play.parentNode;
    play.addEventListener('click', function () {
      var video = document.createElement('video');
      video.className = 'caso__video';
      video.src = play.dataset.video;
      video.poster = play.querySelector('img').src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.setAttribute('controlslist', 'nodownload');
      video.setAttribute('aria-label', play.dataset.titulo);
      cine.replaceChild(video, play);
      video.focus();
    });

    /* Ampliar sirve también antes de reproducir: carga el vídeo y lo abre
       ya en grande. */
    conAmpliar(cine, function () {
      if (cine.contains(play)) play.click();
    });
  }

  /* ---------- Prototipo a la carta ----------
     Mismo trato que el vídeo: Figma pesa y pone sus cookies, así que no entra
     en la página hasta que alguien decide recorrer el prototipo. */
  Array.prototype.forEach.call(caso.querySelectorAll('.proto__abrir'), function (abrirProto) {
    abrirProto.addEventListener('click', function () {
      var marco = abrirProto.parentNode;
      var iframe = document.createElement('iframe');
      iframe.className = 'proto__iframe';
      iframe.src = abrirProto.dataset.embed;
      iframe.title = abrirProto.dataset.titulo;
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      marco.replaceChildren(iframe);

      /* Reiniciar: se cambia el iframe por uno nuevo con la URL original, así
         Figma arranca siempre en la pantalla inicial que marca el enlace. */
      var acciones = document.createElement('div');
      acciones.className = 'proto__acciones';
      var reiniciar = document.createElement('button');
      reiniciar.type = 'button';
      reiniciar.className = 'proto__accion proto__reiniciar';
      reiniciar.setAttribute('aria-label', 'Reiniciar el prototipo desde la primera pantalla');
      reiniciar.title = 'Reiniciar';
      reiniciar.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3.5 3.5V9H9"/></svg>';
      reiniciar.addEventListener('click', function () {
        var nuevo = iframe.cloneNode(false);
        nuevo.src = abrirProto.dataset.embed;
        marco.classList.add('proto__marco--cargando');
        nuevo.addEventListener('load', function () {
          marco.classList.remove('proto__marco--cargando');
        }, { once: true });
        marco.replaceChild(nuevo, iframe);
        iframe = nuevo;
        reiniciar.classList.remove('proto__reiniciar--gira');
        void reiniciar.offsetWidth;
        reiniciar.classList.add('proto__reiniciar--gira');
      });
      acciones.appendChild(reiniciar);

      /* En un marco apaisado Figma se carga siempre a tamaño de escritorio y se
         encoge para caber: si recibe el ancho real de un móvil deja tanto margen
         que el prototipo queda diminuto en el centro. */
      if (marco.classList.contains('proto__marco--ancho')) {
        iframe.classList.add('proto__iframe--escala');
        /* El alto sigue la proporción del marco, así que en pantalla completa
           (más alta que el 16:10 del marco) Figma recibe también ese hueco. */
        var escalar = function () {
          var k = marco.clientWidth / 1280;
          marco.style.setProperty('--k', k);
          iframe.style.blockSize = (marco.clientHeight / k) + 'px';
          marco.scrollLeft = 0;
          marco.scrollTop = 0;
        };
        escalar();
        if ('ResizeObserver' in window) new ResizeObserver(escalar).observe(marco);

        /* Ampliar: el marco se abre como una modal que cubre toda la ventana,
           con un aspa para volver. No se usa la pantalla completa del navegador
           (en iPhone no existe y otros la bloquean sin avisar), y el marco no se
           mueve de sitio: sacar un iframe del DOM lo recarga y se perdería la
           pantalla del prototipo en la que estaba. */
        var boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'proto__accion proto__pantalla';
        var abierta = false;
        var pintar = function () {
          boton.setAttribute('aria-label', abierta ? 'Cerrar y volver a la página' : 'Ver el prototipo a pantalla completa');
          boton.title = abierta ? 'Cerrar' : 'Pantalla completa';
          boton.innerHTML = abierta ? ICONO_CERRAR : ICONO_AMPLIAR;
          if (abierta) {
            marco.setAttribute('role', 'dialog');
            marco.setAttribute('aria-modal', 'true');
            marco.setAttribute('aria-label', iframe.title);
          } else {
            marco.removeAttribute('role');
            marco.removeAttribute('aria-modal');
            marco.removeAttribute('aria-label');
          }
          escalar();
        };
        var conTecla = function (e) {
          if (e.key === 'Escape') cerrar();
        };
        var abrir = function () {
          abierta = true;
          marco.classList.add('proto__marco--modal');
          document.documentElement.classList.add('sin-scroll');
          aislar(marco);
          document.addEventListener('keydown', conTecla);
          pintar();
          boton.focus();
        };
        var cerrar = function () {
          abierta = false;
          marco.classList.remove('proto__marco--modal');
          document.documentElement.classList.remove('sin-scroll');
          liberar();
          document.removeEventListener('keydown', conTecla);
          pintar();
          boton.focus();
        };
        boton.addEventListener('click', function () {
          if (abierta) cerrar(); else abrir();
        });
        pintar();
        acciones.appendChild(boton);
      }
      marco.appendChild(acciones);
      iframe.focus();
    });
  });

  /* ---------- Vídeo de una lámina, más grande ----------
     Mismo lightbox que el prototipo: un botón para ampliar, la modal cubre
     la ventana y una X (o Esc) para volver. El <video> no se recrea, así que
     si estaba reproduciéndose sigue igual al ampliar o al cerrar. */
  Array.prototype.forEach.call(caso.querySelectorAll('.lamina__clip video, .clip video'), function (video) {
    var marco = document.createElement('div');
    marco.className = 'clipvid';
    video.parentNode.insertBefore(marco, video);
    marco.appendChild(video);
    conAmpliar(marco);
  });

  /* ---------- Portada con recorrido propio ----------
     La imagen se mueve un poco más despacio que la página mientras la portada
     está a la vista. Va sobre un recorte con la imagen sobredimensionada, así
     que nunca se ven bordes. */
  var portada = caso.querySelector('.caso__cover img');
  if (portada && !reduceMotion) {
    var marcoPortada = portada.parentNode;
    var pendientePortada = false;

    var mover = function () {
      if (pendientePortada) return;
      pendientePortada = true;
      window.requestAnimationFrame(function () {
        var r = marcoPortada.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          var d = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          portada.style.setProperty('--py', (Math.max(-1, Math.min(1, d)) * -3) + '%');
        }
        pendientePortada = false;
      });
    };

    mover();
    window.addEventListener('scroll', mover, { passive: true });
    window.addEventListener('resize', mover);
  }
})();
