/* El srcset de una imagen con versiones reducidas.
   ------------------------------------------------------------
   scripts/variantes-imagen.py hace copias más estrechas de las portadas y del
   retrato (portada-mockup-800.webp…) y apunta en src/data/variantes-imagen.json
   qué anchos hay de cada una. Con eso se monta el srcset y el navegador se
   descarga la que necesita según el ancho al que se ve (sizes) y la pantalla:
   en una tarjeta del carrusel, la de 800 en vez de la de 1600.
   Si una imagen no está en el registro, no hay srcset y se sirve la original
   tal cual: nada se rompe por olvidarse de ejecutar el script. */
import variantes from '../data/variantes-imagen.json';

export function srcsetDe(ruta) {
  const datos = variantes[ruta];
  if (!datos || !datos.variantes.length) return undefined;
  const partes = datos.variantes.map((a) => `${ruta.replace(/\.webp$/, `-${a}.webp`)} ${a}w`);
  partes.push(`${ruta} ${datos.ancho}w`);
  return partes.join(', ');
}

/* A qué ancho se ve cada cosa, para que el navegador elija bien:
   - las tarjetas del carrusel: una por pantalla en el móvil (algo menos,
     porque asoma la siguiente), dos en tableta y tres en escritorio;
   - la portada de la ficha: todo el ancho, hasta el máximo del contenedor;
   - el retrato de «Sobre mí»: toda la columna en el móvil, 22-26rem en
     pantallas grandes;
   - las imágenes de un artículo: el ancho de su columna (TAMANO_COLUMNA). */
export const TAMANO_TARJETA = '(min-width: 62rem) 24rem, (min-width: 48rem) 45vw, 85vw';
export const TAMANO_PORTADA = '(min-width: 75rem) 75rem, 100vw';
export const TAMANO_RETRATO = '(min-width: 62rem) 26rem, 90vw';
/* La columna de un artículo: todo el ancho en el móvil, 44rem como mucho. */
export const TAMANO_COLUMNA = '(min-width: 48rem) 44rem, 100vw';
