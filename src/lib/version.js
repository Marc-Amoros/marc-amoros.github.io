/* La versión de un archivo de public/, para pedirlo de nuevo solo si cambió.
   ------------------------------------------------------------
   El CSS y el JS se sirven tal cual, sin pasar por el empaquetado de Astro,
   así que no llevan un nombre con hash. Antes la versión era un número
   escrito a mano (?v=2) y había que acordarse de subirlo cada vez que se
   tocaba uno: si se olvidaba, quien ya había visitado la web seguía viendo
   la hoja vieja. Ahora el número sale del contenido del propio archivo, y
   cambia solo cuando el archivo cambia. */

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const huellas = new Map();

export function conVersion(ruta) {
  if (!huellas.has(ruta)) {
    const archivo = resolve(process.cwd(), 'public', ruta.replace(/^\//, ''));
    huellas.set(ruta, createHash('sha1').update(readFileSync(archivo)).digest('hex').slice(0, 8));
  }
  return `${ruta}?v=${huellas.get(ruta)}`;
}
