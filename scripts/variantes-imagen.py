#!/usr/bin/env python3
"""
variantes-imagen.py — versiones reducidas de las portadas y del retrato
------------------------------------------------------------------------
Las portadas miden 1600 px de ancho (y las imágenes de los artículos, 2000),
pero en las tarjetas del carrusel se ven a unos 350 y en un móvil la de la
ficha a unos 400: descargar la grande en esos casos es pagar el doble o el
triple de peso para nada. Este script
hace, junto a cada original, copias más estrechas (portada-mockup-800.webp,
portada-mockup-1200.webp…) y apunta en src/data/variantes-imagen.json qué
anchos hay de cada imagen. src/lib/imagenes.js lee ese registro y monta el
srcset, y el navegador elige la que le toca según la pantalla.

Cuándo ejecutarlo: al añadir o cambiar una portada, el retrato o una imagen
de un artículo (public/assets/*/articulo-*.webp).
    python3 scripts/variantes-imagen.py
Necesita Pillow con soporte WebP (pip install pillow). Los originales no se
tocan. Una imagen sin variantes sigue funcionando: se sirve la original.
"""
import glob
import json
import os
from PIL import Image

RAIZ = os.path.join(os.path.dirname(__file__), '..')
PUBLIC = os.path.join(RAIZ, 'public')
REGISTRO = os.path.join(RAIZ, 'src', 'data', 'variantes-imagen.json')

# Qué imágenes y a qué anchos. Solo se hacen los anchos menores que el original.
TRABAJOS = [(ruta, [800, 1200]) for ruta in sorted(glob.glob(os.path.join(PUBLIC, 'assets', '*', 'portada-mockup.webp')))]
TRABAJOS.append((os.path.join(PUBLIC, 'assets', 'marc.webp'), [600, 900]))
# Las imágenes de los artículos que se sirven desde la web (no desde Medium):
# la columna mide como mucho 44rem (704 px); la de 1400 es para pantallas retina.
TRABAJOS += [(ruta, [640, 960, 1400]) for ruta in sorted(glob.glob(os.path.join(PUBLIC, 'assets', '*', 'articulo-*.webp')))
             if not ruta.rsplit('.', 1)[0].split('-')[-1].isdigit()]

CALIDAD = 80  # WebP con pérdida: a este tamaño no se distingue del original


def main():
    registro = {}
    for ruta, anchos in TRABAJOS:
        if not os.path.exists(ruta):
            continue
        imagen = Image.open(ruta)
        ancho, alto = imagen.size
        hechas = []
        for a in anchos:
            if a >= ancho:
                continue
            destino = ruta.replace('.webp', f'-{a}.webp')
            imagen.resize((a, round(alto * a / ancho)), Image.LANCZOS).save(destino, 'WEBP', quality=CALIDAD, method=6)
            hechas.append(a)
            print(f'{os.path.relpath(destino, PUBLIC)}  {os.path.getsize(destino) / 1024:.1f} KB')
        clave = '/' + os.path.relpath(ruta, PUBLIC).replace(os.sep, '/')
        registro[clave] = {'ancho': ancho, 'variantes': hechas}
    with open(REGISTRO, 'w', encoding='utf-8') as f:
        json.dump(registro, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'Registro: {os.path.relpath(REGISTRO, RAIZ)} ({len(registro)} imágenes)')


if __name__ == '__main__':
    main()
