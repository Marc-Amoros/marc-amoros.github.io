#!/usr/bin/env node
/* ============================================================
   minificar-dist.mjs — comprime el CSS y el JS de mano tras el build
   ------------------------------------------------------------
   styles.css, tokens.css, detalle.css, main.js, caso.js y lectura.js
   viven en public/ sin pasar por Astro/Vite (los sirve tal cual), así
   que el HTML que edita Marc en esos archivos —con sus comentarios en
   español, que documentan por qué está hecho así— es el mismo que se
   publicaría si no fuera por este paso. Aquí, después del build, se
   coge lo ya copiado a dist/ (el original en public/ no se toca) y se
   comprime: fuera comentarios y espacio sobrante, mismo comportamiento.

   Los vendor/*.js (Motion) ya llegan minificados de fábrica: tocarlos
   no ahorra nada y arriesga el aviso de licencia, así que se dejan.

   Si algo falla al minificar, el build entero falla: mejor que
   GitHub Actions avise a que la web publicada se quede con un
   archivo roto sin que nadie se entere.
   ============================================================ */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import CleanCSS from 'clean-css';
import { minify as minificarJS } from 'terser';

const DIST = new URL('../dist/', import.meta.url);

async function archivosCon(extension, carpeta, { recursivo = false } = {}) {
  const base = new URL(carpeta, DIST);
  let entradas;
  try {
    entradas = await readdir(base, { withFileTypes: true });
  } catch {
    return [];
  }
  const encontrados = [];
  for (const entrada of entradas) {
    if (entrada.isDirectory()) {
      if (recursivo) {
        encontrados.push(...await archivosCon(extension, `${carpeta}${entrada.name}/`, { recursivo }));
      }
      continue;
    }
    if (extname(entrada.name) === extension) {
      encontrados.push(join(carpeta, entrada.name));
    }
  }
  return encontrados;
}

async function minificarCSS(rutaRelativa) {
  const ruta = new URL(rutaRelativa, DIST);
  const original = await readFile(ruta, 'utf8');
  const resultado = new CleanCSS({ level: 2 }).minify(original);
  if (resultado.errors.length) {
    throw new Error(`clean-css falló en ${rutaRelativa}: ${resultado.errors.join('; ')}`);
  }
  await writeFile(ruta, resultado.styles, 'utf8');
  return { antes: Buffer.byteLength(original), despues: Buffer.byteLength(resultado.styles) };
}

async function minificarArchivoJS(rutaRelativa) {
  const ruta = new URL(rutaRelativa, DIST);
  const original = await readFile(ruta, 'utf8');
  const resultado = await minificarJS(original, {
    compress: true,
    mangle: true,
    format: { comments: false }
  });
  if (!resultado.code) {
    throw new Error(`terser no devolvió código para ${rutaRelativa}`);
  }
  await writeFile(ruta, resultado.code, 'utf8');
  return { antes: Buffer.byteLength(original), despues: Buffer.byteLength(resultado.code) };
}

async function main() {
  const cssRelativos = await archivosCon('.css', 'css/');
  // js/ pero no js/vendor/: ese ya llega minificado de fábrica.
  const todosJS = await archivosCon('.js', 'js/', { recursivo: true });
  const jsRelativos = todosJS.filter((r) => !r.startsWith('js/vendor/'));

  let totalAntes = 0;
  let totalDespues = 0;

  for (const rel of cssRelativos) {
    const { antes, despues } = await minificarCSS(rel);
    totalAntes += antes; totalDespues += despues;
    console.log(`  css   ${rel}  ${(antes / 1024).toFixed(1)}KB → ${(despues / 1024).toFixed(1)}KB`);
  }
  for (const rel of jsRelativos) {
    const { antes, despues } = await minificarArchivoJS(rel);
    totalAntes += antes; totalDespues += despues;
    console.log(`  js    ${rel}  ${(antes / 1024).toFixed(1)}KB → ${(despues / 1024).toFixed(1)}KB`);
  }

  const ahorro = totalAntes ? 100 * (1 - totalDespues / totalAntes) : 0;
  console.log(`\n[minificar-dist] ${cssRelativos.length + jsRelativos.length} archivo(s), ` +
    `${(totalAntes / 1024).toFixed(0)}KB → ${(totalDespues / 1024).toFixed(0)}KB (-${ahorro.toFixed(0)}%)`);
}

main().catch((err) => {
  console.error('[minificar-dist] ' + err.message);
  process.exit(1);
});
