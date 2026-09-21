/* Prepara el cuerpo del artículo antes de escribirlo.
   ------------------------------------------------------------
   Esto lo hacía articulo.js sobre el DOM ya pintado: recorría los <h2>, les
   ponía id y marcaba las figuras. Ahora se hace aquí, al compilar, para que
   el HTML salga con los anclajes puestos y los titulares sean enlazables
   aunque el navegador no ejecute nada. */

import { ARTICULOS } from '../data/articulos.js';
import { ALT } from '../data/alt-textos.js';
import { salidasExternas } from './ajustes.js';

/* Dentro del texto quedaron los enlaces que se escribieron en Medium. Los que
   apuntan a otro articulo de la serie tienen copia aqui, asi que se redirigen
   a la copia local: el lector sigue leyendo y no se va. Los demas -una
   referencia, un prototipo- pierden el enlace y conservan las palabras, que
   es lo que la frase necesita para entenderse. */
const copiaLocal = new Map(ARTICULOS.map((a) => [a.medium, `/articulo/${a.slug}/`]));

/* Mismo algoritmo que usaba el navegador, para que los enlaces que alguien
   haya guardado (#ap-empatizar-3) sigan apuntando al mismo sitio. */
function idDeTitular(texto, n) {
  const base = texto.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return 'ap-' + (base || 'apartado') + '-' + n;
}

const sinEtiquetas = (s) => s.replace(/<[^>]+>/g, '');

/* Las entidades que de verdad aparecen en el texto de Medium. No hace falta
   un decodificador completo: solo lo que llega. */
function decodifica(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}

export function prepararCuerpo(html) {
  const titulares = [];
  let n = 0;

  let salida = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, dentro) => {
    n += 1;
    const texto = decodifica(sinEtiquetas(dentro)).trim();
    const id = idDeTitular(texto, n);
    titulares.push({ id, texto });
    return `<h2 id="${id}">${dentro}</h2>`;
  });

  if (!salidasExternas) {
    /* Un párrafo marcado con data-salida solo existe para dar el enlace
       ("os dejo el enlace a continuación"): sin enlace no dice nada. */
    salida = salida.replace(/<p data-salida>[\s\S]*?<\/p>/g, '');
    salida = salida.replace(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
      (todo, href, dentro) => {
        if (!/^https?:/i.test(href)) return todo;
        const local = copiaLocal.get(href);
        return local ? `<a href="${local}">${dentro}</a>` : dentro;
      });
  }

  /* Las figuras aparecen al llegar a ellas, como las láminas de los casos. */
  salida = salida.replace(/<figure(\s|>)/g, '<figure class="rise"$1');

  /* El feed de Medium trae todas las imágenes con alt="", o sea declaradas
     decorativas, cuando son el caso entero. Los textos de verdad viven en
     alt-textos.js; aquí se pegan al <img> al compilar. Lo que siga vacío se
     queda como estaba: una imagen con pie al lado, que es el patrón de
     <figure> y se sostiene; sin pie, en cambio, no hay nada que leer, y de
     esas avisa contarAltsPendientes(). */
  salida = salida.replace(/<img\s[^>]*>/g, (tag) => {
    const ref = tag.match(/src="([^"]+)"/);
    if (!ref) return tag;
    const texto = (ALT[ref[1].split('/').pop()] || '').trim();
    /* Sin texto todavía, o marcada a mano como decorativa: en los dos casos
       el <img> se queda con su alt="" y no se toca. La diferencia es que la
       decorativa es una decisión tomada y la otra sigue pendiente, y eso lo
       distingue contarAltsPendientes(). */
    if (!texto || texto === '__decorativa__') return tag;
    const escapado = texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return /alt="[^"]*"/.test(tag)
      ? tag.replace(/alt="[^"]*"/, `alt="${escapado}"`)
      : tag.replace(/<img\s/, `<img alt="${escapado}" `);
  });

  return { html: salida, titulares };
}

/* Aviso al compilar: cuántas imágenes sin pie siguen sin texto alternativo.
   Son las únicas que un lector de pantalla no puede anunciar de ninguna
   forma, así que son las que urge rellenar en src/data/alt-textos.js. */
export function contarAltsPendientes() {
  const pendientes = [];
  for (const a of ARTICULOS) {
    const figuras = a.html.match(/<figure>[\s\S]*?<\/figure>/g) || [];
    for (const fig of figuras) {
      if (/<figcaption>/.test(fig)) continue;
      const ref = fig.match(/src="([^"]+)"/);
      if (!ref) continue;
      const id = ref[1].split('/').pop();
      if (!(ALT[id] || '').trim()) pendientes.push({ articulo: a.slug, imagen: id });
    }
  }
  return pendientes;
}
