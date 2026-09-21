// @ts-check
import { defineConfig } from 'astro/config';

/* Sitio estático: Astro genera el HTML de cada ficha y de cada artículo
   durante la compilación. No hay servidor, no hay islas de framework y no se
   envía JavaScript de Astro al navegador: solo el que ya había escrito a
   mano, que ahora actúa sobre un HTML que llega hecho.

   `site` hace falta para que el sitemap, robots.txt y las URL canónicas salgan
   absolutos. Ahora apunta a la copia publicada en GitHub Pages. Para pasar a
   marcamoros.com (hoy lo sirve Squarespace): cambia esta línea, crea
   public/CNAME con el dominio y apunta los DNS a GitHub. Antes, no los toques. */
export default defineConfig({
  site: 'https://marc-amoros.github.io',
  /* Cada ruta es una carpeta con su index.html: /proyecto/besmie/ funciona
     igual en Netlify, en Vercel, en GitHub Pages o en un nginx pelado, sin
     configurar nada y sin que la URL canónica acabe en .html. */
  trailingSlash: 'always',
  devToolbar: { enabled: false }
});
