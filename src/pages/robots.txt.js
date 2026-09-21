/* robots.txt, generado al compilar con la misma `site` que el sitemap.
   ------------------------------------------------------------
   Antes era un archivo fijo con el dominio escrito a mano: al cambiar `site`
   el enlace al sitemap se quedaba apuntando a otra web. Así sigue a `site`. */
export function GET({ site }) {
  const cuerpo = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', site).href}
`;

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
