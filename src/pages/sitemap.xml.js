/* Mapa del sitio, generado al compilar.
   ------------------------------------------------------------
   No hay integración de terceros para esto: el sitio ya sabe qué páginas
   tiene (la portada, cada ficha de PROYECTOS, cada artículo de ARTICULOS),
   así que basta con recorrer esos mismos datos y escribir el XML a mano. */
import { PROYECTOS } from '../data/proyectos.js';
import { ARTICULOS } from '../data/articulos.js';

export function GET({ site }) {
  const ultimaFicha = PROYECTOS.reduce((max, p) => (p.fecha > max ? p.fecha : max), PROYECTOS[0].fecha);
  const ultimoArticulo = ARTICULOS.reduce((max, a) => (a.fecha > max ? a.fecha : max), ARTICULOS[0].fecha);

  const urls = [
    { loc: '', lastmod: ultimoArticulo > ultimaFicha ? ultimoArticulo : ultimaFicha, prioridad: '1.0' },
    ...PROYECTOS.map((p) => ({ loc: `proyecto/${p.slug}/`, lastmod: p.fecha, prioridad: '0.8' })),
    ...ARTICULOS.map((a) => ({ loc: `articulo/${a.slug}/`, lastmod: a.fecha, prioridad: '0.6' }))
  ];

  const cuerpo = urls
    .map(
      (u) => `  <url>
    <loc>${new URL(u.loc, site).href}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.prioridad}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cuerpo}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
